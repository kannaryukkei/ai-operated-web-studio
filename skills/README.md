# AI Operated Web Studio — Skill Library

Master Skill v1.14 is the canonical operating method, adopted through merged PR #54 on 2026-11-19. v1.13 remains preserved as the previous baseline. Each website is run from one dedicated project conversation; GitHub stores the code and useful deliverables. Specialist skills are focused methods that the AI activates only when they help the current task.

## Operating rules

- The project conversation owns the live context, scope, decisions, priorities and next actions.
- Select `client_service` for real or ambiguous client work; select `studio_development` only for clearly labelled internal synthetic development.
- Do not require the client to complete a long questionnaire or prescribe implementation details.
- Do not create separate plans, dashboards, mandatory artifact packages or approval workflows merely to satisfy a skill.
- A skill provides technique, not authority to change scope, invent facts, waive rights or authorize publication.
- Create a file only when it materially improves delivery, traceability, safety, reproducibility or handover.
- ADES 2.0 is optional and model-agnostic: maximise useful design diversity with temporary specialist models while keeping one lead conversation as the authority. Each specialist returns one self-contained HTML preview; the lead synthesises and builds one final website.

## Available skills

| Skill | Responsibility | When to activate |
|---|---|---|
| `client-material-ingestion` | Understand interviews, assets, source evidence, facts and material gaps | New project or new source material |
| `website-reference-discovery` | Find and inspect relevant live website examples, then extract useful design patterns | When the visual direction is open and live references can improve it |
| `ux-review` | Visitor tasks, offer clarity, decision journey and conversion | Discovery, page planning or UX refinement |
| `design-strategy-and-judgment` | Business-first visual strategy, reference evaluation and decisive art direction | Before a new or materially revised visual direction |
| `ades-exploration-synthesis` | Coordinate adaptive multi-model design exploration, one-file HTML handoffs, central evaluation and one coherent synthesis | When a new business/brand needs meaningful visual differentiation and the direction is genuinely open |
| `frontend-design` | Distinctive business-specific visual direction | Before design or when the direction needs reconsideration |
| `typography-and-legibility` | Type roles, hierarchy, readability and responsive legibility | Design and type-specific refinement |
| `design-screenshot-spec` | Convert an approved screenshot/reference into a traceable implementation spec | Only when implementation must match a chosen visual reference that has actually been inspected |
| `frontend-layout-implementer` | Implement approved design work in the existing website stack | Coding and bounded visual corrections |
| `website-quality-review` | Aesthetic review, screenshot fidelity, interface/accessibility and overall acceptance | Use the relevant review mode(s) when inspection is needed |
| `media-sourcing-and-licensing` | Plan media, verify exact-item rights and prepare optimized local assets | When external or generated media is needed |
| `gsap-motion` | Optional GSAP motion with React lifecycle, responsive behavior and reduced-motion safeguards | Only when a justified interaction or motion needs GSAP |

The four review dimensions are consolidated in `website-quality-review`: AESTHETIC, VISUAL_FIDELITY, INTERFACE and ACCEPTANCE. They remain distinct verdicts; one does not substitute for another.

## ADES 2.0 handoff

- `docs/ADES_PROMPT.md` — universal prompt for temporary specialist AI explorers.
- `docs/ADES_PACKET_TEMPLATE.md` — compact portable project checkpoint for cross-model or cross-session work.
- The lead project conversation remains the one authority; specialist sessions are disposable and return one standalone HTML file each. No API key or dashboard is required.

## Use

1. Read the project conversation and Master Skill v1.14.
2. Select only the specialist skills needed for the current question or work slice.
3. Follow the existing website stack and relevant repository instructions.
4. Use real browser evidence for visual claims and actual source/licence evidence for media claims.
5. Record decisions in the project conversation. Store only useful code, deliverables and QA evidence in the website repository.

These folders contain instructions, not running software. They do not require paid APIs, API keys, MCP servers, hosted AI services or a Studio platform.

## Upstream and licensing

See `skills/registry.md` and `skills/upstream/` for provenance, adaptation and licensing. Do not refresh or import upstream instructions wholesale without checking compatibility, overlap and rights.
