## Repository-native Workflow Enforcement v1.0

The canonical user experience is one conversation. ChatGPT + GitHub is the default; Codex, Antigravity, Muse and other agents are optional. The system is API-free and does not require Laravel.

### Runtime and project operations
- .studio/workflow.contract.json: Entry, Stage 0–9, 54 artifact IDs, dependencies, G0–G7, human roles and delivery modes.
- .studio/project-state.template.json: initial state shape.
- scripts/workflow-enforcement.mjs: contract checks, derived stage state, initialization, artifact submission and status reporting.
- Each client project has its own repository and .studio/project-state.json; never put private client material in the shared Studio repository.

With Node.js 20+ and no dependency installation:

    node scripts/workflow-enforcement.mjs validate-contract
    node scripts/workflow-enforcement.mjs init --root PATH --project-id CLIENT-001 --mode preview_only
    node scripts/workflow-enforcement.mjs submit-artifact --root PATH --artifact raw-material-index --file drafts/raw-material-index.md
    node scripts/workflow-enforcement.mjs status --root PATH
    node scripts/workflow-enforcement.mjs validate --root PATH
    node scripts/workflow-enforcement.mjs can-start --root PATH --stage stage-05

Initialization creates a fresh state and initial event, and refuses to overwrite an existing project state. Artifact submission accepts only a contract artifact for the currently active stage. The source file must be inside the project root. It is copied into an immutable, versioned snapshot under project-artifacts/; SHA-256 is computed automatically and the manifest plus event history are updated. New versions must increase monotonically; old snapshots remain available for integrity checks.

Stage status is derived from valid files, checksums, dependencies and approvals; an AI-written PASS field is rejected. Approval operations are role-by-role: partial approval is PENDING, all required roles must bind the exact current artifact versions and hashes, and a changed artifact starts a fresh approval round. The event log preserves each role approval and round reset. Local CLI person labels remain self-declared and are not identity authentication. The GitHub-native adapter maps the authenticated GitHub push actor through a project-owned .studio/approver-roles.json; the role supplied by an inbox path is accepted only when that actor is allowlisted. This path uses the Actions-provided GITHUB_TOKEN, not a customer API key. See .studio/github-native-adapter/README.md.

Preview-only mode marks Stage 8 NOT_APPLICABLE and permits Stage 9 after Stage 7. Production Stage 8 requires G4/G5/G6 before starting and G7 before completion.

### Limitations
The validator checks file integrity and declared approval evidence, not cryptographic identity. Event actor labels are self-declared; Git history provides repository-level change history. Repository writers can modify manifests, validators and CI. GitHub Actions is repeatable evidence, not an unbypassable merge lock on GitHub Free private repositories. A standard ChatGPT GitHub connector may be read-only; use only confirmed write capabilities. Optional agent hooks supplement but do not replace the canonical contract.

### P0.3 — approval operations and GitHub-native adapter

- record-approval appends one required role at a time; duplicate or unexpected roles are rejected.
- Gate status distinguishes PENDING, STALE, INVALID and PASSED. Pending or stale approvals block the relevant gate without falsely making the project manifest invalid.
- Approval events retain the gate decision, role, approver label, evidence reference, identity source and bound artifact versions/hashes.
- A changed gate-bound artifact invalidates the current round. A new round starts with no carried-over approvers; historical approval events remain.
- A GitHub Actions adapter template processes project initialization, artifact and approval inbox files. It uses the push actor plus a project-owned GitHub-login-to-role allowlist.
- The adapter must be copied into each separate client project repository. It does not create repositories or grant connector permissions; the selected GitHub connection still needs write access.
- The Actions bot must be allowed to commit processed state to the chosen branch. Branch policies that prohibit that push fail closed and leave remote inbox inputs intact.
