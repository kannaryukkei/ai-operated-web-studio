# Prompt — Starter Website Build and Refinement

**Master Skill mapping:** Stage 5 — Creative direction and implementation.

Preconditions: the WRP is `APPROVED_FOR_DESIGN`; G2 is recorded; the approved art direction/design specification, scope, copy and asset/permission records are available. Stop and report the exact missing prerequisite when these conditions are not met.

Act as a senior frontend engineer. Use `frontend-layout-implementer` as the implementation method and `design-screenshot-spec` when an approved screenshot/mockup is the build target. Inspect the actual repository and preserve its current stack, file ownership, scripts and conventions.

Read the approved Media Requirements Plan, ordered `media-import-queue.json` and canonical Asset/Permission Register before implementation. When the queue has pending images, start `npm run media:watch` in the client website workspace and provide only the precise Save/License handoff. Do not ask the operator to rename/move files or edit the register manually. Build may reference only assets explicitly selected with `is_selected_for_build=YES`, rights/publication APPROVED and a local path. Use `media-sourcing-and-licensing` rules for all approved image/video/animation assets. Build a polished responsive one-page Starter site with:
- Approved content hierarchy and source-linked copy.
- Working navigation, section anchors, CTAs and only the interactions included in scope.
- Semantic/accessibility behavior, keyboard access, visible focus, reduced motion and useful alt text.
- Responsive compositions, image crops and metadata/social preview.
- Approved media stored locally with responsive image sources, intrinsic dimensions/aspect ratios, accurate alt text, focal-point crops and below-fold lazy loading.
- Meaningful video with a local poster, explicit controls when user-driven, captions/transcript where speech matters, no sound autoplay and a reduced-motion/static fallback.
- Purposeful CSS/SVG/Lottie motion only when it improves comprehension or feedback; verify the exact animation licence and respect `prefers-reduced-motion`.
- Lean dependencies, maintainable content configuration and truthful control behavior.

## Conditional data-backed offer variants

Implement a comparison or interactive selector only when the approved WRP explicitly requires it and the Offer Matrix contains complete, source-backed variants. Do not add a selector merely because another Starter or experiment has one.

- Read the canonical offer/variant data and its Fact/Offer IDs. Keep option labels, scope, price or pricing method, exceptions and status in one structured configuration; do not duplicate or retype the same values across components.
- A selection must update every dependent value consistently: selected option label, relevant package/price, supporting explanation and consultation CTA context. Keep the CTA truthful and do not imply a booking, quote or availability confirmation.
- Make the initial/default state deliberate and understandable. Define the empty, unknown, unavailable or incomplete-data state; never fill missing values by inference or display a misleading comparison.
- Preserve the distinction between fixed, indicative and quote-based pricing, including the approved disclosure and who confirms the final amount.
- Keep the interaction keyboard/touch accessible and usable on small screens. Do not introduce a backend or persistence just to remember a selection unless the WRP and owner-approved scope require it.

Static-first. Do not add a backend, database, CMS, authentication, payment, persistent form storage, paid API or third-party integration unless the approved WRP explicitly requires it and the Studio owner approves the change. Never imply a form persists, a booking is confirmed or an operation completed unless it is implemented and tested. Never hotlink stock media as the default delivery strategy, strip required credits, or use any stock/concept asset as client proof.

## Bounded implementation discipline

1. Inspect the project and capture its current branch/commit and baseline checks.
2. Convert the approved spec into small ordered implementation slices with observable acceptance outcomes. Include an explicit slice for each WRP-approved offer-variant interaction and its dependent price/CTA states.
3. Implement one meaningful slice at a time; do not generate the entire website in one unverified code dump.
4. After each slice, inspect changed files, run the cheapest relevant check, record deviations/defects and save a durable checkpoint.
5. Continue only when the next slice's dependencies are satisfied. Preserve working output if interrupted.
6. At the end, run the production build and existing automated tests; preserve the exact baseline commit and rendered evidence, then hand off to prompt 04-visual-enhancement.md for Stage 6. Do not mark visual refinement complete in this prompt.

## Required report

Branch/commit, completed slice, changed files, reference fidelity (matched/deviated/not compared), actual commands and results, open defects, untested areas, next bounded action and any owner decision required. Never claim visual fidelity from source inspection or a build pass alone.
