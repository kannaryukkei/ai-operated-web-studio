# Starter Blueprint — Canonical Production Reference

**Status:** Migrated into the AI Operated Web Studio system on 2026-11-14  
**Source:** `kannaryukkei/web-studio-template-kit`, branch `starter/five-website-audit-and-hardening`, commit `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`  
**Migration verification:** exact 51/51 source-file match; migrated clean install/build PASS; Playwright 15/15 PASS on Chromium (GitHub Actions run [43615900261](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43615900261)). **Platform CI:** PASS on migration commit (run [43615904527](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43615904527)).

## What this blueprint contains

- `template-kit/starter/`: the full React/Vite static Starter reference implementation.
- `template-kit/docs/`: product definition, extraction map, source audit, responsive QA, delivery SOP and workspace templates.
- `template-kit/prompts/starter/`: manual stage prompts for ChatGPT/Claude.
- `template-kit/templates/`: client project records, approval logs, scope, content, QA, launch and retrospective templates.
- `KALA_PILOT_LEARNINGS.md`: reusable lessons distilled from every KALA pilot branch.

## Important: this is a reference implementation, not a universal blank site

The current website source is the ZACKS Detailing automotive/local-service demo. It is the best tested reference for a local service business decision journey, but it still contains ZACKS-specific language, automotive interactions, sample pricing, contact details and external photo references. Some legacy portfolio content also contains simulated metrics/customer-story style proof; those elements do not comply with the current evidence policy, even in demos. Do not deploy or copy it unchanged for a client.

For each project:
1. Read the approved brief, Master Skill v1.11 Candidate and the canonical operating/data/approval documents.
2. Decide whether this local-service pattern actually fits the customer journey.
3. Copy `template-kit/starter/` into that client's separate website repository only when it is a fit.
4. Remove all simulated testimonials, reviews, ratings, awards, customer counts, performance metrics and case results. Replace business facts, identity, contact endpoints, images, credits, pricing, FAQs and policies only with source-traceable and appropriately approved material.
5. Remove or redesign interactions that do not serve the real business.
6. Follow WRP/G0–G7 gates and run the complete Starter Product Acceptance Gate plus independent browser QA before any release.

For cafés/F&B, portfolio studios, retail catalogs, and other categories, reuse the learning and QA contracts—not the automotive page structure. Derive a category-specific information architecture and features from the client brief.

## Production architecture

`ai-operated-web-studio` is now the single source of truth for:
- studio workflow, brief, Master Skill, standards and product acceptance;
- reusable Starter blueprint, operating prompts and delivery templates;
- platform code under `platform/`.

Every client website remains a separate repository created from a selected blueprint. Do not put client websites or client facts inside `platform/`. Do not add backend, CMS, database, checkout, booking, authentication or persistent form behavior unless a real business need is approved.

## Verification and release boundary

Migration integrity and technical smoke tests are verified. This does not make the sample website production-ready for a real client. Formal accessibility/contrast, performance/Lighthouse, Firefox/Safari, real-client content/asset approval, and real conversion validation remain open. Use the Starter Product Acceptance Gate before any commercial readiness claim.
