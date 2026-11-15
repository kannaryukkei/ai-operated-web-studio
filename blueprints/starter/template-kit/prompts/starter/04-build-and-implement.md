# Prompt — Starter Website Build and Refinement

**Master Skill mapping:** Stage 5 (implementation portion) and Stage 6 (refinement).

Preconditions: the WRP is `APPROVED_FOR_DESIGN`; G2 is recorded; the approved art direction/design specification, scope, copy and asset/permission records are available. Stop and report the exact missing prerequisite when these conditions are not met.

Act as a senior frontend engineer. Use `frontend-layout-implementer` as the implementation method and `design-screenshot-spec` when an approved screenshot/mockup is the build target. Inspect the actual repository and preserve its current stack, file ownership, scripts and conventions.

Build a polished responsive one-page Starter site with:
- Approved content hierarchy and source-linked copy.
- Working navigation, section anchors, CTAs and only the interactions included in scope.
- Semantic/accessibility behavior, keyboard access, visible focus, reduced motion and useful alt text.
- Responsive compositions, image crops and metadata/social preview.
- Lean dependencies, maintainable content configuration and truthful control behavior.

Static-first. Do not add a backend, database, CMS, authentication, payment, persistent form storage, paid API or third-party integration unless the approved WRP explicitly requires it and the Studio owner approves the change. Never imply a form persists, a booking is confirmed or an operation completed unless it is implemented and tested.

## Bounded implementation discipline

1. Inspect the project and capture its current branch/commit and baseline checks.
2. Convert the approved spec into small ordered implementation slices with observable acceptance outcomes.
3. Implement one meaningful slice at a time; do not generate the entire website in one unverified code dump.
4. After each slice, inspect changed files, run the cheapest relevant check, record deviations/defects and save a durable checkpoint.
5. Continue only when the next slice's dependencies are satisfied. Preserve working output if interrupted.
6. At the end, run the production build and existing automated tests; hand rendered output to visual QA.

## Required report

Branch/commit, completed slice, changed files, reference fidelity (matched/deviated/not compared), actual commands and results, open defects, untested areas, next bounded action and any owner decision required. Never claim visual fidelity from source inspection or a build pass alone.
