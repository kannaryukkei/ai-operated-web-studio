# Starter v0.4.0 — Responsive & Interaction QA

> **Historical QA snapshot and current policy correction (Master Revision):** the 15/15 result below belongs to the exact historical commit/run listed below; it is not the current Starter test-suite count or full product acceptance. The previous production-mode proof-suppression guard only addressed production output and had not been independently exercised in browser mode. That is no longer sufficient: fabricated social proof is prohibited in both portfolio/demo and client-production modes. The current reference still requires a source/content audit and removal of legacy simulated metrics/customer-story proof before it can pass the current acceptance gate. Use the canonical Starter Acceptance Gate and automated-quality standard for current release decisions.

## Latest completed result

**PASS — GitHub Actions / Chromium**

- Run: https://github.com/kannaryukkei/web-studio-template-kit/actions/runs/43588644994
- Tested commit: `2c687401aa2d104c28360d70f7d763e9989215c9`
- Production build: **PASS**
- Playwright: **15/15 PASS**

## Current test suite

The audit branch now contains **15 Playwright tests**. Three tests were added after the 12-test baseline: Escape-close mobile navigation, skip-to-content keyboard navigation, and image loading/alt-text verification. The latest CI run passed after three duplicated FAQ entries were removed, the missing booking-confirmation question was added, and the test was strengthened to assert 12 unique questions. Production-mode proof suppression is implemented behind `site.contentMode`, but has not yet been independently exercised in a browser test.

Coverage includes:
- Section presence and no horizontal overflow at 320–1440px.
- Mobile navigation open, links and Escape close.
- Vehicle type/class selection and package pricing.
- Care Finder recommendation and explicit class-S starting-price label.
- Consultation navigation and form submission to the configured WhatsApp destination.
- Message payload accuracy and no false booking/data-storage claims.
- Local date minimum in Asia/Jakarta.
- All internal anchor targets and WhatsApp CTA destination consistency.
- 12 unique FAQs and key sections.
- All page images load successfully and include meaningful alternative text.
- Footer alignment at mobile, tablet, and desktop widths.
- Skip-to-content and keyboard-visible navigation.
- Source-level production-mode guard is present for fictional metrics, simulated customer stories, and the portfolio-only footer label (browser-mode test: NOT TESTED).

## What this does not prove

Even when the 15-test suite passes, automated Chromium checks do **not** certify:
- That the WhatsApp number is owned/approved by the business or that an admin responds.
- That services, inclusions, exclusions, prices, service areas, social links, and policies match current owner-approved facts.
- Formal accessibility/contrast conformance or screen-reader usability.
- Lighthouse/Core Web Vitals or performance on slower networks/devices.
- Firefox/Safari compatibility.
- Real customer comprehension, lead conversion, or operational handling of enquiries.
- Owner approval, production domain, hosting, privacy/legal review, or launch readiness.

## Current release interpretation

**Current technical smoke gate: PASS (15/15, Chromium). Commercial / production gate: NOT YET PASSED.**

Starter still requires owner-approved business data, contact/social destination verification, approved/owned assets, formal accessibility/performance review, cross-browser QA, real-client review, and handover/deployment ownership before it can be called sellable.
