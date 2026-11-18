# Visual Refinement Guide

**Purpose:** A lightweight, optional method for diagnosing and improving a website's rendered visual quality. Use when the page needs a substantive visual pass; it is not a required project stage or a file-generation requirement.

## Working principles

- The project conversation holds the live scope, decisions, findings and next action.
- This guide is subordinate to Master Skill v1.13 and the current project mode.
- Preserve the agreed design direction unless the owner explicitly changes it.
- Inspect the actual website in a browser. A build pass, source skim or design mockup is not proof of rendered quality.
- Keep review and implementation distinct. Use the consolidated website quality review skill to diagnose; use the frontend layout implementer to make scoped corrections.
- Keep all real-client facts, asset permissions and release restrictions. Synthetic content is allowed only in studio_development and must remain internal.

## 1. Pin and capture the baseline

Record in the project conversation:

- Repository, branch, commit or working-tree state.
- Preview URL and the command used to build/serve it.
- Browser and viewport dimensions when known.
- Chosen design direction/reference and relevant page/state.
- Existing tests and known limitations.

Capture real browser screenshots at actual viewport scale. A practical baseline is 1440px desktop, 768px tablet and 390px mobile; add narrower widths or exact reference sizes when useful. Inspect key sections at viewport scale. Full-page screenshots help assess section rhythm but are not sufficient to judge small text.

The Studio's Shared Website Quality Gate/Playwright runner may be used when it matches the website stack. Inspect the actual PNGs, not only a report or artifact URL. If the screenshots cannot be opened and inspected, state that visual inspection is BLOCKED.

## 2. Review only the dimensions needed

Use skills/website-quality-review/SKILL.md and select the relevant review modes:

- AESTHETIC: fit, distinctiveness, hierarchy, composition, typography, imagery and section rhythm.
- VISUAL_FIDELITY: comparison with an approved screenshot or design reference.
- INTERFACE: semantics, accessibility, truthful interactions and responsive behavior.
- ACCEPTANCE: overall implementation review against the agreed scope and evidence.

Keep the verdicts separate. A distinctive design may still have interface defects; a visual match may still fail accessibility or functionality.

## 3. Record findings that matter

For each material issue, capture:

- Finding ID and severity (BLOCKER / HIGH / MEDIUM / LOW).
- Page, section, file/selector or exact viewport/state.
- Screenshot or reproducible browser evidence.
- What is wrong and its user/business impact.
- The concrete, bounded correction and how it will be verified.

Prioritize factual/conversion integrity, comprehension/readability, navigation and interaction, responsive behavior, composition and finally decorative polish. Do not add cards, sections, animation or decoration merely to make the page busier.

## 4. Refine in bounded slices

Use frontend-layout-implementer for code changes. Group related findings; preserve successful work and avoid regenerating the site from scratch.

Do not invent missing copy, business claims, assets or behavior. Do not introduce a new framework, dependency, backend or external service for visual polish. Escalate changes that alter agreed scope, business facts, public claims, rights, the core design direction or external behavior.

Limit repeated attempts on the same visual issue to two focused correction cycles. If it remains unresolved, report the limitation and the decision genuinely needed.

## 5. Re-capture and close the loop

After each meaningful correction:

1. Rebuild and load the same website revision.
2. Capture the same viewport and interaction state as the baseline.
3. Compare before/after at the same scale; preserve the original screenshot.
4. Run affected website tests and checks.
5. Mark each issue FIXED, OPEN, DEFERRED or ACCEPTED WITH REASON.
6. Record commands, results and NOT TESTED areas honestly.

A screenshot improvement does not prove accessibility, keyboard operation, performance, cross-browser compatibility, business completeness or production readiness. Test these separately when relevant.

## Completion

The visual pass is complete when material BLOCKER/HIGH findings are fixed or explicitly blocked, corrections have matching evidence, remaining limitations are visible, and the next owner/client action (if any) is stated in the project conversation.

This guide does not authorize a release. In real client work, publishing, spending, DNS changes, external messages and ownership transfer still require the appropriate explicit authorization.
