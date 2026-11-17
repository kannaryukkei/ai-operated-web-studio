# Prompt — Stage 6 Visual Enhancement

**Master Skill mapping:** Stage 6 — Refinement.  
**Canonical procedure:** docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md  
**Entry condition:** Stage 5 implementation is complete, WRP is APPROVED_FOR_DESIGN and G2 is recorded.

Act as the Studio's senior design-critique and frontend-refinement team. Your job is to improve the actual implemented website, not merely return design suggestions.

## Read before acting

1. docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.12.md — Stage 6.
2. docs/VISUAL_ENHANCEMENT_WORKFLOW_v1.0.md.
3. The approved WRP, design direction / Design Implementation Spec, copy, fact and asset/permission records.
4. The exact website repository state, implementation notes, build/test commands and current quality report.
5. These specialist skills:
   - skills/visual-design-audit/SKILL.md
   - skills/interface-quality-review/SKILL.md
   - skills/frontend-visual-qa/SKILL.md
   - skills/frontend-layout-implementer/SKILL.md

## Execute the complete loop

### A. Pin the baseline

Record repository, branch, commit/working-tree state, URL, WRP/spec version and existing build/test results. Create a checkpoint. Do not change code before baseline evidence exists.

### B. Capture and inspect the rendered site

Use the existing Shared Website Quality Gate / Playwright evidence, preferably from the current commit. Read report.json and locate actual PNG files through visualEvidence.viewportScreenshots and visualEvidence.sectionScreenshots using relativePath. Inspect the actual images at 100% scale, not only the report text.

Review desktop, tablet and mobile; all material page sections; actual image crops; hierarchy; typography; density; CTA visibility; responsive adaptation; interaction states; and the visitor journey. Use full-page captures for rhythm and viewport captures for readable detail. If actual screenshots cannot be opened, stop visual claims and report BLOCKED.

Run visual-design-audit and interface-quality-review. Run frontend-visual-qa against the approved design reference and exact render. For any finding tied to an interaction, use the existing Playwright/browser workflow to reproduce and capture that exact state; do not imply the shared runner's page-top/section-start captures cover it. Keep the specialist verdicts separate.

### C. Produce the issue ledger

Create or update the project's visual-refinement-log.md. Record each material finding with stable ID, severity, location, screenshot path/viewport/state, observation, user impact, root cause, specific correction, acceptance check and status.

Prioritize BLOCKER, HIGH, MEDIUM, LOW. Preserve strong design decisions. Do not ask the owner to identify obvious defects that the evidence already shows.

### D. Implement targeted refinements

Do not stop after the audit. Use frontend-layout-implementer to fix authorized BLOCKER/HIGH findings first, then worthwhile MEDIUM findings. Group related fixes into small slices and reference finding IDs in the checkpoint/change log.

Preserve the existing stack, approved direction, factual content, source/asset permissions and truthful CTA behavior. No invented claims or proof, no random asset substitutions, no scope expansion, no new dependency or paid API. Escalate material design-direction or scope changes for approval instead of silently implementing them.

### E. Re-capture and verify

After each slice, run the existing build and relevant tests, capture the same viewport/section/state again, and save after screenshots separately from baseline. Compare the same images at the same scale. Update the finding status and record the exact command/output. Allow no more than two correction cycles per material visual slice; leave unresolved items OPEN and escalate.

### F. Handoff to Stage 7

Confirm that all BLOCKER/HIGH findings are fixed or explicitly blocked; all material fixes have before/after evidence; both design and visual-fidelity verdicts are recorded; and all remaining issues/NOT_TESTED checks are disclosed. Do not call this independent QA or production approval. Hand the exact commit, refinement log, evidence and remaining issue list to prompt 05-independent-qa.md.

## Required response

Return:

- Master stage: 6
- Repository / branch / baseline commit → final commit
- WRP and design-spec version
- Render URL, browser and viewport/state evidence inspected
- visual-design-audit aesthetic verdict
- frontend-visual-qa fidelity verdict
- interface-quality-review summary
- Finding IDs fixed, deferred, open or escalated
- Changed files and code checkpoints
- Build/tests actually run and exact results
- Before/after screenshot paths
- NOT_TESTED / BLOCKED items
- Owner/client decisions required
- Next bounded action: Stage 7 independent QA

Never claim a visual audit without opening actual browser-rendered screenshots. Never claim a fix without re-capturing and checking the same viewport/state.
