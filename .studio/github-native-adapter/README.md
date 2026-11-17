# GitHub-native project adapter

This adapter makes the project repository the operating surface for the standard ChatGPT + GitHub conversation. ChatGPT writes inbox files through the connected GitHub repository; GitHub Actions validates and registers them. No local terminal, customer API key, paid model API or Laravel service is needed.

## Install once in each client project repository

Copy these files from the Web Studio source repository into the client project repository, preserving their paths:

| Source | Destination |
|---|---|
| .studio/workflow.contract.json | .studio/workflow.contract.json |
| .studio/project-state.schema.json | .studio/project-state.schema.json |
| scripts/workflow-enforcement.mjs | scripts/workflow-enforcement.mjs |
| .studio/github-native-adapter/web-studio-operations.yml | .github/workflows/web-studio-operations.yml |
| .studio/github-native-adapter/approver-roles.template.json | .studio/approver-roles.json |



Install and commit the workflow file to the client's default branch first, without a pending inbox request in that bootstrap commit. Once installed, send project initialization and later operations as separate pushes to the selected working branch. Ensure the Actions bot is permitted to push its processed commit to that branch.
Do not copy .studio/system-repository.json. That marker belongs only in the canonical Web Studio source repository.

Edit .studio/approver-roles.json so the account logins are real GitHub usernames. Example shape:

    {
      "schema_version": "1.0.0",
      "github_users": {
        "studio-owner-login": ["studio_owner"],
        "client-owner-login": ["client_business_owner"],
        "independent-reviewer-login": ["independent_reviewer"]
      }
    }

Add one initialization request at .studio/inbox/project-init.json:

    {
      "project_id": "CLIENT-001",
      "delivery_mode": "preview_only"
    }

Commit/push the bootstrap files and initialization request. The push to .studio/inbox/** starts GitHub Actions, which initializes .studio/project-state.json and commits the event. Use production only for an explicitly authorized production delivery. Never put private client materials in the shared Web Studio source repository.

## Submit artifacts from the conversation

Create a file at .studio/inbox/artifacts/<artifact-id>/<filename>. Example: .studio/inbox/artifacts/raw-material-index/material-index.md.

Commit and push it to the project branch. The adapter only accepts an artifact registered to the currently active stage. It creates an immutable snapshot at project-artifacts/<stage-id>/<artifact-id>/v<version>/<artifact-id>.<ext>, calculates SHA-256, updates the project manifest and removes the processed inbox copy. The original submission remains recoverable from Git history.

## Record a human gate approval

Create one JSON file per approver role at .studio/inbox/approvals/<gate-id>/<role>.json. Example for .studio/inbox/approvals/G0/studio_owner.json:

    {
      "decision": "CONDITIONAL_PREVIEW",
      "subject": "Stage 0 sources, claims and asset permissions",
      "evidence_reference": "https://github.com/OWNER/PROJECT/pull/12"
    }

The folder and filename select the gate and role, but neither is trusted alone. The GitHub actor who caused the push must be mapped to that role in .studio/approver-roles.json. The adapter records the authenticated GitHub login and the exact current artifact versions/hashes. Each required role submits separately. A single GitHub account cannot satisfy multiple roles in one approval round.

For subsequent G0 approvals, use the gate decision allowed by the contract and the same subject for all required roles. For G1-G7, use the exact decision listed in .studio/workflow.contract.json. A changed bound artifact makes the prior round stale; every required role must approve again.

## Runtime and permissions

The workflow uses GitHub-hosted Actions runners, Node.js 22, built-in Node modules and the repository-scoped GITHUB_TOKEN supplied by Actions. The workflow requests only contents: write; there are no customer secrets or long-lived PATs. The GitHub connection used by ChatGPT must separately have write permission to the client repository to create inbox commits.

The Actions bot commits the generated manifest and snapshots back to the same branch. A branch-protection rule that prohibits this write will fail the job without deleting remote inbox inputs. Use a project working branch where the Actions bot can push, or deliberately configure repository rules. A bot-generated push does not recursively trigger another push workflow.

A GitHub actor is account authentication, not proof of legal identity or of the person's authority outside the repository. The project owner is responsible for configuring the approver allowlist correctly. GitHub Actions is an auditable convenience layer, not a tamper-proof security boundary against repository administrators or maintainers.
