const STOCK_SOURCES = new Set(['PEXELS', 'UNSPLASH', 'PIXABAY', 'MIXKIT', 'OPENVERSE', 'WIKIMEDIA_COMMONS', 'LOTTIEFILES']);
const SOURCE_TYPES = new Set([...STOCK_SOURCES, 'CLIENT_SUPPLIED', 'STUDIO_CREATED', 'OTHER']);
const YES_NO = new Set(['YES', 'NO']);
const RIGHTS_STATES = new Set(['APPROVED', 'PENDING', 'BLOCKED']);
const PUBLICATION_STATES = new Set(['APPROVED', 'PENDING', 'NOT_APPROVED']);
const PROVIDER_TERMS_STATES = new Set(['APPROVED', 'PENDING', 'BLOCKED']);

const value = (record, key) => String(record?.[key] ?? '').trim();
const upper = (record, key) => value(record, key).toUpperCase();

function issue(issues, message) {
  issues.push(message);
}

export function validateAsset(record) {
  const issues = [];
  const id = value(record, 'asset_id') || '(missing asset_id)';
  const source = upper(record, 'source_type');
  const mediaType = upper(record, 'media_type');
  const proofClass = upper(record, 'proof_class');
  const clientProof = upper(record, 'client_proof') === 'YES';
  const selected = upper(record, 'is_selected_for_build') === 'YES';

  if (!value(record, 'asset_id')) issue(issues, 'asset_id is required.');
  if (!SOURCE_TYPES.has(source)) issue(issues, 'source_type is not recognized.');
  if (!value(record, 'creator_and_owner')) issue(issues, 'creator_and_owner is required.');
  if (!['IMAGE', 'VIDEO', 'ANIMATION', 'ILLUSTRATION', 'AUDIO'].includes(mediaType)) issue(issues, 'media_type is invalid.');
  if (!['CLIENT_WORK', 'STOCK_CONTEXT', 'CONCEPT_ART', 'PRODUCT_ASSET'].includes(proofClass)) issue(issues, 'proof_class is invalid.');
  if (!value(record, 'usage_role')) issue(issues, 'usage_role is required.');

  const stock = STOCK_SOURCES.has(source);
  if (stock) {
    if (!value(record, 'asset_page_url')) issue(issues, 'stock assets need the exact asset_page_url.');
    if (!value(record, 'license_name')) issue(issues, 'stock assets need the exact license_name.');
    if (!value(record, 'license_url')) issue(issues, 'stock assets need the applicable license_url.');
    if (upper(record, 'license_status') !== 'VERIFIED') issue(issues, 'stock licence status must be VERIFIED.');
    if (!value(record, 'provider_terms_url')) issue(issues, 'stock assets need the provider Terms of Service URL, separate from the content licence.');
    if (!value(record, 'provider_terms_checked_on')) issue(issues, 'stock assets need the provider-terms check date.');
    if (!value(record, 'project_context_use')) issue(issues, 'stock assets need the actual project_context_use recorded.');
    if (!PROVIDER_TERMS_STATES.has(upper(record, 'provider_terms_status'))) issue(issues, 'provider_terms_status must be APPROVED, PENDING or BLOCKED.');
    if (upper(record, 'provider_terms_status') !== 'APPROVED') issue(issues, 'provider Terms of Service are not APPROVED for this project context and acquisition method.');
    if (!value(record, 'acquisition_method')) issue(issues, 'stock assets need a documented acquisition_method.');
  }
  if (upper(record, 'commercial_use') !== 'YES') issue(issues, 'commercial use is not confirmed as YES.');
  for (const field of ['identifiable_people', 'visible_brand_or_trademark', 'private_property_or_artwork']) {
    if (!YES_NO.has(upper(record, field))) issue(issues, field + ' must be explicitly YES or NO.');
  }
  if (upper(record, 'suitability_score')) {
    const score = Number(value(record, 'suitability_score'));
    if (!Number.isInteger(score) || score < 0 || score > 25) issue(issues, 'suitability_score must be an integer from 0 to 25.');
    if (selected && score < 18) issue(issues, 'selected media must meet the 18/25 relevance shortlist threshold.');
  } else if (selected) {
    issue(issues, 'selected media needs a documented suitability_score out of 25.');
  }
  if (upper(record, 'rights_status') !== 'APPROVED') issue(issues, 'asset rights are not APPROVED.');
  if (upper(record, 'publication_status') !== 'APPROVED') issue(issues, 'publication status is not APPROVED.');
  if (upper(record, 'rights_status') === 'APPROVED' && !value(record, 'permission_evidence_ref')) {
    issue(issues, 'APPROVED rights need a permission evidence reference.');
  }

  const licenseName = value(record, 'license_name').toLowerCase();
  if (source === 'MIXKIT' && licenseName.includes('restricted')) {
    issue(issues, 'Mixkit Restricted License is not approved for commercial use.');
  }
  if (source === 'MIXKIT' && !licenseName.includes('free license')) {
    issue(issues, 'Mixkit commercial use requires the exact Free License.');
  }
  if (source === 'LOTTIEFILES' && mediaType === 'ANIMATION' && !/simple license|commercial/i.test(licenseName)) {
    issue(issues, 'Lottie animation needs a verified commercial licence.');
  }

  if (stock && ['CLIENT_WORK', 'GALLERY_PROOF', 'CUSTOMER_RESULT'].includes(upper(record, 'usage_role'))) {
    issue(issues, 'stock media cannot be used in a client-work/gallery-proof/customer-result role.');
  }
  if (clientProof || proofClass === 'CLIENT_WORK') {
    if (source !== 'CLIENT_SUPPLIED') issue(issues, 'CLIENT_WORK proof must originate from CLIENT_SUPPLIED material.');
    if (!clientProof || proofClass !== 'CLIENT_WORK') issue(issues, 'Client proof requires both client_proof=YES and proof_class=CLIENT_WORK.');
  }

  if (upper(record, 'identifiable_people') === 'YES' && upper(record, 'model_release_status') !== 'VERIFIED') {
    issue(issues, 'Identifiable people need VERIFIED model release/consent.');
  }
  if (upper(record, 'visible_brand_or_trademark') === 'YES' && upper(record, 'brand_permission_status') !== 'VERIFIED') {
    issue(issues, 'Visible brands/trademarks need VERIFIED permission or an approved clearance record.');
  }
  if (upper(record, 'private_property_or_artwork') === 'YES' && upper(record, 'property_permission_status') !== 'VERIFIED') {
    issue(issues, 'Private property/artwork needs VERIFIED permission or an approved clearance record.');
  }
  if (upper(record, 'credit_required') === 'YES' && !value(record, 'credit_text')) {
    issue(issues, 'Required creator/licence credit is missing.');
  }

  if (selected) {
    const localPath = value(record, 'optimized_project_path');
    if (!localPath || /^https?:\/\//i.test(localPath) || localPath.includes('..') || !/^public\/media\//.test(localPath)) {
      issue(issues, 'Selected assets need a safe local project path under public/media/; third-party hotlinks are not accepted.');
    }
    if (upper(record, 'decorative') !== 'YES' && !value(record, 'alt_text_candidate')) {
      issue(issues, 'Selected informative media needs truthful alt_text_candidate.');
    }
    const bytes = Number(value(record, 'file_size_bytes'));
    if (!Number.isFinite(bytes) || bytes <= 0) issue(issues, 'Selected media needs a positive optimized file_size_bytes value.');
    if (mediaType === 'VIDEO') {
      if (!value(record, 'poster_path') || !/^public\/media\//.test(value(record, 'poster_path'))) {
        issue(issues, 'Selected video needs a local poster_path under public/media/.');
      }
      if (!value(record, 'motion_behavior')) issue(issues, 'Video needs a documented controls/motion behavior.');
      if (/AUTOPLAY_SOUND/i.test(value(record, 'motion_behavior'))) issue(issues, 'Video may not autoplay with sound.');
      if (!value(record, 'captions_or_transcript_status')) issue(issues, 'Video needs an explicit captions/transcript assessment.');
    }
    if (mediaType === 'ANIMATION' && !/REDUCED_MOTION/i.test(value(record, 'motion_behavior'))) {
      issue(issues, 'Animation needs an explicit reduced-motion behavior/fallback.');
    }
  }

  return { asset_id: id, eligible: issues.length === 0, issues };
}

const REQUIREMENT_FIELDS = [
  'requirement_id',
  'section_key',
  'visitor_question_or_business_job',
  'subject_and_context',
  'proof_class',
  'priority',
  'preferred_source',
  'minimum_count',
  'preferred_ratio',
  'target_dimensions',
  'fallback_if_missing',
  'rights_gate',
  'performance_target',
];

export function validateRequirements(rows) {
  const issues = [];
  if (!Array.isArray(rows) || rows.length === 0) return { valid: false, issues: ['Media Requirements Plan has no rows.'] };
  const seen = new Set();
  for (const [index, row] of rows.entries()) {
    const rowNo = index + 2;
    for (const field of REQUIREMENT_FIELDS) {
      if (!value(row, field)) issue(issues, 'row ' + rowNo + ': ' + field + ' is required.');
    }
    const id = value(row, 'requirement_id');
    if (id && seen.has(id)) issue(issues, 'row ' + rowNo + ': duplicate requirement_id ' + id + '.');
    seen.add(id);
    if (!['CLIENT_WORK', 'STOCK_CONTEXT', 'CONCEPT_ART', 'PRODUCT_ASSET'].includes(upper(row, 'proof_class'))) {
      issue(issues, 'row ' + rowNo + ': proof_class is invalid.');
    }
    if (!['REQUIRED', 'OPTIONAL'].includes(upper(row, 'priority'))) {
      issue(issues, 'row ' + rowNo + ': priority must be REQUIRED or OPTIONAL.');
    }
    const count = Number(value(row, 'minimum_count'));
    if (!Number.isInteger(count) || count < 0) issue(issues, 'row ' + rowNo + ': minimum_count must be a non-negative integer.');
    if (/^CLIENT_WORK$/i.test(value(row, 'proof_class')) && /PEXELS|UNSPLASH|PIXABAY|MIXKIT|OPENVERSE|WIKIMEDIA/i.test(value(row, 'preferred_source'))) {
      issue(issues, 'row ' + rowNo + ': stock cannot satisfy a CLIENT_WORK proof requirement.');
    }
  }
  return { valid: issues.length === 0, issues };
}

export function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const text = String(input ?? '').replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell.replace(/\r$/, ''));
      if (row.some((part) => part.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (quoted) throw new Error('CSV has an unclosed quoted field.');
  row.push(cell.replace(/\r$/, ''));
  if (row.some((part) => part.trim() !== '')) rows.push(row);
  if (rows.length === 0) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values, index) => {
    const result = {};
    for (const [column, header] of headers.entries()) result[header] = (values[column] ?? '').trim();
    result.__row_number = index + 2;
    return result;
  });
}
