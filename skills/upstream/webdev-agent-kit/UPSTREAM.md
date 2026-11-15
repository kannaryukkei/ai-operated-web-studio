# Upstream attribution — WebDev Agent Kit

- Upstream repository: https://github.com/ytvee-dev/webdev-agent-kit
- Upstream branch: `main`
- Pinned upstream commit reviewed: `170504cdabf24269e62fca3009229750351ac3cf`
- License: Apache License 2.0
- License text retained at: `skills/upstream/webdev-agent-kit/LICENSE`
- Review/import date: 2026-11-15

## Adapted source files

| Studio skill | Upstream path | Upstream blob SHA | Adaptation |
|---|---|---|---|
| `design-screenshot-spec` | `skills/design-screenshot-spec/SKILL.md` | `d0ce35b9de3f28f4d14d25a46e37b3a694ef9b6c` | Rewritten for screenshot/image references and the Studio's design-to-code handoff; no mandatory Figma MCP |
| `frontend-layout-implementer` | `skills/frontend-layout-implementer/SKILL.md` | `fbbd06c6f84ee5c9d5e49c6ec853b47e62009ca4` | Rewritten for the Studio's React/Vite, plain HTML/CSS/JS and Laravel/Inertia project targets; preserves local stack conventions |
| `frontend-visual-qa` | `skills/frontend-visual-qa/SKILL.md` | `cd8da890958c1d10621755fa618aea42e9a19012` | Adapted browser-rendered comparison, responsive evidence and bounded visual repair rules |
| `frontend-quality-reviewer` | `skills/frontend-quality-reviewer/SKILL.md` | `4e5ec80f3f469f774316bf8c25af2ac41e391e5c` | Rewritten as an independent implementation-quality review for Studio deliverables |

## Change notice

All four Studio skill files are adapted derivative works, not verbatim copies. Their upstream methods and structure informed the adaptations. The adaptations remove unavailable or stack-specific assumptions, add the Studio's source-of-truth, approval, no-paid-API, segment-by-segment and verification-honesty rules, and reference the Studio's own design and interface skills.

The Web Studio's own rules, client brief, source/asset permissions, approved scope and owner decisions take precedence over the upstream material. No upstream repository code, component library, runtime or paid service is required by these skills.

Do not update these adaptations automatically. Re-inspect upstream changes, licensing and compatibility before any future refresh.
