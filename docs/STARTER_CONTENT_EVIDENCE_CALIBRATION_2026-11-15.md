# Starter Content Evidence Calibration — 2026-11-15

**Reference:** ZACKS Starter  
**Classification:** IMPLEMENTATION / QA  
**Status:** Correction implemented; automated CI verification PASS

## Finding

The Starter reference rendered three simulated customer-story cards and a proof strip containing sample values such as vehicle counts, a customer-experience score and a returning-customer percentage. The sections carried demo labels and their source data was explicitly marked simulated, but the visual treatment still resembled real customer endorsements and business-performance proof.

## Root-cause verification

- The product specification already prohibited invented business claims, ratings and testimonials, and required missing testimonials to be omitted or replaced with non-testimonial information.
- The implementation nevertheless enabled `sampleReviews` and `demoMetrics` whenever `site.contentMode` was `portfolio-demo`.
- The Playwright suite checked section presence and layout, but had no content-evidence safeguard for simulated social proof.
- The missing control was therefore in implementation and QA, not a lack of client input and not a reason to broaden the product scope.

## Smallest responsible correction

1. Remove the simulated customer-story and numeric proof sections from the rendered Starter.
2. Remove the associated fictional people, quotations and numerical metrics from the content configuration.
3. Remove CSS that existed only for those sections.
4. Add a browser regression that fails if the known simulated proof components or values return.
5. Clarify the acceptance gate and add a reusable content-evidence publication rule.

## Verification evidence

- **Result:** PASS — production Vite build succeeded and Playwright completed **18/18 tests**.
- **Tested website code commit:** `53613da9c24486bcbbd55e008b2e8aea0711fa63`.
- **GitHub Actions run:** [#28 / 43721721168](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43721721168).
- The run includes the new evidence-integrity regression and retains the existing nine responsive viewport widths, navigation, pricing, Care Finder, WhatsApp, date, image, FAQ, typography, contrast and keyboard checks.
- No change to the Starter's static-first architecture, client intake requirements, scope boundary or pricing assumptions.

## Boundaries

This correction does not verify live ZACKS catalog prices, operational facts, asset rights or owner approval. Those remain separate production blockers. It also does not claim a full WCAG audit or visual screenshot review of photo/gradient surfaces.

## Decision

Retain the correction. The tested implementation passed CI on the exact commit recorded above. For future Starter projects, missing social proof is an omission—not a content gap to be filled with fictional customer voices or performance figures. Publish proof only after its source, scope, permission and owner approval are recorded under `STARTER_CONTENT_EVIDENCE_GATE_v1.0.md`.
