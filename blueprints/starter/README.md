# Starter Blueprint — Production Reference

**Status:** Maintained as a category-specific reference implementation, not a universal website or Studio workflow.

**Source:** kannaryukkei/web-studio-template-kit, branch starter/five-website-audit-and-hardening, commit 6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f.

## What this blueprint contains

- blank/: neutral technical foundation for a new website. Populate it only after the project conversation establishes the purpose, audience, scope and content direction.
- template-kit/starter/: the React/Vite static Starter reference implementation, built around ZACKS Detailing.
- template-kit/docs/: technical/reference notes and historical pilot evidence.
- template-kit/templates/starter-client/02-content/: optional media, asset-provenance and section-planning helpers only. Former stage prompts, dashboards, approval logs, project-board sheets, intake forms and handover/retrospective paperwork have been retired.
- KALA_PILOT_LEARNINGS.md: reusable lessons distilled from the KALA pilot work.

## Starter technical baseline

The maintained Starter reference uses:

- React 18 and Vite 6.
- Plain CSS for styling and responsive layout.
- Lucide React for icons when appropriate.
- Node.js 20 or newer.
- npm with a committed lockfile and npm ci.
- Playwright/Chromium for browser regression testing where configured.

Starter remains static-first. Add a backend, database, CMS, authentication, booking, checkout or persistent form storage only when the actual business requirements justify it.

The Vanilla HTML/CSS/JavaScript implementation from Experiment 04 remains useful experimental evidence, but it is not this Starter reference's selected stack.

## Important: reference implementation, not a deployable client site

The current website source is a ZACKS Detailing local-service demo. It contains ZACKS-specific language, automotive interactions, sample pricing, contact details and photo references. It is not a generic blank site and must not be copied unchanged for another business.

The reference was corrected in commit 6d4e85633e35bb8160a46988c8665267191e3f0f: simulated customer-story cards and numeric proof were removed from the content configuration and rendered page, with a browser regression to prevent their return. This does not verify the remaining ZACKS facts or asset rights.

## How to use it

1. Open one dedicated conversation for the website and select client_service or studio_development; real or ambiguous client work defaults to client_service.
2. Review the project's audience, business, content, intended action and actual requirements. Decide whether this local-service structure fits.
3. Copy template-kit/starter/ into a separate website repository only when its structure is a fit.
4. Replace ZACKS identity, facts, contacts, imagery, credits, pricing, FAQs and policies only with supported project material. Do not carry facts or assets across clients.
5. Remove interactions that do not serve the real business. Do not introduce fake booking, payment, form success or data storage.
6. Run the website's build, browser and relevant quality checks. For a productized Starter delivery, use docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md as the technical acceptance reference when appropriate; it is not a project workflow engine or a substitute for real client permission/release authorization.

For studio_development, synthetic information is permitted only when clearly marked as internal test content. Never publish a development-mode site as a real business.

## Repository boundary

ai-operated-web-studio contains the Master Skill, specialist skills, selected quality references and reusable blueprints. It no longer contains a Laravel client/studio platform. Each real client website remains in its own isolated repository. Do not put client-specific facts, assets, credentials or approvals into shared blueprints.

## Verification and release boundary

The migrated Starter reference previously passed its 19-test Chromium suite and a responsive run across nine widths from 320px through 1440px. This is historical evidence for the tested source version, not proof that every future copy or current client project passes.

The reference is not certified for real-client production. Verify current business facts, asset rights, actual-scale screenshots, accessibility, live destination ownership, performance and commercial/operational readiness as applicable. A passing build or visual review is not production authorization.
