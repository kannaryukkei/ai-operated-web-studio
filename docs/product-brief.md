# Product Brief — AI Operated Web Studio

## 1. Product definition

An AI-powered web production platform that guides a client through the complete website project lifecycle while orchestrating the studio's internal delivery work.

The client experiences a guided consultation and project portal. The studio experiences an AI-assisted operations dashboard. AI agents execute repeatable work and hand off decisions at defined approval gates.

This is initially an internal platform for one web studio and its clients, not a public multi-agency SaaS product.

## 2. Problem

A website project normally involves fragmented communication, repeated briefing, manual content planning, research, visual production, development, testing, revision coordination, and handover. Quality and delivery time can vary when every stage is managed manually.

The platform should turn this into a repeatable workflow with:
- One source of truth for every project.
- Guided client input instead of unstructured back-and-forth.
- Stage-specific AI work with predictable outputs.
- Visible project status and approvals.
- Automated validation and traceable revisions.
- A reusable website production engine for Starter, Business, and Custom.

## 3. Users

### Client
- Creates an account / accesses an invitation.
- Completes a guided business intake.
- Discusses needs with an AI consultation guide.
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

### AI agents
- Qualify and structure client information.
- Produce discovery, content, design, and implementation artifacts.
- Execute scoped website work.
- Test, diagnose, and fix in-scope defects.
- Prepare client communications, approval packs, release notes, and handover materials.

## 4. Product promise

**Clients are guided from idea to live website. The studio's AI production team carries the repeatable work; the studio owner controls critical decisions and quality.**

Do not market the platform as fully autonomous until the corresponding workflow stages are deployed, secured, and tested.

## 5. Product tiers

The platform can coordinate three website products, but must not merge their templates into the platform source code.

- **Starter:** polished one-page website, static-first.
- **Business:** multi-page website with richer information architecture and content depth.
- **Custom:** bespoke scope and implementation, potentially including persistent data, APIs, accounts, or operational workflows.

The platform should read a versioned product definition / blueprint for each tier. Actual production website code lives in a separate client repository.

## 6. MVP outcome

A real client can:
1. Access a private client portal.
2. Complete a guided intake about their business and website goal.
3. Receive an AI-generated discovery summary / brief.
4. Review and correct the brief.
5. See the studio's proposed next step and project status.

The studio can:
1. View the client and project in an internal dashboard.
2. Review the AI output, assumptions, missing information, and risk flags.
3. Approve or return the brief for correction.
4. Continue the workflow without losing context or decision history.

The first MVP does not need to generate and deploy a whole website automatically. It must first prove a reliable project record, client journey, AI job, and approval loop.

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
