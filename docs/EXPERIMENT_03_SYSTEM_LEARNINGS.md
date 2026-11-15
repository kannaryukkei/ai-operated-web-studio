# Experiment #3 — System Learnings

**Experiment:** Semburat Bakehouse  
**Source:** kannaryukkei/web-studio-experiment-03-semburat-bakehouse  
**Canonical integration target:** ai-operated-web-studio  
**Status:** Candidate learnings prepared for integration; system PR required before this experiment is considered closed.

## 1. Input-model finding — critical

Semburat's current client fixture is comprehensive and fully structured. It exercises website production from a normalized business brief, but it does not test the intended minimal-input workflow:

client interview material + supplied assets → AI source extraction → normalized brief → website production

The previous v1.8 intake-form specification encouraged a long structured client form. This is not the desired product experience. The default should be one normal client interview (recording, transcript or operator notes) plus existing assets and optional links. The AI—not the client—creates the field-level structure, fact register, asset register, business intelligence and customer journey.

**System consequence:** introduce CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md, Master Skill v1.9 candidate and the required Source Coverage Matrix. The S07 source-coverage review caught omissions in the initial synthetic transcript, proving that extraction needs a full source-to-output pass rather than a representative-facts sample. Preserve v1.8 as historical; keep structured intake internal/optional. Do not make the platform form a second client task.

## 2. Visual quality — retain Semburat direction

Independent review of the rendered S01–S05 artifact found a strong, category-specific design fingerprint:
- product-led asymmetric bakery hero;
- dark bake-counter menu catalogue;
- high-energy craft chapter;
- distinct offer compositions based on actual offer types;
- editorial Visit information and compact FAQ;
- restrained local order simulation.

**Decision:** DISTINCTIVE. No evidence justifies a full redesign. Retain the best composition and refine only verified defects.

## 3. Interface / interaction findings

- The local order builder needed its product-list Add state to remain synchronized with quantity changes and the 99-item limit.
- The selected-item count should be announced via an accessible live region.
- Quantity-cap behavior needs an explicit regression test; testing add/remove at small quantities alone missed the boundary state.
- The first S06 attempt exposed an ambiguous Playwright locator because the product list and order summary both contained an identically named Add control. Scope selectors to the correct panel. This is a test-quality correction, not a site defect.
- S08 added one skip link as the first keyboard stop, a focusable main landmark and destination sections, Escape dismissal with focus return to the mobile-nav trigger, destination focus after navigation, and order-summary increment/decrement/clear focus continuity. Playwright tests cover these keyboard journeys and the duplicate skip-link issue was fixed. Final S08 PR CI passed in [run #43690370859](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43690370859).
- Reusable rule: for long pages/repeated navigation, provide and test exactly one skip link that reveals on focus and moves focus to main content. Include keyboard-only journeys for representative controls, Escape behavior and focus restoration after dynamic updates; a visible focus outline alone does not prove the flow works.

## 4. Responsive QA finding

The original full-site suite covered only 1440 / 768 / 390 / 320px, while the canonical Starter acceptance gate requires nine widths. Align automated layout regression with the shared acceptance standard: 1440 / 1280 / 1024 / 900 / 768 / 640 / 390 / 360 / 320px. Keep full-page screenshot evidence at a smaller representative set to control artifact size.

## 5. Asset handling

Semburat had no client product photography. A generated concept image was used as a fallback and correctly recorded in the Asset Register with creator, dimensions, role, permission boundary and DEMO_ONLY status.

Reusable rule: if client assets are missing, the AI can propose or generate clearly disclosed concept assets for previews. It must not represent them as real client products, staff, customers, premises or proof. Actual client publication still requires source/rights/approval.

## 6. Production integrity

- No map, real contact endpoint, actual order, booking, payment, stock or data persistence was fabricated.
- Visit hours, address, seat capacity, menu, prices and policies remain DEMO_ONLY.
- The local order builder states that the interaction does not send, save, check stock, order or pay.
- Demo preview readiness, independent visual verdict, owner approval and production release remain separate gates.

## 7. Remaining validation limits

The Semburat material-first regression is now completed as a controlled synthetic simulation:
- A conversational transcript was reconstructed from the structured DEMO_ONLY source fixture.
- A separate synthetic asset packet was created.
- A manual normalization QA record captured representative atomic facts, source locators, answer/evidence/publication status and unavailable information.
- A source-to-output coverage map accounts for the main business/website information domains and corrected omissions found in the first transcript pass.
- The normal S01–S06 website test suites passed again from the S07 branch.

This is a useful contract/provenance exercise, but **not** evidence of real-world interview extraction. The transcript was not independently recorded, no audio transcription was tested, and CI did not call an AI model. Remaining NOT TESTED items:
- real client interview ingestion and source-linked normalization from genuinely unstructured notes/transcripts;
- real client asset rights/permissions and upload workflow;
- Firefox and WebKit;
- physical devices;
- full WCAG and assistive-technology audit (S08 only verifies representative keyboard paths in Chromium; it is not a conformance audit);
- Lighthouse/Core Web Vitals and real-world performance;
- real owner/visitor validation and commercial delivery effort.

The next real-client pilot should test the actual minimum-input path using a genuine interview and client-supplied asset packet, with authorized access and explicit rights/approval tracking. It should not reintroduce a long mandatory client form.


## 8. S09 — AI normalization execution and source-to-page loss

S09 executed the Material-First Ingestion Protocol using the synthetic nine-segment interview transcript and separate asset packet in the active GPT-6 session. The AI produced a complete normalized handoff: Raw Material Index, nine-segment Source Coverage Matrix, Client Brief v2.1 core profile, 20-item Offer Matrix, fact/source records with separate answer/evidence/publication states, Asset and Permission Register, Business Intelligence, Buying Journey, Trust Register, Customer Question Map, CTA map, gap register and Starter handoff.

**Semburat evidence:** [S09 AI normalization execution record](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s09-ai-normalization/docs/EXPERIMENT_03_S09_AI_NORMALIZATION_EXECUTION.md) and [S09 PR #5](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/pull/5).

The normalization exposed a second handoff risk: facts can be successfully extracted into the brief yet disappear before they reach the actual website. The Customer Question Map comparison found that the current preview did not show several source-provided purchase/visit policies: accepted payment methods, box deposit and cancellation/refund terms, service recovery for incorrect/damaged orders, parking and outdoor-pet policy. The website was not fabricating these facts; it was omitting information that could affect a customer's decision.

**Reusable system change:** add a mandatory Source-to-Page Coverage Matrix after implementation. Reconcile the original source index, normalized facts and customer-question map against exact page/section locators. Mark each material answer PUBLISHED, PREVIEW ONLY, GAP or NOT APPLICABLE. Include operational policies and aftercare where relevant, not only price and headline offer facts. Keep internal, private, unapproved and unavailable information out of public content. This matrix must be reviewed before owner sign-off and should feed independent QA.

**Validation boundary:** this was an actual AI normalization execution but used a synthetic transcript derived from an already structured fixture; it is not a blind benchmark or real client evidence. No audio or asset-rights workflow was tested. S09 was a documentation/normalization segment and did not change website code.


## 9. S10 — Policy facts must survive the page handoff

S10 closed six concrete source-to-page gaps discovered during S09: limited motorbike parking / no dedicated car parking, outdoor-pet policy, public-holiday schedule uncertainty, accepted counter and pre-order payment methods, large/custom-order deposit and cancellation terms, and incorrect/damaged-order service recovery.

**Semburat evidence:** [S10 refinement report](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s10-policy-completeness/docs/EXPERIMENT_03_S10_BUSINESS_COMPLETENESS_REFINEMENT.md), [S10 Source-to-Page Coverage matrix](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s10-policy-completeness/docs/EXPERIMENT_03_S10_SOURCE_TO_PAGE_COVERAGE.md), and [S10 combined QA run #43692947231](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43692947231).

The matrix maps each topic from the raw transcript segment (INT-04 / INT-05), through the normalized operations/policy register, to the exact visible Visit detail or FAQ question. It deliberately records each row as **PROVIDED / DEMO_ONLY / NOT_APPROVED / PREVIEW_ONLY**. Browser verification proves that content is present and behaves correctly; it does not verify the business fact or authorize publication.

**Reusable system rules confirmed by S10:**
- Reconcile operational constraints and policies, not only headline offer/menu facts. Depending on the business, this may include physical access, parking, pets, holiday exceptions, payment methods, deposits, cancellation, refunds, order correction and aftercare.
- Use real customer questions to shape FAQs. Do not force a fixed FAQ count; add only questions supported by source material and useful to a customer decision.
- Keep each source locator intact through normalization, copy drafting and the rendered page. A fact in the brief is not a completed answer until its exact page/section is identified.
- Keep content coverage separate from evidence and release authorization. A source-backed statement can be visible in a preview while remaining unverified, DEMO_ONLY or NOT_APPROVED.
- Policy disclosure must never imply live payment, refund, reservation, order processing or support capability when no corresponding operational channel exists.

**Validation boundary:** S10's combined S01–S10 browser, responsive, keyboard and business QA passed in Chromium. All new facts remain synthetic. This does not validate real policies, legal enforceability, real payment/support workflows or public launch readiness.

S10's rendered Visit and FAQ captures were also reviewed at desktop, tablet and narrow mobile widths after the successful CI run. The additions retained the existing distinctive design direction; no redesign or additional UI component was justified. The reusable method is to review the actual rendered result after source-backed content changes and preserve a successful composition when the evidence supports retention, rather than equating every new segment with a redesign.


## 10. S11 — Clarification triage protects the low-input model

S11 exercised the material-first workflow using a controlled synthetic packet with conflicting brand names, croissant prices, hours, custom-box lead times and complaint terms; owner uncertainty; secondary staff notes; stale 2025 collateral; no public CTA/address; a superseded gluten-free label; and asset-rights / people-consent gaps.

**Semburat evidence:** [S11 challenge packet](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s11-ambiguity-stress-test/docs/EXPERIMENT_03_S11_AMBIGUOUS_RAW_MATERIAL_CHALLENGE.md), [S11 normalization and ambiguity QA](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s11-ambiguity-stress-test/docs/EXPERIMENT_03_S11_AI_NORMALIZATION_AND_AMBIGUITY_QA.md).

The controlled execution preserved each conflict, kept source/evidence/publication states separate, excluded unsafe or unapproved claims/assets and produced five grouped material questions. Optional delivery/payment/box/aftercare gaps were recorded and omitted rather than sent as extra questions.

**Reusable system change — clarification triage:**
- Label unresolved items PREVIEW BLOCKER, PRODUCTION BLOCKER or OPTIONAL GAP.
- Ask only for decisions needed for the next milestone. A disclosed preview may continue while production-only blockers remain unresolved.
- Group the smallest useful question set by responsible owner; state why each answer matters and the safe omission/fallback if unanswered.
- Continue unaffected preview work using an internal working label, contact-not-configured state or Studio-created concept assets where safe.
- Keep unanswered facts PENDING / NOT_APPROVED; do not repeatedly ask unless the next release gate depends on them.

This tightens the low-input model: the client resolves only material decisions, while optional uncertainties stay visible in internal records and out of public copy.

**Validation boundary:** S11 was a controlled synthetic challenge authored and normalized in the same GPT-6 session. It is not blind extraction, a real interview/audio test, binary asset inspection, rights validation or a real client response. It verifies the instruction path against deliberate edge cases, not real-world model accuracy.

## 11. Final product audit — visible quality must be measured, not guessed

The final Semburat review inspected the complete rendered page, section screenshots at actual viewport scale and the underlying source/QA implementation. The overall art direction remained DISTINCTIVE; no broad redesign was justified. The audit found a real contrast defect: the original tomato text accent on paper measured 3.40:1 and on butter 2.61:1, below WCAG AA for normal text. Small supporting disclosures were also too compact.

**Semburat evidence:** [Final product and system audit](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s11-ambiguity-stress-test/docs/EXPERIMENT_03_FINAL_PRODUCT_AND_SYSTEM_AUDIT.md), [contrast and responsive QA run #43706074502](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43706074502).

**Implemented corrections:**
- Added separate light-surface and dark-surface accent text tokens, rather than reusing one brand accent on every background.
- Darkened muted text on the warm Visit surface and enlarged important allergen, pricing, visit, order and legal disclosures.
- Added automated color-pair checks with alpha compositing and explicit background mapping for selected text roles.
- Changed typography regression from checking the first matching node to checking every matching instance at every responsive width.
- Corrected the S05 test summary from nine FAQs to twelve.
- Added S10/S11 branch filters so website changes on the latest experiment line trigger the full browser suite.
- Removed fixed skip-link overlap from section screenshot crops without changing the actual keyboard journey.

**Reusable system rules:**
- Establish explicit foreground/background token pairs. Never assume a brand accent is readable on paper, butter, tinted surfaces, photography or dark panels.
- For WCAG AA text checks, use 4.5:1 for normal text and 3:1 for large text; check non-text UI controls/focus indicators separately at 3:1 where applicable. Composite translucent text against its actual background; gradients and image overlays require rendered sampling.
- Enumerate all rendered instances, not just the first element for a selector. Run checks at every standard viewport and on relevant hover, focus, active, disabled, expanded and error states.
- Important prices, allergen/safety notes, operating policies, consent notices and transaction limitations are content—not decorative metadata. Do not shrink them to fit; simplify or restructure first.
- Review section screenshots at 100% viewport scale. Full-page screenshots are for rhythm, not for judging body text or small labels.
- Screenshot evidence must not contain fixed/sticky controls accidentally composited over a section crop. Hide them only during crop capture, never during the actual behavior test.
- CI should cover the active experiment branch and its PR base branches; artifact names, success messages and checkpoint docs must match the actual scope/count.

**Validation boundary:** the S11 contrast run passed the targeted role/background checks across nine Chromium widths. This is stronger evidence than visual intuition, but it is not a complete WCAG audit, assistive-technology test, Firefox/WebKit run, physical-device test, Lighthouse report or full performance measurement. The experiment remains synthetic and not production-approved.

## 12. Build, data and interaction lessons from S01–S08

The first implementation slices added lessons that are not specific to bakeries and should shape future production work:

- **Test the actual committed page.** S01's first browser render used an in-memory `page.set_content` copy with external font requests removed because direct branch navigation was unavailable. It was useful for a scoped layout proof, but it did not prove the exact branch URL. For acceptance, serve the checked-out commit in the browser and record its SHA; label in-memory/local-copy rendering as a scoped proof, not an exact-commit release check.
- **Use one canonical data source for repeated facts.** S02's 20 menu records drove both category browsing and the later order simulator. For future sites, keep product/offer facts in one data source when the same values appear in more than one component or interaction. Test names, prices, conditions and displayed totals against the source rather than maintaining duplicate hardcoded copies.
- **Test state transitions and boundaries, not just static presence.** Category switching must update active state, heading, item count and list together. Any selected-item counter should announce concise status, not the entire refreshed product list. Reset scroll/selection to the documented initial state before capturing evidence.
- **Make visual assets part of the information system.** Informative SVGs need accessible title/description; meaningful raster images need truthful alt text, correct aspect ratio/focal point, intrinsic dimensions or reserved aspect space, optimized weight and provenance. A concept image can fill a preview gap but cannot become client proof.
- **Offer logic needs semantic distinctions.** S04 kept brunch service time separate from box lead time, one-box minimum separate from brunch, and availability separate from stock. Reusable offer matrices should preserve the business meaning of each condition instead of flattening every schedule or quantity into generic metadata.
- **Local simulations need explicit transaction boundaries.** S05 proved quantity, subtotal, category, decrement, clear, empty state and maximum-quantity behavior. A simulation must not imply send, persistence, inventory, booking, payment or confirmation. Test the upper bound and remove-last-item path, not only the happy path.
- **Scope regression to the right component.** When two panels contain buttons with the same accessible name, scope Playwright locators to the intended panel. This is a test reliability rule; do not misclassify an ambiguous test locator as a user-facing defect.
- **Keep screenshot state deterministic.** Set category, cart, FAQ open/closed state, scroll position and viewport explicitly before capture. Fixed/sticky elements can be composited over element screenshots during scroll; test their actual behavior separately and hide them only for the evidence crop where the overlap is a capture artifact.
- **Keep the implementation simple until evidence demands more.** Semburat's preview runs as static HTML/CSS/JavaScript plus a local WebP/SVG asset. It needs no framework build, package installation, database, API or backend. Choose the smallest stack that supports the actual visitor task; add a framework or backend only when maintainability or a real operational requirement justifies it.

**System consequence:** the Master Skill / implementation and QA standards should treat exact-commit browser evidence, shared business data, semantic interaction states, deterministic screenshots, truthful local simulations, and a justified static-first stack as reusable acceptance rules. S01–S08 provide browser and source evidence for these engineering patterns; they do not replace real-client or cross-browser validation.
