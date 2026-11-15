# AI Operated Web Studio

An AI-operated website production system that turns a normal client interview and existing client assets into a source-traceable brief, then orchestrates research, strategy, content, design, implementation and QA from one controlled workflow.

## Product vision

Clients explain their business once in a normal interview and provide existing assets and optional source links. AI handles the structuring and production work; the client is asked only for material clarifications, fact/asset approvals and final decisions. The studio uses reusable skills and prompts through existing AI applications for research, strategy, content, design, development and QA. The studio owner retains authority over commercial decisions, scope, factual claims and production release.

**AI Operated Web Studio is the single canonical production system.** The Laravel platform, production standards, prompts and versioned website blueprints live in this repository, with clear folder boundaries. Each real client website remains in its own isolated repository.

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
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.9_CANDIDATE.md` — proposed material-first orchestrator with design differentiation and independent QA gates.
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.8_CANDIDATE.md` — preserved historical candidate containing the design-differentiation gate.
- `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md` — default interview + asset intake and source-normalization workflow.
- `docs/EXPERIMENT_03_SYSTEM_LEARNINGS.md` — reusable system findings from Experiment #3.
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.6_CANDIDATE.md` — preserved historical candidate.
- `docs/EXPERIMENT_01_DESIGN_REVIEW_EVIDENCE.md` — supporting evidence for the v1.7 design-quality changes.
- `skills/README.md` — modular Agent Skills library and how to use it.
- `skills/registry.md` — skill routing, upstream provenance, license decisions and optional dependencies.
- `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md` — normalized AI-produced business brief; clients are not expected to complete it as a long questionnaire.
- `docs/WEBSITE_PRODUCT_TIERS_v1.1.md` — Starter / Business / Custom scope and Starter price boundary.
- `docs/WEBSITE_IMPLEMENTATION_STANDARD_v1.0.md` — design, implementation and technical guardrails.
- `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` — required release and commercial gate.
- `docs/BLUEPRINT_MIGRATION_DECISION.md` — canonical blueprint locations, source provenance and repository retirement decision.
- `blueprints/starter/README.md` — how to use the migrated Starter reference.
- `blueprints/starter/KALA_PILOT_LEARNINGS.md` — best practices distilled from every KALA pilot branch.
- `AI_BUILD_RULES.md`

## Modular skill system

The Master Skill is the orchestrator; specialist instructions live under `skills/` as portable Agent Skills. `client-material-ingestion` is required at Stage 0; other specialists are activated only when relevant. The core workflow remains API-free and uses existing AI applications rather than paid model APIs.

## Product boundary

`ai-operated-web-studio` is the single source of truth for the studio's production system. Platform code lives under `platform/`; reusable website blueprints and delivery material live under `blueprints/`; operating standards, Master Skill and client brief live under `docs/`. Do not place website source inside `platform/`. Each real client website is copied from an appropriate blueprint into a separate private repository. The migrated Starter reference is under `blueprints/starter/` and is ZACKS-specific, not a universal site to deploy unchanged.

## Current delivery workflow

See `docs/manual-ai-workflow.md` and `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md` for the API-free material-first process. The current platform manages clients, projects, structured intake snapshots and discovery records. Raw interview files and supplied assets are currently kept in controlled project storage and handed to an external AI application manually; private multi-file ingestion is not yet implemented.
