# Repository-native workflow runtime

The user's operating interface remains one AI conversation. ChatGPT + GitHub is the default; Codex, Antigravity, Muse and other agents are optional. Node.js 20+ built-ins only: no Laravel service, npm install, API key or paid model API.

## Two independent operating and delivery modes

`operating_mode` selects the business context; `delivery_mode` selects the release lifecycle. They are independent fields.

| Operating mode | Intended use | Facts and constraints | Approval behavior | External release |
|---|---|---|---|---|
| `client_service` (default) | Work for a real client | Real source evidence, asset rights, claim controls and publication restrictions are enforced. Synthetic client facts are forbidden. | Every client/studio/reviewer role must be approved by its own authenticated, allowlisted GitHub account or an explicitly recorded human approval. Simulated roles are rejected. | Only after the normal production gates pass. |
| `studio_development` | Build and test Web Studio as a complete system | Synthetic businesses, facts, assets, scenarios and test cases are allowed when visibly labelled `SYNTHETIC / DEVELOPMENT ONLY`. Restrictions may be relaxed for synthetic fixtures, not for real client material. | Required roles can be simulated by an allowlisted development operator. Records are marked `[SIMULATED]`, identify the GitHub operator, and are never real client consent or authorization. | Always forbidden. Even `delivery_mode: production` means simulate the production-shaped workflow only. |

Legacy manifests with no `operating_mode` are interpreted as `client_service`. New projects default to the strict mode. Never switch an existing client project to development to bypass a missing approval or asset permission. Create a separate synthetic development project instead.

## Initialize a client project

Run from the client repository root or pass an explicit path:

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs init --root . --project-id CLIENT-001 --mode preview_only

Initialization creates .studio/project-state.json, an initial event and project-artifacts/. It never overwrites an existing state. `client_service` is the safe default:

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs init --root . --project-id CLIENT-001 --mode preview_only --operating-mode client_service

For system development, use a separate synthetic project:

    node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs init --root . --project-id DEV-001 --mode preview_only --operating-mode studio_development

Use `--mode production` with `studio_development` only to exercise later production gates as a simulation. The runtime reports `execution_class: SIMULATION_ONLY` and `external_release_allowed: false`; this mode cannot authorize deployment, publication or real-world client actions.

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

For the push-triggered adapter, commit the workflow YAML to the client working branch before the first inbox operation. The workflow can run from that pushed branch; it does not need to be merged into the default branch first. Keep initialization and later operations on a branch where the Actions bot is permitted to push its processed commit.

Install the adapter into a separate client repository by copying:
- .studio/workflow.contract.json
- .studio/project-state.schema.json
- scripts/workflow-enforcement.mjs
- .studio/github-native-adapter/web-studio-operations.yml to .github/workflows/web-studio-operations.yml
- .studio/github-native-adapter/approver-roles.template.json to .studio/approver-roles.json

Do not copy .studio/system-repository.json; it marks this shared source repository and prevents project initialization here. For a client project, configure only real role holders under `github_users`. For a development project, an operator may additionally configure `development_simulation` with explicit roles the same GitHub login is allowed to simulate. Simulation is only honored when project state is `studio_development`; configuration cannot relax a `client_service` project.

Example development-only role configuration:

    {
      "schema_version": "1.0.0",
      "github_users": { "studio-operator": ["studio_owner"] },
      "development_simulation": {
        "enabled": true,
        "github_actors": {
          "studio-operator": ["client_business_owner", "independent_reviewer"]
        }
      }
    }

For a development project, commit `.studio/inbox/project-init.json` with `project_id`, `delivery_mode` and `operating_mode: "studio_development"`. A client project should set `operating_mode: "client_service"` (or omit it for the strict default). A push to `.studio/inbox/**` triggers the adapter.

Submit an artifact by committing it at .studio/inbox/artifacts/<artifact-id>/<filename>. The action accepts only an artifact for the active stage, writes an immutable versioned snapshot under project-artifacts/, and updates .studio/project-state.json. For a human approval, commit .studio/inbox/approvals/<gate-id>/<role>.json with decision, subject and evidence_reference. In `client_service`, the GitHub actor who made the push must be mapped to that real role under `github_users`; one GitHub account cannot satisfy multiple roles within one approval round. In `studio_development` only, roles in `development_simulation.github_actors` may be simulated by the operator. The manifest records `identity_source: development_simulation`, a `[SIMULATED]` approver label and `simulated_by_github_actor`. A simulated role is visibly not a human client approval and is rejected in client mode.

The action uses the repository-scoped GITHUB_TOKEN supplied by GitHub Actions, with contents: write, and pushes the resulting state commit to the same branch. GitHub Actions events caused by a GITHUB_TOKEN push do not recursively trigger another push workflow. A branch rule that prohibits the Actions bot from pushing will make processing fail safely; use a permitted working branch or adjust repository policy. A rerun retains the original event actor; an unmapped actor leaves the approval inbox file untouched and fails the run.

Private client sources and generated artifacts stay in the isolated client repository, never in this shared Studio repository.