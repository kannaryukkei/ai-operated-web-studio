# Starter Production Kit

Practical workspace and control system for client Starter projects.

## Workspace structure

Copy `templates/starter-client/` into a private project folder/repository:

```text
client-[business-slug]-starter/
  00-project-control/   dashboard, approvals, changes
  01-discovery/         discovery brief
  02-content/           content register, section map
  03-scope/             approved deliverables/commercials
  04-design/            art direction and approval
  05-production/        implementation notes
  06-qa/                QA evidence and defects
  07-launch/            release and handover
  08-retrospective/     economics and lessons
```

Keep credentials out of the repository. Large assets may live in an agreed private asset location; link them from the register.

## Status workflow

`NEW → QUALIFIED → DISCOVERY → PROPOSAL → WAITING FOR PAYMENT → ACTIVE → CONTENT & ART DIRECTION → BUILD → INTERNAL QA → CLIENT REVIEW → READY TO LAUNCH → LIVE → HANDOVER → CARE / CLOSED`

Every task records owner (AI/Studio/Client), input, output, dependency, target date, approval requirement, and artifact link. Import `templates/project-board-template.csv` into GitHub Projects or a spreadsheet.

## AI operating loop

1. Read dashboard and approved scope.
2. Identify next task with completed dependencies.
3. Read only the necessary files.
4. Use the matching prompt in `prompts/starter/`.
5. Create the requested artifact or working branch.
6. Run relevant validation.
7. Update dashboard with output, risks, tests, and next action.
8. Stop at the approval gate; continue only after approval is recorded.

Missing information becomes `NEEDS_INPUT`; proposed assumptions must be clearly labelled.

## Explicit approval protocol

- `APPROVE G1 — SCOPE & COMMERCIALS`
- `APPROVE G2 — BUSINESS FACTS`
- `APPROVE G3 — CONTENT & VISUAL DIRECTION`
- `APPROVE G4 — STAGING`
- `APPROVE G5 — PRODUCTION RELEASE`
- `APPROVE G6 — HANDOVER`

Record approver, timestamp, artifact version, conditions, and evidence. Silence is not approval.

## Automation boundary

**Live now:** GitHub Actions build and Playwright browser smoke tests.

**Templates only:** new workspace creation, lead ingestion, AI-triggered stage execution, notifications, proposal/invoice automation, approval capture, production deployment, and monitoring. Do not describe these as automated until integrated and tested.

## Repository policy

One private workspace per client unless a documented alternative is chosen. Keep this template kit as master. Use branches/PRs for material changes. Keep client data/assets isolated. Make deployments reproducible. Never expose credentials or private customer records.
