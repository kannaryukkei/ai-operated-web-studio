# Starter Automated Quality Gate v1.0

**Status:** Required automated baseline for the canonical Starter reference  
**Applies to:** blueprints/starter/template-kit/starter  
**Runner:** GitHub Actions, Ubuntu 24.04, Node 22, Playwright Chromium

## Purpose

Turn the Starter quality rules already present in the Master Skill and Starter Product Acceptance Gate into repeatable checks. This gate is intentionally limited to the static Starter reference; it is not a claim that the sample ZACKS site is production-ready or universal.

## Automated checks

| Area | Automated contract | Coverage |
|---|---|---|
| Production build | Vite production build succeeds | CI on every qualifying push / pull request |
| Responsive layout | No document horizontal overflow | 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px |
| Body text | Customer-facing body, list, label and FAQ text is at least 15px | All rendered matching instances at all nine widths |
| Controls | Buttons, inputs, selects, textareas and navigation actions are at least 13px | All rendered matching instances at all nine widths |
| Metadata | Compact metadata/disclosures are at least 11px | All rendered matching instances at all nine widths |
| Text contrast | WCAG AA contrast thresholds for measurable solid-color text/background surfaces; translucent foreground/background layers are alpha-composited | All rendered matching text instances at all nine widths, plus selected navigation and vehicle/class states |
| Existing behavior | Navigation, class-based package pricing, Care Finder, WhatsApp handoff, date minimum, anchors, images, FAQ, Escape and skip link | Existing Playwright functional suite |

## Contrast measurement boundary

The browser test derives computed foreground/background colors, composites translucent CSS color layers and evaluates normal text at 4.5:1 and large/bold text at 3:1. CSS gradients, photography, image overlays and photo-backed composition are explicitly excluded from numeric sampling because computed CSS colors alone do not reveal the final rendered pixel. These surfaces still require desktop/tablet/mobile screenshot inspection at actual viewport scale and manual review of text placement over the image/gradient.

This automated check is not a complete WCAG audit, assistive-technology test, physical-device test or cross-browser certification. Chromium is the only automated browser in this baseline; other checks must be reported NOT TESTED until executed.

## Failure policy

- Any readability-floor or measured solid-surface contrast failure blocks the Starter CI run.
- Do not weaken the threshold merely to make the existing design pass. Fix the text role, foreground token, surface or composition.
- When a content change causes wrapping/overflow, fix the layout rather than shrinking text below the floor.
- Preserve exact tested commit SHA and CI run when reporting results.
- Do not infer live client validity from this demo blueprint's passing checks. Real facts, asset rights, CTA ownership, owner approval, conversion, domain and commercial gates remain separate.

## Ongoing maintenance

Update the role selectors only when the interface semantics change. A new text role must be classified as BODY (15px), CONTROL (13px), or COMPACT METADATA (11px) with a written reason for any exception. New gradient/photo content must be added to the manual screenshot review checklist rather than silently excluded.