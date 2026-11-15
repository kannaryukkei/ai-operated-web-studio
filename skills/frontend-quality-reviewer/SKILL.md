---
name: frontend-quality-reviewer
description: 'Independently review completed frontend code and visual evidence against the approved specification, business scope and project standards. Return a pass/concerns/fail verdict without silently fixing findings.'
license: Apache-2.0; see skills/upstream/webdev-agent-kit/LICENSE
metadata:
  author: OpenAI Operated Web Studio (adapted from ytvee-dev/webdev-agent-kit)
  upstream: https://github.com/ytvee-dev/webdev-agent-kit/tree/170504cdabf24269e62fca3009229750351ac3cf/skills/frontend-quality-reviewer
  upstream-commit: 170504cdabf24269e62fca3009229750351ac3cf
  adaptation: studio-specific
---

# Frontend Quality Reviewer

## Purpose

Act as an independent reviewer of a completed website implementation. Judge whether the code and rendered result satisfy the approved Design Implementation Spec, visitor tasks, business facts, quality standards and verification evidence.

This skill is the acceptance judge, not a second implementer. It must not turn a review request into an unapproved rewrite.

## When to use

- After the planned website implementation is complete.
- Before owner visual review or a release recommendation.
- After a substantial implementation/refinement cycle.
- When the user requests a code, UX, accessibility, performance or quality audit.
- When a bounded implementation loop requires an independent acceptance decision.

## Do not use when

- The user asks only for implementation; use frontend-layout-implementer.
- Only rendered screenshot comparison is requested; use frontend-visual-qa.
- No approved scope/spec or relevant implementation evidence exists. Identify the missing basis instead of inventing acceptance criteria.

## Required context

1. Approved Client Brief, business fact register and approved scope.
2. Design Implementation Spec / visual direction and asset register.
3. Planned implementation slices and acceptance criteria, if present.
4. Actual changed files/diff and base/head commits.
5. Build, lint, automated test and browser evidence.
6. Visual QA mismatch ledger and screenshots, when UI is in scope.
7. Release and external-action restrictions.

## Review principles

- Preserve the approved brief, scope, visual direction and owner decisions as the authority.
- Separate a functional pass from visual fidelity, business completeness and release readiness.
- Verify claims against source code, executable output or rendered evidence; an implementer's summary is not proof.
- Keep factual integrity, content/asset permissions, honest CTAs and public/private contact separation in scope.
- Do not treat a strong screenshot as proof of code quality, accessibility, performance or business completeness.
- Do not treat a green build as proof of visual quality.
- Mark unsupported or unavailable verification NOT TESTED or BLOCKED; never silently downgrade the acceptance standard.

## Workflow

1. **Pin review scope.** Record repository, branch, base commit, head commit and changed files. For uncommitted work, record the exact working-tree scope.
2. **Read acceptance criteria first.** Map each requirement to evidence; do not invent new criteria mid-review.
3. **Inspect the change.** Review diff, component boundaries, semantic markup, data flow, styles, assets, interactions and configuration.
4. **Check project fit.** Confirm the implementation preserves the existing stack, dependencies, file ownership and build conventions.
5. **Check design fidelity.** Compare each major region against the approved implementation spec and visual QA evidence. Do not replace the approved direction with personal preference.
6. **Check visitor outcomes.** Can the target visitor understand the offer, find important information, compare options and take the correct action?
7. **Check factual and interaction integrity.** Verify prices, offers, public details, asset permissions and claims against the source. Verify that every apparent control works and no fake CTA/booking/payment/confirmation exists.
8. **Check code quality.** Review decomposition, reuse, naming, CSS ownership/specificity, responsive rules, maintainability and unnecessary complexity.
9. **Check interface quality.** Review semantic HTML, keyboard access, focus, accessible names, contrast, reduced motion, image alt/crop, forms and state handling where applicable.
10. **Check performance/security only where material.** Review avoidable large assets, loading behavior, unsafe HTML, external inputs, secrets, redirects and data handling when they exist. Do not claim a full security/performance audit from a source skim.
11. **Inspect verification evidence.** Reuse valid matching evidence. Rerun only when code/state changed, evidence is stale/missing or a concrete failure needs reproduction. Never call a Playwright build log a visual screenshot.
12. **Record findings.** Each required finding includes severity, file/line or viewport, evidence, user/business impact and required correction.
13. **Return a verdict.** Do not apply fixes unless the user explicitly requested review-and-fix. Route corrections to frontend-layout-implementer and re-review only changed scope.

## Severity model

- BLOCKING — factual, security, conversion or functional failure that prevents safe/useful use.
- HIGH — major design-fidelity, customer-journey, responsive or maintainability failure.
- MEDIUM — material usability, accessibility or maintainability concern with a workaround.
- LOW — localized polish issue with limited impact.
- NIT — optional preference or minor consistency detail.
- PRAISE — strong implementation decision supported by evidence.

## Required output

```text
Review context: fresh-context | self-review
Scope:
Base → head:
Verdict: PASS | PASS WITH CONCERNS | FAIL | BLOCKED

Acceptance criteria:
- AC-01: PASS | FAIL | DEVIATION | BLOCKED — evidence

Blocking findings:
High findings:
Medium/low findings:
Optional improvements:
Design fidelity:
Business/content integrity:
Code/architecture:
Accessibility/responsive:
Build/lint/tests:
Browser visual QA:
Unknowns / NOT TESTED:
Praise:
Next action:
```

Use concise file/line or viewport references. Separate required fixes from optional improvements.

## Verdict rules

- PASS: all in-scope critical acceptance criteria are passed, no required fixes remain and verification supports the claims.
- PASS WITH CONCERNS: no blocking or high required fix remains, but documented limitations, medium/low findings or untested areas remain.
- FAIL: any blocking/high required issue remains, or a critical acceptance criterion fails.
- BLOCKED: the reviewer cannot inspect enough of the changed implementation or its acceptance basis to make a defensible judgment.

A verdict is scoped to the reviewed commit and evidence. It is not blanket production approval.

## Independence and segmentation

- Record whether the review used fresh context or is a self-review. A separate skill invocation alone does not create independence.
- When full delegated review is unavailable, state that honestly; do not call a self-review independent.
- For a large site, review by page/section slices but retain one final acceptance matrix.
- Review and report one bounded batch at a time when the diff is large. Save findings before continuing.
- Do not force repeated ceremony for unchanged evidence. Reopen only findings affected by a repair or material dependency.
- Do not extend the scope into unrelated refactoring or personal style preferences.

## Validation gates

- Every BLOCKING/HIGH finding cites concrete evidence.
- Every in-scope acceptance criterion has a named result.
- Design fidelity is assessed against the approved reference, not a subjective replacement direction.
- Functional build/test, rendered visual QA, business completeness and release readiness remain separate statuses.
- No fix is implemented during a review-only task.
- Unavailable browsers, viewports, states, cross-browser checks or real-device tests are explicitly listed as NOT TESTED.
- No final production/release approval is implied by a code-review PASS.
