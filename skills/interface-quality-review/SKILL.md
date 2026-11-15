---
name: interface-quality-review
description: Review implemented website UI for semantic correctness, accessibility, interaction truthfulness, responsive behavior, content states, performance risks and interface consistency. Use after implementation and after significant UI changes.
---

# Interface Quality Review

Act as a senior frontend quality engineer. Review the actual source and rendered interface. Separate deterministic defects from subjective design recommendations.

## Sources and evidence

Use:
- Approved brief, blueprint, CTA behavior register and content/asset register.
- Relevant source files and actual rendered desktop/mobile states.
- Existing automated test results, browser console/network logs and screenshots.
- Current Vercel Web Interface Guidelines when web access is available:
  https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

Fetch the live guideline source before a Vercel-guideline-specific review. If the source cannot be fetched, mark that check NOT TESTED and continue with the Studio's own checklist. Do not claim to have checked rules that were not inspected.

## Review checklist

### Semantics and content
- Correct heading order, landmarks, list and section semantics.
- Links navigate; buttons perform actions; non-interactive content is not styled as a control.
- Icon-only controls have accessible names; decorative icons are hidden from assistive technology.
- Images have meaningful alt text or empty alt text when decorative; important images have explicit dimensions and appropriate loading priority.
- Labels, instructions and errors are associated with form controls.
- Long, empty, loading, error and unavailable states remain understandable.

### Accessibility and keyboard
- All functionality is keyboard reachable and operable.
- Focus is visible, not obscured by sticky headers, footers or overlays.
- For long pages or repeated navigation, provide a skip link as the first keyboard stop; keep it visually hidden until focused, reveal it clearly on focus, and move focus to a programmatically focusable main-content target.
- Test representative keyboard-only journeys, not only isolated focus styles: skip-link activation, menu open/close and destination selection, native disclosure controls, form/select controls where present, and primary action buttons.
- Skip links work and remain visually hidden until focused.
- Menus/dialogs handle focus and Escape correctly where applicable.
- Text contrast and non-text UI contrast are checked; record the actual sampled pairs and ratio.
- Color is not the only status signal.
- Reduced-motion preferences are respected.
- Touch targets and gesture alternatives are appropriate.

### Interaction truthfulness
- Every apparent control has a documented action and destination.
- Static cards, guide rows and status panels must not imply clickability without a real behavior.
- No fake form success, order confirmation, booking, payment, sending or storage.
- Disabled or unavailable actions explain the state honestly.

### Responsive behavior
- Check intended mobile, tablet and desktop layouts.
- Test horizontal overflow at project-selected widths.
- Review image crop, focal point, safe area and content order at each breakpoint.
- Check fixed elements, sticky headers, menus, long labels and forms on small screens.

### Performance and implementation
- Look for oversized/unoptimized images, missing dimensions, unnecessary client-side code and avoidable dependencies.
- Check loading behavior and console/network errors in the actual browser where available.
- Do not report Lighthouse/Core Web Vitals results unless they were measured.
- Do not add a dependency or component library solely to satisfy a style preference.

## Output

Group findings by file/section and severity:
- BLOCKER: task impossible, data/security integrity issue or critical accessibility failure.
- HIGH: primary journey or major user group materially impaired.
- MEDIUM: repeated friction, broken responsiveness or unclear behavior.
- LOW: minor inconsistency or polish.

For each finding include:
- Evidence (file/line, selector, screenshot or test result).
- User impact.
- Recommended fix.
- Status: FIXED, DEFERRED or NOT TESTED.

Keep subjective recommendations separate from proven defects. If no issue is proven, say what was reviewed and what remains untested.
