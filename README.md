# AI Operated Web Studio

An AI-powered website production platform that guides clients from onboarding to launch and orchestrates the internal studio workflow.

## Product vision

Clients enter a guided workspace, explain their business and goals, review project progress, provide feedback, and approve deliverables. The studio uses reusable AI skills and prompts through external AI applications for repeatable research, strategy, content, design, development, and QA. The studio owner retains authority over commercial decisions, scope, factual claims, and production release.

The platform is the production engine. Website templates and client deliverables remain separate from this application.

## Initial architecture

- **Backend:** Laravel 13 monolith.
- **Client and studio UI:** React + Inertia, TypeScript, Tailwind, shadcn/ui via the official Laravel React starter kit.
- **AI workflow:** API-free first. The platform prepares structured prompts and stores results produced in ChatGPT, Claude, or another external AI application. Provider API integration is optional later.
- **Workflow execution:** persisted project records and discovery runs; manual handoffs first, queues only when a proven bottleneck justifies them.
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

Laravel 13 platform foundation, client/project management, invitation-based access, versioned client intake, persisted discovery runs, and the API-free manual discovery workspace are implemented. The current product is an AI-assisted web studio operating system, not a fully autonomous AI SaaS.

## Start here

- `docs/local-bootstrap.md` — local environment setup and maintenance.
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

## Current delivery workflow

See `docs/manual-ai-workflow.md` for the API-free operating model. The platform manages clients, projects, intake snapshots, and discovery records; external AI applications handle the model work until paid API automation is justified.
