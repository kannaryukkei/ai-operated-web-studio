# Pilot 04 Learnings — Service Businesses

> **Historical pilot record (2026-11-14):** The workflow and Master Skill references in this report describe the earlier pilot system. They remain source context, not current operating instructions. Use Master Skill v1.13 and the conversation-first project method.

Date: 2026-11-14
Source experiment: `kannaryukkei/kala-coffee-studio`, branch `pilot-04/integrated-service-business`
Evidence: GitHub Actions run `43581352019` — production build PASS, Playwright 11/11 PASS, browser evidence upload PASS.

## What was validated
- A complete static-first one-page service-business preview can be produced without a model API, backend, database, or live form endpoint.
- One canonical completed client intake must remain the sole source of business facts.
- Reusable learnings from separate pilots can be combined as process rules and regression checks, not as a mixture of fictional client identities or service facts.
- Missing public contact details should produce an honest contact-not-configured state. This blocks live conversion, not a truthful preview.
- Service names alone do not justify inventing service inclusions, outcomes, prices, operating hours, or operational claims.
- Internal project coordination contacts must never be silently repurposed as public website contacts.
- Illustrative local SVGs / typographic fallbacks are acceptable when photography is unavailable, provided they are not presented as real customer work.
- Preview readiness and production readiness must be reported separately.

## Process improvements carried into this repository
- Added `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v1.1.md` with a dedicated public-contact / CTA destination register, explicit missing states, and separation of internal contacts.
- Added `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.4_CANDIDATE.md` with CTA integrity, no-fabrication, missing-information, asset fallback, cross-pilot contamination, and QA reporting rules.
- Master Skill v1.3 remains unchanged. v1.4 is a candidate, not a stable release; validate it on another independent business category before adoption.

## Acceptance checks to reuse
- Each CTA maps to an approved real destination or a disclosed unavailable/demo state.
- No fake contact links, forms, submission-success messages, or implied data storage.
- No unsupported public claims or service inclusions.
- Negative regression checks prevent cross-client / cross-branch fact contamination.
- Browser tests cover key interactions, local image loading, and 320–1440px responsive overflow.
- CI records build, Playwright results, and desktop/mobile screenshot artifacts.

## Explicit limitations
The Pilot 04 CI run did not establish formal accessibility/contrast conformance, Lighthouse/performance, non-Chromium compatibility, real lead conversion, or production readiness. Those remain NOT TESTED.

## Next validation
Use the v1.4 candidate and brief template on a new client category. Compare the result against the unchanged v1.3 baseline where practical; revise only from observed evidence.