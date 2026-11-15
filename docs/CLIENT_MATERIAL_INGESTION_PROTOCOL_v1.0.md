# Client Material Ingestion Protocol

Version: 1.0
Status: Proposed canonical operating protocol after Experiment #3
Purpose: Turn the smallest practical client input—normal interview material plus supplied assets—into a traceable, production-ready business brief using AI as the primary operator.
Default: Material-first. No mandatory long client questionnaire. No paid model API.

## 1. Product principle

The client should provide what they already have and explain their business once, in an ordinary conversation.

Minimum input:
1. Interview material: a recording, transcript, meeting notes or studio-written interview summary.
2. Existing client assets: logo, photographs, videos, brand guide, menu/catalogue, documents and other useful files.
3. Optional references: current website, public profiles, public contact destinations and reference URLs the client already has.

The client is not expected to write website copy, build a sitemap, structure an offer catalogue, complete a technical brief or answer a long list of website-production questions. The AI performs normalization and identifies only material gaps that require a human decision.

This is an operating workflow, not a requirement that the client use a specific upload portal. Until the platform supports private multi-file intake, the operator can store the material packet in a permission-controlled project folder/repository and pass it to the AI application manually.

## 2. Roles

| Role | Responsibility |
|---|---|
| Client | Participate in one normal business interview; provide existing assets and source links; clarify material facts/permissions when asked; approve public facts and final website |
| Studio operator | Arrange the interview, preserve raw materials, make the packet available to the AI, review exceptions and control approvals/release |
| AI / Master Skill | Transcribe where supported, inventory, extract facts, trace sources, identify conflicts/gaps, normalize the brief, research category context, plan, design, implement and QA |
| Specialist skills | Handle UX, visual design, typography, interface quality and visual audit within Master Skill authority |

## 3. Interview method

The interview should sound like a normal conversation, not a form being read aloud. Use these prompts only as reminders; skip any subject already answered.

- Ceritakan bisnis ini dan apa yang paling sering dibeli pelanggan.
- Biasanya pelanggan datang dengan kebutuhan atau masalah apa?
- Apa pilihan produk/layanan yang tersedia, dan bagaimana orang memilihnya?
- Apa yang sering ditanyakan atau membuat calon pelanggan ragu?
- Bagaimana proses pelanggan dari pertama menghubungi sampai menerima produk/layanan?
- Apa aturan penting seperti harga, jam, area layanan, lead time, pembayaran atau garansi?
- Apa yang membuat bisnis ini berbeda, dan bukti apa yang memang boleh ditampilkan?
- Apa tindakan paling penting yang harus dilakukan pengunjung website, dan ke mana tindakan itu diarahkan?
- Aset apa yang sudah tersedia, siapa pemilik/pembuatnya, dan mana yang diizinkan untuk digunakan?

Do not ask about CSS, frameworks, breakpoints, typography settings, page grids or implementation details. Do not force every prompt when the interview already contains the answer. The AI should derive follow-up questions from gaps rather than making the client complete a predetermined questionnaire.

## 4. Project material packet

Preferred logical structure (adapt to current storage; this is not a required new application feature):

    project/
      client-materials/
        raw/
          interview/
            original-recording-or-transcript
            operator-notes
          assets/
            original-client-files
          references/
            source-links.md
      discovery/
        raw-material-index.md
        interview-summary.md
        fact-register.md
        asset-register.md
        client-brief-v2.1.md
        business-intelligence.md
        offer-matrix.md
        customer-question-map.md
        buying-journey.md
        content-gaps-and-clarifications.md
        public-cta-map.md

Keep original client material read-only. Generated transcripts, summaries, extracted records and approved derivatives are new artifacts; never overwrite source files.

## 5. Ingestion and normalization pipeline

### Step A — Inventory

Assign a stable source ID to each item, such as SRC-INT-01, SRC-ASSET-04 or SRC-WEB-02. Record source ID, filename/URL, type, received date, source owner/provider if known, original location, confidentiality concerns and processing state (RAW / TRANSCRIBED / REVIEWED).

Do not expose internal contact details, credentials, customer lists or sensitive records to the website-generation workflow. Reject or quarantine material that is not needed.

### Step B — Transcribe and segment

If the interview arrives as audio/video, use the available AI application's transcription capability where practical. If not available, use the operator's existing transcription method or supplied notes. No paid model API is mandatory.

Preserve the original recording, transcript, operator corrections (clearly marked), speaker labels only where supported, and timestamps or paragraph/line locators. Do not convert uncertain speech into confident statements. Mark unclear passages for review only when they affect a material fact.

### Step C — Extract atomic facts

Extract one claim per record. Examples: business operates from one physical location; product X costs RpY; pickup requires advance confirmation; service area includes named districts; warranty lasts a stated period.

For every material claim, record:
- Fact ID and normalized field/value.
- Source ID and locator (timestamp, page/paragraph, filename/asset ID or URL section).
- Exact supporting excerpt or concise evidence note.
- Evidence status and publication status.
- Conflict/gap marker, owner and next action where unresolved.

Do not combine several claims if their sources or approval statuses differ.

### Step D — Separate status dimensions

Answer status:
- PROVIDED
- NOT_AVAILABLE
- NOT_APPLICABLE
- NOT_SURE
- CONFLICT

Evidence status:
- VERIFIED
- CLIENT-PROVIDED-UNVERIFIED
- DEMO-ONLY
- ASSUMPTION
- MISSING

Publication status:
- APPROVED
- PENDING
- NOT_APPROVED

A PROVIDED answer can still be CLIENT-PROVIDED-UNVERIFIED and PENDING publication. Never collapse these states.

### Step E — Process assets

For each file, record asset ID, filename, format/dimensions where relevant, source/creator and owner if known, intended website role, commercial-use permission, publication approval, required credit/licence/restrictions/expiry, identifiable-people consent status, alt-text candidate based only on visible content, and crop/focal-point notes where relevant.

A file supplied by the client is not automatically owned by them or approved for commercial use. If permission is unknown, mark PENDING. Never infer product specifications, ingredients, certifications, team identities, testimonials or consent from pixels alone.

### Step F — Resolve conflicts and gaps

Do not silently choose between contradictory prices, hours, addresses, policies or claims. Research may inform category expectations and UX patterns, but cannot manufacture client-specific information or silently override the client. Ask the authorized owner when a conflict affects customer-facing content.

Batch clarifications. Ask only questions that materially affect offer scope, price, policies, audience, public CTA, factual claims, asset rights or release. Leave non-critical unknowns as explicit gaps and exclude them from public copy.

#### Clarification triage and safe continuation

Assign each unresolved item to one next-milestone class:

- **PREVIEW BLOCKER:** prevents even a safe, clearly labelled internal preview. Continue only after resolving it or identifying a safe fallback.
- **PRODUCTION BLOCKER:** allows a disclosed preview, but prevents public publication or live operation. Common examples include unresolved brand identity, current prices/offers, exact address/hours, public CTA, material safety/policy claims, asset rights or people consent.
- **OPTIONAL GAP:** does not affect the approved current visitor journey. Record it and omit the related claim/feature instead of asking about it now.

The Clarification List must show the question, source conflict/gap, why it matters, priority, responsible owner and safe omission/fallback if unanswered. Batch the smallest set needed for the next milestone; group by decision owner where practical. Continue unaffected preview work using clearly labelled working names, contact-not-configured states or Studio-created concept assets when safe. Never present any fallback as an approved client fact or asset.

An unanswered clarification remains PENDING / NOT_APPROVED. Do not repeat it unless a later preview-to-production/release decision makes it necessary.
### Step G — Produce normalized outputs

The AI converts the source packet into the established Studio artifacts:
1. Source Coverage Matrix: every meaningful source section/topic mapped to a normalized output, or explicitly EXCLUDED with reason / NOT_AVAILABLE / CONFLICT / NOT_APPLICABLE.
2. Client Brief v2.1 (normalized output, not client input form).
3. Atomic Fact Register and Source Register.
4. Asset and Permission Register.
5. Business Intelligence Summary.
6. Offer Matrix.
7. Customer Question Map and Buying Journey.
8. Trust Register and Content Gap Register.
9. Public CTA / Contact Map, separate from private project contacts.
10. Critical Clarification List with owner and next action.
11. Tier recommendation, scope, sitemap/section plan and production handoff.

Every material fact in downstream copy must remain traceable to the Fact Register. Unsupported copy must be removed or explicitly marked as an internal assumption. Every meaningful source topic must also be accounted for in the Source Coverage Matrix; a topic cannot silently disappear between raw input and the normalized brief.

## 6. AI operating rules

- Read the entire interview material and relevant assets before asking questions.
- Do not make the client repeat facts already present in a transcript, source document or approved URL.
- Do not turn every brief field into a clarification question. A gap can remain a gap.
- Never hallucinate facts from image composition, logos, file names, visual style or industry conventions.
- Do not confuse category research with client evidence.
- Keep internal/private details out of public copy.
- Never infer permission to publish from file transfer.
- Use the simplest suitable workflow; no API key, paid form service, agent platform or backend integration is required.
- Retain the Design Differentiation Gate, Base → Refine → Independent QA, business-completeness review and explicit production approval gates from the Master Skill.

## 7. Human review: one compact exception gate

The operator/client review should focus only on material conflicts and critical gaps, fact corrections, public CTA destinations, asset ownership/permission and people-consent status, facts/claims requiring publication approval, and final website/release authorization.

Do not ask the client to approve technical design mechanics. The Master Skill owns design translation.

## 8. API-free operating model

The current platform file intake is not assumed to support private multi-file uploads or transcript ingestion. Until that capability is implemented:
1. The operator stores raw source materials in the access-controlled project folder/repository.
2. The operator attaches or provides those materials to the chosen external AI application alongside this protocol and the current Master Skill.
3. The AI produces the normalized brief, source register and discovery artifacts.
4. The operator uses the existing Studio workspace as a durable project/discovery record; any existing structured intake fields are filled from the interview-derived summary, not sent to the client as a second form.
5. The operator reviews generated artifacts and records approved outputs and unresolved exceptions.
6. No API, paid model integration or automatic file-processing service is required.

When the platform later adds file intake, preserve original files, project-level authorization, versioned snapshots and per-asset permission metadata. Do not build that feature until manual delivery demonstrates a repeated bottleneck.

## 9. Acceptance criteria

A project passes Material Ingestion when:
- Raw input packet is preserved and indexed.
- A Source Coverage Matrix accounts for each meaningful source section/topic, with a normalized destination or an explicit exclusion/unresolved reason.
- Interview facts are extracted into atomic claims with source locators.
- No material claim is silently invented or detached from its source.
- Answer, evidence and publication statuses are separate.
- Conflicts and critical gaps are routed to an owner.
- Assets have provenance and permission states; unknown rights remain pending.
- Normalized Client Brief and discovery artifacts are produced by AI.
- The client is asked only for material clarifications not already answered.
- The process can be completed manually with the existing AI application; no paid API is required.

## 10. Experiment #3 regression case — completed synthetic simulation

**Status:** COMPLETED AS A SYNTHETIC MATERIAL-NORMALIZATION SIMULATION; NOT A REAL INTERVIEW TEST.

The Semburat experiment's original fixture was already a structured, fully populated synthetic intake. To test the material-first handoff shape without pretending a real client interview existed, the experiment created:
- [Synthetic interview transcript](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s07-material-ingestion/docs/EXPERIMENT_03_SYNTHETIC_INTERVIEW_TRANSCRIPT.md), with nine segment locators (INT-01 through INT-09).
- [Separate synthetic asset packet](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s07-material-ingestion/docs/EXPERIMENT_03_SYNTHETIC_ASSET_PACKET.md), distinguishing absent client assets from Studio-generated demo artwork.
- [Raw material normalization QA](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s07-material-ingestion/docs/EXPERIMENT_03_RAW_MATERIAL_NORMALIZATION_QA.md), which records representative source-linked facts, separate answer/evidence/publication statuses and preserved unknowns.

**Simulation result:** PASS for the documented synthetic transcript/asset normalization case. The normalized facts were compared against the original structured fixture; a source-to-output coverage pass also caught and corrected several omitted source details before the checkpoint. Missing public CTA, valid map/location, accessibility assessment, reviews, credentials, client-owned imagery and publication rights remained unavailable rather than being invented. The material packet and QA record are explicitly marked SYNTHETIC / DEMO_ONLY.

**CI evidence:** S07 reran the existing S01–S06 Chromium website suites successfully in [PR run #43687520793](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43687520793) and [push run #43687516348](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43687516348). These CI runs verify website regressions; they do **not** execute an AI extraction model or prove automatic transcript parsing.

**Important limitation:** The synthetic transcript was reconstructed from the already-normalized structured fixture. It is not a real client transcript, recording, independent source or speech-to-text sample. Therefore this simulation tests the material packet structure and traceability conventions, not the full accuracy of extraction from an unstructured real interview. Actual client interview ingestion, audio transcription, arbitrary document parsing and real asset-rights verification remain NOT TESTED.

Do not present the Semburat synthetic packet as a real interview or real business. The next real-world pilot should use actual interview notes/transcript plus client-supplied assets and verify provenance and permissions before any public use.
