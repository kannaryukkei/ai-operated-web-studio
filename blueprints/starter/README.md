# Starter Blueprint — Canonical Production Reference

**Status:** Migrated into the AI Operated Web Studio system on 2026-11-14  
**Source:** `kannaryukkei/web-studio-template-kit`, branch `starter/five-website-audit-and-hardening`, commit `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`  
**Source validation:** production build PASS; Playwright 15/15 PASS on Chromium, 320–1440px (source evidence: `template-kit/docs/starter-responsive-qa.md`).

## What this blueprint contains

- `template-kit/starter/`: the full React/Vite static Starter reference implementation.
- `template-kit/docs/`: product definition, extraction map, source audit, responsive QA, delivery SOP and workspace templates.
- `template-kit/prompts/starter/`: manual stage prompts for ChatGPT/Claude.
- `template-kit/templates/`: client project records, approval logs, scope, content, QA, launch and retrospective templates.
- `KALA_PILOT_LEARNINGS.md`: reusable lessons distilled from every KALA pilot branch.

## Important: this is a reference implementation, not a universal blank site

The current website source is the ZACKS Detailing automotive/local-service demo. It is the best tested reference for a local service business decision journey, but it still contains ZACKS-specific language, automotive interactions, sample pricing, contact details, external photo references and demo proof. Do not deploy or copy it unchanged for a client.

For each project:
1. Read the approved brief and the current Master Skill.
2. Decide whether this local-service pattern actually fits the customer journey.
3. Copy `template-kit/starter/` into that client's separate website repository only when it is a fit.
4. Replace all demo facts, identity, contact endpoints, images, credits, pricing, FAQs and policies with traceable client-approved data.
5. Remove or redesign interactions that do not serve the real business.
6. Run the complete acceptance gate and independent browser QA before any release.

For cafés/F&B, portfolio studios, retail catalogs, and other categories, reuse the learning and QA contracts—not the automotive page structure. Derive a category-specific information architecture and features from the client brief.

## Production architecture

`ai-operated-web-studio` is now the single source of truth for:
- studio workflow, brief, Master Skill, standards and product acceptance;
- reusable Starter blueprint, operating prompts and delivery templates;
- platform code under `platform/`.

Every client website remains a separate repository created from a selected blueprint. Do not put client websites or client facts inside `platform/`. Do not add backend, CMS, database, checkout, booking, authentication or persistent form behavior unless a real business need is approved.

## Release warning

The migrated source has inherited its original QA result; the migration itself must still pass its own clean-install build and Playwright run before this blueprint is marked migration-verified. Build/CI status is tracked in the migration record.
