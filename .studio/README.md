Repository-native workflow runtime

- workflow.contract.json: machine-readable Entry, Stage 0-9, artifacts, dependencies, G0-G7 and modes.
- project-state.template.json: copy into a private client project as .studio/project-state.json.
- project-state.schema.json: state shape; stage statuses are not writable.

Requires Node.js 20+. Built-ins only; no Laravel service, npm install, API key or paid AI API. Submitted artifacts require path, version, timestamp and SHA-256. Approval records bind exact artifact versions/hashes. Preview-only Stage 8 is NOT_APPLICABLE; production Stage 8 requires G4/G5/G6 and completion G7.

Commands (from client project root):
node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs status
node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs validate
node /path/to/ai-operated-web-studio/scripts/workflow-enforcement.mjs can-start --stage stage-05
