# AI Orchestration and Agent Design

## 1. Core rule

Laravel owns project state and approvals. AI may assist with repeatable work, but it does not need to run inside the platform.

**MVP execution model:** Laravel creates a discovery run from a submitted intake snapshot, prepares a prompt, and validates the structured result pasted back by the studio operator. ChatGPT, Claude, or another AI application performs the model work outside the platform. Provider APIs and queued agent execution are future optimizations, not MVP requirements.

## 2. Current skill vs future roles

The current MVP runs **one manual Discovery Strategist workflow** through ChatGPT or Claude. It is not a fleet of autonomous agents.

Potential later skills (not a build backlog):
- Qualification / tier review.
- Content and conversion planning.
- Creative direction.
- Website implementation.
- Independent QA and release handover.

Only split these into separate skills when repeated delivery shows that one reusable master skill is insufficient. Do not create agent orchestration, queues or provider integrations just because the architecture could support them.

## 3. MVP discovery handoff

```text
Client submits intake
    |
Laravel snapshots the submitted version
    |
Create persisted discovery run
    |
Generate a reusable prompt from that snapshot
    |
Operator runs prompt in ChatGPT / Claude
    |
Operator pastes JSON result into the platform
    |
Laravel validates and saves the result
    |
Studio reviews and decides the next step
```

The advanced agent/queue lifecycle below is a future option. Do not implement it until manual delivery demonstrates a real bottleneck and there is budget for provider usage.

## 4. Workflow state

Run status:
- draft
- queued
- running
- waiting_for_approval
- paused
- completed
- failed
- cancelled

Step status:
- pending
- ready
- queued
- running
- waiting_for_approval
- completed
- failed
- skipped
- cancelled

Use an explicit transition service. Invalid transitions must be rejected and recorded.

## 5. Reliability requirements

For the current manual workflow:
- Persist the discovery run before the operator starts external AI work.
- Keep the run tied to an immutable submitted-intake snapshot and version.
- Validate required fields before marking the run completed.
- Keep the result and its source intake version available after refresh.
- Restrict discovery workspaces to studio staff.

For a future provider-integrated workflow, add bounded retries, idempotent jobs, provider error classification, usage tracking, and queue workers only when those capabilities are needed.

## 6. Structured outputs

The current manual Discovery Strategist returns one JSON object. Its exact prompt and server-side validation live together in `platform/app/Http/Controllers/ManualDiscoveryController.php`; update the prompt, validator, UI types and feature tests in the same change.

Required output groups:
- Business summary, business model, audience, website goal, conversion and recommended tier with rationale.
- Offer matrix: real options, variants, inclusions/exclusions, pricing logic, source and evidence status.
- Customer Question Map: question, supported answer or gap, purchase stage, `ANSWERED` / `GAP` / `NOT_APPLICABLE` status, source and owner/action.
- Buying Journey: customer need and website support at each stage.
- Fact register: material fact, exact source, evidence status, public-use approval and notes.
- CTA register: action, exact destination or `NOT_CONFIGURED`, destination status and expected behavior.
- Asset register: asset/need, owner/source, permission status, intended use and credits/restrictions.
- Trust register, content gaps, proposed sections, missing information, claims requiring approval, scope risks and one next step.

The output is evidence and a draft plan, not automatic approval. A correctly shaped JSON object can still contain unsupported or unapproved content; the studio must review the source, permission and publication status before it becomes public website copy. The AI suggests a tier; the studio approves it.

Keep this contract API-free. The operator copies the prompt into ChatGPT/Claude and pastes the resulting JSON back into the workspace.

## 7. Tool permissions

Tools are registered by capability and stage. Example:
- Intake Guide: read/write current intake draft only.
- Discovery Strategist: read approved intake and create discovery artifact.
- Content Strategist: read approved brief and create copy drafts.
- Website Builder: access only the assigned client repository and working branch.
- QA Reviewer: read preview/build evidence and create findings.

No agent gets unrestricted database access, arbitrary shell, provider secrets, DNS, payment, or production deployment authority.

## 8. Human review as product feature

The review experience should show:
- What the agent was asked to do.
- Which approved inputs it used.
- Structured result and artifacts.
- Missing facts and assumptions.
- Scope risks.
- Usage/cost summary for studio users.
- Approve / request changes / reject actions.

Do not display hidden chain-of-thought. Display concise rationale and evidence, not private internal reasoning.

## 9. Provider abstraction

Do not install or require a model SDK for the API-free MVP. If paid API integration is justified later, place it behind an application-owned provider interface so project workflows remain independent of a single model vendor.

An application subscription and a provider API account are separate products. This MVP deliberately uses the AI application's normal interface, so no provider API credential or API budget is needed.
