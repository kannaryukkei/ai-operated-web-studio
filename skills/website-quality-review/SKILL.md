---
name: website-quality-review
description: Review a website's visual design, rendered fidelity, interface/accessibility behavior and overall implementation quality. Select only the review dimensions needed for the current task; use actual browser evidence for visual claims.
---

# Website Quality Review

## Purpose

Provide one consolidated review method for a website. It replaces four overlapping reviewer skills while preserving their distinct review dimensions:

1. Aesthetic quality and cross-project distinctiveness.
2. Fidelity to an approved screenshot or design reference.
3. Interface semantics, accessibility, responsive behavior and truthful interactions.
4. Overall implementation acceptance against the agreed scope and evidence.

Do not mechanically run every dimension on every task. Select the smallest useful review. A visual critique is not code acceptance; a passing build is not visual proof; a screenshot is not an accessibility or release approval.

## Choose review dimensions

- **AESTHETIC** — Is the website distinctive, coherent and appropriate for the business, audience and visitor task?
- **VISUAL_FIDELITY** — Does the real browser-rendered page match the approved screenshot/design reference at the relevant viewports and states?
- **INTERFACE** — Are semantics, keyboard use, accessibility, interaction behavior, content states and responsive behavior correct?
- **ACCEPTANCE** — Does the changed implementation satisfy its agreed scope and acceptance criteria, with defensible code and test evidence?
- **FULL** — Use all applicable dimensions when the task asks for a broad website audit or final quality review. Omit dimensions that have no meaningful target or evidence.

## Review authority and safety

- The project conversation is the live authority for scope, facts, decisions and requested review. The selected operating mode remains binding.
- In `client_service`, verify public facts, claims, prices, policies, contacts, asset rights and permissions against real source material. Do not accept invented or unsupported proof.
- In `studio_development`, synthetic content is permitted only as clearly labelled internal test data. It is not real client evidence and cannot authorize public release.
- Do not make scope, content, design-direction or external-action decisions on the owner's behalf when they require explicit human authorization.
- This is a review skill. Do not silently fix or rewrite the site unless the user explicitly requested review-and-fix. Route implementation work to `frontend-layout-implementer`.
- State whether the review used fresh context or is a self-review. A separate skill invocation alone does not make a review independent.

## Optional Hostinger website-quality benchmark

When the task requests a broad website-quality benchmark or final acceptance review, use `docs/HOSTINGER_GOOD_WEBSITE_BENCHMARK_v1.0.md` as an optional cross-check. It preserves the source article's two layers: Design/Functionality/Features/SEO/UX factors and its 15 website qualities.

Apply only criteria relevant to the actual business and approved scope. In particular:
- Do not require e-commerce checkout, breadcrumbs, internal search, analytics, structured data, blogs or lead segmentation when they do not serve the site.
- Record PASS, CONCERN, FAIL, N/A or NOT TESTED separately for each relevant item.
- Require actual evidence for performance, security, SEO, structured data, accessibility, tracking and lead behavior. Do not infer outcomes from a build or screenshot.
- Preserve the source article's quality-visuals preference, but apply the Studio's separate media-sourcing and licensing rules for authentic client media, concept imagery and licensed stock.
- Treat the benchmark as a review aid, not a new project stage, mandatory artifact package, scoring system or release authorization.

## Required evidence

Use only what the selected dimension needs:

- Project conversation, operating mode, intended audience and task.
- Agreed scope, key business facts and intended CTA behavior.
- Actual source diff, repository, branch, commit or exact working-tree state.
- Approved design/reference images when testing visual fidelity.
- Real browser screenshots at actual viewport scale for visual claims.
- Existing tests, build output, browser console/network logs and relevant interaction states.
- Previous findings and before/after evidence when verifying fixes.

Pin the exact revision. Record viewport dimensions, URL, browser/version if known and capture method. If a browser cannot be launched or actual screenshots cannot be inspected, visual verdicts are BLOCKED or NOT TESTED. Do not infer appearance from filenames, source code, mockups or CI metadata.

## AESTHETIC review

Inspect the whole page and every meaningful segment: header/navigation, hero, main sections, offers/products/services, evidence/trust, process/FAQ, conversion area and footer.

Evaluate:

- Fit to the real business, audience, offer and visitor task.
- **First-screen effectiveness:** within a few seconds, can a new visitor identify the offer, the most relevant benefit and the next action?
- **Hero quality:** is the headline specific, is the dominant visual relevant and well-composed, and is the primary CTA visible, truthful and actionable? A technically polished but bland or text-only hero is still a design weakness when the business needs a tangible visual.
- **Business-specific visual evidence:** does the imagery make the offer more tangible, or is it generic decoration unrelated to the service/product?
- Distinctive art direction, hierarchy, composition, grid, alignment, negative space and section rhythm.
- Typography roles, legibility, line length, wrapping and content density.
- Image choice, quality, relevance, aspect ratio, focal point, crop and authenticity.
- Color, contrast, surfaces, borders, cards, controls, icon language and motion.
- Responsive reading order and consistency without forcing every viewport into the same layout.
- Whether each section answers a visitor question or strengthens the brand, rather than adding filler.

When recent relevant projects or reference screenshots are available, compare composition, hero treatment, section order, grid, type voice, image language, surfaces and interaction grammar. State limitations when prior work cannot be inspected. Look for repeated split heroes, card grids, eyebrow labels, decorative numbering, arrows and generic section sequences; retain a pattern only when it serves the visitor or brand.

Return one aesthetic verdict:

- **DISTINCTIVE** — the visual grammar clearly fits this business and is not mistaken for a re-skin of prior work.
- **COMPETENT BUT GENERIC** — coherent and usable, but too dependent on familiar template patterns.
- **DERIVATIVE** — mainly a re-skin or near-copy of previous work.

A palette/font/illustration change alone is not meaningful differentiation. Prefer removing or simplifying weak elements over adding decoration.

## ITERATIVE AESTHETIC REFINEMENT

Use this loop whenever the task is to build, improve or review-and-fix a website's visual quality. A review-only request may stop after findings; an active build/refinement should continue through implementation and re-review without asking the owner to approve routine visual fixes.

1. **Pin the actual revision and evidence.** Capture real browser screenshots of the rendered site, normally at 1440px desktop, 768px tablet and 390px mobile. Add 320/360px narrow mobile and any widths where the layout changes or prior problems appeared. Inspect full-page rhythm and key sections at actual viewport scale; do not judge from source code or a downscaled collage alone.
2. **Review the whole experience, not just the latest change.** Inspect the first screen and hero first, then every meaningful section, imagery, conversion path, footer and responsive state. Look at visual hierarchy, business fit, message clarity, CTA behavior, image quality/crop, type, spacing, alignment, density, color, section rhythm and repetition.
3. **Use distinct critique lenses across rounds.** At minimum, cover:
   - visitor/business lens: offer clarity, benefit, trust, decision friction, CTA and whether the page helps a real visitor act;
   - art-direction lens: distinctiveness, hero impact, composition, visual focal point, image choice, typography voice and coherence;
   - craft/responsive lens: proportions, alignment, spacing, wrapping, crop, density, states and behavior across tested sizes.
   Do not let a weak initial design direction become the standard merely because the implementation matches it.
4. **Keep a concise issue ledger.** For each actionable issue record the exact page/section, viewport/state, evidence, severity, visitor/brand impact and correction. Include weaknesses in the design direction itself, not only implementation bugs. Do not invent defects to justify another pass.
5. **Fix the highest-impact group, then re-capture.** Prioritize broken or misleading conversion behavior, unclear offer/hero, weak or irrelevant imagery, poor hierarchy, readability, composition and then local polish. Preserve working sections and avoid regenerating the website when a focused revision is enough.
6. **Repeat without a fixed iteration limit.** After each meaningful correction, rebuild, capture the same before/after viewports and inspect the whole page again for regressions and newly visible weaknesses. Continue until the convergence rule below is met. If an issue remains, revise the underlying concept or implementation rather than accepting repeated failure because a nominal cycle limit was reached.
7. **Use fresh judgment where possible.** A genuinely fresh-context or independent critique is valuable for final review. When that is unavailable, rotate the review lens and explicitly label the result as self-review; repeating the same self-review prompt does not create independence.

### Convergence and stopping rule

Do not claim that a page has "no visual gaps" merely because it looks better, the build passes or a quality gate is green.

A visual pass may be reported as **NO KNOWN ACTIONABLE VISUAL GAPS IN TESTED SCOPE** only when:

- every earlier BLOCKER, HIGH, MEDIUM and LOW visual finding is FIXED or has a clearly stated external blocker; and
- two consecutive complete sweeps of the whole site, using different critique lenses, find no new actionable BLOCKER, HIGH, MEDIUM or LOW visual issue across the agreed desktop, tablet and mobile scope. When available, make one of those sweeps a fresh-context/independent review; otherwise disclose that both were self-reviews; and
- the final screenshots confirm the last changes and show no material regression.

NIT items are subjective refinements rather than material defects. Record any remaining NIT briefly; do not inflate them into a false claim of perfection or keep changing the design solely to make it different. If an external fact, asset, right or approval blocks a correction, mark it BLOCKED and state exactly what is needed. The number of review/fix rounds is determined by evidence and convergence, not by a preset cap.

A visual all-clear is limited to the inspected pages, sizes and states. It does not prove conversion performance, accessibility, keyboard behavior, cross-browser compatibility, performance or production readiness; review those separately when relevant. A CI/technical quality-gate PASS is not proof of aesthetic quality or sellability.

## VISUAL_FIDELITY review

Use only when an approved screenshot, mockup or design implementation reference exists.

1. Compare the exact rendered revision to the exact reference. Keep reference images and implementation screenshots distinct.
2. Capture at actual scale, normally 1440px desktop, 768px tablet and 390px mobile; add 320–360px widths and supplied reference widths when relevant.
3. Review macro-composition first: page width, section proportions, hero, focal point, alignment, grid, negative space, content order and density.
4. Review detail: typography/wrapping, spacing, color/contrast, borders, radius, shadows, imagery/crop, icons and alignment.
5. Review responsive adaptation and the interactive states that the reference actually defines.
6. Keep an issue ledger with viewport/state, reference evidence, observed result, severity, user impact and an exact correction.
7. After a fix, recapture the same viewport and state. Compare before/after at the same scale. Repeat review and correction as often as needed; there is no arbitrary two-cycle cap. If the same issue survives a correction, re-examine its root cause, the quality of the chosen design direction and the reference judgment instead of repeating the same patch.

Return one visual verdict:

- **VISUAL MATCH** — no material mismatch remains.
- **MATCH WITH DOCUMENTED DEVIATIONS** — deviations are explicit and accepted.
- **VISUAL MISMATCH** — material differences remain.
- **BLOCKED** — reliable rendered evidence was unavailable.

A static screenshot cannot prove keyboard behavior, accessibility, performance or cross-browser compatibility.

## INTERFACE review

Inspect source and the actual rendered interface where possible.

### Semantics and content

- Correct heading hierarchy and landmarks.
- Links navigate; buttons perform actions; static content does not falsely look interactive.
- Icon-only controls have accessible names; decorative icons are hidden from assistive technology.
- Images have appropriate alt text and dimensions.
- Form labels, instructions and errors are associated with the right controls.
- Loading, empty, error, unavailable and long-content states remain understandable.

### Accessibility and keyboard

- All functionality is keyboard reachable and operable.
- Focus is visible and not obscured by sticky elements or overlays.
- Menus/dialogs manage focus and Escape correctly; focus returns to the invoker when dismissed.
- Test representative end-to-end keyboard tasks, not only isolated focus styles.
- Check text contrast (WCAG AA target: 4.5:1 normal text, 3:1 large text) and relevant non-text controls/focus indicators (3:1). Record actual color pairs and ratios when measured.
- Include important hover, focus, active, disabled, expanded and error states where they exist.
- Respect reduced motion and provide usable touch targets/gesture alternatives.

### Truthful interactions

- Every apparent control has a real, understandable action and destination.
- No fake booking, form success, order confirmation, payment, sending, storage or operational state.
- Disabled/unavailable actions disclose the reason and safe next step.
- Do not invent client data, public contact destinations or backend behavior to make a control appear functional.

### Responsive and implementation checks

- Check the site's intended mobile, tablet and desktop layouts.
- Check overflow, long labels, forms, image crop, reading order, fixed/sticky elements and touch controls.
- Review console/network failures and oversized/unoptimized assets when relevant.
- Do not report Lighthouse/Core Web Vitals or full performance results unless measured.
- Do not add dependencies solely for a style preference.

## ACCEPTANCE review

Use when judging a completed implementation or material code change.

1. Pin repository, branch, base/head commits and changed files.
2. Read agreed scope and acceptance criteria before inspecting the implementation.
3. Inspect the diff, component boundaries, semantic markup, data flow, styles, assets and configuration.
4. Confirm the existing stack and project conventions were preserved unless an authorized change says otherwise.
5. Verify visitor outcomes, factual integrity, asset permissions, contact/CTA behavior and no cross-project contamination.
6. Inspect relevant build, lint, unit, browser and screenshot evidence. Rerun only when evidence is stale/missing or a failure needs reproduction.
7. Record every in-scope criterion as PASS, FAIL, DEVIATION, BLOCKED or NOT TESTED.
8. Separate required fixes from optional improvements and subjective preferences.

Severity:

- **BLOCKER** — unsafe, misleading, data/security-integrity or critical functional/accessibility failure.
- **HIGH** — primary journey or major user group materially impaired.
- **MEDIUM** — repeated friction, meaningful responsiveness, accessibility or maintainability concern.
- **LOW** — localized polish with limited impact.
- **NIT** — optional preference.
- **PRAISE** — strong implementation decision supported by evidence.

Return one scoped acceptance verdict:

- **PASS** — all critical in-scope criteria pass, no required fixes remain and evidence supports the claims.
- **PASS WITH CONCERNS** — no blocker/high issue remains, but limitations, lower-severity findings or untested areas are disclosed.
- **FAIL** — a blocker/high required issue remains or a critical criterion fails.
- **BLOCKED** — the implementation or its acceptance basis cannot be inspected well enough to judge.

A code-review PASS is not production readiness, client approval or release authorization.

## Required output

Start with review mode(s), project revision, evidence inspected and whether this is fresh-context review or self-review.

Then return only the sections relevant to the chosen modes:

- **Overall verdict:** aesthetic, visual fidelity and/or acceptance verdicts remain separate.
- **Findings:** ID, severity, exact file/line or viewport/state, evidence, user impact, correction and status.
- **Acceptance matrix:** each in-scope criterion and its result.
- **Visual evidence:** screenshots/viewport/state actually inspected and before/after references where relevant.
- **Business/content integrity:** source support, rights, mode labels and honest CTA behavior.
- **Accessibility/responsive:** checks performed and exact NOT TESTED items.
- **Limitations and next action:** only material unresolved issues; distinguish required fixes from optional ideas.

Do not produce a long checklist when no issue is relevant. Concision is not permission to omit a real blocker.
