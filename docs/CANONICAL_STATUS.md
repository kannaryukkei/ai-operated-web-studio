# Canonical Status

This is the short pointer to the current Studio rules. It is not a project tracker; the active website conversation owns project-specific decisions and next actions.

## Current operating model — 2026-11-18

**Conversation-first.** Each website project has one dedicated ChatGPT conversation as its working centre for context, source material, scope, decisions, implementation, QA and next actions. The AI owns routine design, engineering, tool and sequencing decisions. The owner is involved only for missing facts/materials, access, rights/permissions, meaningful commercial/scope decisions, explicit approvals and consequential external actions.

**GitHub stores code and useful deliverables, not project state.** Do not duplicate the conversation in dashboards, databases, issue trackers, workflow inboxes, project-state manifests, artifact registries or approval engines. Keep code isolation, PR review and real website-quality checks.

**Design-quality update adopted through PR #54.** Master Skill v1.14 is now canonical. It makes business-first design judgment, reference selection and repeated evidence-led visual critique/correction core Studio capabilities, with no arbitrary iteration cap. v1.13 is retained as the previous baseline.

**Optional ADES method — 2026-11-20.** `skills/ades-exploration-synthesis/SKILL.md` adds a compact design-exploration method beneath the existing Master Skill. Activate it only when comparing distinct visual hypotheses can materially improve the result. The default output is one synthesised website; exploration previews are limited, internal and excluded from production. It adds no project workflow, dashboard, paid API or mandatory artifact package.

**ADES Golden Sample:** Laundry Ceria Test 03, [PR #14](https://github.com/kannaryukkei/laundry-ceria-website/pull/14), branch `experiment/test-03-ades-exploration`, exact reference commit `f1fa930cb491b1b0318564afc03bfa767366e952`. The owner prefers the integrated design. [Run #246](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44647860683) succeeded with the shared gate at `PASS_WITH_MANUAL_REVIEW_REQUIRED` (zero reported typography, contrast and responsive failures; manual visual review remains required). PR #14 is still open/draft/unmerged, private and synthetic. Candidate pages remain under `public/ades/`; do not deploy this branch as-is.

## Operating modes

- `client_service`: default for real or ambiguous client work. Claims and facts must be supported by real sources; rights, permissions and approvals must be genuine. No fabricated client facts or social proof.
- `studio_development`: clearly labelled synthetic inputs and fictional scenarios are permitted for internal development and tests. No public release, real outreach, spending, DNS change or production deployment.
- Switching into client service requires replacing or independently verifying all synthetic facts, assets, permissions, contacts, pricing and proof. Privacy, security, licensing and third-party rights apply in both modes.

## Minimal context set

Read only these first; open a specialist skill or supporting reference when the task needs it:

1. `README.md`
2. `AI_BUILD_RULES.md`
3. `docs/CANONICAL_STATUS.md` (this file)
4. `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.14.md` (adopted via merged PR #54 on 2026-11-19; v1.13 remains preserved as the previous baseline)
5. `skills/README.md` and `skills/registry.md`
6. `blueprints/starter/README.md` when using the Starter reference
7. `skills/ades-exploration-synthesis/SKILL.md` only when meaningful design exploration is justified

## Active skills

- Material intake: `skills/client-material-ingestion/SKILL.md`
- UX: `skills/ux-review/SKILL.md`
- Design strategy and judgment: `skills/design-strategy-and-judgment/SKILL.md`
- Optional ADES exploration and synthesis: `skills/ades-exploration-synthesis/SKILL.md`
- Art direction: `skills/frontend-design/SKILL.md`
- Typography: `skills/typography-and-legibility/SKILL.md`
- Reference-to-code specification: `skills/design-screenshot-spec/SKILL.md`
- Implementation: `skills/frontend-layout-implementer/SKILL.md`
- Consolidated review: `skills/website-quality-review/SKILL.md`
- Media rights and optimization: `skills/media-sourcing-and-licensing/SKILL.md`
- Optional motion implementation: `skills/gsap-motion/SKILL.md`

Activate only the methods the current task needs. The consolidated review has separate AESTHETIC, VISUAL_FIDELITY, INTERFACE and ACCEPTANCE modes.

## Supporting references

These are optional, task-specific aids, not a mandatory artifact package:
- Client brief: `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md`
- Starter technical/product quality: `docs/STARTER_AUTOMATED_QUALITY_GATE_v1.0.md`, `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md`, `docs/STARTER_CONTENT_EVIDENCE_GATE_v1.0.md`
- Media: `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md`, `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`
- Website-quality benchmark: `docs/HOSTINGER_GOOD_WEBSITE_BENCHMARK_v1.0.md` (15 Hostinger qualities plus the source's Design, Functionality, Features, SEO and UX factors; conditional criteria remain N/A when irrelevant).
- Improvement: `docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md`, `docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md`
- Visual refinement: `docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.1.md` (iterative critique/fix loop; no preset round limit)
- Blueprint provenance and cross-pilot learning: `docs/BLUEPRINT_MIGRATION_DECISION.md`, `docs/EXPERIMENT_03_SYSTEM_LEARNINGS.md`, `blueprints/starter/KALA_PILOT_LEARNINGS.md`

## Architecture retirement

- PR #49: MERGED. Conversation-first and two-mode operating model adopted.
- PR #47: CLOSED WITHOUT MERGE. Repository-native workflow engine is rejected. Its old source branch remains as historical residue because the connected GitHub actions cannot delete a branch.
- PR #50: MERGED. Laravel platform, project dashboard/workspace application and platform-only docs were removed from the active tree. No `platform/` directory remains. The source remains in Git history.
- PR #51: MERGED. Obsolete workflow/schema/approval documents and superseded skill versions were removed; four reviewer skills were consolidated into one. The active specialist skill library remains.

## Repository and experiment decisions

- `ai-operated-web-studio`: KEEP as the canonical home for Master Skill, specialist skills, useful standards and proven blueprints; no dashboard/platform.
- `zacks-detailing`: KEEP as real business/site source and local-service reference.
- Experiment 01 — Teras Rindang: DELETE. Deletion is now verified: repository lookup returns 404 and repository search returns no match.
- Experiment 02 — Karsa Cycle Lab: KEEP as a standalone synthetic website repository, not as a Studio clone. [PR #1](https://github.com/kannaryukkei/web-studio-experiment-02-karsa-cycle-lab/pull/1) is MERGED; main now contains the website-only structure. GitHub Actions run #22 passed build and Playwright checks. Keep the mode as `studio_development`, with owner visual review pending and no public release.
- Experiment 03 — Semburat Bakehouse: KEEP as a standalone synthetic website. [Consolidation PR #10](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/pull/10) is open/draft, mergeable and CI-clean; run #44332438873 passed six Semburat Playwright suites and the canonical shared website-quality gate. The proposed tree removes an unrelated ZACKS Starter clone and copied AWOS skills/standards, retaining the Semburat website, source fixture and unique QA evidence. Stacked PRs #1–#6 were closed as superseded; their commits/branches remain as history. Do not publish the synthetic concept.
- Experiment 04 — ACFIX Studio: KEEP. Closed internal synthetic experiment; website source, project-specific acceptance tests, Chromium audit, and the canonical shared website-quality gate are on `main`. PRs #1 and #2 for shared-gate integration/deduplication are merged. Technical acceptance passed for the defined scope; release remains blocked, with full WCAG/assistive-tech, other browsers, physical devices and owner authorization untested.
- Experiment 05 — Star Point Garage: KEEP as a private synthetic benchmark. The validated website/evidence live on `experiment-05/media-local-cache` and related preserved baseline branches; `main` intentionally remains the initialization checkpoint to preserve experiment provenance. The local Pexels cache trial is explicitly rejected and those assets are excluded; the active site uses original SVG/CSS concept art. Source facts are public-source observations but owner-unverified. Do not merge to main, deploy or represent as official without owner authorization.
- Laundry Ceria / Experiment 06: KEEP as a private standalone synthetic website under `studio_development`. Child [PR #3](https://github.com/kannaryukkei/laundry-ceria-website/pull/3) was merged into parent [PR #1](https://github.com/kannaryukkei/laundry-ceria-website/pull/1), and parent PR #1 was subsequently merged into `main` at `4c80f7cd4b5e2c0d82adfe58805c94b9446751c2` on 2026-11-18 16:58:25 UTC. Exact-main push [run #44353365204](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44353365204) completed SUCCESS: install, typecheck, production build, Hero captures, A11Y-001/A11Y-002 and canonical shared gate all passed. Gate status is `PASS_WITH_MANUAL_REVIEW_REQUIRED`: 0 typography failures, 0 measurable contrast failures, 0 responsive failures, evidence manifest valid with zero candidates/errors, and 207 generated/image-backed Hero observations excluded for manual review. A bounded assistant self-review inspected exact-main full-page captures at 390/768/1440px and Hero captures at 640/720px; this is not independent Stage 7 acceptance or a complete nine-width visual review. Remaining: actual browser zoom at 200%, screen-reader/assistive-technology review, manual visual checks at 320/360/900/1024/1280px, review of the 207 excluded Hero observations, dependency lockfile/advisory review, and independent Stage 7 acceptance. The repository remains private, synthetic and demo-only; no deployment or public release is authorized.
- `web-studio-template-kit`: direct repo lookup returns 404 and it is absent from the current `kannaryukkei` repository inventory. This only confirms it is not accessible in this account's current inventory; do not infer that it is deleted from every possible owner/location.

The new dispositions supersede the 2026-11-17 blanket preserve-all decision for Experiment 01–05. Repository deletion/retirement is a separate operation from documentation cleanup.

## Remaining cleanup

- [x] Conversation-first two-mode policy adopted in PR #49.
- [x] PR #47 closed without merge.
- [x] Laravel platform retired in PR #50.
- [x] PR #51 skill/documentation cleanup merged.
- [x] Experiment 01 deleted; absence verified.
- [x] Experiment 02 converted to a standalone Karsa website repository; PR #1 merged.
- [ ] Review and merge Semburat consolidation PR #10 after owner review of the preview.
- [x] Laundry PR #1 merged to main; exact-main push run #44353365204 passes with the canonical gate's `PASS_WITH_MANUAL_REVIEW_REQUIRED` status. [ ] Complete actual 200% browser zoom, assistive-tech review, all remaining visual spot-checks, manual review of 207 excluded Hero observations, dependency lockfile/advisory review and independent Stage 7 acceptance. Keep Laundry Ceria private and demo-only; no public release.
- [ ] No further cleanup is presently required for ACFIX or Star Point Garage; retain their experiment provenance and release restrictions.
