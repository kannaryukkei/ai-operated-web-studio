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

Turn an approved screenshot, visual direction image, existing website reference or supplied design file into a concrete Design Implementation Spec. The screenshot is an implementation reference—not loose inspiration. Capture composition, typography, color, asset treatment, content density, responsive behavior and visible interaction states while separating measured facts from estimates.

## When to use

- Implementing a page/section from an approved screenshot, mockup or design reference.
- Correcting implementation drift against a chosen reference.
- Decomposing multiple page sections or responsive examples into buildable slices.

Do not use for aesthetic critique alone, an unapproved moodboard, or when a complete implementation specification already exists.

## Required inputs

1. The chosen reference image(s), with source identity and capture viewport. For a live website reference, use `website-reference-discovery` to capture the actual rendered page before writing the specification; a text-only search result is not a visual reference.
2. The project conversation's agreed purpose, scope, facts and copy.
3. Relevant assets and permission status.
4. The existing website stack and target behavior.
5. Known viewport sizes. Mark missing sizes unknown; never infer exact Figma dimensions from a downscaled chat preview.

## Workflow

For live website references, require actual browser screenshots or equivalent rendered-page evidence before claiming visual reverse engineering. If no browser or screenshot method is available, label the work TEXT-ONLY REVIEW or BLOCKED and do not invent dimensions, typography, crop, spacing or responsive behavior.


1. **Inventory references.** Record each image/file/link, source identity, viewport/canvas size, page/section, state and annotations. Keep distinct references separate.
2. **Inspect at useful scale.** Review the full composition, then inspect important sections. Do not use a reduced full-page image as the only evidence for typography or spacing.
3. **Decompose the page.** Identify header, hero, content regions, conversion area and footer; note section order, approximate proportions, alignments, grids, focal points and negative space.
4. **Extract visual properties:** layout, typography, color, surfaces/effects, assets/crops, visible copy and apparent interactions.
5. **Label evidence:** SOURCE-PROVIDED, SCREENSHOT-INFERRED or UNKNOWN. Never turn an estimate into an exact design token or breakpoint.
6. **Map responsive behavior.** For each supplied viewport, note stacking, crop, navigation, type scale, order, density and visibility. One screenshot does not prove intermediate breakpoints.
7. **Map controls separately.** State each apparent action, destination/state and source of that expectation. Mark unsupported buttons unresolved; never invent endpoints.
8. **Resolve material ambiguity.** Decide low-risk implementation details autonomously and label assumptions. Ask the owner only when uncertainty materially changes hierarchy, content, CTA behavior, asset choice or responsive structure.
9. **Write observable acceptance criteria** for the key visual properties.
10. **Hand off** the spec to `frontend-layout-implementer`.

## Required output: Design Implementation Spec

- **Source inventory:** references, source, viewport/frame size and confidence.
- **Composition map:** section order, containers, grid, alignment, rhythm, hero and focal point.
- **Section evidence:** purpose, component hierarchy, visible copy, image role, spacing and surfaces.
- **Typography:** role, supplied/estimated family, size, weight, line-height, tracking, line length and wrapping.
- **Color/effects:** exact values only when supplied; otherwise mark inferred.
- **Asset map:** source, purpose, ratio, crop, focal point, provenance and permission.
- **Interaction contract:** control, expected behavior, state, keyboard behavior and exact destination—or unresolved.
- **Responsive matrix:** supplied widths, observed changes and unknown behavior.
- **Implementation slices:** ordered, verifiable sections/components and dependencies.
- **Unknowns:** non-blocking assumptions versus decisions that genuinely block a slice.
- **Visual acceptance criteria:** composition, crop, hierarchy, typography, spacing, color, density, responsive behavior and states.

## Validation gates

- No coding handoff with a major section, hero treatment or asset role omitted.
- Do not claim exact font/spacing/color/breakpoint measurements unless the source provides them.
- Preserve the reference's distinctive moments and content hierarchy, not only its palette.
- Flag any inferred detail that materially affects the implementation.
- Verify the coded result later using `website-quality-review` in VISUAL_FIDELITY mode.
- For AI-generated references, treat misspelled/generated text and fictional UI labels as placeholders; replace with appropriate project content without losing layout intent.

## Handoff rule

The spec is a working contract for the implementer. Responsive adaptation is allowed when necessary, but deviations must be recorded. Do not replace the chosen art direction with an unapproved redesign.
