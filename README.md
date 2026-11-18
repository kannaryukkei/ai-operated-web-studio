# AI Operated Web Studio

An AI-operated website delivery practice. Each website project is run from one dedicated ChatGPT conversation; GitHub stores the website source and the useful project outputs. The operating model is intentionally conversation-first, not dashboard-first.

## Operating model

- **One project, one conversation.** The conversation is the working centre for that website: context, scope, decisions, priorities, execution, QA, blockers and next actions stay together.
- **AI operates; the owner intervenes where it matters.** The AI chooses routine design, engineering, tool and sequencing decisions. Ask the owner only for facts or materials that are missing, access/credentials, rights or permissions, commercial/scope decisions, explicit approvals, and consequential external actions.
- **GitHub stores the work, not the workflow.** A website repository holds its code and relevant deliverables. Do not use GitHub issues, project-state manifests, artifact registries, inbox workflows or approval state machines as a second project manager.
- **Quality automation stays.** Build, test, lint, browser and relevant quality checks may verify website output. CI must not orchestrate project stages or simulate human approvals.

## Two operating modes

Every project conversation uses one explicit mode:

1. **`client_service` — real client work.** Use source-backed business facts, actual client materials, documented rights/permissions and explicit approvals. Never invent client facts, social proof, prices, credentials, policies, outcomes or customer evidence.
2. **`studio_development` — internal system development and experiments.** Fictional businesses, synthetic inputs and simulated scenarios are allowed when clearly labelled as synthetic. This mode is for building and testing the complete Studio process; it does not authorize real client claims, public release, real outreach, spending, DNS changes or production deployment.

Default to `client_service` whenever the mode is not explicit or the work could affect a real client. Moving work from `studio_development` to `client_service` requires replacing or independently validating every synthetic fact, asset, permission, contact, price and proof item. Development mode never relaxes privacy, credential security, licensing or authorization requirements.

## Repository boundaries

- This repository contains the canonical Master Skill, concise build rules, reusable specialist skills, proven blueprints and selected operating references.
- Each website has its own repository. Keep client code and materials isolated.
- The Studio repository is not a client portal, project-management application, workflow database or AI API orchestration service.
- Do not add a platform, dashboard, database, stage engine, mandatory artifact catalogue or integration merely because it is technically possible. Add a capability only when an observed delivery problem proves it is necessary and the owner approves the change.

## Start a project

1. Open one dedicated ChatGPT conversation for the website.
2. Select `client_service` or `studio_development`; use `client_service` by default.
3. Provide the available brief, interview material, assets and references. Do not make the owner re-enter information already present.
4. The AI determines the work sequence, makes routine implementation decisions and asks only for genuine owner/client inputs or authorizations.
5. Create or use one isolated GitHub repository for the website when code storage or review is needed. The owner may need to create the repository or grant access.
6. Run the checks that matter for the actual site. Store the source and useful delivery/QA outputs in GitHub; keep operational decisions in the project conversation.

## Canonical instructions

- `AI_BUILD_RULES.md` — concise contributor and agent rules.
- `docs/CANONICAL_STATUS.md` — current pointers and decisions.
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.13.md` — adopted conversation-first operating orchestrator (PR #49, merged 2026-11-18); v1.12 is preserved as the previous baseline.
- `skills/README.md` and `skills/registry.md` — specialist skill library and routing.
- `blueprints/starter/README.md` — Starter reference and usage limits.

Older workflow, platform and approval documents are reference material only where they do not conflict with the conversation-first model above. They must not be treated as a second operating authority.

## Development guardrail

Synthetic development work must remain unmistakably internal. Do not publish a development-mode website as a real business, represent synthetic results as customer proof, or allow mock data to enter a real-client release candidate.
