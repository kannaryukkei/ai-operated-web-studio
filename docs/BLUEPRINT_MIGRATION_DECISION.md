# Blueprint Migration — Provenance Record

**Migration date:** 2026-11-14  
**Source:** `kannaryukkei/web-studio-template-kit`, branch `starter/five-website-audit-and-hardening`, commit `6ba68cbdba1c3a30f932a2eba998dd93b42a4a2f`  
**Destination:** `kannaryukkei/ai-operated-web-studio`, under `blueprints/starter/template-kit/`

## What was migrated

The source snapshot included the Starter React/Vite website, CSS/content/assets, Playwright tests, Vite configuration, workflow, technical/product notes, source audits, copywriting examples, responsive QA evidence, operating prompts, project templates and an intake issue form.

The source-tree comparison at migration time reported **51/51 files matched exactly**, with no missing/extra paths or content differences. The migrated Starter clean install, production build and Playwright suite passed at that historical commit.

## Current repository boundary

The AI Operated Web Studio repository is now the canonical home for Master Skill v1.13, specialist skills, selected quality references and reusable blueprints. The Laravel platform was retired from the active tree by merged PR #50 on 2026-11-18. There is no Studio dashboard, client portal, project-state database or workflow engine.

Each website is operated from one dedicated project conversation. GitHub stores the website source and useful deliverables in a separate repository.

## Starter reference contents retained

The nested Starter reference retains the actual website source and useful technical/evidence material, including:

- React/Vite website implementation and its build/test configuration.
- Technical architecture/product notes that remain useful for understanding the source.
- Extraction/source audits, five-website audit and responsive QA evidence.
- Competitive copywriting patterns and selected pilot learnings.
- Optional media/asset/section helpers under `templates/starter-client/02-content/`.

The Starter site is a ZACKS Detailing local-service reference, not a universal blank website. Do not copy its identity, facts, price, contact endpoints, photos, proof or automotive-specific interactions into another client project.

## Retired material

As part of the conversation-first architecture adopted in PR #49, the following duplicated operating material was removed from the active Starter reference:

- Stage 0–9 orchestrator and individual stage prompts.
- GitHub issue intake form and project-board template.
- Project dashboard, approval/change logs, tier/scope/design approvals and stage-specific implementation/QA/release/retrospective forms.
- Starter delivery playbook, delivery-template guide, operations blueprint and production-kit instructions.

These materials duplicated the project conversation with a second workflow and mandatory artifact layer. Their removal does not delete the website source or its Git history. Only optional content/media helpers remain where they solve a specific asset or section-planning need.

## Historical verification limits

The migrated Starter reference previously passed a 19-test Chromium suite and a responsive run across nine widths from 320px through 1440px. That is historical evidence for the tested source version, not proof that every future copy or client project passes.

It does not establish current accessibility, performance, cross-browser compatibility, real-world conversion, client facts/rights or commercial readiness. Test each delivered website against its actual scope, operating mode and release target.
