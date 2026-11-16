# ACFIX Full-Input Benchmark v1.0

**Purpose:** controlled full-input test of AI Operated Web Studio's discovery → art direction → implementation planning → refinement → QA reasoning.  
**Run mode:** `INTERNAL_BENCHMARK` only.  
**Business:** ACFIX Studio — fictional residential and small-office split-AC service.  
**Data status:** every business fact, price, location, policy, person, operating detail and visual brand value in this fixture is `SYNTHETIC / DEMO_ONLY`.  
**Production status:** NOT A REAL BUSINESS · NOT FOR PUBLICATION · NOT FOR RELEASE.

## Benchmark objective

Test whether the revised Web Studio can transform a complete, source-rich input into a distinctive, persuasive and technically feasible Starter website—without inventing unsupported facts or reverting to generic editorial/service-card layouts.

This fixture intentionally supplies more complete information than Experiment #4. It is not intended to simulate the minimum client-input experience. It is a maximum-input ceiling test.

## Required source files

| Source | Purpose |
|---|---|
| `01-client-interview-transcript.md` | Business identity, audience, needs, decisions, voice and owner preferences |
| `02-service-catalog-and-price-book.md` | Service scope, inclusions, exclusions, options and synthetic prices |
| `03-operations-and-service-areas.md` | Hours, scheduling, staffing/capacity assumptions, coverage and travel fees |
| `04-policies-and-customer-journey.md` | Payment, cancellation, warranty, preparation, safety and process |
| `05-brand-and-visual-preferences.md` | Identity, positioning, design constraints, references and creative preferences |
| `06-asset-register-and-permissions.md` | Supplied concept assets, provenance, rights and intended use |
| `07-faq-and-approved-copy.md` | Source-backed customer answers and existing approved-in-fixture language |

## Fixture completeness contract

All material business domains are either:
- `PROVIDED_DEMO_ONLY`: a complete synthetic value is available for this benchmark;
- `NOT_APPLICABLE_DEMO_ONLY`: deliberately not part of the fictional business scenario (for example, real customer testimonials or real credentials);
- `OUT_OF_SCOPE`: deliberately excluded from the Starter website.

There are no accidental blank business fields in this benchmark. The lack of genuine testimonials, real certification evidence, live contact ownership and production approval is intentional and must not be filled with invented proof.

## Asset bundle

- `assets/acfix-wordmark.svg`: Studio-created concept wordmark.
- `assets/hero-home-interior.webp`: Studio-generated concept illustration derived from an AI-generated visual study. It does not depict a real ACFIX customer's home, a real unit installation or a real result.
- `assets/airflow-explainer.svg`: original conceptual airflow graphic.
- `assets/service-process.svg`: original process illustration.

All assets are licensed for this internal synthetic benchmark only. Their status does not imply client ownership or production permission.

## Test rules

1. Read this README, then all seven input documents and the supplied assets. Do not stop after a representative sample.
2. Build the source register, fact register, asset/permission register, business intelligence, offer matrix, customer question map and WRP from those inputs.
3. Run the revised Stage 5 prompt in `INTERNAL_BENCHMARK` mode. Produce two materially different concepts, references, wireframes and a complete design pack. Stop before website implementation.
4. Compare the result against the previous ACFIX render, ZACKS and Semburat. Do not claim a pixel-level screenshot comparison where a rendered reference is unavailable.
5. Record a separate diagnostic verdict for business completeness, aesthetic distinctiveness and technical feasibility.
6. No actual publication, live WhatsApp, email, booking, payment, or data storage is allowed.

## Success criteria

- Source coverage: 100% of the seven source documents and four assets inventoried.
- Material facts: all offer, pricing, scope, coverage, schedule, payment, cancellation, warranty and CTA facts traced to a source.
- No fabricated reviews, awards, credentials, ratings, customer counts, staff identities or business outcomes.
- Two genuinely different visual directions, not palette variants.
- Selected design direction includes a memorable signature visual, distinct section compositions and responsive behavior.
- The final visual direction is clearly different from the old ACFIX field-manual render, ZACKS precision-editorial language and Semburat's product-led bakery system.
- The selected direction can be implemented in Starter scope without unnecessary backend features.
- All unknown/unsupported claims remain explicit; no production gate is inferred from the simulation.

## Limitation

This is still a synthetic benchmark. Passing it proves improved performance against a complete test fixture, not that the system is validated with real clients or real commercial data.
