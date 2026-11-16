# AI Operated Web Studio — Skill Library

The Master Skill v1.11 is the **orchestrator**. This folder contains focused methods that it activates only when useful. Read the Master Skill and canonical project artifacts first; a specialist skill never overrides the WRP, approved scope, source/permission records or G0–G7 authority.

## Operating model

**One normal client interview + existing client materials/assets → AI source normalization → Master Skill Stages 0–9 → selected specialist skills → website + QA/release evidence.**

The AI/operator produces the Client Website Brief. Clients are not expected to complete a long technical questionnaire or prescribe implementation details. Specialist skills are not paid APIs, running software or approval authorities.

## Skill set

| Skill | Responsibility | Activation |
|---|---|---|
| `client-material-ingestion` | Normalize interview/materials into source-traceable facts, assets and brief | Required at Stage 0 |
| `media-sourcing-and-licensing` | Plan business-specific visual needs; source/validate stock and client media; record rights and prepare optimized local assets | Stage 5 sourcing and Stage 7 media QA |
| `frontend-design` | Establish distinctive, brief-specific visual direction | Before design |
| `ux-review` | Customer questions, buying journey, IA and conversion clarity | During Stages 1–4 |
| `typography-and-legibility` | Type roles, hierarchy, readability and responsive legibility | Design and refinement |
| `design-screenshot-spec` | Translate an approved screenshot/mockup into an evidence-labelled implementation spec | Only for approved reference-driven design |
| `frontend-layout-implementer` | Implement an approved spec in the existing stack using bounded slices/checkpoints | Scoped code implementation |
| `frontend-visual-qa` | Compare browser-rendered implementation with approved reference and capture viewport evidence | Visual fidelity checks |
| `interface-quality-review` | Diagnose interface semantics, accessibility, truthful interactions and responsive issues | After meaningful UI changes |
| `visual-design-audit` | Judge aesthetic quality, hierarchy and cross-project distinctiveness | After first implementation and refinement |
| `frontend-quality-reviewer` | Independently judge implementation acceptance against scope, criteria and evidence | Stage 7 acceptance review |

The review roles are intentionally distinct: aesthetic design critique is not the same as screenshot fidelity, interface defect diagnosis or overall implementation acceptance. Activate only what the stage and evidence require.

## How to use

1. Read `docs/AI_OPERATING_WEB_STUDIO_MASTER_SKILL_v1.11_CANDIDATE.md` and the canonical operating documents first.
2. Use `skills/registry.md` to select the minimum useful specialist set. For media work, read `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md` and activate `media-sourcing-and-licensing`.
3. Read only the selected `SKILL.md` files for the current stage.
4. Keep outputs in versioned project artifacts: source/fact/asset records, WRP, design spec, implementation checkpoints, issue log, test evidence and approval register.
5. The Master Skill and G0–G7 policy resolve conflicts. Client-confirmed facts and permissions, approved scope and Studio owner decisions outrank stylistic or tool defaults.
6. A skill may recommend a method; it cannot add scope, a dependency, paid service or external integration without approval.

## Portability and dependencies

These folders contain instructions, not running software. They do not require paid APIs, API keys, MCP servers, hosted AI services or a platform feature. In a manual ChatGPT/Claude workflow, provide the current Master Skill plus only the relevant specialist skill/prompt.

## Upstream and licensing

See `skills/registry.md` and each upstream attribution record for source, pinned commit/blob, license, adaptation and optional dependencies. Never merge an experimental branch wholesale or auto-refresh third-party instructions without checking provenance, licensing, overlap and compatibility.
