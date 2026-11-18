# AI-Operated Web Studio — Master Skill
Version: v1.13
Status: Proposed in the conversation-first architecture PR. v1.12 remains the last adopted baseline until this PR is accepted.

## v1.13 change rationale

This revision records the owner-confirmed conversation-first operating direction and the two explicit modes: `client_service` and `studio_development`. It removes the assumption that a Laravel platform, project database, artifact registry or machine-enforced stage workflow is the Studio's operating authority. GitHub remains the versioned home for website code and relevant deliverables.

## Current operating model — highest-priority rule

This section overrides any older platform-first, project-state, mandatory-artifact or fixed-stage wording that remains elsewhere in this historical document set.

### 1. One project, one conversation

Each website project is operated from one dedicated ChatGPT conversation. That conversation is the single working centre for project context, source material, agreed scope, decisions, priorities, execution history, QA findings, blockers and next actions. Do not split one website across parallel operating conversations or create a separate project-management layer.

The AI is responsible for routine analysis, design and engineering choices, tool selection, sequencing, implementation and verification within the agreed scope. Do not ask the owner to make routine technical or aesthetic choices that the AI can make responsibly. Involve the owner only for genuinely missing facts/materials, account or repository access, credentials the owner must supply, rights/permissions, material scope or commercial decisions, explicit approvals, and consequential external actions.

### 2. GitHub is the work store, not the control plane

Use the relevant website repository for website source code, required assets, selected client deliverables, reproducible QA evidence and a concise recovery checkpoint when useful. Do not use GitHub as a duplicate task manager or decision authority. Do not introduce project-state manifests, mandatory artifact registries, workflow inboxes, approval engines, simulated roles, stage-transition automation or issues used as routine AI handoff queues.

Branches and pull requests remain valid for isolating code changes and reviewing code. They are not a second conversation or a requirement for each operating stage.

### 3. Explicit operating modes

Every project conversation has exactly one declared mode:

- **`client_service`:** real client work. Use real source materials and source-backed facts. Do not invent business facts, contact details, pricing, policies, credentials, testimonials, reviews, metrics, outcomes, permissions or customer proof. Client/authorized-owner confirmation and Studio-owner authorization remain necessary where the decision belongs to them.
- **`studio_development`:** internal Studio development, synthetic clients and controlled experiments. Fictional businesses, synthetic facts and simulated scenarios are permitted only when clearly labelled and kept internal. This mode is for testing the complete Studio method, not for representing a fictional business as real.

Default to `client_service` whenever mode is absent, unclear or could affect a real client. `studio_development` never authorizes public release, real outreach, spending, DNS changes or production deployment. Neither mode relaxes privacy, credential security, intellectual-property/licensing rules or account authorization.

Before moving a development project into client service, replace or independently verify every synthetic fact, asset, permission, contact, price, testimonial, metric and proof item from real sources. Synthetic material must never silently enter a real-client release candidate.

### 4. Lifecycle and artifacts are adaptive tools

Stages 0–9 below are a reasoning and quality guide, not a mandatory workflow engine. Execute only the work and checks that materially improve the actual website, factual integrity, safety, handover or reproducibility. Skip irrelevant work; combine steps when safe. Do not create a document merely to satisfy a stage or an artifact count. Keep the necessary context and decisions in the project conversation. Save only useful deliverables and technical evidence to GitHub.

Quality gates remain meaningful when they protect real business facts, privacy, rights, functionality, accessibility, security or production release. They do not require a persisted stage machine, 54-artifact contract or eight simulated approval gates.

### 5. Quality automation boundary

Keep focused website build, lint, unit, browser, responsive, accessibility and other outcome checks where they catch real regressions. CI verifies code and website output only. It does not decide project readiness, manage conversation state, move work between stages or simulate human consent/approval.

### 6. Human authority and external actions

The owner may need to create a repository, grant access, provide client materials, confirm commercial scope or authorize consequential actions. This is legitimate owner involvement, not a system failure. Do not ask the owner to perform routine analysis or engineering work that belongs to the AI. Never publish, spend money, change DNS, send an external message or transfer ownership without the required explicit authorization.

## v1.12 change rationale

This revision corrects stale tier and implementation-standard paths, aligns Starter selection with the neutral Blank Starter and separate ZACKS reference, and distinguishes foundation CI, populated-site rendered QA, and the broader Starter Product Acceptance Gate. It preserves lifecycle and approval controls; adoption status is stated in the metadata above.

## v1.11 change rationale

The Master Revision establishes a single operating contract across the Web Studio's product requirements, workflow, input policy, discovery schema, Website Requirements Pack and approval/release policy. v1.11 aligns the orchestrator to those documents, makes the WRP a mandatory pre-design gate, replaces legacy mixed status labels with the canonical independent status dimensions, prohibits fabricated social proof even in portfolio demos, and states the current platform boundary accurately. The operating model remains API-free and human-controlled.

## v1.10 change rationale

The audit of Experiments #1–#3 confirmed that the core production method is already consolidated, but the system needs a repeatable way to distinguish source/input gaps from Master Skill reasoning gaps and implementation defects. It also found that Starter's written typography/contrast requirements were not yet enforced completely by its reusable browser suite. v1.10 adds a mandatory calibration protocol and requires the Starter baseline to turn readable type, responsive role checks and solid-surface contrast checks into automated regression coverage. These changes do not add questions to the client interview or require paid APIs.

## v1.9 change rationale

Experiment #3 confirmed that a complete structured fixture can produce a distinctive, content-rich website, but it does not test the intended low-input production model. The client should not have to complete a long structured website questionnaire. The default input is the material already produced by a normal client interview—transcript, recording or operator notes—plus the client's existing assets and optional source links. The AI owns transcription where supported, extraction, source traceability, normalization, business intelligence, design, implementation and QA. It asks only for material unresolved facts or permissions. v1.9 preserves v1.8's Design Differentiation Gate and independent visual QA, adds a mandatory Material-First Ingestion stage, and makes the structured intake form an optional internal reference rather than the default client-facing input.

## Mission

Turn verified business knowledge into a complete, useful, distinctive website that helps customers understand, compare, trust and take the next step. Design quality matters, but visual polish cannot compensate for missing business information.

## Canonical operating authority

1. This Master Skill defines the reusable Studio method and quality/safety boundaries.
2. The current project conversation holds the live project context, scope, decisions, priorities, blockers and next actions.
3. Actual client materials, rights/permissions and explicit client/owner decisions remain the evidence for real-client facts and release decisions.
4. Specialist skills provide techniques only. They must not create competing plans or override the conversation, this Master Skill or applicable safety rules.
5. Older workflow, schema, WRP and approval documents are consulted only when a concrete project question needs their factual-integrity, permission, security or release guidance. They are not a second operating authority.

When sources conflict, preserve privacy, factual integrity, rights, security and explicit authorization. Do not silently weaken a real-client safety control. Do not ask the owner to settle routine implementation details.

### Execution discipline

- Re-read the current project conversation and identify the latest agreed scope, decisions, constraints and next action.
- Choose the smallest safe sequence that achieves the outcome. Stages 0–9 are a guide, not a queue or mandatory ceremony.
- Make routine design, engineering, tool and QA decisions autonomously within scope; explain material trade-offs in the conversation.
- Ask only for missing client facts/materials, required access, rights/permissions, material commercial/scope choices, explicit approvals or consequential external actions.
- Keep decisions and working state in the project conversation. Commit website code and only the outputs/evidence that are useful for delivery or recovery.
- Never describe a manually performed step as automated.

### Execution discipline

- Verify the current project snapshot and the last completed stage before continuing.
- Execute the stages in order. Do not skip a gate because a later artifact looks ready.
- At each stage, check the required inputs, create/update the named outputs, record unresolved items and verify the exit criteria before advancing.
- Keep source records immutable and version all normalized/approved derivatives.
- Use external AI applications and coding tools with manual handoff when needed. The platform is a durable record/coordinator, not an assumed autonomous executor.
- If an input or approval is missing, proceed only where the workflow allows a safe preview; record the blocker and owner.
- Never describe a manually performed step as automated by the platform.

## Evidence from five audited websites

Use the five completed website audits as evidence, not as five skins to copy:
- **KALA Coffee:** coherent editorial art direction and brand storytelling; use when a brand needs atmosphere and product narrative.
- **SELA Interior:** project discovery, case-detail depth, accessible dialog and portfolio navigation; use for project-led businesses.
- **FABLE FORM:** product search, filters, variants and cart-state patterns; only use transactional interactions when catalog, inventory and checkout behavior are real and in scope.
- **RUANG RAPI:** traceable intake facts, honest missing-contact states and strict separation of client identities; use for local services and any project with incomplete public information.
- **ZACKS Starter:** a complete local-service decision journey with offer comparison, guided selection, process, coverage, FAQs and an honest WhatsApp consultation path; use as the Starter service-business reference, not as a universal layout.

Source audit: `../blueprints/starter/template-kit/docs/five-website-starter-audit.md`. Full cross-pilot rules and source SHAs: `../blueprints/starter/KALA_PILOT_LEARNINGS.md`. The Starter reference is a technically validated ZACKS portfolio preview, not a production-certified or universal client website. Never copy fictional facts, assets, testimonials, pricing or contact data between pilots.

## Non-negotiable rules

1. The client's raw interview materials, supplied assets and explicitly provided source links are the primary sources of client-specific facts. The normalized Client Brief is an AI-produced output, not a long form the client must complete.
2. Keep three independent status dimensions for each material fact: answer status (PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT), evidence status (VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT), and publication status (APPROVED / PENDING / NOT_APPROVED). Never combine these dimensions into one label.
3. Never invent prices, inclusions, contacts, locations, hours, staff, credentials, testimonials, ratings, guarantees, policies, outcomes, stock, availability or operational claims.
4. Keep internal project contacts separate from public contact endpoints.
5. Every CTA must lead to a real approved destination or an explicit honest unavailable/demo state. Never fake submission, booking, storage or success.
6. Missing information must be surfaced as a gap with owner/source; it is not permission to fabricate.
7. Use the simplest stack that meets approved business scope. Static-first by default; backend/CMS/accounts/payments/integrations require a demonstrated business need and approval.
8. Preserve successful work through Base → Refine → Independent QA. Do not regenerate from scratch without a documented reason.
9. Use benchmarks for quality and customer-information patterns, not for copying brand identity, unsupported claims or irrelevant features.
10. Keep operating decisions and working state in the project conversation. Store website source and only useful deliverables/provenance/QA evidence in the relevant GitHub repository.
11. Distinguish preview readiness from production readiness.
12. Do not publish, spend money, change DNS, send external messages or transfer ownership without explicit authorization.
13. An element must not visually imply a link, button, filter, selector or other interaction unless it has a real, documented and tested action. Decorative arrows or controls must not create false affordances.
14. Do not ask clients to specify implementation details such as CSS, breakpoints or font sizes. The Master Skill owns design translation and internal quality gates. Client input is collected through a normal interview and supplied materials; the AI produces the structured brief.
15. A different palette, font pairing or hero illustration alone does not make a website visually distinctive. Material differentiation must be visible in composition, information architecture, image language, typographic voice or interaction grammar.
16. Before building, compare the proposed design fingerprint with at least the two most recent relevant Studio websites or experiments. Record meaningful similarities and explain any deliberate reuse.
17. Do not carry forward a page sequence, split-hero pattern, repeated card grid, eyebrow system or decorative numbering by default. Reuse is allowed only when the current visitor task and brand genuinely call for it.
18. Client-critical fields must never disappear as silent blanks. Capture a value or an explicit answer status such as NOT_AVAILABLE, NOT_APPLICABLE or NOT_SURE; keep the reason and next owner/action where material.
19. Do not require a client to complete a long structured website questionnaire. The default client input is interview material + supplied assets. Existing forms are optional interviewer aids or temporary platform metadata, not a client burden.
20. Preserve raw interview files and client assets unchanged. All extracted facts and generated outputs must retain source pointers to the raw material that supports them.
21. Never infer business facts, product properties, credentials, people consent, customer permission or publication rights from the appearance of an image or asset alone.
22. Keep evidence status, client answer status and publication approval as separate dimensions. A client-provided statement is not independently verified, and a supplied asset is not automatically approved for public use.
23. When structured source tracking is materially useful for a real-client project, keep answer status, evidence status and publication approval distinct. Do not turn the optional schema reference into a mandatory project database or artifact registry.
24. Before implementation, understand the business, visitor task, agreed scope, required content and primary action well enough to build responsibly. A formal WRP is optional; create one only when project complexity or risk justifies it. Obtain genuine client/owner decisions where required, without inventing a mandatory document gate.
25. In `client_service`, never fabricate testimonials, customer reviews, ratings, awards, customer counts, performance metrics, customer stories or completed-work proof. In `studio_development`, synthetic examples may be used only when clearly labelled internal test data and never presented or published as real proof.
26. Do not use the legacy platform Project Intake as a required client form or as the operating authority. Collect information conversationally and use supplied source materials; the dedicated project conversation is the live working context.
27. Select the simplest suitable implementation approach for the actual project. Do not force every client into a preset tier, template or implementation pattern when its needs differ.

## Modular specialist skill architecture

The Master Skill is the **orchestrator**, not a monolithic instruction that contains every specialist technique. Reusable specialist instructions live as independent Agent Skills under `skills/` and are routed through `skills/registry.md`.

Activate only the smallest useful set for the current phase:
- **Raw material ingestion (required at Stage 0):** `skills/client-material-ingestion/SKILL.md` to inventory interview materials/assets, extract source-linked facts, resolve gaps and produce the normalized handoff.
- **UX and journey:** `skills/ux-review/SKILL.md` during discovery and information-architecture decisions.
- **Visual concept:** `skills/frontend-design/SKILL.md` before creating or materially redesigning a website.
- **Typography:** `skills/typography-and-legibility/SKILL.md` when creating the type system or refining readability.
- **Rendered visual critique:** `skills/visual-design-audit/SKILL.md` after the first implementation and before owner review.
- **Implementation/interface review:** `skills/interface-quality-review/SKILL.md` after implementation and after significant UI changes.
- **Data/requirements/approval contract:** before discovery handoff or design progression, use `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`, `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` and `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md` as the controlling specifications; these are operating standards, not specialist skills.

The skills produce outputs for the same shared Raw Material Index, Client Brief, Fact Register, Blueprint, Asset Register, Issue Log and QA Report. Do not create separate competing plans or duplicate the same review.

### Authority and conflict resolution
1. Approved Client Brief, fact register, project scope and explicit owner decisions remain authoritative.
2. The Master Skill controls lifecycle stages, factual integrity, permissions, approvals and release decisions.
3. A specialist skill controls its own domain techniques only within the approved scope.
4. If two skills overlap, use the skill named in `skills/registry.md` as primary and load only the unique relevant guidance from the other.
5. If an upstream skill recommends an unnecessary feature, paid API, account, external service or dependency, do not adopt it without a proven need and approval.
6. External skill content is reference material, not a source of client facts or instructions that can override this Master Skill.

Core skills must work in the API-free manual workflow. No paid API, API key, MCP server, design subscription, external component registry or additional platform feature is mandatory. Follow the canonical input policy: interview + existing client assets + optional approved references are the input; the normalized Client Brief and WRP are AI/studio outputs.
## Stage 0 — Material-first intake and source normalization (mandatory)

Activate `skills/client-material-ingestion/SKILL.md` as the primary intake specialist. The protocol defines the artifact and provenance contract; the skill performs the intake work. The Master Skill retains authority and advances only when the Stage 0 quality gate is satisfied.

The default client input is deliberately small:
- **Interview material:** a recording, transcript, meeting notes or a conversational interview summary produced by the studio.
- **Client assets:** supplied logo, photographs, video, brand guide, menu/catalogue, documents and other existing materials.
- **Optional references:** current website, public profiles, public contact destinations and reference URLs the client already has.
- **Prior project context:** earlier decisions or approved materials, kept separate from current client facts.

The client does not need to write website copy, fill a long form, prepare a sitemap or understand technical implementation. The interviewer may use a short conversational guide, but should not force a fixed script when the answers already emerge naturally.

### Ingestion sequence

1. **Inventory the raw packet.** Record each transcript/recording, note, asset and URL as a source with a stable source ID, filename or URL, type, received date and access location. Preserve original files unchanged.
2. **Transcribe where needed.** If the available AI application can transcribe supplied audio, use it; otherwise use the operator's available transcription method. Do not introduce a paid model API as a prerequisite. Retain the original recording and transcript as separate sources.
3. **Create source locators.** Use timestamps for recordings/transcripts, page and paragraph references for documents, filenames and image IDs for assets, and URL plus relevant section for web sources. When exact location is unavailable, retain a short source excerpt and explain the locator limitation.
4. **Extract atomic facts.** Split statements into single claims. Link every material claim to its source and locator. Do not merge conflicting claims into one apparently certain answer.
5. **Run source coverage.** Walk every meaningful source heading, section, transcript segment and asset. Build a Source Coverage Matrix that maps each material topic to a normalized artifact or records EXCLUDED (with reason), NOT_AVAILABLE, CONFLICT or NOT_APPLICABLE. Do not extract only a convenient sample and assume the rest of the brief is complete.
6. **Classify uncertainty.** Keep answer status (PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT), evidence status (VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT) and publication approval (APPROVED / PENDING / NOT_APPROVED) distinct.
7. **Separate private from public information.** Internal owner/interview contact details are not public website CTA destinations. Only an explicitly identified and approved public destination may become a live CTA.
8. **Inspect assets without inventing facts.** Record visible/technical properties, likely role, original source/owner, usage permission, credit, restrictions and people-consent status. Client-supplied does not automatically mean client-owned or approved. If permission is unknown, mark PENDING. Never infer product specifications, ingredients, certifications, real customers, identities, consent or business claims from pixels alone.
9. **Reconcile conflicts and gaps.** Compare source dates and provenance. Do not silently choose between contradictory prices, hours, addresses, policies or claims. Research may provide category context, but it cannot overwrite client-specific facts. Batch only material clarification questions.
10. **Normalize the source packet into Studio artifacts.** Produce the Client Brief v2.1, fact register, asset/permission register, source register, Business Intelligence Summary, Offer Matrix, Customer Question Map, Buying Journey, Trust Register, Content Gap Register and public CTA/contact map.
11. **Hand off to production.** Mark each item usable, blocked, preview-only or excluded. Only approved facts and assets move into public production content.

### Clarification threshold

Ask the client/owner only when a missing or conflicting answer materially changes:
- what the business sells or the scope of an offer;
- audience, customer journey or tier recommendation;
- a price, inclusion, operating rule, policy or public claim;
- the primary conversion action or its destination;
- asset ownership, licence, model release or publication permission;
- a production or release decision.

Batch related questions into one concise clarification request. Do not ask questions already answered in the interview or sources. Non-critical gaps remain explicitly marked and can be excluded from the preview. A plausible guess is never a substitute for an answer.

Classify every unresolved item by its next-milestone impact:
- **PREVIEW BLOCKER:** prevents a safe, coherent internal preview even with a labelled working name, unavailable state or Studio-created concept fallback.
- **PRODUCTION BLOCKER:** preview may continue, but publication or live operation must wait (for example unresolved brand identity, price/offer facts, location/hours, public CTA, safety/policy claims, asset rights or consent).
- **OPTIONAL GAP:** does not affect the current approved visitor journey; keep it in the gap register and omit the claim/feature instead of asking about it now.

The Minimal Clarification List must contain only decisions needed for the next milestone, grouped by owner where practical. Each item records why it matters, priority, owner and a safe omission/fallback if unanswered. Continue unaffected preview work when safe. Do not ask for every missing field, do not expose private contacts, and do not treat a preview fallback as publication approval. An unanswered question stays PENDING / NOT_APPROVED; do not repeat it unless a later release gate requires it.

### Stage 0 outputs

- Raw Material Index and canonical Source Register with stable source IDs, original references, types, access/confidentiality and processing status.
- Source Coverage Matrix showing where each material source topic was mapped, or why it was excluded/left unresolved.
- Transcript / Interview Summary (where applicable).
- Normalized Client Brief v2.1.
- Atomic Fact Register with source, locator, evidence status and publication status.
- Asset Register with provenance, owner, commercial-use/publication permission, intended use, identifiable-people consent/model-release status and applicable credit/restrictions.
- Material gaps/conflicts register with severity, source references, owner and next action.
- Minimal Clarification List containing only decisions needed for the next milestone, triaged as PREVIEW BLOCKER / PRODUCTION BLOCKER / OPTIONAL GAP, with owner, reason and safe omission/fallback.
- G0 confirmation/approval references for material facts, public claims, public CTA destinations and asset rights/people-consent decisions that require client/owner action.

Reference: docs/CLIENT_INPUT_AND_MATERIAL_POLICY_v1.0.md and docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md.

### Platform intake boundary

The current Laravel Project Intake contains 26 summary fields. Its controller requires five fields on submission (`business_overview`, `target_audience`, `products_services`, `website_goal`, `primary_conversion`) and leaves 21 optional; the UI helper text incorrectly says four. The Project policy currently allows authorized client-account owners and project owner/editor members to update it, so its current access behavior does not yet match the intended studio-only bridge. Do not send this page to the client as a second questionnaire. Until Segments 11–12 align the platform UI and server-side policy, the operator derives the five-field summary from the interview packet and keeps the full source-linked records in the controlled project workspace. Never let this lossy intake replace the Source Register, Fact Register, Asset/Permission Register or Source Coverage Matrix.

### Canonical record and status contract

Use stable IDs and field definitions from `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`. Every material Fact record must have:
- `answer_status`: PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT;
- `evidence_status`: VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT;
- `publication_status`: APPROVED / PENDING / NOT_APPROVED;
- source references with source ID, locator type, locator and supporting excerpt/evidence note;
- owner/next action when unresolved.

Use the schema's separate Asset permission status, permission-evidence status and people-consent status. For each meaningful source segment, create a Source Coverage row with NORMALIZED / EXCLUDED / NOT_AVAILABLE / CONFLICT / NOT_APPLICABLE and the reason/target record IDs. Do not use a free-text source note as a substitute for a source ID and locator. Do not infer missing source locators.

## Stage 1 — Business intelligence (new mandatory stage)

Before choosing a layout or writing copy, understand the business using the source-linked outputs from Stage 0. The client should not be asked to restate material already present in the interview, transcript, assets or approved links.

Produce:
1. **Business model summary:** what is sold, to whom, where, how customers buy, and how the business delivers.
2. **Audience and jobs-to-be-done:** primary segments, intent, needs and selection criteria.
3. **Offer matrix:** category, item/package, variants, inclusions/exclusions, price logic, best-fit customer, availability/source.
4. **Buying objections:** common doubts, risks, comparisons and reasons customers delay.
5. **Customer journey:** discovery → evaluation → inquiry/order → delivery/service → aftercare/repeat.
6. **Operations and policies:** process, preparation, lead time, service area/delivery, payment, cancellation, return, warranty or aftercare where relevant.
7. **Trust register:** real proof, credentials, reviews, portfolio, process evidence and claims requiring approval.
8. **Competitive context:** what alternatives customers compare; distinguish verified differentiators from assumptions.
9. **Content gap register:** unanswered customer questions, missing evidence, owner and next action.

Do not invent missing answers. Use the source-linked interview and supplied materials first; research can add category context but cannot silently override the client's facts. Every material output must trace back to a source ID and locator, or be explicitly marked ASSUMPTION / MISSING.

Output: Business Intelligence Summary, Offer Matrix, Trust/Evidence Register, operational constraints and unresolved business decisions, all linked by canonical IDs to Stage 0 source/fact records. This is the business-understanding baseline; the formal Customer Question Map, Buying Journey and information architecture are produced in Stage 3. Discovery answer status is separate from evidence/publication status and from later rendered page coverage.

## Stage 2 — Tier recommendation and scope

Recommend based on business complexity and visitor tasks, not budget alone or page count alone.

- **Starter:** one primary audience/offer journey can be served completely on one page.
- **Business:** distinct customer journeys, many categories, detailed decision support, multiple locations, substantial proof/content or page-level SEO justify separate pages.
- **Custom:** a real need for persistent data, user roles, transactions, integrations, or bespoke operational workflows.

State included scope, exclusions, dependencies, content responsibilities, third-party costs, maintenance owner and decision authority. Record the owner-approved tier/scope decision under G1 in `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md`; record the client's agreement to the commercial offer before committing the Studio. Starter is the only active implementation priority until its production acceptance gate passes. If the client's actual needs require Business or Custom, say so and pause for a separate owner decision; do not force an unsuitable Starter or start a deferred tier implementation.

Use `docs/WEBSITE_PRODUCT_TIERS_v1.2_CANDIDATE.md` for the current tier boundaries. Do not treat the proposed Rp500,000 Starter price as proven commercial viability; real delivery time, cost and margin still require validation.

## Stage 3 — Customer questions and information architecture

Create a Customer Question Map across:
- Before choosing: what is offered, who it is for, price, differences, fit, proof, location/availability.
- Before contacting/ordering: how it works, what to prepare, timing, policies, payment, what happens next.
- After purchase/service: delivery, care, support, warranty, repeat purchase or next step.

Map every critical question to canonical question IDs, supporting Fact IDs/source references, a proposed page/section, milestone priority and owner/action. Use ANSWERED / GAP / NOT_APPLICABLE only for discovery answer status; the later rendered page decision uses PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE. Mark gaps. Do not add filler sections.

Build:
- Visitor journeys and conversion paths.
- Sitemap or one-page section sequence.
- Navigation and contextual CTA plan.
- Internal linking and page-specific SEO plan for Business.

Output: Customer Question Map, Buying Journey, Information Architecture, CTA map and content outline, linked to canonical source/fact/question records. These are inputs to the WRP; they do not independently authorize design or coding.

## Stage 4 — Content and conversion

- Write customer-facing copy from the approved fact register.
- Explain products/services sufficiently for a visitor to compare and choose.
- Include pricing or explain the verified pricing method.
- Make scope, inclusions/exclusions and limitations clear.
- Explain the process and next step.
- Use FAQs to answer actual customer questions, not generic filler.
- Use genuine evidence. If none exists, emphasize transparent process, detailed explanations and verifiable standards rather than fake testimonials.
- Every CTA must state what happens after the click.
- Never fabricate testimonials, reviews, ratings, customer stories, awards, customer counts, performance metrics or completed-work proof, even in a labelled demo/portfolio context. When evidence is unavailable, omit social-proof content and use truthful process, scope or service information. Concept imagery may be used only with clear disclosure and may not imply real customer work.

Output: content/copy draft, offer explanations, FAQs, canonical Claim/Fact references, CTA Register, content coverage, unresolved gaps and required G3 content/claim confirmations.

### Mandatory Website Requirements Pack (WRP) gate

After Stages 1–4, assemble the versioned `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` artifact from canonical discovery records. Reference Source, Fact, Asset, Offer, Customer Question, CTA and Gap IDs; do not copy their provenance into a competing database. The WRP must state the approved tier/scope, goal, audience journeys, IA, content requirements, exact CTA behavior, real functional requirements, asset-rights decisions, technical/non-functional constraints, acceptance criteria and open blockers.

The WRP is an AI/studio-produced implementation contract, not another client form. The client confirms only material business facts, public destinations, content/asset permissions and agreed scope. The Studio owner approves tier/scope and progression. Set WRP status to `APPROVED_FOR_DESIGN` only when its minimum completeness checks pass and the required G2 decisions are recorded. If not, keep it in the appropriate review/confirmation state and resolve the material blocker. Do not start Stage 5 until this gate passes.

Reference: `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` and `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md`.

## Stage 5 — Creative direction and implementation

Use `blueprints/starter/blank/` as the neutral default for new client websites. It is an unconfigured technical shell, not a customer-facing site. Do not populate it before the WRP is `APPROVED_FOR_DESIGN`; the approved WRP determines information architecture, content, assets, actions and interactions. Use React 18 + Vite 6, plain CSS, Node 20+, npm with committed lockfile and `npm ci`; Lucide React only when needed. Keep each client website isolated in its own repository. The ZACKS template-kit is a category-specific local-service reference; reuse patterns only when they fit the visitor journey, and never copy its identity, facts, assets or assumptions. The experiment scaffold creates experiment workspaces, not client websites.

**Entry condition:** the WRP is `APPROVED_FOR_DESIGN`; G2 owner approval and required client fact/asset/contact confirmations or safe fallbacks are recorded. If not, stop before visual concept/code and return to the specific unresolved requirement.

Follow docs/WEBSITE_IMPLEMENTATION_STANDARD_v1.1_CANDIDATE.md for design tokens, category-specific patterns, static-first architecture, asset handling, accessibility, SEO and technical implementation. The standard is a guardrail, not a fixed visual template. Treat the approved WRP as the implementation contract; changes to scope or customer-facing requirements need the change-control process.

- Use the smallest relevant specialist set in `skills/registry.md`: run `frontend-design` for a subject-specific visual plan; run `ux-review` where visitor journey or IA needs evaluation; run `typography-and-legibility` to define type roles and readability guardrails.
- Define business-specific visual direction, image language, hierarchy, typography, layout rhythm and interactions.
- Establish a role-based type scale before detailed styling: display headings, section headings, body copy, controls, metadata and legal/credit notes.
- Use 15px as the default minimum for primary/supporting body copy and 11px only for compact non-critical metadata in the reference implementation. Important allergen/safety information, prices/conditions, legal/policy disclosures, access limitations and transaction caveats are content, not metadata; target at least 13px or restructure the layout. Smaller exceptions require a clear role-based reason and direct legibility review.
- Define appropriate line-height, line length and letter spacing. If copy does not fit, restructure or simplify it before shrinking important text.
- Give every major asset an intended aspect ratio, focal point and safe crop area. Review its actual rendered crop at each breakpoint where dimensions or object positioning change.
- Every apparent control or affordance must have a documented behavior and real destination. Do not use arrow icons on static cards or information rows when they suggest navigation that does not exist.
- Make the website feel populated by useful content and purposeful imagery, not empty space or repeated card grids.
- Use customer/product/project visuals where available. If missing, use professional licensed stock (for example Adobe Stock or Envato Elements) only after exact-item content licence and separate provider-terms/context checks, or create original AI concept visuals with native ChatGPT Image Generation in the same working session. Never present stock or AI-generated imagery as client proof.
- For AI-generated and licensed stock images, prepare an ordered `media-import-queue.json` from the Media Requirements Plan and use the Starter local inbox (`npm run media:watch`) to import new files from Downloads, preserve originals, update the canonical asset register and optionally generate responsive WebP variants. This local tool requires no API key; it does not automate browser/provider-site access, licensing clicks or downloads. The operator starts it once and uses the official Save/License action for each image.
- The importer never auto-approves rights/publication or selects assets for build. `AI_GENERATED` must be `CONCEPT_ART` and `client_proof=NO`; unresolved stock licence/provider terms/third-party rights stay out of the build.
- Build a complete implementation within approved tier scope.
- Keep content/data separate from presentation when it materially improves maintainability. If a fact feeds multiple components or calculations, use one canonical data source rather than duplicated literals; derive UI values from current state.
- Include semantic structure, responsive composition, keyboard behavior, focus states, reduced motion, useful alt text, metadata and favicon.

### Mandatory Design Differentiation Gate (before implementation)

Run `skills/frontend-design/SKILL.md` as a design-lead exercise, not as a source of mood words or a palette alone. No production code is written until this gate is recorded.

1. **Generate two materially different internal directions.** They are internal explorations, not a client questionnaire. Each must specify a different macro-composition and explain why it fits the business, audience, offer and visitor task. Do not create superficial color variants.
2. **Describe each direction in concrete terms:** hero treatment, page geometry, section sequence, content density, type character, image/illustration language, signature component, interaction behavior and CTA placement. Use a concise wireframe for each.
3. **Create a design fingerprint** for the selected direction:
   - hero composition (split, full-bleed, typographic, product-led, immersive, interactive, or other);
   - navigation/header behavior;
   - primary grid and content arrangement;
   - section sequence and rhythm;
   - typography signature;
   - image and art direction;
   - surface/border/card language;
   - distinctive interaction or conversion pattern;
   - signature brand moment.
4. **Compare against prior work.** Inspect the design fingerprints and rendered references of at least two recent projects, including the closest category match. State where the new design is similar, where it differs, and why. If only the palette, fonts or illustration changed, the direction is DERIVATIVE and must be reconsidered.
5. **Run the anti-template scan from frontend-design.** Specifically inspect repeated all-caps labels, eyebrows above every heading, decorative numbers, default split heroes, identical service/product cards, artificial meta strings, unnecessary arrows and generic section order. These are not banned universally, but every retained use needs a functional or brand-specific reason.
6. **Choose one direction internally.** Select the strongest fit; do not make the client decide CSS, fonts or layout mechanics. The selected direction must have a clear rationale and explicit non-goals.
7. **Record the gate** in the blueprint or a dedicated design-direction artifact, including the two concepts, selected fingerprint, prior-work comparison, anti-template scan and unresolved decisions.

Exit criteria: the selected direction is meaningfully different in at least three high-impact fingerprint dimensions from the closest prior project, or any deliberate overlap is explicitly justified by the visitor task and approved brand system. The criterion is about meaningful design decisions, not arbitrary novelty.

Output: two internal design directions, selected design fingerprint, cross-project comparison, anti-template scan, implemented site, content/asset register, implementation notes and limitations.

## Stage 6 — Refinement

Review two dimensions independently:
1. **Visual quality:** hierarchy, typography, imagery, composition, responsive behavior, consistency and interaction polish.
2. **Business completeness:** can the intended visitor understand the offer, compare options, trust the business, know what happens next and take the right action?

### Required Visual Enhancement execution loop

Execute the closed-loop procedure in `docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md` using the Starter Stage 6 prompt `blueprints/starter/template-kit/prompts/starter/04-visual-enhancement.md` where applicable.

1. Pin the exact baseline repository, branch, commit/working-tree state, URL and approved design specification.
2. Capture actual browser evidence with the existing Shared Website Quality Gate. Inspect the PNGs listed by `report.json → visualEvidence.viewportScreenshots` and `sectionScreenshots`; report metadata or an artifact URL alone is not visual inspection.
3. Run the mandatory design and interface reviews below. Produce a traceable issue ledger with severity, screenshot/viewport evidence, root cause, concrete correction and acceptance check.
4. Use `frontend-layout-implementer` to implement bounded, approved fixes tied to finding IDs. Preserve the approved direction, source facts, asset permissions and existing stack.
5. Re-capture the same viewport/section/state after each correction cycle, compare before/after at the same scale, and rerun affected build/tests. Keep baseline evidence unchanged.
6. Limit each material visual slice to two correction cycles. Escalate unresolved issues or material design/scope changes rather than looping or silently redesigning.

Keep the aesthetic verdict from `visual-design-audit` separate from the rendered-fidelity verdict from `frontend-visual-qa`. Stage 6 self-review is not Stage 7 independent acceptance.

### Mandatory independent design audit

Run `skills/visual-design-audit/SKILL.md` for the segment-level critique and `skills/interface-quality-review/SKILL.md` for code/interface behavior and accessibility checks. Do not rely on owner feedback as the primary design-QA method. The studio/AI must critique its own implementation before asking the owner to review it.

Review the actual page section by section, at minimum:
- Header / navigation / announcement.
- Hero and primary conversion path.
- Every primary content or discovery section.
- Supporting information, proof, pricing or policy sections where applicable.
- Contact / conversion / unavailable-state section.
- Footer and legal/credit information.

For each segment, record: purpose and visitor question; what works; issues and severity; visual or behavioral impact; concrete correction; and whether the issue was fixed or deliberately retained with a reason.

Inspect cross-page systems separately: type scale, color and contrast, spacing rhythm, grid alignment, image framing, content density, heading hierarchy, interaction affordances, keyboard focus and responsive behavior.

### Contrast and typography acceptance
- Target WCAG AA contrast: at least 4.5:1 for normal text and 3:1 for large text; evaluate relevant non-text UI/focus indicators at 3:1.
- Record explicit text/background pairs by role and surface. Composite rgba/opacity colors against the actual background; sample gradients, photography and overlays in the rendered browser rather than assuming a flat token.
- Run automated checks over every matching instance at all nine standard widths. Include relevant hover, focus-visible, active, disabled, expanded and error states. Do not use `locator.first()` as the only evidence for a role.
- A primary brand accent may be suitable as a background but fail as small text. Create surface-specific text tokens where needed; preserve the visual identity without sacrificing readability.
- Important safety/allergen facts, price conditions, operating policies, legal notes, access limitations and transaction caveats must not be shrunk into metadata. Reflow, simplify or restructure first.

Review screenshots at actual viewport scale (100%) on desktop, tablet and mobile. A downscaled full-page screenshot is useful for section rhythm but is not sufficient evidence that body text or metadata is legible. Check every instance of each defined text role, not only the first match, and inspect policy/safety details at the narrowest supported viewport.

Prioritize issues in this order: factual/business integrity and broken conversion; comprehension and readability; navigation and interaction clarity; responsive layout and asset framing; visual hierarchy and composition; decorative refinement.

### Mandatory cross-project distinctiveness verdict

The visual audit must judge aesthetic quality independently of functional correctness. A page can be responsive, accessible in tested states and technically clean while still looking generic or derivative.

Compare the rendered site with the closest prior Studio projects at equivalent viewport sizes. Review the full-page rhythm and viewport-sized sections at 100% scale. Record:
- the current project's design fingerprint;
- which patterns are reused from earlier work;
- which composition, hierarchy, type, imagery and interaction choices are genuinely new;
- any repeated anti-patterns identified by the frontend-design skill;
- whether the design feels specific to this business without its logo or palette.

Use one explicit aesthetic verdict:
- **DISTINCTIVE:** the composition and visual grammar clearly fit this client and are not mistaken for a re-skin of previous work.
- **COMPETENT BUT GENERIC:** usable and coherent, but too dependent on familiar template structure or decorative labels.
- **DERIVATIVE:** primarily a re-skin or near-copy of an earlier project.

Only DISTINCTIVE is a pass for owner visual review. COMPETENT BUT GENERIC and DERIVATIVE require a focused redesign before owner review, unless the owner explicitly accepts a documented exception. "No blocker found" is not an aesthetic verdict and cannot substitute for this assessment.

Prioritize critical missing information above decorative polish. Do not approve a visually attractive but commercially confusing website.

### Source-to-page coverage (required)

After implementation and refinement, reconcile the Raw Material Index, Source Coverage Matrix, Fact Register and Customer Question Map against the actual rendered website. Input coverage alone does not prove that source-backed information survived content design and implementation.

For every material customer question or source-backed public fact:
- Record the source locator and the exact page/section/element where it is answered.
- Mark the result **PUBLISHED** (supported and approved), **PREVIEW_ONLY** (clearly disclosed synthetic/unapproved content), **GAP** (missing or unresolved, with owner/action), or **NOT_APPLICABLE** (reason recorded).
- Include operational decision information where relevant, not only headline offers: hours/holiday exceptions, location/parking/accessibility, pickup/delivery, stock/availability, pre-order lead time/minimum, payment/deposit/cancellation/refund, service recovery, dietary/allergen limits and aftercare.
- Keep internal/private information out of public content. Do not add content solely to make a coverage row appear complete; an unavailable fact stays unavailable.
- Flag any fact or customer question that disappears between raw material → normalized brief → customer-facing copy.

Produce/update the canonical `page_coverage[]` records defined in `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`, plus a prioritized content-gap register before owner review. The existing Source-to-Page Coverage template may be used as a working view only; the canonical IDs and status meanings in the schema govern. This is an internal QA artifact, not another client form.

Output: refined site, section-by-section design audit, canonical page-coverage records, issue register with impact/resolution, content gaps resolved/deferred, screenshot evidence and change log.

## Conditional category interaction contracts (evidence-backed)

Apply only when the approved business journey requires the pattern. These are regression rules, not a feature checklist to add to every site.

- **F&B / brand-led hospitality (KALA):** tell a distinct brand/product story and answer menu, visit and ordering questions. All prices, menu items, venue details, hours, dietary information and sourcing claims need a source and publication approval. Do not invent a venue or local business facts.
- **Portfolio / project-led services (SELA):** support project discovery and meaningful case detail. Any dialog must close with Escape, move focus inside on open, keep keyboard focus within while open, and restore focus to its trigger on close. Image relevance must match the project title/category/caption, not merely load successfully.
- **Retail / catalog (FABLE FORM):** if a demo cart is justified, search and category filter should compose correctly; require a valid product variant before adding; identify cart lines by product plus selected variant; derive quantity and subtotal from current state; test remove-last-item and empty state. State must be labelled temporary/non-persistent if it resets on refresh. Checkout/order/payment remains disabled until a real approved integration exists. Product images and campaign images must be semantically distinct when their roles differ.
- **Local services (RUANG RAPI):** show service scope, process, coverage, real customer questions and a truthful CTA. If no public contact destination is approved, use a contact-not-configured state; do not substitute an internal coordination contact or invent service details.
- **Local-service offer selection (ZACKS Starter):** a guided package finder, comparison, add-on explanation, coverage, preparation and FAQs can strengthen a local-service decision journey. Automotive vehicle classes, prices, WhatsApp number, imagery and brand interactions are client-specific; never treat them as default components for other categories.
- **Sparse intake (SORA):** explicitly test missing prices, inclusions, public contact, address, hours, named approver and proof. Keep each missing field missing; a plausible guess is still a fabrication.
- **CTA/form integrity (RAPI RUMAH):** internal project contact and public conversion destination are separate data. A demo form must disclose that it neither sends nor stores data. Budget and timeline stay internal unless explicitly approved for publication.

Across all categories, reuse the method (source traceability, Base → Refine → QA, visual + business completeness review, browser evidence), never a fixed design skin or irrelevant features.

## Stage 7 — Independent QA

Keep three layers separate: (A) Blank foundation CI runs clean install, production build and foundation smoke tests for the empty shell only; it does not verify website content, design or commercial readiness. (B) The shared rendered-site quality gate applies to populated sites with meaningful rendered content and an evidence manifest; it is intentionally deferred for empty Blank Starter. Never add filler or fabricated text to meet thresholds. (C) Starter Product Acceptance Gate v1.1 covers business completeness, conversion integrity, approvals, visual review, technical release and real-world/commercial validation. Passing CI or shared QA does not pass this gate.

Run the actual production build and browser tests; source inspection is not browser evidence. Test the exact checked-out branch/commit or record a scoped local-copy/in-memory limitation. Record the tested commit SHA with the evidence. Independently verify the approved WRP, relevant G0–G4 decisions, source/fact/asset/CTA records and exact rendered page coverage. Use `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` for Starter. This gate is for the website candidate, not proof that the overall Web Studio system is commercially validated.

### Functional and responsive
- Apply the implementation and accessibility checklist in `skills/interface-quality-review/SKILL.md` alongside the project's existing browser-test stack.
- Build, routes, navigation, mobile menu, forms/controls and all CTAs.
- Test state transitions and boundary cases, not only initial rendering: category/filter changes, add/increment/decrement/remove-last/clear, empty/error/unavailable states, limits and derived totals where relevant. Scope automated locators to the correct component when controls share accessible names.
- Set viewport, scroll position, selected category, cart/FAQ state and other interactive conditions deterministically before screenshot capture. Separate behavior tests from screenshot-only workarounds for fixed/sticky-element crop artifacts.
- No broken links, false success states, fake booking or fake storage.
- No horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px where supported.
- Body copy and metadata type floors are checked at mobile, tablet and desktop widths; use 15px body / 11px non-critical metadata as the default reference. Important safety/allergen, pricing, policy, legal and transaction details should normally remain at least 13px.
- Contrast regression checks every instance for each text role at all nine standard widths, with actual foreground/background mapping, alpha compositing and relevant interaction states. Keep this targeted test distinct from a full WCAG/assistive-technology audit.
- Image crop, aspect ratio and focal point are checked at each relevant breakpoint; responsive CSS must not unintentionally cut important subject matter.
- Check that static cards, rows and status panels do not imply non-existent click behavior; every apparent control must work or be presented as non-interactive.
- All images load; verify natural dimensions and truthful captions.
- Desktop, tablet and mobile screenshots saved as evidence and reviewed at actual scale, not only as a downscaled full-page image.
- Complete the section-by-section design audit and record changes before requesting owner review.

### Business completeness (new required gate)
For every relevant customer question, use the canonical Source-to-Page page-coverage status:
- **PUBLISHED** — answer is visible, supported by an approved source and approved for public release.
- **PREVIEW_ONLY** — answer is visible in a clearly disclosed internal preview but is synthetic, draft, unverified or not approved for production.
- **GAP** — a material answer is missing, unresolved or the customer action cannot be completed honestly; record owner/action.
- **NOT_APPLICABLE** — the question does not apply; record the reason.

Do not collapse page coverage into answer/evidence/publication status. A PREVIEW_ONLY answer can make a private preview useful but never counts as PUBLISHED or production-complete.

The answer must be checked against the rendered implementation, not only the normalized brief. A source-backed question is not ANSWERED merely because the information exists in an interview transcript, fact register or draft copy.

Check at minimum:
- What is sold and who it is for.
- Options/categories and how to choose.
- Price or pricing method.
- Inclusions/exclusions and limitations.
- Why trust this business (real evidence or transparent process).
- Location, coverage, delivery or availability.
- Process and what happens next.
- Policies/preparation/aftercare where relevant.
- Real contact/conversion destination.
- FAQs for major objections.

A GAP may be accepted for a preview only when clearly disclosed; it cannot silently pass as complete production content.

### Integrity and technical
- Every material public fact has a source, evidence status and publication approval; every asset has provenance, permission status and intended use.
- Every CTA is listed with its exact destination, approval status and expected post-click behavior.
- Every customer question has a Source-to-Page status (PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE), plus separate answer/evidence/publication states, exact source and rendered locators, and owner/action for unresolved gaps.
- The canonical `page_coverage[]` and Source Coverage records account for material policy and operational facts; no important source topic silently disappears during implementation. PUBLISHED requires the underlying facts/assets to meet their evidence, permission and publication requirements.
- No invented claims, contacts, testimonials, metrics or customer evidence.
- No cross-project contamination.
- Keyboard/focus/semantics, contrast, labels, alt text and reduced motion.
- SEO/social metadata, console/network errors, image weight and basic performance.
- Every check PASS / FAIL / NOT TESTED. Never claim untested accessibility, performance, cross-browser, conversion or production readiness.

## Stage 8 — Release and handover

Follow G5–G7 in `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md`; preview acceptance is not production approval.

1. **Preview:** prepare a controlled preview, revision register, exact version/commit, customer-question/page-coverage summary, known limitations and consolidated client review request. Record `PREVIEW_READY` only when preview blockers are cleared; record `PREVIEW_ACCEPTED` only for the exact preview version after the required client review. Production blockers must remain visible.
2. **Production readiness (G5):** verify all applicable Starter/project acceptance criteria; resolve production blockers; confirm source/evidence/publication statuses, asset rights and consent, exact CTA destination/behavior, business-question coverage, responsive/functional/accessibility/performance checks, visual evidence, metadata, hosting/domain ownership, rollback and handover. Record NOT TESTED for anything not actually tested. Obtain required client confirmations and Studio owner production decision. A passing CI run alone is insufficient.
3. **Release authorization (G6):** obtain explicit Studio owner authorization for the exact release candidate, production URL/domain/DNS action, approved spend and release steps; obtain required client/business approval of final public facts, content, assets, destinations and account arrangements. Record the exact G6 approval as `RELEASE_AUTHORIZED` for that candidate. No silence, preview acceptance or AI recommendation counts as authorization.
4. **Release:** execute only the authorized steps. Verify the live production URL, primary CTA and critical behavior. Record release commit/version, date, verification evidence and any incident/rollback decision. Mark `RELEASED` only after production verification.
5. **Handover (G7):** transfer repository/hosting/domain/account ownership and access securely; record renewal payer/date, third-party costs, asset/source register, known limitations, backup/rollback notes, support boundaries and maintenance responsibility. Obtain client receipt/ownership confirmation; mark `HANDED_OVER` only when evidence is retained.

The Laravel platform does not currently enforce all these gates as a persisted approval engine. Until that changes and is tested, maintain the approval register in the controlled project workspace and manually verify the gate. Do not claim the platform blocks or authorizes release.

## Stage 9 — Evidence-led calibration and system learning (required)

Experiment 05 conditional offer-variant pattern remains NOT YET PROVEN until its full Studio/Starter workflow and calibration are complete; do not promote it as a canonical rule.

After every completed Starter build, substantial revision, or controlled experiment, run the calibration protocol in docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md and record the result with docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md.

1. Compare the delivered result against its approved brief, source/asset registers, design direction, acceptance criteria and exact-commit test evidence. Record the observed symptom and reproducible evidence; do not start by rewriting the prompt.
2. Assign each finding to its primary cause: **INPUT / SOURCE** (missing, conflicting, inaccurate or poorly represented source material); **MASTER SKILL / REASONING** (the model had adequate evidence but chose the wrong task, structure, priority or interpretation); or **IMPLEMENTATION / QA** (the approved decision was correct but code, blueprint, tests, tooling or workflow failed). Record external dependencies/owner approvals as blockers, not as defects in one of those layers.
3. Verify the root cause against the actual source and rendered result. One symptom may have multiple causes; split it into separate findings rather than changing several layers at once.
4. Change only the responsible layer. Do not add client interview questions for a studio-side design/engineering defect, add platform features to compensate for a prompt issue, or rewrite the Master Skill to repair a local coding error.
5. Re-run the original failing case and its relevant regression suite. For a proposed cross-category rule, test it against at least one materially different business category before treating it as reusable. A rule that improves one category but harms another must be narrowed or rejected.
6. Record both benefit and cost: issue resolved, evidence, regressions, client-input burden, studio effort, new dependencies and remaining untested areas. Prefer the smallest effective correction.
7. Keep candidate changes separate from approved standards. Promote a rule only when evidence supports repeatability; preserve prior versions and the experiment's source evidence. Never silently overwrite client facts, raw assets or historical findings.

**Convergence rule:** do not continue prompt or implementation tweaking without a new, observable defect or measurable acceptance gap. If no new failure is reproduced, retain the verified baseline and stop changing that area.

Output: a calibration record with root-cause classification, minimal correction, regression results, cross-category evidence where relevant, and a decision of RETAIN / REVISE / REJECT / NOT YET PROVEN. This is a Studio learning artifact, not another client deliverable.

## Required completion record

For design refinement, include the independent section-by-section audit, typography scale and its responsive checks, interaction/affordance review, asset crop review, design fingerprint, cross-project comparison, anti-template scan, explicit aesthetic verdict and desktop/tablet/mobile visual evidence.

For each stage, record: status; input snapshot and source IDs; canonical records changed; decisions/assumptions; artifact IDs/versions; tests/screenshots/commit evidence; approval IDs and current gate; unresolved blockers; and next owner/action. Keep the record in the project workspace so the process can resume without relying on conversation memory.

## Definition of done

Foundation CI, populated-site rendered QA and the Starter Product Acceptance Gate are separate outcomes.

The website is visually distinctive **and** business-complete for its approved tier: the visitor can understand the offer, make an informed choice, trust real traceable evidence or transparent process information, know what happens next and reach an honest working action. The aesthetic verdict is DISTINCTIVE, the design fingerprint has been compared with prior work, and no unresolved high-impact generic-layout finding remains. The approved WRP, canonical records, page coverage, applicable approval IDs, exact-commit technical QA, client/owner decisions, commercial fit and production release are recorded separately.

For a Starter project, pass `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` before describing the website as production-ready or ready to sell. The Studio's Starter product itself is not commercially validated until at least one real delivery, owner review, measured delivery effort/cost and viable margin are evidenced. Do not begin Business implementation until Starter receives PASS; do not begin Custom implementation until its distinct requirement and architecture are approved.
