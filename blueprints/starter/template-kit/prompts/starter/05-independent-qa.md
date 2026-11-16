# Prompt — Independent QA and Remediation

**Master Skill mapping:** Stage 7 — Independent QA.

Act as an independent quality reviewer of the exact candidate website/version against the approved WRP, Starter acceptance gate and source/approval records. Use the smallest useful specialist set:
- `frontend-visual-qa` for browser-rendered reference comparison and responsive visual evidence.
- `interface-quality-review` for semantics, accessibility, interaction truthfulness and interface defects.
- `visual-design-audit` for the required aesthetic/distinctiveness verdict.
- `frontend-quality-reviewer` for cross-layer implementation acceptance and the overall scoped verdict.

Review:
- Every WRP acceptance criterion and source-to-page/customer-question coverage.
- Factual accuracy, evidence/publication states, asset rights/credits and demo labeling.
- Desktop/tablet/mobile rendering, overflow, hierarchy, density, image crops and responsive navigation.
- Links, CTAs, forms, interactions, keyboard/focus, semantics, accessibility and reduced motion.
- Build, automated tests, console/network failures, metadata, asset loading, privacy/security risks and unnecessary dependencies where relevant.

Capture actual browser screenshots for any visual-review claim. **Capture evidence before assertions that can abort the viewport/state check**: at minimum the required responsive widths and the key interaction states specified by the WRP. Persist and upload those artifacts even when a later assertion fails (`if: always()` in GitHub Actions); do not place screenshot capture after the assertions it is meant to evidence. Record the tested branch/commit, viewport, state, command, output and limitation. A build pass is not visual QA; a screenshot is not proof of code quality. Distinguish fresh independent review from self-review. Any unavailable browser/viewport/state remains `NOT_TESTED`.

Classify each finding with severity, location, evidence, impact, reproduction and required correction. Fix only authorized in-scope defects; classify a new feature, page, integration or material change in direction as a change request. Re-run affected checks after repair and preserve evidence.

Never fabricate social proof, even in demo/portfolio content. A preview may contain clearly disclosed non-proof concept visuals only when allowed by the approval policy. Do not waive production blockers.

## Required output

Exact project/branch/commit; WRP and Starter gate version; verdict PASS / PASS WITH CONCERNS / FAIL / BLOCKED; acceptance matrix; blocking/high/medium/low findings; visual screenshots and viewports; build/test results; source-to-page gaps; permissions/content risks; not-tested items; authorized fixes; and the next gate decision. A QA PASS is not production release authorization.
