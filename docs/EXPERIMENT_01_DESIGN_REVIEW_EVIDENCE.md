# Experiment 01 — Reusable Design Review Evidence

Status: PROPOSED INPUT-ENGINE IMPROVEMENT — V1.7 CANDIDATE  
Source experiment: https://github.com/kannaryukkei/web-studio-experiment-01-teras-rindang  
Baseline: canonical Master Skill v1.6 Candidate and Client Website Brief v2.1  
Latest verified experiment run: https://github.com/kannaryukkei/web-studio-experiment-01-teras-rindang/actions/runs/43628137941

## 1. Why this change is proposed

Experiment #1 used a fictional indoor-plant retail concept to test the current brief and Master Skill on an independent category.

The first implementation had a coherent editorial direction and passed its functional browser checks, but a visual review still found small supporting text, small metadata, decorative arrows on static cards, and inconsistent illustration crop behavior across breakpoints.

The defects were not caused by a missing client business fact. They exposed gaps in the studio's internal design instructions and QA coverage.

## 2. Verified output evidence

The final reviewed experiment branch implemented:
- 15px minimum primary/supporting body copy;
- 11px minimum compact metadata;
- 13px primary button labels;
- consistent 1.25:1 category artwork framing across desktop, tablet and mobile;
- no arrow affordance on non-interactive category cards or guide rows;
- neutral status symbol rather than a false outbound arrow on the contact-not-configured panel;
- actual-scale desktop/mobile screenshot review.

Latest CI:
- Production build: PASS.
- Playwright Chromium: 16/16 PASS.
- Responsive overflow check: 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px.
- Body type floor: PASS at 390px, 768px and 1440px.
- Metadata floor: PASS at 390px and 1440px.
- Non-interactive affordance check: PASS.
- Asset framing consistency: PASS at 390px, 768px and 1440px.
- Selected contrast checks: PASS for tested text/background pairs.

Evidence:
- CI run: https://github.com/kannaryukkei/web-studio-experiment-01-teras-rindang/actions/runs/43628137941
- Desktop/mobile visual artifact: https://github.com/kannaryukkei/web-studio-experiment-01-teras-rindang/actions/runs/43628137941/artifacts/14126268258
- Section-by-section review: experiments/01-teras-rindang/08-professional-design-audit-and-refinement.md in the experiment repository.

These checks do not constitute a complete WCAG audit, performance measurement, full browser certification or commercial readiness.

## 3. Three reusable Master Skill improvements

### A. Independent segment-level design audit

Require the studio/AI to critique each section before asking the owner to review the output. Each segment audit records purpose, visitor question, strengths, issues, severity, visitor impact, specific fix and resolution.

The owner remains the approval authority, but should not be the primary detector of routine typography, spacing, crop or interaction defects.

### B. Measurable typography and responsive legibility

Use a role-based type scale and responsive regression checks. Experiment #1 found that qualitative instructions such as "restrained typography" did not prevent supporting text from becoming too small.

The v1.7 candidate uses a 15px body-copy and 11px metadata default as starting guards, with documented exceptions where a specific design role and actual legibility justify them.

### C. Truthful interactions and responsive asset crops

A static card or guide row must not look clickable when it has no behavior. Every apparent control needs a real action/destination or must be styled as non-interactive.

Important image assets need an intended ratio, focal point and safe crop area. Their actual crops must be reviewed at each breakpoint.

## 4. Client Brief decision

No change to Client Website Brief v2.1 is proposed.

The brief already collects business facts, audience needs, offers, customer questions, operating details, trust evidence, conversion intent, visual preferences, asset provenance and approvals. CSS, font-size, grid and breakpoint decisions belong to the Master Skill and studio, not to client intake.

Continue to ask clients only questions that materially change the business understanding, customer journey, factual accuracy, conversion, scope or production readiness.

## 5. Input/output learning rule

The repeatable production loop remains:

**Client Brief + Master Skill → Website → Independent Evaluation → Targeted Input/Implementation Revision → Next Website**

Change the responsible layer based on evidence:
- Brief gap: a material business fact or customer requirement is absent/ambiguous.
- Master Skill gap: the engine made a weak decision or lacked a quality rule.
- Implementation gap: code or asset handling failed to meet an already clear requirement.

Do not add every design preference to the client brief. Do not turn every output defect into a new platform feature. Retest reusable prompt changes on a different category before treating them as stable.

## 6. Scope and approval boundary

This evidence supports a candidate update to the Master Skill only. It does not justify changing Client Brief v2.1, creating new platform features, or promoting the Teras Rindang site into the canonical Starter blueprint.

The site and all fictional content/assets remain isolated in the experiment repository. The canonical change in this branch is a proposed Master Skill v1.7 Candidate and supporting evidence only.
