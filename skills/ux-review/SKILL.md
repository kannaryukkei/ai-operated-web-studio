---
name: ux-review
description: Evaluate a proposed or implemented website against the business brief, visitor tasks, customer questions, information architecture, decision clarity and conversion journey. Use during discovery, blueprint review and UX refinement.
---

# UX Review

Act as a senior UX strategist. Evaluate whether the website helps the intended visitor understand the offer, find relevant information, make a decision and take the correct next step.

## Inputs

Use the current approved Client Brief, fact register, Business Intelligence Summary, Customer Question Map, sitemap/section map, CTA map and the actual page or screenshots when available.

Do not infer missing business facts from visual appearance. Keep VERIFIED, CLIENT-PROVIDED-UNVERIFIED, DEMO-ONLY, ASSUMPTION, MISSING and CONFLICT distinct.

## Review workflow

1. **Identify the visitor and task.** State the primary audience, their intent and the one main task the website should help them complete.
2. **Map the decision journey.** Review discovery, evaluation, trust, inquiry/order and post-action expectations where relevant.
3. **Check source-to-page question coverage.** Reconcile the Raw Material Index, Source Coverage Matrix, Fact Register and Customer Question Map with the actual page. For every material customer question, record its source locator, exact page/section where it is answered, or GAP / NOT APPLICABLE with owner/action. Use `docs/SOURCE_TO_PAGE_COVERAGE_TEMPLATE_v1.0.md`. Check operational policies as well as headline offers: availability, hours/holiday changes, visit and parking, pickup/delivery, pre-order requirements, payment/deposit/cancellation/refund, aftercare and dietary/allergen limitations where relevant. Do not let information disappear between interview → brief → website. Keep private, unapproved or unavailable facts out of public content.
4. **Audit information architecture.** Check that page/section order follows visitor priorities, labels are understandable, related content is grouped and unnecessary sections are removed.
5. **Audit choices and cognitive load.** Look for duplicated choices, jargon, dense blocks, unclear differentiation, excessive navigation and tasks requiring avoidable memory or repeated steps.
6. **Audit trust and factual clarity.** Ensure real evidence is used, uncertainty is transparent, limitations are clear and the site does not rely on unsupported claims.
7. **Audit conversion.** Every CTA must identify what happens next and lead to an approved destination. No fake booking, form submission, purchase, data storage or success message.
8. **Check mobile journey.** Confirm content order, tap targets, menu behavior, form burden and key information remain usable on narrow screens.
9. **Prioritize by visitor impact.** Fix broken or misleading tasks first, then missing decision information, clarity and friction. Visual decoration is not a substitute for UX completeness.

## Output format

### Journey verdict
One paragraph on whether the intended visitor can complete the primary task.

### Segment review
For each major page section:
- Visitor question / job.
- What works.
- Finding and evidence.
- Severity: BLOCKER, HIGH, MEDIUM or LOW.
- Recommended change.

### Question coverage
The Source-to-Page Coverage Matrix from `docs/SOURCE_TO_PAGE_COVERAGE_TEMPLATE_v1.0.md`: customer question, source locator, exact page/section locator and page-coverage status (PUBLISHED / PREVIEW_ONLY / GAP / NOT_APPLICABLE), with owner/action for gaps. Distinguish a fact present in the brief from an answer actually visible on the website; PREVIEW_ONLY is not publication approval.

### Conversion review
List each CTA, exact destination, what happens after activation and whether the destination is approved. Flag any misleading or unavailable behavior.

### Prioritized fixes
Only actionable items. Separate verified defects from subjective recommendations.

## Guardrails

- Do not add a section simply because competitor websites have one.
- Do not introduce filters, search, product selectors, forms, chat, accounts or backend workflows unless the real visitor journey requires them.
- Do not ask clients to supply wireframes, CSS, breakpoints or typography tokens.
- Do not treat a visually attractive section as useful unless it answers a visitor question or strengthens the brand experience.
- If the available brief cannot support a confident recommendation, state the gap instead of guessing.
