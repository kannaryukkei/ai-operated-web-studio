# Starter Product Acceptance Gate v1.1

Status: Optional Starter-specific product/technical acceptance checklist. Use when evaluating or selling the defined Starter offer; it does not create a general project workflow or mandatory artifact package.
Decision owner: Studio.
Principle: Starter is compact, not incomplete. A one-page site must answer the important customer questions for its business category and provide a real next step.

## Gate 0 — Business understanding
- [ ] The project conversation contains enough source-backed business information to understand the offer and intended visitor task; use a separate brief/source note only when complexity justifies it.
- [ ] Target audience, buying intent, objections and decision criteria are understood.
- [ ] Offers, options, inclusions/exclusions and prices (or pricing method) are supported by source material for client_service, or clearly labelled synthetic fixtures in studio_development.
- [ ] The important customer questions and buying journey are understood for the relevant business; a separate map is optional.
- [ ] In client_service, trust evidence is real, source-backed and approved; missing proof is omitted. In studio_development, synthetic proof-like fixtures may be used only as clearly labelled internal test data and never published.
- [ ] Operational constraints, location/coverage, availability and policies are recorded.
- [ ] Material public facts and selected assets have enough source/rights context to support safe use. Detailed registers are created only when asset count, complexity or risk justifies them.
- [ ] Critical gaps have an owner and are either resolved or explicitly excluded from production launch.

## Gate 1 — Customer-facing completeness
For this commercial completeness review, identify the important applicable customer questions and verify that the website answers them. A concise issue list in the project conversation is sufficient; do not create a coverage matrix unless the site's complexity makes it useful. Preview-only content must never be mistaken for production-ready content.
- [ ] What does the business offer and who is it for?
- [ ] What are the available products/services/packages?
- [ ] How does a customer compare options and choose?
- [ ] What is included, excluded and limited?
- [ ] What does it cost, or how is the price determined?
- [ ] Why should a customer trust the business?
- [ ] Where and when can the customer get the offer?
- [ ] How does the process work, and what happens after inquiry/order?
- [ ] What preparation, policies, delivery, aftercare or warranty matters?
- [ ] What are the answers to the major real customer objections?
- [ ] What is the clear next action, and what happens after clicking it?

A site cannot pass production completeness with a critical BLOCKED item. Preview exceptions must be visible and must not be represented as live functionality.

## Gate 2 — Conversion integrity
- [ ] In client_service, the primary CTA uses a real, verified destination approved by the business owner. In studio_development, use a safe synthetic/local destination and label the project internal.
- [ ] Public contact information is correct and approved.
- [ ] Forms/booking/order actions actually deliver to the approved destination.
- [ ] No fake submission, fake booking, false success message or implied data storage.
- [ ] The primary and other important CTAs have known destinations and expected post-click behavior; a separate register is optional.
- [ ] Secondary actions are intentional and tested.
- [ ] Business owner confirms that inquiries can be received and handled operationally.

## Gate 3 — Visual and content quality
- [ ] Visual hierarchy makes the offer and primary action immediately understandable.
- [ ] Content density feels complete without filler, repeated card grids or invented sections.
- [ ] Images are relevant, rights-cleared and honestly represented in client_service. In studio_development, clearly labelled synthetic imagery and proof-like fixtures may be used for internal testing only.
- [ ] Typography, spacing, contrast and component consistency are reviewed. Important safety, allergen, pricing, policy and transaction disclosures are not treated as micro-metadata.
- [ ] Mobile and desktop layouts are designed for the actual content, not just viewport screenshots.
- [ ] Copy is specific, clear and customer-oriented rather than generic marketing language.

## Automated Starter regression baseline

The Starter reference should pass `docs/STARTER_AUTOMATED_QUALITY_GATE_v1.0.md` where that automation applies. These checks supplement, and do not replace, the relevant project build, browser, accessibility and release checks. Numeric contrast automation covers measurable solid-color surfaces; gradient/photo surfaces still require actual-scale human screenshot review.

## Gate 4 — Technical release quality
- [ ] Production build passes.
- [ ] All routes, links, navigation and interactions pass browser tests.
- [ ] Responsive checks at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- [ ] No horizontal overflow, broken assets, console errors or broken links.
- [ ] Keyboard navigation, visible focus, form labels and semantic structure are checked. Text contrast is tested against actual backgrounds (4.5:1 normal / 3:1 large), with relevant non-text controls at 3:1; translucent colors are composited and every rendered instance is tested across target widths.
- [ ] Metadata, social preview, favicon, sitemap/robots where applicable are correct.
- [ ] Performance and image weight are measured; results are recorded rather than assumed.
- [ ] `client_service` and `studio_development` are checked separately. In client_service, only real source-backed and approved proof may be published. In studio_development, synthetic fixtures remain clearly labelled and internal; no public release is permitted.
- [ ] Preview robots restrictions are retained for previews and removed only after launch approval; production canonical, social metadata and robots directives are checked.
- [ ] Cross-browser behavior is tested or explicitly marked NOT TESTED.
- [ ] Hosting, domain, SSL, backups and update ownership are documented.

## Gate 5 — Real-world validation and commercial readiness
- [ ] At least one complete delivery is run using a real business with verified facts and permission to publish.
- [ ] Business owner reviews content, offer details, contact paths and operational accuracy.
- [ ] A real visitor can understand the offer and complete the intended action.
- [ ] Any observed confusion, missing information or failed conversion is fixed and retested.
- [ ] Delivery time and studio effort are recorded.
- [ ] Included scope, exclusions, revision limits and client responsibilities are explicit.
- [ ] Domain/hosting/third-party costs and ongoing maintenance are explained.
- [ ] Pricing leaves a viable margin after actual delivery effort and recurring costs.
- [ ] Domain/hosting first-year costs, owner account, renewal date and renewal payer are recorded.
- [ ] Handover and post-launch support responsibilities are clear.

## Starter Rp500,000 launch-scope boundary (proposed, not a universal quote)

The target price is valid only for a tightly scoped, static-first delivery:
- One business, one primary audience, one focused conversion journey and one page.
- The section order is selected from actual customer questions; no arbitrary section count and no filler.
- Basic content structuring and copy refinement from client-provided facts; client approves all public claims.
- Client provides approved logo, photos and other source assets, or accepts clearly disclosed concept imagery. Original photography, video, logo design and paid stock are excluded.
- One real primary CTA (for example an approved WhatsApp destination, phone link or map link). No backend form, database, booking engine, cart, payment, inventory, login or CMS.
- Static hosting on an eligible free plan and first-year domain registration up to the agreed budget cap (initial planning cap: Rp150,000). Domain upgrades and paid hosting are quoted separately.
- Up to two consolidated revision rounds. Additional pages, languages, complex interactions, new content production and ongoing maintenance are separately scoped.
- The domain registrar account is created in the client's name. The client owns the domain, pays renewal after the included first year and owns the ongoing hosting account. The studio records access handover without retaining ownership.

Hosting provider limits and domain promotions can change. Recheck the vendor's current terms and total checkout price before each quote. The Rp500,000 offer remains a pilot price until a real delivery has been timed and its margin verified.

## Decision
- **PASS — Ready to sell:** all critical gates pass; no unresolved production blockers.
- **CONDITIONAL — Preview only:** visual/technical preview is useful but a live conversion, approval, evidence or operational dependency remains blocked. Do not market as production-ready.
- **FAIL — Not ready:** critical business questions, conversion integrity or technical quality fail.

## Explicit sequencing rule
This checklist is specific to the defined Starter offer. Do not force every client into Starter; recommend an appropriate scope based on the actual business requirements. Do not implement backend/operational complexity without a demonstrated need.
