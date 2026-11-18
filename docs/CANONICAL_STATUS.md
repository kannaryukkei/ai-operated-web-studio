# Canonical Status

This is the short pointer to the current Studio rules. It is not a project tracker; the active website conversation owns project-specific decisions and next actions.

## Current operating model — 2026-11-18

**Conversation-first.** Each website project has one dedicated ChatGPT conversation as its working centre for context, source material, scope, decisions, implementation, QA and next actions. The AI owns routine design, engineering, tool and sequencing decisions. The owner is involved only for missing facts/materials, access, rights/permissions, meaningful commercial/scope decisions, explicit approvals and consequential external actions.

**GitHub stores code and useful deliverables, not project state.** Do not duplicate the conversation in dashboards, databases, issue trackers, workflow inboxes, project-state manifests, artifact registries or approval engines. Keep code isolation, PR review and real website-quality checks.

## Operating modes

- `client_service`: default for real or ambiguous client work. Claims and facts must be supported by real sources; rights, permissions and approvals must be genuine. No fabricated client facts or social proof.
- `studio_development`: clearly labelled synthetic inputs and fictional scenarios are permitted for internal development and tests. No public release, real outreach, spending, DNS change or production deployment.
- Switching into client service requires replacing or independently verifying all synthetic facts, assets, permissions, contacts, pricing and proof. Privacy, security, licensing and third-party rights apply in both modes.

## Minimal context set

Read only these first; open a specialist skill or supporting reference when the task needs it:

1. `README.md`
2. `AI_BUILD_RULES.md`
3. `docs/CANONICAL_STATUS.md` (this file)
4. `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.13.md` (adopted via merged PR #49; v1.12 remains preserved as the previous baseline)
5. `skills/README.md` and `skills/registry.md`
6. `blueprints/starter/README.md` when using the Starter reference

## Active skills

- Material intake: `skills/client-material-ingestion/SKILL.md`
- UX: `skills/ux-review/SKILL.md`
- Art direction: `skills/frontend-design/SKILL.md`
- Typography: `skills/typography-and-legibility/SKILL.md`
- Reference-to-code specification: `skills/design-screenshot-spec/SKILL.md`
- Implementation: `skills/frontend-layout-implementer/SKILL.md`
- Consolidated review: `skills/website-quality-review/SKILL.md`
- Media rights and optimization: `skills/media-sourcing-and-licensing/SKILL.md`

Activate only the methods the current task needs. The consolidated review has separate AESTHETIC, VISUAL_FIDELITY, INTERFACE and ACCEPTANCE modes.

## Supporting references

These are optional, task-specific aids, not a mandatory artifact package:
- Client brief: `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md`
- Starter technical/product quality: `docs/STARTER_AUTOMATED_QUALITY_GATE_v1.0.md`, `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md`, `docs/STARTER_CONTENT_EVIDENCE_GATE_v1.0.md`
- Media: `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md`, `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`
- Improvement: `docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md`, `docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md`
- Visual refinement: `docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md`
- Blueprint provenance and cross-pilot learning: `docs/BLUEPRINT_MIGRATION_DECISION.md`, `docs/EXPERIMENT_03_SYSTEM_LEARNINGS.md`, `blueprints/starter/KALA_PILOT_LEARNINGS.md`

## Architecture retirement

- PR #49: MERGED. Conversation-first and two-mode operating model adopted.
- PR #47: CLOSED WITHOUT MERGE. Repository-native workflow engine is rejected. Its old source branch remains as historical residue because the connected GitHub actions cannot delete a branch.
- PR #50: MERGED. Laravel platform, project dashboard/workspace application and platform-only docs were removed from the active tree. No `platform/` directory remains. The source remains in Git history.
- PR #51 (this cleanup): PENDING. Removes obsolete workflow/schema/approval documents and superseded skill versions, and consolidates four reviewer skills into one.

## Repository and experiment decisions

- `ai-operated-web-studio`: KEEP as the canonical home for Master Skill, specialist skills, useful standards and proven blueprints; no dashboard/platform.
- `zacks-detailing`: KEEP as real business/site source and local-service reference.
- Experiment 01 and 02: RETIRE as duplicate clones after checking that no unique work or user data is lost.
- Experiment 03, 04 and 05: KEEP for distinct website, QA evidence and reusable learning; do not use them as copies of Studio operations.
- Laundry Ceria / Experiment 06: KEEP as the internal synthetic test website under `studio_development`; never present it as a real business or deploy it publicly.
- `web-studio-template-kit`: not present in the latest repository inventory visible during the 2026-11-18 audit; verify separately before any action.

The new dispositions supersede the 2026-11-17 blanket preserve-all decision for Experiment 01–05. Repository deletion/retirement is a separate operation from documentation cleanup.

## Next cleanup

- [x] Conversation-first two-mode policy adopted in PR #49.
- [x] PR #47 closed without merge.
- [x] Laravel platform retired in PR #50.
- [ ] Merge PR #51 skill/documentation cleanup.
- [ ] Verify and retire duplicate Experiment 01 and 02 repositories.
- [ ] Finish Experiment 06 as a controlled internal `studio_development` test.
