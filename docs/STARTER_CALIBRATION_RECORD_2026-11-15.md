# Starter Calibration Record — 2026-11-15

**Project:** Canonical Starter reference (ZACKS-specific local-service demo)  
**Repository:** kannaryukkei/ai-operated-web-studio  
**Branch:** improvement/starter-quality-calibration-loop  
**Tested commit:** `9a1ff28d2937207bb14134f9e02ba0370cd61f17`  
**Master Skill:** v1.10 CANDIDATE  
**Blueprint:** `blueprints/starter/template-kit/starter/`  
**Latest verification:** GitHub Actions run [#17 — 43719181779](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43719181779)

## 1. Observed findings

### Finding A — Typography and contrast were documented but not fully enforced

- **Expected:** Starter body text and customer-facing details remain legible at every supported viewport; controls and metadata follow their documented role floors; measurable solid-surface text meets the stated contrast targets.
- **Observed:** The pre-existing responsive suite tested layout and interactions but did not check every instance of body/control/metadata roles at all nine widths, or compute foreground/background contrast across the rendered Starter page.
- **Severity:** HIGH for pricing, service scope, policies and visitor decision information.
- **Evidence:** Experiments #1 and #3 had already established these quality principles; the first new automated run then measured failures in the existing Starter styles. Contrast examples included body copy around 3.83:1 and small supporting text around 3.07:1 on light surfaces, plus weak disclosure contrast on the green proof surface.
- **Primary cause:** IMPLEMENTATION / QA — the reference stylesheet still contained low-contrast text tokens and the reusable Starter test suite lacked corresponding regression coverage. This was not a missing client fact and did not require extra client questions.

### Finding B — Selected vehicle-class text needed a consistent contrast contract

- **Expected:** Both default and selected class options remain readable and visibly distinct.
- **Observed:** Once the test exercised the selected vehicle/class state, small supporting labels exposed conflicting light/dark color combinations.
- **Primary cause:** IMPLEMENTATION / QA — the selected state and text-token treatment were not designed/tested as a complete foreground/background pair.

### Finding C — Intermediate 320px overflow

- One intermediate revision reported a 389px document width at a 320px viewport.
- Follow-up regression runs did not reproduce that overflow after the scoped stylesheet revisions. The final nine-width overflow test passed.
- **Decision:** NOT REPRODUCIBLE in the final tested commit; no separate confirmed root cause or layout regression remains open.

## 2. Minimal corrections

- Enforced role-based text floors in the reusable Starter stylesheet: 15px body/customer-facing copy, 13px controls/navigation and 11px compact metadata.
- Added a Playwright regression test that inspects every rendered matching text instance at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- Added a computed-color contrast test for measurable solid surfaces, including alpha compositing. Normal text is checked at 4.5:1; large/bold text at 3:1.
- Exercised mobile navigation expanded state and selected vehicle/class state in the contrast test.
- Corrected low-contrast text colors on light surfaces, proof/demo disclosures, Care Finder result copy and selected vehicle-class option styling. The selected option now uses a light tint with dark text rather than an inconsistent dark fill with pale small text.
- Pinned the Starter CI runner to Ubuntu 24.04 and retained Node 22. The workflow uses `npm install` because the Starter reference has no committed lockfile; `npm ci` is not valid for this repository state.
- Updated the root Starter CI workflow to run on `main`, improvement branches and restructure branches, and to include the acceptance-gate documents in push and pull-request path filters.

**Intentionally unchanged:** client brief/input process, business facts, Starter scope, website content, API/backend/platform scope, package-tier definitions, client-specific data and approval boundaries.

## 3. Final regression evidence

<badge>PASS — tested commit 9a1ff28</badge>

| Check | Final result | Evidence |
|---|---|---|
| Vite production build | PASS | Vite 6.4.6, production build completed |
| Existing Starter browser tests | PASS | 15 existing tests |
| Responsive overflow | PASS | Nine widths: 320–1440px |
| Typography role floors | PASS | Every rendered matching sample at all nine widths |
| Solid-surface text contrast | PASS | All measured samples at all nine widths |
| Mobile navigation and selected vehicle/class contrast | PASS | Explicit interactive-state assertions |
| Combined Playwright suite | PASS | 17/17 on Chromium |

CI run: [43719181779](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43719181779)

## 4. Scope and remaining limitations

This is a targeted automated baseline, not a full accessibility or release certification.

Still **NOT TESTED**:
- Pixel-level contrast over photographs, gradients and complex image overlays. These remain a manual, actual-scale screenshot-review responsibility; the computed-color test explicitly excludes them.
- Full WCAG audit, assistive-technology testing and physical-device testing.
- Firefox and WebKit cross-browser behavior.
- Lighthouse, Core Web Vitals, slow-network performance or field performance.
- Real-client fact/asset approvals, public CTA ownership, real conversion, domain/hosting, delivery economics or commercial readiness.

The website source in this blueprint remains a ZACKS-specific reference/demo, not a universal blank Starter site. A passing CI run proves the tested code and checks only; it does not authorize deployment or production use.

## 5. Calibration decision

- **Root cause:** IMPLEMENTATION / QA.
- **Correction:** RETAIN for the canonical Starter reference and as the automated baseline for future Starter refinement.
- **Cross-category generality:** NOT YET PROVEN by this change alone. The thresholds and method are now codified, but the automated test was run against the ZACKS-specific reference; future category-specific Starter implementations must pass the same gate and receive their own visual review.
- **Client-input burden:** unchanged.
- **New paid dependency/API/backend:** none.
- **Next owner action:** review the pull request and retain the automated gate when it is merged.
