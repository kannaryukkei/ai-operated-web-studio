# AI Operated Web Studio

An AI-operated website production system that turns a normal client interview and existing client assets into a source-traceable brief, then orchestrates research, strategy, content, design, implementation and QA from one controlled workflow.

## Product vision

Clients explain their business once in a normal interview and provide existing assets and optional source links. AI handles the structuring and production work; the client is asked only for material clarifications, fact/asset approvals and final decisions. The studio uses reusable skills and prompts through existing AI applications for research, strategy, content, design, development and QA. The studio owner retains authority over commercial decisions, scope, factual claims and production release.

**AI Operated Web Studio is the single canonical production system.** The Laravel platform, production standards, prompts and versioned website blueprints live in this repository, with clear folder boundaries. Each real client website remains in its own isolated repository.

## Initial architecture

- **Backend:** Laravel 13 monolith.
- **Client and studio UI:** React + Inertia, TypeScript, Tailwind, shadcn/ui via the official Laravel React starter kit.
- **AI workflow:** API-free first. The platform prepares structured prompts and stores results produced in ChatGPT, Claude, or another external AI application. No provider API integration; the studio operates entirely free.
- **Workflow execution:** persisted project records and discovery runs; manual handoffs first, queues only when a proven bottleneck justifies them.
- **Database:** SQLite for local bootstrap; PostgreSQL target for production.
- **Files:** local storage in development; private object storage in production.
- **Website source:** separate GitHub repository per client website, created from versioned product blueprints.
- **Deployment:** manual/approval-gated in the MVP; provider integration later.

## Core product areas

1. Client portal — onboarding, business brief, package selection, project timeline, preview, revisions, approvals.
2. Studio dashboard — pipeline, project scope, AI runs, artifacts, approvals, cost visibility, exceptions.
3. AI orchestration — stage-specific agents, tools, structured outputs, persisted workflow state, retries, audit history.
4. Website production — active Starter blueprint and isolated client repositories; Business/Custom are parked tier definitions until Starter passes acceptance.
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
- `docs/PLATFORM_ALIGNMENT_SPECIFICATION_v1.0.md` — minimum Laravel alignment for internal-only intake, manual discovery and canonical workflow boundaries.
- `docs/security-and-approvals.md`
- `docs/roadmap.md`
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.12_CANDIDATE.md` — current Master Revision candidate orchestrator; owner adoption remains pending. v1.11 is preserved as the preceding candidate.
- `docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md` and `docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md` — root-cause classification, minimal correction and regression evidence.
- `docs/STARTER_CALIBRATION_RECORD_2026-11-15.md` — first applied Starter calibration record and CI evidence.
- `docs/STARTER_PRODUCTION_READINESS_AUDIT_2026-11-16.md` — gate-by-gate evidence-based Starter production readiness decision and closure plan.
- `docs/CANONICAL_OPERATING_WORKFLOW_v1.0.md`, `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`, `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md`, and `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md` — current stage, data, pre-design and G0–G7 contracts.
- `docs/CANONICAL_STATUS.md` — single pointer for what is current, the free operation rule, the minimal context set, and the open decisions. Read this first.
- Earlier Master Skill files (including v1.8 and v1.10) are retained as historical candidates, not current operating instructions.
- `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md` — default interview + asset intake and source-normalization workflow.
- `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md` — business-specific media planning, professional/free stock licensing and provider-terms checks, AI concept imagery, local media inbox, optimization and media QA.
- `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md` — API-free local image inbox: Save-to-Downloads handoff, automatic import, register capture and optional responsive WebP optimization.
- `docs/EXPERIMENT_03_SYSTEM_LEARNINGS.md` — reusable system findings from Experiment #3.

- `docs/EXPERIMENT_01_DESIGN_REVIEW_EVIDENCE.md` — supporting evidence for the v1.7 design-quality changes.
- `skills/README.md` — modular Agent Skills library and how to use it.
- `skills/registry.md` — skill routing, upstream provenance, license decisions and optional dependencies.
- `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md` — normalized AI-produced business brief; clients are not expected to complete it as a long questionnaire.
- `docs/WEBSITE_PRODUCT_TIERS_v1.2_CANDIDATE.md` — current proposed tier boundaries and Starter price hypothesis; v1.1 is superseded.
- `docs/WEBSITE_IMPLEMENTATION_STANDARD_v1.1_CANDIDATE.md` — current proposed design/implementation guardrails; v1.0 is superseded.
- `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` — required release and commercial gate.
- `docs/STARTER_AUTOMATED_QUALITY_GATE_v1.0.md` — automated typography, control, metadata and solid-surface contrast regression for the Starter reference.
- `docs/STARTER_CONTENT_EVIDENCE_GATE_v1.0.md` — evidence and publication gate for testimonials, ratings and business-performance claims.
- `docs/STARTER_CONTENT_EVIDENCE_CALIBRATION_2026-11-15.md` — applied record of removing simulated social proof from Starter.
- `docs/BLUEPRINT_MIGRATION_DECISION.md` — canonical blueprint locations, source provenance and repository retirement decision.
- `blueprints/starter/README.md` — how to use the migrated Starter reference.
- `blueprints/starter/KALA_PILOT_LEARNINGS.md` — best practices distilled from every KALA pilot branch.
- `AI_BUILD_RULES.md`

## Modular skill system

The Master Skill is the orchestrator; specialist instructions live under `skills/` as portable Agent Skills. `client-material-ingestion` is required at Stage 0; `media-sourcing-and-licensing` supports existing Stages 0, 5 and 7 without creating another Master stage. The current skill registry maps specialist activation to Master Skill Stages 0–9. The core workflow remains API-free and uses existing AI applications rather than paid model APIs.

## Product boundary

`ai-operated-web-studio` is the single source of truth for the studio's production system. Platform code lives under `platform/`; reusable website blueprints and delivery material live under `blueprints/`; operating standards, Master Skill and client brief live under `docs/`. Do not place website source inside `platform/`. Each real client website is copied from an appropriate blueprint into a separate private repository. The migrated Starter reference is under `blueprints/starter/` and is ZACKS-specific, not a universal site to deploy unchanged.

## Current delivery workflow

See `docs/manual-ai-workflow.md` and `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md` for the API-free material-first process. The current platform manages clients, projects, structured intake snapshots and discovery records. Raw interview files and supplied assets are currently kept in controlled project storage and handed to an external AI application manually; private multi-file ingestion is not yet implemented.

## Create a new experiment locally

Requires Node.js 20 or newer. The scaffold copies a committed snapshot from a selected repository-relative blueprint path inside `blueprints/`. Blueprint-specific staged, unstaged, deleted, renamed or non-ignored untracked changes prevent execution; unrelated worktree changes do not. ZACKS at `blueprints/starter/template-kit/starter` is an existing selectable reference only, not a universal or blank starter.

```bash
node scripts/scaffold-experiment.mjs \
  --name "Experiment 06 - Example" \
  --output "../web-studio-experiment-06-example" \
  --blueprint "blueprints/starter/template-kit/starter"
```

`--output` is the exact destination directory; missing parent directories are created. The result is a local directory only. The script does not run `git init`, create a GitHub repository, configure a remote, push files, publish, or deploy anything.
