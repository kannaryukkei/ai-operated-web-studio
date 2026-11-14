# Starter Product Acceptance Gate v1.0

Status: Required gate before Starter is described or sold as production-ready.
Decision owner: Studio.
Principle: Starter is compact, not incomplete. A one-page site must answer the important customer questions for its business category and provide a real next step.

## Gate 0 — Business understanding
- [ ] Approved business brief and source register exist.
- [ ] Target audience, buying intent, objections and decision criteria are understood.
- [ ] Offer matrix includes real names, options, inclusions/exclusions and verified price or pricing method.
- [ ] Customer Question Map covers before, during and after purchase where relevant.
- [ ] Buying Journey and primary/secondary conversion paths are mapped.
- [ ] Trust evidence is real and approved; missing proof is not fabricated.
- [ ] Operational constraints, location/coverage, availability and policies are recorded.
- [ ] Every material fact has a source and publication status.
- [ ] Critical gaps have an owner and are either resolved or explicitly excluded from production launch.

## Gate 1 — Customer-facing completeness
For each applicable item mark ANSWERED, NOT APPLICABLE (with reason), or BLOCKED (with owner/action):
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
- [ ] Primary CTA uses a real, client-approved destination.
- [ ] Public contact information is correct and approved.
- [ ] Forms/booking/order actions actually deliver to the approved destination.
- [ ] No fake submission, fake booking, false success message or implied data storage.
- [ ] Secondary actions are intentional and tested.
- [ ] Business owner confirms that inquiries can be received and handled operationally.

## Gate 3 — Visual and content quality
- [ ] Visual hierarchy makes the offer and primary action immediately understandable.
- [ ] Content density feels complete without filler, repeated card grids or invented sections.
- [ ] Images are relevant, correctly licensed/approved or clearly disclosed as concept imagery.
- [ ] Typography, spacing, contrast and component consistency are reviewed.
- [ ] Mobile and desktop layouts are designed for the actual content, not just viewport screenshots.
- [ ] Copy is specific, clear and customer-oriented rather than generic marketing language.

## Gate 4 — Technical release quality
- [ ] Production build passes.
- [ ] All routes, links, navigation and interactions pass browser tests.
- [ ] Responsive checks at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- [ ] No horizontal overflow, broken assets, console errors or broken links.
- [ ] Keyboard navigation, visible focus, form labels, semantic structure and contrast are checked.
- [ ] Metadata, social preview, favicon, sitemap/robots where applicable are correct.
- [ ] Performance and image weight are measured; results are recorded rather than assumed.
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
- [ ] Handover and post-launch support responsibilities are clear.

## Decision
- **PASS — Ready to sell:** all critical gates pass; no unresolved production blockers.
- **CONDITIONAL — Preview only:** visual/technical preview is useful but a live conversion, approval, evidence or operational dependency remains blocked. Do not market as production-ready.
- **FAIL — Not ready:** critical business questions, conversion integrity or technical quality fail.

## Explicit sequencing rule
Do not start Business implementation until Starter has a PASS decision. Do not start Custom implementation until Business is also defined and a real bespoke workflow requirement exists.
