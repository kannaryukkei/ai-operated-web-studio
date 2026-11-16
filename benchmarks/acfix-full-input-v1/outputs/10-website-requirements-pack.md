# ACFIX Full-Input Benchmark — Website Requirements Pack

**Pack ID:** WRP-FI-001 · **Version:** 1.0  
**Run mode:** INTERNAL_BENCHMARK  
**Status:** READY FOR INTERNAL DESIGN TEST · NOT APPROVED FOR CLIENT PRODUCTION  
**Source snapshot:** `acfix-full-input-v1`  
**Tier:** STARTER · single-page static website

## 1. Goal and primary visitor task

Help homeowners, apartment residents and small-premises managers identify the likely AC service path, understand price and scope, confirm coverage/access conditions, and prepare the right information before requesting a consultation.

The site should replace uncertainty with clarity. It must not present remote diagnosis or promise a guaranteed cooling outcome.

## 2. Core visitor tasks

1. Identify whether the need is routine cleaning, deep cleaning, initial inspection or installation.
2. Compare the applicable price by AC capacity.
3. Understand what each service includes and excludes.
4. See which extra costs may apply and when they are approved.
5. Confirm operating hours, service-area zone and travel fees.
6. Prepare unit/access information before the visit.
7. Understand the process, payment, cancellation and workmanship-warranty boundaries.
8. Start a consultation simulation without being misled into believing a message or booking was sent.

## 3. Recommended information architecture

Do not use the same card/grid structure for every section. Each section's visual form must follow the information task.

| Section | Purpose | Key source records | Main content |
|---|---|---|---|
| 01. Hero / value proposition | Explain the business and clear promise immediately | F-001, F-002, F-017, F-040, F-042 | Home-comfort proposition, selected visual asset, one primary CTA |
| 02. Choose the service path | Help visitors identify the next appropriate service | F-006, F-018, Q-001–Q-004 | Four service needs with a simple decision guide; no diagnosis quiz |
| 03. Service and price comparison | Compare actual scope/price by unit capacity | F-007–F-014, F-019 | Pricing matrix with adjacent inclusions and caveats |
| 04. What is / is not included | Prevent price/scope misunderstandings | F-015–F-019 | Clear inclusion/exclusion treatment and additional-work approval rule |
| 05. How the visit works | Build confidence through process clarity | F-017, F-024, SRC-FI-004 | Four-step service path and approval checkpoint |
| 06. Coverage and schedule | Decide whether a visit can be requested | F-020–F-028 | Zone A/B district list, travel fee, times, access constraints |
| 07. Prepare for the visit | Reduce missed information/access friction | F-029 | Short customer checklist, separate routine vs installation preparation |
| 08. Payments and workmanship policy | Explain financial and post-service expectations | F-030–F-035 | Payment, deposit, cancellation, warranty and limitations |
| 09. FAQ | Answer real objections | SRC-FI-007 | Twelve source-backed questions, concise answers |
| 10. Consultation / close | Present the next action honestly | F-036, F-037 | Local demo panel only, no outbound data transfer, explicit simulation notice |

The final visual design may combine related sections, but it must retain coverage of all material questions.

## 4. Conversion contract

**Primary CTA label:** “Simulasikan konsultasi layanan”  
**Behavior:** open a local-only modal/panel; prefill a sample message from service choice and supplied demo fields; provide a copy-to-clipboard option only if implemented and tested. Display: “Ini simulasi. Pesan tidak dikirim atau disimpan.”  
**No live destination:** there is no WhatsApp/email/phone endpoint, no form backend, no calendar and no booking confirmation.  
**Secondary CTA:** “Lihat harga layanan” scrolls to the price comparison.

Every control must have real behavior. Do not show a fake success toast or booked state.

## 5. Content contract

- Bahasa: Indonesian.
- Tone: calm, capable, clear and warm.
- Explain service names in customer language; technical terms may be explained briefly.
- Show price by service and PK capacity.
- Put inclusions/exclusions and important caveats beside the relevant offer/price.
- Highlight that extra work requires customer approval.
- Do not claim “pasti dingin”, “hemat listrik”, “udara lebih sehat”, “teknisi bersertifikat”, “terbaik”, “respon 24 jam” or any unsupported outcome.
- No reviews, ratings, testimonials, awards, staff profiles or customer-story sections.
- Mark the site clearly as an internal synthetic demo. Noindex must be present.

## 6. Asset contract

Use:
- AST-FI-001 wordmark concept.
- AST-FI-002 home-interior hero concept image.
- AST-FI-003 airflow explainer where it materially clarifies a customer question.
- AST-FI-004 four-step process illustration where it improves the process section.

All are concept assets and remain DEMO_ONLY. The hero must not imply a real ACFIX customer home or completed installation. Preserve crop/focal point across desktop/tablet/mobile. Avoid adding unrelated stock photos.

## 7. Visual requirements

- Use the fictional client's preferences as design constraints, not a fixed wireframe.
- Explore two materially different concepts before selecting one.
- Prioritize memorable macro-composition, large visual moments, confident typography and section-specific layouts.
- Avoid default HVAC blue/red, repeated cards, repeated icons, tiny all-caps eyebrows, arbitrary numbering, dashboard motifs, cream/serif broadsheet treatment and generic split-hero layouts.
- Use forest/teal and controlled citrus as a starting palette, but do not limit differentiation to palette/font changes.
- Make desktop, tablet and mobile composition intentionally designed.
- Avoid motion that reduces clarity or repeats on every section.
- Keep all important price/policy text legible and adjacent to the relevant item.

## 8. Functional and technical scope

- One page, React + Vite + CSS (existing Starter stack), static-first.
- Responsive navigation and anchor links.
- Local-only consultation simulation; no outbound request or persistence.
- No CMS, database, CRM, analytics, payment, appointment calendar, live chat or third-party AI/API.
- Semantic headings, keyboard navigation, visible focus, reduced motion and descriptive/empty alt text as appropriate.
- No external font dependency required; font selection is a design decision.
- Metadata, favicon and preview `noindex,nofollow`.
- Test 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.

## 9. Acceptance criteria

### Business/content
- All 43 normalized facts are traceable to source IDs or explicitly not applicable.
- All ten page/section purposes are covered.
- Prices and inclusions/exclusions remain paired.
- Service area and travel fee are accurate to the fixture.
- Operating hours, slot windows and booking limits are clear.
- Payment, cancellation and workmanship warranty are correctly explained.
- No fake social proof or unapproved factual claims.

### Design
- Two materially different directions are presented with wireframes and selected rationale.
- The selected fingerprint is different from old ACFIX, ZACKS and Semburat.
- The hero has a strong memorable visual, not a small incidental diagram.
- Different content types receive different section compositions; no repetitive generic card grid.
- Desktop/tablet/mobile layouts are specified.

### Interaction/technical
- CTA clearly indicates local simulation, sends nothing, saves nothing, books nothing.
- All links/controls have real actions.
- No broken anchor, overflow, console error or misleading success.
- Accessibility/contrast/responsive checks recorded separately from aesthetic verdict.

## 10. Readiness and approval boundary

This WRP is an internal synthetic benchmark specification only. It is not G2 approval for a real client, does not approve public factual claims or asset rights, and cannot authorize deployment or release. The revised art-direction prompt may proceed under `INTERNAL_BENCHMARK` and must stop before implementation.
