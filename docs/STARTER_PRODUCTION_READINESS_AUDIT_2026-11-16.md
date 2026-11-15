# Starter Production Readiness Audit — 2026-11-16

**Product:** Starter website tier  
**Reference implementation:** ZACKS Detailing static portfolio/demo  
**Audited branch:** `revision/master-revision`  
**Decision owner:** Studio  
**Current decision:** **CONDITIONAL — PREVIEW ONLY**  
**Scope:** Starter Product Acceptance Gate v1.1, Starter Content Evidence Gate v1.0, Starter Automated Quality Gate v1.0, Website Implementation Standard v1.1 Candidate, current ZACKS Starter source/data/tests and recorded CI/calibration evidence.

## Executive decision

The canonical Starter reference has a coherent local-service customer journey and a meaningful automated Chromium baseline. It is materially stronger than the five-website audit baseline: the previous simulated testimonials/customer stories and numeric proof have been removed, the consultation handoff handles blocked popups honestly, typography/solid-surface contrast checks run at nine viewport widths, and the latest recorded Starter CI run passed a 19-test Playwright suite.

That evidence establishes a technically improved **portfolio preview**, not a production-ready ZACKS website or a commercially validated Starter offer. The live business catalog and material facts still need owner approval; asset permissions and public destination ownership are not established; several customer questions remain partial or blocked; full visual/performance/cross-browser review has not been evidenced; and no complete real-client delivery or margin study is recorded.

The Starter source is also ZACKS-specific. It is a reference for a home-service detailing customer journey, not a universal blank Starter website and must not be copied unchanged for unrelated categories.

## Gate status

| Acceptance gate | Status | Evidence-based assessment |
|---|---|---|
| Gate 0 — Business understanding | **BLOCKED** | Static fallback facts exist, but current live catalog reconciliation, owner approval, field-level source approval and complete asset permissions are not evidenced |
| Gate 1 — Customer-facing completeness | **BLOCKED** | Several core questions are answered, but offer exclusions, trust evidence alternatives, payment methods, policies, durations and operational availability require owner decisions or explicit not-applicable reasons |
| Gate 2 — Conversion integrity | **BLOCKED** | WhatsApp message construction, configured number consistency and popup fallback pass browser tests; destination ownership, actual receipt/response and owner operational readiness are unverified |
| Gate 3 — Visual and content quality | **PARTIAL** | Typography floors, measurable solid-surface contrast and evidence omission are automated; photo/gradient screenshot review and asset-use approval remain open |
| Gate 4 — Technical release quality | **PARTIAL** | Production build and 19/19 Chromium tests pass on the recorded commit; no Starter lockfile, full visual review, cross-browser, performance or complete accessibility evidence |
| Gate 5 — Real-world validation and commercial readiness | **BLOCKED** | No verified complete client delivery, live visitor/lead validation, actual delivery-time/margin study or production handover record is evidenced |

No gate is inferred to pass from the green build alone. A blocked item may be resolved by owner approval, verified evidence or a documented NOT_APPLICABLE decision where the gate permits it; it must not be silently omitted or invented.

## Evidence that is already strong

### Product and customer journey
- The one-page structure covers service discovery, vehicle/class package choice, starting-price guidance, Care Finder, additional treatments, process, coverage, preparation, consultation and FAQ.
- The FAQ distinguishes consultation from a confirmed booking.
- Pricing is labelled as a reference by vehicle class; final scope/price and travel fees are stated as subject to confirmation.
- The implementation is static-first and does not pretend to persist a booking, operate a booking engine, accept payment or confirm an appointment.
- The WhatsApp consultation form prepares a message and provides a direct fallback when a popup is blocked.

### Content integrity
- Simulated customer-story cards and numeric proof were removed from the rendered page and content configuration.
- The current Playwright suite asserts that known unverified testimonial/story/performance-proof components and values remain absent.
- Concept imagery is explicitly disclosed as visual reference material, not completed ZACKS customer work.
- The current demo remains labelled as a portfolio demo and must not be represented as operational ZACKS production.

### Automated technical baseline
- Tested implementation commit: `6d4e85633e35bb8160a46988c8665267191e3f0f`.
- GitHub Actions: [Starter blueprint CI run #36](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43722483382).
- Observed result: Vite production build PASS; Playwright Chromium **19/19 PASS**.
- Responsive overflow, typography role floors, measurable solid-surface text contrast, mobile navigation/keyboard behavior, package pricing, Care Finder, CTA payload, popup fallback, image loading/alt, anchor integrity and evidence omission are covered.
- The current revision branch retains the tested Starter application source and 19-test suite; later revision commits in this audit range changed documentation, workflow and platform files rather than the Starter application/test source.

## Gate 0 — Business understanding: blockers

1. **Current business truth:** `starter/src/data/zacks-site.js` identifies its catalog values as based on the audited ZACKS fallback catalog and explicitly requires reconciliation with the live Laravel catalog and owner approval before production. The repository does not evidence that this reconciliation and approval have occurred.
2. **Offer completeness:** package and add-on names/prices/features are present, but the five-website audit records incomplete explicit exclusions. Final inclusions, exclusions, limitations, price basis and travel charges need current owner approval.
3. **Source and publication status:** a config file and historical source audit are not a substitute for a field-level Fact Register/Source Register with evidence and publication status for each material public claim.
4. **Operations and policies:** public hours/live slots, treatment duration, payment methods, cancellation/rescheduling, warranty/damage policy and other relevant operational constraints are either absent or explicitly unresolved in the audited source. Obtain the owner's answer or record NOT_APPLICABLE with a reason; never invent estimates or policies.
5. **Asset permissions:** Unsplash visual references and photographer credits are present, but the current project record does not evidence final permission/license review, intended-use approval and redistribution rights for each image/font. Concept images are not customer-work evidence.
6. **Trust:** there is no approved customer-proof package. This is correctly handled by omitting proof; do not reintroduce testimonials, review counts, ratings, customer stories or performance claims.

## Gate 1 — Customer-facing completeness: current mapping

**Answered or substantially covered:** what the home-service detailing offer is; vehicle/package choice; price reference by class; initial recommendation; service areas; consultation process; preparation requirements; what happens after a WhatsApp message; and that a consultation is not a confirmed booking.

**Partial or blocked, requiring owner decision:**
- Comprehensive exclusions/limitations for each package and add-on.
- Payment methods and any transaction-relevant terms.
- Opening hours or an explicit decision that availability is handled case-by-case through admin.
- Cancellation/rescheduling, warranty and damage policies, or documented NOT_APPLICABLE decisions.
- Treatment duration estimates, only if the owner can verify them.
- Current ownership/activity of Instagram, TikTok and WhatsApp destinations.
- Asset use/permission for every public photo/font.

The detailed question mapping is preserved in `blueprints/starter/template-kit/docs/five-website-starter-audit.md`. Do not add filler sections to hide these gaps.

## Gate 2 — Conversion integrity: blockers

The code and browser suite establish that:
- WhatsApp URLs are constructed from the configured number.
- Browser tests verify the configured `wa.me` number and message fields.
- Successful popup handoff and popup-blocked fallback are both handled.
- The form states that it does not store booking data and does not confirm an appointment.

They do **not** establish that the number is currently controlled by the business, that messages reach an attended account, that the business owner approves the public destination, that social destinations are active/owned, or that the business can handle enquiries within its stated process. Owner verification and a real end-to-end enquiry rehearsal are required.

## Gate 3 — Visual and content quality: partial

**Pass evidence:** clear hierarchy and category-specific visual direction are present in source; demo social proof was removed; typography role floors and measurable solid-color text contrast are checked across nine widths; concept-image captions and credits are displayed.

**Remaining review:** capture and inspect actual-scale desktop/tablet/mobile screenshots for the hero, photo-backed sections, gallery and coverage artwork; numeric computed-color testing excludes gradients and photographs. Review text placement and overlays visually. Review responsive crops, image weight, loading behavior, alt text in context, font delivery and asset permissions. The recorded CI workflow does not by itself establish a human screenshot review or rights approval.

## Gate 4 — Technical release quality: partial

| Item | Current evidence | Status |
|---|---|---|
| Production build | Vite build succeeded on tested commit | PASS |
| Browser behavior | Playwright Chromium 19/19 | PASS |
| Responsive overflow | Nine widths from 320px to 1440px | PASS |
| Typography floors | All selected rendered role instances at nine widths | PASS |
| Solid-surface contrast | Computed contrast + alpha compositing at nine widths and selected UI states | PASS within stated measurement boundary |
| Internal anchors and configured WhatsApp path | Browser regression checks | PASS as code consistency, not live destination ownership |
| Image decode and alt presence | Browser regression checks | PASS as load/attribute checks, not licensing or full semantic audit |
| Metadata/preview restriction | Title, description, Open Graph fields, favicon and `noindex,nofollow` are present | PARTIAL; production domain/canonical/robots release configuration still needs review |
| Dependency reproducibility | No `package-lock.json` exists in the Starter folder; CI uses `npm install` | **NOT PASS** |
| Photo/gradient actual-pixel review | Not included in automated contrast sampling; no current screenshot review evidence | NOT TESTED |
| Firefox/WebKit | Chromium-only Playwright project | NOT TESTED |
| Performance/Lighthouse/Core Web Vitals | No measured result recorded | NOT TESTED |
| Full accessibility/assistive technology/physical devices | No certification/evidence recorded | NOT TESTED |
| Hosting, domain, SSL, DNS, backups, ownership | No production deployment/handover evidence | NOT TESTED |

**Reproducibility correction required:** create and commit `blueprints/starter/template-kit/starter/package-lock.json`; verify a clean `npm ci`; then change Starter CI from `npm install` to `npm ci` and configure npm cache against that lockfile. The separate `platform/package-lock.json` does not lock the Starter app dependencies.

**CI trigger correction — verified:** the root Starter blueprint workflow now includes `revision/**`, pins its GitHub Actions by commit SHA and includes the relevant acceptance/evidence/implementation documents in both push and pull-request path filters. Revision-branch trigger verification: [Starter blueprint CI run #43](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43741402145), push to `revision/master-revision`, commit `5bed0839b4f55b976b69f9b8f8d6814be9d4aa72`; Vite production build PASS and Playwright 19/19 PASS. The run still used `npm install` because the Starter lockfile has not yet been created.

## Gate 5 — Real-world and commercial readiness: blockers

- No complete delivery using an actual business with verified current facts and approved publication rights is recorded.
- No owner review of all public content, offers, contacts, policies and image usage is recorded.
- No real visitor test or observed enquiry handling/conversion is recorded.
- Actual Studio delivery time, revision effort, recurring costs and margin are not recorded.
- Rp500,000 is explicitly a proposed pilot price, not a validated quote or proven viable margin.
- First-year domain cost, registrar account ownership, renewal date/payer, hosting account ownership, DNS/SSL, backup/update responsibilities and post-launch support handover are not evidenced.

A real pilot delivery and retrospective are required before converting the proposed price/scope into a validated commercial offer.

## Prioritized closure plan

### P0 — Evidence, owner decisions and conversion
1. Reconcile the static fallback catalog with the current live ZACKS catalog and obtain explicit owner approval for package names, prices, inclusions/exclusions, add-ons, service areas and travel charges.
2. Obtain owner decisions for hours/availability, treatment durations, payment methods, cancellation/rescheduling, warranty/damage and other applicable policies. Record NOT_APPLICABLE with a reason when appropriate.
3. Verify ownership/activity of WhatsApp, Instagram and TikTok; conduct a real test enquiry and confirm the admin can receive and handle it.
4. Complete the asset/permission register for logo, photographs, fonts and other media; replace assets whose use cannot be approved.
5. Record the source/evidence/publication status of every material public claim and the approved CTA destinations before production content is frozen.

### P1 — Repeatable technical and visual QA
1. Generate the Starter package lockfile, test `npm ci`, switch Starter CI to the lockfile-enforced install and verify the revision-branch run.
2. Capture actual-scale desktop/tablet/mobile screenshots and complete the required human visual review for gradients/photo-backed surfaces and responsive crop/composition.
3. Run Lighthouse/performance measurement and record the tested build, metrics, device/network settings and limitations.
4. Test Firefox and WebKit/Safari or explicitly retain NOT TESTED status and a documented risk decision.
5. Complete an accessibility review beyond automated contrast and DOM assertions, including keyboard/screen-reader checks as appropriate.

### P2 — Real delivery and handover economics
1. Deliver one complete Starter project for a real business under the approved WRP and G0–G7 gates.
2. Have the owner verify content, contact destinations, operational handling and final preview; validate the intended visitor action end-to-end.
3. Record actual build/QA/revision time, costs, domain/hosting/third-party renewals and margin.
4. Complete a client-owned domain/hosting and support handover record, then update the proposed Starter scope/price from measured evidence.

## Final decision

**CONDITIONAL — PREVIEW ONLY.**

The Starter reference is suitable for continued development, internal demonstration and automated regression work. It is not yet accepted as a production-ready ZACKS website, a universal Starter template that can be copied unchanged, or a commercially validated Rp500,000 package.

Do not claim PASS — Ready to sell until every critical gate is closed with evidence and the Studio owner approves the release. Business and Custom remain deferred.


## Local Windows reproducibility follow-up — 2026-11-16

The operator generated the Starter-local `package-lock.json` with `npm.cmd install --package-lock-only --no-audit --no-fund`. A clean `npm.cmd ci --no-audit --no-fund` completed and added 70 packages. The Vite production build also passed (1,685 modules transformed). Playwright Chromium ran 19 tests: **18 passed, 1 failed**.

The failure was the existing core horizontal-overflow test at 320px: document width 389px. The reported overflow included the philosophy grid/photo expanded to 371px and the contact heading extending to 434px. The other 18 tests, including the nine-width typography/contrast regression, passed. PowerShell initially blocked `npm.ps1`/`npx.ps1` under ExecutionPolicy; using the explicit `.cmd` launchers worked. This is a shell-policy issue, not an application failure.

**Correction applied to revision branch:**
- `starter/src/styles.css`: constrain the narrow-screen philosophy grid to a zero-minimum single track, set grid children/copy to `min-width: 0`, allow the philosophy heading to wrap within its container, and constrain the contact heading to the container width with a responsive font size and safe wrapping.
- `starter/.gitignore`: ignore generated `test-results/` and `playwright-report/` output so browser diagnostics are not accidentally committed.

The CSS correction is commit `57f91797a68af94a8d680c54b3034fba6ccf68f8`. A fresh Starter CI run was triggered for that code change; its completion must be checked. The operator must pull the fix and repeat the 320px responsive test locally before the issue is considered closed.

The generated Starter `package-lock.json` remains local and uncommitted at this checkpoint. It must be inspected and committed after the corrected local suite passes. The GitHub workflow has not yet switched to `npm ci`; that change follows the verified lockfile commit.


### Responsive correction verification

The correction described above was verified by GitHub Actions [Starter blueprint CI run #47](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43742492354), push to `revision/master-revision` at commit `57f91797a68af94a8d680c54b3034fba6ccf68f8`. Result: Vite production build PASS and Playwright **19/19 PASS** on Ubuntu 24.04 / Chromium.

This closes the remote regression check. The operator's Windows run must still be repeated after pulling the CSS and `.gitignore` corrections to confirm the original 320px failure is also resolved in the local environment. The Starter lockfile also remains uncommitted, so the reproducibility gate is still open.

### Second narrow-viewport regression follow-up — 2026-11-16

After pulling the earlier philosophy/contact correction, the operator repeated Playwright on Windows. The original philosophy/contact overflow no longer appeared, but the same 320px document-overflow assertion still failed: document width 359px. The remaining offenders were in the hero: .hero-copy and its heading expanded to 343px because the mobile one-column grid retained an intrinsic minimum width. The other 18 Playwright tests passed; the operator's git status showed only the local, untracked Starter package-lock.json, with Playwright output correctly ignored.

A second responsive correction was committed to revision/master-revision as [ac47977d627b6258925b03a80255f94aebe252e1](https://github.com/kannaryukkei/ai-operated-web-studio/commit/ac47977d627b6258925b03a80255f94aebe252e1). At the 640px breakpoint it sets the hero grid track to minmax(0,1fr), constrains the hero copy/kicker/description/aside to the available width, and allows the H1 to wrap at narrow widths. This is a layout correction, not an overflow-hiding workaround.

Verification is still open: the operator must pull this commit and rerun the Windows 320px regression before the local issue is closed. The new commit's Starter CI result must also be checked. Do not commit the generated lockfile or switch Starter CI to npm ci until the local 19-test suite passes.

The narrow-screen H1 received one further fit refinement in commit [6d0ae557ea28e59c10ec5eabe2304d67b36df6f3](https://github.com/kannaryukkei/ai-operated-web-studio/commit/6d0ae557ea28e59c10ec5eabe2304d67b36df6f3): at widths up to 380px its font size now scales with the viewport (44–56px) instead of remaining fixed at 56px. This reduces dependence on the externally loaded display font and helps keep full words intact. The 320px local and CI checks remain pending for this latest CSS revision.

### Third narrow-viewport regression follow-up — 2026-11-16

The Windows rerun after the hero correction no longer reported hero overflow. The remaining 320px failure moved to the booking section: document width 359px, with `.booking-copy`, its heading, promise rows and form expanding to 341px. This points to the booking layout's one-column `1fr` track retaining an intrinsic minimum width, plus a long heading that needs a narrow-screen wrap/size constraint. The other 18 tests continued to pass; only the first portfolio/overflow test failed.

Applied a booking-specific mobile correction in revision commit [5a24be7a4df0e9d772cf5aabf8b1425433d92ab3](https://github.com/kannaryukkei/ai-operated-web-studio/commit/5a24be7a4df0e9d772cf5aabf8b1425433d92ab3): the booking grid now uses `minmax(0,1fr)` at the mobile breakpoint, the copy/form and promise rows may shrink, and the booking heading receives a fluid 34–43px size with safe wrapping. This commit must be pulled and tested locally; matching CI is also pending. The Starter lockfile remains uncommitted and must stay that way until the corrected 19-test suite passes.

### Booking responsive correction — CI verification

The booking correction in commit `5a24be7a4df0e9d772cf5aabf8b1425433d92ab3` passed the revision-branch Starter blueprint CI [run #58](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43743441717): Vite production build PASS and Playwright **19/19 PASS** on Ubuntu 24.04 / Chromium. This confirms the current booking layout correction in the Linux CI environment. The matching Windows local rerun remains pending; keep the Starter lockfile uncommitted until that local suite also passes.
