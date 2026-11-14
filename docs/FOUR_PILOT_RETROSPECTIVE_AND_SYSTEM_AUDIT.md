# Four-Pilot Retrospective & AI Studio System Audit

Status: Working audit — 2026-11-14
Scope: KALA Coffee Studio (Pilot 01), SELA Interior Studio (Pilot 02), FABLE FORM (Pilot 03), RUANG RAPI / integrated service-business (Pilot 04).
Decision: Stop creating pilots. Improve the production system from completed evidence.

## Executive diagnosis

The studio has demonstrated that it can produce visually coherent, responsive, static-first websites across four different business contexts. The recurring weakness is not frontend capability. It is the translation of a business into a complete, useful customer-facing information system.

A website that looks polished but leaves visitors asking basic buying questions is not a strong commercial deliverable. The system must discover the business deeply enough to explain its offer, help visitors choose, establish trust, set expectations, and make the next action obvious.

The target is not "more sections". It is **business completeness**: every relevant customer question is answered with accurate, useful information, in the right order, with a working next step.

## Evidence from the four completed builds

| Pilot | Business context | Verified implementation evidence | What it taught the system |
|---|---|---|---|
| 01 — KALA Coffee Studio | F&B / coffee brand | Completed first production website baseline; use its repository history and artifacts as source evidence | Brand expression and product storytelling must be grounded in the actual business offer and customer journey |
| 02 — SELA Interior Studio | Interior design / portfolio service | Build PASS; Playwright 9/9; responsive 320–1440px; filters, project detail dialog, Escape and focus restoration PASS | Portfolio businesses need project discovery, category navigation, meaningful case details, and accessible interactions—not just a generic hero and service cards |
| 03 — FABLE FORM | Retail / e-commerce concept | Build PASS; Playwright 14/14; responsive 320–1440px; search, filters, variants, cart, subtotal and checkout guard PASS | Product businesses need product discovery, useful detail, variants, cart logic and transparent checkout boundaries; "catalog" alone is insufficient |
| 04 — RUANG RAPI | Home service / local service | Build PASS; Playwright 11/11; browser evidence uploaded | Service businesses need clear service scope, process, coverage, FAQs, honest inquiry behavior, and no invented inclusions or public contacts |

Pilot 04 also established important integrity rules: no invented service details, prices, contacts, testimonials, outcomes or policies; internal contacts must not become public CTAs; missing endpoints block live conversion but not an honest preview; demo visuals must not masquerade as customer proof.

## Strategic benchmark: Starpoint Garage

Starpoint Garage is a benchmark for *depth of customer information*, not a template to copy. The observed strengths are:

1. A clear point of view and positioning.
2. Customer self-identification before service selection.
3. Treatment/service explanations that clarify purpose, price/time where supported, and next action.
4. Education that helps customers understand categories and differences.
5. Process transparency and clear scope expectations.
6. Proof through genuine reviews, workshop imagery and customer experience.
7. Booking clarity: what happens after inquiry, how price/availability is confirmed, and what is not yet booked.
8. Useful post-purchase/retention features where justified.

The system should learn to ask: "What does a first-time visitor need to understand before they feel ready to contact or buy?" It should not blindly copy workshop features, membership apps, claims, or content from Starpoint into unrelated businesses.

## Root causes in the current system

### 1. Intake is fact-oriented but not sufficiently business-oriented
The current brief captures identity, audience, offer, website goal, contacts, scope, assets, proof and commercial context. It does not consistently force discovery of:
- the real buying decision and customer objections;
- how customers compare offers and choose a package/product;
- detailed product/service structure, inclusions, exclusions and price logic;
- what happens before, during and after purchase;
- operational constraints, policies and expectations;
- the evidence that supports trust;
- the questions staff repeatedly answer;
- the actual lead-to-sale or browse-to-purchase journey.

### 2. The Master Skill emphasizes safe execution more than business completeness
Its no-fabrication and QA controls are strong. But it needs a required business-understanding pass before choosing sections or design. A technically correct site can still be commercially thin.

### 3. Starter has been treated too much as a page format
Starter is not "a small/empty website". It is a complete small-business website delivered in one page. The information architecture can be compact, but it must cover the relevant customer journey.

### 4. Business and Custom are not yet real products
The repository describes the tiers, but only Starter has a working implementation. Business must become a distinct multi-page information architecture. Custom must become a scoped bespoke delivery model with clear discovery and engineering gates—not a vague premium tier.

### 5. Platform scope has drifted toward orchestration
The platform should remain a lightweight system of record and workflow coordinator. The immediate quality multiplier is better brief inputs, tier definitions, reusable content architecture and delivery prompts—not more platform features or paid API integrations.

## Required system changes

1. Replace the generic brief with a compact core intake plus conditional business modules.
2. Introduce a Business Intelligence Summary as a required discovery output.
3. Add a Customer Question Map and Buying Journey before the sitemap/section map.
4. Add a Business Completeness Matrix to content planning and QA.
5. Define Starter, Business and Custom as different levels of information depth, architecture and interaction—not merely visual complexity or page count.
6. Keep all material facts classified and traceable to sources.
7. Add a content-depth review to visual refinement: a beautiful page must not pass if critical customer questions remain unanswered.
8. Keep the manual ChatGPT/Claude workflow. No paid API is required.

## What should not change

- Keep `ai-operated-web-studio` as the source of truth for client brief, master production skill and studio workflow.
- Keep website blueprints in this repository under `blueprints/`, separate from `platform/`; keep delivered client sites in separate private repositories.
- Keep KALA Coffee Studio `main` untouched by unrelated system work.
- Preserve the frozen Master Skill v1.3 and existing pilot evidence.
- Do not merge fictional business facts across pilots.
- Do not build backend/CMS/booking/payment features by default.
- Do not add another pilot just to validate wording. Use retrospective evidence and regression checks from all four completed builds.

## Next execution order

1. Approve the new business-first intake structure and tier definitions.
2. Update the Master Skill to require business intelligence, customer-question mapping and completeness review.
3. Align the discovery prompt/output schema and platform validation with the new brief.
4. Update the Starter operating blueprint and delivery templates.
5. Build the Business website as the next actual product implementation.
6. Define Custom scope and capability gates using the real ZACKS Laravel-backed site as a reference, without inventing features.
7. Run a retrospective regression audit against all four pilot scenarios; do not create new pilots.


## Canonical repository decision — 2026-11-14

This section supersedes any earlier suggestion in this retrospective that `web-studio-template-kit` must remain a separate master repository.

- `ai-operated-web-studio` is the only canonical production-system repository.
- The complete 51-file source snapshot from `web-studio-template-kit` branch `starter/five-website-audit-and-hardening` (commit `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`) has been migrated byte-for-byte into `blueprints/starter/template-kit/`.
- Reusable findings from every KALA branch, including the intake-only Pilot 04 scenarios, are consolidated into `blueprints/starter/KALA_PILOT_LEARNINGS.md`.
- The source Template Kit contains a ZACKS automotive/local-service reference; use it only when the category and journey fit. It is not a universal blank website and must not be deployed unchanged.
- `platform/`, `docs/`, and `blueprints/` have distinct responsibilities inside this repository. Client website source and client-specific data stay in separate client repositories.
- The former Template Kit repository becomes redundant after migration CI passes. The KALA repository remains valuable as historical provenance and should be archived rather than deleted until its original branch history and evidence are no longer needed.

No repository or branch deletion is performed by this migration.
