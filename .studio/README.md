# Repository-native workflow runtime

The user's operating interface remains one AI conversation. ChatGPT + GitHub is the default; Codex, Antigravity, Muse and other agents are optional. Node.js 20+ built-ins only: no Laravel service, npm install, API key or paid model API.

## Initialize a client project

Run from the client repository root or pass an explicit path:

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs init --root . --project-id CLIENT-001 --mode preview_only

Initialization creates .studio/project-state.json, an initial event and project-artifacts/. It never overwrites an existing state. Use production only for an actual authorized production delivery; synthetic experiments must use preview_only.

## Submit a stage artifact

Write the artifact as a normal file inside the client project, then submit it:

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs submit-artifact --root . --artifact raw-material-index --file drafts/raw-material-index.md

Only artifact IDs belonging to the currently active stage are accepted. The command snapshots the source file into a versioned immutable path, computes SHA-256, records the event and updates the manifest. Revisions receive a higher version automatically; --version may be supplied explicitly. The source file is not deleted or modified.

## Inspect progress

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs status --root .
    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs validate --root .
    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs can-start --root . --stage stage-05

The manifest stores artifact submissions, approval records and a basic event history. Event actor labels are self-declared, not identity authentication; Git history is the stronger repository-level audit trail. Approval submission remains a structured-manifest operation in this tranche; a dedicated safe approval command is a subsequent tranche.

Private client sources and generated artifacts stay in the isolated client repository, never in this shared Studio repository.