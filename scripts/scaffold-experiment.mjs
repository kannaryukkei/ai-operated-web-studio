import { execFile as execFileCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { promises as fs, realpath as realpathCallback } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const execFile = promisify(execFileCallback);
const realpathNative = promisify(realpathCallback.native);
const excluded = new Set(['.git', 'platform', 'docs', 'node_modules', 'dist', 'build', 'out', 'coverage', '.cache', '.vite', 'playwright-report', 'playwright', 'test-results', '__pycache__', '.turbo', '.next']);
const isExcluded = (relative) => relative.split('/').some((segment) => excluded.has(segment) || segment === '.env' || segment.startsWith('.env.'));
const isWithin = (parent, candidate) => {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`));
};
async function git(root, args, encoding = 'utf8') {
  try { return (await execFile('git', args, { cwd: root, encoding, maxBuffer: 64 * 1024 * 1024 })).stdout; }
  catch (error) { throw new Error(`Git ${args.join(' ')} failed: ${error.stderr?.trim() || error.message}`); }
}
function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (!['--name', '--output', '--blueprint'].includes(flag) || Object.hasOwn(result, flag)) throw new Error(`Unexpected or duplicate argument: ${flag}`);
    const value = argv[++i];
    if (typeof value !== 'string' || !value || value.startsWith('--')) throw new Error(`Missing value for ${flag}`);
    if (!value.trim() || /[\u0000-\u001f\u007f]/.test(value)) throw new Error(`${flag} must not be empty or contain control characters.`);
    result[flag] = value;
  }
  for (const flag of ['--name', '--output', '--blueprint']) if (!Object.hasOwn(result, flag)) throw new Error(`Required argument missing: ${flag}`);
  if (/[\\/]/.test(result['--name'])) throw new Error('Name must be a single-line display name without path separators.');
  return result;
}
async function canonicalizeWithMissingTail(candidate) {
  let cursor = path.resolve(candidate);
  const missing = [];
  for (;;) {
    try { return path.resolve(await realpathNative(cursor), ...missing.reverse()); }
    catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
      const parent = path.dirname(cursor);
      if (parent === cursor) throw error;
      missing.push(path.basename(cursor));
      cursor = parent;
    }
  }
}
function normalizeRemote(remote) {
  let url;
  try { url = new URL(remote); } catch {
    const match = remote.match(/^(?:[^@/]+@)?([^:]+):(.+)$/);
    if (!match) throw new Error('Origin remote URL is invalid.');
    url = new URL(`https://${match[1]}/${match[2]}`);
  }
  url.username = ''; url.password = ''; url.search = ''; url.hash = '';
  return url.href.replace(/\.git\/?$/, '').replace(/\/$/, '');
}
export async function scaffold({ argv = process.argv.slice(2), cwd = process.cwd(), hooks = {} } = {}) {
  const args = parseArgs(argv);
  const root = (await git(cwd, ['rev-parse', '--show-toplevel'])).trim();
  const branch = (await git(root, ['branch', '--show-current'])).trim();
  if (!branch) throw new Error('Detached HEAD cannot provide a source branch; check out a named branch.');
  const commit = (await git(root, ['rev-parse', '--verify', 'HEAD^{commit}'])).trim();
  if (!/^[0-9a-f]{40}$/i.test(commit)) throw new Error('Could not resolve full HEAD commit SHA.');
  const origin = normalizeRemote((await git(root, ['remote', 'get-url', 'origin'])).trim());
  const blueprint = args['--blueprint'].replaceAll('\\', '/');
  if (path.posix.isAbsolute(blueprint) || !blueprint.startsWith('blueprints/') || blueprint.split('/').some((part) => !part || part === '.' || part === '..')) throw new Error('Blueprint must be a valid repository-relative path inside blueprints/.');
  if ((await git(root, ['status', '--porcelain=v1', '--untracked-files=all', '--', blueprint])).trim()) throw new Error('Selected blueprint has uncommitted changes. Commit the selected blueprint before scaffolding.');
  const treeLine = (await git(root, ['ls-tree', commit, '--', blueprint])).trim();
  const treeMatch = treeLine.match(/^040000 tree ([0-9a-f]{40})\t(.+)$/);
  if (!treeMatch || treeMatch[2] !== blueprint) throw new Error('Selected blueprint is not a committed directory in HEAD.');
  const listing = await git(root, ['ls-tree', '-r', '-z', '--full-tree', commit, '--', blueprint]);
  const entries = listing.split('\0').filter(Boolean).map((line) => {
    const match = line.match(/^([0-7]{6}) (blob|commit) ([0-9a-f]{40})\t(.+)$/);
    if (!match) throw new Error('Could not parse committed blueprint tree.');
    return { mode: match[1], type: match[2], sha: match[3], file: match[4] };
  }).filter((entry) => entry.file.startsWith(`${blueprint}/`));
  if (entries.some((entry) => entry.type === 'commit' || entry.mode === '120000')) throw new Error('Blueprint includes an unsupported symbolic link or Git submodule.');
  const canonicalRoot = await realpathNative(root);
  const requestedOutput = path.resolve(canonicalRoot, args['--output']);
  const output = await canonicalizeWithMissingTail(requestedOutput);
  const source = path.resolve(canonicalRoot, ...blueprint.split('/'));
  if (isWithin(canonicalRoot, output)) throw new Error('Output directory must be outside the source repository.');
  if (isWithin(source, output) || isWithin(output, source)) throw new Error('Output directory must not overlap the selected blueprint.');
  try { await fs.lstat(requestedOutput); throw new Error(`Destination already exists: ${requestedOutput}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parent = path.dirname(output);
  await fs.mkdir(parent, { recursive: true });
  const stage = await fs.mkdtemp(path.join(parent, `.${path.basename(output)}.scaffold-`));
  let published = false;
  try {
    for (const directory of ['01-discovery/raw-materials', '02-discovery', '03-design', '04-build', '05-audit', '06-revisions', '07-system-learning', '08-close']) await fs.mkdir(path.join(stage, directory), { recursive: true });
    const folder = path.posix.basename(blueprint);
    let copied = 0;
    for (const entry of entries) {
      const inner = entry.file.slice(blueprint.length + 1);
      if (isExcluded(inner)) continue;
      const target = path.join(stage, '04-build', folder, ...inner.split('/'));
      await fs.mkdir(path.dirname(target), { recursive: true });
      const blob = await git(root, ['cat-file', 'blob', entry.sha], null);
      await fs.writeFile(target, blob, { flag: 'wx', mode: entry.mode === '100755' ? 0o755 : 0o644 });
      copied++;
    }
    if (!copied) throw new Error('Selected blueprint has no files after exclusions.');
    for (const directory of ['01-discovery/raw-materials', '02-discovery', '03-design', '05-audit', '06-revisions', '07-system-learning', '08-close']) await fs.writeFile(path.join(stage, directory, '.gitkeep'), '');
    await fs.writeFile(path.join(stage, 'README.md'), `# ${args['--name']}\n\nThis is a newly scaffolded experiment containing a committed snapshot of the selected blueprint.\n\n- **Selected blueprint:** \`04-build/${folder}/\`\n- **Source provenance:** see \`PROVENANCE.json\`.\n\n## Experiment folders\n\n- \`01-discovery/\`: raw materials and discovery inputs.\n- \`02-discovery/\`: structured discovery outputs.\n- \`03-design/\`: design decisions and artifacts.\n- \`04-build/\`: selected blueprint implementation.\n- \`05-audit/\`: audit evidence.\n- \`06-revisions/\`: revision records.\n- \`07-system-learning/\`: reusable learnings.\n- \`08-close/\`: closure and handoff.\n\nScaffolding creates a local directory only. Git initialization, GitHub repository creation, remote configuration, pushing, publishing and deploying are separate actions.\n`, { flag: 'wx' });
    const provenance = { schema_version: '1.0', experiment_name: args['--name'], source_repository: origin, source_branch: branch, source_commit: commit, blueprint_path: blueprint, blueprint_tree_sha: treeMatch[1], scaffolded_at: new Date().toISOString() };
    await fs.writeFile(path.join(stage, 'PROVENANCE.json'), `${JSON.stringify(provenance, null, 2)}\n`, { flag: 'wx' });
    await hooks.beforePublish?.(stage);
    try { await fs.lstat(output); throw new Error(`Destination appeared during scaffolding: ${output}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    await fs.rename(stage, output);
    published = true;
    return output;
  } finally { if (!published) await fs.rm(stage, { recursive: true, force: true }); }
}
const entrypointUrl = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href;
if (entrypointUrl && import.meta.url === entrypointUrl) {
  scaffold().then((output) => process.stdout.write(`Scaffold created: ${output}\n`)).catch((error) => { process.stderr.write(`Error: ${error.message}\n`); process.exitCode = 1; });
}




