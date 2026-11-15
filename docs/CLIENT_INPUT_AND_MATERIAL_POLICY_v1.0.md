# Client Input & Material Policy v1.0

**Document ID:** AWOS-INPUT-001  
**Version:** 1.0  
**Status:** Draft — Master Revision candidate  
**Last updated:** 2026-11-15  
**Authority:** Derived from Master PRD v1.0 and Canonical Operating Workflow v1.0

## 1. Purpose

Define the one canonical way a new website project receives business information. The client should explain the business once and provide the materials they already have. AI and the studio convert those materials into structured discovery artifacts. The client should not be asked to complete a second long website questionnaire.

This policy governs input and normalization. The detailed extraction procedure is specified by the Client Material Ingestion Protocol; the Client Website Brief is an AI-produced normalized artifact, not a client form.

## 2. Canonical input

The default input packet consists of:

1. **Interview material:** a normal recorded or transcribed conversation, meeting notes, or a studio-written interview summary.
2. **Existing client assets:** files the client already has and chooses to provide, such as a logo, photographs, videos, brand guide, menu/catalogue, service documents, policy documents or other business material.
3. **Optional references:** existing website, public social profiles, public contact/booking destinations and reference URLs supplied or explicitly approved by the client.
4. **Existing project context:** earlier approved facts or decisions may be reused only after checking that they still apply to the current project.

The interview is conversational, not a fixed questionnaire. Interview prompts are reminders for the operator, not a checklist to read in full. Skip topics already answered. Ask follow-up questions only when a material gap or conflict changes the next decision.

The client is not expected to:
- write website copy;
- prepare a sitemap or page list;
- define technical features or implementation details;
- fill the Client Website Brief;
- repeat information already present in the interview or supplied assets;
- complete the existing 26-field platform intake as a second mandatory brief.

## 3. Source authority and provenance

Use this source precedence when normalizing information:

1. Current, original client-provided material and explicit current owner confirmations.
2. Current, client-approved public source links and business records.
3. Prior approved project records, only after confirming that the information remains current.
4. Studio research, which may explain category context or UX conventions but cannot establish private client-specific facts.
5. AI inference, which is never a source of a publishable client fact.

When sources conflict, preserve both claims and their locators. Record the conflict, likely recency/reliability, owner and next action. Do not silently choose a value or merge conflicting values.

Every material fact must remain linked to a stable source ID and locator. A normalized brief or platform summary is a derivative record; it must not replace or erase its raw source.

## 4. Required operating sequence

1. Create the project and restrict access to authorized participants.
2. Conduct or record one natural business interview.
3. Collect existing assets and optional references through an access-controlled channel.
4. Preserve originals unchanged and inventory them in a Raw Material Index / Source Register.
5. Transcribe or segment only as supported by the available tools; preserve the original recording and transcript separately.
6. Extract atomic facts with stable fact IDs, source IDs, locators and supporting excerpts.
7. Complete source coverage for material transcript sections, documents, URLs and assets.
8. Register asset owner/source, intended use, commercial-use permission, publication approval, credit/licence restrictions and identifiable-person consent where relevant.
9. Reconcile conflicts and classify unresolved items as PREVIEW BLOCKER, PRODUCTION BLOCKER or OPTIONAL GAP.
10. Produce the normalized Client Brief and the required business-discovery artifacts.
11. Ask the client/authorized owner only for material clarifications, fact corrections, rights/consent decisions, public CTA confirmation or approval required for the next milestone.
12. Hand the validated artifacts to tier/scope, Website Requirements Pack, content, design and production stages.

No paid model API, API key, automatic transcription service or new upload portal is required for this workflow. Manual storage and handoff through an existing AI application are valid until a repeated delivery bottleneck justifies platform automation.

## 5. Existing platform intake — internal bridge, not canonical client input

The current Laravel Project Intake is a **26-field structured snapshot** used by the platform's versioned intake and manual discovery handoff. It is not the source of truth for client facts, not the canonical Client Brief, and not the required client input method.

### 5.1 Field inventory

| Group | Fields | Use |
|---|---|---|
| Business profile and audience | `business_overview`, `industry`, `location`, `target_audience` | Concise internal summary of the business, category, operating location and audience |
| Offers and customer understanding | `products_services`, `offer_details`, `customer_questions`, `customer_objections`, `purchase_process`, `operational_policies`, `trust_evidence`, `aftercare_support`, `differentiators` | Summary of offers, decision questions, objections, operations and supported trust context |
| Website objective and conversion | `website_goal`, `primary_conversion`, `public_contact_details`, `success_metrics` | Desired outcome, intended visitor action, approved public destinations and measurement intent |
| Website references and constraints | `current_website`, `competitor_references`, `brand_direction`, `required_pages`, `required_features`, `constraints` | Context and initial client preferences; suggestions are not binding requirements until qualified |
| Assets and approval contact | `existing_assets`, `asset_permissions`, `content_approver` | Pointers to supplied assets, permission summary and named business approver |

### 5.2 Current validation behavior

The current `ProjectIntakeController` permits 26 known fields. On submission it technically requires exactly these five strings:

- `business_overview`
- `target_audience`
- `products_services`
- `website_goal`
- `primary_conversion`

The other 21 fields are optional. The current intake UI incorrectly says "Only four core fields are required." The controller and UI must not be treated as equivalent: the controller enforces five.

These are interim technical validation rules, not a requirement to ask the client five questions or to force unknown facts into invented answers. The operator should populate the snapshot from the interview and source packet. When a required summary is genuinely unavailable, preserve that state explicitly (for example, `NOT_AVAILABLE — no source supplied` or `NOT_SURE — requires owner clarification`) rather than guessing. The canonical fact/evidence/publication status belongs in the source-linked records, not in free-text shorthand.

### 5.3 Current access mismatch

The current intake page is still reachable by project users. The controller authorizes project updates through the Project policy; that policy allows studio staff, client-account owners and project members with owner/editor roles to update the project. Consequently, authorized client users can currently edit and submit the structured intake.

This existing behavior conflicts with the intended material-first policy. Until a later platform-alignment/implementation segment changes the UI and authorization, treat the client-editable intake as a legacy implementation, not the desired operating procedure. For new projects, the studio operator should derive the internal snapshot from the interview packet. Do not ask the client to complete the 26-field page as a second mandatory form.

The later platform change must preserve secure project access and ensure the internal bridge is editable only by authorized studio roles, while the client experience remains a normal interview + material handoff + targeted clarification/approval flow. Do not change access by hiding a link alone; enforce it server-side and test it.

### 5.4 Bridge limitations

The 26-field snapshot is intentionally lossy and summary-oriented. It does not by itself provide:
- original raw source files or a complete Raw Material Index;
- stable source IDs and timestamp/page/paragraph locators for every fact;
- a Source Coverage Matrix;
- atomic Fact Register records with independent status dimensions;
- per-asset rights, credit, licence-expiry and consent evidence;
- the full Customer Question Map / Source-to-Page coverage contract;
- an approval history for each public fact or asset.

Do not claim these are implemented because text appears in an intake field. Preserve the full source-linked artifacts in the controlled project workspace until a later, requirements-backed platform implementation supports them.

## 6. Client Brief and downstream artifacts

The Client Website Brief v2.1 is populated by AI/studio from the source packet. It is not sent to the client as a form and does not replace the original materials.

The normalized output should include, as relevant:
- Raw Material Index and Source Register;
- Source Coverage Matrix;
- Fact Register with atomic claims and locators;
- Asset and Permission Register;
- Client Brief v2.1;
- Business Intelligence Summary;
- Offer Matrix;
- Customer Question Map and Buying Journey;
- Trust Register and Content Gap Register;
- Public CTA / Contact Map, separate from private project contacts;
- Minimal Clarification List;
- Tier recommendation and scope inputs;
- Website Requirements Pack (defined in a separate requirements artifact).

Every downstream material public claim must trace back to its fact/source record and have the required publication approval. An asset supplied by a client is not automatically client-owned or approved for commercial use.

## 7. Clarification policy

Ask only when an unresolved answer materially affects:
- what the business sells, offer structure, inclusion/exclusion or pricing;
- primary audience, buying decision, tier or scope;
- a material customer question, objection or operational expectation;
- public contact destination or primary conversion behavior;
- factual claims, policies, guarantees, credentials or published outcomes;
- asset rights, licence, credit, identifiable-person consent or publication permission;
- client approval, production readiness or release.

Batch related questions for the relevant decision owner. Do not ask a question already answered in the source packet. Keep optional gaps recorded and omit the unsupported claim/feature. An unanswered question remains unresolved; it is not permission to infer.

## 8. Status dimensions

Keep these dimensions separate:

**Answer status**
- `PROVIDED`
- `NOT_AVAILABLE`
- `NOT_APPLICABLE`
- `NOT_SURE`
- `CONFLICT`

**Evidence status**
- `VERIFIED`
- `CLIENT-PROVIDED-UNVERIFIED`
- `DEMO-ONLY`
- `ASSUMPTION`
- `MISSING`
- `CONFLICT`

**Publication status**
- `APPROVED`
- `PENDING`
- `NOT_APPROVED`

**Rendered page coverage** (separate from the three fact statuses)
- `PUBLISHED`
- `PREVIEW_ONLY`
- `GAP`
- `NOT_APPLICABLE`

A client statement may be PROVIDED while remaining CLIENT-PROVIDED-UNVERIFIED and PENDING publication. A fact can be approved but still not appear on the rendered page. Do not collapse these distinctions.

## 9. API-free privacy boundary

- Store original materials in access-controlled project storage.
- Share only material needed for the requested AI task; exclude passwords, credentials, customer lists and unrelated sensitive records.
- Do not put client assets, facts or contact details into shared blueprints or unrelated projects.
- Do not send raw material to external AI applications without the applicable client authorization and privacy review.
- Keep AI outputs and human approvals as separate records.
- No external message, purchase, public publication, DNS change or production release occurs without explicit human authorization.

## 10. Acceptance criteria

The input process is accepted when:
- the client can start with one normal interview and existing assets/references;
- no long duplicate client questionnaire is required;
- raw materials are preserved and indexed;
- every material source topic and asset is accounted for;
- facts and claims retain source IDs/locators and independent status dimensions;
- asset provenance and rights are recorded; unknown rights remain pending;
- conflicts and material gaps are assigned an owner and next action;
- the normalized Client Brief and discovery artifacts can be produced through existing AI applications;
- only necessary clarifications are sent to the client;
- the process works without a paid AI API;
- the platform's legacy 26-field intake is clearly treated as an internal bridge until its access and UI are aligned with this policy.
