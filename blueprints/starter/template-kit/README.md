# Web Studio Template Kit

A reusable website production foundation built from the ZACKS Detailing reference project.

## Purpose

Create three comparable portfolio demonstrations for the same reference business:

1. **Starter** — a comprehensive one-page business website.
2. **Business** — a richer multi-page website.
3. **Custom** — bespoke project work, with the current ZACKS Laravel-backed implementation as a real technical reference.

The same reference business lets the portfolio demonstrate the difference between product tiers without changing the client, industry, or core context.

## Product principles

- This repository is a portfolio and product-development sandbox. Demo content, sample metrics, sample customer scenarios, and simulated interactions may be created to demonstrate capability.
- Make simulated content legible as portfolio sample data; do not present invented reviews or metrics as independently verified real-world proof.
- Do not let missing customer materials block a strong portfolio presentation. Use licensed stock, generated, or designed visuals and replace them with approved brand assets later.
- Keep Starter lightweight and static-first. Add backend functionality only when it improves the product and fits the tier.
- Keep business facts separate from presentation components.
- Preserve responsive behavior, accessibility, performance, SEO foundations, and QA.
- Treat AI as a production assistant; review generated content and code.

## Planned structure

```text
starter/   Standalone Starter website (portfolio foundation)
business/  Standalone multi-page tier, built after Starter validation
custom/    Bespoke project examples and guidance
docs/      Product specs, source audit, extraction map, architecture and QA
```

Each implemented tier should be independently buildable and deployable. A shared npm workspace or component library is intentionally deferred until reuse is proven.

## Reference project

- Repository: https://github.com/kannaryukkei/zacks-detailing
- Audited branch: `design-intelligence-v1`
- Audited commit: `6ab85e93a12a3bfe8fcfb96199a91a5ce600595b`
- Frontend root: `Frontend/`
- Backend root: `Backend/zacks-backend/`

The audit is scoped to `design-intelligence-v1`, not historical branches. The audited ZACKS frontend uses Laravel API integration; legacy Supabase SQL files remain in the source repository, but are not the active frontend integration.

Do not copy the ZACKS project wholesale. Follow `docs/extraction-map.md` to isolate business facts, brand assets, Laravel/admin integration, analytics configuration, and deployment assumptions. See `docs/competitive-copywriting-patterns.md` for how Starpoint Garage's content strategy was adapted into a ZACKS-specific portfolio narrative. For client production, use `docs/starter-delivery-playbook.md` as the SOP, `docs/starter-delivery-templates.md` for reusable templates, `docs/starter-production-kit.md` for the workspace/control system, and `docs/starter-ai-operations-blueprint.md` for the AI-led automation model.

## Current status

- Latest source audit and extraction map completed.
- **Starter v0.4.0** has an automotive-editorial visual system and an expanded portfolio journey.
- Includes interactive vehicle / class pricing, Care Finder, additional services, illustrative metrics and sample customer stories, photo gallery, WhatsApp consultation form, FAQ, and aligned responsive footer.
- Portfolio-only metrics and sample stories are explicitly labelled as demo data.
- Hero and gallery photographs are credited visual references, not proof of ZACKS customer work.
- Site remains React + Vite + plain CSS and does not store booking data.
- Latest audit branch validation: production build PASS and Playwright 15/15 PASS on Chromium (320–1440px responsive checks; see `docs/starter-responsive-qa.md`).
- Automated coverage includes section presence, responsive overflow, mobile navigation and Escape, keyboard skip link, vehicle/class pricing, Care Finder, consultation message payload, local date handling, internal links, WhatsApp destination consistency, 12 unique FAQs, image loading/alt text, and footer alignment.
- This is a technically validated portfolio preview, not yet a sellable production release. Owner-approved business facts, contact/social ownership, asset permissions, accessibility/contrast, performance, cross-browser, real-client validation, deployment and handover remain release gates.
- See `docs/starter-responsive-qa.md` for evidence and remaining manual QA scope.
- Starter client delivery is documented in `docs/starter-delivery-playbook.md` and `docs/starter-delivery-templates.md`.
- **Starter Production Kit** adds a 24-file client workspace template, status-board CSV, GitHub intake issue form, AI stage prompt library, and AI-operations blueprint.
- Current AI automation is an operating design plus reusable prompts/templates; only build and browser testing are automated in GitHub Actions today. Lead ingestion, AI stage triggers, approvals, invoicing, and hosting deployment remain future integrations.
