---
name: ades-exploration-synthesis
description: Run a compact, business-first design exploration that develops distinct visual directions, evaluates them, synthesizes one coherent direction, and builds one final website when exploration materially improves the result.
---

# ADES — AI Design Exploration & Synthesis

## Purpose

Use AI's strength at generating alternatives, then apply disciplined judgment to produce **one distinctive, useful website**. ADES is not a method for building three websites. It is a method for exploring a small number of design hypotheses before investing in one final implementation.

The project conversation remains the working authority. This skill is subordinate to Master Skill v1.14, the selected operating mode and repository instructions. It adds no dashboard, workflow engine, mandatory document package, paid service or API-key requirement.

## When to activate

Use ADES when visual direction is genuinely open and differentiation matters: a new brand, a high-value lead-generation site, a competitive local service, a distinctive product experience, or a project where the initial design direction is uncertain.

Do not force it when:
- a strong, approved brand/design system already determines the direction;
- an existing owner-preferred baseline should be preserved and refined;
- the site is deliberately simple and exploration would not improve visitor understanding, trust or action; or
- a material business fact, asset right or permission is unresolved and would make the concepts speculative.

Use the minimum relevant specialist skills. Usually this means `design-strategy-and-judgment` and `frontend-design`; add reference discovery, UX, typography, media, implementation or quality-review methods only when useful.

## The method

### 1. Understand once

Use the existing conversation, interview, files and verified sources. Do not repeat intake or make the client fill out a long form.

Privately distil only what affects design:
- business, actual offer and audience;
- visitor's main question or buying decision;
- primary business outcome and intended visitor action;
- trust/evidence available and material friction;
- content, assets, facts, permissions and technical constraints;
- operating mode: `client_service` or `studio_development`.

Keep synthetic facts clearly labelled and internal. Never invent differentiators, prices, proof, policies, contacts or asset permissions.

### 2. Diverge — three distinct hypotheses

For a full ADES exploration, develop **three genuinely different design directions** using the same business facts and primary visitor task. Vary meaningful design decisions such as composition, information architecture, visual subject, image grammar, typography, section rhythm and interaction—not merely palette, font or decorative details.

Each direction must briefly answer:
- What should visitors notice and understand first?
- What visual idea makes this business tangible and recognisable?
- How does the page help the visitor evaluate the offer and take the next step?
- Why is this direction appropriate for this audience and business?

Three directions are a ceiling on exploration, not a requirement to multiply pages, features or assets. If a full three-way comparison would not add value, use a smaller focused comparison or skip ADES.

### 3. Prototype lightly

Build only enough of each direction to compare the visual hypothesis. Normally use one representative homepage or the most important page/flow, with the same core content and facts across candidates.

Candidate previews are not production websites:
- no full backend, duplicate business logic, complete route set, payments, booking or operational integrations;
- no polished feature parity or separate production QA suite for each candidate;
- keep prototypes in a private/local preview, isolated branch, or other location excluded from production output;
- label synthetic and unapproved content clearly;
- do not expose candidate alternatives as live business pages.

Do not put internal prototypes in a deployable `public/` directory unless the deployment explicitly excludes them. Remove or exclude all exploration-only files before any production release.

### 4. Evaluate and choose

Judge each direction against the same practical criteria:
- **Business fit:** matches the real offer, customer and positioning.
- **Clarity:** makes the offer, value and next step easy to understand.
- **Trust:** uses useful evidence and operational detail without unsupported claims.
- **Action:** reduces decision friction and supports the intended visitor action.
- **Distinctiveness:** has a recognisable point of view rather than a generic template.
- **Craft and adaptability:** has strong hierarchy, typography, imagery, usability and responsive potential.
- **Feasibility:** can be implemented and maintained in the existing project constraints.

Use concise KEEP / ADAPT / REJECT judgments with concrete reasons. Do not let scores replace taste or business reasoning. Do not ask the owner to choose routine design details.

### 5. Converge — synthesise one direction

Choose the strongest overall direction and selectively adapt the best proven ideas from the others. Synthesis is not a collage: the final result must have one coherent visual grammar, hierarchy and purpose.

The internal handoff should be short: chosen concept, hero/content hierarchy, useful patterns to keep/adapt/reject, image direction, responsive implications and material unknowns. Keep it in the project conversation unless a file materially helps implementation.

Present one recommended direction, not three equally weighted choices. Continue autonomously unless a real fact, permission, scope decision or approval is needed.

### 6. Build once

Implement the synthesised direction in the existing website application:
- preserve the selected owner-preferred baseline and existing stack;
- build only the pages and features justified by the visitor journey and agreed scope;
- use the smallest maintainable implementation;
- make every visible CTA and control truthful and functional;
- do not add a backend, account, CMS, payment, booking, integration, animation library or other dependency without a demonstrated requirement;
- remove or exclude exploration-only assets and code from the release candidate.

Do not rebuild the three candidates as production sites. Invest implementation effort in the one synthesised result.

### 7. Verify the real website

Use the repository's existing checks and the relevant modes of `website-quality-review`. Do not invent a second QA framework for ADES.

At minimum, verify the production build and the important visitor interactions. Inspect actual rendered screenshots at relevant desktop, tablet and mobile sizes; add narrow/problem-specific widths where needed. Check responsive composition, readable hierarchy, keyboard/focus behavior, reduced motion and truthful CTA behavior when relevant.

Keep technical and aesthetic judgments separate. A CI pass does not prove visual quality, conversion performance, accessibility completeness or release readiness. Report the exact checks, screenshot scope and any manual-review requirement. Never claim conversion improvement without real analytics or controlled evidence.

Follow Master Skill's visual convergence rule; do not stop at an arbitrary number of polish rounds. If the owner rejects the visual direction, stop defending or cosmetically polishing it, identify the causes and return to the last owner-preferred baseline.

## Bare-minimum output

The default ADES deliverable is:
1. **One final website** in the project's existing repository.
2. **One concise completion report** in the project conversation: revision/link, what changed, actual checks, visual evidence inspected, limitations and next owner action (if any).

Three lightweight previews are optional exploration evidence, not three deliverables. Keep them private and disposable unless preserving them has clear calibration value.

Do not require separate moodboards, token decks, wireframes, score sheets, stage documents, screenshot presentations, project manifests or design approval workflows. Create only the smallest additional artifact that materially improves implementation, verification, safety or future reuse.

## Reusable invocation

> Apply ADES to this website using the existing project context and its declared operating mode. Explore up to three genuinely distinct, lightweight design directions only if that adds value; evaluate them against the real business and visitor task; synthesise one coherent direction; build one final website in the existing stack; then run the relevant tests and inspect the rendered result across desktop, tablet and mobile. Make routine design and technical decisions autonomously. Keep exploratory previews private and out of production. Do not fabricate facts, proof, permissions or working business actions. Do not stop after exploration or ask me to choose routine design details. Report what was actually built, tested and visually reviewed, including limitations.

## Golden Sample — Laundry Ceria Test 03

**Reference status:** owner-liked exemplar for the ADES explore → evaluate → synthesise → build method. It is a private synthetic experiment, not a production template or proof of conversion effectiveness.

- Repository: [kannaryukkei/laundry-ceria-website](https://github.com/kannaryukkei/laundry-ceria-website)
- Pull request: [#14 — ADES exploration, synthesis and build](https://github.com/kannaryukkei/laundry-ceria-website/pull/14) — open, draft, unmerged.
- Branch: `experiment/test-03-ades-exploration`
- Exact reference commit: `f1fa930cb491b1b0318564afc03bfa767366e952`
- Base: `experiment/test-02-independent-generation` at `157f9bf84fb1d96ab3c6d7bfadb4968e160c32a0`
- Verification: [GitHub Actions run #246](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44647860683) succeeded. The shared website quality gate reported `PASS_WITH_MANUAL_REVIEW_REQUIRED`: zero reported typography, contrast and responsive failures, with a manual visual-review flag retained.

What to learn from it: three distinct directions were explored; the integrated website combined the neighborhood personality, price-first information hierarchy and textile-led art direction into one coherent result. The estimator and accessible responsive navigation were then implemented and tested once in the final application.

Do not copy its synthetic business facts or assets into client work. The candidate pages under `public/ades/` are experimental evidence on this private draft branch; they are not approval to deploy that branch. Any release candidate must exclude internal candidate previews and re-verify all content, assets, rights, contact destinations and release requirements.
