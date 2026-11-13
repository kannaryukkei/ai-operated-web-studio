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

## Phase 2 — Guided onboarding and discovery AI
- Client business intake wizard.
- Save/resume intake.
- Intake snapshot/versioning.
- AI discovery agent using Laravel AI SDK.
- Structured output validation.
- Queued AI run with visible status.
- Studio review and approve/request-changes.
- Activity log.

**Exit:** The first end-to-end AI stage is real, asynchronous, durable, testable, and approval-gated.

## Phase 3 — Scope, proposal, content planning
- Qualification and tier recommendation.
- Scope and exclusion draft.
- Proposal draft and commercial approval.
- Content map, website copy, FAQ, SEO draft.
- Client-facing content review.
- Revision/change request classification.

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
- AI builder works through pull requests.
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
Only build the current phase. Do not introduce billing, multi-agency tenancy, a generic website builder, microservices, or advanced agent autonomy before the vertical slice proves the need.
