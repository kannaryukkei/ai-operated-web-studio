---
name: ades-exploration-synthesis
description: Coordinate adaptive, model-agnostic design exploration across specialist AI models while retaining one authoritative conversation gate and synthesising one final website.
---

# ADES 2.0 — Adaptive Design Exploration & Synthesis

## Purpose

Use multiple AI models as **specialist creative engines**, not competing project managers. Maximise useful design diversity, evaluate the returned work centrally, synthesise one coherent direction, then build and verify one final website.

**One project = one authoritative conversation.** The owner-preferred lead model (currently ChatGPT) holds project context, scope, facts, assignments, decisions, checkpoints, synthesis, implementation and final review. Other models may work in temporary, separate sessions, but those sessions are subordinate and disposable. They never become a second project authority.

The protocol is model-agnostic. No model API, API key, MCP server, automation platform, dashboard or paid service is required. Manual copy/paste and one-file handoffs are the default.

This skill is subordinate to AWOS Master Skill v1.14, the selected operating mode and repository instructions.

## Roles

### Lead / Conversation Gate

The lead model remains in the single project conversation and:
- understands the business and visitor once;
- defines the design question and constraints;
- decides whether outside exploration is useful;
- assigns small, non-overlapping exploration tasks to any available models;
- receives and reviews every returned file;
- tracks the compact project checkpoint;
- chooses, rejects and synthesises ideas;
- alone controls the production repository, integration, QA claims and final delivery.

The lead does not need to read lengthy explanations from every contributor. Ask contributors for one preview file, with the concept metadata embedded inside it.

### Specialist Explorers

A specialist model receives only the relevant prompt and project packet. It produces **one self-contained HTML file** exploring its assigned design hypothesis or section. It does not:
- re-interview the client or redefine project scope;
- invent facts, proof, contacts, claims, permissions or business logic;
- integrate another model's code;
- edit the production repository, open PRs, deploy, send messages or make external changes;
- claim its own work is approved or selected.

Use models according to the task and the owner's observed preferences. Do not assume a fixed vendor ranking, identical capabilities or an available quota. Any model that can return a self-contained HTML file can participate.

## 1. Decide whether and where to explore

Activate ADES when visual direction is genuinely open and meaningful differentiation can improve comprehension, trust, recognition or visitor action.

Do not force exploration when an approved direction should be preserved, the task is intentionally simple, or comparisons would not change an important design decision.

Use the project context and source material already available. Do not repeat intake. Preserve the declared mode:
- `client_service`: use only source-backed facts, authorized assets and approved claims. No fabricated business evidence.
- `studio_development`: synthetic facts and assets may be used only when unmistakably internal and demo-only.

Summarise only the design-critical context: offer, audience, visitor decision, desired action, factual content, available proof/assets, important constraints and owner preferences.

## 2. Explore expansively — maximise useful diversity

There is **no fixed count of concepts or models**. Do not stop automatically at 3, 5 or 10; do not generate more merely to reach a number.

The target is **maximum useful design diversity**, bounded by available model capacity, review effort, time and the remaining design uncertainty.

Explore both:
- **Whole-page concepts:** materially different art direction, composition, visual metaphor, layout grammar, typography, imagery, information architecture and customer journey.
- **Section-level concepts:** alternative hero, navigation, service/menu presentation, pricing, process, trust, gallery, CTA, footer or other high-impact components. One section may receive many alternatives without forcing every section to be redesigned.

Vary meaningful dimensions, for example:
- layout and spatial composition;
- industry-specific visual metaphor, material or visual language;
- hero subject, crop, scale and image grammar;
- information hierarchy, type voice and content density;
- section order, transitions and page rhythm;
- interaction and CTA presentation;
- responsive behaviour and navigation patterns.

### Diversity discipline

- First-pass assignments should be independent: do not show explorers one another's outputs before they have produced their initial concept. This reduces anchoring and convergence.
- Assign each model a clear exploration lens or unanswered design question. Prefer non-overlapping assignments.
- After the first batch, inspect which sections and design axes remain underexplored; commission targeted gap-filling only where it may change the result.
- A new candidate counts as useful only when it contributes a materially different composition, hierarchy, visual idea, visitor journey or section treatment.
- Different colors, fonts, headlines or decorative details alone do not count as a new direction.
- Do not require every section to have the same number of variants. Spend exploration effort where it has the greatest visitor/business impact.
- Stop when additional candidates repeat existing ideas, introduce only low-value variations, or are unlikely to change the synthesis. Record the practical reason for stopping; do not claim exhaustive coverage.

The lead maintains a small mental or conversational coverage map: **section / design question → hypotheses explored → useful insight or remaining gap**. Do not build a dashboard, database or scoring system for this.

## 3. Delegate through one universal handoff

Use the repository's `docs/ADES_PROMPT.md` and a compact project-specific `ADES_PACKET.md` based on `docs/ADES_PACKET_TEMPLATE.md`.

Each handoff contains only:
- the business/visitor context and factual constraints needed for that assignment;
- one specific design question or exploration lens;
- what must remain consistent and what the specialist is free to vary;
- the concepts/sections already explored, in short form, to avoid repetition;
- the exact output requirement.

Send only the minimum relevant context. Never include credentials, secrets, unnecessary personal data or unrelated project history.

For multi-session or quota-limited work, update the same `ADES_PACKET.md` checkpoint before handing work to another model/session. The packet is a portable summary for continuity, **not** a second workflow authority. The main conversation remains authoritative if the two disagree.

## 4. One-file specialist output

The default return from every specialist is **exactly one standalone `.html` file**. No ZIP, build project, framework scaffold, extra image folder, long report or multi-file component package.

The HTML must:
- render by opening it directly in a modern browser;
- contain its CSS and JavaScript inline;
- use inline SVG/CSS for original illustrative elements where practical;
- avoid frameworks, package installs, external scripts, API calls, build tools and network dependencies;
- use only supplied/approved media; do not fake real-business photography or proof;
- use the same business facts, offers, prices and claims from the packet;
- be responsive and readable at the relevant desktop/mobile sizes;
- have semantic markup, accessible labels, visible focus and reduced-motion support when motion exists;
- make preview-only or unavailable interactions visually honest; never simulate a real booking, payment, form submission, sending or success;
- include a small visible `ADES PREVIEW — NOT FOR RELEASE` marker;
- embed a short HTML comment with: concept ID, model/agent label, assigned section/axis, concept hypothesis and any assumptions. Do not add a separate report.

Use a concise descriptive filename, such as `ades-hero-gemini-material-study.html`. If the model cannot attach a file, it may return the complete HTML source in one fenced code block for the lead to save. Do not substitute multiple snippets.

## 5. Evaluate centrally, then synthesise

The lead reviews candidate previews consistently. Use actual browser renders/screenshots when possible; do not judge from source code or the model's self-description alone.

Evaluate:
- business and audience fit;
- five-second offer clarity and customer-task fit;
- hierarchy, composition and section rhythm;
- originality and strength of the visual idea;
- image relevance, authenticity and rights;
- typography, readability and accessibility;
- responsive adaptability;
- whether the design reduces friction and supports the intended action;
- feasibility within the existing stack and agreed scope.

Mark each useful idea **KEEP / ADAPT / REJECT**, with a brief evidence-based reason. Avoid weighted scorecards unless the project genuinely needs one.

The synthesis is not a collage. Choose one dominant visual grammar and borrow only ideas that reinforce it. Resolve clashes in scale, hierarchy, typography, imagery, spacing, tone and interaction. A strong section from one model may be adapted into another concept, but it must feel native to the final system.

Do not let a confident model explanation substitute for actual visual quality. Do not select a design merely because it is bold, polished, unusual or easy to implement.

## 6. Build one final website

Only the lead model integrates and implements the selected synthesis in the real project:
- preserve the owner-preferred baseline and existing stack;
- implement one coherent website, not every candidate;
- build only functionality justified by the visitor journey and agreed scope;
- keep prototype files out of deployable output;
- remove or exclude all candidate HTML, preview labels and synthetic material from a real release candidate;
- add no backend, API, CMS, account, payment, booking, integration or dependency without a demonstrated business requirement.

External models do not push source code or produce merge-ready implementation patches by default. Their one-file preview is a design input, not production code.

## 7. Verify and report honestly

Use existing AWOS website checks and relevant `website-quality-review` modes. Test the integrated final website, not every throwaway concept with a production QA suite.

Inspect relevant rendered desktop, tablet and mobile sizes, real visitor interactions, keyboard/focus behaviour, responsive states and reduced motion. Keep technical, aesthetic, accessibility and conversion judgments separate.

A passing build or automated gate does not prove visual quality, accessibility completeness, conversion performance or release readiness. Report the exact revision, checks, screenshot scope, self-review/independent-review status and remaining manual review.

Follow Master Skill's existing visual-convergence rule. Owner rejection is binding design input; return to the last owner-preferred baseline rather than defending or cosmetically polishing a rejected direction.

## Bare-minimum operating set

Reusable system:
1. `skills/ades-exploration-synthesis/SKILL.md` — this method.
2. `docs/ADES_PROMPT.md` — universal prompt for any specialist model.
3. `docs/ADES_PACKET_TEMPLATE.md` — one compact, portable project checkpoint when cross-model or cross-session handoff is needed.

Per exploration:
- the lead conversation remains the one gate;
- each specialist returns one HTML file;
- the lead keeps only the useful finalists and a few decision notes;
- the lead integrates one website and reports verified results.

No packet is needed for a purely single-model/single-session run. No additional artefact is required just because a stage exists.

## Golden Sample — Laundry Ceria Test 03

Owner-liked exemplar for the original exploration → synthesis → build method; use it as a quality reference, not a fixed concept count or style template.

- Repository: [kannaryukkei/laundry-ceria-website](https://github.com/kannaryukkei/laundry-ceria-website)
- PR #14: open/draft/unmerged on `experiment/test-03-ades-exploration`.
- Reference commit: `f1fa930cb491b1b0318564afc03bfa767366e952`.
- CI run #246 succeeded; shared quality gate remained `PASS_WITH_MANUAL_REVIEW_REQUIRED`.
- Three directions contributed distinct strengths: Everyday Local's personality, The Laundry Counter's price-first hierarchy, and Fold / Fabric Editorial's textile-led art direction.

This is synthetic, private development work. Its candidate HTML under `public/ades/` is not a production template and must not be deployed as-is.
