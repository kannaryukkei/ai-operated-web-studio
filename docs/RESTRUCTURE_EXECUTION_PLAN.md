# AI-Operated Web Studio — Corrected Restructure & Delivery Plan

Branch: `restructure/business-first-product-system`
Date: 2026-11-14

## Strategic decision

Stop adding pilots. Use the four completed pilots as evidence to improve the studio system. Do not move to Business or Custom implementation until Starter has passed its own product acceptance gate.

The order is **system inputs → Starter implementation → Starter real-world validation → Starter commercial readiness → Business → Custom**.

## Workstream 1 — Learn from completed work
- [x] Audit four pilot outcomes and recurring weaknesses.
- [x] Identify RUANG RAPI as the Pilot 04 implementation baseline.
- [x] Preserve the distinction between implementation baseline, integrated audit branch, and supplementary intake experiments.
- [ ] Finish evidence review of Starter implementation and actual customer-facing requirements.
- [ ] Use Starpoint Garage as a completeness benchmark, not a visual template or a source of facts to copy.

## Workstream 2 — Better inputs and discovery
- [x] Draft business-first Client Brief v2.0.
- [x] Expand platform intake with customer questions, objections, offer details, purchase process, policies, trust evidence, aftercare and public contact destinations.
- [x] Reorganize intake UI into business/customer, offer/operations, conversion/contact and optional reference groups.
- [x] Draft Master Skill v1.5 candidate with mandatory business intelligence and completeness review.
- [x] Update manual discovery prompt to produce Business Model, Offer Matrix, Customer Question Map, Buying Journey, Trust Register and Content Gaps.
- [x] Add server-side validation and feature-test updates for the discovery output.
- [ ] Add source provenance and approval status to every material business fact and output item.
- [ ] Add conditional discovery modules for service, retail, portfolio and F&B.
- [ ] Add a reviewable business-completeness matrix before website planning can be approved.

## Workstream 3 — Starter is the only active product implementation
- [ ] Audit the current Starter template against the four pilot findings and the business-completeness matrix.
- [ ] Identify and fix information gaps, not merely visual gaps.
- [ ] Define the minimum complete section/content system by business category; do not force irrelevant sections.
- [ ] Ensure the Starter product has a genuine approved CTA destination and honest working conversion path.
- [ ] Test realistic content density, package/product comparison, proof, process, policies, FAQs, location/coverage and aftercare where relevant.
- [ ] Complete technical, accessibility, responsive, performance, SEO, functional and production QA.
- [ ] Run one end-to-end delivery using a real, verified business brief and obtain business-owner review.
- [ ] Document the actual included scope, exclusions, delivery time, client responsibilities, price logic and ongoing costs.
- [ ] Pass `STARTER_PRODUCT_ACCEPTANCE_GATE_v1.0.md` before calling Starter ready to sell.

## Workstream 4 — Business and Custom remain deliberately gated
- [ ] Do not implement Business until Starter passes the acceptance gate and its delivery process is repeatable.
- [ ] After Starter acceptance, define Business as a genuinely multi-page product with its own customer journeys and content depth.
- [ ] Do not implement Custom until Business scope is clear and a real workflow requirement justifies bespoke data/integration work.
- [ ] Use the existing ZACKS Laravel-backed work only as evidence of actual capabilities; do not imply unverified production readiness.

## Workstream 5 — Platform boundaries
- [x] Keep the Laravel platform as project record, intake, manual AI handoff, validation and approval workspace.
- [x] Keep the no-paid-API ChatGPT/Claude copy-paste workflow.
- [x] Keep platform as source of project state and template kit as source of website implementations.
- [ ] Do not add AI API integration, CMS, payment, CRM, website builder or deployment automation unless repeated delivery proves the need.

## Pilot 04 preservation — no deletion authorized

**No Pilot 04 branch should be deleted as part of this restructure.** The prior instruction to delete all four Pilot 04 branches was incorrect and is withdrawn.

Preserve all four branches as historical evidence:
- `pilot-04/ruang-rapi-service-intake` — primary implementation baseline; complete RUANG RAPI website, original completed intake provenance, production build and 10/10 Playwright evidence. This is the key original Pilot 04 implementation and must be retained.
- `pilot-04/integrated-service-business` — comparative audit / integration record and associated history. Retain as a decision and audit artifact.
- `pilot-04/rapi-rumah-service-intake` — supplementary intake/acceptance experiment; no implementation-complete claim.
- `pilot-04/sora-home-care` — sparse-intake stress experiment; no implementation-complete claim.

Do not delete or rewrite these branches. Do not delete Pilot 02, Pilot 03 or KALA `main`. If archive consolidation is ever proposed, first preserve source files, commit SHAs, test evidence and provenance in a reviewed archive commit; deletion requires an explicit separate decision.

## Current PR / CI status
- PR #12 remains a draft for deliberate review; CI is now green.
- Initial CI failures were resolved in sequence: Vite+ formatting, Pint blank-line style, and PHPStan iterable return typing.
- Latest CI run `43585104025`: frontend build, Vite+ formatting/lint, TypeScript, Pint, PHPStan and Laravel tests all PASS (87 files).
- This is CI evidence for the current PR head; it is not a claim that Starter is production-ready or commercially validated.

## Definition of done for this phase
- Business-first intake and discovery are implemented and tested.
- All four Pilot 04 branches are preserved.
- Starter acceptance gate is explicit and measurable.
- Starter is the only active implementation priority.
- No Business/Custom implementation starts before Starter acceptance.
- No paid API or unnecessary platform expansion is introduced.
