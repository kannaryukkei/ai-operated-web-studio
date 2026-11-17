import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { importDownloadedAsset, parseCsv, stringifyCsv } from '../../blueprints/starter/template-kit/starter/scripts/media-inbox.mjs';

const PNG_1X1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/pXcAAAAASUVORK5CYII=', 'base64');

async function tempProject(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'web-studio-media-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const downloads = path.join(root, 'Downloads');
  const project = path.join(root, 'project');
  await fs.mkdir(downloads, { recursive: true });
  await fs.mkdir(project, { recursive: true });
  return { root, downloads, project };
}

test('AI-generated image import consumes one queue item and records concept art as pending, not approved', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'ChatGPT Image.png');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  const registerPath = path.join(project, '02-content', 'content-asset-register.csv');
  await fs.mkdir(path.dirname(registerPath), { recursive: true });
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'AI-HERO-001', source_id: 'SRC-AI-001', source_type: 'AI_GENERATED',
    description: 'Editorial workshop atmosphere concept for hero section', usage_role: 'CONCEPT_VISUAL',
    target_section: 'hero', proof_class: 'CONCEPT_ART', client_proof: 'NO', media_type: 'IMAGE',
    commercial_use: 'YES', alt_text_candidate: 'Conceptual close-up of a clean detailing studio environment',
    identifiable_people: 'NO', visible_brand_or_trademark: 'NO', private_property_or_artwork: 'NO',
    decorative: 'NO', motion_behavior: 'STATIC_IMAGE', provider_terms_status: 'NOT_APPLICABLE',
    rights_status: 'APPROVED', publication_status: 'APPROVED', permission_evidence_ref: 'AI-FABRICATED-APPROVAL',
    license_status: 'VERIFIED', is_selected_for_build: 'YES'
  }] }, null, 2));

  const result = await importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false });
  assert.equal(result.asset_id, 'AI-HERO-001');
  assert.equal(result.remaining, 0);
  assert.match(result.local_path, /^public\/media\/originals\/[^/\\]+\.png$/);

  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  assert.equal(queue.items.length, 0);
  const csv = parseCsv(await fs.readFile(registerPath, 'utf8'));
  assert.equal(csv.records.length, 1);
  assert.equal(csv.records[0].source_type, 'AI_GENERATED');
  assert.equal(csv.records[0].proof_class, 'CONCEPT_ART');
  assert.equal(csv.records[0].client_proof, 'NO');
  assert.equal(csv.records[0].rights_status, 'PENDING');
  assert.equal(csv.records[0].publication_status, 'PENDING');
  assert.equal(csv.records[0].permission_evidence_ref, '');
  assert.equal(csv.records[0].license_status, 'NOT_APPLICABLE');
  assert.equal(csv.records[0].provider_terms_status, 'NOT_APPLICABLE');
  assert.equal(csv.records[0].is_selected_for_build, 'NO');
  assert.equal(csv.records[0].source_sha256.length, 64);
  assert.equal(csv.records[0].commercial_use, 'YES');
});

test('AI-generated images cannot be queued as client proof', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'wrong.png');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  const registerPath = path.join(project, 'asset-register.csv');
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'AI-FAKE-PROOF', source_type: 'AI_GENERATED', usage_role: 'CLIENT_WORK',
    target_section: 'gallery', proof_class: 'CLIENT_WORK', client_proof: 'YES'
  }] }));
  await assert.rejects(importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false }), /must be CONCEPT_ART/);
  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  assert.equal(queue.items.length, 1);
});

test('stock import never trusts approval claims from the queue and remains contextual', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'licensed-stock.jpg');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  const registerPath = path.join(project, '02-content', 'content-asset-register.csv');
  await fs.mkdir(path.dirname(registerPath), { recursive: true });
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'STOCK-HERO-001', source_id: 'SRC-STOCK-001', source_type: 'ADOBE_STOCK',
    description: 'Licensed illustrative service context', usage_role: 'STOCK_CONTEXT',
    target_section: 'hero', proof_class: 'STOCK_CONTEXT', client_proof: 'NO', media_type: 'IMAGE',
    asset_page_url: 'https://stock.adobe.com/example', license_name: 'Adobe Stock Standard License',
    license_url: 'https://www.adobe.com/go/stockterms', license_status: 'VERIFIED',
    provider_terms_url: 'https://www.adobe.com/legal/terms.html', provider_terms_checked_on: '2026-11-16',
    provider_terms_status: 'APPROVED', acquisition_method: 'UNSAFE_AUTOMATION',
    rights_status: 'APPROVED', publication_status: 'APPROVED', permission_evidence_ref: 'FAKE-APPROVAL',
    identifiable_people: 'NO', visible_brand_or_trademark: 'NO', private_property_or_artwork: 'NO',
    commercial_use: 'YES', suitability_score: '20', is_selected_for_build: 'YES'
  }] }, null, 2));

  await importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false });
  const csv = parseCsv(await fs.readFile(registerPath, 'utf8'));
  assert.equal(csv.records.length, 1);
  const record = csv.records[0];
  assert.equal(record.proof_class, 'STOCK_CONTEXT');
  assert.equal(record.client_proof, 'NO');
  assert.equal(record.rights_status, 'PENDING');
  assert.equal(record.publication_status, 'PENDING');
  assert.equal(record.license_status, 'PENDING');
  assert.equal(record.provider_terms_status, 'PENDING');
  assert.equal(record.permission_evidence_ref, '');
  assert.equal(record.permission_evidence_reference, '');
  assert.equal(record.is_selected_for_build, 'NO');
  assert.equal(record.acquisition_method, 'HUMAN_LICENSE_AND_DOWNLOAD_TO_DOWNLOADS');
  assert.equal(record.provider_terms_checked_on, '');
});

test('stock cannot be imported as client-work proof', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'mislabelled.png');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'STOCK-FAKE-PROOF', source_type: 'UNSPLASH', usage_role: 'CLIENT_WORK',
    target_section: 'gallery', proof_class: 'CLIENT_WORK', client_proof: 'YES', media_type: 'IMAGE'
  }] }));
  await assert.rejects(importDownloadedAsset({
    sourceFile: source, projectDir: project, queuePath,
    registerPath: path.join(project, 'asset-register.csv'), optimize: false
  }), /Stock media must be STOCK_CONTEXT/);
  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  assert.equal(queue.items.length, 1);
  assert.equal(await fs.stat(path.join(project, 'public', 'media', 'originals')).catch(() => null), null);
});

test('failed log write can be retried without duplicate register rows or copied-file collisions', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'ChatGPT Image.png');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  const registerPath = path.join(project, '02-content', 'content-asset-register.csv');
  await fs.mkdir(path.dirname(registerPath), { recursive: true });
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'AI-RETRY-001', source_type: 'AI_GENERATED', usage_role: 'CONCEPT_VISUAL',
    target_section: 'hero', proof_class: 'CONCEPT_ART', client_proof: 'NO', media_type: 'IMAGE',
    identifiable_people: 'NO', visible_brand_or_trademark: 'NO', private_property_or_artwork: 'NO'
  }] }));
  const logPath = path.join(project, '.studio', 'media-import-log.json');
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  await fs.writeFile(logPath, '{invalid-json');
  await assert.rejects(importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false }));
  assert.equal(JSON.parse(await fs.readFile(queuePath, 'utf8')).items.length, 1);

  await fs.writeFile(logPath, JSON.stringify({ version: 1, imports: [] }));
  const retried = await importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false });
  assert.equal(retried.remaining, 0);
  assert.equal(parseCsv(await fs.readFile(registerPath, 'utf8')).records.length, 1);
  assert.equal(JSON.parse(await fs.readFile(logPath, 'utf8')).imports.length, 1);
});

test('AI-generated concepts cannot carry client-work roles even when proof_class is CONCEPT_ART', async (t) => {
  const { downloads, project } = await tempProject(t);
  const source = path.join(downloads, 'wrong-role.png');
  await fs.writeFile(source, PNG_1X1);
  const queuePath = path.join(project, 'media-import-queue.json');
  await fs.writeFile(queuePath, JSON.stringify({ version: 1, items: [{
    asset_id: 'AI-WRONG-ROLE', source_type: 'AI_GENERATED', usage_role: 'CLIENT_WORK',
    target_section: 'gallery', proof_class: 'CONCEPT_ART', client_proof: 'NO', media_type: 'IMAGE'
  }] }));
  await assert.rejects(importDownloadedAsset({
    sourceFile: source, projectDir: project, queuePath,
    registerPath: path.join(project, 'asset-register.csv'), optimize: false
  }), /AI_GENERATED media cannot use/);
});

test('CSV parser and writer round-trip commas, quotes and line breaks', () => {
  const headers = ['asset_id', 'description'];
  const records = [{ asset_id: 'A-1', description: 'Workshop, "premium" finish\nsecond line' }];
  const parsed = parseCsv(stringifyCsv(headers, records));
  assert.deepEqual(parsed.records, records);
});
