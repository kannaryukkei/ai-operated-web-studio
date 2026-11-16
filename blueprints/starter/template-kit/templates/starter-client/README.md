# Starter Client Workspace Template

This is an **internal studio workspace**, not a client questionnaire. Duplicate it only after a project is accepted into the Starter workflow. The client normally provides one discovery interview plus existing assets and optional references; AI/operator creates the Client Website Brief and canonical discovery records.

## Setup

1. Duplicate this folder as `client-[business-slug]-starter` in a private project workspace/repository.
2. Create the project record and fill `00-project-control/project-dashboard.md`.
3. Store raw interview/material packets in access-controlled storage and link them from the Source Register.
4. Run Master Skill Stage 0–9 using `prompts/starter/00-orchestrator.md` and the matching stage prompt.
5. Maintain the versioned WRP, canonical IDs, G0–G7 approval register, implementation checkpoints and QA/release evidence.
6. Keep Business/Custom implementation parked until Starter passes its acceptance gate and the Studio owner reprioritizes.

## Folder contract

- `00-project-control/`: dashboard, G0–G7 approvals and change log.
- `01-discovery/`: AI-populated Client Website Brief and links to source/fact/asset records.
- `02-content/`: customer-question map, IA/section map, CTA, Media Requirements Plan, optional client media request and canonical asset/permission register.
- `03-scope/`: owner-approved commercial scope and WRP reference.
- `04-design/`: art direction, design specification, assets and G3 decision.
- `05-production/`: repository, bounded implementation slices and branch/commit checkpoints.
- `06-qa/`: acceptance matrix, browser screenshots, test evidence and defects.
- `07-launch/`: G4–G7, deployment verification and handover records.
- `08-retrospective/`: Stage 9 calibration and improvement actions.

The canonical field names and controlled statuses live in `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`. Use `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md` for gate authority. A project template is a working view, not a replacement schema or automatic approval engine.

Never store credentials, tokens, payment data or private customer records in this repository. Do not publish client repositories or assets without explicit authorization.
