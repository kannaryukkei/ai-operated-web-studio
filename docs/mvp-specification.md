# MVP Specification — First Working Vertical Slice

## 1. MVP goal

Prove that a client can enter the platform, complete a guided intake, receive an AI-generated discovery brief, and review it while the studio owner manages the project and approves the next step.

This is the foundation for all later AI website-production stages.

## 2. User roles

- **Studio Owner:** full access to all clients/projects, settings, AI runs, approvals, and operations.
- **Studio Operator:** project operations and review permissions; sensitive commercial settings can remain owner-only.
- **Client:** access only to their own organization/profile, projects, messages, artifacts explicitly shared with them, and approval requests assigned to them.

Do not add public self-registration in the first cut unless it is needed. Invitation-based client access is acceptable.

## 3. MVP features

### A. Authentication
- Login / logout.
- Password reset and email verification through the Laravel starter kit.
- Role and project-membership authorization.
- Studio users can invite a client contact.

### B. Client onboarding
- Create / complete a business profile.
- Guided intake form covering business, audience, services, goals, current presence, assets, desired action, and requested capabilities.
- Save progress and resume later.
- File references / asset upload can be deferred to the next slice if necessary.
- Intake can be conversational later; start with structured input plus an AI follow-up summary.

### C. Project management
- Studio creates a project and assigns a client.
- Select Starter / Business / Custom.
- Project status and stage timeline.
- Store proposal/scope status separately from AI stage status.
- Record next action, owner, and dependency.

### D. AI Discovery Brief
- Run an AI agent against an approved intake snapshot.
- Return structured output: business summary, audience, website goal, customer journey, suggested tier fit, key questions, missing inputs, risk flags, and suggested next step.
- Save model/provider/prompt version, structured result, token usage/cost if available, status, and errors.
- Client can suggest corrections.
- Studio owner can approve or return the brief.

### E. Studio dashboard
- Project list grouped by status.
- Project detail with client profile, intake, AI runs, brief, activity, approval status.
- AI run panel with queued/running/completed/failed state.
- Approve / request changes actions.

### F. Audit
- Record project creation, intake changes, AI run lifecycle, artifact creation, approval, rejection, and status changes.
- Client view must not expose private internal notes or hidden agent traces.

## 4. MVP out of scope
- AI-generated website code.
- Automatic GitHub repository creation.
- Automated proposals, payment collection, or invoicing.
- Client payments or subscription management.
- Drag-and-drop editor.
- Persistent production booking / ecommerce features for generated client websites.
- Autonomous domain changes or production deployments.
- Native mobile app.

These will follow only after the first vertical slice is stable.

## 5. Acceptance criteria

- Studio user can authenticate and create a client/project.
- Client can authenticate and complete/save an intake.
- Client cannot access any other client's project by guessing IDs or URLs.
- Studio can trigger an AI discovery run.
- AI work runs asynchronously and survives a browser refresh.
- Structured AI output is validated and saved.
- Failed jobs show an actionable status and can be retried safely.
- Client can see the approved brief, not hidden internal reasoning.
- Studio can approve or request corrections.
- Every important state transition appears in the activity history.
- Automated feature tests cover project permissions, intake, AI run status, and approval gates.

## 6. MVP demonstration script

1. Studio creates a sample client and project.
2. Client opens the portal.
3. Client fills out the business intake.
4. Client submits it.
5. Studio sees the new intake.
6. Studio triggers AI discovery.
7. Dashboard shows the run as queued/running/completed.
8. AI brief appears with missing questions and scope risk flags.
9. Studio reviews and approves.
10. Client sees approved brief and next step.

A mock/fake AI provider may be used in automated tests. Real provider usage requires separately configured API credentials and budget.
