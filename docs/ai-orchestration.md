# AI Orchestration and Agent Design

## 1. Core rule

AI performs tasks; Laravel owns the workflow.

Agents do not decide canonical project status, bypass approvals, or execute unrestricted tools. Laravel schedules jobs, passes the minimum approved context, validates structured results, stores artifacts, updates state, and determines the next eligible action.

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

Start with Intake Guide + Qualification + Discovery Strategist only. Other agents are future stages.

## 3. Orchestration lifecycle

```text
Project event
    |
Create workflow_run + workflow_steps
    |
Queue eligible step
    |
Load approved project context
    |
Create ai_run record
    |
Call agent with scoped tools
    |
Validate structured output
    |
Persist output artifact + usage + tool logs
    |
Update workflow_step state
    |
Does next step require human approval?
    | yes                         | no
Create approval request           Queue next eligible step
    |                              |
Wait for explicit decision        Continue workflow
    |
Approved -> continue
Changes requested -> revise / rerun approved step
Rejected -> pause / close / escalate
```

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

- Persist every run and step before dispatching a job.
- Jobs must be idempotent; use a stable step/run identifier and idempotency key.
- Retry only transient errors, with a bounded attempt count and backoff.
- Distinguish retryable provider/network errors from validation or policy failures.
- Support cancel, pause, resume, and safe retry.
- Never repeat irreversible tool actions on a retry without checking whether the action already occurred.
- Store provider/model, prompt version, input hash, structured output, safe logs, usage, timestamps, and error summary.
- Keep project context snapshots versioned; do not let a changed client brief silently rewrite the context of a run already executing.
- Use queued workers for long AI tasks.

Laravel queues support asynchronous jobs, chaining, and batching. Use those capabilities with persisted workflow records rather than treating a queue chain as the only source of truth: https://laravel.com/framework/docs/13.x/queues.

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

Use Laravel AI SDK as the initial implementation, but wrap it behind an application-owned AI gateway/agent contract. Store provider and model per run. This keeps project/workflow logic independent of a single model vendor and supports mock agents in tests.

AI provider credentials are server-side environment secrets. ChatGPT subscription access is not itself an API credential; production AI calls require a separately configured provider/API account and budget.
