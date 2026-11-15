# Starter Production Kit

Practical workspace and control system for client Starter projects. This kit supports the canonical workflow in Master Skill v1.11; it does not create a separate competing stage system.

## Workspace structure

Copy `templates/starter-client/` into a private project folder/repository:

```text
client-[business-slug]-starter/
  00-project-control/   dashboard, approvals, changes
  01-discovery/         source, facts, assets, brief
  02-content/           questions, IA, copy and content/asset map
  03-scope/             approved WRP, deliverables and commercials
  04-design/            art direction, visual spec and approval
  05-production/        implementation notes, checkpoints and source
  06-qa/                QA, screenshots, tests and acceptance
  07-launch/            release, production verification and handover
  08-retrospective/     calibration and learning
```

Keep the approval register, current WRP, canonical discovery records and current release candidate versioned. Do not use chat history as the only project record. Do not store secrets in the repository.

## Canonical AI operating loop

1. Read the latest approved Master Skill v1.11 candidate, project dashboard, WRP, scope, canonical records and approval register.
2. Identify Master Skill Stage 0–9, the next bounded work unit, prerequisites and gate.
3. Select the minimum useful specialist skill and matching prompt from `prompts/starter/`.
4. Confirm the relevant gate before design, code, preview, production release or handover.
5. Execute one verifiable slice; inspect changed files and run the cheapest relevant check.
6. Capture screenshots/tests/evidence only when actually performed; record NOT_TESTED otherwise.
7. Save artifact versions, issues, approval decisions and a resumable branch/commit checkpoint.
8. Stop at the next approval gate. Silence, passing tests and AI recommendations are not approval.

## Approval protocol — G0 through G7

- **G0 — Discovery facts, claims and assets:** client confirms material facts, public destinations, rights/consent; operator records source-backed decisions; owner controls publication policy.
- **G1 — Tier, scope and commercial:** Studio owner approves tier, price, margin, timeline, exclusions and changes; client agrees to the exact offer.
- **G2 — WRP approval for design:** operator verifies traceability/feasibility; owner approves progression; required client confirmations are recorded; WRP status is `APPROVED_FOR_DESIGN`.
- **G3 — Content, claims and visual direction:** exact versioned customer-facing content and visual direction are checked and confirmed/approved by the authorized roles.
- **G4 — Preview acceptance:** record PREVIEW_ACCEPTED or CHANGES_REQUESTED against exact preview/version.
- **G5 — Production readiness:** acceptance evidence and client/owner confirmations pass; no production blocker remains.
- **G6 — Production release authorization:** owner explicitly authorizes exact release candidate and external actions; mark RELEASED only after production verification.
- **G7 — Handover and closure:** record client receipt, access/ownership confirmation, costs, limitations and support boundaries.

Each approval record includes project/gate/approval type, subject, artifact and version, requested/deciding authority, decision/time, evidence and conditions. See `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md`.

## Status board

Use one simple board for commercial and delivery visibility (for example: LEAD → QUALIFIED → PROPOSAL → WAITING FOR PAYMENT → ACTIVE → BUILD → INTERNAL QA → CLIENT PREVIEW → PRODUCTION READY → RELEASED → HANDED OVER → CARE/CLOSED). The board is a summary, not the canonical Master Skill stage or approval record. Track next action, owner, due date/dependency, current artifact, gate and evidence.

Import `templates/project-board-template.csv` into GitHub Projects or a spreadsheet only when useful. Avoid creating a separate project-management system before the first few projects prove the need.

## Automation boundary

**Templates / manual workflow only unless implemented and tested:** workspace creation, lead ingestion, AI-triggered stage execution, notifications, proposal/invoice automation, approval capture, production deployment and monitoring. Do not describe these as automated until integrated and tested. No paid API, API key, MCP server or external hosted AI service is required for the core workflow.

## Repository policy

- Use a private client repository unless the client has explicitly approved a public portfolio release.
- Keep production secrets, private client data and credentials out of public source and ordinary project notes.
- Record the exact source commit and deployment target.
- Keep the client as domain/account owner wherever practical; never transfer ownership or change DNS without explicit authorization.
- Preserve prior approvals and releases as versioned history; do not overwrite evidence.
