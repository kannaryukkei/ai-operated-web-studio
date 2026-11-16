\# Canonical Status



Single pointer for what is current. If a document is not listed as

Current or Candidate here, do not treat it as an operating instruction.



\## Free operation rule



This studio operates without API keys and is entirely free. AI work

uses external AI applications with manual copy and paste, plus local

validators (PHP, Node, Playwright). No paid AI APIs or paid services.

Any document suggesting paid credentials is stale: flag it, do not follow it.



\## Minimal Context Set: read these first



AI working on this repo reads only these files first, then task-specific

docs only when the task needs them. Do not read all of docs/.



1\. README.md

2\. AI\_BUILD\_RULES.md

3\. docs/CANONICAL\_STATUS.md (this file)

4\. docs/CANONICAL\_OPERATING\_WORKFLOW\_v1.0.md

5\. docs/CANONICAL\_DISCOVERY\_DATA\_SCHEMA\_v1.0.md

6\. docs/AI\_OPERATING\_WEB\_STUDIO\_MASTER\_SKILL\_v1.11\_CANDIDATE.md (candidate, see below)

7\. blueprints/starter/README.md



\## Status table



| Family | Current / Candidate | Superseded / Historical |

|---|---|---|

| Master Skill | v1.11 CANDIDATE, adoption pending owner decision. No adopted canonical version yet. | v1.4 to v1.10 candidates, historical only |

| Product tiers | v1.2 CANDIDATE, current proposal | v1.0, v1.1 superseded |

| Implementation standard | v1.1 CANDIDATE, current proposal | v1.0 superseded |

| Client brief template | v2.1, current | v1.1, v2.0 historical |

| Starter acceptance gate | v1.1, required | v1.0 superseded |

| Operating contracts | CANONICAL\_OPERATING\_WORKFLOW v1.0, CANONICAL\_DISCOVERY\_DATA\_SCHEMA v1.0, WEBSITE\_REQUIREMENTS\_PACK v1.0, APPROVAL\_AND\_RELEASE\_POLICY v1.0 | None |

| Intake | CLIENT\_MATERIAL\_INGESTION\_PROTOCOL v1.0, current | None |

| Starter gates | STARTER\_AUTOMATED\_QUALITY\_GATE v1.0, STARTER\_CONTENT\_EVIDENCE\_GATE v1.0 | None |

| Calibration | MASTER\_SKILL\_CALIBRATION\_PROTOCOL v1.0, EXPERIMENT\_CALIBRATION\_RECORD\_TEMPLATE v1.0 | Calibration records dated 2026-11-15 and 2026-11-16 are point-in-time evidence, not living specs |

| Platform baseline | product-brief, architecture, mvp-specification, data-model, security-and-approvals, ai-orchestration, manual-ai-workflow, roadmap, local-bootstrap | local-bootstrap needs correction: no paid credentials, PHPUnit not Pest |

| Skills | skills/README.md, skills/registry.md | None |

| Decisions and learnings | BLUEPRINT\_MIGRATION\_DECISION (provenance reference) | FOUR\_PILOT\_RETROSPECTIVE, EXPERIMENT\_03\_SYSTEM\_LEARNINGS, RESTRUCTURE\_EXECUTION\_PLAN, MASTER\_REVISION\_EXECUTION\_LOG: records, not operating instructions |



\## Experiment repos



Canonical system: kannaryukkei/ai-operated-web-studio, main branch.

Experiment 01 and 02 are full clones of the studio repo: do not edit

them, do not copy docs or platform code from them. They are to be archived.

Experiment 03 work lives on its experiment branch. Experiment 04 folder

pattern (01 to 08) is the template for new experiments. Experiment 05 is

in progress. New experiments contain only artifacts plus the Master

baseline commit SHA. Never copy platform/ or docs/ into an experiment repo.



\## Decisions still needed



\- \[ ] Adopt or replace Master Skill v1.11 as canonical.

\- \[ ] Decide PR #17 (Starter media pipeline): merge, rework, or close.

\- \[ ] Decide the single Starter stack for Tranche 3.



