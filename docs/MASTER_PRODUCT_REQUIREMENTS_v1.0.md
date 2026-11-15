# Master Product Requirements — AI Operated Web Studio

**Document ID:** AWOS-PRD-001  
**Version:** 1.0  
**Status:** Draft — Master Revision candidate (pending owner review)  
**Last updated:** 2026-11-15  
**Product owner:** Studio owner  
**Canonical repository:** `kannaryukkei/ai-operated-web-studio`

## 1. Product definition

AI Operated Web Studio is an internal operating system for a small web studio. It turns one normal client interview, the client's existing assets and approved references into a source-traceable business brief, then coordinates the work required to plan, design, build, test, approve and hand over a website.

The studio uses its Laravel platform as a durable project/workflow record and uses versioned documents, prompts and specialist skills through existing AI applications and coding tools. The AI performs repeatable analysis and production work; the studio operator reviews exceptions and controls commercial, factual, permission and release decisions.

The platform does not need to execute every AI task itself. In the current operating model, external AI applications and manual copy/paste handoffs are acceptable. A paid model API, provider SDK or autonomous agent runtime is not a prerequisite.

## 2. Problem and intended outcome

Website production is fragmented across interviews, chat conversations, documents, assets, prompts, design work, code, tests, approvals and handover. Repeating discovery and manually coordinating each stage creates avoidable client burden, inconsistent results and weak traceability.

The system must make this production process repeatable without turning the platform into a large generic SaaS or forcing clients to become website project managers.

**Primary outcome:** one interview and one material packet should be sufficient to initiate a controlled, source-traceable production workflow. AI should carry the repeatable work while the client is asked only for material clarifications and approvals.

A website is not acceptable merely because it looks polished. It must answer the relevant customer questions, explain the offer accurately, establish trust with real evidence or transparent alternatives, and provide an honest working next step.

## 3. Product goals

- **G1 — Minimal client burden:** use interview material and existing assets as the default source; do not require a long duplicate website questionnaire.
- **G2 — Traceable business understanding:** retain provenance for material facts, claims, assets, customer questions and public destinations.
- **G3 — Business-complete output:** organize information around customer decisions and buying journeys, not a fixed page layout or arbitrary section count.
- **G4 — Reliable Starter production:** make Starter the first and only active product implementation priority until it passes its acceptance gate.
- **G5 — AI-led, human-controlled execution:** use existing AI applications without mandatory paid APIs; preserve human authority for important decisions.
- **G6 — Repeatable quality:** validate output with automated tests, visual evidence, manual review and evidence-led calibration.
- **G7 — Simple system architecture:** keep the platform a lightweight system of record and workflow coordinator; build only capabilities justified by requirements and observed bottlenecks.

## 4. Users and actors

### Studio owner
Owns commercial decisions, product scope, pricing, client commitments, public claims policy, publication permissions and production release. Can approve or reject work and resolve escalations.

### Studio operator
Conducts or records the interview, preserves client materials, runs the AI workflow, reviews outputs, coordinates implementation and QA, records decisions and prepares handover. Owner-only decisions remain restricted.

### Client / business owner
Explains the business, supplies available materials, answers material clarifications, verifies business facts, confirms public destinations and asset permissions, reviews agreed deliverables, and approves release.

### External AI applications and coding agents
Perform scoped research, normalization, business analysis, content planning, creative direction, implementation assistance, review and QA. They are not authoritative sources of client facts, cannot grant permissions, and cannot authorize commercial or release actions.

## 5. Product boundaries and architecture

The canonical repository has four boundaries:

- `platform/`: Laravel application, authenticated client/studio workspace, durable project and discovery records, permissions and workflow coordination.
- `docs/`: product requirements, operating policies, Master Skill, client brief, schemas, standards, acceptance gates and playbooks.
- `skills/`: portable specialist instructions activated by the Master Skill.
- `blueprints/`: versioned website reference implementations, reusable code and delivery material.

Each real client website is developed in a separate client repository. Client facts, raw materials, private assets, credentials and approvals must not leak into shared blueprints.

The platform remains a modular monolith and system of record. External AI applications may be used manually. Static-first website implementation is the default unless a documented business requirement justifies backend behavior.

## 6. Scope and release sequence

### In scope for the current revision

1. Harmonize product requirements, workflow, intake policy, schema, approval boundaries, Master Skill, prompts, skills and delivery playbook.
2. Make interview + assets the primary client input, with structured platform intake used as an internal record/bridge where appropriate.
3. Define a Website Requirements Pack before creative direction and implementation.
4. Align the existing platform only where the canonical requirements demonstrate a real mismatch.
5. Improve Starter reproducibility, QA evidence and production-readiness decisions.
6. Keep the normal production workflow usable through existing AI applications without paid API dependencies.

### Starter-first product sequence

- **Starter:** active implementation and validation priority. A complete, focused, static-first one-page website for one primary audience and one main conversion journey.
- **Business:** documented product definition only. Do not begin its implementation until Starter passes the production acceptance gate.
- **Custom:** scoped bespoke delivery model only. Do not expand implementation without a real client requirement and an explicit solution architecture.

### Out of scope unless a validated requirement changes the decision

- Mandatory paid AI APIs, provider SDKs, model hosting or MCP dependencies.
- Fully autonomous AI agents or an app-owned AI orchestration engine.
- Automatic recording/transcription and arbitrary multi-file parsing inside the platform.
- A complex private asset-ingestion system before manual delivery proves the bottleneck.
- Multi-agency SaaS tenancy, subscription billing, template marketplace or public website builder.
- Default CMS, database, booking, payment, inventory, account or integration features in Starter.
- Automatic GitHub repository creation, DNS changes or unapproved production deployment.
- Microservices, Kubernetes, generic workflow engines or infrastructure that has no demonstrated need.
- Business and Custom implementation before their sequencing gates are met.

## 7. Functional requirements

Priority definitions: **MUST** = required for the defined operating outcome; **SHOULD** = important, but may be satisfied manually during the current release; **LATER** = intentionally deferred.

| ID | Priority | Requirement | Acceptance evidence |
|---|---|---|---|
| FR-01 | MUST | Maintain one durable project record with client, project scope, status, artifacts, decisions and next action. | Studio can retrieve the current project context after refresh or a new AI session. |
| FR-02 | MUST | Use interview recording/transcript/notes, client-supplied assets and approved source links as primary inputs. | A normal project can start without asking the client to complete a long structured website form. |
| FR-03 | MUST | Preserve and index raw source materials without silently changing originals. | Each received source has a stable ID, type, filename/URL, received date and controlled storage reference. |
| FR-04 | MUST | Trace every material fact and public claim to a source and locator, or explicitly mark it missing, assumed, conflicting or demo-only. | Fact register records source ID, locator, supporting evidence and uncertainty; source coverage accounts for all material source sections. |
| FR-05 | MUST | Keep answer, evidence, publication and rendered page-coverage statuses distinct. | Schema and validation do not collapse these into a single approval/evidence enum. |
| FR-06 | MUST | Normalize business context into a Client Brief and Business Intelligence Summary. | Audience, needs, buying behavior, objections, offer structure, operational constraints and evidence gaps are represented. |
| FR-07 | MUST | Map real customer questions and the buying journey before deciding information architecture. | Customer Question Map covers relevant before/during/after-purchase questions and maps them to answers, gaps, owners and next actions. |
| FR-08 | MUST | Recommend Starter, Business or Custom from audience count, offer depth, buying journeys and real functional needs. | Tier recommendation includes rationale, assumptions, scope and exclusions; unsupported technical upsell is rejected. |
| FR-09 | MUST | Produce an approved Website Requirements Pack before creative direction and implementation. | Pack follows `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md`, references canonical record IDs, and contains goals, audience, scope, page/section requirements, content, CTA destinations, functionality, asset rights and acceptance criteria. |
| FR-10 | MUST | Require a clear, honest conversion path for each website. | CTA register records exact destination, approval state and expected behavior; no fake submissions or success messages. |
| FR-11 | MUST | Require evidence and permission for public claims, testimonials, reviews, ratings, awards, metrics and identifiable customer assets. | Unverified or unapproved proof is omitted or blocked; demo labels do not legitimize fabricated social proof. |
| FR-12 | MUST | Use category-fit information architecture and a materially distinctive creative direction. | Design decision records visitor task, design fingerprint and relevant comparison with recent Studio work; no automatic reuse of a fixed layout. |
| FR-13 | MUST | Build the simplest website implementation that meets the approved requirements, static-first by default. | Added backend, accounts, integrations or transactions have a documented business need and scope approval. |
| FR-14 | MUST | Keep each client's website code and data isolated from the shared platform and other clients. | Client website lives in its own repository; authorization and project-isolation tests pass. |
| FR-15 | MUST | Preserve successful work through bounded refinement and independent QA. | Changes are tied to findings; production build, functional, responsive, accessibility and content checks are evidenced. |
| FR-16 | MUST | Separate preview readiness, studio review, client approval and production release. | Each state is explicit; pending facts, rights, destinations or approvals cannot silently pass as production-ready. |
| FR-17 | MUST | Prepare release and handover records, including ownership, costs, known limitations and support responsibilities. | Handover checklist and release evidence are retained with the project. |
| FR-18 | MUST | Calibrate the system from reproducible evidence and fix the responsible layer only. | Findings are classified as INPUT/SOURCE, MASTER SKILL/REASONING, IMPLEMENTATION/QA or external blocker; original failing case is retested. |
| FR-19 | SHOULD | Coordinate the workflow in the Laravel platform while allowing manual external-AI handoffs. | Platform stores project/intake/discovery snapshots and validated output; external AI execution works without provider credentials. |
| FR-20 | LATER | Automate repository setup, deployment, file ingestion, transcription or model execution where a repeated bottleneck is proven. | Each automation has a separate cost, security and operational justification before implementation. |

## 8. Data integrity and publication rules

Every material fact must retain:

- Stable fact ID and exact claim.
- Source ID and source locator (timestamp, page/paragraph, asset ID, URL section or equivalent).
- Supporting quote/excerpt or evidence reference.
- Answer status: `PROVIDED`, `NOT_AVAILABLE`, `NOT_APPLICABLE`, `NOT_SURE`, `CONFLICT`.
- Evidence status: `VERIFIED`, `CLIENT-PROVIDED-UNVERIFIED`, `DEMO-ONLY`, `ASSUMPTION`, `MISSING`, `CONFLICT`.
- Publication status: `APPROVED`, `PENDING`, `NOT_APPROVED`.
- Owner/next action for unresolved material gaps.

Asset records must include source/owner, permission, intended use, credit/licence restrictions, identifiable people/consent status and approval. Unknown rights remain pending.

Rendered page coverage is a separate decision: `PUBLISHED`, `PREVIEW_ONLY`, `GAP`, or `NOT_APPLICABLE`. A fact existing in a source or draft does not mean the website has answered the visitor's question.

Never invent prices, inclusions, locations, contacts, operating hours, policies, credentials, testimonials, ratings, guarantees, outcomes, customer consent or operational claims.

## 9. Non-functional requirements

- **NFR-01 — API-free operability:** core workflow remains usable through existing AI applications and manual handoffs; no paid model API is mandatory.
- **NFR-02 — Simplicity:** choose the smallest workflow and technical stack that satisfies an approved requirement; do not add features for speculative future automation.
- **NFR-03 — Security and privacy:** enforce project-level authorization; keep client materials, credentials and private notes out of shared blueprints and public client views.
- **NFR-04 — Traceability:** retain source provenance, output versions, decisions, test evidence and release records.
- **NFR-05 — Recoverability:** persist checkpoints and snapshots so work can resume after a conversation, tool or operator session ends.
- **NFR-06 — Portability:** prompts and specialist skills should work in supported external AI applications without app-specific paid infrastructure.
- **NFR-07 — Reproducibility:** pin dependencies where applicable; CI must test the relevant project at a known commit.
- **NFR-08 — Quality:** validate responsive behavior, semantics, keyboard/focus, text readability, measured contrast, image behavior, links and actual interactions. Mark untested areas honestly.
- **NFR-09 — Maintainability:** keep platform, standards, skills, blueprints and client sites within explicit boundaries.
- **NFR-10 — Human authority:** no unapproved external messages, spend, public claims, DNS changes, publishing or ownership transfers.

## 9A. Canonical client-input policy

`docs/CLIENT_INPUT_AND_MATERIAL_POLICY_v1.0.md` is the normative input policy: one normal interview plus supplied assets and optional approved references. The client is not asked to complete the 26-field platform page or the AI-produced Client Website Brief. The existing platform intake remains an interim operator-populated summary bridge until its UI and server-side authorization are aligned. This document does not claim the current UI already enforces that policy.

## 10. Current implementation baseline

This section distinguishes implemented code from manual operating procedures and future requirements. A documented process is not evidence that a platform feature exists.

| Capability | Current state | Evidence / boundary |
|---|---|---|
| Authentication, client/project records and access policies | Implemented foundation | Laravel platform models, routes, policies and feature tests. |
| Structured project intake | Implemented legacy bridge; access/UI policy misaligned | Versioned 26-field project intake exists. Controller requires five fields on submission; UI copy says four. Project policy currently allows authorized client-account owners and project editors to update it, although the canonical material-first policy treats it as a studio-populated internal snapshot. Do not ask clients to complete it as a second form. Server-side access/UI alignment is deferred to Segments 11–12. |
| Interview + raw asset packet ingestion | Manual / external | Operator preserves sources in controlled project storage; platform does not provide the complete private multi-file ingestion workflow. |
| Source-linked fact extraction and Source Coverage Matrix | Documented manual workflow | Protocol and skills define the method; the platform does not yet persist the complete canonical source/fact/coverage model. |
| API-free discovery handoff | Implemented platform slice | Platform snapshots submitted intake, generates a prompt, accepts external AI JSON, validates and stores the structured result. |
| Canonical schema alignment | Partial | Discovery validator requires useful structured sections, but its enums/provenance contract do not yet fully match the material-ingestion protocol. |
| Website Requirements Pack | Specification defined; production workflow remains manual | `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` now defines the pre-design contract. It is maintained as a versioned project artifact; no dedicated platform artifact workflow exists yet. |
| Client/studio approval workflow | Manual / partial | Human approval policy is documented; a complete persisted approval workflow is not implemented in the current platform. |
| Starter website reference and automated checks | Implemented reference, not production certification | ZACKS-specific blueprint and Starter CI exist; current responsive suite has 19 tests. |
| Full cross-browser, assistive-tech and performance verification | Not yet proven | Current Chromium tests do not equal complete accessibility/performance/cross-browser certification. |
| Real client delivery and commercial margin | Not yet proven | Starter acceptance requires a real delivery, owner sign-off, measured delivery effort and viable margin. |
| Automated deployment / AI provider integration | Deferred | Not required for the current API-free operating model. |

## 11. Acceptance criteria for the Web Studio system

The system can be considered operationally validated for Starter only when all of the following are evidenced:

1. A real business interview and its supplied assets can be ingested without a long second client form.
2. Every relevant source section and asset is accounted for; material facts have traceable source locators and separate answer/evidence/publication states.
3. Conflicts, material gaps, asset rights and public CTA destinations are identified and routed to the correct owner.
4. AI produces a business-first brief, Business Intelligence Summary, Customer Question Map, Buying Journey, offer/trust/content registers and a Website Requirements Pack.
5. The client is asked only for clarifications or approvals that materially affect the next milestone.
6. The selected website tier and scope match actual customer journeys and functionality; Starter is one focused page only when one primary audience and conversion journey fit.
7. The rendered Starter answers all applicable critical customer questions, uses a real approved CTA, and does not invent proof or business facts.
8. The implementation is distinctive, responsive, accessible to the extent tested, and functionally honest; test and screenshot evidence are retained against the tested commit.
9. Studio and client approvals, release decisions, limitations and handover are recorded.
10. At least one real delivery has measured human hours, direct costs, revision effort and gross margin sufficient to validate the commercial offer.
11. The end-to-end workflow can be completed without a paid AI API.

A passing automated suite alone cannot satisfy these criteria.

## 12. Success measures

Track these measures for each real Starter delivery:

- Client input burden: whether a long duplicate form was required; number of clarification questions and why each was necessary.
- Source coverage: percentage of material source topics and supplied assets accounted for (target: 100% accounted for, including explicit exclusions/unresolved items).
- Fact integrity: count of unsupported or unapproved public claims (target: zero).
- Requirement coverage: count of critical visitor questions marked GAP at production release (target: zero; NOT_APPLICABLE requires a reason).
- Functional integrity: failed primary CTA/interaction checks at release (target: zero).
- Quality: build/test outcome, responsive defects, accessibility findings, screenshot review findings and open high-severity issues.
- Delivery efficiency: operator hours by stage, elapsed delivery time, number of revision rounds and rework hours.
- Commercial viability: actual domain/hosting/third-party spend, delivery cost, gross margin and support burden.
- Client outcome: owner acceptance, successful handover and qualitative feedback; measure real visitor conversion only when reliable analytics and consent exist.

Do not invent numeric performance targets for delivery hours or margin before collecting a real baseline. Set thresholds from the first validated deliveries and the approved pricing model.

## 13. Dependencies, assumptions and risks

- Client can participate in an interview and supply whatever assets/source material they have; missing inputs must remain explicit.
- The operator has access to an existing AI application and can conduct manual handoffs.
- External AI capabilities (such as audio transcription) vary; transcription must not be treated as guaranteed.
- Asset ownership, publication permissions and people consent must be verified rather than inferred.
- The platform's current intake and discovery schema need alignment with the canonical material-first workflow.
- Client website repositories and hosting accounts remain separately permissioned and owned.
- The proposed Starter launch price is a hypothesis until actual delivery hours, costs and margin are measured.
- A visual/technical demo is not proof of commercial readiness.

## 14. Requirement traceability

| Requirement group | Canonical method / specification | Platform / blueprint implementation | Verification |
|---|---|---|---|
| FR-01, FR-14, NFR-03 | Product brief; security and approvals policy | Projects, client accounts, policies, authorization | Project authorization and invitation feature tests |
| FR-02–FR-05, NFR-04 | Material Ingestion Protocol; Client Brief v2.1; client-material-ingestion skill | Current manual source packet; Project Intake + DiscoveryRun are only a partial record | Source Coverage Matrix and schema validation; to be formalized in Segments 04–05 |
| FR-06–FR-09 | Master Skill Stages 0–4; Client Brief; Canonical Discovery Data Schema; Website Requirements Pack v1.0 | Manual Discovery output and versioned project WRP artifact | Business Intelligence, Customer Question Map, schema validation and WRP pre-design acceptance |
| FR-10–FR-11 | CTA register; Starter Content Evidence Gate | Starter ZACKS fixture and evidence guard | CTA/claim evidence inspection and browser tests |
| FR-12–FR-13 | Master Skill design/implementation stages; Website Implementation Standard | Specialist skills; isolated Starter template/client repository workflow | Design fingerprint, content/design review, build and responsive tests |
| FR-15 | Master Skill Stage 7; Starter Product Acceptance Gate | Starter Playwright suite / CI | Independent QA report and exact-commit test evidence |
| FR-16–FR-17, NFR-10 | Manual AI Workflow; Master Skill Stage 8; security/approval policy | Manual studio/client decisions; no complete approval engine yet | Approval record, release checklist and handover pack |
| FR-18 | Master Skill Stage 9; Calibration Protocol | Calibration records and regression tests | Root-cause record and retest of original failing case |
| FR-19–FR-20, NFR-01/02/05/06/07/08/09 | Product brief; architecture; roadmap; AI Build Rules | Laravel platform, external AI tools, versioned docs/skills/blueprints | Platform tests, CI, documented manual workflow and future change justification |

## 15. Change control and ownership

- Upon owner adoption, this PRD becomes the canonical requirement source for the Web Studio product. The Master Skill defines how AI executes the production lifecycle; architecture defines technical boundaries; the roadmap defines sequence.
- A change to scope, product promises, API dependence, approval authority or release policy must update this PRD and its traceability before implementation.
- Each requirement change must record rationale, affected components, acceptance changes and migration impact.
- Do not create a separate client PRD. Generate a Website Requirements Pack from each client's interview and materials.
- Keep the PRD concise as the system evolves: update existing requirements rather than creating competing copies.
