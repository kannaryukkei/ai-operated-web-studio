# Five-Website Starter Audit

> **Historical comparative audit (2026-11-14):** Findings below are source/QA evidence from the pilot websites at the listed commits. They remain design and quality references, not a current workflow contract. Operating stages, WRP/G0–G7 and mandatory artifacts mentioned in this report are superseded by Master Skill v1.13.

**Audit date:** 2026-11-14  
**Scope:** Four website pilots in `kannaryukkei/kala-coffee-studio` and the current Starter implementation in this repository.  
**Purpose:** Establish the evidence-based content, interaction, and release standard for a sellable Starter product.  
**Method:** Repository source review, pilot retrospectives, documented Playwright/CI results, data/config review, Starter workflow/spec review, and inspection of archived desktop/mobile Playwright screenshots for KALA, SELA, FABLE FORM and RUANG RAPI. Starter was reviewed from source, data configuration, test results and responsive QA documentation; its CI run did not publish screenshot artifacts. Findings are comparative judgments from repository evidence—not user research or production certification.

## Executive decision

**Starter v0.4.0 is a strong portfolio preview, but it is not yet cleared for production client delivery.** It is the most complete of the five as a one-page service-business journey, but its business facts still need owner approval, its proof blocks contain fictional sample data, its WhatsApp destination and social destinations need verification, and its automated test suite is too small for a release claim.

The reusable standard is not “copy the five websites”. It is: understand the business, map the customer questions, choose the category-appropriate visitor journey, publish only approved facts, and prove every important interaction.

## 1. Audit of the four KALA pilots

### Pilot 01 — KALA Coffee Studio
- **Category / task:** Fictional specialty café; understand the concept, explore a sample menu, and decide whether to visit.
- **Structure:** Story, menu, space, gallery, visit details, FAQ.
- **Strongest contribution:** Coherent editorial art direction, clear demo/asset provenance, useful FAQ, strong responsive behavior, and browser-verified images.
- **Evidence:** Production build PASS; Playwright 7/7 PASS; eight tested widths from 320–1440px.
- **Gaps:** Entire business and menu are fictional; no address, hours, live contact, reservation, or conversion endpoint. Visual references are remote Unsplash assets, not actual premises/products. Accessibility, performance, and cross-browser checks remain untested.
- **Decision:** Good visual/storytelling reference; not a business-completeness or conversion reference. It used the v1.2 skill snapshot, not v1.3.

### Pilot 02 — SELA Interior Studio
- **Category / task:** Fictional interior/spatial design studio; assess design approach, explore concepts, understand services/process, and consider an inquiry.
- **Structure:** Studio introduction, filterable concept portfolio, accessible project-detail dialog, services, four-step process, inquiry panel.
- **Strongest contribution:** Category-specific portfolio architecture, project detail depth, filter/dialog interaction, Escape handling, focus containment/restoration, and semantic image review.
- **Evidence:** Production build PASS; Playwright 9/9 PASS; eight tested widths.
- **Gaps:** Projects and imagery are concepts, not completed work; no real inquiry destination. Contrast, full keyboard, performance, cross-browser, and conversion studies remain untested.
- **Decision:** Strong portfolio/journey pattern. Do not reuse its page architecture for service businesses.

### Pilot 03 — FABLE FORM
- **Category / task:** Fictional apparel retail; discover items, search/filter, inspect product details, select variants, and understand a cart subtotal.
- **Structure:** Editorial hero, catalog, search/category filters, product detail dialog, color/size selection, in-memory cart, brand note, demo checkout disclosure.
- **Strongest contribution:** Product-specific interactions and state, accessible detail/cart dialogs, quantity controls, accurate empty states, local generated assets, and explicit refusal to imply a completed purchase.
- **Evidence:** Production build PASS; Playwright 14/14 PASS; eight tested widths.
- **Gaps:** No inventory, persistence, checkout, payment, shipping, or order processing. Product names, images, variants, and prices are fictional. Formal accessibility/performance/cross-browser tests remain untested.
- **Decision:** Strongest interaction and state-management reference for catalog/retail requirements. Cart functionality is not a default Starter requirement.

### Pilot 04 — RUANG RAPI (canonical integrated experiment)
- **Category / task:** Fictional home-organizing/decluttering service; understand services and service area, then consider an initial consultation.
- **Structure:** Approach, four intake-derived service categories, process note, coverage, FAQ, honest contact panel.
- **Strongest contribution:** Human Intake as the sole business-fact source, strict source provenance, truthful handling of missing details, no fabricated contact or submission, and clear separation between preview and live lead capture.
- **Evidence:** Canonical original branch build PASS and Playwright 10/10 PASS; integrated branch CI run 43581352019 records build PASS, Playwright 11/11 PASS, and screenshot artifact upload PASS.
- **Gaps:** No live inquiry endpoint, prices, street address, hours, client-owned proof, or production approval; these were correctly not invented. Accessibility/contrast, performance, cross-browser, and conversion remain untested.
- **Decision:** Best source-discipline and service-intake reference. RAPI RUMAH and SORA Home Care are comparative intake stress cases, not additional complete website implementations.

### Pilot 04 branch comparison and decision

All four branch heads were inventoried and compared. Only two branches contain the RUANG RAPI website source; the other two preserve distinct intake scenarios rather than alternative website builds.

- `pilot-04/integrated-service-business` — **selected integrated baseline**. It contains the consolidated RUANG RAPI website, integration/audit notes and the 11/11 Playwright regression run. This is the branch to treat as the main Pilot 04 reference.
- `pilot-04/ruang-rapi-service-intake` — original complete RUANG RAPI implementation with original intake provenance, a unique intake evaluation and a draft Master Skill v1.3.1 evaluation. The app source is materially the same as the integrated branch; retain this branch for source history and its unique learning documents.
- `pilot-04/rapi-rumah-service-intake` — no website implementation; it preserves a distinct filled intake and service-business brief useful for testing a different business profile.
- `pilot-04/sora-home-care` — no website implementation; it preserves a sparse-intake stress scenario for testing how the workflow handles missing business information.

| Pilot 04 branch | Audited head SHA | Role | Decision |
|---|---|---|---|
| `pilot-04/integrated-service-business` | `d63f1690a4b09bbc114f3d66e4c7b5364459551e` | Consolidated RUANG RAPI implementation, integration record and 11/11 regression evidence | **Keep as integrated baseline** |
| `pilot-04/ruang-rapi-service-intake` | `265a1da6b46d7ea9d0a87bbbef1d1297b11b122c` | Original complete implementation plus unique evaluation/draft skill notes | Keep as source/provenance |
| `pilot-04/rapi-rumah-service-intake` | `b97b249fd5e3ba440463ac092956baa3da950a0d` | Unique intake experiment; no complete website | Keep as intake test case |
| `pilot-04/sora-home-care` | `170034eaafd60597ee0ac1dba951212572893295` | Sparse-input stress experiment; no complete website | Keep as intake test case |

**No branch was deleted.** The original implementation branch still contains useful provenance and evaluation notes, while the two intake-only branches preserve non-duplicated test scenarios. The connected GitHub actions also do not expose a branch-delete operation. A future archive/delete proposal would need to retain the original intake, evaluation and commit provenance first; deletion is not required for the current product decision.

## 2. Audit of Starter v0.4.0 in this repository

### Source reconciliation

The Starter content was cross-checked against the audited ZACKS source branch:

- `Frontend/src/data/catalog.js` — static catalog, classes, prices, add-ons, FAQs, and public settings.
- `Backend/zacks-backend/database/seeders/CatalogSeeder.php` — Laravel catalog seed data.
- `Frontend/src/site/content.js` — process steps, area notes, price disclaimer, and class guidance.

**Result:** the Starter package prices, vehicle classes, core inclusions, add-on starting-price basis, WhatsApp number, service areas, base location, Instagram/TikTok destinations, and core process match the checked-in frontend fallback and Laravel seeder. The Starter wording was simplified where helpful; for example, the motor Signature feature now reads “Jok dengan pembongkaran”.

The Starter FAQ now contains 12 unique questions and includes the important consultation-versus-confirmed-booking clarification. Coverage and preparation questions are also answered by the page sections.

**Remaining limitation:** the repository's live Laravel database/API state was not queried. The checked-in catalog and seeder agree, but production data may have changed independently. Verify the live catalog and public destination ownership before a production launch.

### What is already strong

- A clear home-service proposition: detailing comes to the customer's location.
- Customer self-identification by vehicle type and class, with class-dependent package pricing.
- Core packages, additional treatments, starting-price notes, and pricing caveats.
- A need-led Care Finder that helps visitors choose a starting point.
- Differentiators, a four-step process, service areas, and home-service preparation requirements.
- A consultation form that opens a prefilled WhatsApp message and states that the website does not store data or confirm a booking.
- 12 unique FAQs, contact/WhatsApp CTAs, social destinations, and photo credits.
- Responsive one-page layout and a static-first architecture without an unnecessary backend.

### Release gaps

| Priority | Gap | Why it matters | Required action |
|---|---|---|---|
| P0 | Business/catalog facts are from an audited frontend fallback catalog, not confirmed current live Laravel values | Incorrect services/prices/terms undermine customer trust and create commercial disputes | Reconcile current owner-approved offers, prices, inclusions, exclusions, service areas, contact and policies before production |
| P0 | WhatsApp number and social URLs are present in public config but are not verified by current Starter tests | A dead or incorrect CTA loses leads or routes customers to the wrong place | Verify destination ownership and test every public CTA/message end-to-end |
| P0 | Fictional customer stories and demo metrics are shown in the portfolio build | The demo label is clear, but these must never be mistaken for actual proof on a client site | Keep behind explicit demo mode; production mode must use approved proof or omit these blocks |
| FIXED | Navigation now says “Konsultasi” and exposes the actual process and service-area sections; the interaction remains explicitly a consultation, not a booking | Avoids implying a booking workflow that does not exist | Implemented in the audit branch |
| FIXED | Care Finder now labels package estimates as “ACUAN MULAI · KELAS S” | Prevents visitors misreading a class-S price as a universal vehicle price | Implemented and covered by Playwright |
| FIXED | Date minimum now uses the browser-local calendar date | Avoids off-by-one dates around UTC boundaries | Implemented and tested in Asia/Jakarta timezone |
| PARTIAL | Playwright suite is now 15/15 PASS on Chromium and covers more customer tasks, but remains a Chromium smoke suite | Automated behavior tests do not prove factual validity, accessibility, performance, cross-browser behavior, or real conversion | Extend quality gates before production release |
| P1 | External Unsplash hotlinks are production dependencies | Remote image failures, changed URLs, and third-party latency can degrade a live site | Prefer approved/local optimized assets; verify loading, relevance, alt text, credits, and responsive crops |
| P2 | Operational policies are not all represented (e.g. rescheduling/cancellation or payment options) | These matter only when the business has an approved policy and customers need to know it | Capture these during discovery; publish only where relevant and owner-approved |
| P2 | No formal contrast/accessibility, cross-browser, or performance evidence | Current CI proves a narrow Chromium smoke suite, not release quality | Add accessibility/contrast, keyboard, metadata, performance, and at least one additional browser review |

### Technical issues addressed in the audit branch

- Care Finder package price now explicitly identifies its class-S basis.
- Date input minimum now follows the browser-local calendar date; Asia/Jakarta regression test passes.
- Navigation now describes the real customer journey and labels the contact action as consultation, not booking.
- Portfolio-only sample stories and demo metrics are now restricted to `site.contentMode === 'portfolio-demo'`; switching to `client-production` omits these simulated proof sections and the portfolio-only footer label.
- Hero and approach imagery alt text now clarifies that images are visual references, not ZACKS customer-work documentation.
- Mobile navigation now closes with Escape; a skip-to-content link targets a focusable main landmark; visible keyboard focus styling is added.
- Three accidentally duplicated FAQ entries were removed; the 12 remaining questions are unique, and Playwright now checks both count and uniqueness.
- Playwright currently contains 15 tests: 12 baseline interaction/content tests plus two keyboard-navigation tests and one image-loading/alt-text test. The duplicate-FAQ regression was corrected; production build and Playwright 15/15 now PASS on run 43588644994 (commit `2c687401aa2d104c28360d70f7d763e9989215c9`). Owner approval, destination ownership, formal accessibility audit, performance and cross-browser validation remain outstanding.

## Visual and experience review

The archived browser evidence supports the source-level review:

| Website | Desktop/mobile review | Visual and UX assessment | Remaining release limitation |
|---|---|---|---|
| KALA Coffee | Both screenshot sizes inspected | Strong editorial hierarchy, expressive serif typography, warm palette, consistent photography and clear menu/visit rhythm; mobile sections stack cleanly | Fictional venue and menu; remote Unsplash assets; no real visit/reservation destination |
| SELA Interior | Both screenshot sizes inspected | Premium portfolio presentation, deliberate asymmetrical project grid, clear service/process narrative and readable mobile stacking | Concept projects and reused stock imagery are not real client proof; no real inquiry destination |
| FABLE FORM | Both screenshot sizes inspected | Strong product editorial, clear catalog hierarchy, useful search/filter controls and responsive two-column mobile product grid | Product data and prices are fictional; cart is illustrative and no orders/payments are processed |
| RUANG RAPI | Both screenshot sizes inspected | Strongest restrained service-business visual system; service selection, process, coverage and FAQs form a coherent journey; mobile hierarchy remains clear | Contact state honestly says not configured; no real inquiry lead can be sent |
| ZACKS Starter | Source/data/test/QA review; screenshot artifact not present in run 43588644994 | Richest one-page local-service journey: vehicle/package choice, price guidance, Care Finder, process, coverage, FAQs and consultation handoff | Portfolio demo; owner approval, CTA ownership, asset permission and production-mode checks remain outstanding |

The visual distinction between the four pilots is purposeful and should remain category-specific. A screenshot that looks polished does not establish that the business facts, rights, conversion endpoint or operational promise are real. In particular, the FABLE cart is not a store checkout, RUANG RAPI's contact panel is not a functioning lead form, and concept portfolio imagery must not be presented as completed client work.

**Cross-pilot quality boundary:** the four pilot screenshot sets show coherent desktop/mobile art direction, while their browser tests cover the documented responsive widths. Neither this visual inspection nor Playwright proves WCAG conformance, measured Core Web Vitals, Lighthouse performance, SEO ranking, cross-browser consistency or real conversion. Those checks remain release gates rather than assumed passes.

## 3. Comparative lessons across all five websites

| Reusable lesson | Best evidence | How Starter should apply it |
|---|---|---|
| Distinct brand point of view and coherent visual storytelling | KALA, SELA, FABLE FORM | Build an art direction specific to the client's business; do not reuse a single landing-page skin |
| The page should follow the visitor's actual decision journey | All four pilots | Derive section order from audience, offer, objections, and next action |
| Product/service details need enough depth to support a decision | FABLE FORM, ZACKS Starter | Explain choices, inclusions, price method, options/variants, and relevant caveats |
| Interactions must reflect the business category | SELA, FABLE FORM, ZACKS Starter | Add only useful interactions; do not import filters, carts, or selectors without a business reason |
| Every public claim needs source provenance | RUANG RAPI, KALA, FABLE FORM | Track each fact and asset as approved, illustrative, assumed, missing, or blocked |
| A CTA must do exactly what the page says it does | RUANG RAPI, FABLE FORM, ZACKS Starter | Test the actual destination and never imply a saved lead, confirmed appointment, order, or payment without a working integration |
| Automated tests and human visual/content review are complementary | All pilots | Test behavior and content integrity; separately review design, image relevance, and accessibility |
| A preview can be complete while production release remains blocked | RUANG RAPI, KALA, FABLE FORM | Separate preview readiness, client approval, and production readiness |

## 4. Starter product standard

Starter is a **complete one-page business website**, not a fixed list of mandatory sections. It must answer the relevant questions a customer has before acting:

1. What does the business provide, for whom, and what outcome can the customer reasonably expect?
2. What options are available, what is included/excluded, and how is the price determined?
3. How does the customer choose the right option?
4. What makes the business credible? Use real approved proof or transparent alternatives—not invented testimonials or metrics.
5. What happens after the customer contacts the business?
6. Where does the business operate, when is it available, and what should the customer prepare?
7. What policies or limitations could change the customer’s decision?
8. What is the next action, where does it lead, and what should the customer expect after clicking?

For each relevant question, the content plan must mark **ANSWERED**, **NOT APPLICABLE (reason)**, or **BLOCKED (owner/action)**. Missing information is not permission to invent copy.

## 5. ZACKS customer-question coverage

Starpoint Garage is used as a **completeness benchmark**, not as a visual template or source of ZACKS facts. The useful standard is to explain customer choices, treatment scope, pricing/time expectations where known, service process, trust evidence, and what happens after an inquiry. The category-specific adaptation is recorded in `docs/competitive-copywriting-patterns.md`.

| Customer question | Starter coverage | Status |
|---|---|---|
| What does ZACKS do and where does it come to me? | Home-service detailing for cars and motorcycles; Surabaya, Sidoarjo, Gresik; Wonorejo base | ANSWERED |
| What services/packages can I choose? | Six vehicle-specific packages plus four additional-treatment groups | ANSWERED |
| What is included? | Package feature lists and treatment descriptions | PARTIAL — explicit exclusions are not comprehensively documented |
| How do I choose the right option? | Vehicle class guide and Care Finder recommendation | ANSWERED |
| How much does it cost? | Class-based package prices and add-on starting-price notes; final scope/price confirmed before work | ANSWERED, subject to current owner-approved catalog verification |
| What makes the service trustworthy? | Need-based recommendations, scope/price approval before work, customer inspection before payment, transparent process | PARTIAL — no verified public reviews or completed-work gallery supplied; demo stories/metrics are hidden outside portfolio-demo mode |
| What happens after I send the form? | WhatsApp message is prepared; no data is stored by the site; admin reply and agreement are required before booking | ANSWERED |
| When should I contact the business? | H-1 consultation recommended; same-day request may be discussed subject to confirmed availability | ANSWERED |
| Where can I request service and could travel fees apply? | Three service areas; location and availability checked; Gresik travel fee may apply | ANSWERED |
| What must I prepare? | Water, electricity, safe parking/workspace, and roughly one metre around a car | ANSWERED |
| When and how do I pay? | Payment timing is stated as after work and customer inspection | PARTIAL — payment methods are not specified |
| What are opening hours / live available slots? | Not published; admin confirms availability | BLOCKED — owner decision if public hours or live availability are needed |
| What are cancellation, rescheduling, warranty, or damage policies? | No approved policy found in the audited source | BLOCKED — obtain owner-approved policy or mark not applicable |
| How long does each treatment take? | No verified duration in the audited source | BLOCKED — do not invent estimates |
| Are the public WhatsApp and social destinations correct? | Starter values match the audited source config and CTA tests verify the configured WhatsApp number | PARTIAL — destination ownership, account activity, and response handling still need owner verification |
| Are all images approved for live use? | Images load, have alt text, and are credited as visual references | PARTIAL — approve stock licensing/use or replace with approved/generated assets before launch |

This map is the content completeness gate: do not add filler sections to hide blocked facts. Resolve each BLOCKED item with an owner decision or an explicit not-applicable reason before production.

## 6. Decision and next sequence

**Current Starter status: CONDITIONAL — technically improved portfolio preview; not yet cleared for live-client production or a “sellable” release claim.** Latest validation: Vite production build PASS and Playwright 15/15 PASS on Chromium (run 43588644994; tested code commit `2c687401aa2d104c28360d70f7d763e9989215c9`). The site now has 12 unique FAQs, including the booking-confirmation clarification sourced from the audited ZACKS catalog. Browser tests verify FAQ uniqueness, image loading/alt text, responsive behavior, and the main consultation journey.

Order of work:
1. Keep all four Pilot 04 branches. Use `pilot-04/integrated-service-business` as the integrated baseline while retaining the original RUANG RAPI implementation and both intake experiments as provenance/test evidence.
2. Continue hardening Starter against the remaining gaps; the first seven technical/content guard improvements are implemented and CI-verified.
3. Reconcile the ZACKS demo against owner-approved/current business facts and asset permissions.
4. Expand QA and review the actual desktop/mobile rendered site.
5. Complete the Starter acceptance gate: factual approval, conversion integrity, customer-question coverage, visual/accessibility/performance QA, real-client validation, delivery economics, and handover.
6. The evidence-based production standard and manual discovery workflow may be updated from audit findings before commercial release; keep the actual Starter production/sales claim gated by `STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md`. Do not begin Business or Custom before Starter acceptance.

## Evidence references

- KALA Pilot 01: CI run 43565483194; `docs/organic-run/07-qa-results-and-retrospective.md`; `docs/organic-run/08-benchmark-review.md`.
- SELA Pilot 02: CI run 43568321691; `docs/organic-run/08-qa-results-and-retrospective.md`; `docs/organic-run/09-cross-pilot-comparison.md`.
- FABLE FORM Pilot 03: CI run 43574296177; `docs/organic-run/08-qa-results-and-retrospective.md`; `docs/organic-run/09-cross-pilot-comparison.md`.
- RUANG RAPI Pilot 04: CI run 43580340950; integrated CI run 43581352019; `docs/organic-run/10-pilot-04-branch-audit.md`; `docs/organic-run/11-integrated-pilot-04-plan.md`.
- ZACKS Starter: `docs/product-specification.md`; `docs/source-audit.md`; `docs/competitive-copywriting-patterns.md`; `docs/starter-responsive-qa.md`; `starter/README.md`; `starter/src/App.jsx`; `starter/src/data/zacks-site.js`; `starter/tests/responsive.spec.js`.
