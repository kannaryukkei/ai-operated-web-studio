# Canonical Status

This is the short pointer to the current Studio rules. It is not a project tracker; the active website conversation owns project-specific decisions and next actions.

## Current operating model — 2026-11-18

**Conversation-first.** Each website project has one dedicated ChatGPT conversation as its working centre for context, source material, scope, decisions, implementation, QA and next actions. The AI owns routine design, engineering, tool and sequencing decisions. The owner is involved only for missing facts/materials, access, rights/permissions, meaningful commercial/scope decisions, explicit approvals and consequential external actions.

**GitHub stores code and useful deliverables, not project state.** Do not duplicate the conversation in dashboards, databases, issue trackers, workflow inboxes, project-state manifests, artifact registries or approval engines. Keep code isolation, PR review and real website-quality checks.

## Operating modes

- `client_service`: default for real or ambiguous client work. Claims and facts must be supported by real sources; rights, permissions and approvals must be genuine. No fabricated client facts or social proof.
- `studio_development`: clearly labelled synthetic inputs and fictional scenarios are permitted for internal development and tests. No public release, real outreach, spending, DNS change or production deployment.
- Switching into client service requires replacing or independently verifying all synthetic facts, assets, permissions, contacts, pricing and proof. Privacy, security, licensing and third-party rights apply in both modes.

## Minimal context set

Read only these first; open a specialist skill or supporting reference when the task needs it:

1. `README.md`
2. `AI_BUILD_RULES.md`
3. `docs/CANONICAL_STATUS.md` (this file)
4. `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.13.md` (adopted via merged PR #49; v1.12 remains preserved as the previous baseline)
5. `skills/README.md` and `skills/registry.md`
6. `blueprints/starter/README.md` when using the Starter reference

## Active skills

- Material intake: `skills/client-material-ingestion/SKILL.md`
- UX: `skills/ux-review/SKILL.md`
- Art direction: `skills/frontend-design/SKILL.md`
- Typography: `skills/typography-and-legibility/SKILL.md`
- Reference-to-code specification: `skills/design-screenshot-spec/SKILL.md`
- Implementation: `skills/frontend-layout-implementer/SKILL.md`
- Consolidated review: `skills/website-quality-review/SKILL.md`
- Media rights and optimization: `skills/media-sourcing-and-licensing/SKILL.md`

Activate only the methods the current task needs. The consolidated review has separate AESTHETIC, VISUAL_FIDELITY, INTERFACE and ACCEPTANCE modes.

## Supporting references

These are optional, task-specific aids, not a mandatory artifact package:
- Client brief: `docs/CLIENT_WEBSITE_BRIEF_TEMPLATE_v2.1.md`
- Starter technical/product quality: `docs/STARTER_AUTOMATED_QUALITY_GATE_v1.0.md`, `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md`, `docs/STARTER_CONTENT_EVIDENCE_GATE_v1.0.md`
- Media: `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md`, `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`
- Improvement: `docs/MASTER_SKILL_CALIBRATION_PROTOCOL_v1.0.md`, `docs/EXPERIMENT_CALIBRATION_RECORD_TEMPLATE_v1.0.md`
- Visual refinement: `docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md`
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
- Laundry Ceria / Experiment 06: KEEP as a private standalone synthetic website under `studio_development`. [Laundry PR #1](https://github.com/kannaryukkei/laundry-ceria-website/pull/1) and [PR #3](https://github.com/kannaryukkei/laundry-ceria-website/pull/3) remain open/draft. PR #1's baseline site intentionally remains the earlier candidate and still has the 640/720px Hero overlap; its current head `2db325a89cdcc641fc7d3189721586c29f25deb9` passed [run #44337564025](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44337564025) (build and baseline captures). PR #3 contains the targeted VIS-003 fix, verified by manual inspection of SHA-bound 640/720px captures on head `b415bfc7fb152afbb44dee16f2b3cabfabbae9bf` in [run #44336859081](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44336859081); **VIS-003 FIXED**. The same run passed the A11Y-001 automated browser subset: skip link/main focus, primary-navigation keyboard paths, visible focus, Escape/focus restoration, reduced-motion and 640 CSS-pixel zoom-equivalent reflow. Full-page manual tab traversal, literal browser zoom at 200%, assistive-technology review and residual decorative contrast/manual QA remain outstanding; no WCAG certification is claimed. PR #3 must integrate into PR #1's feature branch before PR #1 is considered for `main`. Latest docs-updated PR #3 head `840229ab60086f91000196b0e396a154ae891ac0` is undergoing CI rerun [#44337513640](https://github.com/kannaryukkei/laundry-ceria-website/actions/runs/44337513640). No public release.
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
- [x] Laundry VIS-003 fixed and A11Y-001 automated browser subset passed; [ ] finish full-page manual keyboard traversal, literal 200% browser zoom, residual contrast/manual QA; merge PR #3 into PR #1's feature branch before considering PR #1 for main.
- [ ] No further cleanup is presently required for ACFIX or Star Point Garage; retain their experiment provenance and release restrictions.
