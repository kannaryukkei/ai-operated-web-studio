## Repository-native Workflow Enforcement v1.0

The canonical user experience remains one conversation. ChatGPT + GitHub is the default; Codex, Antigravity, Muse and other agents are optional. This design is API-free, agent-neutral and does not require Laravel. The Laravel application remains a preserved prototype.

The executable contract .studio/workflow.contract.json defines Entry/Stage 0-9 artifacts, dependencies, G0-G7, human roles and preview/production modes. Copy .studio/project-state.template.json into each isolated client repo as .studio/project-state.json and replace the project ID. Do not place client-private material in this Studio repository.

Run with Node.js 20+, no dependencies: `node scripts/workflow-enforcement.mjs validate-contract`; from a project root use `status`, `validate`, or `can-start --stage stage-05`. Each artifact record contains artifact_id, stage_id, version, path, sha256, status SUBMITTED and produced_at. The runtime verifies the file exists inside the project root and its SHA-256 still matches. Approvals bind exact artifact versions and hashes and require named roles, dates and evidence. Changed artifact versions invalidate the old approval. Stage status is derived; state files cannot assert PASSED.

Preview-only Stage 8 is NOT_APPLICABLE and Stage 9 can follow Stage 7. Production Stage 8 requires G4/G5/G6 before starting and G7 to complete.

Limitations: the validator cannot cryptographically authenticate a person who approved through conversation; it validates declared approval evidence. Repository writers can edit manifests, validator files or CI. GitHub Actions is repeatable evidence, not an unbypassable merge lock on GitHub Free private repositories. Standard ChatGPT GitHub connector may be read-only; use only confirmed write capabilities. Optional agent hooks supplement but do not replace this contract.
