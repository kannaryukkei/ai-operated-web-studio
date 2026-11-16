# Web Studio System Improvement Experiment 01

**Branch:** `experiment/web-studio-system-improvement-01`  
**Baseline:** `main@4991ba2fd849d45d54b982cf8d131d7a8eb91743`  
**Focus:** execution clarity and creative-quality enforcement  
**Status:** FIRST CHANGESET IMPLEMENTED — full-input Stage 5 and Stage 6 benchmark checkpoint recorded; final visual validation pending

## Why this experiment exists

The recent website experiments exposed a mismatch: the system contains sophisticated quality rules, but the execution prompts and evidence did not consistently enforce them. Adding more skills or producing another website without fixing that mismatch would repeat the same failure mode.

## Evidence-based diagnosis

| Finding | Evidence | Root-cause layer | Consequence |
|---|---|---|---|
| Excessive context loading | The Starter orchestrator told the agent to read six broad system documents plus project state before selecting a single segment. | Orchestration / over-complexity | Unnecessary context switching and diluted attention before the actual task. |
| Design gate not operationalized in its specialist prompt | Master Skill v1.11 requires two materially different concepts, wireframes, prior-work comparison and an anti-template scan. The Stage 5 specialist prompt only listed a general art-direction statement, fingerprint, tokens, responsive plan and a visual/reference board. | Prompt handoff / lack of operational clarity | A model following the specialist prompt can produce one attractive-sounding direction without proving that real creative exploration happened. |
| Aesthetic acceptance can escape the QA summary | ACFIX's close report records technical passes but explicitly says a formal side-by-side aesthetic verdict was not completed. The Stage 7 prompt did not make the four aesthetic states a hard overall acceptance gate. | QA enforcement / process escape | A technically passing website can leave the process without a demonstrated distinctive-design verdict. |
| Reviewer routing is heavier than necessary | The QA prompt listed four specialists together, while the skill registry defines overlapping but distinct responsibilities and says not to activate every skill mechanically. | Orchestration / role clarity | Risk of redundant reviews and more context than a given change needs. |
| Version authority is not fully clear | The current Master Skill and implementation standard are labelled candidates; some current instructions still cite implementation standard v1.0 while the repository also contains v1.1 candidate. | Governance / clarity | Different agents may load different revisions unless the operator pins the active project versions. |

## Working hypothesis

The system's main problem is not simply a lack of skills. It is a **handoff-and-enforcement failure**:

1. The Master contains good requirements.
2. Specialist prompts do not always translate those requirements into observable outputs.
3. The orchestrator loads too much context up front.
4. QA can report technical success without a hard aesthetic verdict.

This creates the appearance of a complex system while leaving its most important creative requirements weakly operationalized.

## Changes in this first bounded experiment

1. Replaced all-at-once document loading with progressive disclosure by project segment.
2. Made Stage 5 design a standalone segment with two genuinely different directions, reference study, wireframes, visual board and explicit G3 stop.
3. Made `DISTINCTIVE` the only default aesthetic pass; `GENERIC`, `DERIVATIVE` and `NOT TESTED` cannot pass overall QA.
4. Reduced mandatory reviewer activation to the smallest useful set, while preserving specialist checks for affected surfaces.

No platform code, business inputs, client questionnaire, website blueprint or production business website was changed.

## Validation plan

Use the **same ACFIX source packet and current build** as a fixed regression case; do not invent a new client or rebuild a fifth website.

The first validation must show:
- The Stage 5 prompt produces two structurally different concepts, not palette variants.
- It compares them to at least two prior project fingerprints and names concrete differences.
- It emits a usable implementation-ready design pack and stops before code.
- Stage 7 refuses to pass an aesthetic gate when the rendered comparison/verdict is absent.
- The orchestrator loads only the current stage's necessary documents and specialist skills.

After this fixed-case check, change only the layer implicated by observed failures. Do not add more skills or platform functionality unless this experiment demonstrates a real need.

## Known limitation

This is a prompt/workflow contract change. It has not yet been run through an external AI executor or browser against the ACFIX project. No improvement in actual website aesthetics is claimed until that fixed-case validation is completed.


## Latest continuation checkpoint — 2026-11-16

The fixed-input benchmark has now progressed beyond the original Stage 5 prompt-only validation:
- Full synthetic ACFIX fixture: 7/7 source documents and four assets inventoried.
- Normalized discovery and WRP completed.
- Stage 5 produced two materially different concepts, selected HOME, IN COMFORT and created an original two-direction visual board.
- Existing ACFIX experiment branch `benchmark/full-input-v1-home-comfort` was continued; the website was not rebuilt from scratch.
- A rendered review found and fixed a mobile hero disclosure that stretched over the image. A new Playwright geometry assertion prevents regression.
- Latest ACFIX CI: [Run #43793287165 — PASS](https://github.com/kannaryukkei/web-studio-experiment-04-acfix-studio/actions/runs/43793287165), commit `43e12adb5b4e2db7074751d03b1902b497c0bdfd`.
- Detailed Stage 6 checkpoint: `benchmarks/acfix-full-input-v1/outputs/13-stage-6-implementation-checkpoint.md`.
- Rendered review: `web-studio-experiment-04-acfix-studio/05-audit/02-full-input-design-review.md`.

**Current result:** Stage 5 PASS WITH CONCERNS; Stage 6 implementation PASS WITH CONCERNS; bounded technical/responsive QA PASS. Final aesthetic distinctiveness remains NOT FINAL because the hero asset is still the 520 × 309 study and the ZACKS rendered comparison is unavailable. Production remains blocked because all inputs are synthetic.

**Resume instruction:** continue from the existing ACFIX benchmark branch and current commit. The next bounded task is to replace only the low-resolution hero concept asset, then rerun the existing browser gate. Do not repeat discovery, regenerate the WRP, redo Stage 5 or recreate the website.


## Continuation checkpoint — 2026-11-16, after ACFIX run #65

The work resumed from the existing benchmark and preserved all later commits already present on the experiment branch. No discovery, WRP, Stage 5, or website rebuild was repeated.

- ACFIX branch was found at `5b1a1b23868c25addd6cc694983cc11c2523fc25`, ahead of the previously recorded `43e12ad` checkpoint.
- Latest CI run #65 passed both static acceptance and browser audit: [#43797592340](https://github.com/kannaryukkei/web-studio-experiment-04-acfix-studio/actions/runs/43797592340).
- Run #64's browser failure was traced to an assertion expecting wheel/trackpad scrolling at 320px. The next commit revised the test to verify Home/End keyboard reachability; run #65 passed. Physical touch-device behavior is still unverified.
- Run #65 screenshots were inspected at desktop 1440px and mobile 390px. No obvious new responsive regression was observed in those captures.
- A higher-resolution synthetic hero candidate (960 × 640 WebP) has been prepared locally but has **not** been committed. The live benchmark still uses the prior 520 × 309 image, so the asset-quality gate remains open.
- ACFIX's rendered review was updated with the latest branch head, CI evidence, artifact inspection, failed intermediate run and exact remaining work.

**Current status:** Stage 5 PASS WITH CONCERNS; Stage 6 implementation PASS WITH CONCERNS; latest bounded technical/responsive QA PASS. Hero asset replacement and final aesthetic distinctiveness remain pending. Production remains blocked because the benchmark inputs are synthetic.

**Resume from:** ACFIX `benchmark/full-input-v1-home-comfort` at the latest source head. Next task is a verified binary-asset transfer, followed by the existing quality gate and screenshot review. Do not redo discovery, WRP, design exploration or the website.
