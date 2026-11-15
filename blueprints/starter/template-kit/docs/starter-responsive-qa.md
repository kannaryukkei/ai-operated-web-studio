# Starter Responsive and Browser QA

**Status:** Current automated baseline passed; product production acceptance remains CONDITIONAL — preview only.  
**Applies to:** `blueprints/starter/template-kit/starter/`  
**Current tested implementation commit:** `6d4e85633e35bb8160a46988c8665267191e3f0f`  
**GitHub Actions:** [Starter blueprint CI run #36](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43722483382)

## Current automated result

- Production Vite build: **PASS**.
- Playwright Chromium suite: **19/19 PASS**.
- Runner: Ubuntu 24.04, Node 22, Playwright Chromium.
- The current `revision/master-revision` source tree retains the tested Starter implementation; the subsequent revision commits changed documentation/workflow/platform files, not the Starter application source or its 19 browser tests.

The current suite covers:
- No horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- Navigation links, mobile menu open/Escape close and skip-to-content behavior.
- Vehicle/class package pricing and Care Finder recommendation.
- WhatsApp consultation message composition, configured number consistency, popup-blocked fallback and explicit non-booking disclosure.
- Local date minimum in Asia/Jakarta.
- All internal anchor destinations, FAQ uniqueness/core sections, image loading and meaningful alt text.
- Exclusion of unverified testimonial/customer-story/performance proof.
- Body/control/metadata typography floors at all nine widths.
- WCAG AA contrast thresholds for measurable solid-color text/background surfaces, including the tested mobile-navigation and selected vehicle/class states.

The older 15/15 run on commit `2c687401aa2d104c28360d70f7d763e9989215c9` is historical only. It predates the content-evidence regression and the current 19-test baseline.

## What this does not prove

The automated suite is a bounded Chromium regression baseline, not production or accessibility certification. These items remain **NOT TESTED** or unverified:

- Pixel-level readability/contrast over photography, gradients and complex overlays. The numeric test excludes these surfaces; actual-scale desktop/tablet/mobile screenshot review is still required.
- Full WCAG audit, screen-reader/assistive-technology behavior and physical-device testing.
- Firefox and WebKit/Safari behavior.
- Lighthouse, Core Web Vitals, network/device performance and measured image-weight budgets.
- Owner approval and current accuracy of package prices, inclusions/exclusions, service areas, public hours/availability and business policies.
- Ownership/activity/response handling for WhatsApp and social destinations.
- Asset permission/license and production redistribution approval for the externally hosted visual references and fonts.
- Real visitor comprehension, live inquiry delivery and conversion.
- Production domain, DNS, SSL, hosting account ownership, backup/update responsibilities and handover.

## Reproducibility note

The Starter folder has no committed `package-lock.json`. The current root workflow uses `npm install`, so dependency resolution is not frozen to an exact lockfile. Add a committed lockfile and switch the workflow to `npm ci` before describing Starter dependency installation as reproducible. The Platform CI lockfile does not cover this separate Starter Vite project.

## Release interpretation

A passing build and 19/19 browser suite mean the recorded Starter code passed its current automated checks. They do not verify ZACKS live facts, permission to publish assets, business-owner approval, real CTA ownership/response, actual conversion, delivery economics or launch operations.

**Current decision:** CONDITIONAL — PREVIEW ONLY. Do not describe the ZACKS reference as a production-ready client website or the Rp500,000 pilot price as a validated commercial offer until the remaining Starter Product Acceptance Gate blockers are closed.
