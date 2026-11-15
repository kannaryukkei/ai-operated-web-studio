# AI Operated Web Studio — Skill Library

The Master Skill is the **orchestrator**. This folder contains focused, reusable capabilities that it activates only when relevant to a project.

Each skill is an independent folder with a `SKILL.md` file using the Agent Skills convention. A skill should own one specialist responsibility, define when it should run, and return decisions/findings that feed the shared project brief, blueprint, implementation and issue log.

## Operating model

**Interview material + client assets → AI source normalization + Master Orchestrator + selected specialist skills → website output → independent evaluation**

The raw interview and supplied materials are the primary sources. The Client Brief is the AI-produced normalized record; clients are not expected to complete a long website questionnaire. Skills do not ask clients to specify technical design details or invent client facts.

## Core skill set

| Skill | Role | Activation |
|---|---|---|
| `client-material-ingestion` | Turn raw interviews and supplied assets into a source-traceable normalized brief | Required at Stage 0 of every new project or when new client source material arrives |
| `frontend-design` | Distinctive visual direction, subject-specific design decisions, layout and type direction | Before designing a new website or materially redesigning a page |
| `ux-review` | Visitor tasks, customer questions, journey, information architecture and conversion clarity | During discovery/blueprint and when evaluating business usability |
| `typography-and-legibility` | Type roles, hierarchy, readable scale, line length and responsive legibility | During pre-production design and visual refinement |
| `interface-quality-review` | UI implementation review, interaction truthfulness, accessibility and interface quality | After implementation and after meaningful UI changes |
| `visual-design-audit` | Independent section-by-section visual critique and refinement | After first implementation and before owner review |

## How to use

1. Read the latest approved Master Skill first. For the proposed material-first workflow, also review `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.9_CANDIDATE.md` and `docs/CLIENT_MATERIAL_INGESTION_PROTOCOL_v1.0.md`.
2. Use `skills/registry.md` to select the minimum relevant specialist set.
3. Read only the selected `SKILL.md` files for the current phase; do not load every skill for every task.
4. Keep their outputs in the project's shared artifacts: client brief/fact register, blueprint, issue log, test evidence and change log.
5. The orchestrator resolves conflicts. Approved client facts, scope, legal/integrity requirements and owner approvals always outrank stylistic defaults.
6. A skill may recommend a pattern, but it cannot add a feature, dependency, paid service or external integration without a demonstrated need and approval.

## Portability

These folders contain instructions, not running software. They do not require paid APIs, API keys, MCP servers or a platform feature. Agent runtimes that support the Agent Skills format can load a skill folder. In a manual ChatGPT/Claude workflow, include only the relevant `SKILL.md` content with the Master Prompt.

## Upstream and licensing

See `skills/registry.md` for exact source repositories, import mode, license status and optional dependencies. Do not copy a repository wholesale. Import individual skill folders or adapt ideas only after checking licensing, dependencies, provenance and overlap with existing skills.
