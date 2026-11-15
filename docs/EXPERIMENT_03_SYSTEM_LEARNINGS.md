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
