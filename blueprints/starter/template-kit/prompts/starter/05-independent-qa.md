# Prompt — Independent Website QA and Acceptance

**Master Skill mapping:** Stage 7 — independent QA.

Review the exact candidate branch/commit against the approved WRP, design pack, source/approval records and Starter acceptance gate. The purpose is to decide whether the result is actually good enough, not merely whether it runs.

## Use the smallest independent reviewer set

- Always run `visual-design-audit` for the aesthetic verdict.
- Always run one overall `frontend-quality-reviewer` acceptance pass in a fresh context where available.
- Use `frontend-visual-qa` when a visual specification/reference needs browser-fidelity comparison.
- Use `interface-quality-review` when the changed surface includes interaction, semantics, accessibility, forms or responsive behavior.
- Do not activate all four specialists mechanically. Record the reviewer/context and disclose self-review when a fresh reviewer is unavailable.

## Acceptance dimensions — keep verdicts separate

### A. Aesthetic quality (hard gate)

Capture real rendered screenshots at desktop, tablet and mobile. Compare the exact candidate against:
1. Its approved design pack.
2. At least two recent Studio websites/experiments, including the closest category match where available.

Record one explicit verdict:
- `DISTINCTIVE` — strong business-specific composition and visual grammar; not mistaken for a re-skin.
- `COMPETENT BUT GENERIC` — coherent and usable, but relies too heavily on familiar or repeated template patterns.
- `DERIVATIVE` — primarily a re-skin or near-copy of previous Studio work.
- `NOT TESTED` — required rendered or cross-project evidence is unavailable.

Only `DISTINCTIVE` passes the default aesthetic gate. `COMPETENT BUT GENERIC` and `DERIVATIVE` require a focused redesign. `NOT TESTED` means the aesthetic gate is BLOCKED; it must never be silently treated as a pass.

Do not award `DISTINCTIVE` because the palette, font or hero illustration changed. Judge macro-composition, hierarchy, section rhythm, imagery, typography, density, interaction grammar and signature moments.

### B. Business and content completeness

- Verify every material customer question against the rendered page and canonical Source-to-Page records.
- Check facts, prices, claims, permissions, publication states, CTA destinations and actual post-click behavior.
- Distinguish PUBLISHED, PREVIEW_ONLY, GAP and NOT_APPLICABLE. Preview-only content never counts as production-published.
- No fake testimonials, metrics, ratings, credentials, promises, bookings, storage or success states.

### C. Functional and technical quality

- Run the actual build and project tests on the exact candidate commit.
- Check navigation, links, CTAs, controls, empty/error/unavailable states and keyboard behavior where relevant.
- Check responsive layout, overflow, asset loading/crops, focus, semantics, contrast, reduced motion, console/network errors and basic performance as scoped.
- Record each check PASS / FAIL / NOT TESTED. A build pass is not visual QA; screenshots are not proof of code quality.

## Findings and remediation

For each issue record severity, exact location, evidence, user/business impact, reproduction and one concrete correction. Group related findings into bounded correction slices. Fix only authorized in-scope defects; new features or a major change in direction are change requests. Re-run only affected tests after each correction and retain before/after evidence.

## Overall verdict

Return separate verdicts for:
- Aesthetic gate.
- Business/content completeness.
- Functional/technical acceptance.
- Overall candidate: PASS / PASS WITH CONCERNS / FAIL / BLOCKED.

The overall candidate cannot be PASS while the aesthetic gate is GENERIC, DERIVATIVE or NOT TESTED, or while a critical factual/conversion/technical blocker remains.

## Required report

Exact project/branch/commit; WRP/design-pack versions; reviewer/context; aesthetic verdict and side-by-side screenshots; business coverage matrix; functional/technical evidence; findings by severity; fixes and retest results; NOT TESTED areas; owner decision required; next gate.

Never fabricate social proof, including in demo/portfolio content. A QA PASS is not production release authorization.
