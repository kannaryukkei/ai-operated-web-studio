# ADR-002 — Persisted Workflow Orchestration (historical)

- **Status:** Superseded by ADR-003 for the canonical Studio workflow.
- **Decision date:** 2026-11-13

The original decision represented AI tasks as persisted workflow runs and steps, using Laravel queues to own workflow state, dependencies, retry rules, approvals and audit events. This remains historical context for the Laravel platform prototype.

ADR-003 records the later owner direction: repository-native, agent-neutral, API-free workflow enforcement with ChatGPT + GitHub as the default conversation interface. Laravel is no longer a required workflow runtime. Do not delete `platform/` as part of this tranche; keep it preserved until a separate retirement decision.
