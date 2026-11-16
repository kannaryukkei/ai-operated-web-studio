# Experiment #5 — Star Point Garage calibration record

**Status:** PRELIMINARY — NOT YET PROVEN  
**Date:** 2026-11-16  
**Project / experiment:** Experiment #5 — Star Point Garage Benchmark  
**Experiment repository:** `kannaryukkei/web-studio-experiment-05-starpoint-garage`  
**Experiment branch:** `main`  
**Experiment evidence commits:** initialization `2a1f61f4`; media plan `17c60281`; AI media import smoke-test report `665b05f4`  
**Website baseline commit:** NONE — the current website preview is a standalone local artifact and has not yet been committed to the experiment repository.  
**Studio baseline inspected:** `kannaryukkei/ai-operated-web-studio@d0e8d43b40b881b101097195982fa34e763a5847`  
**Master Skill:** v1.11 CANDIDATE (not adopted as canonical)  
**Starter reference:** Starter v0.4.0 reference system; no category-specific Starter version has been promoted.

## 1. Observed finding

### Expected outcome

Produce a source-traceable, private one-page motorcycle-care preview that helps a visitor understand the offer, choose a relevant treatment, assess indicative pricing and take an honest consultation action. Preserve the benchmark blind-input boundary: the screenshot in `98-benchmark-only/` is not design input for the first baseline.

### Actual standalone preview

The local baseline produced the following decision path:

1. Brand/value proposition and a primary treatment/consultation action.
2. Five motorcycle classes (Small, Medium, Large, Big Bike, Luxury) with indicative examples.
3. Four core treatments: Premium Signature Wash, Paint Correction & Gloss Booster, Deep Body & Engine Detailing and Nano Coating 10H.
4. A class selector that changes the displayed price for each treatment.
5. Ala-carte treatment options.
6. A process/standard explanation without fabricated customer proof.
7. Workshop location and operating information.
8. Customer FAQs and a WhatsApp consultation handoff.

The hero uses AI-generated concept art and discloses that it is not real workshop or customer-work documentation. The page includes a no-index directive. The WhatsApp action is a consultation handoff; the static preview does not store customer data or claim to confirm bookings, payment or availability.

The visual direction used a dark editorial hero, warm light content surfaces and a sharp chartreuse accent. This is an observed design choice for this benchmark, not a reusable brand palette.

### Reproduction / artifact evidence

- Standalone preview source: `/mnt/data/starpoint-preview/index.html`
- Preview source SHA-256: `92434e44bbe1b1632dde1c5664adf4ddf8cb514573f237e77906f104a575cbdb`
- Self-contained HTML artifact SHA-256: `08f991ae4d5ff43cf4d64341c3abfd421bc9d1614ff25a255af30f390491dec0`
- AI concept image SHA-256: `43fdcb86c77ff566392f6d9c0ca6f6d5a1c3076bdddcf41b3d1a47a94e872bb5`
- Local interaction harness: `/mnt/data/starpoint-preview/test-interactions.mjs`
- Experiment #5 README continues to prohibit public deployment/publication and distinguishes this benchmark from an official Star Point Garage website.

### Verification observed

| Check | Result | Evidence / limitation |
|---|---|---|
| Node interaction harness | PASS | Verified Big Bike and Luxury price updates; verified mobile navigation open/close |
| JavaScript syntax | PASS | `node --check` on the preview's inline script |
| HTML parser | PASS | Python standard-library HTML parser completed |
| Playwright / real browser run | NOT TESTED | Current runner blocked navigation to its local preview server with `net::ERR_BLOCKED_BY_ADMINISTRATOR` |
| Actual desktop/mobile screenshot QA | NOT TESTED | Static preview images exist, but they do not substitute for verified browser-rendered viewport evidence |
| Full Starter workflow | NOT TESTED | No canonical discovery packet/WRP/G0–G7 evidence was created for this standalone run |
| Clean production build / CI | NOT TESTED | The standalone artifact is not yet a committed Starter project with an executed CI run |
| Owner fact and publication approval | PENDING | All business facts are source-derived from public material and remain unconfirmed by the business owner |

## 2. Root-cause classification

**No internal system defect is confirmed by this experiment.** The preview was assembled as a standalone manual build, not as a controlled execution of the Studio Master Skill and Starter prompts. It therefore cannot prove that the current reasoning, prompts or blueprint independently produced this outcome.

External / approval dependencies:
- Publicly sourced business facts, current prices, operating hours and contact details have not been confirmed by the business owner.
- Real workshop, staff and customer-work photography is not available with verified publication permission.
- The AI concept image can only be treated as illustrative artwork, not business evidence.

Do not change the client brief, Master Skill, platform or shared blueprint on the claim that Experiment #5 exposed a failure. No reproducible failure in those layers has yet been demonstrated.

## 3. Candidate transferable learning

These observations are worth testing in a controlled Starter run, but are **conditional patterns**, not universal page requirements:

- When a service business has source-backed offer variants (for example, vehicle classes) and prices genuinely differ by variant, evaluate a compact comparison/selector. Do not add a selector when the source does not support complete, comparable values.
- Keep the selected variant, displayed price, explanatory label and consultation context synchronized from one structured data source. Avoid duplicating price values across components.
- Distinguish indicative/catalogue prices from confirmed quotes. State what determines the final amount and who confirms it.
- Explain the actual service process, scope boundaries, location/coverage, policies and FAQs where those items answer material buyer questions. These can provide useful trust information without inventing testimonials, ratings or outcomes.
- For a specialist service business, explain how recommendations depend on product/material/condition only when the source supports that method. Do not over-generalize a benchmark-specific phrase such as “by condition, not price.”
- A WhatsApp link is only a handoff. Make the expected response and non-confirmation state explicit; do not imply a booking or form submission has completed.

Do not transfer Star Point-specific facts, prices, class labels, contact details, layout, palette, imagery or brand identity to another client. Do not make the five-class motorcycle selector a universal Starter component.

## 4. Minimal integration proposal

The smallest plausible system-level experiment is to add a **conditional offer-variant pattern** to the Starter Stage 3/4 and implementation/QA prompts:

- IA/content: identify whether customers must choose among genuinely distinct, source-backed variants and whether comparison or guided selection improves a critical visitor task.
- WRP: define the accepted data fields, default/empty state, price status, CTA context and observable behavior for that selector.
- Implementation: keep variant data in one canonical configuration and synchronize all dependent display/CTA values.
- QA: test every variant/state, a default state, mobile interaction, and the truthfulness of price/booking language.

This candidate should not be promoted as a canonical rule until it is run through the actual Studio workflow and checked against at least one materially different category. Do not revise Master Skill v1.11 or add client-input fields based on this one standalone run.

## 5. Regression evidence and decision

| Check | Scenario / category | Result | Evidence / limitation |
|---|---|---|---|
| Original reproduction | Motorcycle treatment class selector | PASS, limited | Two selected classes were checked by the Node interaction harness |
| Relevant regression | Responsive layout / browser interaction | NOT TESTED | Local Chromium navigation blocked by runner policy |
| Different category | Another business category | NOT TESTED | No cross-category claim is made |
| No-fabrication / privacy / permission | AI concept disclosure, noindex, consultation-only flow | PARTIAL PASS | Visible disclosures and code attributes inspected; owner publication approval remains PENDING |

- **Issue resolved:** no system issue is declared resolved.
- **Regressions introduced:** none known; full browser and cross-category regression remain untested.
- **Client-input burden / new dependencies:** none added.
- **Remaining risk:** standalone build has no WRP, owner confirmation, browser-rendered responsive evidence, CI build or experiment-repository website commit.
- **Decision:** **NOT YET PROVEN**.
- **Next action:** run this source packet through the real Studio sequence on an isolated branch: normalize facts → create WRP and customer-question map → approve internal preview scope → create category-specific design/asset plan → build a committed Starter baseline → run real browser/responsive QA. Preserve the screenshot blind-input restriction. Compare the workflow output to this standalone baseline only after the blind baseline has been saved.

## 6. Promotion boundary

This record is evidence and a candidate learning only. It does not change the Master Skill, canonical operating workflow, Starter product gate, product-tier definitions, client-input contract or public release policy. Promote an exact rule only after controlled reproduction, regression evidence and Studio-owner review.
