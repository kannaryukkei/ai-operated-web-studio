# AI Operated Web Studio

An AI-powered website production platform that guides clients from onboarding to launch and orchestrates the internal studio workflow.

## Product vision

Clients should be able to enter a guided workspace, explain their business and goals, choose an appropriate website package, review project progress, provide feedback, and approve deliverables. AI agents perform the repeatable research, strategy, content, design, development, QA, documentation, and revision work. The studio owner retains authority over commercial decisions, scope, factual claims, and production release.

The platform is the production engine. Website templates and client deliverables remain separate from this application.

## Initial architecture

- **Backend:** Laravel 13 monolith.
- **Client and studio UI:** React + Inertia, TypeScript, Tailwind, shadcn/ui via the official Laravel React starter kit.
- **AI layer:** Laravel AI SDK, behind an application-owned provider/agent interface.
- **Workflow execution:** persisted workflow runs and steps, orchestrated through Laravel queued jobs and events.
- **Database:** SQLite for local bootstrap; PostgreSQL target for production.
- **Files:** local storage in development; private object storage in production.
- **Website source:** separate GitHub repository per client website, created from versioned product blueprints.
- **Deployment:** manual/approval-gated in the MVP; provider integration later.

## Core product areas

1. Client portal — onboarding, business brief, package selection, project timeline, preview, revisions, approvals.
2. Studio dashboard — pipeline, project scope, AI runs, artifacts, approvals, cost visibility, exceptions.
3. AI orchestration — stage-specific agents, tools, structured outputs, persisted workflow state, retries, audit history.
4. Website production — versioned Starter / Business / Custom blueprints and isolated client repositories.
5. Release and care — QA, launch approvals, handover, post-launch support and monitoring.

## Current status

Repository initialized with product, architecture, workflow, data model, security, and roadmap documents. The Laravel application scaffold has not yet been generated.

## Start here

- `docs/product-brief.md`
- `docs/architecture.md`
- `docs/mvp-specification.md`
- `docs/ai-orchestration.md`
- `docs/data-model.md`
- `docs/security-and-approvals.md`
- `docs/roadmap.md`
- `AI_BUILD_RULES.md`

## Product boundary

`web-studio-template-kit` remains the separate portfolio and website-blueprint repository. This repository owns the platform that coordinates production; it must not absorb the Starter, Business, or Custom demo websites into its application source.
