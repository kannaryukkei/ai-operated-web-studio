# ADR-002 — Persisted Workflow Orchestration

- **Status:** Accepted
- **Decision date:** 2026-11-13

## Context
AI tasks can take time, fail, require retry, produce artifacts, and wait for human approval. A single long-lived agent call or an in-memory conversation cannot safely represent project progress.

## Decision
Represent every AI workflow as persisted workflow runs and steps. Use Laravel queues for execution. Laravel owns the canonical state machine, dependencies, retry rules, approval gates, and audit events. Agents return structured, schema-validated outputs and cannot change canonical project state directly.

## Consequences
- Runs can survive browser refreshes, worker retries, and application restarts.
- Studio can inspect progress and errors.
- Human approvals can pause and resume the workflow.
- More initial database design is required.
- Irreversible external side effects require idempotency and explicit approval.

## References
- https://laravel.com/framework/docs/13.x/queues
