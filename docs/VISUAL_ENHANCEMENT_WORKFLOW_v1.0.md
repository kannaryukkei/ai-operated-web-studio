# Visual Enhancement Workflow v1.0

**Status:** Required execution procedure for Master Skill Stage 6 — Refinement  
**Authority:** Subordinate to Master Skill v1.12, the approved WRP, G0–G7 decisions and the canonical operating workflow.  
**Operating model:** API-free, human-authorized, using existing AI applications, coding tools and Playwright.

## Purpose

Turn the existing Stage 6 guidance and specialist skills into one repeatable closed loop:

**Capture → Inspect → Prioritize → Refine → Re-capture → Verify**

This workflow improves the implemented website against its approved design direction and visitor needs. It is not a new autonomous agent, a new Master Skill stage, a redesign permission, or a substitute for Stage 7 independent QA.

## Entry conditions

Do not start until all are true:

- The WRP is APPROVED_FOR_DESIGN and G2 is recorded.
- The approved design direction / Design Implementation Spec, scope, source-backed copy and asset/permission records are available.
- Stage 5 has produced a working website candidate and its initial production build passes.
- The exact website repository, branch and baseline commit (or explicit uncommitted working-tree state) can be identified.
- A real browser-rendered baseline can be captured. If this is blocked, report BLOCKED; do not claim a visual audit from source code or a build result.

A missing reference, unresolved business fact or unapproved change in direction is an explicit limitation or escalation, not an invitation to guess.

## Execution procedure

### 1. Pin and preserve the baseline

Record:

- Website repository, branch, baseline commit and working-tree state.
- Preview URL, build command, preview command and browser/tool version.
- WRP version, approved design direction/spec version and relevant asset register.
- Existing quality/test results and known defects.

Create a checkpoint before changing files. Do not overwrite or regenerate the baseline. Preserve successful work and the original design direction.

### 2. Capture actual visual evidence

Use the existing Shared Website Quality Gate / Playwright runner from the Studio repository whenever it is available. It adds no website dependency. Build the website using its existing project scripts first.

The runner's report.json contains visualEvidence:

- viewportScreenshots: initial viewport screenshots at 390px mobile, 768px tablet and 1440px desktop.
- sectionScreenshots: viewport-scale section-start screenshots at 390px and 1440px, up to 12 per viewport.
- sectionCaptureSummaries: capture strategy, sections found, captured and omitted.
- The existing screenshots array and initial-mobile/tablet/desktop files retain the full-page baseline.

Use each record's relativePath to locate the PNG inside the configured artifacts directory. Absolute path values in a CI report refer to the original runner workspace and may not exist on the reviewing machine.

For a local PowerShell run from the Studio repository root, after the website has been built and its evidence manifest is present:

~~~powershell
$studioRoot = (Get-Location).Path
$siteRoot = (Resolve-Path "PATH_TO_WEBSITE").Path

Push-Location ".github/actions/shared-website-quality-gate"
npm ci --no-audit --no-fund
npx playwright install chromium
Pop-Location

$env:SWQG_WORKING_DIRECTORY = $siteRoot
$env:SWQG_URL = "http://127.0.0.1:4174"
$env:SWQG_PREVIEW_COMMAND = "npm run preview -- --host 127.0.0.1 --port 4174"
$env:SWQG_EVIDENCE_MANIFEST = ".website-quality/evidence-manifest.json"
$env:SWQG_ARTIFACTS_DIRECTORY = ".website-quality-artifacts"

node ".github/actions/shared-website-quality-gate/runner.mjs"
~~~

Use the actual website's existing preview command and port when they differ. The runner starts/stops the preview process. Keep its screenshots, report.json and diagnostics.log. If the project already has a valid recent run, reuse it rather than recapturing unchanged code.

If evidence comes from GitHub Actions, download and extract the uploaded shared-website-quality-gate artifact before visual inspection. A report or artifact URL alone is not visual evidence. The reviewer must be able to open and inspect the actual PNG files. If the AI tool cannot view the actual screenshots, ask the operator to provide the images or mark visual inspection BLOCKED; never infer appearance from filenames or report metadata.

Do not create fake proof records to make the quality gate pass. Use the canonical evidence manifest and source/approval rules. A technical FAIL caused by an evidence or responsive check must remain visible even if screenshots were successfully captured.

### 3. Run the specialist reviews

Use the smallest required specialist set:

- visual-design-audit: mandatory aesthetic and section-by-section critique, including the DISTINCTIVE / COMPETENT BUT GENERIC / DERIVATIVE verdict.
- interface-quality-review: mandatory code/interface, semantics, accessibility and interaction diagnosis.
- frontend-visual-qa: use the approved design reference and captured screenshots to judge rendered fidelity, responsive drift and before/after comparison. Keep its VISUAL MATCH / MATCH WITH DOCUMENTED DEVIATIONS / VISUAL MISMATCH / BLOCKED verdict separate from the aesthetic verdict.

Inspect actual images at 100% scale. Use full-page screenshots for page rhythm, not as the sole evidence of text legibility. Review the viewport and section captures, and inspect relevant interactive states with the browser when the page defines them. A static screenshot does not prove interactions, keyboard operation, accessibility or cross-browser compatibility.

### 4. Build a traceable issue ledger

Every material finding must include:

| Field | Required content |
|---|---|
| Finding ID | Stable identifier such as VIS-001 |
| Severity | BLOCKER / HIGH / MEDIUM / LOW |
| Location | Page, section/component, file/selector where known |
| Evidence | Exact screenshot path, viewport/state, or reproducible browser observation |
| Observation | What is visibly or behaviorally wrong |
| Impact | Effect on visitor comprehension, trust, conversion, usability or brand quality |
| Root cause | INPUT_SOURCE / DESIGN_DECISION / IMPLEMENTATION / QA_GAP |
| Correction | Specific, bounded code/design change |
| Acceptance check | What must be true after the correction |
| Status | OPEN / FIXED / DEFERRED / ACCEPTED_WITH_REASON |

Prioritize in this order:

1. BLOCKER: factual integrity, unsafe/misleading behavior, broken primary conversion or a task the visitor cannot complete.
2. HIGH: comprehension, readability, navigation, major responsive failures or a material mismatch with the approved direction.
3. MEDIUM: repeated friction, inconsistent hierarchy, asset crop problems or meaningful visual drift.
4. LOW: isolated polish and decorative details.

Preserve elements that already work. Do not add sections, cards, animations, copy, imagery or interactions merely to make the page look busier.

### 5. Refine only the authorized scope

Use frontend-layout-implementer for the code changes. Work in bounded slices grouped by related findings, and reference the Finding IDs in the checkpoint/change log.

- Keep changes within the approved WRP, scope, factual sources, asset permissions and selected design direction.
- Fix the root cause at the correct layer. Do not compensate for missing source facts with invented copy or visuals.
- Do not silently change the design direction. A material change to composition, identity, features, copy, public claims, assets or scope must follow the applicable approval/change-control process.
- Do not introduce a framework migration, UI library, dependency, paid API, backend, database or external service for visual polish.
- Run the smallest relevant build/test after each slice and preserve a checkpoint.
- Allow at most two correction cycles for the same material visual slice. If the issue remains, record it as OPEN and escalate the decision instead of looping indefinitely.

### 6. Re-capture and verify

After each correction cycle:

1. Build and render the changed website at the same URL where practical.
2. Re-capture the same viewport, section and interaction state as the baseline finding.
3. Save new screenshots separately from the baseline; never overwrite the only before image.
4. Compare before/after at the same scale and state.
5. Re-run affected functional/accessibility tests and the existing production build / browser suite when relevant.
6. Update each finding with FIXED, OPEN, DEFERRED or ACCEPTED_WITH_REASON and link the after evidence.
7. Record actual commands and results; mark unavailable checks NOT_TESTED or BLOCKED.

A screenshot improvement does not prove that code quality, keyboard access, business completeness or production readiness passed. Re-run only the relevant technical checks, but never omit a check affected by the change.

## Required artifacts

Store the Stage 6 record in the project's internal workspace:

- visual-refinement-log.md using the Starter client template when applicable.
- Baseline evidence: 05-audit/visual-evidence/baseline/ (experiment workspace) or the equivalent project audit folder.
- After evidence: 05-audit/visual-evidence/after-cycle-01/ and after-cycle-02/ (experiment workspace), or the equivalent project audit folder.
- Issue/fix mapping, actual build/test output, updated screenshots and any unresolved approval decision.

Do not place private client source material, secrets, credentials or unapproved public claims in a public repository.

## Exit criteria and handoff

Stage 6 is ready for Stage 7 when:

- All BLOCKER and HIGH findings are FIXED or explicitly blocked by an owner/client decision; none is silently accepted.
- Every material change is tied to a finding and has matching before/after evidence.
- The aesthetic verdict and visual fidelity verdict are both recorded and not conflated.
- The approved design direction remains intact or its change has been approved.
- The current build and affected tests have actual recorded results.
- Remaining MEDIUM/LOW findings, limitations and NOT_TESTED items are visible.

Then run the existing Stage 7 independent QA prompt and reviewer. Stage 6 self-review is not independent acceptance. A Stage 6 pass does not grant G4, G5, G6, production release or commercial readiness.
