import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile as execFileCb } from 'node:child_process';
import { promisify } from 'node:util';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { scaffold } from '../scripts/scaffold-experiment.mjs';
const execFile = promisify(execFileCb);
const script = path.resolve('scripts/scaffold-experiment.mjs');
async function git(cwd, ...args) { return execFile('git', args, { cwd, encoding: 'utf8' }); }
async function fixture(t) {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'scaffold-test-'));
  t.after(() => fs.rm(temp, { recursive: true, force: true }));
  const repo = path.join(temp, 'repo'); await fs.mkdir(repo);
  await git(repo, 'init', '-b', 'fixture/main');
  await git(repo, 'config', 'user.name', 'Test'); await git(repo, 'config', 'user.email', 'test@example.invalid');
  await git(repo, 'remote', 'add', 'origin', 'https://user:secret@example.invalid/org/source.git');
  const bp = path.join(repo, 'blueprints', 'starter', 'sample'); await fs.mkdir(bp, { recursive: true });
  await fs.writeFile(path.join(bp, 'index.html'), '<html>fixture</html>');
  await fs.writeFile(path.join(bp, 'binary.bin'), Buffer.from([0, 255, 1, 128]));
  await fs.writeFile(path.join(bp, 'run.sh'), '#!/bin/sh\ntrue\n'); await fs.chmod(path.join(bp, 'run.sh'), 0o755);
  for (const name of ['docs/secret.md','platform/app.php','node_modules/pkg/x.js','dist/out.js','build/out.js','coverage/cov.txt','.cache/cache',' .vite/temp','.env','.env.local','playwright-report/index.html','test-results/out.xml','.github/workflows/keep.yml','src/App.jsx','style.css','package-lock.json']) {
    const file = path.join(bp, name.trim()); await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, name);
  }
  await git(repo, 'add', '.'); await git(repo, 'commit', '-m', 'fixture');
  return { temp, repo, bp, output: path.join(temp, 'out', 'experiment'), branch: 'fixture/main', blueprint: 'blueprints/starter/sample' };
}
function cli(f, extra = []) { return execFile(process.execPath, [script, '--name', 'Experiment 06 - Example', '--output', f.output, '--blueprint', f.blueprint, ...extra], { cwd: f.repo, encoding: 'utf8' }); }

test('creates committed blueprint snapshot and complete provenance', async (t) => {
  const f = await fixture(t); await cli(f);
  const root = f.output;
  for (const d of ['01-discovery/raw-materials','02-discovery','03-design','04-build/sample','05-audit','06-revisions','07-system-learning','08-close']) assert.equal((await fs.stat(path.join(root,d))).isDirectory(), true);
  const p = JSON.parse(await fs.readFile(path.join(root,'PROVENANCE.json'),'utf8'));
  assert.equal(p.schema_version,'1.0'); assert.equal(p.experiment_name,'Experiment 06 - Example'); assert.equal(p.source_repository,'https://example.invalid/org/source'); assert.equal(p.source_branch,f.branch);
  assert.equal(p.source_commit,(await git(f.repo,'rev-parse','HEAD')).stdout.trim()); assert.match(p.source_commit,/^[a-f0-9]{40}$/); assert.equal(p.blueprint_path,f.blueprint);
  assert.equal(p.blueprint_tree_sha,(await git(f.repo,'rev-parse',`HEAD:${f.blueprint}`)).stdout.trim()); assert.ok(!Number.isNaN(Date.parse(p.scaffolded_at))); assert.ok(p.scaffolded_at.endsWith('Z'));
  assert.match(await fs.readFile(path.join(root,'README.md'),'utf8'),/newly scaffolded experiment/);
  assert.deepEqual(await fs.readFile(path.join(root,'04-build/sample/binary.bin')),Buffer.from([0,255,1,128]));
  if (process.platform !== 'win32') assert.equal((await fs.stat(path.join(root,'04-build/sample/run.sh'))).mode & 0o111, 0o111);
  for (const pth of ['docs','platform','node_modules','dist','build','coverage','.cache','.vite','.env','.env.local','playwright-report','test-results','.git']) await assert.rejects(fs.access(path.join(root,'04-build/sample',pth)));
  for (const pth of ['.github/workflows/keep.yml','src/App.jsx','style.css','package-lock.json']) await fs.access(path.join(root,'04-build/sample',pth));
});

test('rejects unsafe blueprint paths and invalid names', async (t) => {
  const f=await fixture(t);
  for (const bp of ['../blueprints/starter/sample','/blueprints/starter/sample','docs','blueprints/../docs','blueprints/missing']) {
    const r=await execFile(process.execPath,[script,'--name','Name','--output',f.output,'--blueprint',bp],{cwd:f.repo,encoding:'utf8'}).then(()=>null,e=>e);
    assert.ok(r); assert.match(r.stderr,/Error:/); await assert.rejects(fs.access(f.output));
  }
});

test('rejects malformed CLI arguments before creating destination parents', async (t) => {
  const f = await fixture(t);
  const parent = path.join(f.temp, 'must-not-exist');
  const invalidArgs = [
    ['--name', 'Name', '--output', path.join(parent, 'out')],
    ['--name', 'Name', '--name', 'Again', '--output', path.join(parent, 'out'), '--blueprint', f.blueprint],
    ['--name', '   ', '--output', path.join(parent, 'out'), '--blueprint', f.blueprint],
    ['--name', 'Bad\nName', '--output', path.join(parent, 'out'), '--blueprint', f.blueprint],
    ['--name', 'Name', '--output', path.join(parent, 'out'), '--blueprint', '   '],
    ['--name', 'Name', '--output', '', '--blueprint', f.blueprint],
    ['--name', 'Name', '--output', `bad\u0001${path.join(parent, 'out')}`, '--blueprint', f.blueprint],
    ['--name', 'Name', '--output', path.join(parent, 'out'), '--blueprint', f.blueprint, '--unknown'],
  ];
  for (const args of invalidArgs) {
    const result = await execFile(process.execPath, [script, ...args], { cwd: f.repo, encoding: 'utf8' }).then(() => null, (error) => error);
    assert.ok(result);
    await assert.rejects(fs.access(parent));
  }
});

test('canonical destination resolution rejects symlinked parents into the repository without creating descendants', async (t) => {
  const f = await fixture(t);
  const alias = path.join(f.temp, 'repo-alias');
  try { await fs.symlink(f.repo, alias, 'junction'); }
  catch (error) {
    if (process.platform === 'win32' && ['EPERM', 'EACCES', 'UNKNOWN'].includes(error.code)) { t.skip(`Windows filesystem does not permit test directory symlink creation: ${error.code}`); return; }
    throw error;
  }
  const output = path.join(alias, 'new-parent', 'experiment');
  const result = await execFile(process.execPath, [script, '--name', 'Name', '--output', output, '--blueprint', f.blueprint], { cwd: f.repo, encoding: 'utf8' }).then(() => null, (error) => error);
  assert.ok(result);
  assert.match(result.stderr, /outside the source repository/);
  await assert.rejects(fs.access(path.join(f.repo, 'new-parent')));
});

test('CLI entrypoint runs from a nested working directory and module import does not execute it', async (t) => {
  const f = await fixture(t);
  const nested = path.join(f.repo, 'nested'); await fs.mkdir(nested);
  const nestedOutput = path.join(f.temp, 'nested-output');
  await execFile(process.execPath, [script, '--name', 'Nested', '--output', nestedOutput, '--blueprint', f.blueprint], { cwd: nested, encoding: 'utf8' });
  await fs.access(path.join(nestedOutput, 'PROVENANCE.json'));
  const importResult = await execFile(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(pathToFileURL(script).href)})`], { cwd: f.repo, encoding: 'utf8' });
  assert.equal(importResult.stdout, '');
  await assert.rejects(fs.access(path.join(f.repo, 'Name')));
});

test('rejects tracked, staged and untracked changes in selected blueprint', async (t) => {
  for (const type of ['unstaged','staged','untracked']) {
    const f=await fixture(t); const file=path.join(f.bp,type==='untracked'?'new.txt':'index.html'); await fs.writeFile(file,'changed'); if(type==='staged') await git(f.repo,'add',file);
    const r=await cli(f).then(()=>null,e=>e); assert.ok(r); assert.match(r.stderr,/uncommitted changes/); await assert.rejects(fs.access(f.output));
  }
});

test('unrelated dirty worktree file does not block scaffold', async (t) => {
  const f=await fixture(t); await fs.writeFile(path.join(f.repo,'outside.txt'),'dirty'); await cli(f); await fs.access(f.output);
});

test('rejects existing output without modifying it and rejects in-repository output', async (t) => {
  const f=await fixture(t); await fs.mkdir(f.output,{recursive:true}); await fs.writeFile(path.join(f.output,'keep.txt'),'keep'); const r=await cli(f).then(()=>null,e=>e); assert.ok(r); assert.equal(await fs.readFile(path.join(f.output,'keep.txt'),'utf8'),'keep');
  const r2=await execFile(process.execPath,[script,'--name','Name','--output',path.join(f.repo,'bad'),'--blueprint',f.blueprint],{cwd:f.repo,encoding:'utf8'}).then(()=>null,e=>e); assert.ok(r2); assert.match(r2.stderr,/outside the source repository/);
});

test('cleans staging and publishes no output after deterministic pre-publish failure', async (t) => {
  const f=await fixture(t); await assert.rejects(scaffold({argv:['--name','Name','--output',f.output,'--blueprint',f.blueprint],cwd:f.repo,hooks:{beforePublish(){throw Error('injected failure');}}}),/injected failure/);
  await assert.rejects(fs.access(f.output));
  const siblings=await fs.readdir(path.dirname(f.output)); assert.deepEqual(siblings,[]);
});



test('rejects committed symbolic links and cleans staging without touching sibling files', async (t) => {
  const f = await fixture(t);
  const keep = path.join(path.dirname(f.output), 'user-file.txt');
  await fs.mkdir(path.dirname(f.output), { recursive: true });
  await fs.writeFile(keep, 'preserve me');
  try {
    await fs.symlink('index.html', path.join(f.bp, 'linked.html'));
  } catch (error) {
    if (process.platform === 'win32' && ['EPERM', 'EACCES', 'UNKNOWN'].includes(error.code)) {
      t.skip(`Windows filesystem does not permit test symlink creation: ${error.code}`);
      return;
    }
    throw error;
  }
  await git(f.repo, 'add', '.'); await git(f.repo, 'commit', '-m', 'add blueprint symlink');
  const result = await cli(f).then(() => null, (error) => error);
  assert.ok(result);
  assert.match(result.stderr, /unsupported symbolic link or Git submodule/);
  await assert.rejects(fs.access(f.output));
  assert.equal(await fs.readFile(keep, 'utf8'), 'preserve me');
  assert.deepEqual(await fs.readdir(path.dirname(f.output)), ['user-file.txt']);
});

test('rejects a real committed submodule gitlink and copies none of its content', async (t) => {
  const f = await fixture(t);
  const submodule = path.join(f.temp, 'submodule'); await fs.mkdir(submodule);
  await git(submodule, 'init', '-b', 'main');
  await git(submodule, 'config', 'user.name', 'Test'); await git(submodule, 'config', 'user.email', 'test@example.invalid');
  await fs.writeFile(path.join(submodule, 'submodule-secret.txt'), 'must not copy');
  await git(submodule, 'add', '.'); await git(submodule, 'commit', '-m', 'submodule fixture');
  const mount = `${f.blueprint}/nested-module`;
  await git(f.repo, '-c', 'protocol.file.allow=always', 'submodule', 'add', submodule, mount);
  await git(f.repo, 'commit', '-am', 'add real blueprint submodule');
  const entry = (await git(f.repo, 'ls-tree', 'HEAD', mount)).stdout.trim();
  assert.match(entry, /^160000 commit [a-f0-9]{40}\t/);
  const result = await cli(f).then(() => null, (error) => error);
  assert.ok(result);
  assert.match(result.stderr, /unsupported symbolic link or Git submodule/);
  await assert.rejects(fs.access(f.output));
  await assert.rejects(fs.access(path.dirname(f.output)));
});

