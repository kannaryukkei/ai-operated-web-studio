# Source-to-Page Coverage Matrix — Template v1.0

**Project:** [project ID / name]  
**Website revision / commit:** [commit SHA or preview revision]  
**Prepared by:** [AI / operator]  
**Date:** [YYYY-MM-DD]  
**Status:** DRAFT / REVIEWED

**Schema authority:** `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`. This matrix is a readable post-implementation QA view of canonical `page_coverage[]`; it is not a separate discovery schema. Prepare the source-to-page plan in Stages 3–4, but assign rendered coverage only after implementation and QA.

## Purpose

Reconcile the original interview/source packet and normalized discovery artifacts with the actual customer-facing website. This matrix detects information lost between:

**Raw material → normalized brief / fact register → customer question map → rendered website.**

It is a production/QA artifact, not a client questionnaire. Complete it after the first website implementation and update it after material content changes.

## Status dimensions

Keep these independent:

- **Answer status:** PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT.
- **Evidence status:** VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT.
- **Publication status:** APPROVED / PENDING / NOT_APPROVED.
- **Page coverage:** PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE.

A fact may be present in the transcript but still be unverified and not approved for publication. Do not collapse these states.

## Coverage matrix

| page_coverage_id | question_id | Customer question / source topic | Raw source locator | Normalized fact / answer reference | Answer status | Evidence status | Publication status | Exact page / section locator | coverage_status | Gap owner / action |
|---|---|---|---|---|---|---|---|---|---|
| PC-001 | Q-001 | [Visitor question] | [SRC-ID + segment/page/timecode] | [Fact Register ID] | [status] | [status] | [status] | [URL / page + section ID] | [status] | [owner + action or —] |
| PC-002 | Q-002 | [Visitor question] | [SRC-ID + segment/page/timecode] | [Fact Register ID] | [status] | [status] | [status] | [URL / page + section ID] | [status] | [owner + action or —] |

Add one row for every material customer question or source-backed fact that can affect a visitor's decision, expectations, safety, trust or next action. Do not use one broad row to hide missing subtopics.

## Coverage domains to consider

Include only relevant domains for the business; this is a review guide, not a mandatory section/feature checklist.

- Offer: exact products/services, categories, variants, fit, inclusions and exclusions.
- Price: price, range, pricing method, taxes, fees and quote conditions.
- Availability: stock/batch, schedules, capacity, booking lead times and constraints.
- Visit / delivery: address or service area, hours and holiday changes, parking, accessibility, pickup, delivery, fees and limits.
- Process: what happens after inquiry/order, preparation, confirmation, timing and handoff.
- Policies: accepted payment methods, deposit, cancellation, refund, returns, rescheduling, warranty, service recovery and aftercare.
- Dietary / safety / regulated claims: ingredient and allergen limitations, qualifications, certifications and restrictions.
- Trust: real reviews, portfolio, credentials, supplier evidence, outcomes and proof; absence must remain explicit.
- Conversion: public contact destination, CTA behavior, recipient/owner and what happens after activation.
- Legal / privacy: data collection, consent, terms, notices and publication permissions.

## Decision rules

1. A row is **PUBLISHED** only when the answer is actually visible in the rendered customer experience, supported by an approved source and phrased without expanding the claim.
2. A row is **PREVIEW_ONLY** when the rendered website intentionally shows disclosed draft or unverified information that the approval policy permits for internal preview. Never invent social proof or imply that a concept image is real work.
3. A row is **GAP** when a material question is not answered, a required source is missing, or a customer-facing action cannot be completed honestly. Record owner and next action.
4. A row is **NOT_APPLICABLE** only with a short reason. Do not use it to conceal inconvenient or missing information.
5. Never expose internal contacts, private notes, sensitive documents, unpublished commercial terms or unapproved claims merely to improve coverage.
6. Never invent an answer to turn a GAP into PUBLISHED.
7. Do not add a website section or feature for every source topic. Decide whether the information belongs on the website, in a private handoff, or should remain explicitly unavailable.
8. Re-run the matrix after content changes that affect an offer, policy, CTA, visit information or major customer question.

## Acceptance summary

| Check | Result | Evidence / note |
|---|---|---|
| All material source segments/topics accounted for | PASS / FAIL | [coverage evidence] |
| Every critical customer question has a page locator or explicit GAP | PASS / FAIL | [matrix rows] |
| Facts retain distinct answer/evidence/publication statuses | PASS / FAIL | [fact register] |
| Public content uses only approved facts and assets | PASS / FAIL | [approval / asset register] |
| Private contacts and internal notes are excluded | PASS / FAIL | [CTA map / page review] |
| Preview-only content is disclosed | PASS / FAIL / N/A | [page locator] |
| Critical GAPs have owner/action and release decision | PASS / FAIL | [issue register] |

**Production gate:** no critical GAP may silently pass. A preview may retain disclosed gaps, but it must not be described as production-ready. Record overall decision: PASS / CONDITIONAL PREVIEW / FAIL.
