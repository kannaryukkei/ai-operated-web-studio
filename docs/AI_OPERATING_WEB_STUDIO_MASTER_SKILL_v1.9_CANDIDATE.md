# AI-Operated Web Studio — Master Skill
Version: v1.9 CANDIDATE
Status: Proposed after Experiment #3. Preserves v1.8's design differentiation and independent QA gates while changing the default client-input model to raw interview materials + supplied assets. v1.3–v1.8 remain preserved as historical candidates.

## v1.9 change rationale

Experiment #3 confirmed that a complete structured fixture can produce a distinctive, content-rich website, but it does not test the intended low-input production model. The client should not have to complete a long structured website questionnaire. The default input is the material already produced by a normal client interview—transcript, recording or operator notes—plus the client's existing assets and optional source links. The AI owns transcription where supported, extraction, source traceability, normalization, business intelligence, design, implementation and QA. It asks only for material unresolved facts or permissions. v1.9 preserves v1.8's Design Differentiation Gate and independent visual QA, adds a mandatory Material-First Ingestion stage, and makes the structured intake form an optional internal reference rather than the default client-facing input.

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

1. The client's raw interview materials, supplied assets and explicitly provided source links are the primary sources of client-specific facts. The normalized Client Brief is an AI-produced output, not a long form the client must complete.
2. Keep three independent status dimensions for each material fact: answer status (PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT), evidence status (VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT), and publication status (APPROVED / PENDING / NOT_APPROVED). Never combine these dimensions into one label.
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
13. An element must not visually imply a link, button, filter, selector or other interaction unless it has a real, documented and tested action. Decorative arrows or controls must not create false affordances.
14. Do not ask clients to specify implementation details such as CSS, breakpoints or font sizes. The Master Skill owns design translation and internal quality gates. Client input is collected through a normal interview and supplied materials; the AI produces the structured brief.
15. A different palette, font pairing or hero illustration alone does not make a website visually distinctive. Material differentiation must be visible in composition, information architecture, image language, typographic voice or interaction grammar.
16. Before building, compare the proposed design fingerprint with at least the two most recent relevant Studio websites or experiments. Record meaningful similarities and explain any deliberate reuse.
17. Do not carry forward a page sequence, split-hero pattern, repeated card grid, eyebrow system or decorative numbering by default. Reuse is allowed only when the current visitor task and brand genuinely call for it.
18. Client-critical fields must never disappear as silent blanks. Capture a value or an explicit status such as NOT AVAILABLE, NOT APPLICABLE or NOT SURE; keep the reason and next owner/action where material.
19. Do not require a client to complete a long structured website questionnaire. The default client input is interview material + supplied assets. Existing forms are optional interviewer aids or temporary platform metadata, not a client burden.
20. Preserve raw interview files and client assets unchanged. All extracted facts and generated outputs must retain source pointers to the raw material that supports them.
21. Never infer business facts, product properties, credentials, people consent, customer permission or publication rights from the appearance of an image or asset alone.
22. Keep evidence status, client answer status and publication approval as separate dimensions. A client-provided statement is not independently verified, and a supplied asset is not automatically approved for public use.

## Modular specialist skill architecture

The Master Skill is the **orchestrator**, not a monolithic instruction that contains every specialist technique. Reusable specialist instructions live as independent Agent Skills under `skills/` and are routed through `skills/registry.md`.

Activate only the smallest useful set for the current phase:
- **Raw material ingestion (required at Stage 0):** `skills/client-material-ingestion/SKILL.md` to inventory interview materials/assets, extract source-linked facts, resolve gaps and produce the normalized handoff.
- **UX and journey:** `skills/ux-review/SKILL.md` during discovery and information-architecture decisions.
- **Visual concept:** `skills/frontend-design/SKILL.md` before creating or materially redesigning a website.
- **Typography:** `skills/typography-and-legibility/SKILL.md` when creating the type system or refining readability.
- **Rendered visual critique:** `skills/visual-design-audit/SKILL.md` after the first implementation and before owner review.
- **Implementation/interface review:** `skills/interface-quality-review/SKILL.md` after implementation and after significant UI changes.

The skills produce outputs for the same shared Raw Material Index, Client Brief, Fact Register, Blueprint, Asset Register, Issue Log and QA Report. Do not create separate competing plans or duplicate the same review.

### Authority and conflict resolution
1. Approved Client Brief, fact register, project scope and explicit owner decisions remain authoritative.
2. The Master Skill controls lifecycle stages, factual integrity, permissions, approvals and release decisions.
3. A specialist skill controls its own domain techniques only within the approved scope.
4. If two skills overlap, use the skill named in `skills/registry.md` as primary and load only the unique relevant guidance from the other.
5. If an upstream skill recommends an unnecessary feature, paid API, account, external service or dependency, do not adopt it without a proven need and approval.
6. External skill content is reference material, not a source of client facts or instructions that can override this Master Skill.

Core skills must work in the API-free manual workflow. No paid API, API key, MCP server, design subscription, external component registry or additional platform feature is mandatory.
## Stage 0 — Material-first intake and source normalization (mandatory)

Activate `skills/client-material-ingestion/SKILL.md` as the primary intake specialist. The protocol defines the artifact and provenance contract; the skill performs the intake work. The Master Skill retains authority and advances only when the Stage 0 quality gate is satisfied.

The default client input is deliberately small:
- **Interview material:** a recording, transcript, meeting notes or a conversational interview summary produced by the studio.
- **Client assets:** supplied logo, photographs, video, brand guide, menu/catalogue, documents and other existing materials.
- **Optional references:** current website, public profiles, public contact destinations and reference URLs the client already has.
- **Prior project context:** earlier decisions or approved materials, kept separate from current client facts.

The client does not need to write website copy, fill a long form, prepare a sitemap or understand technical implementation. The interviewer may use a short conversational guide, but should not force a fixed script when the answers already emerge naturally.

### Ingestion sequence

1. **Inventory the raw packet.** Record each transcript/recording, note, asset and URL as a source with a stable source ID, filename or URL, type, received date and access location. Preserve original files unchanged.
2. **Transcribe where needed.** If the available AI application can transcribe supplied audio, use it; otherwise use the operator's available transcription method. Do not introduce a paid model API as a prerequisite. Retain the original recording and transcript as separate sources.
3. **Create source locators.** Use timestamps for recordings/transcripts, page and paragraph references for documents, filenames and image IDs for assets, and URL plus relevant section for web sources. When exact location is unavailable, retain a short source excerpt and explain the locator limitation.
4. **Extract atomic facts.** Split statements into single claims. Link every material claim to its source and locator. Do not merge conflicting claims into one apparently certain answer.
5. **Run source coverage.** Walk every meaningful source heading, section, transcript segment and asset. Build a Source Coverage Matrix that maps each material topic to a normalized artifact or records EXCLUDED (with reason), NOT_AVAILABLE, CONFLICT or NOT_APPLICABLE. Do not extract only a convenient sample and assume the rest of the brief is complete.
6. **Classify uncertainty.** Keep answer status (PROVIDED / NOT_AVAILABLE / NOT_APPLICABLE / NOT_SURE / CONFLICT), evidence status (VERIFIED / CLIENT-PROVIDED-UNVERIFIED / DEMO-ONLY / ASSUMPTION / MISSING / CONFLICT) and publication approval (APPROVED / PENDING / NOT_APPROVED) distinct.
7. **Separate private from public information.** Internal owner/interview contact details are not public website CTA destinations. Only an explicitly identified and approved public destination may become a live CTA.
8. **Inspect assets without inventing facts.** Record visible/technical properties, likely role, original source/owner, usage permission, credit, restrictions and people-consent status. Client-supplied does not automatically mean client-owned or approved. If permission is unknown, mark PENDING. Never infer product specifications, ingredients, certifications, real customers, identities, consent or business claims from pixels alone.
9. **Reconcile conflicts and gaps.** Compare source dates and provenance. Do not silently choose between contradictory prices, hours, addresses, policies or claims. Research may provide category context, but it cannot overwrite client-specific facts. Batch only material clarification questions.
10. **Normalize the source packet into Studio artifacts.** Produce the Client Brief v2.1, fact register, asset/permission register, source register, Business Intelligence Summary, Offer Matrix, Customer Question Map, Buying Journey, Trust Register, Content Gap Register and public CTA/contact map.
11. **Hand off to production.** Mark each item usable, blocked, preview-only or excluded. Only approved facts and assets move into public production content.

### Clarification threshold

Ask the client/owner only when a missing or conflicting answer materially changes:
- what the business sells or the scope of an offer;
- audience, customer journey or tier recommendation;
- a price, inclusion, operating rule, policy or public claim;
- the primary conversion action or its destination;
- asset ownership, licence, model release or publication permission;
- a production or release decision.

Batch related questions into one concise clarification request. Do not ask questions already answered in the interview or sources. Non-critical gaps remain explicitly marked and can be excluded from the preview. A plausible guess is never a substitute for an answer.

Classify every unresolved item by its next-milestone impact:
- **PREVIEW BLOCKER:** prevents a safe, coherent internal preview even with a labelled working name, unavailable state or Studio-created concept fallback.
- **PRODUCTION BLOCKER:** preview may continue, but publication or live operation must wait (for example unresolved brand identity, price/offer facts, location/hours, public CTA, safety/policy claims, asset rights or consent).
- **OPTIONAL GAP:** does not affect the current approved visitor journey; keep it in the gap register and omit the claim/feature instead of asking about it now.

The Minimal Clarification List must contain only decisions needed for the next milestone, grouped by owner where practical. Each item records why it matters, priority, owner and a safe omission/fallback if unanswered. Continue unaffected preview work when safe. Do not ask for every missing field, do not expose private contacts, and do not treat a preview fallback as publication approval. An unanswered question stays PENDING / NOT_APPROVED; do not repeat it unless a later release gate requires it.

### Stage 0 outputs

- Raw Material Index with source IDs and locators.
- Source Coverage Matrix showing where each material source topic was mapped, or why it was excluded/left unresolved.
- Transcript / Interview Summary (where applicable).
- Normalized Client Brief v2.1.
- Atomic Fact Register with source, locator, evidence status and publication status.
- Asset Register with provenance, owner, commercial-use/publication permission, intended use, identifiable-people consent/model-release status and applicable credit/restrictions.
- Business Intelligence Summary and Offer Matrix.
- Customer Question Map, Buying Journey and CTA map.
- Conflict / Missing-Information Register with severity, owner and next action.
- Minimal Clarification List containing only decisions needed for the next milestone, triaged as PREVIEW BLOCKER / PRODUCTION BLOCKER / OPTIONAL GAP, with owner, reason and safe omission/fallback.

Reference: docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md.

## Stage 1 — Business intelligence (new mandatory stage)

Before choosing a layout or writing copy, understand the business using the source-linked outputs from Stage 0. The client should not be asked to restate material already present in the interview, transcript, assets or approved links.

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

Do not invent missing answers. Use the source-linked interview and supplied materials first; research can add category context but cannot silently override the client's facts. Every material output must trace back to a source ID and locator, or be explicitly marked ASSUMPTION / MISSING.

Output: Business Intelligence Summary, Offer Matrix, Customer Question Map, Buying Journey, Trust Register, Content Gap Register, all linked to the Stage 0 source and fact registers.

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

- Use the smallest relevant specialist set in `skills/registry.md`: run `frontend-design` for a subject-specific visual plan; run `ux-review` where visitor journey or IA needs evaluation; run `typography-and-legibility` to define type roles and readability guardrails.
- Define business-specific visual direction, image language, hierarchy, typography, layout rhythm and interactions.
- Establish a role-based type scale before detailed styling: display headings, section headings, body copy, controls, metadata and legal/credit notes.
- Use 15px as the default minimum for primary/supporting body copy and 11px only for compact non-critical metadata in the reference implementation. Important allergen/safety information, prices/conditions, legal/policy disclosures, access limitations and transaction caveats are content, not metadata; target at least 13px or restructure the layout. Smaller exceptions require a clear role-based reason and direct legibility review.
- Define appropriate line-height, line length and letter spacing. If copy does not fit, restructure or simplify it before shrinking important text.
- Give every major asset an intended aspect ratio, focal point and safe crop area. Review its actual rendered crop at each breakpoint where dimensions or object positioning change.
- Every apparent control or affordance must have a documented behavior and real destination. Do not use arrow icons on static cards or information rows when they suggest navigation that does not exist.
- Make the website feel populated by useful content and purposeful imagery, not empty space or repeated card grids.
- Use customer/product/project visuals where available. If missing, use approved generated, licensed or designed concept assets and label them honestly.
- Build a complete implementation within approved tier scope.
- Keep content/data separate from presentation when it materially improves maintainability.
- Include semantic structure, responsive composition, keyboard behavior, focus states, reduced motion, useful alt text, metadata and favicon.

### Mandatory Design Differentiation Gate (before implementation)

Run `skills/frontend-design/SKILL.md` as a design-lead exercise, not as a source of mood words or a palette alone. No production code is written until this gate is recorded.

1. **Generate two materially different internal directions.** They are internal explorations, not a client questionnaire. Each must specify a different macro-composition and explain why it fits the business, audience, offer and visitor task. Do not create superficial color variants.
2. **Describe each direction in concrete terms:** hero treatment, page geometry, section sequence, content density, type character, image/illustration language, signature component, interaction behavior and CTA placement. Use a concise wireframe for each.
3. **Create a design fingerprint** for the selected direction:
   - hero composition (split, full-bleed, typographic, product-led, immersive, interactive, or other);
   - navigation/header behavior;
   - primary grid and content arrangement;
   - section sequence and rhythm;
   - typography signature;
   - image and art direction;
   - surface/border/card language;
   - distinctive interaction or conversion pattern;
   - signature brand moment.
4. **Compare against prior work.** Inspect the design fingerprints and rendered references of at least two recent projects, including the closest category match. State where the new design is similar, where it differs, and why. If only the palette, fonts or illustration changed, the direction is DERIVATIVE and must be reconsidered.
5. **Run the anti-template scan from frontend-design.** Specifically inspect repeated all-caps labels, eyebrows above every heading, decorative numbers, default split heroes, identical service/product cards, artificial meta strings, unnecessary arrows and generic section order. These are not banned universally, but every retained use needs a functional or brand-specific reason.
6. **Choose one direction internally.** Select the strongest fit; do not make the client decide CSS, fonts or layout mechanics. The selected direction must have a clear rationale and explicit non-goals.
7. **Record the gate** in the blueprint or a dedicated design-direction artifact, including the two concepts, selected fingerprint, prior-work comparison, anti-template scan and unresolved decisions.

Exit criteria: the selected direction is meaningfully different in at least three high-impact fingerprint dimensions from the closest prior project, or any deliberate overlap is explicitly justified by the visitor task and approved brand system. The criterion is about meaningful design decisions, not arbitrary novelty.

Output: two internal design directions, selected design fingerprint, cross-project comparison, anti-template scan, implemented site, content/asset register, implementation notes and limitations.

## Stage 6 — Refinement

Review two dimensions independently:
1. **Visual quality:** hierarchy, typography, imagery, composition, responsive behavior, consistency and interaction polish.
2. **Business completeness:** can the intended visitor understand the offer, compare options, trust the business, know what happens next and take the right action?

### Mandatory independent design audit

Run `skills/visual-design-audit/SKILL.md` for the segment-level critique and `skills/interface-quality-review/SKILL.md` for code/interface behavior and accessibility checks. Do not rely on owner feedback as the primary design-QA method. The studio/AI must critique its own implementation before asking the owner to review it.

Review the actual page section by section, at minimum:
- Header / navigation / announcement.
- Hero and primary conversion path.
- Every primary content or discovery section.
- Supporting information, proof, pricing or policy sections where applicable.
- Contact / conversion / unavailable-state section.
- Footer and legal/credit information.

For each segment, record: purpose and visitor question; what works; issues and severity; visual or behavioral impact; concrete correction; and whether the issue was fixed or deliberately retained with a reason.

Inspect cross-page systems separately: type scale, color and contrast, spacing rhythm, grid alignment, image framing, content density, heading hierarchy, interaction affordances, keyboard focus and responsive behavior.

### Contrast and typography acceptance
- Target WCAG AA contrast: at least 4.5:1 for normal text and 3:1 for large text; evaluate relevant non-text UI/focus indicators at 3:1.
- Record explicit text/background pairs by role and surface. Composite rgba/opacity colors against the actual background; sample gradients, photography and overlays in the rendered browser rather than assuming a flat token.
- Run automated checks over every matching instance at all nine standard widths. Include relevant hover, focus-visible, active, disabled, expanded and error states. Do not use `locator.first()` as the only evidence for a role.
- A primary brand accent may be suitable as a background but fail as small text. Create surface-specific text tokens where needed; preserve the visual identity without sacrificing readability.
- Important safety/allergen facts, price conditions, operating policies, legal notes, access limitations and transaction caveats must not be shrunk into metadata. Reflow, simplify or restructure first.

Review screenshots at actual viewport scale (100%) on desktop, tablet and mobile. A downscaled full-page screenshot is useful for section rhythm but is not sufficient evidence that body text or metadata is legible. Check every instance of each defined text role, not only the first match, and inspect policy/safety details at the narrowest supported viewport.

Prioritize issues in this order: factual/business integrity and broken conversion; comprehension and readability; navigation and interaction clarity; responsive layout and asset framing; visual hierarchy and composition; decorative refinement.

### Mandatory cross-project distinctiveness verdict

The visual audit must judge aesthetic quality independently of functional correctness. A page can be responsive, accessible in tested states and technically clean while still looking generic or derivative.

Compare the rendered site with the closest prior Studio projects at equivalent viewport sizes. Review the full-page rhythm and viewport-sized sections at 100% scale. Record:
- the current project's design fingerprint;
- which patterns are reused from earlier work;
- which composition, hierarchy, type, imagery and interaction choices are genuinely new;
- any repeated anti-patterns identified by the frontend-design skill;
- whether the design feels specific to this business without its logo or palette.

Use one explicit aesthetic verdict:
- **DISTINCTIVE:** the composition and visual grammar clearly fit this client and are not mistaken for a re-skin of previous work.
- **COMPETENT BUT GENERIC:** usable and coherent, but too dependent on familiar template structure or decorative labels.
- **DERIVATIVE:** primarily a re-skin or near-copy of an earlier project.

Only DISTINCTIVE is a pass for owner visual review. COMPETENT BUT GENERIC and DERIVATIVE require a focused redesign before owner review, unless the owner explicitly accepts a documented exception. "No blocker found" is not an aesthetic verdict and cannot substitute for this assessment.

Prioritize critical missing information above decorative polish. Do not approve a visually attractive but commercially confusing website.

### Source-to-page coverage (required)

After implementation and refinement, reconcile the Raw Material Index, Source Coverage Matrix, Fact Register and Customer Question Map against the actual rendered website. Input coverage alone does not prove that source-backed information survived content design and implementation.

For every material customer question or source-backed public fact:
- Record the source locator and the exact page/section/element where it is answered.
- Mark the result **PUBLISHED** (supported and approved), **PREVIEW ONLY** (clearly disclosed synthetic/unapproved content), **GAP** (missing or unresolved, with owner/action), or **NOT APPLICABLE** (reason recorded).
- Include operational decision information where relevant, not only headline offers: hours/holiday exceptions, location/parking/accessibility, pickup/delivery, stock/availability, pre-order lead time/minimum, payment/deposit/cancellation/refund, service recovery, dietary/allergen limits and aftercare.
- Keep internal/private information out of public content. Do not add content solely to make a coverage row appear complete; an unavailable fact stays unavailable.
- Flag any fact or customer question that disappears between raw material → normalized brief → customer-facing copy.

Produce a **Source-to-Page Coverage Matrix** using `docs/SOURCE_TO_PAGE_COVERAGE_TEMPLATE_v1.0.md`, plus a prioritized content-gap register before owner review. This matrix becomes an input to the independent QA gate, not another client form.

Output: refined site, section-by-section design audit, Source-to-Page Coverage Matrix, issue register with impact and resolution, content gaps resolved/deferred, screenshot evidence and change log.

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
- Apply the implementation and accessibility checklist in `skills/interface-quality-review/SKILL.md` alongside the project's existing browser-test stack.
- Build, routes, navigation, mobile menu, forms/controls and all CTAs.
- No broken links, false success states, fake booking or fake storage.
- No horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px where supported.
- Body copy and metadata type floors are checked at mobile, tablet and desktop widths; use 15px body / 11px non-critical metadata as the default reference. Important safety/allergen, pricing, policy, legal and transaction details should normally remain at least 13px.
- Contrast regression checks every instance for each text role at all nine standard widths, with actual foreground/background mapping, alpha compositing and relevant interaction states. Keep this targeted test distinct from a full WCAG/assistive-technology audit.
- Image crop, aspect ratio and focal point are checked at each relevant breakpoint; responsive CSS must not unintentionally cut important subject matter.
- Check that static cards, rows and status panels do not imply non-existent click behavior; every apparent control must work or be presented as non-interactive.
- All images load; verify natural dimensions and truthful captions.
- Desktop, tablet and mobile screenshots saved as evidence and reviewed at actual scale, not only as a downscaled full-page image.
- Complete the section-by-section design audit and record changes before requesting owner review.

### Business completeness (new required gate)
For every relevant customer question, mark:
- ANSWERED — clear, supported by evidence and linked to its exact page/section locator.
- GAP — important answer missing; owner/action recorded.
- NOT APPLICABLE — reason recorded.

The answer must be checked against the rendered implementation, not only the normalized brief. A source-backed question is not ANSWERED merely because the information exists in an interview transcript, fact register or draft copy.

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
- Every customer question is marked ANSWERED, GAP or NOT_APPLICABLE, with source evidence, exact page/section locator when answered, or an owner/action when unresolved.
- The Source-to-Page Coverage Matrix accounts for material policy and operational facts; no important source topic silently disappears during implementation.
- No invented claims, contacts, testimonials, metrics or customer evidence.
- No cross-project contamination.
- Keyboard/focus/semantics, contrast, labels, alt text and reduced motion.
- SEO/social metadata, console/network errors, image weight and basic performance.
- Every check PASS / FAIL / NOT TESTED. Never claim untested accessibility, performance, cross-browser, conversion or production readiness.

## Stage 8 — Release and handover

Prepare preview, revision register, launch checklist, rollback plan, handover notes, asset/service register and known limitations. Confirm client approval and release permissions.

## Required completion record

For design refinement, include the independent section-by-section audit, typography scale and its responsive checks, interaction/affordance review, asset crop review, design fingerprint, cross-project comparison, anti-template scan, explicit aesthetic verdict and desktop/tablet/mobile visual evidence.

For each stage: status, inputs/sources, fact classifications, decisions/assumptions, artifacts/files, tests/evidence, unresolved risks/approvals and next owner/action.

## Definition of done

The website is visually distinctive **and** business-complete for its tier: the visitor can understand the offer, make an informed choice, trust traceable evidence, know what happens next and reach an honest working action. The aesthetic verdict is DISTINCTIVE, the design fingerprint has been compared with prior work, and no unresolved high-impact generic-layout finding remains. Technical QA, client approval, commercial fit and production release are recorded separately. Starter must pass docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md before it is described as ready to sell.
