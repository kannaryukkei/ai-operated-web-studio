---
name: frontend-layout-implementer
description: 'Implement an approved Design Implementation Spec in the project’s existing frontend stack with close visual fidelity, small scoped changes and explicit verification.'
license: Apache-2.0; see skills/upstream/webdev-agent-kit/LICENSE
metadata:
  author: OpenAI Operated Web Studio (adapted from ytvee-dev/webdev-agent-kit)
  upstream: https://github.com/ytvee-dev/webdev-agent-kit/tree/170504cdabf24269e62fca3009229750351ac3cf/skills/frontend-layout-implementer
  upstream-commit: 170504cdabf24269e62fca3009229750351ac3cf
  adaptation: studio-specific; supports HTML/CSS/JS, React/Vite and Laravel/Inertia
---

# Frontend Layout Implementer

## Purpose

Translate an approved Design Implementation Spec into the existing website code with high visual fidelity. The approved reference is a contract: preserve its composition, hierarchy, asset framing, typography, spacing rhythm and interaction intent. Do not turn it into a loosely inspired redesign while coding.

This skill is stack-aware and supports the Studio's actual delivery targets: static HTML/CSS/JavaScript, React + Vite, React + Laravel/Inertia, and other explicitly approved existing frontend stacks. It does not require a framework migration.

## When to use

- Implementing a page, section or component from an approved design spec or visual reference.
- Refining an existing implementation against a documented visual mismatch.
- Building the agreed responsive behavior and interaction states.
- Continuing a staged website implementation after a saved segment checkpoint.

## Do not use when

- The design direction has not been selected or the reference has not been inspected. Use frontend-design and design-screenshot-spec first.
- The user requested only a visual critique or browser comparison. Use frontend-visual-qa or frontend-quality-reviewer.
- The requested change is outside the approved website scope.
- A required behavior, asset permission or high-impact design decision remains unresolved.

## Required context

1. Approved Client Brief, fact register, copy deck and asset/permission register.
2. Approved design direction and Design Implementation Spec.
3. Website tier, scope, non-goals and release constraints.
4. Existing repository instructions, package manifest, routes, entrypoints, components, styles, tokens and verification scripts.
5. Current design reference files and any prior visual QA findings.
6. Current checkpoint and open issue list when resuming segmented work.

## Core implementation rules

### 1. Inspect before coding
- Detect the real stack from package manifests, config, route tree and existing source; never infer it from a previous client.
- Identify page ownership, CSS strategy, components, assets and actual build/test commands.
- Preserve existing conventions. Do not migrate frameworks, replace a styling system, add a UI library or install dependencies without explicit approval.
- Reuse existing tokens and components only when they fit the reference. Do not force a generic shared component onto a distinctive one-off section.

### 2. Treat design as a contract
- Translate the spec into a section/component map before editing.
- Preserve macro-composition first: section order, proportions, alignment, dominant visual, negative space and content density.
- Then match typography, image ratio/crop/focal point, colors, surfaces, borders, shadows and details.
- Use supplied/approved assets at their intended role. Never replace a distinctive hero image with a random search result or generic gradient because it is easier to code.
- If an asset is missing, record it and propose a consistent alternative for approval; do not quietly substitute.
- Keep supplied text and business facts accurate. Replace illegible AI-generated visual text with approved copy, not invented client claims.
- Do not add decoration, cards, section labels, counters, animations or interactions unless they serve the spec and visitor task.

### 3. Build by bounded segments
- Divide the page into small meaningful implementation slices (for example: header, hero, menu, detail section, footer), based on visual and code dependencies.
- Implement one focused slice at a time. Do not write the entire website in one long unverified code dump.
- After each slice: run the cheapest relevant check, inspect the changed source, save the work as a small commit/checkpoint when Git is available, and update the progress/issue record.
- A checkpoint must state: completed slice, changed files, verification actually run, failures/unknowns, next slice and current branch/commit.
- If interrupted or a tool fails, leave the last checkpoint usable. Resume from recorded state; do not restart or overwrite successful work.
- Keep each work unit bounded. When the next slice depends on unresolved facts or a failed check, stop that slice and continue independent work only.
- Never claim that a partial implementation is complete.

### 4. Keep the code fit for purpose
- Use semantic HTML and accessible names/labels.
- Keep content/data separate from presentation when it improves maintainability.
- Keep components focused; split large sections when state, data transformation, repeated markup or interaction becomes difficult to reason about.
- Use CSS Grid/Flexbox and fluid constraints according to the design spec, not arbitrary fixed positioning that only works at one reference width.
- Preserve keyboard access, visible focus, reduced motion, useful alt text and truthful control semantics.
- Every CTA and apparent control needs a documented action and exact approved destination. No fake booking, contact, checkout or success state.
- No paid API, backend, database, CMS, analytics, component registry or external service unless the approved scope requires and authorizes it.

### 5. Verify continuously
- Run the project's existing build/lint/test commands for the changed slice when practical.
- Use the browser workflow for rendered checks when browser tooling is available. An installed Playwright package or a build pass does not prove the page looks right.
- Compare at the same viewport as the source reference and check relevant desktop/tablet/mobile widths.
- Fix obvious layout drift before proceeding to the next major slice.
- Record every intentional deviation from the reference and its reason.

## Workflow

1. Confirm the approved spec and scope.
2. Inspect the project and report any stack mismatch or missing asset before editing.
3. Create a short implementation map with ordered, independently verifiable slices.
4. Set a baseline revision/checkpoint.
5. Implement the first slice only.
6. Build/check and compare the first slice with the reference at its target viewport.
7. Save a checkpoint and record deviations.
8. Continue one slice at a time, preserving completed work.
9. Once the planned slices are complete, run the full production build and existing automated tests.
10. Hand rendered comparison to frontend-visual-qa.
11. Hand the completed code and evidence to frontend-quality-reviewer when the surface is significant or the stage requires independent review.
12. Report what is done, what is unverified and the exact next action.

## Output contract

For each segment checkpoint report:

- Current branch and commit/checkpoint.
- Completed slice and changed files.
- Reference fidelity: matched / deviated / not yet compared.
- Commands/checks actually run and results.
- Open defects, missing assets or blocked decisions.
- Next bounded slice.

For final handoff report total scope, stack/conventions preserved, deviations, build/lint/test status, browser visual QA status and owner-review requirements.

## Validation gates

- No implementation starts from a moodboard alone; an approved direction and implementation spec are required.
- No major reference decision is silently redesigned during coding.
- No slice is called complete without an observable check.
- No visual match is claimed from source-code inspection or build success alone.
- No fake CTA or simulated business operation is introduced.
- No new dependency or architecture layer is introduced without approval.
- No unresolved high-impact decision is hidden in an assumption.
- Every work segment leaves a resumable checkpoint.
