# Starter Content Evidence Gate v1.0

**Status:** Supporting evidence/claim rule for Starter work; Master Skill v1.13 governs mode selection  
**Purpose:** Prevent fabricated social proof and keep every material customer-facing claim traceable to a source.

## Non-negotiable rule

In `client_service`, never invent or simulate a real-world endorsement, customer experience, third-party rating, award or business-performance result. A client-facing demo must not present fictional trust signals as evidence about a real business.

In `studio_development`, synthetic testimonials, ratings, metrics or outcomes may be used only as clearly labelled internal test fixtures. They must not be presented as real evidence or publicly released. A generic `demo` label is not a sufficient disclosure if a page could be mistaken for a real business.

## Content that requires evidence

The following items may be published only when a source and publication approval are recorded:

- Customer reviews, testimonials, quotations, names, photos and customer-story narratives.
- Star ratings, review totals, satisfaction scores and recommendation rates.
- Customer counts, completed-job counts, repeat-customer rates and growth figures.
- Awards, certifications, partner endorsements, press mentions and rankings.
- Before/after results or case studies presented as completed work.
- Any comparative, quantified or outcome claim about business performance.

## Evidence record

Each proposed proof item must include:

| Field | Requirement |
|---|---|
| Item | Exact text, number, photo or claim proposed for publication |
| Source | Original review platform, customer approval, business record or other primary source |
| Date / scope | When it applies and what population or period it covers |
| Permission | Publication permission for names, quotations, photos and identifiable details |
| Accuracy check | Studio has checked the item against its source and retained context |
| Owner approval | Explicit business-owner approval for the proposed wording and placement |
| Status | VERIFIED / BLOCKED / EXPIRED |

Only genuinely source-supported and explicitly approved real items may be published in `client_service`. A synthetic fixture is never eligible for public release. An item is BLOCKED when its source, scope, permission or approval is missing. Recheck time-sensitive ratings and performance figures before release.

## What to do when proof is unavailable

- Omit the testimonial, review or metric section.
- Do not fill the gap with invented customer personas, first-person quotations, star graphics, review counts or placeholder performance figures.
- Show useful, verifiable information instead: actual services, scope boundaries, transparent pricing method, service process, coverage, policies and the real consultation path.
- Use concept imagery only as visual illustration, with a clear caption that it is not documentation of customer work.
- Do not describe operational promises as proof of historical performance.

## Mode rules

**`client_service`:** Every material claim and proof item requires real source support, relevant permission and explicit publication approval. Missing proof is omitted.

**`studio_development`:** Synthetic proof-like fixtures are allowed only for internal testing, clearly labelled `SYNTHETIC / DEVELOPMENT ONLY`. No public release, outreach or deployment is permitted. Do not transfer synthetic material into a real-client deliverable.

## Automated and manual QA

- Automated regression must check known demo references for fabricated proof components and values.
- The reviewer must inspect every proof item and verify its evidence record; semantic truth cannot be established by a DOM or contrast test.
- A passing build or browser suite does not approve business facts or publication rights.

## Current ZACKS Starter decision

The canonical reference intentionally omits customer-story, testimonial, rating and performance-metric sections because no approved evidence package is attached to this experiment. It retains verifiable service information and clearly disclosed concept imagery. Price values and operational details remain preview-only until reconciled with the owner's current approved source.
