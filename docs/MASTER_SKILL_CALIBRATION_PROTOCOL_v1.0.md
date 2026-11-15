# Master Skill Calibration Protocol v1.0

**Status:** Required Studio operating protocol  
**Scope:** Starter production, controlled experiments, reusable skills, blueprint rules and QA standards  
**Purpose:** Improve the correct layer using evidence, without expanding client input or creating endless prompt-revision cycles.

## Core principle

A website is the output of several connected layers:

**Client material and approved facts → Master Skill / specialist reasoning → blueprint and implementation → rendered website and QA evidence.**

When an output is wrong, first identify which layer caused it. Do not automatically change the client brief, rewrite the Master Skill, add a platform feature or regenerate the whole website.

## 1. Capture the finding

For every material issue, record:

- Expected result and the acceptance rule/source that defines it.
- Actual result, exact repository/branch/commit and reproduction steps.
- Screenshot, browser test, build log, source locator or other evidence.
- Severity and impact on customer comprehension, conversion integrity, design, accessibility, maintainability or release readiness.
- Whether the finding is confirmed, suspected or not reproducible.

A subjective preference without a reproducible user/business impact may be recorded as a design observation, but must not be represented as a proven defect.

## 2. Classify the primary cause

| Cause | Use when | Corrective layer |
|---|---|---|
| **INPUT / SOURCE** | Material client facts are missing, contradictory, inaccurate, stale, inaccessible or not sufficiently traceable; or an asset's owner, rights or intended use are unclear | Interview follow-up, source inventory, normalization, fact/asset register or clarification triage |
| **MASTER SKILL / REASONING** | Adequate source material exists, but the orchestrator or specialist reasoning chooses the wrong visitor task, business interpretation, tier, information architecture, content priority, design direction or approval decision | Master Skill, specialist skill, routing or stage/output contract |
| **IMPLEMENTATION / QA** | The approved brief and design/behavior decisions are sound, but the website, blueprint, component, stylesheet, data mapping, browser test, CI workflow or evidence capture does not implement/verify them correctly | Website code, canonical blueprint, test, build workflow or implementation standard |

**External / approval dependency:** distinguish missing client authorization, vendor outages, unavailable endpoints, third-party costs or owner decisions from internal defects. Record the dependency and safe fallback; do not misclassify it to justify changing a different layer.

A finding may contain multiple causes. Split it into atomic findings, each with one primary correction target.

## 3. Verify the root cause

Before editing:

1. Revisit the raw material and source locator, not only the AI summary.
2. Check whether the approved brief already contained the fact or instruction.
3. Check the exact Master Skill/specialist instruction active during the run.
4. Inspect the source code and actual rendered state at the tested commit.
5. Determine whether the failing test is exposing a product defect, a test-locator/setup defect or missing evidence.

Do not infer that a failure belongs to the latest modified file. Trace it to the layer that owns the decision or behavior.

## 4. Make the smallest correction

- Input issue: ask only the material clarification needed; preserve uncertainty and source provenance.
- Reasoning issue: adjust the responsible instruction/output contract; do not ask the client to specify CSS, breakpoints, code or implementation decisions.
- Implementation issue: fix the code/blueprint/test/workflow at its owner; do not change business facts or add prompt complexity to hide a code defect.
- Approval/dependency: keep the preview safe where possible, disclose the blocker and record owner/action.

Preserve existing client-facing scope and avoid new dependencies unless the evidence shows they are necessary.

## 5. Re-test and prove generality

Every correction must:

- Re-run the exact failing scenario.
- Pass relevant unit, build, browser, responsive, visual or content regressions.
- Record the tested commit SHA and actual test scope.
- Retain PASS / FAIL / NOT TESTED distinctions. A Chromium result is not Firefox/WebKit, a contrast sample is not a complete WCAG audit, and a synthetic fixture is not real-client validation.
- For a cross-category rule, be checked against at least one materially different category. Use source-backed scenarios or existing experiment evidence where possible; do not create another full pilot without a demonstrated need.
- Confirm that the fix did not increase client intake burden, invent facts, weaken consent/approval controls, create cross-project contamination or degrade a previously accepted category.

A single-category improvement remains a candidate until its generality is checked.

## 6. Record the decision

Use docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md.

Allowed decisions:

- **RETAIN** — correction is verified and reusable within the stated scope.
- **REVISE** — evidence shows the correction helps but needs a narrower rule or additional safeguards.
- **REJECT** — evidence does not support the change or it causes unacceptable regression.
- **NOT YET PROVEN** — insufficient evidence; keep the finding open without presenting a hypothesis as a standard.

Promote accepted reusable changes through a versioned candidate and owner review. Preserve prior versions and provenance. Never silently change approved client facts or raw material.

## 7. Convergence and stop rules

- Do not revise prompts just because a result could be made stylistically different.
- Do not regenerate the whole site when a focused correction preserves a sound baseline. Prefer **Base → Refine → QA**.
- Do not add an intake field unless a recurring material source gap demonstrates that the interview/material-first workflow cannot resolve it.
- Do not add platform/backend/API dependencies to solve a workflow that can be handled with a prompt, skill or simple static test.
- Stop when the original failure is fixed, acceptance evidence passes and no new material regression is found.

The objective is a more reliable production system, not more artifacts, longer prompts or more complicated client processes.