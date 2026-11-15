# Product Specification — ZACKS Reference Builds

Status: Draft v0.4 — Master Revision candidate  
Purpose: Prove one repeatable, high-quality Starter website production workflow using one real reference business. Business and Custom remain parked until Starter acceptance passes.

## 1. Business reference

All demonstrations use ZACKS Detailing as the same reference business. This controls differences in industry, brand identity, copy, service information, and imagery when comparing tiers.

Source:
- Repository: https://github.com/kannaryukkei/zacks-detailing
- Branch: `design-intelligence-v1`
- Commit: `6ab85e93a12a3bfe8fcfb96199a91a5ce600595b`
- Frontend: `Frontend/`
- Backend: `Backend/zacks-backend/`

Use only owner-approved facts and assets. Do not invent business claims, ratings, testimonials, opening hours, prices, service coverage, or completed-work evidence. Missing photographs are not a reason to omit important visual sections: use AI-generated or designed illustrative demo imagery and label it clearly as conceptual.

## 2. Product tiers

### A. Starter — comprehensive one-page website

Goal: show that a small business can receive a complete, useful online presence without unnecessary complexity.

Proposed sections:
1. Header and anchor navigation
2. Hero / business value proposition
3. Business introduction
4. Services and packages (including pricing where approved)
5. Differentiators / why choose the business
6. Process
7. Location and service coverage (verified details only)
8. Gallery / visual showcase — always include a designed visual gallery; use approved work photos when available, otherwise use original AI-generated or illustrative demo visuals clearly labeled as conceptual
9. FAQ
10. Contact / WhatsApp CTA and footer

Do not fabricate or simulate testimonials, reviews, ratings, awards, customer counts, performance metrics or case results — including in portfolio demos. If no approved trust evidence exists, omit the proof section or use a truthful, source-supported explanation of the process/offer. Concept imagery is not proof.

Principles:
- One-page information architecture.
- Simple content configuration, reusable sections, and responsive design.
- Completeness means useful verified information, not filler content.
- No CMS, backend, database, customer login, admin dashboard, or persistent customer records by default.

### B. Business — parked reference definition

Not an active implementation target. Revisit only after Starter passes the product acceptance gate and the Studio owner reprioritizes.

Goal: demonstrate deeper content, clearer navigation, and more room for presentation—not just a longer Starter page.

Proposed routes:
- Home
- Services & Pricing
- About / Process
- Area / Coverage
- FAQ / Contact

Final grouping depends on the amount of verified content available. Do not create empty pages solely to increase page count.

### C. Custom — parked reference definition

Not an active implementation target. Revisit only after Starter and any separately approved Business definition justify the work.

Goal: demonstrate a genuinely tailored experience for the same ZACKS business.

The current ZACKS Laravel-backed site is the primary real-world reference for custom design and backend-enabled catalog management. Only claim features that are present and verified. Do not build a fake universal Custom template or promise additional booking/payment/database functionality that has not been implemented.

## 3. Comparison criteria

Use the same verified ZACKS facts and appropriate assets across versions. Compare:
- Information architecture
- Page/section depth
- Design freedom
- Interaction complexity
- Mobile usability
- Content clarity
- Conversion paths
- Accessibility and performance
- Production effort and maintainability

## 4. Technical boundaries

- Starter and Business begin as static frontend projects.
- The audited ZACKS project uses a Laravel API and Laravel Sanctum; do not copy that integration into Starter/Business by default.
- Do not copy backend code, admin/authentication, environment values, secrets, API credentials, or customer records into the static tiers.
- Legacy SQL files under `Frontend/supabase/` are not a reason to add Supabase.
- Confirm current ZACKS live catalog values with the owner: Laravel database values may differ from seed data and the frontend static fallback.

## 5. Acceptance criteria

A tier is demonstrable when:
- Build succeeds.
- No console errors or broken navigation.
- All links and CTAs have been tested.
- Responsive layout is checked on mobile, tablet and desktop.
- Content, prices, facts and assets are verified.
- Images have correct dimensions, alt text and truthful captions.
- Basic metadata and social preview are present.
- No unused backend integration or secrets are bundled.
- A short README explains configuration and deployment.

## 6. Non-goals for first iteration

- General-purpose SaaS platform
- Multi-tenant CMS
- Generic page builder
- Automated checkout
- Booking-management backend
- Payment gateway
- Reusable system for every industry at once

First prove one repeatable, high-quality Starter website workflow using ZACKS. Follow Master Skill Stages 0–9, the canonical schema/WRP and G0–G7 approval policy; do not begin design or implementation before WRP `APPROVED_FOR_DESIGN` and G2.
