# System Architecture

**Status:** Initial architecture baseline  
**Architecture style:** Modular Laravel monolith

## 1. High-level system

```text
Client Browser                         Studio Browser
      |                                      |
      +--------------- HTTPS ----------------+
                         |
                  Laravel Application
                         |
       +-----------------+-------------------+
       |                 |                   |
   Client Portal     Studio Console     Public Preview
       |                 |                   |
       +-----------------+-------------------+
                         |
                 Application Modules
                         |
   +----------+----------+----------+-----------+
   |          |          |          |           |
 Projects   Workflow    AI       Approvals   Artifacts
   |          |          |          |           |
   +----------+----------+----------+-----------+
                         |
                Persistent Database
                         |
                  Queue / Job Workers
                         |
       +-----------------+----------------------+
       |                 |                      |
   AI Providers      GitHub Integration     Hosting Providers
   (Laravel AI SDK)  Client Website Repos   Preview / Production
```

## 2. Technology decisions

### Application
- Laravel 13.
- Official Laravel React starter kit.
- React + Inertia + TypeScript + Tailwind + shadcn/ui.
- Laravel Fortify authentication provided by the starter kit.
- SQLite for local bootstrap; PostgreSQL as the production database target.
- Laravel queues for asynchronous work.
- Laravel AI SDK behind application-owned interfaces.

The official Laravel 13 React starter kit uses React 19, TypeScript, Inertia 3, Tailwind 4, and shadcn/ui. Laravel 13 introduces a first-party AI SDK for text generation, agents/tool calling, embeddings, audio, images, and vector-store integrations. References: https://laravel.com/framework/docs/13.x/starter-kits and https://laravel.com/framework/docs/13.x/releases.

### Why one application first
Client portal, studio dashboard, project records, approvals, AI orchestration, and artifact management share the same project state and authorization model. Keeping them in one deployable application reduces operational complexity while the workflow is still evolving.

Separate workers may process queued AI jobs, but they remain part of the same application codebase.

## 3. Application modules

Suggested Laravel application boundaries:

- **Identity:** users, roles, client membership, sessions.
- **Clients:** business profile, contacts, client workspace.
- **Products:** Starter / Business / Custom definitions and versions.
- **Projects:** project lifecycle, scope, brief, participants.
- **Conversations:** client-to-AI guided intake, messages, summaries.
- **Workflow:** definitions, runs, steps, retries, dependencies, state transitions.
- **AI:** agent registry, prompt versions, provider adapters, tool policies, usage.
- **Content:** section maps, copy artifacts, asset registers.
- **Design:** art direction, visual references, generated assets, approvals.
- **Production:** website repositories, build status, preview links, revisions.
- **QA:** test runs, findings, remediation records.
- **Approvals:** approval requests, decisions, audit evidence.
- **Deployments:** release plans, provider references, production verification.
- **Audit:** activity events and immutable decision history.

Avoid creating a service or package for every module. Organize by business capability inside the Laravel application.

## 4. Frontend areas

### Client portal
- Onboarding.
- Business profile and discovery conversation.
- Project overview and stage timeline.
- Scope / content / design review.
- Preview and revision submission.
- Approval history.
- Handover and care information.

### Studio console
- Pipeline overview.
- Project detail and client context.
- AI run queue and execution trace.
- Draft artifact review.
- Approval center.
- Revision/change request triage.
- Build / QA / release status.
- AI usage and project economics.

## 5. AI execution boundary

The AI layer must not own canonical project state. Laravel owns state, permissions, approvals, task scheduling, artifacts, and audit records. Agents receive a scoped context and return validated structured output. Laravel validates, stores, and decides what happens next.

Use Laravel queued jobs for long-running generation and tool work. Use persisted workflow runs and steps to resume, retry, and inspect execution. Laravel supports queue jobs, chaining, and batching: https://laravel.com/framework/docs/13.x/queues.

Do not make a whole website build a single long-running HTTP request or one unobservable agent loop.

## 6. Website production boundary

The platform repository is not the website template repository.

- Platform source lives here.
- Website blueprints remain in `web-studio-template-kit` and are versioned.
- Each real client website lives in its own private GitHub repository.
- The platform stores the selected blueprint version, repository ID/URL, current branch, commit, preview URL, and release reference.
- Website generation should operate on an isolated branch / pull request and run the project's tests.
- Production publishing is approval-gated.

## 7. Initial repository layout

```text
ai-operated-web-studio/
  platform/                 # Laravel 13 application (next implementation milestone)
  docs/
  prompts/
    agents/
    workflows/
  product-blueprints/
    starter/
    business/
    custom/
  .github/
    ISSUE_TEMPLATE/
  AI_BUILD_RULES.md
  README.md
```

The website blueprint directory may initially hold version metadata and links to the separate template repository; do not duplicate the full website applications here.

## 8. Environment strategy

- Local development: Laravel Herd, SQLite, local filesystem, queue database/sync for development.
- Early testing: one hosted application + managed PostgreSQL + private object storage + queued worker.
- Production: application server, PostgreSQL, Redis or managed queue as workload justifies, private object storage, scheduled worker, monitoring.
- AI provider keys and GitHub app credentials are server-side secrets and never sent to the browser.

Avoid choosing expensive infrastructure before usage and workload are known.

## 9. Scaling path

Start with a modular monolith and separate queue workers. Consider extracting a service only when there is measured need: resource isolation, deployment independence, security boundary, or scaling characteristics that cannot be handled by the monolith.
