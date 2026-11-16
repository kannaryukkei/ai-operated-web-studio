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

test('selected stock is accepted only after both content licence and provider-terms approval', () => {
  const result = validateAsset(find('FIXTURE-PEXELS-CONTEXT'));
  assert.equal(result.eligible, true, result.issues.join('\n'));
  assert.equal(find('FIXTURE-PEXELS-CONTEXT').proof_class, 'STOCK_CONTEXT');
});


test('ambiguous performance-benchmark provider terms block a stock asset until resolved', () => {
  const asset = structuredClone(find('FIXTURE-PEXELS-CONTEXT'));
  asset.project_context_use = 'INTERNAL_PERFORMANCE_BENCHMARK';
  asset.provider_terms_status = 'PENDING';
  const result = validateAsset(asset);
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /provider Terms of Service are not APPROVED/i.test(issue)));
});

test('stock provider terms must be recorded separately from the item content licence', () => {
  const asset = structuredClone(find('FIXTURE-PEXELS-CONTEXT'));
  asset.provider_terms_url = '';
  asset.provider_terms_checked_on = '';
  const result = validateAsset(asset);
  assert.equal(result.eligible, false);
  assert.ok(result.issues.some((issue) => /provider Terms of Service URL/i.test(issue)));
  assert.ok(result.issues.some((issue) => /provider-terms check date/i.test(issue)));
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
    'commercial_use', 'licence_checked_on', 'provider_terms_url', 'provider_terms_checked_on',
    'project_context_use', 'provider_terms_status', 'acquisition_method', 'third_party_rights_status',
    'model_release_status', 'property_permission_status', 'trademark_permission_status',
    'optimized_project_path', 'optimized_format', 'dimensions_and_bytes',
    'focal_point', 'crop_ratio', 'loading_priority', 'motion_and_reduced_motion_notes',
  ];
  for (const field of required) assert.ok(fields.has(field), 'missing register field: ' + field);
});


test('AI-generated concept imagery is recognized but remains excluded until rights and publication are approved', () => {
  const record = {
    asset_id: 'FIXTURE-AI-CONCEPT', source_type: 'AI_GENERATED',
    creator_and_owner: 'AI-generated with ChatGPT Image Generation', media_type: 'IMAGE',
    usage_role: 'CONCEPT_VISUAL', proof_class: 'CONCEPT_ART', client_proof: 'NO',
    commercial_use: 'YES', identifiable_people: 'NO', visible_brand_or_trademark: 'NO',
    private_property_or_artwork: 'NO', rights_status: 'PENDING', publication_status: 'PENDING',
    is_selected_for_build: 'NO',
  };
  const validConcept = validateAsset(record);
  assert.ok(!validConcept.issues.some((issue) => /source_type is not recognized|AI_GENERATED media/i.test(issue)));
  assert.equal(validConcept.eligible, false);
  const fakeProof = validateAsset({ ...record, proof_class: 'CLIENT_WORK', client_proof: 'YES' });
  assert.ok(fakeProof.issues.some((issue) => /proof_class=CONCEPT_ART/i.test(issue)));
  assert.ok(fakeProof.issues.some((issue) => /can never be client proof/i.test(issue)));
});

test('Adobe Stock and Envato Elements are recognized only through both independent rights gates', () => {
  for (const source_type of ['ADOBE_STOCK', 'ENVATO_ELEMENTS']) {
    const result = validateAsset({
      asset_id: 'FIXTURE-' + source_type, source_type, creator_and_owner: 'Fixture creator',
      media_type: 'IMAGE', usage_role: 'STOCK_CONTEXT', proof_class: 'STOCK_CONTEXT',
      asset_page_url: 'https://example.com/exact-item', license_name: 'Commercial stock license',
      license_url: 'https://example.com/license', license_status: 'VERIFIED',
      provider_terms_url: 'https://example.com/terms', provider_terms_checked_on: '2026-11-16',
      project_context_use: 'ORDINARY_CLIENT_WEBSITE', provider_terms_status: 'APPROVED',
      acquisition_method: 'HUMAN_LICENSE_AND_DOWNLOAD', commercial_use: 'YES',
      identifiable_people: 'NO', visible_brand_or_trademark: 'NO', private_property_or_artwork: 'NO',
      rights_status: 'APPROVED', publication_status: 'APPROVED', permission_evidence_ref: 'FIXTURE-RIGHTS',
      credit_required: 'NO', suitability_score: '20', is_selected_for_build: 'YES',
      optimized_project_path: 'public/media/fixture.webp', alt_text_candidate: 'Illustrative service context',
      file_size_bytes: '120000',
    });
    assert.equal(result.eligible, true, result.issues.join('\\n'));
  }
});
