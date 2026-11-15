# Product Brief — AI Operated Web Studio

## 1. Product definition

An AI-powered web production platform that guides a client through the complete website project lifecycle while orchestrating the studio's internal delivery work.

The client explains the business in a normal interview and supplies existing assets and optional source links. The studio uses a lightweight operations workspace plus reusable AI skills and prompts in external AI applications. AI converts the raw materials into a source-traceable brief; the operator reviews exceptions and controls approval gates. A long client questionnaire is not the default input.

This is initially an internal platform for one web studio and its clients, not a public multi-agency SaaS product.

## 2. Problem

A website project normally involves fragmented communication, repeated briefing, manual content planning, research, visual production, development, testing, revision coordination, and handover. Quality and delivery time can vary when every stage is managed manually.

The platform should turn this into a repeatable workflow with:
- One source of truth for every project.
- Minimal one-time client input through an interview and existing materials; AI-led normalization instead of repeated briefing.
- Repeatable AI-assisted work with predictable, validated outputs, even when the AI runs outside the platform.
- Visible project status and approvals.
- Automated validation and traceable revisions.
- A reusable website production engine for Starter, Business, and Custom.

## 3. Users

### Client
- Creates an account / accesses an invitation.
- Participates in a normal business interview and supplies existing assets/source links.
- Clarifies only material unresolved facts, conflicts or asset permissions identified by the AI.
- Reviews scope/proposal drafts.
- Tracks project progress.
- Reviews previews and submits feedback.
- Approves content, design, staging, and release checkpoints.
- Receives handover and support information.

### Studio owner / operator
- Manages the project pipeline and clients.
- Approves tier, scope, fee, margin, and timeline.
- Reviews AI outputs and tool activity.
- Resolves exceptions and change requests.
- Approves external communication and production releases.
- Reviews cost, quality, and delivery metrics.

### AI tools and coding agents
- Help qualify and structure client information.
- Produce discovery, content, design, and implementation drafts.
- Assist with scoped website work through existing coding tools.
- Test, diagnose, and fix in-scope defects.
- Prepare client communications, approval packs, release notes, and handover materials.
- They may be used through their normal applications; the platform does not need to own an API integration in the MVP.

## 4. Product promise

**Clients are guided from idea to live website. The studio's AI production team carries the repeatable work; the studio owner controls critical decisions and quality.**

Do not market the platform as fully autonomous until the corresponding workflow stages are deployed, secured, and tested.

## 5. Product tiers

The platform coordinates three website products from one canonical repository. Website source must remain outside the Laravel application under versioned `blueprints/`, never merged into `platform/`.

- **Starter:** polished one-page website, static-first.
- **Business:** multi-page website with richer information architecture and content depth.
- **Custom:** bespoke scope and implementation, potentially including persistent data, APIs, accounts, or operational workflows.

The platform should read a versioned product definition / blueprint for each tier from this repository's `blueprints/` directory. Actual production website code is copied to a separate client repository; blueprints remain the system-level reusable source of truth.

## 6. MVP outcome

A real client can:
1. Access a private client portal.
2. Participate in a normal interview and supply existing assets; the studio records the raw material once.
3. Receive a discovery brief normalized by AI from the interview and materials, with source references and unresolved gaps recorded.
4. Review and correct the brief.
5. See the studio's proposed next step and project status.

The studio can:
1. View the client and project in an internal dashboard.
2. Review the AI output, assumptions, missing information, and risk flags.
3. Approve or return the brief for correction.
4. Continue the workflow without losing context or decision history.

The first MVP does not need to generate and deploy a website automatically or call a model API. It must prove a reliable project record, client journey, repeatable external-AI handoff, validated discovery output, and studio review loop. A copy/paste handoff is acceptable at this stage.

## 7. Non-goals for MVP

- Multi-agency SaaS tenancy and billing.
- Public template marketplace.
- Visual drag-and-drop website builder.
- Unrestricted autonomous agents.
- Fully automated contracts, payments, invoices, refunds, or DNS changes.
- Multi-cloud deployment orchestrator.
- Complex CRM, accounting, or marketing suite.
- Mobile native applications.

## 8. Product principles

1. AI-first, not AI-only.
2. Human approval for commercial, factual, and release-critical decisions.
3. Persisted state instead of conversation-only memory.
4. Modular monolith before microservices.
5. Static-first website products unless the brief requires a backend.
6. Client-facing simplicity; operational complexity stays internal.
7. A clear audit trail for every AI action and human decision.
8. Quality and repeatability matter more than maximum autonomy.
