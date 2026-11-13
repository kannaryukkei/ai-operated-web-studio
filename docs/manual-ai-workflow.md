# API-Free AI-Assisted Studio Workflow

## Why this exists

The first working studio workflow must be usable without a paid model API. The platform coordinates client information, project state, saved outputs, and approvals. AI work can happen in ChatGPT, Claude, or another AI application already used by the studio operator.

This keeps the studio useful before there is enough revenue to justify automated model calls.

## Operating model

1. The client submits the structured business intake in the client portal.
2. The studio operator opens the project's Discovery workspace.
3. The platform creates a discovery run from an immutable snapshot of the latest submitted intake.
4. The operator copies the generated prompt into ChatGPT, Claude, or another AI application.
5. The AI returns the requested JSON brief.
6. The operator pastes the result into the Discovery workspace.
7. The platform validates the output structure and saves it against the run.
8. The studio reviews the brief before sharing or approving it with the client.

## What the platform does

- Controls access to projects and discovery workspaces.
- Stores submitted intake snapshots and version numbers.
- Prepares a repeatable prompt from the exact intake snapshot.
- Validates and persists structured discovery output.
- Keeps a durable record of the discovery run.

## What the operator does

- Chooses and uses the AI application.
- Reviews the AI output for unsupported claims, assumptions, and scope risks.
- Corrects the result before saving it.
- Owns all client-facing and commercial decisions.

## Cost and integration boundary

- No OpenAI API key, model API credential, or API billing is required for this workflow.
- ChatGPT or Claude usage follows the operator's existing application subscription and its usage limits.
- API integration is an optional future optimization, not a prerequisite for delivering websites.
- Do not add provider SDKs, API secrets, token billing, or autonomous agent infrastructure until manual delivery has been validated with real clients and the studio can fund the usage.

## Product boundary

This is an AI-assisted studio operating system, not yet a fully autonomous AI SaaS. It can support real client projects with a deliberate copy/paste handoff. Automation should be added only where repeated manual work becomes a demonstrated bottleneck.
