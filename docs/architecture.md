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
- Laravel queues and provider SDKs are optional future integrations, not MVP prerequisites.
- Initial AI work happens in external AI applications through structured prompts and manual result handoff.

The official Laravel 13 React starter kit uses React 19, TypeScript, Inertia 3, Tailwind 4, and shadcn/ui. Laravel 13 introduces a first-party AI SDK for text generation, agents/tool calling, embeddings, audio, images, and vector-store integrations. References: https://laravel.com/framework/docs/13.x/starter-kits and https://laravel.com/framework/docs/13.x/releases.

### Why one application first
Client portal, studio dashboard, project records, approvals, AI orchestration, and artifact management share the same project state and authorization model. Keeping them in one deployable application reduces operational complexity while the workflow is still evolving.

Future provider-backed jobs may use separate workers, but the current MVP does not need an AI queue worker or model API.

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

The MVP uses persisted discovery runs and manual handoffs to external AI applications. Do not add an AI SDK, provider credentials, queued model calls, or long-running agent loops until actual client delivery demonstrates the need. Website coding can be performed by existing AI coding tools against a separate client repository, with human review of changes.

## 6. Website production boundary

This repository is the studio's single canonical production system, but platform code and website code remain separate by directory and release boundary.

- Platform source and persisted studio state live under `platform/`.
- Master Skill, client brief, product definitions, implementation standard and acceptance gates live under `docs/`.
- Versioned website blueprints, their reference implementation, reusable prompts and delivery templates live under `blueprints/`. Starter is migrated to `blueprints/starter/`.
- Each real client website lives in its own private GitHub repository, copied from the selected blueprint only after scope and category fit are confirmed.
- Client facts, client assets, credentials and approvals never become shared blueprint defaults.
- The platform records the selected blueprint/version, client repository ID/URL, branch, commit, preview URL and release reference.
- Website generation works on an isolated client-repository branch / pull request and runs that project's tests.
- Production publishing remains approval-gated.

Do not create a second master repository for website templates. Keep one studio source of truth here; keep client websites isolated.

## 7. Initial repository layout

```text
ai-operated-web-studio/
  platform/                 # Laravel 13 application and its own CI
  docs/                     # Master Skill, client brief, standards, acceptance gates
  blueprints/
    starter/
      README.md
      KALA_PILOT_LEARNINGS.md
      template-kit/          # exact migrated source snapshot and working reference
    business/                # only after Starter is accepted and reusable
    custom/                  # scoped bespoke guidance; no forced generic app
  .github/
    workflows/               # platform and blueprint validation
  AI_BUILD_RULES.md
  README.md
```

The migrated Starter source remains under `blueprints/starter/template-kit/starter/` to preserve source paths and provenance. Its usage rules are documented in `blueprints/starter/README.md`. Do not copy the entire blueprint into `platform/`.

## 8. Environment strategy

- Local development: Laravel Herd, SQLite, local filesystem.
- Early testing: one hosted application + managed PostgreSQL + private object storage.
- Production: application server, PostgreSQL, private object storage, monitoring; add Redis/managed queues only when workload justifies them.
- Any future AI provider keys and GitHub app credentials are server-side secrets and never sent to the browser.

Avoid choosing expensive infrastructure before usage and workload are known.

## 9. Scaling path

Start with a modular monolith and separate queue workers. Consider extracting a service only when there is measured need: resource isolation, deployment independence, security boundary, or scaling characteristics that cannot be handled by the monolith.
