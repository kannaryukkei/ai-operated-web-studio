# Starter Responsive and Browser QA

**Status:** Current automated baseline passed; product production acceptance remains CONDITIONAL — preview only.  
**Applies to:** `blueprints/starter/template-kit/starter/`  
**Latest revision-branch test commit:** `5bed0839b4f55b976b69f9b8f8d6814be9d4aa72`  
**GitHub Actions:** [Starter blueprint CI run #43](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43741402145)  
**Content-evidence correction first verified on:** `6d4e85633e35bb8160a46988c8665267191e3f0f`

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

The older 15/15 run on commit `2c687401aa2d104c28360d70f7d763e9989215c9` is historical only. It predates the content-evidence regression and the current 19-test baseline. Revision-branch run #43 independently rebuilt the current branch and repeated the 19/19 result.

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


## Narrow viewport regression follow-up — 2026-11-16

A local Windows Playwright run after lockfile generation found overflow at 320px (document width 389px), with intrinsic sizing in the philosophy grid and contact heading identified in the failure report. The responsive CSS was corrected in commit `57f91797a68af94a8d680c54b3034fba6ccf68f8`. The exact correction commit passed a fresh Linux CI build and Playwright **19/19** on [run #47](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43742492354). A repeat Windows run is still required to close the local reproduction. Starter `package-lock.json` remains local and uncommitted; npm ci verification has been completed locally but CI is not yet switched to npm ci.

## Second 320px regression follow-up — 2026-11-16

The Windows repeat after the philosophy/contact fix produced a different remaining overflow: document width 359px at 320px, with .hero-copy/H1 expanding to 343px. The prior philosophy/contact overflow was no longer listed. The cause was the one-column mobile hero grid retaining an intrinsic minimum track size.

Revision commit [ac47977d627b6258925b03a80255f94aebe252e1](https://github.com/kannaryukkei/ai-operated-web-studio/commit/ac47977d627b6258925b03a80255f94aebe252e1) now uses a zero-minimum grid track (minmax(0,1fr)), constrains hero children to the available width, and lets the H1 wrap. The other 18 tests passed in the reported Windows run. The new correction has not yet been verified by a fresh local Windows run or a confirmed CI result.
