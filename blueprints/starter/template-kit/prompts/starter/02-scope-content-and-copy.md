# Prompt — Customer Questions, Information Architecture, Content and WRP

**Master Skill mapping:** Stage 3 (customer questions and information architecture) and Stage 4 (content and conversion).

Use the approved discovery records and G1 scope. The studio/AI creates the project deliverables; the client is not asked to write the Client Website Brief or a long content questionnaire.

## Stage 3 — Customer questions and information architecture

Build and maintain:
- Customer Question Map with canonical IDs and answer/evidence/publication statuses.
- Buying Journey and primary visitor tasks.
- Section map / information architecture linked to the questions it resolves.
- Source-to-page plan that preserves traceability and identifies gaps.

For each proposed section, state its purpose, visitor question, source-backed content, next action and dependency. Use only sections that help the intended visitor; do not pad the page to reach a target count.

### Conditional offer-variant decision

When discovery shows that customers must choose among variants of the same core offer (for example, vehicle class, size, material, service level or product configuration), determine whether a comparison or selector would materially answer a high-priority customer question.

- Add a comparison or interactive selector only when the source-backed variants are meaningful to the decision. Do not add one merely because a benchmark used it.
- Map every option to canonical Offer and Fact IDs. Identify the exact dimension, allowed values, inclusions/scope, price or pricing method, exceptions and source/approval status for each option.
- Distinguish fixed, indicative and quote-based prices. If a value is missing, conflicting or not approved, preserve that state; do not fill the matrix by inference.
- If the available evidence cannot support a fair comparison, prefer a clear category explanation and consultation path over a misleading price grid.
- Keep the interaction optional where the visitor can understand the offer without configuring it. Do not increase client interview burden to collect implementation details.

For an approved selector, the WRP must specify the default state, available values, fields that change, treatment of unknown/unavailable values, price disclosure, related CTA context and observable acceptance criteria. The implementation and QA prompts must derive their work from this contract.

## Stage 4 — Content and conversion

Draft the copy deck, section-level headlines/body/microcopy, FAQ candidates, metadata, CTA Register, form/contact behavior (if in scope), content gaps and safe fallback visuals.

Do not invent business claims, offers, prices, policies, credentials, outcomes or social proof. Fabricated testimonials, reviews, ratings, awards, customer counts, performance metrics and case results are prohibited even in portfolio/demo work. A non-testimonial explanation of the process, craft, service method or offer may be used only when supported by facts. Concept imagery may illustrate a visual direction when clearly disclosed and not represented as real client work.

## Assemble the Website Requirements Pack

Produce a versioned WRP from Stages 1–4. It must link to canonical record IDs rather than duplicating facts. Include:
- Business goal, audiences, visitor journeys and conversion action.
- Approved tier, scope, exclusions, non-goals and constraints.
- Customer-question coverage, section map, content/copy plan and CTA behavior.
- Asset inventory, source/rights/consent and publication state.
- Functional and non-functional requirements.
- SEO/metadata and accessibility/responsive requirements.
- Acceptance criteria, unresolved decisions, preview/production blockers and change control.

The WRP is an AI/studio-produced implementation contract, not a client questionnaire. Client confirmation is limited to business facts, public destinations and asset/permission decisions. The Studio owner approves tier/scope fit and progression.

**G2 — Hard gate:** the operator checks source traceability, completeness, feasibility and blockers; the owner approves progression to design; required client confirmations/safe fallbacks are recorded; WRP status becomes exactly `APPROVED_FOR_DESIGN`. No Stage 5 design or code begins before G2 passes.

## Required output

Return the Customer Question Map, Buying Journey, IA/section map, copy deck, CTA Register, content gaps, WRP version and G2 evidence. Mark every unanswered or unapproved item explicitly; never turn a draft into a public claim by implication.
