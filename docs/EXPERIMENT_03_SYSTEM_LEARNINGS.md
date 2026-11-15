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
- full WCAG and assistive-technology audit;
- Lighthouse/Core Web Vitals and real-world performance;
- real owner/visitor validation and commercial delivery effort.

The next real-client pilot should test the actual minimum-input path using a genuine interview and client-supplied asset packet, with authorized access and explicit rights/approval tracking. It should not reintroduce a long mandatory client form.
