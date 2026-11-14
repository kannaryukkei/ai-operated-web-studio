# AI-Operated Web Studio — Corrected Restructure & Delivery Plan

Branch: `restructure/business-first-product-system`
Date: 2026-11-14

## Strategic decision

Stop adding pilots. Use the four pilot website experiments plus the Starter reference website as evidence to improve the studio system. Do not move to Business or Custom implementation until Starter has passed its own product acceptance gate.

The order is **system inputs → Starter implementation → Starter real-world validation → Starter commercial readiness → Business → Custom**.

## Workstream 1 — Learn from completed work
- [x] Audit four pilot outcomes and recurring weaknesses.
- [x] Identify RUANG RAPI as the Pilot 04 implementation baseline.
- [x] Preserve the distinction between implementation baseline, integrated audit branch, and supplementary intake experiments.
- [x] Finish evidence review of Starter implementation and actual customer-facing requirements; Starter remains conditional preview, not production-ready.
- [ ] Use Starpoint Garage as a completeness benchmark, not a visual template or a source of facts to copy.

## Workstream 2 — Better inputs and discovery
- [x] Draft business-first Client Brief v2.0 and publish v2.1 with asset-rights and domain-ownership capture.
- [x] Expand platform intake with customer questions, objections, offer details, purchase process, policies, trust evidence, aftercare and public contact destinations.
- [x] Reorganize intake UI into business/customer, offer/operations, conversion/contact and optional reference groups.
- [x] Draft Master Skill v1.5 candidate; publish v1.6 candidate with five-website evidence, provenance and production gates.
- [x] Publish Website Implementation Standard v1.0, Starter Product Acceptance Gate v1.1 and Product Tiers v1.1 with a bounded Rp500,000 pilot scope.
- [x] Update manual discovery prompt to produce Business Model, Offer Matrix, Customer Question Map, Buying Journey, Trust Register and Content Gaps.
- [x] Add server-side validation and feature-test updates for the discovery output.
- [x] Add source provenance and publication status to material facts, CTA destinations, assets and customer-question coverage.
- [x] Add asset source/permission and named content-approver fields to the existing intake without a database migration.
- [x] Add a reviewable business-completeness matrix to discovery output and show its summary in the existing workspace.
- [x] Keep category-specific modules in the brief/skill workflow; defer separate platform forms until real client usage proves they are needed.

## Workstream 3 — Starter is the only active product implementation
- [x] Audit the current Starter template against the four pilot findings and the business-completeness matrix.
- [ ] Identify and fix information gaps, not merely visual gaps.
- [ ] Define the minimum complete section/content system by business category; do not force irrelevant sections.
- [ ] Ensure the Starter product has a genuine approved CTA destination and honest working conversion path.
- [ ] Test realistic content density, package/product comparison, proof, process, policies, FAQs, location/coverage and aftercare where relevant.
- [ ] Complete technical, accessibility, responsive, performance, SEO, functional and production QA.
- [ ] Run one end-to-end delivery using a real, verified business brief and obtain business-owner review.
- [ ] Document the actual included scope, exclusions, delivery time, client responsibilities, price logic and ongoing costs.
- [ ] Pass `STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` before calling Starter ready to sell.

## Workstream 4 — Business and Custom remain deliberately gated
- [ ] Do not implement Business until Starter passes the acceptance gate and its delivery process is repeatable.
- [ ] After Starter acceptance, define Business as a genuinely multi-page product with its own customer journeys and content depth.
- [ ] Do not implement Custom until Business scope is clear and a real workflow requirement justifies bespoke data/integration work.
- [ ] Use the existing ZACKS Laravel-backed work only as evidence of actual capabilities; do not imply unverified production readiness.

## Workstream 5 — Platform boundaries
- [x] Keep the Laravel platform as project record, intake, manual AI handoff, validation and approval workspace.
- [x] Keep the no-paid-API ChatGPT/Claude copy-paste workflow.
- [x] Keep platform as source of project state and store reusable website implementations in this repository's `blueprints/` directory, outside `platform/`.
- [ ] Do not add AI API integration, CMS, payment, CRM, website builder or deployment automation unless repeated delivery proves the need.

## Pilot 04 preservation — no deletion authorized

**No Pilot 04 branch should be deleted as part of this restructure.** The connected GitHub toolset has no branch-delete operation, and the supplementary intake branches contain reusable test scenarios.

Preserve all four branches as historical evidence:
- `pilot-04/integrated-service-business` — selected integrated Pilot 04 baseline after comparing all four branches; contains the consolidated RUANG RAPI implementation, regression/audit documentation and CI evidence (11/11). Keep as the canonical integration and evidence branch.
- `pilot-04/ruang-rapi-service-intake` — original complete RUANG RAPI implementation with original intake provenance and 10/10 Playwright evidence; preserve as the source implementation and historical provenance, not a second active canonical branch.
- `pilot-04/rapi-rumah-service-intake` — supplementary intake/acceptance experiment; no implementation-complete claim.
- `pilot-04/sora-home-care` — sparse-intake stress experiment; no implementation-complete claim.

Do not delete or rewrite these branches. Do not delete Pilot 02, Pilot 03 or KALA `main`. If archive consolidation is ever proposed, first preserve source files, commit SHAs, test evidence and provenance in a reviewed archive commit; deletion requires an explicit separate decision.

## Current PR / CI status
- PR #12 remains a draft for deliberate review; CI is now green.
- Initial CI failures were resolved in sequence: Vite+ formatting, Pint blank-line style, and PHPStan iterable return typing.
- Latest CI run `43585104025`: frontend build, Vite+ formatting/lint, TypeScript, Pint, PHPStan and Laravel tests all PASS (87 files).
- This is CI evidence for the current PR head; it is not a claim that Starter is production-ready or commercially validated.

## Segmented execution checkpoint — 2026-11-14

### Completed in the five-website audit pass
- [x] KALA, SELA, FABLE FORM and all four Pilot 04 branches inventoried and compared; no Pilot 04 deletion performed.
- [x] Selected `pilot-04/integrated-service-business` as the integrated Pilot 04 baseline; preserved the original implementation and supplementary intake branches.
- [x] Audited Starter v0.4.0 on `web-studio-template-kit` branch `starter/five-website-audit-and-hardening`; latest relevant run 43588644994 is build PASS / Playwright 15/15.
- [x] Added five-site findings, category-specific implementation guidance and an explicit Starter Rp500,000 scope hypothesis.
- [x] Added `existing_assets`, `asset_permissions` and `content_approver` fields to the current intake UI, server validation and persistence tests.
- [x] Discovery prompt and validator now require fact, CTA, asset and customer-question provenance/status; successful result tests cover the registers and reject missing fact/CTA registers.
- [x] Existing discovery UI displays the customer-question coverage and CTA register summary; full JSON remains available.
- [x] Updated the manual workflow and orchestration docs. No API credentials, model SDKs, database migration or new agent infrastructure added.

### Git checkpoints (AI Operated Web Studio branch)
- `restructure/business-first-product-system` — work is isolated on the existing draft PR #12; `main` remains untouched. The PR remains draft and unmerged pending owner review.
- Intake controller: commit `86e929ca`; intake UI: `25705a1b`; intake test: `03ea8ce1`.
- Discovery controller: `4a2233b1`; discovery feature tests: `a88d6da4`; discovery result UI: `083a0a48`.
- Documentation updates are recorded in the branch history. Final CI run 43608516386 on commit `12cdab458a2529ce023ec9fb17254ad7bf29b413` completed successfully after the formatter correction and temporary workflow cleanup.

### Next
1. Verify current diff and the full CI result after the latest code changes.
2. Fix any formatter, PHPStan, TypeScript or feature-test errors; rerun CI.
3. Review the live branch diff and compare with PR #12 before deciding whether any merge is appropriate.
4. Report Starter as conditional until owner approval, asset rights, formal accessibility/performance/cross-browser review and one real-client delivery are complete.

### Final verification — 2026-11-14
- [x] GitHub Actions platform-ci run 43608516386 — **success**: Composer install, environment setup, migrations and Vite production build.
- [x] Vite+ formatter: 74 files correctly formatted.
- [x] Vite+ lint: 68 files, no warnings or lint errors.
- [x] TypeScript npm run types:check / tsc --noEmit: passed.
- [x] Laravel Pint: 87 files passed.
- [x] PHPStan: passed.
- [x] Laravel/PHPUnit feature and unit tests: **74 passed, 336 assertions**. Intake persistence and discovery-provenance validation tests included.
- [x] Temporary formatter workflow removed; no temporary workflow file remains in the branch.
- [x] PR #12 remains open as draft; no merge to main performed.

## Definition of done for this phase
- Business-first intake and discovery are implemented and tested.
- All four Pilot 04 branches are preserved.
- Starter acceptance gate is explicit and measurable.
- Starter is the only active implementation priority.
- No Business/Custom implementation starts before Starter acceptance.
- No paid API or unnecessary platform expansion is introduced.


## Canonical blueprint migration — 2026-11-14

This checkpoint supersedes earlier plan wording that kept `web-studio-template-kit` as a separate master repository.

- [x] Inventory all eight branches of `kala-coffee-studio`, including the four Pilot 04 branches.
- [x] Extract reusable process, design, business-integrity and QA practices from KALA, SELA, FABLE FORM, RUANG RAPI, RAPI RUMAH and SORA into `blueprints/starter/KALA_PILOT_LEARNINGS.md`.
- [x] Copy every source file from `web-studio-template-kit` audit branch `starter/five-website-audit-and-hardening` into `blueprints/starter/template-kit/`.
- [x] Verify the 51 source blobs against the migrated paths: no missing files, no extra files, no blob SHA or file-size differences.
- [x] Add a blueprint-local build and Playwright workflow at `.github/workflows/starter-blueprint-ci.yml`.
- [x] Document canonical boundaries and repository-retirement policy in `docs/BLUEPRINT_MIGRATION_DECISION.md`.
- [ ] Run migrated Starter clean-install/build/Playwright CI and record the run result.
- [ ] Review PR #12 before merging. `main` remains unchanged until owner review.

Final architecture: one canonical production repository; `platform/` is the application; `docs/` is the system policy; `blueprints/` contains website foundations; each real client website is isolated in its own repo. No paid model API is required.
