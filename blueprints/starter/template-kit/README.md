# Web Studio Template Kit

A reusable Starter website production foundation derived from the ZACKS Detailing reference project.

## Current development priority

**Starter is the only active implementation target.** Business and Custom definitions remain reference material; do not build their blueprints until Starter passes the current product acceptance gate and the Studio owner explicitly reprioritizes.

The current Starter codebase is a development/portfolio reference, not a sellable production release. The former simulated customer-story cards and numeric proof have been removed from the current rendered reference and content configuration; a 19-test browser regression prevents the known proof components/values from returning. A demo label never legitimizes fabricated social proof.

## Product principles

- Use adopted Master Skill v1.12 and the canonical workflow, schema, WRP and G0–G7 approval policy as the operating authority.
- The default client input is one normal interview plus existing client assets and optional references. The AI/operator produces the Client Website Brief; do not turn project setup into a long client questionnaire.
- Never invent testimonials, reviews, ratings, awards, customer counts, performance metrics, credentials, guarantees or case results — including for portfolio/demo work.
- Clearly disclosed concept imagery and illustrative layouts are allowed when they cannot be mistaken for actual client staff, premises, products, customers or completed work.
- Use the Media & Asset Pipeline: authentic client media first for business proof; free stock only as supporting context after checking the exact asset licence and third-party rights; keep selected files local and optimized.
- Missing client photography is not a blocker; missing factual evidence must not be filled with fabricated proof.
- Keep Starter lightweight and static-first. Add backend functionality only when it is required by an approved business need and scope.
- Keep business facts separate from presentation components.
- Preserve responsive behavior, accessibility, performance, SEO foundations, reproducibility and independent QA evidence.
- Treat AI as a production assistant; it does not approve facts, commercial scope, permissions or release.

## Repository structure

```text
starter/   Active one-page Starter development/reference website
business/  Parked until Starter acceptance passes
custom/    Parked; bespoke project examples only when reprioritized
docs/      Product, source, architecture, QA and delivery standards
prompts/   Master Skill-aligned Starter execution prompts
templates/ Reusable internal project artifacts
```

Each real client website remains independently buildable and deployable in a separate repository. A shared npm workspace or component library is deferred until repeated delivery evidence proves the need.

## Reference project

- Repository: https://github.com/kannaryukkei/zacks-detailing
- Audited branch: `design-intelligence-v1`
- Audited commit: `6ab85e93a12a3bfe8fcfb96199a91a5ce600595b`
- Frontend root: `Frontend/`
- Backend root: `Backend/zacks-backend/`

The audit is scoped to that branch and commit, not historical branches. The audited ZACKS frontend uses Laravel API integration; legacy Supabase SQL files are not the active frontend integration.

Do not copy the ZACKS project wholesale. Follow `docs/extraction-map.md` to isolate business facts, brand assets, Laravel/admin integration, analytics configuration and deployment assumptions. For client production, use:
- `docs/starter-delivery-playbook.md` for delivery operating steps under Master Skill Stages 0–9.
- `docs/starter-delivery-templates.md` for internal project records and reusable messages.
- `docs/starter-production-kit.md` for workspace/control structure.
- `prompts/starter/` for current stage prompts.
- `templates/starter-client/02-content/media-requirements.csv` to plan required visuals against visitor questions; `content-asset-register.csv` remains the canonical per-file rights and provenance register.
- `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md` and the `media-sourcing-and-licensing` skill for sourcing, rights and media implementation.

## Current reference status

- Starter v0.4.0 provides an automotive-editorial visual system and an expanded portfolio journey.
- Includes interactive vehicle/class pricing, Care Finder, additional services, a photo gallery, WhatsApp consultation handoff, FAQ and responsive footer.
- The former simulated metrics/customer-story blocks were removed and a browser regression now checks that unverified testimonials/performance claims remain absent.
- Hero/gallery photographs are visual references, not evidence of customer work; verify source, license, permissions and use before redistribution.
- The site is React + Vite + plain CSS and does not persist booking data.
- The current Chromium baseline passes 19/19 tests in GitHub Actions [run #69](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43744267588); the operator also reported 19/19 on Windows. The automated overflow test covers nine viewport widths, from 320px to 1440px. This does not complete actual-scale visual review, full accessibility, performance, cross-browser, real-client, deployment or handover acceptance.
- `package-lock.json` is committed in the Starter folder (`0159e20`). Starter CI now uses `npm ci` and configures npm caching against that lockfile; [run #69](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43744267588) confirms a clean install (69 packages), production build and 19/19 browser tests.
- Current AI automation is an operating design plus reusable prompts/templates; build/browser testing are automated in GitHub Actions, while lead intake, AI execution, approvals, invoicing and hosting deployment remain manual unless a separate tested implementation exists.

## Release boundary

A successful build or passing browser suite does not make this reference sellable or production-ready. Use `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md`, WRP `APPROVED_FOR_DESIGN` and approval gates G0–G7 before any client production release or commercial-readiness claim.


## Media sourcing and no-API import

Starter supports professional stock photography (prioritize Adobe Stock; Envato Elements is supported with project-specific registration and manual provider UI) and original AI-generated concept imagery. Exact item licences and provider Terms of Service remain separate gates. The workflow never scrapes or automates stock sites.

For saved ChatGPT or licensed-stock images, copy `starter/media-import-queue.example.json` to each client workspace as `media-import-queue.json`, then run `npm run media:watch` in that website folder. The watcher handles import, naming, original preservation, the canonical asset register and optional WebP responsive output. See `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`. Rights and publication approval remain explicit.
