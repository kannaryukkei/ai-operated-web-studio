Node.js 20+; no install or model API required. ChatGPT conversation + GitHub is the default. Codex, Antigravity, Muse and other agents are optional; all use this same workflow contract.

Before acting: inspect the canonical project state and contract, operate only on the active stage, submit its required artifacts and run validation. Stage status is derived and must never be written by an agent. Never bypass approvals, fake evidence, overwrite source records, or treat 'gas' as approval.

Do not modify the contract, validator, tests or CI as part of ordinary client production. Keep private client materials in isolated project repositories. Laravel under platform/ is preserved as a prototype and is not a required workflow runtime.

Honest boundary: validation checks artifact files, paths, hashes, dependencies and declared approvals, but cannot cryptographically authenticate a conversational approver. GitHub Actions on a GitHub Free private repository is repeatable evidence, not an unbypassable merge lock. A standard ChatGPT GitHub connector may be read-only; do not claim a write or local command succeeded unless actually available and verified.