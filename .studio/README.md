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

## Record G0-G7 approvals

Record each required role separately. The first role creates a PENDING gate; the gate passes only after every required role approves the same current artifact versions and SHA-256 hashes.

Command example: node scripts/workflow-enforcement.mjs record-approval --root PATH --gate G0 --decision CONDITIONAL_PREVIEW --role studio_owner --person "Studio Owner" --evidence "approval reference" --subject "Stage 0 source review"

Repeat with the next required role, using the same gate decision and subject. A duplicate role is rejected. If any gate-bound artifact receives a new version or hash, the current approval round becomes STALE; the next approval starts a fresh round and every required role must approve again. Earlier approval events and reset events remain in the event history.

Local CLI identities are self-declared labels, not authentication. Use the GitHub-native adapter below when approvals must be bound to authenticated GitHub account names.

## GitHub-native conversation workflow

The adapter lets an AI conversation create files in a client's GitHub repository; GitHub Actions then snapshots artifacts, calculates SHA-256, records events and commits the manifest. It requires no local terminal, API key, Laravel service or paid model API. It does require GitHub Actions and write permission on the client repository.

Install the adapter into a separate client repository by copying:
- .studio/workflow.contract.json
- .studio/project-state.schema.json
- scripts/workflow-enforcement.mjs
- .studio/github-native-adapter/web-studio-operations.yml to .github/workflows/web-studio-operations.yml
- .studio/github-native-adapter/approver-roles.template.json to .studio/approver-roles.json

Do not copy .studio/system-repository.json; it marks this shared source repository and prevents client initialization here. Configure .studio/approver-roles.json with actual GitHub logins and allowed roles, then commit .studio/inbox/project-init.json with project_id and delivery_mode. A push to .studio/inbox/** triggers the adapter.

Submit an artifact by committing it at .studio/inbox/artifacts/<artifact-id>/<filename>. The action accepts only an artifact for the active stage, writes an immutable versioned snapshot under project-artifacts/, and updates .studio/project-state.json. For a human approval, commit .studio/inbox/approvals/<gate-id>/<role>.json with decision, subject and evidence_reference. The GitHub actor who made the push must be allowlisted for that role; the role is not trusted from JSON alone. One GitHub account cannot satisfy multiple roles within one approval round.

The action uses the repository-scoped GITHUB_TOKEN supplied by GitHub Actions, with contents: write, and pushes the resulting state commit to the same branch. GitHub Actions events caused by a GITHUB_TOKEN push do not recursively trigger another push workflow. A branch rule that prohibits the Actions bot from pushing will make processing fail safely; use a permitted working branch or adjust repository policy. A rerun retains the original event actor; an unmapped actor leaves the approval inbox file untouched and fails the run.

Private client sources and generated artifacts stay in the isolated client repository, never in this shared Studio repository.