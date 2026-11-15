# Website Requirements Pack v1.0 — EXP04-ACFIX

**Pack ID:** WRP-EXP04-0001  
**Project ID:** EXP04-ACFIX  
**Version:** 1.0  
**Discovery snapshot:** SNAP-0001  
**Status:** DRAFT / INTERNAL_REVIEW — not APPROVED_FOR_DESIGN  
**Owner approval:** PENDING; experiment operator has not issued explicit owner approval  
**Client confirmation:** NOT APPLICABLE TO A REAL CLIENT; scenario is synthetic and this does not stand in for client confirmation.

## Goal and visitor

Create a clearly disclosed portfolio preview that allows a hypothetical household visitor to distinguish routine AC cleaning, symptom inspection and new split-AC installation, understand estimate limitations, prepare relevant information, and see that no live inquiry destination exists.

## Tier and scope

- Tier: STARTER.
- Site: one responsive Indonesian-language page.
- Architecture: static-first React/Vite.
- Conversion: no configured public CTA. Contact panel explicitly says the destination is unavailable in this demo.
- No backend/database/CMS, booking, payments, login, data collection, diagnosis, guarantee, CRM, analytics or third-party API.
- Preview only, noindex,nofollow.

## Content requirements

Use Q-0001–Q-0012 as the coverage contract. All business claims must be framed as simulated. The three service prices are illustrative fixture values. State that diagnosis, final scope and additional charges require inspection and customer agreement. Refrigerant is not automatic with routine cleaning. Do not show public hours, exact district lists or a public contact destination.

## Design direction

A calm technical editorial direction: pale mineral surface, deep ink text, saturated cobalt accent, diagram-led hero, fine measurement/grid lines and large typography. Avoid ZACKS' dark automotive photography, teal/black scheme, oversized condensed headlines, vehicle/package selectors and repeated service-card grids.

Use compact service comparison rows with distinct roles, one illustrated service path and simple line diagrams. Use local inline SVG only. No external fonts or image dependencies.

## Requirements and acceptance

- Anchor navigation and one keyboard-accessible mobile menu.
- No stateful service selector; service routes are content/navigation.
- All internal links work; no form.
- Skip link, semantic landmarks, visible focus and reduced-motion support.
- Responsive checks at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- No horizontal overflow, console errors or broken assets.
- Metadata and favicon; keep noindex.
- Lean stack, no new dependency.
- Demo disclosure obvious; service intents clear early; price caveats adjacent; no invented diagnosis, refrigerant, installation inclusions or policies; no fake CTA/social proof.

## Production blockers

All facts are DEMO-ONLY / PENDING; exact offers, price, service area, contact ownership, hours, policies, asset permissions and public identity require real confirmation. No production approval or release is possible.

## Decision log

Starter is recommended because the website supports one compact service-choice journey and no persistence. This WRP remains DRAFT and cannot become APPROVED_FOR_DESIGN through simulation. Any experimental design/build is explicitly out-of-gate and preview-only.
