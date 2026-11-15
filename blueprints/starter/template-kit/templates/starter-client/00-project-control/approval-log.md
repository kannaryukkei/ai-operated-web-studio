# Approval Log

One row represents one distinct decision. Record the exact artifact/version, authorized person, decision, timestamp and durable evidence. Silence, a passing test or a status-board transition is never approval. See `docs/APPROVAL_AND_RELEASE_POLICY_v1.0.md`.

| approval_id | Gate | approval_type | subject_and_scope | artifact_ref_and_version | requested_from | decision | decided_by | decided_at | evidence_reference | conditions_or_notes | supersedes_approval_id |
|---|---|---|---|---|---|---|---|---|---|---|
| APR-0001 | G0 | FACT_CONFIRMATION | | | | PENDING | | | | | |
| APR-0002 | G0 | ASSET_PERMISSION / CTA_DESTINATION / PUBLICATION_APPROVAL | | | | PENDING | | | | | |
| APR-0003 | G1 | TIER_SCOPE_COMMERCIAL | | | | PENDING | | | | | |
| APR-0004 | G2 | WRP_DESIGN_GATE | | | | PENDING | | | | | |
| APR-0005 | G3 | CONTENT / DESIGN_DIRECTION | | | | PENDING | | | | | |
| APR-0006 | G4 | PREVIEW_ACCEPTANCE | | | | PENDING | | | | | |
| APR-0007 | G5 | PRODUCTION_READINESS | | | | PENDING | | | | | |
| APR-0008 | G6 | PRODUCTION_RELEASE / PAID_SPEND / DOMAIN_DNS | | | | PENDING | | | | | |
| APR-0009 | G7 | HANDOVER | | | | PENDING | | | | | |

**Decision values:** `APPROVED` / `CHANGES_REQUESTED` / `REJECTED` / `NOT_APPLICABLE`. A pending request has no decision yet; do not write PENDING as if it were an approved decision.

**Release states (separate from gate decisions):** `PREVIEW_READY` → `PREVIEW_ACCEPTED` → `PRODUCTION_READY` → `RELEASE_AUTHORIZED` → `RELEASED` → `HANDED_OVER`.

One person may hold multiple roles in a small studio, but the authority attached to each decision must remain explicit.
