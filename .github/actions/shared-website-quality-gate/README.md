# Shared Website Quality Gate

This composite GitHub Action checks a rendered website with pinned Playwright Chromium. It evaluates responsive behavior, typography, text contrast, and proof-like content against an evidence manifest. It tests the rendered page rather than framework internals or source selectors.

## Use the action

Build the site in the workflow, then invoke the local action:

```yaml
- uses: ./.github/actions/shared-website-quality-gate
  with:
    working-directory: path/to/site
    preview-command: npm run preview -- --host 127.0.0.1 --port 4173
    url: http://127.0.0.1:4173
    evidence-manifest: .website-quality/evidence-manifest.json
    artifacts-directory: .website-quality-artifacts
```

The preview command is run with the configured website root as its working directory. The action installs its own dependencies from the action directory and runs the shared runner with the website root as its working directory.

## Inputs

| Input | Required | Default | Purpose |
| --- | --- | --- | --- |
| `working-directory` | No | `.` | Website root. The preview command runs here; relative manifest and artifact paths are resolved from here. |
| `preview-command` | Yes | Not declared | Command that starts the already-built local preview server. |
| `url` | Yes | Not declared | URL the runner opens in Chromium. |
| `evidence-manifest` | No | `.website-quality/evidence-manifest.json` | Manifest path, relative to the website root unless absolute. |
| `artifacts-directory` | No | `.website-quality-artifacts` | Output directory for screenshots, report, and diagnostics, relative to the website root unless absolute. |

The implementation is defined in [action.yml](./action.yml). The runner receives these values through `SWQG_WORKING_DIRECTORY`, `SWQG_PREVIEW_COMMAND`, `SWQG_URL`, `SWQG_EVIDENCE_MANIFEST`, and `SWQG_ARTIFACTS_DIRECTORY`.

## Runtime and browser

The action sets up Node.js 22, installs the lockfile-pinned dependencies with `npm ci --no-audit --no-fund` from the action directory, then installs Chromium with `npx playwright install chromium --with-deps` from the same directory. The package lock pins Playwright 1.52.0; its browser lock specifies Chromium revision 1169. These action dependencies are separate from the website's dependencies.

The runner is launched from the workspace as `node "${{ github.action_path }}/runner.mjs"`. It resolves the website root from `SWQG_WORKING_DIRECTORY` (or the process working directory if unset), then resolves relative manifest and artifact paths from that root.

## Preview readiness and checks

The runner starts the supplied preview command in the website root and waits for a response with HTTP status 200 and a `Content-Type` whose media type is `text/html` (case-insensitive; parameters such as a charset are allowed). It polls for up to 60 seconds and reports the URL and last observed response details on timeout.

The rendered page is checked at 390px, 768px, and 1440px viewports. The runner captures screenshots and checks responsive overflow, configured typography floors, and text contrast. Photo, gradient, and other unresolved visual surfaces can be marked for manual review instead of receiving an invented contrast measurement.

## Evidence manifest

The default manifest is `.website-quality/evidence-manifest.json` under the website root. It records the approved evidence used to support proof-like claims detected in the rendered page. The manifest schema and matching rules are implemented in [lib.mjs](./lib.mjs); keep the manifest's human review requirement enabled. An empty manifest is valid when the page makes no detected proof claims. Any detected claim must match the required verified evidence and approval record to pass as publishable proof. The runner reports human review requirements separately.

## Artifacts and failures

The configured artifacts directory receives:

- `screenshots/initial-mobile-390.png`
- `screenshots/initial-tablet-768.png`
- `screenshots/initial-desktop-1440.png`
- `report.json`
- `diagnostics.log`

The action uploads the artifact directory with `if: always()`, so available diagnostics are retained after a gate failure. A failed check causes the runner to exit nonzero; setup or preview startup failures can also fail the action.

## Run the self-tests locally

From this action directory, use Node.js 22 and the committed lockfile:

```sh
npm ci --no-audit --no-fund
npx playwright install chromium
npm test
```

The test script is defined in [package.json](./package.json). To run the gate locally, set the five `SWQG_*` environment variables listed above and run `node runner.mjs` from the action directory (or provide the website root through `SWQG_WORKING_DIRECTORY`).
