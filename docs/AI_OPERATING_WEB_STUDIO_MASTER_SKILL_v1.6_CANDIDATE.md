# AI-Operated Web Studio — Master Skill
Version: v1.6 CANDIDATE
Status: Updated from the five-website audit. v1.3 remains immutable; v1.4 and v1.5 remain preserved as historical candidates.

## Mission

Turn verified business knowledge into a complete, useful, distinctive website that helps customers understand, compare, trust and take the next step. Design quality matters, but visual polish cannot compensate for missing business information.

## Evidence from five audited websites

Use the five completed website audits as evidence, not as five skins to copy:
- **KALA Coffee:** coherent editorial art direction and brand storytelling; use when a brand needs atmosphere and product narrative.
- **SELA Interior:** project discovery, case-detail depth, accessible dialog and portfolio navigation; use for project-led businesses.
- **FABLE FORM:** product search, filters, variants and cart-state patterns; only use transactional interactions when catalog, inventory and checkout behavior are real and in scope.
- **RUANG RAPI:** traceable intake facts, honest missing-contact states and strict separation of client identities; use for local services and any project with incomplete public information.
- **ZACKS Starter:** a complete local-service decision journey with offer comparison, guided selection, process, coverage, FAQs and an honest WhatsApp consultation path; use as the Starter service-business reference, not as a universal layout.

Source audit: `../blueprints/starter/template-kit/docs/five-website-starter-audit.md`. Full cross-pilot rules and source SHAs: `../blueprints/starter/KALA_PILOT_LEARNINGS.md`. The Starter reference is a technically validated ZACKS portfolio preview, not a production-certified or universal client website. Never copy fictional facts, assets, testimonials, pricing or contact data between pilots.

## Non-negotiable rules

1. The approved client brief and approved assets are the only source of client-specific facts.
2. Classify material facts: VERIFIED, CLIENT-PROVIDED-UNVERIFIED, APPROVED-FOR-PUBLICATION, DEMO-ONLY, ASSUMPTION or MISSING.
3. Never invent prices, inclusions, contacts, locations, hours, staff, credentials, testimonials, ratings, guarantees, policies, outcomes, stock, availability or operational claims.
4. Keep internal project contacts separate from public contact endpoints.
5. Every CTA must lead to a real approved destination or an explicit honest unavailable/demo state. Never fake submission, booking, storage or success.
6. Missing information must be surfaced as a gap with owner/source; it is not permission to fabricate.
7. Use the simplest stack that meets approved business scope. Static-first by default; backend/CMS/accounts/payments/integrations require a demonstrated business need and approval.
8. Preserve successful work through Base → Refine → Independent QA. Do not regenerate from scratch without a documented reason.
9. Use benchmarks for quality and customer-information patterns, not for copying brand identity, unsupported claims or irrelevant features.
10. Save stage outputs, decisions, provenance and test evidence in the project repository.
11. Distinguish preview readiness from production readiness.
12. Do not publish, spend money, change DNS, send external messages or transfer ownership without explicit authorization.

## Stage 0 — Intake validation

- Read the current brief, source links, assets and prior project decisions.
- Classify material facts and record provenance.
- Separate public information from internal commercial/project notes.
- Identify business category and applicable conditional module.
- Produce a missing-information list with severity and owner.
- Ask only questions that materially affect the customer journey, factual accuracy, tier, price or implementation. Batch questions; do not ask the client to write copy.
- Output: normalized brief, field-level fact register, source register, asset/permission register, critical gaps, public CTA/contact map.

## Stage 1 — Business intelligence (new mandatory stage)

Before choosing a layout or writing copy, understand the business.

Produce:
1. **Business model summary:** what is sold, to whom, where, how customers buy, and how the business delivers.
2. **Audience and jobs-to-be-done:** primary segments, intent, needs and selection criteria.
3. **Offer matrix:** category, item/package, variants, inclusions/exclusions, price logic, best-fit customer, availability/source.
4. **Buying objections:** common doubts, risks, comparisons and reasons customers delay.
5. **Customer journey:** discovery → evaluation → inquiry/order → delivery/service → aftercare/repeat.
6. **Operations and policies:** process, preparation, lead time, service area/delivery, payment, cancellation, return, warranty or aftercare where relevant.
7. **Trust register:** real proof, credentials, reviews, portfolio, process evidence and claims requiring approval.
8. **Competitive context:** what alternatives customers compare; distinguish verified differentiators from assumptions.
9. **Content gap register:** unanswered customer questions, missing evidence, owner and next action.

Do not invent missing answers. Use client-provided links and material where available; research can add context but cannot silently override the client's facts.

Output: Business Intelligence Summary, Offer Matrix, Customer Question Map, Buying Journey, Trust Register, Content Gap Register.

## Stage 2 — Tier recommendation and scope

Recommend based on business complexity and visitor tasks, not budget alone or page count alone.

- **Starter:** one primary audience/offer journey can be served completely on one page.
- **Business:** distinct customer journeys, many categories, detailed decision support, multiple locations, substantial proof/content or page-level SEO justify separate pages.
- **Custom:** a real need for persistent data, user roles, transactions, integrations, or bespoke operational workflows.

State included scope, exclusions, dependencies, content responsibilities, third-party costs and maintenance owner. Never upsell features without a business reason.

## Stage 3 — Customer questions and information architecture

Create a Customer Question Map across:
- Before choosing: what is offered, who it is for, price, differences, fit, proof, location/availability.
- Before contacting/ordering: how it works, what to prepare, timing, policies, payment, what happens next.
- After purchase/service: delivery, care, support, warranty, repeat purchase or next step.

Map every critical question to a specific page/section and source. Mark gaps. Do not add filler sections.

Build:
- Visitor journeys and conversion paths.
- Sitemap or one-page section sequence.
- Navigation and contextual CTA plan.
- Internal linking and page-specific SEO plan for Business.

Output: Customer Question Map, sitemap/section map, CTA map, content outline.

## Stage 4 — Content and conversion

- Write customer-facing copy from the approved fact register.
- Explain products/services sufficiently for a visitor to compare and choose.
- Include pricing or explain the verified pricing method.
- Make scope, inclusions/exclusions and limitations clear.
- Explain the process and next step.
- Use FAQs to answer actual customer questions, not generic filler.
- Use genuine evidence. If none exists, emphasize transparent process, detailed explanations and verifiable standards rather than fake testimonials.
- Every CTA must state what happens after the click.
- Demo metrics, sample stories and concept visuals are permitted only in clearly labelled portfolio/demo contexts.

Output: copy deck, product/service content, FAQs, factual approval list, CTA behavior register.

## Stage 5 — Creative direction and implementation

Follow docs/WEBSITE_IMPLEMENTATION_STANDARD_v1.0.md for design tokens, category-specific patterns, static-first architecture, asset handling, accessibility, SEO and technical implementation. The standard is a guardrail, not a fixed visual template.

- Define business-specific visual direction, image language, hierarchy, typography, layout rhythm and interactions.
- Make the website feel populated by useful content and purposeful imagery, not empty space or repeated card grids.
- Use customer/product/project visuals where available. If missing, use approved generated, licensed or designed concept assets and label them honestly.
- Build a complete implementation within approved tier scope.
- Keep content/data separate from presentation when it materially improves maintainability.
- Include semantic structure, responsive composition, keyboard behavior, focus states, reduced motion, useful alt text, metadata and favicon.

Output: implemented site, content/asset register, implementation notes and limitations.

## Stage 6 — Refinement

Review two dimensions independently:
1. **Visual quality:** hierarchy, typography, imagery, composition, responsive behavior, consistency and interaction polish.
2. **Business completeness:** can the intended visitor understand the offer, compare options, trust the business, know what happens next and take the right action?

Prioritize critical missing information above decorative polish. Do not approve a visually attractive but commercially confusing website.

Output: refined site, issue register, content gaps resolved/deferred, change log.

## Conditional category interaction contracts (evidence-backed)

Apply only when the approved business journey requires the pattern. These are regression rules, not a feature checklist to add to every site.

- **F&B / brand-led hospitality (KALA):** tell a distinct brand/product story and answer menu, visit and ordering questions. All prices, menu items, venue details, hours, dietary information and sourcing claims need a source and publication approval. Do not invent a venue or local business facts.
- **Portfolio / project-led services (SELA):** support project discovery and meaningful case detail. Any dialog must close with Escape, move focus inside on open, keep keyboard focus within while open, and restore focus to its trigger on close. Image relevance must match the project title/category/caption, not merely load successfully.
- **Retail / catalog (FABLE FORM):** if a demo cart is justified, search and category filter should compose correctly; require a valid product variant before adding; identify cart lines by product plus selected variant; derive quantity and subtotal from current state; test remove-last-item and empty state. State must be labelled temporary/non-persistent if it resets on refresh. Checkout/order/payment remains disabled until a real approved integration exists. Product images and campaign images must be semantically distinct when their roles differ.
- **Local services (RUANG RAPI):** show service scope, process, coverage, real customer questions and a truthful CTA. If no public contact destination is approved, use a contact-not-configured state; do not substitute an internal coordination contact or invent service details.
- **Local-service offer selection (ZACKS Starter):** a guided package finder, comparison, add-on explanation, coverage, preparation and FAQs can strengthen a local-service decision journey. Automotive vehicle classes, prices, WhatsApp number, imagery and brand interactions are client-specific; never treat them as default components for other categories.
- **Sparse intake (SORA):** explicitly test missing prices, inclusions, public contact, address, hours, named approver and proof. Keep each missing field missing; a plausible guess is still a fabrication.
- **CTA/form integrity (RAPI RUMAH):** internal project contact and public conversion destination are separate data. A demo form must disclose that it neither sends nor stores data. Budget and timeline stay internal unless explicitly approved for publication.

Across all categories, reuse the method (source traceability, Base → Refine → QA, visual + business completeness review, browser evidence), never a fixed design skin or irrelevant features.

## Stage 7 — Independent QA

Run actual production build and browser tests; source inspection is not browser evidence.

### Functional and responsive
- Build, routes, navigation, mobile menu, forms/controls and all CTAs.
- No broken links, false success states, fake booking or fake storage.
- No horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px where supported.
- All images load; verify natural dimensions and truthful captions.
- Desktop and mobile screenshots saved as evidence.

### Business completeness (new required gate)
For every relevant customer question, mark:
- ANSWERED — clear and supported by evidence.
- GAP — important answer missing; owner/action recorded.
- NOT APPLICABLE — reason recorded.

Check at minimum:
- What is sold and who it is for.
- Options/categories and how to choose.
- Price or pricing method.
- Inclusions/exclusions and limitations.
- Why trust this business (real evidence or transparent process).
- Location, coverage, delivery or availability.
- Process and what happens next.
- Policies/preparation/aftercare where relevant.
- Real contact/conversion destination.
- FAQs for major objections.

A GAP may be accepted for a preview only when clearly disclosed; it cannot silently pass as complete production content.

### Integrity and technical
- Every material public fact has a source, evidence status and publication approval; every asset has provenance, permission status and intended use.
- Every CTA is listed with its exact destination, approval status and expected post-click behavior.
- Every customer question is marked ANSWERED, GAP or NOT_APPLICABLE, with evidence or an owner/action.
- No invented claims, contacts, testimonials, metrics or customer evidence.
- No cross-project contamination.
- Keyboard/focus/semantics, contrast, labels, alt text and reduced motion.
- SEO/social metadata, console/network errors, image weight and basic performance.
- Every check PASS / FAIL / NOT TESTED. Never claim untested accessibility, performance, cross-browser, conversion or production readiness.

## Stage 8 — Release and handover

Prepare preview, revision register, launch checklist, rollback plan, handover notes, asset/service register and known limitations. Confirm client approval and release permissions.

## Required completion record

For each stage: status, inputs/sources, fact classifications, decisions/assumptions, artifacts/files, tests/evidence, unresolved risks/approvals and next owner/action.

## Definition of done

The website is visually coherent **and** business-complete for its tier: the visitor can understand the offer, make an informed choice, trust traceable evidence, know what happens next and reach an honest working action. Technical QA, client approval, commercial fit and production release are recorded separately. Starter must pass docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md before it is described as ready to sell.
