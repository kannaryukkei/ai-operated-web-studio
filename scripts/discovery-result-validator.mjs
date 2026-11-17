// Local discovery-result validator.
//
// This script mirrors platform/app/Services/Discovery/DiscoveryContract.php
// ::validateResultJson() so a discovery JSON produced by an external AI
// application can be machine-checked without running the Laravel platform.
// It is dependency-free and runs on Node.js 20+:
//
//   node scripts/discovery-result-validator.mjs --file 02-discovery/discovery-result.json
//
// Exit code 0 means the result is valid. Exit code 1 prints one
// "field: message" line per problem, using the same Laravel dot notation
// the platform validator uses (for example "offer_matrix.0.name").
//
// Scope: this validates the discovery output shape the platform prompt
// requests. That shape is the partial summary bridge described in
// docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md section 7; it is not yet
// the full canonical packet (envelope plus source/fact/asset registers).
// The full packet checks in section 6 of that document are a separate,
// later validator.
//
// Fidelity notes:
// - The 60,000-character input limit comes from
//   DiscoveryContract::resultJsonInputRules().
// - Unknown top-level keys are ignored, matching Laravel validation.
// - trust_register and content_gaps must contain at least one item: the
//   platform rules mark them "required", and Laravel rejects empty arrays
//   for required fields, even though the prompt text suggests empty arrays
//   are allowed. That prompt/validator mismatch is flagged, not changed
//   here; changing it needs an owner decision.
// - For an empty list that requires at least one item, this script reports
//   only the min-items message; the platform reports both the required and
//   the min-items messages. The set of rejected inputs is identical.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MAX_INPUT_CHARACTERS = 60000;

const EVIDENCE_STATUSES = new Set([
  'VERIFIED',
  'CLIENT-PROVIDED-UNVERIFIED',
  'DEMO-ONLY',
  'ASSUMPTION',
  'MISSING',
  'CONFLICT',
]);
const PUBLICATION_STATUSES = new Set(['APPROVED', 'PENDING', 'NOT_APPROVED']);
const JOURNEY_STAGES = new Set(['BEFORE_PURCHASE', 'DURING_PURCHASE', 'AFTER_PURCHASE']);
const MILESTONE_PRIORITIES = new Set(['PREVIEW_BLOCKER', 'PRODUCTION_BLOCKER', 'OPTIONAL_GAP']);
const ANSWER_STATUSES = new Set(['ANSWERED', 'GAP', 'NOT_APPLICABLE']);
const DESTINATION_STATUSES = new Set([
  'APPROVED_REAL_DESTINATION',
  'NOT_CONFIGURED',
  'NEEDS_APPROVAL',
  'DEMO_ONLY',
]);
const PERMISSION_STATUSES = new Set(['APPROVED', 'PENDING', 'NOT_APPROVED', 'NOT_APPLICABLE']);
const CONSENT_STATUSES = new Set(['CONFIRMED', 'PENDING', 'NOT_APPROVED', 'NOT_APPLICABLE']);
const TIERS = new Set(['starter', 'business', 'custom']);

const OFFER_FIELDS = [
  { name: 'name', kind: 'string', max: 300 },
  { name: 'details', kind: 'string', max: 1500 },
  { name: 'pricing', kind: 'string', max: 500 },
  { name: 'source', kind: 'string', max: 1000 },
  { name: 'evidence_status', kind: 'enum', values: EVIDENCE_STATUSES },
];
const CUSTOMER_QUESTION_FIELDS = [
  { name: 'question', kind: 'string', max: 1000 },
  { name: 'answer_or_gap', kind: 'string', max: 1500 },
  { name: 'stage', kind: 'enum', values: JOURNEY_STAGES },
  { name: 'answer_status', kind: 'enum', values: ANSWER_STATUSES },
  { name: 'milestone_priority', kind: 'enum', values: MILESTONE_PRIORITIES },
  { name: 'source', kind: 'string', max: 1000 },
  { name: 'owner_or_action', kind: 'string', max: 500 },
];
const FACT_FIELDS = [
  { name: 'fact', kind: 'string', max: 1000 },
  { name: 'source', kind: 'string', max: 1000 },
  { name: 'evidence_status', kind: 'enum', values: EVIDENCE_STATUSES },
  { name: 'publication_status', kind: 'enum', values: PUBLICATION_STATUSES },
  { name: 'notes', kind: 'string', max: 1000 },
];
const CTA_FIELDS = [
  { name: 'action', kind: 'string', max: 300 },
  { name: 'destination', kind: 'string', max: 1000 },
  { name: 'destination_status', kind: 'enum', values: DESTINATION_STATUSES },
  { name: 'expected_behavior', kind: 'string', max: 1000 },
];
const ASSET_FIELDS = [
  { name: 'asset_or_need', kind: 'string', max: 500 },
  { name: 'source_or_owner', kind: 'string', max: 1000 },
  { name: 'permission_status', kind: 'enum', values: PERMISSION_STATUSES },
  { name: 'permission_evidence_status', kind: 'enum', values: EVIDENCE_STATUSES },
  { name: 'consent_status', kind: 'enum', values: CONSENT_STATUSES },
  { name: 'intended_use', kind: 'string', max: 500 },
  { name: 'credit_or_restrictions', kind: 'string', max: 1000 },
];
const BUYING_JOURNEY_FIELDS = [
  { name: 'stage', kind: 'enum', values: JOURNEY_STAGES },
  { name: 'customer_need', kind: 'string', max: 1000 },
  { name: 'website_support', kind: 'string', max: 1000 },
];
const TRUST_FIELDS = [
  { name: 'proof', kind: 'string', max: 1000 },
  { name: 'source', kind: 'string', max: 1000 },
  { name: 'evidence_status', kind: 'enum', values: EVIDENCE_STATUSES },
  { name: 'publication_status', kind: 'enum', values: PUBLICATION_STATUSES },
];
const CONTENT_GAP_FIELDS = [
  { name: 'gap', kind: 'string', max: 1000 },
  { name: 'owner_or_source', kind: 'string', max: 500 },
  { name: 'milestone_priority', kind: 'enum', values: MILESTONE_PRIORITIES },
];
const SECTION_FIELDS = [
  { name: 'key', kind: 'string', max: 100 },
  { name: 'purpose', kind: 'string', max: 1000 },
  { name: 'visitor_question', kind: 'string', max: 1000 },
  { name: 'draft_message', kind: 'string', max: 2000 },
];

const USAGE = `Usage: node scripts/discovery-result-validator.mjs --file <path-to-discovery-result.json>

Validates a discovery result JSON file against the platform discovery
contract (see DiscoveryContract::validateResultJson). The file must
contain one raw JSON object, without Markdown code fences.

Exit code 0: valid. Exit code 1: one "field: message" line per problem.`;

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function charLength(value) {
  return [...value].length;
}

function isBlank(value) {
  return typeof value === 'string' && value.trim() === '';
}

function fail(errors, field, message) {
  errors.push(`${field}: ${message}`);
}

function checkString(errors, field, value, max) {
  if (value === undefined || value === null || isBlank(value)) {
    fail(errors, field, `The ${field} field is required.`);
    return;
  }
  if (typeof value !== 'string') {
    fail(errors, field, `The ${field} field must be a string.`);
    return;
  }
  if (charLength(value) > max) {
    fail(errors, field, `The ${field} field must not be greater than ${max} characters.`);
  }
}

function checkEnum(errors, field, value, allowed) {
  if (value === undefined || value === null || isBlank(value)) {
    fail(errors, field, `The ${field} field is required.`);
    return;
  }
  if (!allowed.has(value)) {
    fail(errors, field, `The selected ${field} is invalid.`);
  }
}

function checkListContainer(errors, field, value, { min = 0, present = false }) {
  if (value === undefined) {
    fail(
      errors,
      field,
      present ? `The ${field} field must be present.` : `The ${field} field is required.`,
    );
    return false;
  }
  if (value === null) {
    fail(
      errors,
      field,
      present ? `The ${field} field must be an array.` : `The ${field} field is required.`,
    );
    return false;
  }
  if (!Array.isArray(value)) {
    fail(errors, field, `The ${field} field must be an array.`);
    return false;
  }
  if (value.length === 0) {
    if (min > 0) {
      fail(errors, field, `The ${field} field must have at least ${min} items.`);
      return false;
    }
    if (!present) {
      fail(errors, field, `The ${field} field is required.`);
      return false;
    }
  }
  return true;
}

function checkStringList(errors, field, value, { min = 0, max, present = false }) {
  if (!checkListContainer(errors, field, value, { min, present })) return;
  value.forEach((item, index) => {
    checkString(errors, `${field}.${index}`, item, max);
  });
}

function checkRecordList(errors, field, value, { min = 0, present = false, fields }) {
  if (!checkListContainer(errors, field, value, { min, present })) return;
  value.forEach((item, index) => {
    const base = `${field}.${index}`;
    if (!isRecord(item)) {
      for (const sub of fields) {
        const subPath = `${base}.${sub.name}`;
        fail(errors, subPath, `The ${subPath} field is required.`);
      }
      return;
    }
    for (const sub of fields) {
      const subPath = `${base}.${sub.name}`;
      if (sub.kind === 'string') {
        checkString(errors, subPath, item[sub.name], sub.max);
      } else {
        checkEnum(errors, subPath, item[sub.name], sub.values);
      }
    }
  });
}

export function validateDiscoveryResultJson(resultJson) {
  if (typeof resultJson !== 'string') {
    return {
      valid: false,
      errors: [
        'result_json: The result must be valid JSON. Paste the JSON object without Markdown code fences.',
      ],
    };
  }
  if (charLength(resultJson) > MAX_INPUT_CHARACTERS) {
    return {
      valid: false,
      errors: [
        `result_json: The result json must not be greater than ${MAX_INPUT_CHARACTERS} characters.`,
      ],
    };
  }

  let decoded;
  try {
    decoded = JSON.parse(resultJson);
  } catch {
    return {
      valid: false,
      errors: [
        'result_json: The result must be valid JSON. Paste the JSON object without Markdown code fences.',
      ],
    };
  }
  if (!isRecord(decoded)) {
    return {
      valid: false,
      errors: ['result_json: The result must be a JSON object with the required discovery fields.'],
    };
  }

  const errors = [];
  checkString(errors, 'business_summary', decoded.business_summary, 5000);
  checkString(errors, 'business_model_summary', decoded.business_model_summary, 4000);
  checkStringList(errors, 'primary_audience', decoded.primary_audience, { min: 1, max: 500 });
  checkString(errors, 'website_goal', decoded.website_goal, 2000);
  checkString(errors, 'primary_conversion', decoded.primary_conversion, 1000);
  checkEnum(errors, 'recommended_tier', decoded.recommended_tier, TIERS);
  checkStringList(errors, 'recommendation_rationale', decoded.recommendation_rationale, {
    min: 1,
    max: 1000,
  });
  checkRecordList(errors, 'offer_matrix', decoded.offer_matrix, { min: 1, fields: OFFER_FIELDS });
  checkRecordList(errors, 'customer_question_map', decoded.customer_question_map, {
    min: 1,
    fields: CUSTOMER_QUESTION_FIELDS,
  });
  checkRecordList(errors, 'fact_register', decoded.fact_register, { min: 1, fields: FACT_FIELDS });
  checkRecordList(errors, 'cta_register', decoded.cta_register, { min: 1, fields: CTA_FIELDS });
  checkRecordList(errors, 'asset_register', decoded.asset_register, {
    present: true,
    fields: ASSET_FIELDS,
  });
  checkRecordList(errors, 'buying_journey', decoded.buying_journey, {
    min: 1,
    fields: BUYING_JOURNEY_FIELDS,
  });
  checkRecordList(errors, 'trust_register', decoded.trust_register, { fields: TRUST_FIELDS });
  checkRecordList(errors, 'content_gaps', decoded.content_gaps, { fields: CONTENT_GAP_FIELDS });
  checkRecordList(errors, 'sections', decoded.sections, { min: 1, fields: SECTION_FIELDS });
  checkStringList(errors, 'missing_information', decoded.missing_information, {
    present: true,
    max: 1000,
  });
  checkStringList(errors, 'claims_requiring_approval', decoded.claims_requiring_approval, {
    present: true,
    max: 1000,
  });
  checkStringList(errors, 'scope_risks', decoded.scope_risks, { present: true, max: 1000 });
  checkString(errors, 'next_step', decoded.next_step, 2000);

  return { valid: errors.length === 0, errors };
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help') {
      args.help = true;
      continue;
    }
    if (arg === '--file') {
      const value = argv[i + 1];
      if (value === undefined || !value.trim() || value.startsWith('--')) {
        throw new Error('--file requires a file path.');
      }
      args.file = value;
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

async function main(argv) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log(USAGE);
    return 0;
  }
  if (!args.file) {
    throw new Error(`Missing required --file argument.\n${USAGE}`);
  }
  let text;
  try {
    text = await fs.readFile(args.file, 'utf8');
  } catch {
    throw new Error(`Cannot read file: ${args.file}`);
  }
  const { valid, errors } = validateDiscoveryResultJson(text);
  if (valid) {
    console.log(`Valid discovery result: ${args.file}`);
    return 0;
  }
  for (const error of errors) console.error(error);
  return 1;
}

const entrypointUrl = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href;
if (import.meta.url === entrypointUrl) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      console.error(error.message);
      process.exitCode = 1;
    },
  );
}
