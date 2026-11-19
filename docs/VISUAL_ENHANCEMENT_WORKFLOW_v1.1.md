# Visual Refinement Guide v1.1

**Purpose:** A lightweight, optional method for improving a website's actual rendered visual quality through repeated critique and correction. It is not a mandatory project stage or a file-generation requirement.

## Working principles

- The project conversation holds the live scope, decisions, findings and next action.
- This guide is subordinate to the adopted Master Skill and the current project mode.
- Preserve a sound direction, but do not preserve a weak direction merely because it was previously approved by the AI. Revisit strategy and reference judgment when the page remains generic, unclear or visually unconvincing.
- Inspect the actual website in a browser. A build pass, source skim, mockup or CI report is not proof of rendered quality.
- Keep diagnosis and code implementation distinct. Use `website-quality-review` to critique and `frontend-layout-implementer` to implement focused corrections.
- Keep factual accuracy, real-client asset rights and release restrictions. Synthetic content is allowed only in `studio_development` and must remain internal.

## 1. Pin and capture the baseline

Record in the project conversation:

- Repository, branch and exact commit or working-tree state.
- Preview URL and the command used to build/serve it.
- Browser and viewport dimensions when known.
- Business/visitor objective, selected design direction and relevant references.
- Existing tests and known limitations.

Capture actual browser screenshots at viewport scale. A practical starting set is 1440px desktop, 768px tablet and 390px mobile. Add 320/360px widths, intermediate widths and problem-specific sizes when relevant. Inspect both full-page rhythm and important viewport-level details. A downscaled full-page image is not enough to judge typography, crop or fine alignment.

The Shared Website Quality Gate/Playwright runner may be used when it matches the website stack. Open and inspect the actual PNGs, not only the report or artifact URL. If screenshots cannot be opened and inspected, visual review is BLOCKED or NOT TESTED.

## 2. Establish whether the strategy is good enough

Before polishing code, check that the page is solving the correct visitor problem. Use `design-strategy-and-judgment` when the art direction or reference choices are material.

Ask:

- Is the offer and intended audience clear from the first screen?
- Does the headline communicate a concrete benefit rather than a vague slogan?
- Is there a real, specific visual that makes the business tangible?
- Is the main CTA visible and connected to a real, verified action?
- Are trust and decision details honest and useful?
- Were reference patterns selected because they work for this visitor, or merely because they look attractive?
- Is the direction distinct from generic AI/page-builder defaults without becoming confusing?

A weak strategy or hero is a design-level defect. Do not try to rescue it with more shadows, gradients, cards or micro-polish. Revisit the direction and then refine the implementation.

## 3. Review and record evidence

Use `skills/website-quality-review/SKILL.md` and choose the relevant review dimensions:

- AESTHETIC: fit, hero impact, distinctiveness, hierarchy, composition, type, imagery and section rhythm.
- VISUAL_FIDELITY: actual screenshot comparison against a chosen reference.
- INTERFACE: semantics, accessibility, truthful interactions and responsive states.
- ACCEPTANCE: implementation against scope and actual evidence.

Keep verdicts separate. A distinctive design may still have interface defects; a visual match may still fail accessibility or functionality.

For each actionable finding, record:

- Finding ID and severity (BLOCKER / HIGH / MEDIUM / LOW).
- Page/section, exact viewport/state and screenshot evidence.
- What is weak or wrong, and its visitor/business/brand impact.
- The concrete correction and how it will be verified.

Separate confirmed visual defects from subjective NIT preferences. Do not add cards, sections, animation or decoration just to make the page busier.

## 4. Iterate until the visual result converges

There is **no fixed maximum number of critique/fix rounds**. Continue the loop for as many rounds as the evidence requires:

1. Critique the whole rendered website, not only the changed component.
2. Prioritize the issue that most weakens comprehension, trust, conversion or the visual identity.
3. Implement a focused correction while preserving verified work.
4. Rebuild and capture the same viewport/state for before-and-after comparison.
5. Inspect the entire page and relevant responsive sizes again to detect regressions and newly visible issues.
6. Update the issue ledger: FIXED, OPEN, BLOCKED or NIT.
7. Change the underlying strategy when a weak concept keeps producing weak execution. Do not repeat the same patch against a bad direction.

Rotate critique lenses across rounds: visitor/conversion, art direction/composition, and visual craft/responsive behavior. Use a fresh-context reviewer for final scrutiny when available. If the same context performs both implementation and review, state that it is self-review.

### Convergence rule

Report **NO KNOWN ACTIONABLE VISUAL GAPS IN TESTED SCOPE** only after:

- all BLOCKER, HIGH, MEDIUM and LOW findings are fixed or explicitly blocked by a genuine external dependency;
- two consecutive full-site sweeps using different critique lenses find no new actionable BLOCKER, HIGH, MEDIUM or LOW finding across the agreed desktop/tablet/mobile viewports. When possible, make one sweep a fresh-context/independent review; otherwise disclose that both were self-reviews; and
- the final same-scale screenshots confirm the corrections and reveal no material regression.

List any remaining NIT preferences or external blockers. Do not claim perfection outside the pages, sizes and states actually inspected. Do not stop after an arbitrary number of iterations, and do not keep iterating solely to make a subjective change once the convergence rule is met.

## 5. Re-test separately and close the loop

After visual corrections, run the relevant existing checks:

- production build and typecheck;
- browser and responsive checks;
- affected interactions and keyboard flow;
- contrast and legibility checks;
- console/network inspection when relevant.

A screenshot improvement does not prove accessibility, keyboard operation, performance, cross-browser compatibility, business completeness or production readiness. State exactly what was tested and what was not.

A technical gate PASS is not proof of visual quality, conversion performance or sellability. Do not label a site sell-ready solely because CI is green.

## Completion

The visual pass is complete when the convergence rule is met, required issues are fixed or explicitly blocked, evidence supports the report and limitations are visible. State the exact tested revision and scope.

This guide does not authorize a release. In real client work, publishing, spending, DNS changes, external messages and ownership transfer still require the appropriate explicit authorization.
