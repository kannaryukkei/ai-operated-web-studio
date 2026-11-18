# Starter Template Kit — Reference Source

A category-specific React/Vite website reference derived from the ZACKS Detailing project. This folder is a source/reference library, not an operating system or project-management template.

## Scope

- `starter/`: tested static-first Starter website reference.
- `docs/`: selected technical notes, source audits, competitive copy patterns and QA evidence.
- `templates/starter-client/02-content/`: optional media and section-planning helpers for projects with enough assets/content to justify a separate file.
- `.github/workflows/starter-build.yml`: website build and browser regression checks.

The old stage orchestrator/prompts, project dashboard, approval register, project-board sheet, delivery/retrospective paperwork and intake issue form have been retired. The project conversation and Master Skill v1.13 replace those duplicate operating controls. Do not recreate them as mandatory artifacts.

## Technical baseline

- React 18, Vite 6, plain CSS.
- Node.js 20+ and npm with committed lockfile.
- Playwright/Chromium where browser checks are configured.
- Static-first; add backend functionality only when real requirements justify it.

## Reference and safety

This is a ZACKS-specific local-service reference, not a universal deployable site. Inspect the actual project conversation, operating mode and source-backed business needs before copying or adapting it. Do not carry ZACKS facts, pricing, contacts, assets or proof into another project.

Use `client_service` for real or ambiguous client work. Use `studio_development` only for clearly labelled synthetic internal development; no public release or deployment is permitted in that mode.

## Useful optional content templates

- `templates/starter-client/02-content/media-requirements.csv`: plan visual requirements when a page has several important assets.
- `templates/starter-client/02-content/content-asset-register.csv`: track exact source, licence, permission, crop and local file when media volume/rights complexity warrants it.
- `templates/starter-client/02-content/media-client-request.md`: concise request for missing authentic business media.
- `templates/starter-client/02-content/section-map.md`: optional page-section planning reference for complex sites.

None is mandatory for a simple website. Keep operational decisions in the project conversation; store code and only useful deliverables in the website repository.

## Quality boundary

The Starter reference previously passed its 19-test Chromium suite and a responsive run across nine widths from 320px through 1440px. This is historical evidence for that tested source version, not proof every new copy passes. Run current website checks, inspect actual screenshots and verify source/asset rights as appropriate. A passing build is not client approval or production authorization.
