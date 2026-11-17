---
name: frontend-visual-qa
description: 'Compare a real browser-rendered website against its approved design reference, capture viewport evidence, identify visual drift and run bounded scoped corrections.'
license: Apache-2.0; see skills/upstream/webdev-agent-kit/LICENSE
metadata:
  author: OpenAI Operated Web Studio (adapted from ytvee-dev/webdev-agent-kit)
  upstream: https://github.com/ytvee-dev/webdev-agent-kit/tree/170504cdabf24269e62fca3009229750351ac3cf/skills/frontend-visual-qa
  upstream-commit: 170504cdabf24269e62fca3009229750351ac3cf
  adaptation: studio-specific
---

> **Modification notice:** Adapted and modified from ytvee-dev/webdev-agent-kit; see `skills/upstream/webdev-agent-kit/UPSTREAM.md` and the retained Apache-2.0 license.

# Frontend Visual QA

## Purpose

Verify that the implemented website actually resembles the approved Design Implementation Spec and visual references when rendered in a real browser. This skill closes the design-to-code feedback loop.

A successful build, passing unit test or static CSS inspection is not visual QA. A rendered screenshot is required for any claim that the page was visually checked.

## When to use

- After a page or meaningful section is implemented.
- When a screenshot comparison, responsive rendering, visual regression or visible state check is required.
- When a user reports that the coded result looks weaker or different from the approved direction.
- After a scoped visual correction that needs re-verification.

## Do not use when

- Only static source properties need inspection; read source styles/tokens directly.
- The user requests an aesthetic redesign rather than fidelity verification; return to frontend-design and obtain a new approved direction.
- No reference, accepted visual contract or rendered page is available. Record the missing input rather than guessing.

## Required evidence

1. Approved Design Implementation Spec and reference screenshots.
2. Current rendered website and the exact commit/working-tree version.
3. Available browser or Playwright tooling and its actual capability.
4. Target viewport list and required page states.
5. Previous audit findings and checkpoint when continuing a repair.

## Tool and evidence rules

- Use a real browser or the project's existing Playwright browser automation to render the current website and capture screenshots.
- Confirm that the tested browser session loaded the changed code at the expected URL/commit.
- Do not claim a rendered check if only source files, a generated mockup, a static HTML/CSS renderer or a design image was inspected.
- If browser access is unavailable or blocked, report the rendered QA as BLOCKED. Continue only with static checks and label them accurately.
- A Playwright package installed in node_modules is not proof that a browser actually launched or the page rendered.
- Preserve reference and implementation screenshots separately. Never describe an AI-generated design image as a screenshot of working code.

## Workflow

1. **Pin the version.** Record repository, branch, commit or working-tree state and the app URL.
2. **Select viewports.** Use the reference's actual widths where known. For responsive sites, normally include desktop 1440px, tablet 768px and mobile 390px; include 320/360px narrow screens when relevant.
3. **Capture at actual scale.** Capture viewport screenshots at 100% for key sections. Use full-page screenshots only to assess section rhythm; do not use a downscaled full page as the sole readability evidence.
4. **Compare macro-composition first.** Check:
   - Overall page width and section proportions.
   - Hero composition, dominant visual and crop.
   - Alignment, grid, negative space and section rhythm.
   - Content order and density.
5. **Compare visual details.** Check typography roles, wrapping, line lengths, colors, contrast, borders, radii, shadows, imagery, focal points, icon quality and alignment.
6. **Compare responsive behavior.** Check stacking/reordering, mobile navigation, safe image crop, control sizes, text wrapping, footer layout and horizontal overflow.
7. **Exercise visible states.** Where the spec defines them, test menu open/close, tabs/filtering, accordions, hover/focus/selected/disabled/error/empty states and keyboard behavior.
8. **Check runtime only in scope.** Record console errors or failed assets when they affect the visible result.
9. **Create a mismatch ledger.** For every material issue: viewport/state, reference evidence, observed implementation, impact, severity and exact correction.
10. **Repair in bounded slices.** Group related findings into one small implementation segment. Do not change the approved design direction during a fidelity repair.
11. **Re-capture after correction.** Compare the same viewport and state; mark each finding FIXED, OPEN or ACCEPTED WITH REASON.
12. **Stop at the retry boundary.** Allow at most two correction cycles for one visual slice before recording unresolved differences and escalating to owner/design direction review. Do not keep running an open-ended loop.
13. **Hand off code-level concerns** to frontend-quality-reviewer rather than expanding visual QA into an unrestricted refactor.

## Standard viewport matrix

Use only relevant sizes and record those actually tested:

| Class | Suggested width | Required evidence |
|---|---:|---|
| Wide desktop | 1440px | Full hero and major section viewport captures |
| Tablet | 768px | Main responsive transition and content density |
| Mobile | 390px | Navigation, hero, main content and controls |
| Narrow mobile | 320–360px | Overflow and headline/control fit when supported |

If the reference uses different widths, include them. Do not claim full responsive coverage from a single desktop and mobile screenshot.

## Required output

### Render record
Repository, branch, commit, URL, browser/version if known, date and render method.

### Viewport/state matrix
PASS / FAIL / BLOCKED / NOT TESTED for each target viewport and state.

### Visual mismatch ledger
Finding, viewport/state, severity, evidence, impact, correction and disposition.

### Asset/crop review
Image loaded, intrinsic dimensions, rendered ratio, focal point and whether the intended subject remains visible.

### Interaction evidence
Control, action, expected result, observed result and keyboard behavior where relevant.

### Final verdict
- VISUAL MATCH — no material mismatch against the approved reference.
- MATCH WITH DOCUMENTED DEVIATIONS — deviations are explicit and approved/accepted.
- VISUAL MISMATCH — material differences remain.
- BLOCKED — no reliable rendered evidence could be obtained.

### Limitations
List browsers, viewports, states, real-device checks and accessibility checks that were not tested.

## Validation gates

- A final visual verdict requires actual rendered browser evidence.
- The tested commit/working-tree state must be recorded.
- The same reference and viewport must be used for before/after comparison.
- Material mismatches must be tied to visible evidence, not vague aesthetic preference.
- No redesign, asset substitution, copy invention or new feature may be introduced under the label of visual QA.
- Do not claim that screenshot QA proves full accessibility, performance, cross-browser compatibility or commercial quality.
- Each repair cycle must be scoped, bounded and checkpointed.

## Master Skill v1.12 integration

This skill supports Master Skill Stage 6 for rendered-fidelity diagnosis and before/after re-verification, and Stage 7 when the acceptance criteria require visual evidence. In Stage 6, produce a mismatch ledger and re-capture the same viewport/state after a bounded correction; do not silently change the approved design direction. Compare the exact rendered project version to the approved design/reference and WRP criteria. Record real browser, viewport, state, commit and screenshot evidence; mark unavailable checks NOT_TESTED. It cannot approve release or waive G5/G6. Do not mistake concept imagery for proof or invent social proof, including in demos. No paid API is required.
