## Updated operating model (2026-11-18)

The canonical Studio is API-free and designed for free-tier operation. Default user experience is one ChatGPT standard conversation with GitHub. Codex, Antigravity, Muse, Claude and other agents are optional adapters. No paid model API, API key, Laravel service or vendor-specific hook is mandatory.

The repository-native contract under .studio/ and scripts/ is the canonical workflow mechanism. Follow AGENTS.md and docs/REPO_NATIVE_WORKFLOW_ENFORCEMENT_v1.0.md. Stage status is derived from validated artifacts, dependencies, checksums and approvals; never trust an agent-written PASS field. Every stage output must match an artifact ID and carry version, path, SHA-256, SUBMITTED status and timestamp. Approval binds exact artifact versions and hashes; artifact changes invalidate previous approval bindings. Preview and production are separate.

Node.js 20+ built-ins are used; no npm install or API keys. GitHub Actions runs repeatable validators. Agent-specific hooks are optional additions only. The Laravel application under platform/ is a preserved prototype and must not be deleted as part of this work. Keep per-client sources and website repositories isolated. Do not fabricate client claims, rights, approvals or QA evidence. Never claim unexecuted checks. One focused PR per tranche; do not merge without owner approval.
