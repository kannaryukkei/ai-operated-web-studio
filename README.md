# AI Operated Web Studio

An AI-operated website delivery practice. Each website project is run from one dedicated ChatGPT conversation. The conversation is the working centre for context, scope, decisions, execution, QA and next actions; GitHub stores website source and useful deliverables.

## Operating model

- **One project, one conversation.** Do not split one website across parallel operating conversations or duplicate the work in a dashboard or issue tracker.
- **AI owns routine work.** The AI chooses normal design, engineering, tool and sequencing decisions. Involve the owner only for genuinely missing facts/materials, account access, rights/permissions, commercial or scope decisions, explicit approvals and consequential external actions.
- **GitHub stores the work, not the workflow.** Keep website code and useful delivery/QA outputs in the relevant website repository. Do not add a project-state manifest, artifact registry, workflow inbox, simulated approval engine or routine issue/PR handoff system.
- **Quality automation stays.** Build, lint, unit, browser, responsive and other quality checks may verify website output. CI must not orchestrate project stages or simulate human approvals.

## Two operating modes

Every project conversation states one mode:

1. **`client_service` — real client work.** Use source-backed facts, actual permissions and explicit approvals. Never invent business facts, prices, policies, contacts, credentials, testimonials, ratings, metrics, outcomes or customer proof.
2. **`studio_development` — internal development and experiments.** Clearly labelled synthetic businesses and test inputs are allowed to develop and test the complete Studio method. No public release, real outreach, spending, DNS change, production deployment or representation of a fictional business as real.

Default to `client_service` whenever the mode is absent or ambiguous. Moving development output into client service requires replacing or independently verifying all synthetic facts, assets, permissions, contacts and proof. Privacy, credential security, licensing and third-party rights apply in both modes.

## Start a project

1. Open one dedicated ChatGPT conversation for the website.
2. Declare `client_service` or `studio_development`.
3. Provide available interview material, assets and references; do not repeat information already supplied.
4. Let the AI determine routine sequencing and technical/design decisions.
5. Create or use one isolated website repository when code storage or review is needed. The owner may need to create it or grant access.
6. Run relevant website checks. Keep operational decisions in the conversation and store useful source/deliverables in GitHub.

## Canonical instructions

- `AI_BUILD_RULES.md` — concise rules for agents and contributors.
- `docs/CANONICAL_STATUS.md` — current decisions and references.
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.13.md` — adopted operating orchestrator (PR #49, merged 2026-11-18); v1.12 is preserved as the previous baseline.
- `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.14.md` — proposed design-strategy, reference-judgment and iterative visual-refinement update (PR #54); v1.13 remains canonical until this proposal is merged.
- `skills/README.md` and `skills/registry.md` — specialist skills and provenance.
- `skills/website-quality-review/SKILL.md` — consolidated quality review.
- `blueprints/starter/README.md` — Starter reference and usage boundaries.

## Supporting references

Open only when relevant: `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md`, Starter acceptance/evidence/automated quality gates, media sourcing/import guidance, the calibration protocol, visual refinement guide and blueprint migration provenance.

The Laravel platform was retired in merged PR #50. This repository is not a client portal, Studio dashboard, workflow database or AI API orchestration service.

## Development guardrail

Synthetic development work must remain unmistakably internal. Do not publish a development-mode website as a real business, represent synthetic results as customer proof, or allow mock data to enter a real-client release candidate.
