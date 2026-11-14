# AI-Operated Web Studio — Restructure Execution Plan

Branch: `restructure/business-first-product-system`
Date: 2026-11-14

## Objective
Improve the system's inputs and production logic using the four completed pilots. Do not create more pilots. Build three sellable website products: Starter, Business and Custom.

## Workstreams

### 1. Product truth
- [x] Audit existing product brief and tier ADR.
- [x] Define Starter / Business / Custom around customer outcomes and business complexity.
- [ ] Align platform product records and UI labels to the versioned tier definitions.
- [ ] Ensure proposal/scope output includes inclusions, exclusions, third-party costs and maintenance.

### 2. Better inputs
- [x] Draft business-first Client Brief v2.0.
- [x] Expand platform intake with customer questions, objections, offer details, purchase process, policies, trust evidence, aftercare and public contact destinations.
- [x] Reorganize intake UI into concise business/customer, offer/operations, conversion/contact and optional reference groups.
- [ ] Separate client-facing core intake from studio-only qualification in the actual platform UI.
- [ ] Add conditional modules for service, retail, portfolio and F&B.
- [ ] Add explicit provenance/approval controls to structured discovery output.

### 3. Better AI output
- [x] Draft Master Skill v1.5 candidate.
- [x] Update manual discovery prompt to produce Business Intelligence Summary, Offer Matrix, Customer Question Map, Buying Journey, Trust Register and Content Gap Register.
- [x] Add server-side validation for the new discovery structure.
- [x] Update feature tests for expanded intake and business-first discovery.
- [ ] Add business-completeness review/approval in the discovery workspace UI.
- [ ] Align discovery prompt and schema with the conditional business modules.

### 4. Better website products
- [ ] Starter: revise the current ZACKS demo against the completeness matrix; avoid empty sections and repeated cards.
- [ ] Business: create a real multi-page ZACKS demo with distinct information architecture, detailed catalog, process, proof, FAQ/policies and contextual conversion paths.
- [ ] Custom: document scope gates and use the existing ZACKS Laravel-backed system only for verified capabilities.
- [ ] Keep all three tiers independently buildable and deployable.

### 5. Platform scope control
- [x] Keep Laravel platform as project record, intake, discovery handoff, validation and approval workspace.
- [x] Keep external ChatGPT/Claude copy/paste workflow; no paid model API.
- [ ] Do not add AI API integration, CMS, website builder, payment, CRM or deployment automation until actual repeated delivery proves the need.
- [x] Preserve platform/template-kit boundary: platform owns project state; template kit owns website product implementations.

### 6. QA and evidence
- [ ] Run platform PHP tests and frontend production build on this branch.
- [ ] Add business-completeness checklist to Starter and Business QA.
- [ ] Add regression cases based on four pilots: brand/F&B, portfolio/interior, retail/catalog, local service.
- [ ] Mark every test PASS / FAIL / NOT TESTED.
- [x] Preserve pilot evidence and frozen Master Skill v1.3.

## Pilot 04 cleanup

Pilot 04 was a completed validation, not an active product branch. Its learning record and CI evidence must remain available. The integrated branch and three intake experiment branches in `kannaryukkei/kala-coffee-studio` are historical references; delete only after the final audit record is preserved.

The current GitHub connection does not expose a branch-delete operation. Do not claim deletion has happened. The exact branches to delete manually after this audit is retained are:
- `pilot-04/integrated-service-business`
- `pilot-04/rapi-rumah-service-intake`
- `pilot-04/ruang-rapi-service-intake`
- `pilot-04/sora-home-care`

Do not delete `pilot-02/sela-interior-studio`, `pilot-03/fable-form-retail`, `main`, or the Pilot 04 learning record. The integrated Pilot 04 code branch should be removed only after the retrospective record and CI evidence are safely preserved.

## Completion criteria
- One canonical client-facing intake plus studio qualification.
- One canonical Master Skill with business completeness as a mandatory gate.
- Discovery output captures offer, buying journey, customer questions and evidence gaps.
- Starter, Business and Custom have distinct, usable product definitions.
- Business tier has a working deployable demonstration.
- No API keys or new platform features are required to run the workflow.
