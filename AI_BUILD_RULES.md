# AI Build Rules

These rules apply to AI agents and contributors working in this repository.

## Mission
Build an AI-operated web studio platform that safely guides client projects from intake to launch. The platform application is separate from the website products it produces.

## Required reading before implementation
1. `README.md`
2. `docs/product-brief.md`
3. `docs/architecture.md`
4. `docs/mvp-specification.md`
5. `docs/ai-orchestration.md`
6. `docs/security-and-approvals.md`

## Engineering rules
- Preserve the approved architecture unless a written Architecture Decision Record changes it.
- Keep the first release a modular Laravel monolith. Do not introduce microservices, Kubernetes, or a separate workflow engine without evidence.
- Keep business/domain logic outside HTTP controllers and provider-specific AI code.
- Persist workflow state, approvals, AI runs, artifacts, and audit events. Never rely on model conversation memory as the only project record.
- Every AI stage must have defined inputs, structured outputs, schema validation, timeout/retry behavior, and a human approval boundary.
- Use queued jobs for long-running AI work. Never keep a web request open while generating a full website.
- Make jobs idempotent and record attempts and failures.
- Use scoped tools. Agents may only access the project and actions allowed for their stage.
- AI may prepare external actions but may not send client messages, spend money, change DNS, publish, or transfer ownership without explicit human authorization.
- Isolate every client's projects, assets, artifacts, messages, and AI context with authorization policies.
- Never commit .env files, credentials, API keys, private client materials, or customer secrets.
- Build incrementally. Each milestone must build, test, and be demonstrable before expanding scope.
- Do not scaffold features not in the current milestone.

## Content and evidence
- Portfolio demos may contain labelled fictional examples.
- Live client claims, prices, testimonials, metrics, guarantees, policies, and credentials require approval/evidence.
- Distinguish verified facts, client-provided facts awaiting approval, AI drafts, and illustrative examples.

## Required completion report
For every implementation task report:
- Goal and scope.
- Files changed.
- Database or API changes.
- Tests actually run and results.
- Security/authorization implications.
- Remaining risks and decisions.
- Commit / branch / artifact links.

Never claim success for unexecuted tests, deployments, or integrations.
