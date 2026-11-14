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
7. The platform validates required fields and saves the result against the run.
8. The studio reviews the **fact register, asset permissions, CTA destinations and customer-question coverage** before using the brief for website planning.
9. The studio resolves critical gaps or records an owner/action; only approved facts and destinations move into public website content.

The current output contract is enforced by `ManualDiscoveryController`: every material fact needs a source and publication status; each relevant customer question needs `ANSWERED`, `GAP` or `NOT_APPLICABLE`; each CTA needs a destination status and expected behavior; each asset needs a source/owner and permission status.

## What the platform does

- Controls access to projects and discovery workspaces.
- Stores submitted intake snapshots and version numbers.
- Prepares a repeatable prompt from the exact intake snapshot.
- Validates and persists structured discovery output.
- Keeps a durable record of the discovery run.

## What the operator does

- Chooses and uses the AI application.
- Reviews the AI output for unsupported claims, assumptions, scope risks and source mismatches.
- Checks that public facts, CTA destinations and asset rights have explicit approval status.
- Corrects the result before saving it.
- Owns all client-facing, tier, commercial and production-release decisions.

Use `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.6_CANDIDATE.md` for the production stages, `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md` for the client brief and `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` for the Starter release decision.

## Cost and integration boundary

- No OpenAI API key, model API credential, or API billing is required for this workflow.
- ChatGPT or Claude usage follows the operator's existing application subscription and its usage limits.
- API integration is an optional future optimization, not a prerequisite for delivering websites.
- Do not add provider SDKs, API secrets, token billing, or autonomous agent infrastructure until manual delivery has been validated with real clients and the studio can fund the usage.

## Product boundary

This is an AI-assisted studio operating system, not yet a fully autonomous AI SaaS. It can support real client projects with a deliberate copy/paste handoff. Automation should be added only where repeated manual work becomes a demonstrated bottleneck.
