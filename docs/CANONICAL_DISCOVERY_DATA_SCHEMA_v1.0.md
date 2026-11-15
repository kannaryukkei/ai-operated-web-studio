# Canonical Discovery Data Schema v1.0

**Document ID:** AWOS-DATA-001  
**Version:** 1.0  
**Status:** Draft — Master Revision candidate  
**Last updated:** 2026-11-15  
**Authority:** Master PRD v1.0, Client Input & Material Policy v1.0, Client Material Ingestion Protocol

## 1. Purpose and contract

This document defines the canonical data contract for discovery and website production. It keeps sources, facts, assets, business offers, customer questions, CTAs, trust evidence, content gaps and rendered page coverage traceable and independently reviewable.

It is a logical data contract first. It does not claim every record is currently persisted in Laravel. Until a platform implementation is approved, the operator maintains these artifacts in the controlled project workspace and uses the existing platform intake/discovery JSON only as a partial summary bridge.

**One rule:** downstream artifacts reference canonical record IDs; they do not invent new facts or silently duplicate/rewrite their source of truth.

## 2. Shared envelope

Every normalized discovery packet must identify its project and version:

| Field | Type | Required | Meaning |
|---|---|---:|---|
| `schema_version` | string | Yes | Exact contract version, e.g. `1.0` |
| `project_id` | string | Yes | Stable Studio/project identifier |
| `snapshot_id` | string | Yes | Stable ID for this immutable discovery snapshot |
| `created_at` | ISO 8601 datetime | Yes | Snapshot creation time |
| `source_packet_version` | string | Yes | Version/revision of the raw material packet |
| `supersedes_snapshot_id` | string or null | Yes | Previous snapshot when this is a revision |
| `artifacts` | object | Yes | The record collections defined below |

Use project-scoped stable IDs (examples: `SRC-0001`, `COV-0001`, `FACT-0001`, `ASSET-0001`, `OFFER-0001`, `Q-0001`, `CTA-0001`, `TRUST-0001`, `GAP-0001`, `PAGE-0001`). Do not recycle an ID for a different claim or asset. A changed fact gets a new version/record and links to the superseded record where useful.

## 3. Shared types and controlled values

### 3.1 Source reference

A source reference links an artifact to the precise material supporting it.

| Field | Required | Definition |
|---|---:|---|
| `source_id` | Yes | Stable ID from Source Register |
| `locator_type` | Yes | `TIMESTAMP`, `PAGE_PARAGRAPH`, `ASSET_FILE`, `URL_SECTION`, `NOTE_LINE`, `OTHER` |
| `locator` | Yes | Timestamp, page/paragraph, file path/asset ID, URL section or equivalent |
| `excerpt_or_evidence_note` | Yes | Short supporting quote or factual evidence note; never replace the original source |
| `captured_at` | No | When the source excerpt/claim was captured |

If an exact locator cannot be recovered, use `OTHER`, state the limitation in `locator`, and preserve a short excerpt. Do not invent a timestamp or page number.

### 3.2 Independent status dimensions

**Answer status** — what the client/business has answered:

- `PROVIDED`
- `NOT_AVAILABLE`
- `NOT_APPLICABLE`
- `NOT_SURE`
- `CONFLICT`

**Evidence status** — what support exists for the claim:

- `VERIFIED`
- `CLIENT-PROVIDED-UNVERIFIED`
- `DEMO-ONLY`
- `ASSUMPTION`
- `MISSING`
- `CONFLICT`

**Publication status** — whether the business has authorized public use:

- `APPROVED`
- `PENDING`
- `NOT_APPROVED`

**Rendered page coverage** — whether the approved requirement is actually represented on the candidate website:

- `PUBLISHED`
- `PREVIEW_ONLY`
- `GAP`
- `NOT_APPLICABLE`

These are independent axes. Do not add values such as `APPROVED-FOR-PUBLICATION` to evidence status. Do not infer publication approval from evidence quality, or page coverage from a fact existing in the brief.

**Unresolved-item milestone priority:**
- `PREVIEW_BLOCKER`
- `PRODUCTION_BLOCKER`
- `OPTIONAL_GAP`

### 3.3 Other controlled values

- Project tier: `STARTER`, `BUSINESS`, `CUSTOM`, `UNDECIDED`.
- Customer journey stage: `BEFORE_PURCHASE`, `DURING_PURCHASE`, `AFTER_PURCHASE`.
- Source type: `INTERVIEW_RECORDING`, `INTERVIEW_TRANSCRIPT`, `OPERATOR_NOTE`, `CLIENT_DOCUMENT`, `CLIENT_ASSET`, `APPROVED_URL`, `PRIOR_PROJECT_RECORD`, `OTHER`.
- Source processing status: `RAW`, `TRANSCRIBED`, `REVIEWED`, `UNREADABLE`, `NOT_PROCESSED`.
- Source coverage disposition: `NORMALIZED`, `EXCLUDED`, `NOT_AVAILABLE`, `CONFLICT`, `NOT_APPLICABLE`. `EXCLUDED` requires a reason.
- Asset permission status: `APPROVED`, `PENDING`, `NOT_APPROVED`, `NOT_APPLICABLE`.
- People-consent status: `CONFIRMED`, `PENDING`, `NOT_APPROVED`, `NOT_APPLICABLE`.
- CTA destination status: `APPROVED_REAL_DESTINATION`, `NOT_CONFIGURED`, `NEEDS_APPROVAL`, `DEMO_ONLY`.
- Customer-question answer status: `ANSWERED`, `GAP`, `NOT_APPLICABLE`.

## 4. Canonical record definitions

### 4.1 Source Register — `sources[]`

| Field | Required | Definition |
|---|---:|---|
| `source_id` | Yes | Stable project-scoped ID |
| `source_type` | Yes | Controlled source type |
| `name` | Yes | Human-readable source name |
| `original_ref` | Yes | Controlled project-storage path, filename or exact URL |
| `received_at` | Yes | Receipt timestamp/date |
| `source_owner_or_provider` | Yes | Client, named provider, Studio or UNKNOWN |
| `processing_status` | Yes | RAW / TRANSCRIBED / REVIEWED / UNREADABLE / NOT_PROCESSED |
| `confidentiality` | Yes | `PROJECT_RESTRICTED`, `INTERNAL_ONLY` or `PUBLIC_REFERENCE` |
| `parent_source_id` | No | Link a transcript/derivative to its original recording/document |
| `notes` | No | Restrictions, locator limitations or handling notes |

Original sources are immutable. A transcript, corrected transcript, summary or extracted derivative receives its own source/artifact record and links to its parent.

### 4.2 Source Coverage Matrix — `source_coverage[]`

| Field | Required | Definition |
|---|---:|---|
| `coverage_id` | Yes | Stable coverage-row ID |
| `source_id` | Yes | Source being reviewed |
| `locator` | Yes | Section, segment, time range, page, asset or URL section |
| `topic` | Yes | Material topic/content in that source segment |
| `disposition` | Yes | NORMALIZED / EXCLUDED / NOT_AVAILABLE / CONFLICT / NOT_APPLICABLE |
| `target_record_ids` | Yes | Fact/offer/question/asset/etc. IDs created from this segment; empty only when disposition requires it |
| `reason_or_next_action` | Yes | Why excluded/not applicable, or who resolves a conflict/gap |

Every meaningful source section/topic and supplied asset must have a coverage row. No source material may silently disappear during normalization.

### 4.3 Fact Register — `facts[]`

A fact is one atomic claim. Split statements when their sources, uncertainty or publication status differ.

| Field | Required | Definition |
|---|---:|---|
| `fact_id` | Yes | Stable fact ID |
| `field_key` | Yes | Normalized topic/key, e.g. `business.location` or `offer.signature.price` |
| `claim` | Yes | One concise factual claim |
| `source_refs` | Yes | One or more Source References; empty only when evidence status is MISSING/ASSUMPTION and the absence is explained |
| `answer_status` | Yes | Controlled answer status |
| `evidence_status` | Yes | Controlled evidence status |
| `publication_status` | Yes | Controlled publication status |
| `conflict_group_id` | No | Shared ID for competing versions of the same fact |
| `owner_or_next_action` | Yes | Named role/person or explicit NONE with reason |
| `supersedes_fact_id` | No | Previous fact record when corrected |
| `notes` | No | Scope, time validity or caveat |

Rules:
- Every material public claim must reference at least one source/locator.
- A missing source must remain MISSING; do not substitute industry convention.
- A conflict retains all competing claims and source references until the responsible owner resolves it.
- Owner confirmation does not automatically mean independent verification; use CLIENT-PROVIDED-UNVERIFIED unless independent evidence is available.
- Publication status is separate and requires the appropriate owner approval.

### 4.4 Asset and Permission Register — `assets[]`

| Field | Required | Definition |
|---|---:|---|
| `asset_id` | Yes | Stable asset ID |
| `source_id` | Yes | Source Register record for the original asset |
| `original_filename_or_url` | Yes | Original file/reference, not a renamed derivative only |
| `description` | Yes | Neutral visible/technical description; no inferred business claims |
| `creator_and_owner` | Yes | Named owner/creator or UNKNOWN |
| `intended_use` | Yes | Proposed page/section and purpose |
| `permission_status` | Yes | APPROVED / PENDING / NOT_APPROVED / NOT_APPLICABLE |
| `permission_evidence_status` | Yes | VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT |
| `consent_status` | Yes | CONFIRMED / PENDING / NOT_APPROVED / NOT_APPLICABLE |
| `required_credit` | Yes | Exact credit or NONE |
| `licence_restrictions_and_expiry` | Yes | Restrictions, expiry or NONE |
| `owner_approval_reference` | Yes | Approval record/reference or PENDING |
| `alt_text_candidate` | No | Describes visible content only |
| `crop_and_focal_point_notes` | No | Display guidance; not evidence of ownership or consent |

A supplied asset is not automatically owned by the client or authorized for commercial publication. Unknown rights remain PENDING. Do not infer a person's identity, consent, credentials, product details or customer proof from pixels.

### 4.5 Offer Matrix — `offers[]`

| Field | Required | Definition |
|---|---:|---|
| `offer_id` | Yes | Stable offer ID |
| `name` | Yes | Exact source-backed offer/product/service name |
| `description` | Yes | Customer-language summary |
| `best_fit_audience` | Yes | Intended customer or NOT_ESTABLISHED |
| `variants` | Yes | Known sizes/classes/options or empty array |
| `inclusions` | Yes | Supported inclusions or explicit NOT_AVAILABLE |
| `exclusions_and_limits` | Yes | Supported exclusions/limits or explicit NOT_AVAILABLE |
| `pricing_summary` | Yes | Exact verified price, pricing method or explicit NOT_AVAILABLE/QUOTE_REQUIRED |
| `fact_ids` | Yes | Fact records supporting names, details and pricing |
| `availability_status` | Yes | AVAILABLE / LIMITED / NOT_AVAILABLE / NOT_CONFIRMED / NOT_APPLICABLE |
| `notes` | No | Conditions and owner action |

Do not publish an offer detail or price when its supporting facts are pending approval or conflicting. Unknown inclusion/exclusion is not a blank that AI may complete by assumption.

### 4.6 Customer Question Map — `customer_questions[]`

| Field | Required | Definition |
|---|---:|---|
| `question_id` | Yes | Stable question ID |
| `question` | Yes | Real customer question or objection |
| `journey_stage` | Yes | BEFORE_PURCHASE / DURING_PURCHASE / AFTER_PURCHASE |
| `answer_summary_or_gap` | Yes | Supported answer or explicit gap |
| `answer_status` | Yes | ANSWERED / GAP / NOT_APPLICABLE |
| `fact_ids` | Yes | Supporting fact IDs; may be empty for a genuine GAP/NOT_APPLICABLE |
| `owner_or_action` | Yes | Next owner/action or reason for NOT_APPLICABLE |
| `milestone_priority` | Yes | PREVIEW_BLOCKER / PRODUCTION_BLOCKER / OPTIONAL_GAP |

A question marked ANSWERED must have supporting facts. This status means an answer exists in discovery; it does not prove the answer is approved for publication or has been rendered on the page.

### 4.7 Buying Journey — `buying_journey[]`

Each record includes `journey_step_id`, `journey_stage`, `customer_intent`, `customer_need_or_friction`, `website_support`, `question_ids`, and `cta_ids`. Use relevant customer questions and CTA IDs; do not invent an action or stage merely to fill an array.

### 4.8 CTA Register — `ctas[]`

| Field | Required | Definition |
|---|---:|---|
| `cta_id` | Yes | Stable CTA ID |
| `action` | Yes | Clear visitor-facing action label |
| `intent` | Yes | What the visitor is trying to do |
| `destination` | Yes | Exact URL/number/address/anchor or NOT_CONFIGURED |
| `destination_status` | Yes | APPROVED_REAL_DESTINATION / NOT_CONFIGURED / NEEDS_APPROVAL / DEMO_ONLY |
| `expected_behavior` | Yes | Actual post-click behavior and limitations |
| `supporting_fact_ids` | Yes | Facts for contact/availability details or empty if not applicable |
| `approval_reference` | Yes | Owner/client approval reference or PENDING |

Never invent a phone number, messaging link, form recipient, booking endpoint or successful submission. A visual CTA is not functional unless its behavior is implemented and tested.

### 4.9 Trust and Evidence Register — `trust_items[]`

Each item includes `trust_id`, `item_or_transparent_alternative`, `source_refs`, `evidence_status`, `publication_status`, `permission_or_consent_reference`, `owner_approval_reference`, and `notes`.

Reviews, testimonials, ratings, awards, certifications, customer counts, before/after claims and quantified outcomes require primary evidence, applicable publication permission and explicit owner approval. If proof is unavailable, record a real transparent alternative such as process transparency or scope clarity; do not create simulated social proof.

### 4.10 Content Gap Register — `content_gaps[]`

Each gap includes `gap_id`, `topic`, `missing_or_conflicting_information`, `source_refs`, `milestone_priority`, `owner_or_next_action`, `safe_fallback_or_omission`, and `resolution_status` (`OPEN`, `RESOLVED`, `ACCEPTED_FOR_PREVIEW_ONLY`, `NOT_APPLICABLE`).

An accepted preview exception remains a production blocker until resolved or excluded from the live website.

### 4.11 Source-to-Page Coverage Matrix — `page_coverage[]`

| Field | Required | Definition |
|---|---:|---|
| `page_coverage_id` | Yes | Stable mapping ID |
| `question_id` | Yes | Customer question being checked |
| `target_page_or_url` | Yes | Intended page or route |
| `target_section_key` | Yes | Intended section/component |
| `coverage_status` | Yes | PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE |
| `rendered_locator_or_evidence` | Yes | Exact tested URL/section/DOM/screenshot reference or reason unavailable |
| `fact_ids` | Yes | Facts supporting the rendered answer |
| `owner_or_action` | Yes | Resolution action for GAP or reason for NOT_APPLICABLE |

PUBLISHED means the answer is present in the rendered candidate and every underlying public fact/asset has the required evidence, rights and publication approval. A draft in the brief or source packet does not count as PUBLISHED.

## 5. Discovery summary and section plan

The canonical packet may carry a concise summary. The Website Requirements Pack references these discovery records by stable ID and adds testable implementation requirements; it must not duplicate their source/evidence records.

The canonical packet may carry a concise summary:

- `business_summary`
- `business_model_summary`
- `primary_audience_ids_or_descriptions`
- `website_goal`
- `primary_conversion_cta_id`
- `recommended_tier`
- `recommendation_rationale`
- `scope_risks`
- `next_step`

A website section plan is a planning artifact, not proof of page coverage. Each section should include section key, purpose, visitor question IDs, content requirements and relevant fact/asset/CTA IDs. Rendered page coverage is updated only after implementation and QA.

## 6. Required canonical packet checks

Before the data packet is accepted:

1. Every source has a stable source ID and controlled access reference.
2. Every meaningful source segment and asset has a Source Coverage row.
3. Every material fact has a stable fact ID, source locator or explicit missing/assumption state, plus all three independent status dimensions.
4. Conflicts preserve all competing source claims.
5. Every asset has source, owner/creator, intended use, permission, consent (where relevant), credit and restriction status.
6. Offers reference the facts supporting their names, details, inclusions, exclusions and pricing.
7. Every ANSWERED customer question references facts.
8. Every CTA has a real/explicitly unavailable destination and truthful expected behavior.
9. Every trust item has a source and separate evidence/publication/permission status, or is explicitly a transparent alternative rather than proof.
10. Every material gap has an owner, priority and safe fallback/omission.
11. Page coverage is maintained separately after the website is rendered and QAed.
12. No field is populated with invented information merely to satisfy schema validation.

## 7. Mapping from current platform discovery output

The current `ManualDiscoveryController` validator accepts a legacy discovery JSON object containing:

`business_summary`, `business_model_summary`, `primary_audience`, `website_goal`, `primary_conversion`, `recommended_tier`, `recommendation_rationale`, `offer_matrix`, `customer_question_map`, `fact_register`, `cta_register`, `asset_register`, `buying_journey`, `trust_register`, `content_gaps`, `sections`, `missing_information`, `claims_requiring_approval`, `scope_risks`, and `next_step`.

This shape is useful but is **not yet the canonical schema**. Known mismatches:

| Current legacy behavior | Canonical requirement | Required treatment |
|---|---|---|
| `evidence_status` allows `APPROVED-FOR-PUBLICATION` | Evidence and publication are separate | Treat this value as a legacy mixed status; map to publication status only when an explicit approval record supports it. Otherwise PENDING. |
| Fact evidence enum omits `CONFLICT` and there is no fact answer status | Canonical fact has answer + evidence + publication statuses | Add explicit fields; preserve conflicts as competing fact records. |
| `public_use_status` uses `APPROVED`, `NEEDS_CLIENT_APPROVAL`, `DO_NOT_PUBLISH` | Canonical publication values are `APPROVED`, `PENDING`, `NOT_APPROVED` | Map the legacy aliases explicitly: `NEEDS_CLIENT_APPROVAL` → `PENDING`; `DO_NOT_PUBLISH` → `NOT_APPROVED`. |
| `source` is free text | Stable source IDs, locator types, locators and excerpts | Preserve old text as a legacy source note; add structured source references. Never fabricate a locator. |
| Asset `permission_status` combines permission and evidence concepts | Permission approval and evidence quality are distinct | Use `permission_status` plus `permission_evidence_status`; map unknown or client-claimed rights to PENDING. |
| No top-level Source Register / Source Coverage Matrix | Every source and material source segment must be accounted for | Add canonical collections; legacy discovery output cannot claim these exist. |
| Customer question `status` is ANSWERED/GAP/NOT_APPLICABLE | Keep discovery answer status separate from rendered page coverage | Retain as `answer_status`; add page_coverage later from rendered QA. |
| CTA destination statuses exist | Keep exact endpoint and expected behavior | Preserve values, but ensure approval evidence and truthful behavior are linked. |
| No page-coverage records in validated output | Page coverage is a post-implementation QA result | Do not infer PUBLISHED from a draft section or discovery record. |

The current validator requires useful non-empty lists for offers, customer questions, facts, CTAs, journey and sections. The canonical schema allows a collection to be empty only when there is genuinely no applicable record; where the current platform validator is stricter, mark this as an implementation limitation and do not fabricate placeholder facts. Segment 11 specifies the minimum platform alignment; Segment 12 implements approved changes and migrations.

## 8. Versioning and change control

- This schema is the canonical data contract once adopted; prompts, Master Skill, Discovery validation, Website Requirements Pack and QA artifacts must use the same status definitions.
- Additive optional fields may be introduced in a minor revision when backward-compatible.
- Changes to required fields, enum values or meaning require a new schema version and explicit migration mapping.
- Never overwrite raw material, silently recast old status values or drop source text during migration.
- Every schema change must identify affected prompts, platform validators, stored DiscoveryRun records, test fixtures and downstream artifacts.
