import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile as execFileCb } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { validateDiscoveryResultJson } from '../scripts/discovery-result-validator.mjs';

const execFile = promisify(execFileCb);
const here = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(here, '..', 'scripts', 'discovery-result-validator.mjs');

function baseResult() {
  return {
    business_summary: 'Fixture bike workshop serving city commuters.',
    business_model_summary:
      'Sells repair services to commuters in one city shop; customers book by phone and pay at the shop.',
    primary_audience: ['City commuters needing quick repairs'],
    website_goal: 'Increase repair bookings.',
    primary_conversion: 'Phone booking via the listed number.',
    recommended_tier: 'starter',
    recommendation_rationale: ['One service, one location, one conversion path.'],
    offer_matrix: [
      {
        name: 'Standard service',
        details: 'Brake and gear check.',
        pricing: 'Not provided',
        source: 'intake:products_services',
        evidence_status: 'CLIENT-PROVIDED-UNVERIFIED',
      },
    ],
    customer_question_map: [
      {
        question: 'How much does a service cost?',
        answer_or_gap: 'Price not provided.',
        stage: 'BEFORE_PURCHASE',
        answer_status: 'GAP',
        milestone_priority: 'PREVIEW_BLOCKER',
        source: 'MISSING',
        owner_or_action: 'Client to confirm price.',
      },
    ],
    fact_register: [
      {
        fact: 'The shop is in one city location.',
        source: 'intake:location',
        evidence_status: 'CLIENT-PROVIDED-UNVERIFIED',
        publication_status: 'PENDING',
        notes: 'Confirm before publishing.',
      },
    ],
    cta_register: [
      {
        action: 'Call the shop',
        destination: 'NOT_CONFIGURED',
        destination_status: 'NOT_CONFIGURED',
        expected_behavior: 'No number supplied; the visitor cannot call yet.',
      },
    ],
    asset_register: [],
    buying_journey: [
      {
        stage: 'BEFORE_PURCHASE',
        customer_need: 'Find a trustworthy nearby workshop.',
        website_support: 'Services, location and proof.',
      },
    ],
    trust_register: [
      {
        proof: 'No verified proof supplied; the page states the gap plainly.',
        source: 'MISSING',
        evidence_status: 'MISSING',
        publication_status: 'PENDING',
      },
    ],
    content_gaps: [
      {
        gap: 'Service price list.',
        owner_or_source: 'Client',
        milestone_priority: 'PREVIEW_BLOCKER',
      },
    ],
    sections: [
      {
        key: 'services',
        purpose: 'Explain the service.',
        visitor_question: 'What do you fix?',
        draft_message: 'Repairs for commuter bikes.',
      },
    ],
    missing_information: ['Service prices.'],
    claims_requiring_approval: [],
    scope_risks: [],
    next_step: 'Ask the client for the price list.',
  };
}

function validate(value) {
  return validateDiscoveryResultJson(JSON.stringify(value));
}

test('accepts a complete valid discovery result', () => {
  const result = validate(baseResult());
  assert.equal(result.valid, true, result.errors.join('\n'));
  assert.deepEqual(result.errors, []);
});

test('rejects invalid JSON and points at Markdown code fences', () => {
  const result = validateDiscoveryResultJson('```json\n{"business_summary": "x"}\n```');
  assert.equal(result.valid, false);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /without Markdown code fences/);
});

test('rejects a top-level JSON array', () => {
  const result = validateDiscoveryResultJson('[]');
  assert.equal(result.valid, false);
  assert.match(result.errors[0], /must be a JSON object/);
});

test('names a missing required top-level field', () => {
  const value = baseResult();
  delete value.website_goal;
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.startsWith('website_goal:')));
  assert.match(
    result.errors.find((error) => error.startsWith('website_goal:')),
    /field is required/,
  );
});

test('requires at least one item in the min-1 registers', () => {
  const value = baseResult();
  value.offer_matrix = [];
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) => error === 'offer_matrix: The offer_matrix field must have at least 1 items.'),
  );
});

test('allows empty present-only lists but requires their keys', () => {
  const value = baseResult();
  value.asset_register = [];
  value.missing_information = [];
  value.claims_requiring_approval = [];
  value.scope_risks = [];
  assert.equal(validate(value).valid, true);

  const missing = baseResult();
  delete missing.asset_register;
  const result = validate(missing);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) => error === 'asset_register: The asset_register field must be present.',
    ),
  );
});

test('requires at least one item in trust_register and content_gaps', () => {
  const value = baseResult();
  value.trust_register = [];
  value.content_gaps = [];
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.startsWith('trust_register:')));
  assert.ok(result.errors.some((error) => error.startsWith('content_gaps:')));
});

test('rejects an invalid enum value', () => {
  const value = baseResult();
  value.recommended_tier = 'enterprise';
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) => error === 'recommended_tier: The selected recommended_tier is invalid.',
    ),
  );
});

test('rejects an over-long string', () => {
  const value = baseResult();
  value.business_summary = 'x'.repeat(5001);
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) =>
        error ===
        'business_summary: The business_summary field must not be greater than 5000 characters.',
    ),
  );
});

test('names a missing nested field with a dotted path', () => {
  const value = baseResult();
  delete value.fact_register[0].notes;
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some(
      (error) =>
        error === 'fact_register.0.notes: The fact_register.0.notes field is required.',
    ),
  );
});

test('rejects a non-object register item for every expected sub-field', () => {
  const value = baseResult();
  value.offer_matrix = ['not an object'];
  const result = validate(value);
  assert.equal(result.valid, false);
  assert.equal(result.errors.length, 5);
  assert.ok(result.errors.every((error) => error.startsWith('offer_matrix.0.')));
});

test('rejects input longer than 60000 characters', () => {
  const result = validateDiscoveryResultJson('x'.repeat(60001));
  assert.equal(result.valid, false);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /must not be greater than 60000 characters/);
});

test('CLI accepts a valid file and rejects an invalid file', async (t) => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'discovery-validator-test-'));
  t.after(() => fs.rm(temp, { recursive: true, force: true }));

  const validPath = path.join(temp, 'valid.json');
  const invalidPath = path.join(temp, 'invalid.json');
  await fs.writeFile(validPath, JSON.stringify(baseResult()));
  const invalid = baseResult();
  delete invalid.next_step;
  await fs.writeFile(invalidPath, JSON.stringify(invalid));

  const validRun = await execFile(process.execPath, [script, '--file', validPath]);
  assert.match(validRun.stdout, /Valid discovery result/);

  await assert.rejects(execFile(process.execPath, [script, '--file', invalidPath]), (error) => {
    assert.equal(error.code, 1);
    assert.match(error.stderr, /next_step: The next_step field is required\./);
    return true;
  });
});
