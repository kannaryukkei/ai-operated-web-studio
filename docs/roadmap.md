# Product Roadmap

## Phase 0 — Architecture and repository foundation
- [x] Initialize repository.
- [x] Define product brief and MVP.
- [x] Define modular monolith architecture.
- [x] Define AI orchestration and approval model.
- [x] Define initial data model.
- [x] Define security boundaries.
- [ ] Confirm local Laravel scaffold approach.
- [ ] Generate Laravel 13 + React starter application.

**Exit:** Fresh application boots locally and can authenticate a studio owner.

## Phase 1 — Platform shell and identity
- Laravel 13 application in `platform/`.
- React/Inertia studio layout and client portal layout.
- Authentication and role-aware access.
- Client accounts, memberships, projects.
- Studio dashboard with pipeline/status.
- Client dashboard with project timeline.
- SQLite local setup and initial feature tests.

**Exit:** Studio can create a client/project; invited client can log in and only see their own project.

## Phase 2 — Guided onboarding and API-free discovery
- Client business intake wizard.
- Save/resume intake.
- Immutable intake snapshot/versioning.
- Studio-only discovery workspace.
- Generate a repeatable prompt from the submitted intake snapshot.
- Run the prompt in an external AI application.
- Validate and save structured JSON output.
- Show the saved brief to studio staff.

**Exit:** A real client intake can produce a durable, validated discovery brief without API credentials or API spending. Studio review remains a human decision.

## Phase 3 — Scope, proposal, content planning
- Reusable skills and prompts for qualification, tier recommendation, scope, and exclusions.
- Proposal draft and commercial approval.
- Content map, website copy, FAQ, and SEO draft using external AI tools.
- Client-facing content review.
- Revision/change request classification.
- Consider API automation only after manual delivery proves the workflow and costs can be funded.

**Exit:** Client can approve the website plan before design/build begins.

## Phase 4 — Creative production
- Reference research workspace.
- Art-direction agent.
- Image-generation workflow and asset register.
- Design review / approval.
- Design tokens and component mapping.

**Exit:** Approved visual direction and all required assets are ready for implementation.

## Phase 5 — Website production engine
- Versioned Starter/Business/Custom blueprint registry.
- GitHub App integration with least-privilege permissions.
- Create isolated client repository/branch.
- Coding agents work through reviewed pull requests; the operator can run them through existing AI coding tools without an app-owned model API.
- Build and browser QA.
- Preview URL and revision workflow.

**Exit:** An approved client brief can produce a working website preview with traceable code and tests.

## Phase 6 — Release and handover
- Deployment provider integration.
- Release plan and rollback record.
- Explicit production release approval.
- Production verification.
- Handover pack and account ownership notes.

**Exit:** Client website can be safely launched and handed over.

## Phase 7 — Care and optimization
- Website Care subscriptions/offers.
- Monitoring and alerting.
- Content/update requests.
- Recurring maintenance tasks.
- Project economics and human-hours dashboard.
- AI prompt/workflow performance analytics.

**Exit:** Post-launch support becomes a repeatable service.

## Scope discipline
Only build what is needed to deliver a real client website reliably. Do not introduce API billing, provider SDKs, queue infrastructure for AI, multi-agency tenancy, a generic website builder, microservices, or advanced agent autonomy before real client work proves the need.
