# Web Studio System Improvement Experiment 01

**Branch:** `experiment/web-studio-system-improvement-01`  
**Baseline:** `main@4991ba2fd849d45d54b982cf8d131d7a8eb91743`  
**Focus:** execution clarity and creative-quality enforcement  
**Status:** FIRST CHANGESET IMPLEMENTED — benchmark validation pending

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
