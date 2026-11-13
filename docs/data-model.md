# Data Model — Initial Domain Entities

This is a conceptual model for the first migrations. Final columns and indexes are defined during implementation.

## 1. Identity and client ownership

### users
- id, name, email, password hash, email_verified_at, timestamps.
- Roles are assigned through a controlled role mechanism; do not trust a role submitted by the browser.

### client_accounts
- id, business_name, slug, business_category, website, contact fields, profile_status, timestamps.

### client_account_user
- client_account_id, user_id, membership_role, created_at.
- Defines which client users belong to which business account.

The platform initially serves one studio and multiple client accounts. It is not yet multi-agency SaaS. Keep ownership boundaries explicit so a future studio-tenant model can be added without making the MVP complex.

## 2. Projects

### projects
- id, client_account_id, created_by, product_tier, status, name, objective, target_launch_date, current_stage, next_action, next_action_owner, timestamps.
- Index client_account_id, status, product_tier.
- Project access must be checked through policies/membership, never by opaque IDs alone.

### project_members
- project_id, user_id, role, timestamps.

### project_intakes
- id, project_id, version, submitted_by, structured_payload JSON, submitted_at, status.
- Keep submitted snapshots immutable; corrections create a new version.

### project_scopes
- id, project_id, version, scope_json, exclusions_json, commercial_status, approved_by, approved_at.
- Price/payment details are visible only to authorized studio roles and relevant client approvers.

## 3. Workflow state

### workflow_runs
- id, project_id, workflow_key, workflow_version, status, current_step_key, started_at, completed_at, created_by, context_snapshot JSON, timestamps.

### workflow_steps
- id, workflow_run_id, step_key, order, status, attempt_count, max_attempts, input_snapshot JSON, output_artifact_id nullable, queued_at, started_at, completed_at, failed_at, error_code, safe_error_message, timestamps.
- Unique key on workflow_run_id + step_key.
- State changes must be validated by a transition service.

Workflow definitions are versioned in application code/config first. A run snapshots its workflow version, so future changes do not silently alter a project already in progress.

## 4. AI execution and artifacts

### ai_runs
- id, project_id, workflow_step_id nullable, agent_key, prompt_version, provider, model, status, input_hash, structured_output JSON nullable, safe_error_message nullable, input_tokens nullable, output_tokens nullable, estimated_cost nullable, started_at, completed_at, timestamps.
- Do not store hidden chain-of-thought. Store task inputs needed for audit, structured outputs, tool calls/results that are safe to retain, and concise execution summaries.

### ai_tool_calls
- id, ai_run_id, tool_key, input_summary JSON, result_summary JSON nullable, status, duration_ms, timestamps.
- Never persist credentials or sensitive secrets in tool inputs/results.

### artifacts
- id, project_id, workflow_step_id nullable, type, title, version, storage_disk, storage_path, mime_type, visibility, created_by_type, created_by_id, metadata JSON, created_at.
- Visibility values include internal-only, client-review, and approved.
- Store file metadata and access control; use private storage and signed downloads.

## 5. Collaboration and approval

### conversations
- id, project_id, channel, visibility, created_at.

### messages
- id, conversation_id, sender_type, sender_id nullable, message_type, body, metadata JSON, created_at.
- Client-visible conversation and internal studio notes must be separated by authorization and visibility.

### approval_requests
- id, project_id, artifact_id nullable, gate_key, status, requested_from_user_id, requested_by_user_id, due_at, decided_at, timestamps.

### approval_decisions
- id, approval_request_id, decided_by_user_id, decision, comment, artifact_version, created_at.
- Approval is explicit. Silence or elapsed due date never becomes approval.

### revision_requests
- id, project_id, artifact_id nullable, submitted_by_user_id, category, description, reference_url nullable, status, resolution_summary nullable, timestamps.
- Categories distinguish defect, included revision, and change request.

## 6. Operations and audit

### activity_events
- id, project_id nullable, actor_type, actor_id nullable, event_key, summary, properties JSON, occurred_at.
- Append-only audit trail for meaningful actions.

### usage_records
- id, project_id nullable, ai_run_id nullable, provider, model, usage_type, quantity, unit, estimated_cost, currency, occurred_at.
- Used for budget tracking and project economics. Do not expose internal cost to clients by default.

### deployments (later MVP+)
- id, project_id, repository_reference, commit_sha, environment, deployment_url, status, initiated_by, approved_by nullable, deployed_at, metadata JSON.

## 7. Relationship overview

- Client account has many users and projects.
- Project belongs to one client account and has many members, intake versions, scopes, workflow runs, AI runs, artifacts, conversations, approval requests, revision requests, activity events, usage records, and deployments.
- Workflow run has many workflow steps.
- AI run may belong to one workflow step and produce artifacts/tool-call records.
- Approval request targets an artifact version or project gate and has explicit decisions.

## 8. Data principles

- Client projects are isolated at query and policy level.
- Intake and scope approval versions are immutable snapshots.
- AI runs and workflow transitions are inspectable.
- Files are private by default.
- Store only information needed to deliver the website.
- Sensitive commercial data and provider costs are restricted.
- Retention and deletion policy must be decided before public production launch.
