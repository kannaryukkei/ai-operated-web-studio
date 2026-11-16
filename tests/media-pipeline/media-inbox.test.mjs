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
    target_section: 'hero', proof_class: 'CONCEPT_ART", client_proof: 'NO', media_type: 'IMAGE',
    commercial_use: 'YES', alt_text_candidate: 'Conceptual close-up of a clean detailing studio environment',
    identifiable_people: 'NO', visible_brand_or_trademark: 'NO', private_property_or_artwork: 'NO',
    decorative: 'NO', motion_behavior: 'STATIC_IMAGE', provider_terms_status: 'NOT_APPLICABLE'
  }] }, null, 2));

  const result = await importDownloadedAsset({ sourceFile: source, projectDir: project, queuePath, registerPath, optimize: false });
  assert.equal(result.asset_id, 'AI-HERO-001');
  assert.equal(result.remaining, 0);
  assert.ok(result.local_path.startsWith(path.join('public', 'media', 'originals')));

  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'));
  assert.equal(queue.items.length, 0);
  const csv = parseCsv(await fs.readFile(registerPath, 'utf8'));
  assert.equal(csv.records.length, 1);
  assert.equal(csv.records[0].source_type, 'AI_GENERATED');
  assert.equal(csv.records[0].proof_class, 'CONCEPT_ART');
  assert.equal(csv.records[0].client_proof, 'NO');
  assert.equal(csv.records[0].rights_status, 'PENDING');
  assert.equal(csv.records[0].publication_status, 'PENDING');
  assert.equal(csv.records[0].is_selected_for_build, 'NO');
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

test('CSV parser and writer round-trip commas, quotes and line breaks', () => {
  const headers = ['asset_id', 'description'];
  const records = [{ asset_id: 'A-1', description: 'Workshop, "premium" finish\nsecond line' }];
  const parsed = parseCsv(stringifyCsv(headers, records));
  assert.deepEqual(parsed.records, records);
});
