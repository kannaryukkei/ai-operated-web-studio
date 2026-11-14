# Blueprint Migration Decision & Provenance

**Date:** 2026-11-14  
**Target repository:** `kannaryukkei/ai-operated-web-studio`  
**Target branch:** `restructure/business-first-product-system`  
**Source repository:** `kannaryukkei/web-studio-template-kit`  
**Source branch:** `starter/five-website-audit-and-hardening`  
**Source commit:** `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`

## Decision

The AI Operated Web Studio repository is the single canonical home for the studio's platform, production workflow, Master Skill, standards and versioned website blueprints. The platform application remains under `platform/`; reusable website production assets live under `blueprints/`. A client website is still delivered in its own isolated repository copied from a selected blueprint.

## Migrated Template Kit payload

The source repository has been copied, with path preservation, to:

`blueprints/starter/template-kit/`

The copy includes:
- Starter React/Vite website, CSS, content data, favicon and local SVG illustrations;
- Playwright tests, Vite configuration and build workflow;
- source audit, extraction map, architecture, product spec and five-website audit;
- Starter delivery playbook, production kit, AI operations blueprint, QA evidence and delivery templates;
- six stage prompts plus orchestrator;
- GitHub intake issue form and project workspace / approval / QA / handover templates.

The original source repository's files are preserved as a nested snapshot so the migration remains auditable. `blueprints/starter/README.md` is the canonical usage contract for the migrated material.

## KALA pilot learnings

All useful branch findings are distilled in `blueprints/starter/KALA_PILOT_LEARNINGS.md`. The document records each branch/head SHA and separates:
- actual website implementations with verified browser/CI evidence;
- intake-only and sparse-input experiments;
- universal process/QA rules;
- conditional category-specific patterns;
- facts/assets and demo behavior that must never leak into future clients.

No synthetic client facts, brand identity, contact details, prices, testimonials or service areas are promoted to shared defaults.

## Source-of-truth boundaries after migration

| Area | Canonical location |
|---|---|
| Platform code and persisted project state | `platform/` |
| Master Skill, client brief, implementation standard, product tiers, acceptance gates | `docs/` |
| Starter reference implementation, SOP, prompts and reusable client templates | `blueprints/starter/` |
| Future Business / Custom blueprints | `blueprints/business/` and `blueprints/custom/` only after Starter is proven |
| A real client's delivered website | Separate private client repository |
| Client-specific facts, assets, credentials and approvals | That client's controlled project record/repository |

Do not place website source in `platform/`, and do not turn a client website into a shared default.

## Reuse qualification

The migrated website code is the ZACKS Detailing automotive/local-service reference. The original 15/15 Chromium test result proves the source snapshot's recorded build and browser suite, not that every business can use it unchanged. Before copying it for a client, verify category fit and replace all ZACKS-specific copy, contact number, service data, pricing, imagery, captions/credits, social links and demo proof. Remove interactions that do not answer a real visitor need.

For cafés, portfolio studios, retail and other categories, reuse `KALA_PILOT_LEARNINGS.md` and derive a suitable information architecture; do not force the automotive source structure.

## Verification status

- Source commit and branch identified.
- Full template-kit file snapshot copied under the blueprint path.
- Source pilot branches inventoried and reusable practices documented.
- Migration-branch CI, migrated Starter clean install/build and Playwright result must be recorded before the old source repo is considered safe to delete.

## Repository retirement policy

Do not delete either source repository merely because files were copied. Verify target tree completeness and migrated tests first. After successful verification:
- `web-studio-template-kit` is redundant and can be deleted or archived after its contents are checked against this snapshot.
- `kala-coffee-studio` should be archived first, not immediately deleted: its full branch histories, commits, CI artifacts and experimental website implementations are provenance. Delete only after the owner explicitly accepts losing that history or a separate immutable archive is retained.
