# Blueprint Migration Decision & Provenance

**Date:** 2026-11-14  
**Target repository:** `kannaryukkei/ai-operated-web-studio`  
**Target branch:** `restructure/business-first-product-system`  
**Latest migration commit:** `bd615af07309b1057981eba70d5528693d90c8ce`  
**Source repository:** `kannaryukkei/web-studio-template-kit`  
**Source branch:** `starter/five-website-audit-and-hardening`  
**Source commit:** `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`

## Decision

The AI Operated Web Studio repository is the canonical home for Master Skill v1.13, specialist skills, selected quality references and reusable blueprints. The former Laravel platform was retired through merged PR #50 on 2026-11-18; there is no active Studio dashboard or workflow database. Each website is operated from one dedicated conversation, with source code stored in its own repository.

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

The original source repository's files are preserved as a nested snapshot so the migration remains auditable. `blueprints/starter/README.md` is the current usage guide. Legacy prompts/templates under the nested snapshot are historical examples, not mandatory workflow instructions.

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
| Master Skill and selected specialist skills | `docs/` and `skills/` |
| Website source code and useful delivery evidence | Separate repository for each website |
| Reusable Starter reference and pilot evidence | `blueprints/starter/` and selected supporting docs | |
| Starter reference implementation, SOP, prompts and reusable client templates | `blueprints/starter/` |
| Future Business / Custom blueprints | `blueprints/business/` and `blueprints/custom/` only after Starter is proven |
| A real client's delivered website | Separate private client repository |
| Client-specific facts, assets, credentials and approvals | That client's controlled project record/repository |

Do not place website source in `platform/`, and do not turn a client website into a shared default.

## Reuse qualification

The migrated website code is the ZACKS Detailing automotive/local-service reference. It is not a universal blank website. Before copying it for a client, verify category fit and replace all ZACKS-specific copy, contact number, service data, pricing, imagery, captions/credits, social links and demo proof. Remove interactions that do not answer a real visitor need.

For cafés, portfolio studios, retail and other categories, reuse `KALA_PILOT_LEARNINGS.md` and derive a suitable information architecture; do not force the automotive source structure.

## Verification status

**MIGRATION VERIFIED**

- Source commit and branch identified.
- Full source tree compared with the migrated snapshot: **51/51 files matched exactly**; no missing files, extras, blob SHA differences or file-size differences.
- Migrated Starter clean dependency install: PASS.
- Migrated Starter production build: PASS.
- Migrated Starter Playwright: **15/15 PASS**, Chromium, workflow run [43615900261](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43615900261).
- AI Studio platform CI on the migration commit: PASS, workflow run [43615904527](https://github.com/kannaryukkei/ai-operated-web-studio/actions/runs/43615904527); includes frontend build, formatting, lint, TypeScript, Pint, PHPStan and **74 tests / 336 assertions**.
- Latest migration commit: `bd615af07309b1057981eba70d5528693d90c8ce`.
- PR #12 remains open as Draft; `main` is unchanged.
- All reusable KALA branch lessons are documented with source branch/head provenance; intake-only branches are not misrepresented as completed website builds.

This is historical evidence for the original migration commit. It does **not** establish current accessibility, performance, cross-browser, real-world conversion or commercial readiness.

## Repository retirement decision

- **`web-studio-template-kit`: SAFE TO RETIRE; delete only after PR #12 is merged.** Its entire 51-file audited source tree is preserved exactly under `blueprints/starter/template-kit/`, and the migrated build plus Playwright 15/15 have passed. Until PR #12 is merged, archive it rather than deleting it because the canonical snapshot is still on the review branch, not `main`.
- **`kala-coffee-studio`: ARCHIVE, DO NOT DELETE.** The reusable rules and source provenance are distilled, but the original websites, branch histories and CI artifacts were not all copied into AI Studio. Keep the repository as read-only experiment evidence. Deletion is only safe after an explicit decision to discard that historical source or after a separate immutable archive has been retained.
- **`ai-operated-web-studio`: KEEP.** It is the canonical home for reusable operating guidance, skills and blueprints, not an application/workflow control plane.

No source repository has been deleted or archived by this migration.
