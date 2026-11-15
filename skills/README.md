# AI Operated Web Studio — Skill Library

The Master Skill is the **orchestrator**. This folder contains focused, reusable capabilities that it activates only when relevant to a project.

Each skill owns one specialist responsibility and returns evidence or decisions to the shared brief, design specification, implementation record, issue log and QA report. Do not load every skill for every task.

## Operating model

**Client Brief + Master Orchestrator + selected specialist skills → implementation → browser evidence → independent review**

The Client Brief remains the source of business truth. Skills do not replace it, ask clients to specify technical design details, or invent client facts.

## Core skill set

| Skill | Primary responsibility | Activation |
|---|---|---|
| `ux-review` | Visitor tasks, customer questions, journey, information architecture and conversion clarity | Discovery and content planning |
| `frontend-design` | Distinctive, subject-specific visual direction | Before designing a new website or materially redesigning a page |
| `typography-and-legibility` | Type roles, hierarchy, readable scale, line length and responsive legibility | Design system and refinement |
| `design-screenshot-spec` | Translate approved visual references into an evidence-labelled implementation spec | Before coding from screenshots/mockups |
| `frontend-layout-implementer` | Implement the approved spec in the project's existing stack, one checkpointed slice at a time | Website coding and scoped refinement |
| `frontend-visual-qa` | Compare actual browser-rendered output to the approved reference | After each meaningful UI slice and after final implementation |
| `interface-quality-review` | Interface behavior, accessibility, interaction integrity and basic code/UI quality | After implementation and meaningful UI changes |
| `visual-design-audit` | Independent section-by-section aesthetic critique and refinement priorities | After first implementation and before owner visual review |
| `frontend-quality-reviewer` | Evidence-based independent review of implementation quality and acceptance criteria | Before owner review / merge / release recommendation |

## End-to-end activation sequence

1. **Discovery:** `ux-review` and relevant business/category skills.
2. **Design direction:** `frontend-design` + `typography-and-legibility`.
3. **Reference translation:** `design-screenshot-spec` converts the approved visual target into measurable build instructions.
4. **Implementation:** `frontend-layout-implementer` codes the approved slice in the existing stack and saves a checkpoint.
5. **Rendered verification:** `frontend-visual-qa` compares the actual browser render with the reference and records mismatches.
6. **Refinement:** implement only scoped corrections; repeat visual QA with a bounded retry count.
7. **Independent acceptance:** `frontend-quality-reviewer` judges the code, requirements and evidence; `visual-design-audit` separately judges aesthetic quality.
8. **Owner review:** request owner feedback only after internal review and evidence are ready.

The Master Skill selects the smallest useful set. A visual QA pass, aesthetic audit, code review and production release approval are separate outcomes.

## How to use

1. Read the current Master Skill candidate first. It defines lifecycle, factual integrity, permissions and approval authority.
2. Use `skills/registry.md` to select the minimum relevant specialist set.
3. Read only the selected `SKILL.md` files for the current phase.
4. Keep stage outputs in the project's shared artifacts: brief/fact register, design spec, implementation checkpoints, issue log and QA evidence.
5. The orchestrator resolves conflicts. Approved client facts, scope, legal/integrity requirements and owner approvals always outrank stylistic defaults.
6. A skill may recommend a pattern, but it cannot add a feature, dependency, paid service or external integration without a demonstrated need and approval.

## Segmented delivery

Large implementation work must not be one uninterrupted, uncheckpointed operation.

- Work one meaningful page/section slice at a time.
- After each slice, save changed files, run the cheapest relevant check and write a resumable checkpoint.
- Record current branch/commit, completed slice, files changed, verification, open issues and next slice.
- Continue only when the previous slice is in a known state.
- Keep visual repair loops bounded; unresolved issues are recorded rather than hidden by repeated retries.

This reduces lost work and makes failures recoverable. It does not promise a fixed completion time.

## Portability

These folders contain instructions, not running software. They do not require paid APIs or API keys. Browser/Playwright checks require an actually available browser runtime; a skill file or installed package alone does not provide one. In a manual ChatGPT/Claude workflow, include only the relevant skill content and the required source references with the Master Prompt.

## Upstream and licensing

See `skills/registry.md` for source repositories, pinned commits, license status and adaptation notes. The WebDev Agent Kit adaptations are attributed in `skills/upstream/webdev-agent-kit/UPSTREAM.md`; the Apache 2.0 license is retained beside that record.

Do not copy a repository wholesale or automatically update an upstream skill. Inspect licensing, dependencies, provenance and overlap before any future refresh.
