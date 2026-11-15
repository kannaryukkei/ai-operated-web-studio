---
name: typography-and-legibility
description: Define and audit readable, distinctive typography systems for websites. Use when preparing design tokens, reviewing type hierarchy, refining copy density or checking responsive legibility.
---

# Typography and Legibility

Act as a typographic designer. Typography must communicate hierarchy, tone and reading comfort; it is not decoration used to fill space.

## Inputs

Use the approved Client Brief, brand references, visual direction, content hierarchy, chosen fonts and target viewports. Do not ask the client to choose CSS sizes or breakpoints.

## Build the type system

Define semantic roles before styling:
- Display / hero heading.
- Section heading.
- Card or item heading.
- Primary body copy.
- Supporting body copy.
- Controls and CTA labels.
- Eyebrows / metadata.
- Legal, credit and footnote text.

For every role, define the typeface, weight, size or fluid range, line-height, letter-spacing, casing, maximum line length and intended contrast.

## Starting guardrails

Use these as defaults for the Studio's current reference workflow, not as universal accessibility law:
- Primary and supporting body copy: 15px minimum.
- Compact metadata / eyebrow labels: 11px minimum.
- Primary button labels: 13px minimum.
- Legal/credit notes should remain comfortably readable; do not reduce them to decorative micro-text.
- Important allergen/safety information, pricing conditions, operating policies, access limitations and transaction disclosures are not metadata. Use at least 13px as a starting floor for dense important detail, or restructure the layout/copy to preserve comfortable reading.
- Prefer readable line lengths (generally around 45–80 characters, adjusted for typeface and container).
- Set line-height for the role and script; body copy often needs approximately 1.5–1.8.
- Use fluid heading scales where appropriate; avoid uncontrolled heading wraps and awkward single-word lines.

A smaller size is allowed only when its role genuinely requires it, the reason is documented, and the rendered result is reviewed at actual scale. Do not treat the numeric defaults as a substitute for a visual and accessibility review.

## Refinement rules

1. If content does not fit, simplify copy, increase available width, restructure the layout or reduce competing content before shrinking important text.
2. Do not use excessive letter-spacing, all-caps or low-contrast colors to disguise small type.
3. Do not assign every text element the same hierarchy. Use fewer, clearly differentiated roles.
4. Keep typeface combinations intentional and appropriate to the brand; avoid selecting fonts only because they are fashionable.
5. Review real content, including long headings, long Indonesian/English labels, currency, numbers and legal notes.
6. Check text reflow and wrapping at narrow widths; do not allow overflow, collision or isolated orphan words where avoidable.
7. Verify contrast separately; a readable size does not compensate for insufficient contrast.

## Responsive verification

Inspect at minimum one narrow mobile, one tablet and one desktop viewport. Use actual viewport screenshots at 100% scale; a downscaled full-page image cannot prove text legibility.

For each viewport:
- Capture computed font sizes for the defined body and metadata roles.
- Check headings, buttons, nav labels, captions and footnotes.
- Check long-copy wrapping, spacing and line length.
- Check no horizontal overflow or clipped text.
- Record PASS / FAIL / NOT TESTED.

## Output

Return:
1. A role-based typography table.
2. Rationale linked to audience, brand and content.
3. Responsive checks and actual viewport widths.
4. Exceptions and their justification.
5. Specific fixes by selector/component or design token.
