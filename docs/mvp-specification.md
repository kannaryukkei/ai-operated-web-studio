# MVP Specification — First Working Vertical Slice

## 1. MVP goal

Prove that a client can complete a guided intake and that the studio can turn the submitted intake into a validated discovery brief using an external AI application, without requiring an API key. The studio owner reviews the brief and controls the next step.

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
- Keep the first intake structured. Any AI follow-up work can be done through the manual discovery workflow.

### C. Project management
- Studio creates a project and assigns a client.
- Select Starter / Business / Custom.
- Project status and stage timeline.
- Store proposal/scope status separately from AI stage status.
- Record next action, owner, and dependency.

### D. API-Free Discovery Brief
- Create a discovery run from the latest submitted intake snapshot.
- Generate a repeatable prompt from that immutable snapshot.
- The studio operator runs the prompt in ChatGPT, Claude, or another external AI application.
- Paste the returned JSON into the platform; validate its required fields and save the structured result.
- Show the run status and saved discovery brief to studio staff.
- Studio review and client approval are separate steps; AI output is not automatically approved.

### E. Studio dashboard
- Project list grouped by status.
- Project detail with client profile, intake, AI runs, brief, activity, approval status.
- Discovery run panel with processing/completed status.
- Approve / request changes actions can follow after the manual discovery loop is validated.

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
- Studio can start a discovery run from a submitted intake snapshot.
- Studio can copy a prompt, run it in an external AI application, and paste the response.
- Structured output is validated and saved; the run survives a browser refresh.
- No model API key, API billing, queue worker, or AI SDK is required for the MVP.
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
6. Studio opens the Discovery workspace and prepares a prompt.
7. Studio runs the prompt in ChatGPT or Claude.
8. Studio pastes the JSON result; the platform validates and saves the brief.
9. Studio reviews and approves.
10. Client sees approved brief and next step.

Automated tests use deterministic sample JSON and never call a model provider. Real provider/API integration is explicitly optional and should be funded from validated revenue.
