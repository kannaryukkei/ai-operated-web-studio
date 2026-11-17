# Canonical Status
Single pointer for what is current. If a document is not listed as
Current or Candidate here, do not treat it as an operating instruction.
## Free operation rule
The canonical workflow must not require model API keys, paid model APIs, or a paid AI-provider integration. The default is ChatGPT standard conversation + GitHub; other AI agents remain optional. Keep the core workflow compatible with free-tier tools and local validators. Third-party free-plan limits, storage and Actions allowances can change; never promise unlimited use, incur paid costs, or add paid dependencies without explicit owner approval.
## Minimal Context Set: read these first
AI working on this repo reads only these files first, then task-specific
docs only when the task needs them. Do not read all of docs/.
1. README.md
2. AGENTS.md
3. AI_BUILD_RULES.md
4. docs/CANONICAL_STATUS.md (this file)
5. .studio/README.md
6. .studio/workflow.contract.json
7. docs/REPO_NATIVE_WORKFLOW_ENFORCEMENT_v1.0.md
8. docs/CANONICAL_OPERATING_WORKFLOW_v1.0.md
9. docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md
10. docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.12.md (adopted canonical Master Skill, 2026-11-18)
11. blueprints/starter/README.md
## Status table
| Family | Current / Candidate | Superseded / Historical |
|---|---|---|
| Master Skill | v1.12 ADOPTED by Studio owner on 2026-11-18; canonical authority for Stages 0–9. | v1.11 preceding candidate, preserved; v1.3 to v1.10 historical candidates |
| Product tiers | v1.2 CANDIDATE, current proposal | v1.0, v1.1 superseded |
| Implementation standard | v1.1 CANDIDATE, current proposal | v1.0 superseded |
| Client brief template | v2.1, current | v1.1, v2.0 historical |
| Starter acceptance gate | v1.1, required | v1.0 superseded |
| Starter stack | React 18 + Vite 6 selected by owner on 2026-11-17; static-first. ZACKS remains the category-specific reference, not a universal blank site. | Vanilla HTML/CSS/JavaScript in Experiment 04 remains experimental evidence, not the selected canonical Starter stack |
| Starter blueprints | `blueprints/starter/blank/` is the neutral default starting point for new client projects. `blueprints/starter/template-kit/starter/` remains the separate ZACKS-specific reference implementation. | None |
| Operating contracts | CANONICAL_OPERATING_WORKFLOW v1.0, CANONICAL_DISCOVERY_DATA_SCHEMA v1.0, WEBSITE_REQUIREMENTS_PACK v1.0, APPROVAL_AND_RELEASE_POLICY v1.0 | None |
| Intake | CLIENT_MATERIAL_INGESTION_PROTOCOL v1.0, current | None |
| Starter gates | STARTER_AUTOMATED_QUALITY_GATE v1.0, STARTER_CONTENT_EVIDENCE_GATE v1.0 | None |
| Calibration | MASTER_SKILL_CALIBRATION_PROTOCOL v1.0, EXPERIMENT_CALIBRATION_RECORD_TEMPLATE v1.0 | Calibration records dated 2026-11-15 and 2026-11-16 are point-in-time evidence, not living specs |
| Media pipeline | MEDIA_AND_ASSET_PIPELINE v1.0 and MEDIA_IMPORT_AUTOMATION v1.0 are candidates for Starter; local media inbox + specialist skill integrated by PR #17 (2026-11-16, commit `533854c`) | None |
| Experiment 05 calibration | `docs/pilot-learnings/EXPERIMENT_05_STARPOINT_GARAGE_CALIBRATION_2026-11-16.md` — preliminary standalone baseline finding | NOT YET PROVEN; not yet an operating rule |
| Workflow runtime | `.studio/workflow.contract.json`, `scripts/workflow-enforcement.mjs`, `.studio/project-state.schema.json`, `AGENTS.md`, `docs/REPO_NATIVE_WORKFLOW_ENFORCEMENT_v1.0.md`; repository-native, agent-neutral and API-free. | None
| Architecture decisions | ADR-003 accepted for repository-native workflow. ADR-002 superseded as canonical runtime decision and retained as Laravel prototype history. | ADR-002 original Laravel queue architecture
| Platform baseline | `platform/` Laravel application is a preserved prototype, not a required workflow runtime. | Laravel as mandatory workflow authority |
| Skills | skills/README.md, skills/registry.md | None |
| Decisions and learnings | BLUEPRINT_MIGRATION_DECISION (provenance reference) | FOUR_PILOT_RETROSPECTIVE, EXPERIMENT_03_SYSTEM_LEARNINGS, RESTRUCTURE_EXECUTION_PLAN, MASTER_REVISION_EXECUTION_LOG: records, not operating instructions |
## Experiment repositories

Canonical system: `kannaryukkei/ai-operated-web-studio`, `main` branch.

**Owner decision — 2026-11-17: Experiment repositories 01–05 remain active. No experiment repository is approved for archiving or deletion at this time.**

The owner may reconsider retirement only after an evidence-based review confirms that the relevant learning and useful artifacts have been fully integrated into the canonical Studio workflow, followed by a separate explicit decision. Until then, preserve all five experiment repositories and their histories.

- Experiment 01 and 02 are full clones of the Studio repository. Do not edit them and do not copy their `docs/` or `platform/` content into the canonical repository. They remain available for historical inspection.
- Experiment 03 work lives on its experiment branch.
- Experiment 04 folder pattern (01 to 08) is the reference pattern for new experiments. Its Vanilla implementation remains experimental evidence, not the selected canonical Starter stack.
- Experiment 05 is in progress. Its current Star Point website is a local standalone preview, not a committed experiment website or a full Master/Starter workflow run. Its calibration remains NOT YET PROVEN.
- New experiments contain only artifacts plus the Master baseline commit SHA. Never copy `platform/` or `docs/` into an experiment repo.

## Owner decisions and follow-up work

- [x] Adopt Master Skill v1.12 as canonical operating authority (Studio owner decision, 2026-11-18; implementation tracked by dedicated PR).
- [x] Select React 18 + Vite 6 as the canonical Starter stack (owner decision, 2026-11-17).
- [x] Select API-free, conversation-first, repository-native workflow; ChatGPT + GitHub default and other agents optional (owner direction, 2026-11-18; implementation in progress on `feat/repo-native-workflow-enforcement`).
- [ ] Complete P0 repository-native enforcement, adversarial CI and cross-agent handoff contract.
- [x] Keep Experiment 01–05 repositories active; no archive or deletion authorized (owner decision, 2026-11-17).
- [x] Integrate PR #17 (Starter media pipeline): merged 2026-11-16 as commit `533854c`.
- [ ] Run Experiment 05 through the full Studio/Starter workflow before promoting its conditional offer-variant pattern.
