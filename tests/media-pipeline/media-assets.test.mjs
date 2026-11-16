import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateAsset, parseCsv, validateRequirements } from '../../scripts/media-asset-validator.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixtureRoot = path.join(here, 'fixtures');
const assets = JSON.parse(fs.readFileSync(path.join(fixtureRoot, 'asset-records.json'), 'utf8'));
const find = (id) => assets.find((asset) => asset.asset_id === id);

test('selected Pexels commercial stock is accepted only as STOCK_CONTEXT', () => {
  const result = validateAsset(find('FIXTURE-PEXELS-CONTEXT'));
  assert.equal(result.eligible, true, result.issues.join('\n'));
  assert.equal(find('FIXTURE-PEXELS-CONTEXT').proof_class, 'STOCK_CONTEXT');
});

test('Mixkit Free License video passes with poster and reduced-motion behavior', () => {
  const asset = find('FIXTURE-MIXKIT-FREE-VIDEO');
  const result = validateAsset(asset);
  assert.equal(result.eligible, true, result.issues.join('\n'));
  assert.ok(asset.poster_path);
  assert.match(asset.motion_behavior, /REDUCED_MOTION/);
});

test('verified client-supplied work can pass only with evidence and approvals', () => {
  const result = validateAsset(find('FIXTURE-CLIENT-REAL-WORK'));
  assert.equal(result.eligible, true, result.issues.join('\n'));
});

test('Mixkit Restricted License is blocked for commercial website use', () => {
  const result = validateAsset(find('FIXTURE-MIXKIT-RESTRICTED'));
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /commercial use|restricted/i.test(issue)));
});

test('stock media falsely labelled as client work is blocked', () => {
  const result = validateAsset(find('FIXTURE-STOCK-MISLABELLED-PROOF'));
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /CLIENT_WORK proof must originate/i.test(issue)));
});

test('client-supplied asset with unknown owner/release permissions remains blocked', () => {
  const result = validateAsset(find('FIXTURE-CLIENT-PERMISSION-PENDING'));
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /rights|permission/i.test(issue)));
  assert.ok(result.issues.some((issue) => /model release/i.test(issue)));
  assert.ok(result.issues.some((issue) => /property/i.test(issue)));
});

test('selected assets need project-local media paths, not third-party hotlinks', () => {
  const asset = structuredClone(find('FIXTURE-PEXELS-CONTEXT'));
  asset.optimized_project_path = 'https://images.unsplash.com/example.jpg';
  const result = validateAsset(asset);
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /local project path/i.test(issue)));
});

test('required credit is enforced when the item licence requires attribution', () => {
  const asset = structuredClone(find('FIXTURE-PEXELS-CONTEXT'));
  asset.credit_required = 'YES';
  asset.credit_text = '';
  const result = validateAsset(asset);
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /credit/i.test(issue)));
});

test('media requirements fixture covers SPG hero, treatments, real proof, process and member app', () => {
  const csv = fs.readFileSync(path.join(fixtureRoot, 'starpoint-garage-media-requirements.csv'), 'utf8');
  const rows = parseCsv(csv);
  const result = validateRequirements(rows);
  assert.equal(result.valid, true, result.issues.join('\n'));
  assert.equal(rows.length, 5);
  assert.ok(rows.some((row) => row.section_key === 'gallery' && row.proof_class === 'CLIENT_WORK'));
});

test('CSV parser preserves commas inside quoted business/media descriptions', () => {
  const rows = parseCsv('id,description\n1,"Photo of workshop, bikes and staff"\n');
  assert.equal(rows[0].description, 'Photo of workshop, bikes and staff');
});

test('unresolved asset permission cannot be promoted by setting publication status to APPROVED', () => {
  const asset = structuredClone(find('FIXTURE-CLIENT-PERMISSION-PENDING'));
  asset.publication_status = 'APPROVED';
  asset.rights_status = 'APPROVED';
  const result = validateAsset(asset);
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /permission evidence/i.test(issue)));
});


test('canonical asset register template includes source, rights, proof and implementation metadata', () => {
  const registerPath = path.resolve(here, '../../blueprints/starter/template-kit/templates/starter-client/02-content/content-asset-register.csv');
  const rows = parseCsv(fs.readFileSync(registerPath, 'utf8'));
  assert.equal(rows.length, 1);
  const fields = new Set(Object.keys(rows[0]));
  const required = [
    'asset_id', 'source_id', 'original_filename_or_url', 'creator_and_owner',
    'permission_status', 'permission_evidence_status', 'consent_status',
    'media_source_type', 'exact_asset_page_url', 'media_type', 'visual_role',
    'target_section', 'proof_class', 'licence_name', 'licence_url',
    'commercial_use', 'licence_checked_on', 'third_party_rights_status',
    'model_release_status', 'property_permission_status', 'trademark_permission_status',
    'optimized_project_path', 'optimized_format', 'dimensions_and_bytes',
    'focal_point', 'crop_ratio', 'loading_priority', 'motion_and_reduced_motion_notes',
  ];
  for (const field of required) assert.ok(fields.has(field), 'missing register field: ' + field);
});
