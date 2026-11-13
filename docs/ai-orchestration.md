# AI Orchestration and Agent Design

## 1. Core rule

Laravel owns project state and approvals. AI may assist with repeatable work, but it does not need to run inside the platform.

**MVP execution model:** Laravel creates a discovery run from a submitted intake snapshot, prepares a prompt, and validates the structured result pasted back by the studio operator. ChatGPT, Claude, or another AI application performs the model work outside the platform. Provider APIs and queued agent execution are future optimizations, not MVP requirements.

## 2. Agent roster

| Agent | Responsibility | Output |
|---|---|---|
| Intake Guide | Help client provide complete business information | Structured intake + missing questions |
| Qualification | Recommend Starter / Business / Custom and flag complexity | Tier-fit report |
| Discovery Strategist | Turn intake into a client-ready discovery brief | Structured brief |
| Proposal Drafter | Draft scope, exclusions, assumptions, and proposal | Proposal draft |
| Content Strategist | Plan sections, messaging, CTA, FAQ, metadata | Content plan/copy artifacts |
| Creative Director | Art direction, design tokens, reference analysis, visual prompts | Creative brief/assets |
| Website Builder | Implement approved scope in isolated website repository | Code branch/PR/preview |
| QA Reviewer | Independently inspect functionality, content, and responsiveness | QA report |
| Revision Analyst | Classify client feedback and plan in-scope changes | Revision plan |
| Release Assistant | Prepare launch and handover | Release/handover pack |

Start with a reusable Discovery Strategist prompt operated through an external AI application. Other skills are added only when a real delivery workflow needs them.

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

Every agent must return schema-validated output. Example discovery brief:

```json
{
  "business_summary": "string",
  "primary_audience": ["string"],
  "website_goal": "string",
  "primary_conversion": "string",
  "recommended_tier": "starter|business|custom",
  "recommendation_rationale": ["string"],
  "sections": [
    {
      "key": "hero",
      "purpose": "string",
      "visitor_question": "string",
      "draft_message": "string"
    }
  ],
  "missing_information": ["string"],
  "claims_requiring_approval": ["string"],
  "scope_risks": ["string"],
  "next_step": "string"
}
```

The AI may suggest a tier; the studio approves it.

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
