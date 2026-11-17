# AI Operated Web Studio

An AI-operated website production system that turns a normal client interview and existing client assets into a source-traceable brief, then orchestrates research, strategy, content, design, implementation and QA from one controlled workflow.

## Product vision

Clients explain their business once in a normal interview and provide existing assets and optional source links. AI handles the structuring and production work; the client is asked only for material clarifications, fact/asset approvals and final decisions. The studio uses reusable skills and prompts through existing AI applications for research, strategy, content, design, development and QA. The studio owner retains authority over commercial decisions, scope, factual claims and production release.

**AI Operated Web Studio is the single canonical production system.** Its executable workflow contract, validators, operating standards, prompts, skills and versioned website blueprints live in this repository. The Laravel application is a preserved prototype only. Each real client website remains in its own isolated repository.

## Initial architecture

- **Primary operating interface:** one ChatGPT standard conversation with GitHub as the default repository interface. Codex, Antigravity, Muse and other agents remain optional.
- **Workflow runtime:** repository-native machine-readable Stage 0–9 contract, Node.js built-in validators and GitHub Actions. No model API, API key, Laravel runtime or vendor-specific hooks are required.
- **Project state and artifacts:** versioned in each isolated client project repository; stage status is derived from artifact integrity, dependencies and approval evidence.
- **Laravel:** preserved as an existing platform prototype under `platform/`; it is not a required production workflow dependency and is not deleted by this decision.
- **Website source:** separate GitHub repository per client website, created from versioned product blueprints.
- **Deployment:** manual and approval-gated; production release remains explicitly human-authorized.

## Core product areas

1. Conversation-first operation — one AI conversation is the default user interface; no dashboard is required to operate a project.
2. Workflow enforcement — repository contract, validated artifacts, derived stage state, G0–G7 approval evidence and CI.
3. Agent-neutral AI production — ChatGPT + GitHub by default; Codex, Antigravity, Muse and other agents are optional.
4. Website production — active Starter blueprint and isolated client repositories; Business/Custom remain parked until Starter passes acceptance.
5. Release and care — independent QA, explicit release authorization, handover and post-launch support.

## Current status

The repository-native workflow enforcement foundation is being implemented in focused, reviewable tranches. It defines Stage 0–9, 54 artifact contracts and G0–G7 in a machine-readable, API-free contract. A Node.js validator derives project stage status from artifact files, checksums, dependencies and approvals. The existing Laravel client/project and discovery platform is preserved as a prototype, not a required runtime. This is not a fully autonomous AI SaaS; the default workflow remains one conversation with human-controlled approvals.

## Start here

- `AGENTS.md` — portable instructions for any AI agent using this repository.
- `.studio/README.md` and `docs/REPO_NATIVE_WORKFLOW_ENFORCEMENT_v1.0.md` — executable contract, project state, artifact hashes, approvals, CLI and enforcement limitations.
- `docs/architecture-decisions/ADR-003-repository-native-agent-neutral-workflow.md` — current architecture decision; ADR-002 remains historical for the Laravel prototype.

- `docs/local-bootstrap.md` — local environment setup and maintenance.
- `docs/product-brief.md`
- `docs/architecture.md`
- `docs/mvp-specification.md`
- `docs/ai-orchestration.md`
- `docs/data-model.md`
- `docs/PLATFORM_ALIGNMENT_SPECIFICATION_v1.0.md` — minimum Laravel alignment for internal-only intake, manual discovery and canonical workflow boundaries.
- `docs/security-and-approvals.md`
- `docs/roadmap.md`
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.12.md` — adopted canonical Master Skill operating orchestrator for Stages 0–9 (Studio owner decision, 2026-11-18). v1.11 is preserved as the preceding candidate.
- `docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md` and `docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md` — root-cause classification, minimal correction and regression evidence.
- `docs/STARTER_CALIBRATION_RECORD_2026-11-15.md` — first applied Starter calibration record and CI evidence.
- `docs/STARTER_PRODUCTION_READINESS_AUDIT_2026-11-16.md` — gate-by-gate evidence-based Starter production readiness decision and closure plan.
- `docs/CANONICAL_OPERATING_WORKFLOW_v1.0.md`, `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`, `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md`, and `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md` — current stage, data, pre-design and G0–G7 contracts.
- `docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md` — required Stage 6 screenshot-led audit, targeted refinement, bounded correction and re-verification procedure.
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

The machine-readable workflow contract and validators govern stage state and gate progression; the Master Skill orchestrates conversational work, while specialist instructions live under `skills/` as portable Agent Skills. `client-material-ingestion` is required at Stage 0; `media-sourcing-and-licensing` supports existing Stages 0, 5 and 7 without creating another Master stage. The current skill registry maps specialist activation to Master Skill Stages 0–9. The core workflow remains API-free and uses existing AI applications rather than paid model APIs.

## Product boundary

`ai-operated-web-studio` is the single source of truth for the studio's production system. The canonical workflow runtime lives under `.studio/` and `scripts/`; `platform/` is a preserved, non-required prototype; reusable website blueprints and delivery material live under `blueprints/`; operating standards, Master Skill and client brief live under `docs/`. Do not place website source inside `platform/`. Each real client website is copied from an appropriate blueprint into a separate private repository. The migrated Starter reference is under `blueprints/starter/` and is ZACKS-specific, not a universal site to deploy unchanged.

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
