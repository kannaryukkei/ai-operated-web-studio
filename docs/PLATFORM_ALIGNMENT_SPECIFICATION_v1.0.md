# Platform Alignment Specification v1.0

**Status:** Draft — Master Revision candidate  
**Date:** 2026-11-15  
**Applies to:** `platform/` Laravel application  
**Authority:** Master PRD v1.0, Master Skill v1.11 Candidate, Canonical Operating Workflow v1.0, Canonical Discovery Data Schema v1.0, Website Requirements Pack v1.0, Approval & Release Policy v1.0 and Client Input & Material Policy v1.0.

## 1. Decision summary

Keep the Laravel platform deliberately small. Its role is **project system of record and workflow coordinator**, not an autonomous AI production engine.

The current material-first process remains:

`one normal client interview + existing assets + optional approved references → Studio/AI normalization → versioned internal snapshot → manual AI discovery handoff → canonical project artifacts and WRP maintained in the project workspace`.

No paid model API, AI SDK, hosted agent runtime, multi-file ingestion platform, WRP workflow engine or persisted approval engine is required for the next platform change.

The immediate correction is a security and operating-boundary fix: **Project Intake is an internal Studio snapshot, not a client-facing form.** Every intake endpoint must be restricted server-side to Studio staff. UI link hiding is supplementary, not authorization.

## 2. Audited baseline

Audit performed against `revision/master-revision`, platform tree unchanged from the repository baseline at the time of this audit.

| Area | Current implementation | Finding |
|---|---|---|
| Roles | `studio_owner`, `studio_operator`, `client`; `User::isStudioStaff()` covers the two Studio roles | Correct coarse role distinction exists |
| Project authorization | `ProjectPolicy::view()` permits account members/project members; `update()` permits Studio staff, client-account owners and project owners/editors | Project editing rights are broader than internal-intake rights should be |
| Intake endpoints | `GET/PATCH /projects/{project}/intake` and `POST .../intake/submit` | Controller uses project view/update authorization; client owner/editor can see and mutate intake |
| Intake navigation | Project index renders “Open intake” for all visible projects | Client users receive a visible link; direct route is also accessible under current policy |
| Intake UI | 26-field form; five fields visibly required; footer says “Only four core fields are required” | Helper copy is wrong; form reads like a client questionnaire |
| Intake storage | Versioned JSON payload; draft save; submitted snapshot; `submitted_by` and `submitted_at` | Useful legacy internal summary bridge; not a canonical source/fact/asset store |
| Discovery workspace | Studio-only controller guard; creates `DiscoveryRun` from latest submitted intake snapshot; operator copies prompt to external AI and pastes JSON | Manual/API-free handoff is appropriate and already implemented |
| Discovery result | Validator stores a structured JSON result with business, offer, question, fact, CTA, asset, journey, trust, gaps and section summaries | Useful working summary, but not full canonical record contract |
| Canonical schema | Source/fact/asset/offer/question/journey/CTA/trust/gap/page-coverage records and separate status axes are specified in docs | Not persisted or fully validated by the platform |
| Website Requirements Pack | Specified in `docs/WEBSITE_REQUIREMENTS_PACK_v1.0.md` | Versioned project artifact maintained manually; no platform WRP model/UI |
| Approvals/release | G0–G7 policy and approval-log template | Manual artifact-based decisions; no first-class approval model, transition enforcement or release engine |
| Project dashboard fields | `current_stage`, `next_action`, `next_action_owner`, generic project `status` | Summary fields only; not canonical stage/gate approvals |

### 2.1 Intake authorization defect

The current controller calls `Gate::authorize('view', $project)` for `show` and `Gate::authorize('update', $project)` for `save` and `submit`. `ProjectPolicy::update()` explicitly permits a client-account owner and project members with `owner` or `editor` roles. The same page serializes the entire 26-field payload to any user who can view the project.

The project list also renders “Open intake” without checking `isStudio`.

The current `ProjectIntakeTest` makes the old behavior explicit: it tests that a client account owner can save, resume and submit the intake. The account-member viewer test permits viewing the intake while denying editing. Both expectations must change because the intended input policy now defines the intake as Studio-populated internal material.

**This is not fixed by hiding the project-list link.** A client could still request the GET/PATCH/submit URL directly. Server-side policy enforcement must deny all client roles, including account owners and project owners/editors.

### 2.2 Required fields

The controller defines exactly five required submission fields:

1. `business_overview`
2. `target_audience`
3. `products_services`
4. `website_goal`
5. `primary_conversion`

The UI marks those same five fields required but currently says “Only four core fields are required.” The remaining 21 fields are optional. Keep this legacy bridge validation for now; correct the UI copy to five.

### 2.3 Discovery result is a legacy working summary

The current manual discovery result validator does not represent the full canonical schema. Specific differences include:

- `APPROVED-FOR-PUBLICATION` is accepted in `evidence_status`, although canonical evidence and publication status are separate.
- `public_use_status` uses `NEEDS_CLIENT_APPROVAL` and `DO_NOT_PUBLISH` rather than canonical `PENDING` and `NOT_APPROVED`.
- Asset `permission_status` accepts `CLIENT_PROVIDED_UNVERIFIED`, `MISSING` and `DEMO_ONLY`; canonical asset permission status is a separate axis from permission evidence status.
- Customer-question stage values are lower-case legacy strings and records omit canonical IDs, fact links and milestone priority.
- Offer, fact, asset, CTA, trust and gap summaries omit parts of the canonical record IDs/provenance/approval structure.
- `sections[]` is a planning summary, not rendered page coverage. Canonical `page_coverage[]` can only be completed after implementation and QA.

Therefore, do not describe the current `DiscoveryRun.result` as a canonical discovery packet or WRP. It is a manual AI working summary that helps the operator prepare the detailed, source-linked project artifacts.

## 3. Target access contract

### 3.1 Project Intake

| User class | View internal intake | Save draft | Submit snapshot | Notes |
|---|---:|---:|---:|---|
| Studio Owner | Allow | Allow | Allow | Internal Studio authority |
| Studio Operator | Allow | Allow | Allow | Internal Studio authority |
| Client account owner | Deny (403) | Deny (403) | Deny (403) | May confirm business facts through the defined review request, not by editing the internal bridge |
| Client account admin/member | Deny (403) | Deny (403) | Deny (403) | No internal snapshot access |
| Project owner/editor/viewer with client role | Deny (403) | Deny (403) | Deny (403) | Project membership does not grant intake access |
| Unauthenticated / unverified | Existing auth/verification behavior | Deny | Deny | Preserve route authentication |

A client may still view the project information that current project authorization intentionally exposes. This specification restricts only the internal Project Intake record; it does not silently redefine all project-level read/update abilities.

### 3.2 Authorization implementation

Add an explicit policy ability on the project, preferably `ProjectPolicy::manageInternalIntake(User $user, Project $project): bool`, returning `$user->isStudioStaff()`. Use it in all three ProjectIntakeController actions:

- `show`: authorize `manageInternalIntake` before fetching/serializing any intake payload.
- `save`: authorize `manageInternalIntake` before validating or mutating a payload.
- `submit`: authorize `manageInternalIntake` before validating or mutating a payload.

Do not reuse `ProjectPolicy::update()` for internal intake. That method continues to govern ordinary project editing and must not be narrowed accidentally as a side effect.

Keep `ManualDiscoveryController` Studio-only. It already calls a Studio-role guard for show/start/complete and verifies that the submitted run belongs to the route project on completion. Retain those protections.

### 3.3 UI behavior and copy

- Render “Open intake” in the project list only when `isStudio` is true, alongside the existing Studio-only Discovery workspace link.
- Rename the intake page heading to make its internal purpose explicit, such as **Internal project intake snapshot**.
- State clearly that Studio staff populate it from the interview and supplied material; it is not a client questionnaire and clients should not be sent this route.
- Explain the page as an interim summary bridge, not the canonical Client Website Brief or source-provenance record.
- Correct helper text to **“Five core fields are required to submit this internal snapshot. The other 21 fields are optional.”**
- Keep visible required markers aligned with the five controller rules. Do not make additional fields mandatory merely to imitate the canonical schema.
- Because only Studio staff can enter this page, the `canEdit` prop may be removed or simplified. Do not treat a disabled button as a security control.

## 4. Data and workflow boundaries

### 4.1 Keep Project Intake as a small internal bridge

For this revision, retain the existing 26-field payload, versioning, draft-save behavior, submission timestamp and submitted-by metadata. The operator derives this compact snapshot from the material packet.

The snapshot must not replace:
- the preserved raw interview/transcript and client-supplied files;
- Source Register and Source Coverage Matrix;
- Fact Register and Asset/Permission Register;
- Offer Matrix, Customer Question Map, Buying Journey, CTA Register, Trust/Evidence Register and Content Gap Register;
- the versioned Client Website Brief;
- the Website Requirements Pack and its `APPROVED_FOR_DESIGN` gate.

These remain canonical project artifacts and are maintained manually/versioned in the project workspace until a specific repeated need justifies platform persistence.

### 4.2 Preserve manual AI discovery

Keep the existing workflow:

1. Studio operator saves/submits the internal intake snapshot.
2. Studio starts a DiscoveryRun; its `input_snapshot` is the immutable copy of the selected intake version.
3. Platform prepares the prompt; operator runs it in ChatGPT/Claude or another existing AI application.
4. Operator pastes the resulting JSON; platform validates and stores the working summary.
5. Operator reviews/normalizes it into canonical project records and the WRP.

Do not add provider credentials, background model calls, automatic AI orchestration, retry queues, MCP dependencies or paid APIs.

### 4.3 Minimal discovery validator alignment

In the platform implementation segment, align the overlapping status values in the existing working-summary contract with canonical values, without pretending to implement the entire canonical record schema:

- Evidence status: `VERIFIED`, `CLIENT-PROVIDED-UNVERIFIED`, `DEMO-ONLY`, `ASSUMPTION`, `MISSING`, `CONFLICT`.
- Publication status: `APPROVED`, `PENDING`, `NOT_APPROVED`.
- Asset permission status: `APPROVED`, `PENDING`, `NOT_APPROVED`, `NOT_APPLICABLE`; keep permission evidence and people-consent status separate where represented.
- Customer journey stage: `BEFORE_PURCHASE`, `DURING_PURCHASE`, `AFTER_PURCHASE`.
- Question answer status: `ANSWERED`, `GAP`, `NOT_APPLICABLE`.
- CTA destination status: `APPROVED_REAL_DESTINATION`, `NOT_CONFIGURED`, `NEEDS_APPROVAL`, `DEMO_ONLY`.
- Milestone priority: `PREVIEW_BLOCKER`, `PRODUCTION_BLOCKER`, `OPTIONAL_GAP`.

Do not accept `APPROVED-FOR-PUBLICATION` as evidence, or use `CLIENT_PROVIDED_UNVERIFIED`, `MISSING` or `DEMO_ONLY` as an asset permission decision. Use the canonical schema's explicit alias mapping when reading any existing legacy records. Update the prompt, validation rules, result TypeScript types/rendering and feature fixtures together.

The working summary still does **not** become the complete canonical packet: stable record IDs, locators, full source coverage, all approval references and post-QA `page_coverage[]` remain project artifacts/manual records for now. Do not report full canonical schema persistence as implemented.

## 5. Approval, WRP and release workflow

No new approval table, approval engine, workflow engine or release automation is required for the minimum platform alignment.

- Keep G0–G7 decisions in the versioned project approval register.
- Keep WRP as a versioned project artifact; require status `APPROVED_FOR_DESIGN` and recorded G2 before Master Stage 5 design/implementation.
- Keep project `current_stage`, `next_action` and generic `status` as an operational dashboard summary only; they are not approval evidence.
- Do not infer `PREVIEW_ACCEPTED`, `PRODUCTION_READY`, `RELEASE_AUTHORIZED`, `RELEASED` or `HANDED_OVER` from the project status or DiscoveryRun status.
- Do not change `ProjectPolicy::update()` or generic project status transitions to imitate the manual gate policy.

A persisted approval model may be reconsidered only after real projects show that versioned approval records are too difficult to operate or audit manually. It is not a Segment 12 requirement.

## 6. Segment 12 implementation scope

### MUST

1. Add Studio-only `manageInternalIntake` authorization and enforce it in show/save/submit.
2. Remove client access to intake data, including account owners and project members with owner/editor roles.
3. Hide “Open intake” from client project lists while preserving the direct-route server-side denial.
4. Change page copy to explicitly describe an internal snapshot and correct five-required/21-optional helper text.
5. Preserve current versioned draft/submitted snapshot behavior.
6. Align the overlapping DiscoveryRun working-summary status enums and prompt/TypeScript/UI/fixtures as defined in §4.3.
7. Update/add feature tests proving both access denials and Studio access.

### SHOULD

- Add an Inertia project-list assertion that client views do not receive/render the intake link.
- Ensure errors do not serialize intake payloads to unauthorized users.
- Add regression tests for every required field and optional-field acceptance.
- Keep manual discovery and the API-free handoff covered by existing tests.

### OUT OF SCOPE

- Full persistence of all canonical schema record arrays.
- Raw file upload/storage or automatic transcript extraction.
- WRP model, versioned artifact UI or artifact repository integration.
- Persisted approval/G0–G7 transition engine.
- Automated client notifications, proposals, invoicing or deployment.
- Paid API/provider SDK, autonomous agents or new infrastructure.
- Business/Custom implementation.

## 7. Acceptance criteria for Segment 12

### Internal intake access

- [x] Studio Owner can GET, PATCH and submit a valid intake.
- [x] Studio Operator can GET, PATCH and submit a valid intake.
- [x] Client account owner receives 403 from GET, PATCH and submit.
- [x] Client account admin/member receives 403 from GET, PATCH and submit.
- [x] Project owner/editor/viewer with client role receives 403 from GET, PATCH and submit.
- [x] Unauthorized responses never include the stored 26-field payload.
- [x] Project list displays “Open intake” only to Studio staff.
- [x] Direct URL access remains denied even when the link is hidden.

### Validation and versioning

- [x] Exactly the five named fields are required at submit; all 21 other fields remain optional.
- [x] Draft save continues to allow partial/empty optional fields.
- [x] Submitted intake version is immutable; subsequent Studio edits create a new draft version.
- [x] Payload keys remain restricted to the defined 26 fields.

### Discovery

- [x] Manual discovery remains Studio-only and requires a submitted intake snapshot.
- [x] DiscoveryRun retains the exact intake version and input snapshot used.
- [x] Result validator rejects the deprecated mixed/legacy status values in new output and accepts only the canonical enums defined in §4.3.
- [x] Prompt, PHP validator, TypeScript types/UI and fixtures use the same enum vocabulary.
- [x] The UI continues to identify discovery as a manual external-AI handoff; no paid API is introduced.
- [x] Tests do not claim that the result is a full canonical record packet or WRP.

### Workflow truthfulness

- [x] G0–G7 approvals remain manual, versioned and tied to exact artifacts.
- [x] WRP/G2 prerequisite is documented; no platform stage transition falsely signals WRP approval.
- [x] No build/test/discovery status implies client approval, production readiness or release authorization.

## 8. Test and CI requirements

The active root workflow `.github/workflows/platform-ci.yml` runs on pull requests touching `platform/**` and performs Composer install, Laravel migrations, `npm ci`, frontend build and `composer run-script ci:check`. The configured Composer check includes frontend checks, TypeScript, PHPStan and Laravel tests/Pint. A complete local execution was observed on Windows from `platform/`: frontend formatting/lint PASS (74 formatted, 68 clean); TypeScript PASS; Pint PASS (87 files); PHPStan PASS (64/64, no errors); Laravel tests PASS (80 tests, 370 assertions). GitHub Actions itself has not been run because no PR was created. Before closing Segment 12, reconcile the two local TSX formatter edits from `npm.cmd run check:fix` if they remain in `git status --short`; commit/push them to the revision branch only.

The repository also contains `platform/.github/workflows/tests.yml` nested under `platform/`; do not rely on that file as the repository's active workflow unless it is moved to the root workflows directory in a separately scoped CI change.

## 9. Audit evidence and limitations

Files inspected include:

- `platform/app/Http/Controllers/ProjectIntakeController.php`
- `platform/app/Policies/ProjectPolicy.php`
- `platform/app/Models/ProjectIntake.php`, `Project.php`, `DiscoveryRun.php`, `User.php`
- `platform/app/Actions/Discovery/CreateDiscoveryRun.php`
- `platform/app/Http/Controllers/ManualDiscoveryController.php`
- `platform/app/Enums/DiscoveryRunStatus.php`, `UserRole.php`
- `platform/routes/web.php`
- `platform/resources/js/pages/projects/intake.tsx`, `projects/index.tsx`, `projects/discovery.tsx`
- `platform/tests/Feature/ProjectIntakeTest.php`, `ManualDiscoveryWorkflowTest.php`, `DiscoveryRunTest.php`
- relevant project/client/intake/discovery migrations and the active platform CI workflow.

This segment is a code-and-test inspection plus a target-state specification. No platform source code or database migration was changed, and no application test suite was executed in this segment.

## 10. Segment 12 implementation update — 2026-11-15

**Implementation state:** The minimum code and regression-test changes are committed on `revision/master-revision`. Static re-fetch/review confirms the intended access rules and enum contract are reflected across policy, controllers, UI and fixtures.

### Implemented

- Added `ProjectPolicy::manageInternalIntake()`, restricted to `User::isStudioStaff()`. `ProjectPolicy::update()` remains unchanged, so client-account owners and project editors retain their existing general project-edit permission without receiving internal intake access.
- All three `ProjectIntakeController` actions — show, save and submit — authorize `manageInternalIntake` before retrieving or changing intake data. The Inertia response no longer returns a `canEdit` flag.
- Project list renders “Open intake” only when `isStudio` is true. Direct route requests by clients remain denied server-side.
- Reframed the intake page as an internal Studio snapshot derived from the interview and supplied materials; removed its client-facing questionnaire language. Helper copy now states five required fields and 21 optional fields. The 26-field payload, five required validation rules, draft saving and submitted-version immutability remain unchanged. No migration was added.
- Updated submit/save success copy to identify an internal Studio snapshot.
- Aligned the manual DiscoveryRun working-summary contract across PHP validation, generated AI prompt, TypeScript types/rendering and fixtures:
  - Evidence: `VERIFIED`, `CLIENT-PROVIDED-UNVERIFIED`, `DEMO-ONLY`, `ASSUMPTION`, `MISSING`, `CONFLICT`.
  - Publication: `APPROVED`, `PENDING`, `NOT_APPROVED`.
  - Asset permission: `APPROVED`, `PENDING`, `NOT_APPROVED`, `NOT_APPLICABLE`; separate permission-evidence and consent statuses.
  - Customer journey uses uppercase `BEFORE_PURCHASE`, `DURING_PURCHASE`, `AFTER_PURCHASE`; question field is `answer_status`; unresolved-item milestone values are canonical `PREVIEW_BLOCKER`, `PRODUCTION_BLOCKER`, `OPTIONAL_GAP`.
  - Trust and content-gap records now use the corresponding separate evidence/publication and milestone status fields.
- The manual external-AI workflow remains unchanged: Studio starts the run, uses the prompt in an existing AI app and pastes JSON. No provider API, key, SDK, queue or paid service was introduced.
- Updated feature tests to deny client owners, account admins/members and project owner/editor/viewer roles on all three intake endpoints; added Studio Owner/Operator access, five-field/21-optional validation, version immutability and client project-list Studio-flag assertions. Discovery tests cover canonical output and reject legacy mixed evidence/publication values, legacy asset-permission values and lowercase journey stages.

### Static validation performed

Re-fetched and inspected all nine changed files. Confirmed:
- All three intake controller actions use the dedicated Studio-only policy.
- General project edit policy remains unchanged.
- Intake data is no longer serialized to client requests because the authorization check occurs before querying/returning payload data.
- UI link gating, internal-only copy and five/21 helper text are present.
- Canonical enum lists are consistent across PHP rules, AI prompt, TypeScript types/rendering and test fixtures.
- Negative regression tests exist for the deprecated enum shapes.
- No database migration, WRP/approval model, external AI integration or CI workflow change was introduced.

### Automated test / CI status

**NOT RUN — no PASS is claimed.** The available root `.github/workflows/platform-ci.yml` runs for pull requests touching `platform/**` or pushes to `main`; it does not run on this revision branch. Its Composer invocation now uses `composer run-script ci:check`, which correctly addresses the colon-named script. The local execution environment has PHP but no Composer binary/vendor installation, and outbound GitHub access is unavailable for cloning/running the application. No PR was created and `main` was not modified, consistent with the revision-branch boundary.

The reproducible validation command is `composer run-script ci:check` from the `platform/` directory. The workflow command was also corrected from the invalid shorthand `composer ci:check` to `composer run-script ci:check`. It runs frontend checks, TypeScript checks, Pint/PHPStan and Laravel tests via the configured Composer scripts. Run it locally or through the explicitly authorized revision PR before treating these changes as tested. The corresponding acceptance criteria above remain **pending execution** until then.

**Files changed in this implementation:**  
- `platform/app/Policies/ProjectPolicy.php`
- `platform/app/Http/Controllers/ProjectIntakeController.php`
- `platform/app/Http/Controllers/ManualDiscoveryController.php`
- `platform/resources/js/pages/projects/intake.tsx`
- `platform/resources/js/pages/projects/index.tsx`
- `platform/resources/js/pages/projects/discovery.tsx`
- `platform/tests/Feature/ProjectIntakeTest.php`
- `platform/tests/Feature/WorkspacePagesTest.php`
- `platform/tests/Feature/ManualDiscoveryWorkflowTest.php`

**Next action:** Complete Segment 12 by executing `composer ci:check` on this branch through a reproducible local run or authorized PR. If it fails, fix the exact reported issue and rerun. Do not mark Segment 12 DONE or start Segment 13 CI hardening until the result is observed.

### Follow-up portability correction — Pint on Windows

The operator executed `composer run-script ci:check` from `platform/`. Frontend formatting/lint checks and TypeScript checks passed. Pint then failed before running its test because the parallel worker could not be launched on Windows: `proc_open(): CreateProcess failed: Access is denied`. This is a process-launch failure, not a Pint formatting diagnostic.

To avoid reliance on child-process spawning, `platform/composer.json` now runs Pint serially:
- `lint`: `pint`
- `lint:check`: `pint --test`

This modestly trades parallel speed for Windows compatibility and predictable local/CI execution. The active root workflow uses the same Composer scripts through `composer run-script ci:check`.

**Status remains CI PENDING.** The operator must rerun `composer run-script ci:check` from `platform/` after pulling the latest revision branch changes. Pint, PHPStan and Laravel tests have not yet been reported as passing.

### Follow-up portability correction — PHPStan memory and workers (2026-11-15)

The operator's next local run passed:
- `npm run check` after `npm.cmd run check:fix`: all 74 files formatted; no warnings/lint errors in 68 files.
- `npm run types:check` had passed on its earlier run.
- Pint `--test`: 87 files passed.

PHPStan then failed before producing analysis diagnostics: a parallel worker exhausted the local PHP CLI's 128 MB memory limit while parsing a PHP file. This was a process-resource failure, not a reported static-analysis finding.

**Committed correction:**
- `platform/composer.json`: `types:check` invokes `phpstan analyse --memory-limit=1G`.
- `platform/phpstan.neon`: `parallel.maximumNumberOfProcesses: 1` disables worker processes. PHPStan supports this setting to disable parallel processing and supports the `--memory-limit` CLI option; see the [PHPStan configuration reference](https://phpstan.org/config-reference) and [CLI usage](https://phpstan.org/user-guide/command-line-usage).

This avoids both the 128 MB worker cap and Windows subprocess spawning. It trades some analysis speed for portability on the local Windows/Herd environment and the Linux CI runner.

**Execution remains pending.** The revised PHPStan settings have been committed but have not yet been exercised by the operator. The two TSX formatting corrections from `npm.cmd run check:fix` exist in the operator's local working tree and are still uncommitted; keep them. After syncing the latest branch, rerun the complete Composer script before recording PASS.

### Follow-up test isolation fix — Vite manifest in local tests (2026-11-15)

The operator reran `composer run-script ci:check` after the PHPStan memory/worker correction. Results observed from the pasted terminal output:
- Frontend formatting/lint: PASS (74 formatted; no warnings/lint errors in 68 files).
- TypeScript: PASS.
- Pint: PASS (87 files).
- PHPStan: PASS (64/64 analysed, no errors).
- Laravel tests: 79 passed, one failed (80 total). The single failure was `ManualDiscoveryWorkflowTest::test_studio_can_open_business_first_discovery_prompt_without_an_api_key`, which rendered an Inertia page and failed because the local Vite manifest was absent: `Unable to locate file in Vite manifest: resources/js/pages/projects/discovery.tsx`.

Inspection showed that `ProjectIntakeTest` and `WorkspacePagesTest` already call `$this->withoutVite()` in `setUp()`; `ManualDiscoveryWorkflowTest` did not. The failing test validates server-side prompt props, not compiled frontend assets. Added the same `withoutVite()` test setup to `ManualDiscoveryWorkflowTest`, so the feature suite does not require a local `npm run build` just to render the Inertia response. The root CI workflow still performs `npm run build` before tests.

**Status:** the fix is committed but has not yet been executed locally. Re-run the full `composer run-script ci:check` from `platform/`. The 79 previously passing tests remain good evidence; the single previously failing test must be rerun before claiming the entire suite PASS. Segment 12 remains `IMPLEMENTED — CI PENDING`.

### Final observed local validation — 2026-11-15

The operator ran `composer run-script ci:check` from `platform/` after pulling the revision branch's Vite-test fix. All configured checks passed: frontend formatting/lint, TypeScript, Pint (87 files), PHPStan (64/64, no errors), and **Laravel tests 80 passed (370 assertions)**. The detailed terminal output was attached in the conversation.

One local synchronization item remains to verify: the earlier `npm.cmd run check:fix` produced modifications to `resources/js/pages/projects/discovery.tsx` and `resources/js/pages/projects/intake.tsx`. The successful local validation used that working tree. Check whether they remain uncommitted; commit and push those two formatter-only changes to `revision/master-revision` if necessary. Do not push to `main`. Once the local branch is clean and matches the tested tree, Segment 12 can be marked DONE. GitHub Actions was not triggered because no PR was created.


## 11. Segment 12 validation closeout — 2026-11-16

**Status:** DONE. This closeout supersedes the earlier pending-validation and pending-format-sync notes in the implementation history above.

**Observed command:** `composer run-script ci:check`, executed from `platform/` on local branch `revision/master-revision`.

**Result:** PASS — frontend formatting (74 files), frontend lint (68 files, no warnings or lint errors), TypeScript, Pint (87 files), PHPStan (64/64 with no errors), and Laravel tests (80 passed, 370 assertions).

**Source-tree synchronization:** the two formatter-only TSX changes were committed, rebased on the latest revision-branch documentation, and pushed. The local `git status -sb` was clean and tracking `origin/revision/master-revision`. No PR, merge, branch deletion or change to `main` occurred.

**CI distinction:** this is a complete local Composer-script PASS, not a claim that GitHub Actions has already run. The original workflow did not trigger on direct pushes to the revision branch; the Segment 13 workflow update adds that trigger and a concise run summary so remote CI evidence can be collected without creating a PR.
