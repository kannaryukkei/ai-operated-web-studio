# Agent operating contract

This repository is the canonical AI-Operated Web Studio system. Default user experience: one ChatGPT conversation with GitHub as the repository interface. No paid model API, API key, Laravel runtime or vendor-specific agent is required.

## Before every task
1. Read this file, AI_BUILD_RULES.md, docs/CANONICAL_STATUS.md, .studio/README.md and the current project state.
2. Read .studio/workflow.contract.json; run node scripts/workflow-enforcement.mjs status --root <client-project> when a terminal is available. If the current integration cannot execute commands, inspect the repository manifest and CI evidence; do not claim a command ran.
3. Work only in the current active stage. Never write a stage status into project state.
4. Write artifacts to files in the isolated client repository. Register them using submit-artifact; do not hand-edit artifact manifest entries.
5. Check validator output and report remaining artifacts, gates and NOT TESTED items.
6. Never treat gas, silence or AI output as human approval.

## Non-negotiable controls
- Do not modify the workflow contract, validator, tests or CI as part of an ordinary client website task.
- Do not bypass validators, delete evidence, rewrite state to claim success or weaken approvals.
- Human roles, publication rights, commercial decisions and production release follow the canonical approval policy.
- Keep preview-only work separate from production. Synthetic/demo projects do not receive fabricated client, commercial or release approvals.
- Do not invent client facts, permissions, testimonials, metrics, reviews or working CTA destinations.
- Preserve raw source files. Do not place private client material in this shared Studio repository.
- Laravel under platform/ is a preserved prototype, not a required runtime.
- Optional Codex, Antigravity, Muse and other agents follow the same provider-neutral contract. Hooks are supplementary.

## Honest enforcement boundary
Node.js validation checks contract structure, stage dependencies, artifact paths/hashes and declared approval records. Event actor labels are self-declared. GitHub Actions is repeatable evidence, not an unbypassable merge lock on GitHub Free private repositories. Repository writers can still edit scripts, manifests and CI; do not describe this design as tamper-proof.