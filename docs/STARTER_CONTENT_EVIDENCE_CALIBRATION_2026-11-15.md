# Starter Content Evidence Calibration — 2026-11-15

> **Historical calibration record:** This records the 2026-11-15 correction removing simulated social proof from the ZACKS Starter reference. Retain it as evidence of the change and regression, not as a separate operating workflow. Current mode rules are defined by Master Skill v1.13.

**Reference:** ZACKS Starter  
**Classification:** IMPLEMENTATION / QA  
**Status:** Correction implemented; automated CI verification PASS

## Finding

The Starter reference rendered three simulated customer-story cards and a proof strip containing sample values such as vehicle counts, a customer-experience score and a returning-customer percentage. The sections carried demo labels and their source data was explicitly marked simulated, but the visual treatment still resembled real customer endorsements and business-performance proof. The same audit also found that the WhatsApp consultation form reported a prepared message unconditionally, even when the browser blocked the new tab.

## Root-cause verification

- The product specification already prohibited invented business claims, ratings and testimonials, and required missing testimonials to be omitted or replaced with non-testimonial information.
- The implementation nevertheless enabled `sampleReviews` and `demoMetrics` whenever `site.contentMode` was `portfolio-demo`.
- The Playwright suite checked section presence and layout, but had no content-evidence safeguard for simulated social proof.
- The missing controls were therefore in implementation and QA, not a lack of client input and not a reason to broaden the product scope.
- The consultation form did not distinguish a successful new-tab handoff from a blocked popup, leaving some visitors without a direct recovery path.

## Smallest responsible correction

1. Remove the simulated customer-story and numeric proof sections from the rendered Starter.
2. Remove the associated fictional people, quotations and numerical metrics from the content configuration.
3. Remove CSS that existed only for those sections.
4. Add a browser regression that fails if the known simulated proof components or values return.
5. Clarify the acceptance gate and add a reusable content-evidence publication rule.
6. Make WhatsApp handoff status conditional on the browser opening the new tab; provide a direct WhatsApp link when it is blocked.
7. Add browser tests for both successful handoff and blocked-popup recovery.

## Verification evidence

- **Result:** PASS — production Vite build succeeded and Playwright completed **19/19 tests**.
- **Tested implementation commit:** `6d4e85633e35bb8160a46988c8665267191e3f0f`.
- **GitHub Actions run:** [#36 / 43722483382](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43722483382).
- The run includes the social-proof evidence-integrity regression, normal WhatsApp handoff and blocked-popup fallback, plus the existing nine responsive viewport widths, navigation, pricing, Care Finder, date, image, FAQ, typography, contrast and keyboard checks.
- No change to the Starter's static-first architecture, client intake requirements, scope boundary or pricing assumptions.

## Boundaries

This correction does not verify live ZACKS catalog prices, operational facts, asset rights or owner approval. Those remain separate production blockers. It also does not claim a full WCAG audit or visual screenshot review of photo/gradient surfaces.

## Decision

Retain both corrections. The tested implementation passed CI on the exact commit recorded above. For future Starter projects, missing social proof is an omission—not a content gap to be filled with fictional customer voices or performance figures. Publish proof only after its source, scope, permission and owner approval are recorded under `STARTER_CONTENT_EVIDENCE_GATE_v1.0.md`.
