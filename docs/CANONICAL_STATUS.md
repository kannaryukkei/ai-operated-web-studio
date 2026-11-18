# Canonical Status

This file is the short pointer to the current operating rules. Do not treat every file under `docs/` as current authority.

## Current operating model — 2026-11-18

**Conversation-first is the canonical direction.** Each website project has one dedicated ChatGPT conversation as its single working centre for context, decisions, scope, priorities, execution, QA and next actions. The AI handles routine sequencing and technical decisions. The owner is involved only for missing facts/materials, account access, permissions, meaningful commercial/scope decisions, explicit approvals and consequential external actions.

**GitHub is a code and deliverable store, not a project manager.** Keep website source, relevant assets/deliverables and useful QA evidence in the relevant repository. Do not duplicate conversation operations in a dashboard, database, issue tracker, workflow inbox, project-state manifest, artifact registry or approval engine.

### Operating modes

- `client_service`: default for real or ambiguous client work. Real claims must be source-backed; rights, permissions and approvals must be genuine and explicit. No fabricated facts or social proof.
- `studio_development`: synthetic data and fictional scenarios are permitted when clearly labelled, for internal development/testing only. No public release, real outreach, spending, DNS changes or production deployment.
- Switching development work into real client service requires re-sourcing or independently verifying all synthetic facts, assets, permissions, contacts and proof. Privacy, security, licensing and authorization rules remain in force in both modes.

## Minimal context set

Read only these files first; open specialist references only when the actual task needs them:

1. `README.md`
2. `AI_BUILD_RULES.md`
3. `docs/CANONICAL_STATUS.md` (this file)
4. `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.13.md` (proposed in the conversation-first architecture PR; v1.12 remains the last adopted baseline until accepted)
5. `skills/README.md` and `skills/registry.md`
6. `blueprints/starter/README.md` when using the Starter reference

## Canonical and legacy materials

| Area | Current direction |
|---|---|
| Operating authority | Project-specific ChatGPT conversation + canonical Master Skill |
| Operating method | Conversation-first; lifecycle stages are adaptable guidance, not a mandatory state machine |
| Website source | One isolated GitHub repository per website |
| Website quality | Keep deterministic build, test, browser and quality checks that verify actual output |
| Studio modes | `client_service` and `studio_development` as defined above |
| Platform application | Legacy implementation under review for retirement; do not extend it as a workflow authority |
| Workflow/schema/approval documents | Reference standards only where a concrete factual, permission, safety or release question requires them; they do not create a duplicate workflow engine |

The existing `docs/CANONICAL_OPERATING_WORKFLOW_v1.0.md`, `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`, `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` and `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md` predate this model. Their useful safety and quality rules may be retained, but their mandatory artifact/stage machinery is not the operating model. They will be simplified or retired in a later cleanup tranche.

## Repository and experiment decisions

- `ai-operated-web-studio`: KEEP as the canonical home for reusable skills, standards and proven blueprints; simplify aggressively.
- `zacks-detailing`: KEEP as a real client/business website repository and category-specific reference.
- Experiment 01 and 02: RETIRE as duplicate system clones after checking for any unique user data; do not continue developing them.
- Experiment 03, 04 and 05: KEEP only their distinct website/QA evidence and reusable learnings; do not treat them as separate copies of the Studio system.
- Laundry Ceria / Experiment 06: KEEP as the internal synthetic development test case; never represent it as a real business or publish it as production.
- `web-studio-template-kit`: not present in the latest repository inventory visible during the 2026-11-18 audit; verify separately before any action.

These dispositions supersede the earlier 2026-11-17 blanket instruction to preserve all Experiment 01–05 repositories. No repository or branch is deleted by this policy-document change.

## Open architecture actions

- [x] Record conversation-first operating authority and the two modes in this PR.
- [ ] Review and retire the unmerged PR #47 workflow engine; preserve only the useful dual-mode safety rule and thin website-quality checks.
- [ ] Retire the Laravel platform/workflow application and all docs that exist only to specify it.
- [ ] Consolidate current specialist skills and remove superseded/duplicated operating documents.
- [ ] Retire duplicate Experiment 01 and 02 repositories after confirming no unique material is lost.
- [ ] Keep and finish the Experiment 06 synthetic website under `studio_development`.

