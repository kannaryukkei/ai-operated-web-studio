# Website Requirements Pack v1.0

**Document ID:** AWOS-WRP-001  
**Version:** 1.0  
**Status:** Draft — current working version; not separately owner-adopted  
**Last updated:** 2026-11-18  
**Authority:** Master PRD v1.0, Canonical Operating Workflow v1.0, Canonical Discovery Data Schema v1.0

## 1. Purpose

The Website Requirements Pack (WRP) is the pre-design and pre-implementation contract for one client website. It converts approved business discovery, customer questions, tier/scope decisions, content requirements and technical constraints into a buildable and testable specification.

The WRP is produced by AI and the Studio from the interview/material packet and validated discovery records. The client does not write it, fill it out or prepare a separate PRD. The client is asked only to confirm business facts, material scope decisions, public claims, contact destinations, asset rights and agreed approvals.

The WRP prevents the team from jumping from a business summary directly into visual design or code without agreeing what the website must help customers understand and do.

## 2. Position in the workflow

The pack is assembled from Stage 1–4 outputs:

1. Business Intelligence Summary and Offer Matrix.
2. Owner-approved tier, scope, exclusions and commercial decision.
3. Customer Question Map, Buying Journey and Information Architecture.
4. Content direction, CTA Register, asset/permission decisions and technical requirements.

The pack must be approved for design before Stage 5 — Creative Direction and Implementation begins.

It is not:
- a client-facing intake questionnaire;
- a replacement for the raw source packet, Fact Register or Asset/Permission Register;
- a proposal, contract or commercial quote;
- a visual design mockup;
- a license to invent missing facts or add features.

It references canonical records by ID rather than copying their evidence into a second source of truth.

## 3. Pack metadata and lifecycle

### 3.1 Metadata

| Field | Required | Meaning |
|---|---:|---|
| pack_id | Yes | Stable WRP identifier |
| project_id | Yes | Studio project identifier |
| version | Yes | Pack version; increment on material change |
| created_at | Yes | ISO 8601 creation timestamp |
| updated_at | Yes | ISO 8601 last update |
| schema_version | Yes | Canonical Discovery Data Schema version |
| source_snapshot_id | Yes | Discovery snapshot from which the pack was derived |
| status | Yes | DRAFT / INTERNAL_REVIEW / CLIENT_CONFIRMATION_REQUIRED / APPROVED_FOR_DESIGN / SUPERSEDED |
| owner_approval_reference | Yes | Studio owner scope/tier decision reference or PENDING |
| client_confirmation_reference | Yes | Confirmation/approval record for material facts, contact and asset decisions, or PENDING |
| supersedes_pack_id | No | Previous pack version if revised |

Approval does not mean every fact is independently verified. Approval state does not replace fact-level evidence/publication status or asset permission status.

### 3.2 Status meanings

- **DRAFT:** generated from discovery; not yet internally reviewed.
- **INTERNAL_REVIEW:** Studio is checking completeness, feasibility, scope and traceability.
- **CLIENT_CONFIRMATION_REQUIRED:** specific material facts, content, public destinations or permissions need confirmation.
- **APPROVED_FOR_DESIGN:** Studio owner has approved tier/scope and the pack is sufficiently complete for creative direction. Required client confirmations for business facts/rights/destinations are recorded or remaining non-blocking items have explicit safe fallbacks.
- **SUPERSEDED:** a newer pack version replaces this one; retain the old version for audit.

The client does not approve technical implementation mechanics. The Studio owner approves commercial scope and authorizes progression to design.

## 4. Required pack structure

### 4.1 Project and business context

- Business/brand name, category and operating model.
- Business model and core offers.
- Primary audience(s), customer needs, buying triggers and material objections.
- Current operating constraints relevant to the website.
- Supporting references to Business Intelligence and Offer records.

All client-specific assertions reference fact IDs and source records. Do not copy unsupported narrative from discovery notes.

### 4.2 Website goal and conversion

- Primary business goal.
- Primary audience and visitor intent.
- Primary conversion action.
- Secondary actions, only where useful.
- Exact CTA Register IDs, destinations, approval status and expected post-click behavior.
- What the website must not imply (for example, a working booking, checkout or form when none exists).

Acceptance criteria must describe observable visitor behavior, not vague aspirations such as "professional" or "modern".

### 4.3 Tier, scope and exclusions

- Recommended and owner-approved tier: Starter / Business / Custom.
- Rationale based on audience, offer depth, visitor journeys and functionality.
- Included pages/sections and relevant capabilities.
- Explicit exclusions and unsupported functions.
- Content and asset responsibilities (client vs Studio).
- Revision rounds, dependencies and change-request boundary.
- Third-party costs, domain/hosting ownership, maintenance and support assumptions where applicable.
- Owner approval reference.

Do not treat client suggestions such as "I want a booking system" or "I need five pages" as approved requirements until the business need, feasibility, tier and commercial scope are reviewed.

### 4.4 Audience journeys and customer-question coverage

For each relevant audience/journey, identify:

- Audience and intent.
- Journey stage: before, during or after purchase.
- Customer question/objection IDs.
- Supported answer fact IDs or explicit GAP / NOT_APPLICABLE status.
- Required website support: information, comparison, preparation, expectation-setting or action.
- Intended page/section.
- Importance: MUST / SHOULD / COULD.
- Owner and next action for unresolved questions.

Every critical question must map to a source-backed answer or a visible blocker/safe omission. Do not turn the number of sections into a completeness metric.

### 4.5 Information architecture and page/section requirements

For each page or section:

| Field | Requirement |
|---|---|
| Page/section ID and key | Stable reference |
| Name and purpose | Why it exists for this audience |
| Primary audience | Who it serves |
| Visitor question IDs | Questions answered or action supported |
| Content requirements | Exact topics, facts, proof and copy needs |
| Fact IDs | Supported claims that may be used |
| Asset IDs | Approved or pending assets, with fallback |
| CTA IDs | Intended interaction and destination |
| Functional requirement IDs | Real behavior required |
| Acceptance criteria | Observable condition for completion |
| Priority | MUST / SHOULD / COULD |

A one-page Starter may contain multiple sections, but section count does not determine tier or quality. Sections are included only when they serve a real visitor question or business action.

### 4.6 Content requirements

- Positioning and value proposition.
- Offer names, descriptions, inclusions, exclusions and pricing method where relevant.
- Selection/comparison guidance where customers must choose.
- Process, availability, coverage, delivery or preparation information where relevant.
- Policies, aftercare and limitations where relevant.
- FAQs mapped to genuine customer questions.
- Trust evidence or transparent alternatives.
- Exact CTA labels and expected behavior.
- SEO/social metadata requirements where relevant.

Each material claim references Fact IDs and carries its canonical evidence/publication status. Do not include fabricated testimonials, reviews, ratings, awards, credentials, metrics, guarantees or case-study outcomes. Missing proof must be omitted or replaced by a truthful operational/process explanation.

### 4.7 Functional and interaction requirements

Specify only behavior that is in the approved scope. For each interaction record:

- Requirement ID.
- User goal and trigger.
- Expected result.
- Empty, unavailable, validation, error and success states.
- Data sent/stored and destination, if any.
- Accessibility/keyboard behavior where relevant.
- Acceptance test or manual verification.
- External dependency and owner.

No false affordances: a control must work as described or be presented as non-interactive. A form must disclose whether it sends or stores data. Do not claim booking, checkout, account, payment, filtering, search or persistent data behavior unless it exists and is tested.

### 4.8 Assets and creative constraints

- Asset IDs and intended page/section roles.
- Permission, licence, credit, expiry and people-consent status.
- Asset gaps and safe alternatives.
- Existing brand material and verified usage restrictions.
- Category and audience context that informs creative direction.
- Design references and what is useful to learn from them.
- Constraints to avoid copying competitor identity or unrelated features.

A pending asset can be used in a private preview only when its use is lawful/authorized for that preview and clearly marked. No asset with denied/unknown required rights may be published.

### 4.9 Non-functional and technical requirements

Only include what is appropriate for the scope:

- Static-first/backend decision and its business rationale.
- Responsive viewport coverage.
- Accessibility/keyboard/semantic requirements.
- Performance and image-weight expectations.
- SEO/social metadata and indexability.
- Browser/device support.
- Privacy and security constraints.
- Hosting, domain, repository and ownership model.
- Analytics/cookie requirements only when approved and actually configured.
- Maintenance/update owner and post-launch support boundary.

Do not prescribe a paid provider, API, CMS, framework or dependency unless the requirement demonstrates a real need and the owner approves cost and maintenance.

### 4.10 Acceptance and release criteria

The pack must define measurable criteria for:

- Business/question coverage.
- Content and evidence integrity.
- Primary conversion path and CTA behavior.
- Asset permissions and credits.
- Visual/design direction and distinctiveness.
- Responsive and functional behavior.
- Accessibility and performance checks.
- Technical build and QA evidence.
- Client/owner approvals.
- Handover and ownership.

Distinguish preview acceptance from production acceptance. Any item not tested must be marked NOT TESTED; a passing build does not imply commercial readiness.

### 4.11 Open decisions and risks

For each open item include:

- Item ID and description.
- Related fact/question/asset/requirement IDs.
- Priority: PREVIEW_BLOCKER / PRODUCTION_BLOCKER / OPTIONAL_GAP.
- Owner and next action.
- Safe fallback or omission.
- Decision deadline/milestone if relevant.
- Current status.

The pack cannot be APPROVED_FOR_DESIGN if a preview blocker or unresolved scope/feasibility decision remains. A production blocker may remain for a disclosed internal preview only if its safe fallback and owner are explicit.

## 5. Requirement record format

Every requirement uses a stable ID and the following minimum fields:

| Field | Required | Meaning |
|---|---:|---|
| requirement_id | Yes | Stable ID, e.g. REQ-CONTENT-001 |
| category | Yes | BUSINESS / CONTENT / IA / FUNCTIONAL / VISUAL / TECHNICAL / ACCESSIBILITY / SEO / OPERATIONS |
| statement | Yes | One testable requirement |
| rationale | Yes | Customer/business reason |
| priority | Yes | MUST / SHOULD / COULD |
| source_refs | Yes | Canonical source references or explicit documented decision reference |
| fact_ids | Yes | Supporting fact IDs; empty for non-factual technical constraints where justified |
| related_question_ids | Yes | Customer question IDs, if relevant |
| related_page_section_ids | Yes | Page/section targets, if relevant |
| acceptance_criteria | Yes | Observable test/verification condition |
| owner | Yes | Studio/client/external dependency owner |
| status | Yes | PROPOSED / APPROVED / BLOCKED / DEFERRED / REJECTED |

A requirement must be traceable to a source, a business/owner decision or an explicit technical quality standard. "AI thought it would look good" is not a sufficient reason to introduce a feature.

## 6. Minimum completeness checks before design

The WRP can advance to APPROVED_FOR_DESIGN only when:

1. Project and source snapshot are identified.
2. Owner-approved tier, scope, exclusions and commercial boundary exist.
3. Primary audience, website goal and conversion path are explicit.
4. Critical customer questions have source-backed answers or accepted safe omissions.
5. Information architecture fits the approved visitor journey.
6. Content requirements are linked to facts/claims and evidence/publication states.
7. CTAs have exact destinations or explicit unavailable/demo states and truthful behavior.
8. Required assets have known usage decisions or safe fallbacks; unknown rights are not silently approved.
9. Functional requirements are real, bounded and testable.
10. Technical/non-functional requirements match the scope and have no unnecessary paid dependencies.
11. Acceptance criteria cover business, content, functional, visual and technical quality.
12. Preview/production blockers and owners are recorded.
13. Client material confirmations are retained where required; Studio owner approves scope and design progression.

## 7. Relationship to canonical data schema and platform

- Use docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md for stable IDs, source/fact/asset/offer/question/CTA/trust/gap/page-coverage records and status values.
- The WRP references these records; it is not a duplicate source register or a second discovery database.
- The current Laravel DiscoveryRun JSON is a legacy partial discovery output and does not yet enforce every canonical record field. Platform/schema alignment is addressed in Segments 11–12.
- Keep the WRP as a versioned project artifact in the controlled project workspace until a justified platform artifact feature exists.
- The current manual AI workflow remains valid; no paid API, new upload portal or AI orchestration service is required to produce the WRP.

## 8. Change control

A material change to audience, goals, tier, scope, primary conversion, page structure, functional behavior, assets, content claims or acceptance criteria increments the WRP version. Record the reason, affected requirement IDs, source/approval references and downstream work to be revisited.

Do not silently change an approved requirement during implementation. Raise a change request and determine its scope, cost, timeline, content and QA impact before proceeding.

## 9. Definition of done

A Website Requirements Pack is complete when a qualified operator or coding agent can implement the approved website without guessing what the business offers, who it serves, what must be explained, what actions must work, which facts/assets may be published, what is excluded, or how acceptance will be tested.
