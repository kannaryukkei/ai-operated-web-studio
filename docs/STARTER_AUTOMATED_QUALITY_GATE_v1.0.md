# Starter Automated Quality Gate v1.0

**Status:** Required automated baseline for the canonical Starter reference  
**Applies to:** blueprints/starter/template-kit/starter  
**Runner:** GitHub Actions, Ubuntu 24.04, Node 22, Playwright Chromium

## Purpose

Turn the Starter quality rules already present in the Master Skill and Starter Product Acceptance Gate into repeatable checks. This gate is intentionally limited to the static Starter reference; it is not a claim that the sample ZACKS site is production-ready or universal.

## Automated checks

| Area | Automated contract | Coverage |
|---|---|---|
| Dependency reproducibility | Committed package lock is used for deterministic clean installation | `package-lock.json` + `npm ci`; committed lockfile and revision-branch CI run #69 verified |
| Production build | Vite production build succeeds | CI on every qualifying push / pull request |
| Responsive layout | No document horizontal overflow | 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px |
| Body text | Customer-facing body, list, label and FAQ text is at least 15px | All rendered matching instances at all nine widths |
| Controls | Buttons, inputs, selects, textareas and navigation actions are at least 13px | All rendered matching instances at all nine widths |
| Metadata | Compact metadata is at least 11px | All rendered matching instances at all nine widths |
| Important disclosures | Important disclosures are at least 13px | All rendered matching instances at all nine widths |
| Text contrast | WCAG AA contrast thresholds for measurable solid-color text/background surfaces; translucent foreground/background layers are alpha-composited | All rendered matching text instances at all nine widths, plus selected navigation and vehicle/class states |
| Content evidence | Unverified testimonial, customer-story and performance-proof elements remain absent | Explicit Playwright regression against the known simulated-proof components/values |
| Existing behavior | Navigation, class-based package pricing, Care Finder, WhatsApp handoff, date minimum, anchors, images, FAQ, Escape and skip link | Existing Playwright functional suite; current calibration baseline is 19/19 on commit `6d4e856` |

## Contrast measurement boundary

The browser test derives computed foreground/background colors, composites translucent CSS color layers and evaluates normal text at 4.5:1 and large/bold text at 3:1. CSS gradients, photography, image overlays and photo-backed composition are explicitly excluded from numeric sampling because computed CSS colors alone do not reveal the final rendered pixel. These surfaces still require desktop/tablet/mobile screenshot inspection at actual viewport scale and manual review of text placement over the image/gradient.

This automated check is not a complete WCAG audit, assistive-technology test, physical-device test or cross-browser certification. Chromium is the only automated browser in this baseline; other checks must be reported NOT TESTED until executed.

## Failure policy

- Any readability-floor or measured solid-surface contrast failure blocks the Starter CI run.
- Do not weaken the threshold merely to make the existing design pass. Fix the text role, foreground token, surface or composition.
- When a content change causes wrapping/overflow, fix the layout rather than shrinking text below the floor.
- Preserve exact tested commit SHA and CI run when reporting results.
- Do not infer live client validity from this demo blueprint's passing checks. Real facts, asset rights, CTA ownership, owner approval, conversion, domain and commercial gates remain separate.

## Visual evidence capture sequence

For each required responsive viewport and each selected interaction state, capture the initial rendered page before running assertions that may fail or abort the test. At minimum, retain full-page captures at representative mobile, tablet and desktop widths; add focused viewport captures for important interactive states such as an open mobile menu or a validation/error state when those states are in scope. Upload screenshots, traces and diagnostic logs even if the test job fails (`if: always()`). This evidence-first order prevents a failing assertion from removing the visual record needed to diagnose the baseline. Screenshots do not replace assertions, and passing assertions do not replace independent visual review.

## Ongoing maintenance

Update the role selectors only when the interface semantics change. A new text role must be classified as BODY (15px), CONTROL (13px), METADATA (11px), or DISCLOSURE (13px) with a written reason for any exception. New gradient/photo content must be added to the manual screenshot review checklist rather than silently excluded.

## Current repository reproducibility status — 2026-11-16

**PASS.** The Starter folder contains a committed `package-lock.json` (`0159e20`). A clean `npm ci --no-audit --no-fund` install was verified locally on Windows before the lockfile was committed. The root Starter CI workflow now uses `npm ci --no-audit --no-fund` and caches npm dependencies with `cache-dependency-path: blueprints/starter/template-kit/starter/package-lock.json`.

Revision-branch Starter CI [run #69](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43744267588), workflow commit `a418077ad01a009e3937c7ee63e38629556864fe`, completed successfully: `npm ci` installed 69 packages, Vite production build passed, and Playwright Chromium passed **19/19**. The operator separately reported **19/19** on Windows after the responsive corrections. The lockfile criterion is closed. The other untested items in this gate (photo/gradient visual review, full accessibility, cross-browser and performance) remain separate requirements.
