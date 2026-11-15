---
name: design-screenshot-spec
description: 'Translate supplied website screenshots, visual concepts and approved references into a traceable implementation specification before coding. Preserve reference fidelity and mark inferred details honestly.'
license: Apache-2.0; see skills/upstream/webdev-agent-kit/LICENSE
metadata:
  author: OpenAI Operated Web Studio (adapted from ytvee-dev/webdev-agent-kit)
  upstream: https://github.com/ytvee-dev/webdev-agent-kit/tree/170504cdabf24269e62fca3009229750351ac3cf/skills/design-screenshot-spec
  upstream-commit: 170504cdabf24269e62fca3009229750351ac3cf
  adaptation: studio-specific
---

> **Modification notice:** Adapted and modified from ytvee-dev/webdev-agent-kit; see `skills/upstream/webdev-agent-kit/UPSTREAM.md` and the retained Apache-2.0 license.

# Design Screenshot Spec

## Purpose

Turn an approved screenshot, visual direction image, existing website reference or supplied design file into a concrete Design Implementation Spec that a coding agent can follow. The screenshot is an implementation reference—not loose inspiration.

This skill closes the gap between "the mockup looks right" and "the coded website actually resembles it". The spec must capture the composition, dimensions, typography, color, asset treatment, content density, responsive behavior and interaction states that are visible, while separating measured facts from visual estimates.

## When to use

- Before implementing a website or section from an approved image, screenshot, mockup or design direction.
- When an implementation drifted from its reference and needs a traceable correction spec.
- When comparing a website reference to an existing Studio design system.
- When a design image contains several page sections or responsive examples that need to be decomposed into buildable slices.

## Do not use when

- The user asks only for an aesthetic critique without implementation.
- The user already supplied a complete, approved implementation spec and asks to code it; use frontend-layout-implementer.
- The supplied image is only a moodboard or inspiration source and the user has not chosen it as the implementation target. Use frontend-design to establish direction first.
- The source image is unreadable or unavailable. Do not pretend to have inspected it.

## Required inputs

1. Approved design direction / reference image(s), with source identity.
2. Client brief, copy deck and fact register.
3. Asset register and permission state.
4. Target website scope and supported project stack.
5. Known viewport sizes. If absent, request or mark them as unknown; do not infer a Figma frame size from a downscaled chat preview.

## Workflow

1. **Inventory references.** Record every image/file/link, source identity, visible viewport or canvas size, page/section, state and any supplied annotations. Keep different references distinct.
2. **Inspect at full useful scale.** Review the complete composition first, then crop/zoom important sections. Do not use a reduced full-page image as the only evidence for typography, small labels or spacing.
3. **Decompose the page.** Identify header, hero, main content regions, conversion area and footer. Record section order, approximate heights, alignments, grid relationships, dominant focal points and negative space.
4. **Extract visual properties.** Record:
   - Layout: container edges, columns, alignment, order, section rhythm and density.
   - Typography: likely family/category, size range, weight, line height, letter spacing, max line length and wrapping.
   - Color: page, surface, text, border, accent, overlay and contrast relationships.
   - Shape/effects: borders, radius, shadow, blur, crop, gradients and overlays.
   - Assets: image identity, role, aspect ratio, focal point, crop and safe area.
   - Content: visible text, line breaks, hierarchy and content density.
   - Interaction: links, buttons, tabs, menus, accordions, forms, hover/focus/selected states.
5. **Label evidence.** Every value must be marked:
   - SOURCE-PROVIDED: explicitly supplied in a design file, annotation or specification.
   - SCREENSHOT-INFERRED: estimated by visual inspection.
   - UNKNOWN: not visible or not supplied.
   Never convert a screenshot estimate into an exact token or fixed production dimension.
6. **Build a viewport matrix.** For every supplied viewport, record what changes: stacking, crop, navigation, type scale, content order, density and visibility. A screenshot at one width does not prove a breakpoint.
7. **Map behavior separately.** List each apparent control, its expected action, destination/state and source of that expectation. If a visual button has no supported destination or behavior, mark it unresolved; do not invent an endpoint.
8. **Resolve material ambiguities.** Recommend a default for low-risk implementation details and label it as a proposal. Ask the owner only when ambiguity materially changes hierarchy, content, conversion behavior, asset choice or responsive structure. Do not block unrelated slices.
9. **Write acceptance criteria.** Turn the key visible properties into testable statements a coder and visual reviewer can check.
10. **Hand off.** Give the complete spec to frontend-layout-implementer. The coder must not silently reinterpret the composition.

## Required output: Design Implementation Spec

### 1. Source inventory
Reference IDs, file/link, viewport/frame size, page/section and confidence.

### 2. Composition map
Section order, container boundaries, grid, alignment, section rhythm, hero structure, dominant focal point and relative visual weights.

### 3. Component/section evidence
For each section: purpose, component hierarchy, visible text, image role, spacing, background/surface and important details.

### 4. Typography
Roles, estimated/supplied family, size, weight, line height, letter spacing, line length and wrapping. Mark every estimate.

### 5. Color and effects
Named colors and exact values only when supplied; otherwise approximate/inferred. Include image overlays, shadow, border, radius and contrast relationships.

### 6. Asset map
Asset reference, purpose, ratio, crop, focal point, safe area, provenance and permission status. Do not substitute random stock imagery for a specified hero asset.

### 7. Interaction contract
Every control, expected behavior, state, keyboard behavior and exact destination—or explicit unresolved status.

### 8. Responsive matrix
One row per supplied viewport; list observed changes and unknown intermediate behavior.

### 9. Implementation slices
Small ordered sections/components with dependencies. Each slice must have a visible acceptance outcome.

### 10. Unknowns and decisions
Separate non-blocking implementation assumptions from owner decisions that genuinely block a slice.

### 11. Visual acceptance criteria
A concise checklist covering macro-composition, crop, typography hierarchy, spacing, color, content density, responsive behavior and states.

## Validation gates

- No coding handoff with an unrecorded major section, hero treatment or asset role.
- No claim that exact font, spacing, color or breakpoint values were measured unless the source provides them.
- Each reference is assigned to a specific section, state and viewport; references are not blended indiscriminately.
- The spec preserves the design's distinctive moments and content hierarchy, not only its palette.
- Any inferred element that materially affects the implementation is explicitly flagged.
- The implementation must be compared to the same reference later by frontend-visual-qa.
- If the reference is an AI-generated visual, treat misspelled/generated text and fictional UI labels as visual placeholders; replace them with approved copy without losing the layout intent.

## Handoff rule

The output is a working contract for the implementer. The implementer may make a necessary responsive adaptation, but must record deviations from the reference and must not replace the approved art direction with its own design without approval.

## Master Skill v1.11 integration

This skill is subordinate to the approved Website Requirements Pack and Master Skill Stages 0–9. Use it only after the WRP is `APPROVED_FOR_DESIGN` and G2 is recorded. Keep source identity and evidence labels traceable; separate measured, inferred and unknown details. Never convert a visual placeholder into a business fact or fabricated social proof. No paid API, API key or mandatory design MCP is required.
