# KALA Pilot Learnings — Reusable Production Rules

> **Historical pilot evidence:** Branch SHAs and Master Skill versions below document the conditions under which each pilot was run. They are provenance/history, not current operating instructions. Apply reusable quality lessons through Master Skill v1.13; do not recreate old stages, artifact requirements or approval machinery.

**Purpose:** retain the repeatable engineering, content, design and QA lessons from every useful branch of `kala-coffee-studio` without carrying fictional client identities or treating each pilot website as a universal skin.

## 1. Source inventory and evidence

| Experiment | Source branch / head | Website evidence | Reusable contribution |
|---|---|---|---|
| Repository operating baseline | `main` · `f5f173a516d7ccc56d81a8448b029f479d8c88d0` | README-only branch; no website implementation or test suite. | Defines the pilot's fictional/demo boundaries, static-first rule, no fake booking/contact/address/hours/testimonials, and requirement for build, responsive, accessibility and visual review. Retain as operating constraints, not as a product implementation. |
| Pilot 01 — KALA Coffee | `pilot/organic-master-skill-run` · `8bf87e662639274459201918e8640521ca5cc0e7` | Build PASS; Playwright 7/7 (run 43565483194). Used Master Skill v1.2, not direct v1.3 evidence. | Editorial brand storytelling, asset provenance, browser verification, no-fabrication for fictional operations. |
| Pilot 02 — SELA Interior | `pilot-02/sela-interior-studio` · `115f842637b36adeb475e19d410f1fc064545f09` | Build PASS; Playwright 9/9 (run 43568321691). | Portfolio discovery, project filters, accessible detail dialog, focus handling, semantic image/caption review. |
| Pilot 03 — FABLE FORM | `pilot-03/fable-form-retail` · `287d84f5cb320e67e588758fbf194c23cea56da8` | Build PASS; Playwright 14/14 (run 43574296177). | Retail search/filter, variant-aware cart state, quantity/subtotal derivation, safe demo checkout boundary, local concept assets. |
| Pilot 04 — RUANG RAPI integrated | `pilot-04/integrated-service-business` · `d63f1690a4b09bbc114f3d66e4c7b5364459551e` | Build PASS; Playwright 11/11; evidence run 43581352019. | Canonical service-business implementation, source-traceable facts, honest contact-not-configured state, regression tests for fabricated details. |
| Pilot 04 — RUANG RAPI intake source | `pilot-04/ruang-rapi-service-intake` · `265a1da6b46d7ea9d0a87bbbef1d1297b11b122c` | Contains intake evaluation and Master Skill v1.3.1 candidate; not the frozen v1.3 website input. | Public CTA/contact must be distinct from project-coordination contact; one minimal intake field solves a real blocker. |
| Pilot 04 — RAPI RUMAH intake | `pilot-04/rapi-rumah-service-intake` · `b97b249fd5e3ba440463ac092956baa3da950a0d` | Intake and production records; no implementation-complete website or verified browser run in this branch. | Explicit form acceptance and exclusions; internal coordination email is not a public lead destination; budget/timeline are not public website facts. |
| Pilot 04 — SORA Home Care intake | `pilot-04/sora-home-care` · `170034eaafd60597ee0ac1dba951212572893295` | Sparse-input stress scenario; no implementation-complete website or verified browser run in this branch. | Missing price, address, hours, service inclusions, approver and public contact remain missing; sparse input must not trigger invention. |

All eight KALA repository branches (default `main` plus seven pilot branches) were inventoried. The `main` branch is README-only and contributes operating constraints, not implementation. The four Pilot 04 branches are not equivalent implementations. RUANG RAPI integrated is the only complete implementation baseline. RAPI RUMAH and SORA contribute intake and negative-regression scenarios only. Do not merge their client facts.

## 2. Rules that generalize across business categories

### 2.1 Reuse the production method, not the website structure
- Start from the customer's buying/visitor journey, not a fixed section list.
- Make category-specific information architecture and art direction decisions.
- Keep the shared sequence: intake validation → business understanding → scope → content/CTA map → art direction/assets → base implementation → refinement → independent QA → approval/release.
- Preserve the successful base. Use **Base → Refine → QA**, rather than regenerating the whole website for every review.
- A benchmark indicates the level of craft and usefulness to reach; it does not authorize copying its identity, facts, page structure or irrelevant features.

### 2.2 Maintain a traceable source of truth
- Treat the approved client brief and approved assets as the only source of client-specific facts.
- Classify each material fact and asset by source, confidence/approval status and intended public use.
- Keep project coordination contacts separate from public visitor-facing contact details.
- Record every CTA's label, exact destination, approval status and expected post-click behavior.
- A missing public endpoint blocks live conversion, not a truthful preview. Show a contact-not-configured state rather than inventing a number, link or form.
- Do not mix names, prices, locations, claims, contacts, service details or imagery between fictional pilots.

### 2.3 Image QA must test meaning, not just loading
- Every meaningful image needs a relevant title/caption/alt text, source/owner, permission status and intended use.
- Browser load success is necessary but not sufficient: a loaded residential image can still be wrong for a café/project card; a campaign hero should not silently reuse an unrelated product-card image.
- Prefer approved client-owned assets; otherwise use approved generated, licensed or designed concept visuals with honest disclosure.
- Prefer optimized local assets for production. Remote image URLs must be tested at the exact destination and carry a dependency/rights record.
- Keep desktop/mobile screenshot evidence and inspect image-to-copy correspondence manually.

### 2.4 Independent browser evidence is mandatory
- Run the actual production build and browser suite; source inspection is not a substitute.
- Check responsive behavior at 320, 360, 390, 640, 768, 1024, 1280 and 1440px (and other project-specific widths where useful).
- Check all images, navigation, links, CTAs, primary interactions, empty/error states and no-fabrication guards.
- Save desktop/mobile screenshots as evidence.
- Every QA item is PASS / FAIL / NOT TESTED. A passing build or a single Chromium suite does not certify accessibility, contrast, performance, cross-browser behavior, user conversion or production readiness.

## 3. Category-specific patterns — conditional, never mandatory

| Business need | Pattern worth reusing | Guardrail |
|---|---|---|
| Brand-led F&B / hospitality (KALA) | Editorial brand story, menu/product narrative, atmosphere, visit details and calm visual rhythm. | Menu, location, hours, provenance and operational claims need approved facts; never invent a real venue or opening hours. |
| Portfolio / project-led services (SELA) | Project categories/filters, project detail, services/process and focused inquiry path. | A dialog must support Escape, move focus into the dialog, contain keyboard focus while open, and restore focus to the trigger. Project imagery/outcomes must be genuine or clearly marked as concept work. |
| Retail / product catalog (FABLE FORM) | Product search and category filters, product details, variant selection and client-side cart state. | Product + chosen variant define cart-line identity; quantity/subtotal derive from current state; require valid variants; empty state works; non-persistent demo cart resets on refresh; checkout remains disabled until real approved order/payment integration exists. |
| Local services (RUANG RAPI) | Offer scope, customer journey, process, service coverage, FAQs and honest contact state. | Do not infer service inclusions, prices, operating hours, credentials or lead delivery. A preview can proceed while live contact remains blocked. |
| Service package selection (ZACKS Starter) | Guided offer selection, price logic, add-on explanation, preparation, process, FAQ and consultation composer. | Automotive vehicle/class logic is not generic. Reuse only when the client's offers actually require comparable choices; never copy ZACKS facts, WhatsApp number, image references or demo proof. |

## 4. Pilot-specific defects converted into regression checks

- KALA: verify exact image URLs in a real browser; assert all informative images load and have meaningful alt text.
- SELA: verify image relevance against its paired project label; verify keyboard focus entry/containment/restoration and Escape behavior in dialogs.
- FABLE FORM: test search together with filters; valid variant selection before add-to-cart; same product+variant increments one line; quantity/subtotal; remove-last-item empty state; checkout cannot claim an order.
- RUANG RAPI: assert only intake-derived services/coverage appear; reject invented phone/email/WhatsApp/booking endpoints, unsupported business claims and cross-pilot contamination.
- RAPI RUMAH: assert any demo form says clearly that it does not send/store data; internal coordination email is not rendered as public contact.
- SORA: run sparse-input checks with missing service details, price, address, hours, approver and public contact to ensure the website does not fill them with plausible guesses.

## 5. Evidence limits

The pilots provide useful evidence for four categories and suitable static one-page scopes. They do **not** prove:
- multi-page/CMS architecture;
- production booking, CRM, order, inventory, payment or shipping integrations;
- formal accessibility or contrast conformance;
- Lighthouse/Core Web Vitals or slow-network performance;
- Firefox/Safari or broad cross-browser behavior;
- real customer usability or measurable lead conversion;
- commercial profitability or delivery-time estimates for a real client.

Report these as NOT TESTED / NOT PROVEN until separately measured.

## 6. What must not become shared defaults

- KALA/SELA/FABLE/RUANG/RAPI/SORA/ZACKS names, prices, menus, service inclusions, locations, addresses, contacts, testimonials, metrics and policies.
- A universal visual skin or fixed one-page section order.
- Retail/cart, dialog, booking, form, pricing selector or other interactions that the client's real journey does not need.
- External image URLs copied without independent URL, rights and semantic verification.
- Any feature that only exists to make a demo look more technically complex.

**Operating decision:** no new pilot is needed before using these learnings. Use the evidence as reusable standards and regression scenarios; future production projects are client-specific repositories, and only repeatable system-level improvements return to this blueprint or Master Skill.
