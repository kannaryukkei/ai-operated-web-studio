import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);
const POLL_MS = 1000;
const STABLE_POLLS = 3;
const REGISTER_HEADERS = [
  'asset_id', 'source_id', 'original_filename_or_url', 'description', 'creator_and_owner', 'intended_use',
  'permission_status', 'permission_evidence_status', 'consent_status', 'required_credit',
  'licence_restrictions_and_expiry', 'owner_approval_reference', 'alt_text_candidate', 'crop_and_focal_point_notes',
  'suitability_score', 'media_source_type', 'exact_asset_page_url', 'media_type', 'visual_role', 'target_section',
  'proof_class', 'licence_name', 'licence_url', 'commercial_use', 'licence_checked_on', 'third_party_rights_status',
  'model_release_status', 'property_permission_status', 'trademark_permission_status', 'permission_evidence_reference',
  'publication_approval_reference', 'optimized_project_path', 'optimized_format', 'dimensions_and_bytes', 'focal_point',
  'crop_ratio', 'loading_priority', 'poster_or_caption_path', 'motion_and_reduced_motion_notes', 'provider_terms_url',
  'provider_terms_checked_on', 'project_context_use', 'provider_terms_status', 'acquisition_method',
  // Validator-compatible canonical fields; aliases above remain for the client template.
  'source_type', 'asset_page_url', 'usage_role', 'license_name', 'license_url', 'license_status', 'rights_status',
  'publication_status', 'permission_evidence_ref', 'client_proof', 'identifiable_people', 'visible_brand_or_trademark',
  'private_property_or_artwork', 'brand_permission_status', 'credit_required', 'credit_text', 'is_selected_for_build',
  'file_size_bytes', 'poster_path', 'motion_behavior', 'captions_or_transcript_status', 'decorative', 'media_dimensions',
  'responsive_variants'
];

export function parseCsv(input) {
  const rows = []; let row = []; let cell = ''; let quoted = false;
  const source = String(input ?? '').replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(cell); cell = ''; }
    else if (char === '\n') { row.push(cell.replace(/\r$/, '')); if (row.some((v) => v.trim())) rows.push(row); row = []; cell = ''; }
    else cell += char;
  }
  if (quoted) throw new Error('Asset register CSV contains an unclosed quoted field.');
  row.push(cell.replace(/\r$/, '')); if (row.some((v) => v.trim())) rows.push(row);
  if (!rows.length) return { headers: [...REGISTER_HEADERS], records: [] };
  const headers = rows[0].map((v) => v.trim());
  return { headers, records: rows.slice(1).map((values) => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))) };
}

export function stringifyCsv(headers, records) {
  const quote = (value) => { const text = String(value ?? ''); return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
  return [headers.join(','), ...records.map((record) => headers.map((h) => quote(record[h])).join(','))].join('\n') + '\n';
}

const slug = (value) => String(value ?? 'asset').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'asset';
const defaultDownloads = () => process.env.MEDIA_DOWNLOADS_DIR || path.join(os.homedir(), 'Downloads');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function dimensionsFromHeader(buffer, ext) {
  if (ext === '.png' && buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (ext === '.jpg' || ext === '.jpeg') {
    let i = 2;
    while (i + 9 < buffer.length) {
      if (buffer[i] !== 0xff) { i += 1; continue; }
      const marker = buffer[i + 1]; const length = buffer.readUInt16BE(i + 2);
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
      if (length < 2) break; i += length + 2;
    }
  }
  return { width: null, height: null };
}

async function optimizeImage(originalPath, mediaDir, baseName) {
  let sharp;
  try { sharp = (await import('sharp')).default; } catch { return null; }
  const meta = await sharp(originalPath).metadata();
  if (!meta.width || !meta.height) return null;
  const widths = [...new Set([640, 960, 1280, 1600, 1920, meta.width].filter((w) => w <= meta.width))].sort((a, b) => a - b);
  const variants = [];
  for (const width of widths) {
    const name = `${baseName}-${width}.webp`; const dest = path.join(mediaDir, name);
    await sharp(originalPath).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(dest);
    variants.push({ path: `public/media/${name}`, width, bytes: (await fs.stat(dest)).size });
  }
  return { width: meta.width, height: meta.height, variants, largest: variants.at(-1) };
}

async function appendRegister(registerPath, row) {
  await fs.mkdir(path.dirname(registerPath), { recursive: true });
  let text = ''; try { text = await fs.readFile(registerPath, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parsed = parseCsv(text); const headers = [...new Set([...parsed.headers, ...REGISTER_HEADERS])];
  if (parsed.records.some((item) => item.asset_id === row.asset_id)) throw new Error(`Register already contains ${row.asset_id}; refusing to overwrite it.`);
  await fs.writeFile(registerPath, stringifyCsv(headers, [...parsed.records, row]), 'utf8');
}

export async function importDownloadedAsset({ sourceFile, projectDir, queuePath, registerPath, optimize = true }) {
  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  if (!Array.isArray(queue.items) || !queue.items.length) throw new Error('Media import queue is empty.');
  const item = queue.items[0];
  for (const key of ['asset_id', 'source_type', 'usage_role', 'target_section', 'proof_class']) if (!String(item[key] ?? '').trim()) throw new Error(`Queue item is missing ${key}.`);
  const sourceType = String(item.source_type).toUpperCase();
  const proof = String(item.proof_class).toUpperCase();
  if (sourceType === 'AI_GENERATED' && (proof !== 'CONCEPT_ART' || String(item.client_proof || 'NO').toUpperCase() !== 'NO')) throw new Error('AI_GENERATED media must be CONCEPT_ART with client_proof=NO; it cannot be client proof.');
  const ext = path.extname(sourceFile).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) throw new Error(`Unsupported image extension: ${ext || '(none)'}.`);
  const bytes = await fs.readFile(sourceFile); if (!bytes.length) throw new Error('Downloaded image is empty.');
  const hash = createHash('sha256').update(bytes).digest('hex'); const base = `${slug(item.asset_id)}-${hash.slice(0, 8)}`;
  const mediaDir = path.join(projectDir, 'public', 'media'); const originalsDir = path.join(mediaDir, 'originals');
  await fs.mkdir(originalsDir, { recursive: true });
  const originalName = `${base}${ext}`; const originalPath = path.join(originalsDir, originalName);
  await fs.copyFile(sourceFile, originalPath, fsSync.constants.COPYFILE_EXCL);
  let optimization = null; if (optimize) optimization = await optimizeImage(originalPath, mediaDir, base);
  const dims = optimization ? { width: optimization.width, height: optimization.height } : dimensionsFromHeader(bytes, ext);
  const localPath = optimization?.largest.path || `public/media/originals/${originalName}`;
  const licenseName = item.license_name || item.licence_name || (sourceType === 'AI_GENERATED' ? 'OpenAI Terms of Use — output terms, not a third-party stock licence' : '');
  const licenseUrl = item.license_url || item.licence_url || (sourceType === 'AI_GENERATED' ? 'https://openai.com/policies/terms-of-use/' : '');
  const row = {
    asset_id: item.asset_id, source_id: item.source_id || `SRC-${slug(item.asset_id)}`, original_filename_or_url: path.basename(sourceFile),
    description: item.description || '', creator_and_owner: item.creator_and_owner || (sourceType === 'AI_GENERATED' ? 'AI-generated with ChatGPT Image Generation' : 'PENDING — record creator/owner'),
    intended_use: item.description || '', permission_status: item.rights_status || 'PENDING', permission_evidence_status: item.permission_evidence_status || 'PENDING',
    consent_status: item.consent_status || 'PENDING', required_credit: item.credit_required || 'UNKNOWN',
    alt_text_candidate: item.alt_text_candidate || '', crop_and_focal_point_notes: item.focal_point || '', suitability_score: item.suitability_score || '',
    media_source_type: sourceType, exact_asset_page_url: item.asset_page_url || '', media_type: item.media_type || 'IMAGE',
    visual_role: item.usage_role, target_section: item.target_section, proof_class: proof, licence_name: licenseName,
    licence_url: licenseUrl, commercial_use: item.commercial_use || (sourceType === 'AI_GENERATED' ? 'YES : 'UNKNOWN')
licence_checked_on: item.license_checked_on || '', third_party_rights_status: item.third_party_rights_status || 'PENDING_REVIEW',
    model_release_status: item.model_release_status || 'PENDING', property_permission_status: item.property_permission_status || 'PENDING',
    trademark_permission_status: item.brand_permission_status || 'PENDING', permission_evidence_reference: item.permission_evidence_ref || '',
    optimized_project_path: localPath, optimized_format: optimization ? 'WEBP' : ext.slice(1).toUpperCase(),
    dimensions_and_bytes: `${dims.width || 'unknown'}x${dims.height || 'unknown'}; ${optimization?.largest.bytes || bytes.length} bytes`,
    focal_point: item.focal_point || '', crop_ratio: item.crop_ratio || '', loading_priority: item.loading_priority || 'LAZY',
    motion_and_reduced_motion_notes: item.motion_behavior || 'STATIC_IMAGE', provider_terms_url: item.provider_terms_url || '',
    provider_terms_checked_on: item.provider_terms_checked_on || '', project_context_use: item.project_context_use || 'ORDINARY_CLIENT_WEBSITE',
    provider_terms_status: item.provider_terms_status || (sourceType === 'AI_GENERATED' ? 'NOT_APPLICABLE' : 'PENDING'),
    acquisition_method: item.acquisition_method || (sourceType === 'AI_GENERATED' ? 'CHATGPT_IMAGE_SAVE_TO_DOWNLOADS' : 'HUMAN_LICENSE_AND_DOWNLOAD_TO_DOWNLOADS'),
    source_type: sourceType, asset_page_url: item.asset_page_url || '', usage_role: item.usage_role, license_name: licenseName,
    license_url: licenseUrl, license_status: item.license_status || (sourceType === 'AI_GENERATED' ? 'NOT_APPLICABLE' : 'PENDING'),
    rights_status: item.rights_status || 'PENDING', publication_status: item.publication_status || 'PENDING',
    permission_evidence_ref: item.permission_evidence_ref || '', client_proof: item.client_proof || 'NO',
    identifiable_people: item.identifiable_people || 'UNKNOWN', visible_brand_or_trademark: item.visible_brand_or_trademark || 'UNKNOWN',
    private_property_or_artwork: item.private_property_or_artwork || 'UNKNOWN', brand_permission_status: item.brand_permission_status || 'PENDING',
    credit_required: item.credit_required || 'UNKNOWN', credit_text: item.credit_text || '', is_selected_for_build: 'NO',
    file_size_bytes: optimization?.largest.bytes || bytes.length, poster_path: item.poster_path || '',
    motion_behavior: item.motion_behavior || 'STATIC_IMAGE', captions_or_transcript_status: item.captions_or_transcript_status || 'NOT_APPLICABLE',
    decorative: item.decorative || 'NO', media_dimensions: dims.width && dims.height ? `${dims.width}x${dims.height}` : '',
    responsive_variants: optimization?.variants.map((v) => `${v.path} ${v.width}w`).join(' | ') || ''
  };
  await appendRegister(registerPath, row);
  queue.items.shift(); queue.last_import = { asset_id: item.asset_id, sha256: hash, imported_at: new Date().toISOString(), original_file: originalName, optimized: Boolean(optimization) };
  await fs.writeFile(queuePath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
  const logDir = path.join(projectDir, '.studio'); await fs.mkdir(logDir, { recursive: true });
  const logPath = path.join(logDir, 'media-import-log.json'); let log = { version: 1, imports: [] };
  try { log = JSON.parse(await fs.readFile(logPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  log.imports.push({ ...queue.last_import, source_type: sourceType, local_path: localPath });
  await fs.writeFile(logPath, `${JSON.stringify(log, null, 2)}\n`, 'utf8');
  return { asset_id: item.asset_id, local_path: localPath, optimized: Boolean(optimization), remaining: queue.items.length };
}

async function imagesIn(folder) {
  let entries; try { entries = await fs.readdir(folder, { withFileTypes: true }); } catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const files = [];
  for (const entry of entries) if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) && !entry.name.startsWith('.')) {
    const filePath = path.join(folder, entry.name); const stat = await fs.stat(filePath); files.push({ filePath, time: stat.birthtimeMs || stat.mtimeMs });
  }
  return files.sort((a, b) => a.time - b.time || a.filePath.localeCompare(b.filePath)).map((item) => item.filePath);
}

export async function watchDownloads({ downloadsDir = defaultDownloads(), projectDir = process.cwd(), queuePath = path.join(projectDir, 'media-import-queue.json'), registerPath = path.join(projectDir, '02-content', 'content-asset-register.csv'), pollMs = POLL_MS, onLog = console.log } = {}) {
  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  if (!Array.isArray(queue.items) || !queue.items.length) throw new Error(`No queued media items in ${queuePath}.`);
  const seen = new Set(await imagesIn(downloadsDir)); const stability = new Map();
  onLog(`Watching ${downloadsDir} for ${queue.items.length} queued image(s). Save only the next planned image while the watcher is running.`);
  onLog('Only new files are considered. Existing Downloads are ignored. Press Ctrl+C to stop.');
  while (true) {
    for (const file of await imagesIn(downloadsDir)) {
      if (seen.has(file)) continue;
      const size = (await fs.stat(file)).size; const previous = stability.get(file);
      const stable = previous && previous.size === size ? previous.count + 1 : 1;
      stability.set(file, { size, count: stable }); if (!size || stable < STABLE_POLLS) continue;
      try {
        const result = await importDownloadedAsset({ sourceFile: file, projectDir, queuePath, registerPath });
        seen.add(file); stability.delete(file);
        onLog(`Imported ${result.asset_id} → ${result.local_path}; optimized=${result.optimized}; remaining=${result.remaining}. Rights/publication stay PENDING.`);
        if (!result.optimized) onLog('Optional optimization: install sharp once in this website project (npm install --save-dev sharp) to create responsive WebP files automatically.');
        if (result.remaining === 0) { onLog('Queue complete. Media has NOT been auto-approved or selected for the production build.'); return; }
      } catch (error) { seen.add(file); stability.delete(file); onLog(`Skipped ${path.basename(file)}: ${error.message}`); }
    }
    await sleep(pollMs);
  }
}

async function main() {
  const args = process.argv.slice(2); const value = (key, fallback) => { const i = args.indexOf(key); return i >= 0 && args[i + 1] ? args[i + 1] : fallback; };
  const projectDir = path.resolve(value('--project', process.cwd()));
  const downloadsDir = path.resolve(value('--downloads', defaultDownloads()));
  const queuePath = path.resolve(projectDir, value('--queue', 'media-import-queue.json'));
  const registerPath = path.resolve(projectDir, value('--register', '02-content/content-asset-register.csv'));
  if (args.includes('--help')) { console.log('Usage: npm run media:watch -- [--project DIR] [--downloads DIR] [--queue FILE] [--register FILE]'); return; }
  await watchDownloads({ downloadsDir, projectDir, queuePath, registerPath });
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main().catch((error) => { console.error(`Media inbox stopped: ${error.message}`); process.exitCode = 1; });
