## ADR-003 — Repository-native, agent-neutral workflow enforcement

- Status: Accepted for implementation by owner direction, 2026-11-18.
- Supersedes: ADR-002 as the mandatory workflow-runtime decision. ADR-002 remains historical context for the preserved Laravel prototype.

Decision: keep the user experience in one conversation; default to ChatGPT standard conversation + GitHub; keep Codex, Antigravity, Muse and other agents optional. Use repository-based project artifacts and a machine-readable Stage 0-9 contract. Node.js built-in validators and GitHub Actions enforce deterministic artifact, hash, dependency and gate checks without API keys or paid model APIs. Stage states are derived, never trusted from AI-written fields. Approvals bind exact artifact versions and hashes. Preview-only and production have separate routes. Keep Laravel as a preserved prototype, not a required runtime. Optional agent hooks are supplementary only.

Limits: approval records do not cryptographically authenticate a conversational human; GitHub Actions is not a tamper-proof merge lock for GitHub Free private repositories; connector write capabilities vary. Never claim a check or write that was not actually executed and verified.
