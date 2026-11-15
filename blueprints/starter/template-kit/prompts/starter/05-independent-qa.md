# Prompt — Independent Website QA and Acceptance

**Master Skill mapping:** Stage 7 — independent QA.

## Run mode and entry conditions

- **CLIENT_PROJECT:** review the exact candidate branch/commit against the approved WRP, design pack, source/approval records and Starter acceptance gate.
- **INTERNAL_BENCHMARK:** the operator may authorize a retrospective audit of an existing synthetic/internal preview even when its WRP is DRAFT. Review the exact existing render/source; do not edit website code, invent missing approval, or infer production readiness. Business facts/assets remain DEMO_ONLY and preview-only.

If the target render/source or run authorization is missing, stop and state the blocker.

## Use the smallest independent reviewer set

- Always run `visual-design-audit` for the aesthetic verdict.
- Always run one overall `frontend-quality-reviewer` acceptance pass in a fresh context where available.
- Use `frontend-visual-qa` when a visual specification/reference needs browser-fidelity comparison.
- Use `interface-quality-review` when the changed surface includes interaction, semantics, accessibility, forms or responsive behavior.
- Do not activate all four specialists mechanically. Record the reviewer/context and disclose self-review when a fresh reviewer is unavailable.

## Acceptance dimensions — keep verdicts separate

### A. Aesthetic quality

Capture actual rendered screenshots at desktop, tablet and mobile.

Compare the current site with its approved design pack when one exists, and inspect at least two recent Studio design fingerprints/rendered references. Use rendered evidence where available; if only a prior fingerprint/document is available, state that limitation and do not invent what its screenshot looks like.

Return one verdict:
- `DISTINCTIVE` — strong business-specific composition and visual grammar; not mistaken for a re-skin.
- `COMPETENT BUT GENERIC` — coherent and usable, but relies too heavily on familiar or repeated template patterns.
- `DERIVATIVE` — primarily a re-skin or near-copy of previous Studio work.
- `NOT TESTED` — the current site's actual rendered output is unavailable or too incomplete to judge.

Aesthetic verdict is based on the actual current render. Separately record cross-project comparison coverage as `COMPLETE`, `PARTIAL` or `NOT_AVAILABLE`. Award `DISTINCTIVE` only when comparison coverage is complete enough to support that conclusion. A provisional `COMPETENT BUT GENERIC` or `DERIVATIVE` finding may be recorded from current-render evidence even when comparison coverage is partial, but the full distinctiveness gate remains unresolved.

Do not award `DISTINCTIVE` because the palette, font or hero illustration changed. Judge macro-composition, hierarchy, section rhythm, imagery, typography, density, interaction grammar and signature moments.

### B. Business and content completeness

- Verify each material customer question against the rendered page and canonical Source-to-Page records.
- Check facts, prices, claims, permissions, publication states, CTA destinations and actual post-click behavior.
- Distinguish PUBLISHED, PREVIEW_ONLY, GAP and NOT_APPLICABLE. Preview-only content never counts as production-published.
- No fake testimonials, metrics, ratings, credentials, promises, bookings, storage or success states.

### C. Functional and technical quality

- Run the actual build and project tests on the exact candidate commit when code changes or matching evidence is missing/stale.
- Check navigation, links, CTAs, controls, empty/error/unavailable states and keyboard behavior where relevant.
- Check responsive layout, overflow, asset loading/crops, focus, semantics, contrast, reduced motion, console/network errors and basic performance as scoped.
- Record each check PASS / FAIL / NOT TESTED. A build pass is not visual QA; screenshots are not proof of code quality.

## Findings and remediation

For each issue record severity, exact location, evidence, user/business impact, reproduction and one concrete correction. Group related findings into bounded correction slices. Fix only authorized in-scope defects; new features or a major change in direction are change requests. Re-run only affected tests after each correction and retain before/after evidence.

## Overall verdict

Return separate verdicts for:
- Aesthetic gate and cross-project comparison coverage.
- Business/content completeness.
- Functional/technical acceptance.
- Overall candidate: PASS / PASS WITH CONCERNS / FAIL / BLOCKED.

For `CLIENT_PROJECT`, the overall candidate cannot be PASS while the distinctiveness gate is unresolved or a critical factual/conversion/technical blocker remains.

For `INTERNAL_BENCHMARK`, provide a diagnostic verdict only. Never state that a production or client-approval gate passed.

## Required report

Run mode; exact project/branch/commit; WRP/design-pack versions; reviewer/context; aesthetic verdict and comparison coverage; side-by-side screenshots where available; business coverage matrix; functional/technical evidence; findings by severity; fixes/retest results; NOT TESTED areas; owner decision required; next checkpoint.

Never fabricate social proof, including in demo/portfolio content. A QA PASS is not production release authorization.
