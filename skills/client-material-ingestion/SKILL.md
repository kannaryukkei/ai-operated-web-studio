---
name: client-material-ingestion
description: Turn raw client interview recordings, transcripts, operator notes, supplied assets and optional source links into a traceable normalized business brief. Use at the beginning of every new website project and whenever new client source material arrives.
---

# Client Material Ingestion

## Purpose

Convert the client's minimal raw input into the structured source of truth required by the Master Skill. The client should not complete a long website questionnaire or write website copy. The default input is a normal interview (recording, transcript or notes) plus the client's existing assets and optional links.

Follow docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md. The Master Skill remains the authority for scope, facts, permissions, approvals, design and release.

## Inputs

- Interview recording, transcript, meeting notes or operator-written interview summary.
- Supplied logo, brand guide, product/service photographs, documents, catalogue/menu, policies, portfolio or videos.
- Optional existing website, public social profiles, public CTA destinations and reference websites.
- Prior approved project artifacts where relevant; keep them distinct from new client evidence.

If one source type is missing, proceed with available materials and record the gap. Do not block the workflow merely because no brand guide or photography exists.

## Workflow

### 1. Preserve and inventory

- Preserve raw files unchanged; never overwrite a client original.
- Create a Raw Material Index with stable source IDs, filenames/URLs, source type, received date, owner/provider if known and access location.
- Identify unnecessary sensitive content (credentials, private customer records, personal IDs) and exclude/quarantine it.
- Do not claim the current platform provides file ingestion if the project still uses manual controlled storage.

### 2. Transcribe and locate evidence

- Transcribe audio/video using available AI application capabilities where possible; otherwise use supplied transcript or operator notes.
- Preserve original recording and derived transcript separately.
- Attach timestamps, document page/paragraph locators, asset IDs or URL sections to extracted evidence.
- If a precise locator is unavailable, preserve a short source excerpt and disclose the locator limitation.
- Mark uncertainty in speech instead of silently resolving it.

### 3. Extract atomic facts

Extract one material claim per record. Never combine unrelated facts into one value.

Required Fact Register fields:
- fact_id;
- field / topic;
- normalized value;
- answer_status;
- evidence_status;
- publication_status;
- source_id;
- source_locator;
- supporting_excerpt_or_note;
- conflict / gap;
- owner and next_action.

Use separate status dimensions:

**Answer status:** PROVIDED, NOT_AVAILABLE, NOT_APPLICABLE, NOT_SURE, CONFLICT.

**Evidence status:** VERIFIED, CLIENT-PROVIDED-UNVERIFIED, DEMO-ONLY, ASSUMPTION, MISSING.

**Publication status:** APPROVED, PENDING, NOT_APPROVED.

A client statement is not independently verified merely because it is clear. A fact can be PROVIDED + CLIENT-PROVIDED-UNVERIFIED + PENDING at the same time.

### 4. Process supplied assets

For each asset, record:
- asset_id, filename, type, dimensions/format if relevant;
- original creator/source and owner, if known;
- intended use and relevance;
- commercial/publication permission and status;
- credit, licence, restrictions and expiry;
- identifiable people and consent/release status;
- accurate visible-content description and alt-text candidate;
- focal point and crop notes where useful.

A client-supplied file is not automatically owned by the client or approved for publication. Keep permission PENDING when unclear. Never infer business claims, ingredients, product specifications, quality, team identity, testimonial status, consent or licensing from image pixels, metadata or filenames alone.

### 5. Reconcile gaps and conflicts

- Keep contradictory statements separate until an authorized source resolves them.
- Use dates and provenance to identify likely recency, but do not silently decide a client-facing conflict.
- Category research may explain industry norms; it cannot fill a client-specific price, policy, service area, contact, availability or credential.
- Do not ask clients to repeat information already present in the sources.
- Ask only when a gap changes offer scope, price, customer journey, public claim, CTA, asset rights or release.
- Batch material questions into one concise clarification list. All other unknowns remain explicit GAP / NOT_AVAILABLE / NOT_SURE and can be excluded from preview copy.

### 6. Produce the normalized handoff

Produce and cross-reference:
1. Raw Material Index.
2. Transcript / Interview Summary, when applicable.
3. Normalized Client Brief v2.1.
4. Atomic Fact Register and Source Register.
5. Asset and Permission Register.
6. Business Intelligence Summary and Offer Matrix.
7. Customer Question Map, Buying Journey and Trust Register.
8. Content Gap Register.
9. Public CTA / Contact Map, with private project contacts kept separate.
10. Critical Clarification List and production handoff recommendation.

Every material fact used in content, design or conversion must be traceable to a Fact Register record. Unapproved or unsupported facts must not appear as public claims.

## Output quality gate

Before handing off to UX and production, confirm:
- all available source material was reviewed;
- raw sources remain unchanged and indexed;
- each material fact has a source and locator or an explicit MISSING / ASSUMPTION state;
- conflicting facts remain visible;
- answer, evidence and publication states are separate;
- asset source, owner and permission are explicit;
- private contacts are not treated as public CTA destinations;
- follow-up questions are limited to true material blockers;
- no client-facing content has been fabricated.

## Failure handling

- If transcription is unclear, quote the uncertain passage and ask only if the detail is material.
- If an asset cannot be opened, record filename, failed inspection and ask for a usable file only if needed.
- If a file's rights are unknown, do not use it publicly; propose a licensed or clearly labelled concept fallback.
- If sources conflict, stop that fact from entering approved copy until resolved.
- If sources are incomplete, continue with supported content and label remaining gaps; do not force the client to fill every field.

## Operating constraint

Must work in the API-free manual workflow. Do not require a provider API, paid form service, transcription subscription, component registry or new platform feature. Use currently available AI application and file capabilities; mark unsupported operations as manual or NOT TESTED.
