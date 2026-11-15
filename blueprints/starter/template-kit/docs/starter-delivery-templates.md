# Starter Delivery Templates

**Version:** 1.1 — Master Revision candidate  
**Purpose:** Internal project artifacts and reusable client messages for the Starter workflow.  
**Authority:** Master Skill v1.11 Candidate, canonical discovery schema, WRP and Approval & Release Policy.

These are studio/operator working templates. The client is not expected to complete a long intake form or write the Client Website Brief. Default client input is one normal interview plus existing assets and optional references; AI/operator produces the normalized records.

## 1. Lead / interview record (internal)

```text
LEAD / INTERVIEW RECORD

Project ID:
Business / contact:
Date and interview source (recording/transcript/operator notes):
Public business profile / source links:
Raw material packet location (access controlled):
Existing assets received:
Requested outcome / primary visitor action:
Potential scope signals (multi-page / CMS / accounts / payments / booking records / integrations):
Known decision maker:
Next material clarification:
Initial tier recommendation: STARTER / BUSINESS / CUSTOM / NOT_A_FIT / UNDECIDED
Owner/operator:
```

Do not ask the client to fill this record. Use it to index the material already supplied and capture only material follow-up questions.

## 2. AI-produced Client Website Brief — internal working outline

```text
CLIENT WEBSITE BRIEF (AI-POPULATED)

Project ID / brief version:
Source Register IDs:
Source Coverage Matrix status:
Fact Register IDs:
Asset/Permission Register IDs:

BUSINESS INTELLIGENCE
Business identity/category/model:
Core offer(s) and decision factors:
Primary audience and buying triggers:
Customer objections/questions:
Differentiators supported by evidence:
Operational constraints:
Primary conversion action and exact destination status:

UNKNOWN / CONFLICT / NOT AVAILABLE
Item ID:
Answer status:
Evidence status:
Milestone priority:
Owner / next action:

BRIEF REVIEW
Operator review:
Client fact/permission confirmations (record IDs + evidence):
Studio owner decisions:
Brief artifact/version:
```

This outline is a summary, not a replacement for the canonical record sets in `docs/CANONICAL_DISCOVERY_DATA_SCHEMA_v1.0.md`.

## 3. Canonical source, fact and asset registers

Use stable project-scoped IDs and the exact controlled vocabularies defined in the canonical schema. Keep the records in linked tables/files or an equivalent versioned structure.

**Asset/Permission Register view**

| asset_id | source_id | original file/URL | description | creator/owner | intended use | permission_status | permission_evidence_status | consent_status | required_credit | restrictions/expiry | owner_approval_reference |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ASSET-001 | SRC-001 | | | | | PENDING | MISSING | PENDING | | | PENDING |

Never infer ownership, commercial rights, a person's identity/consent or customer proof from pixels. Unknown rights remain PENDING. Do not create fictitious customer/testimonial/metric records.

## 4. Tier, scope and commercial proposal — owner-controlled

```text
STARTER SCOPE / COMMERCIAL DECISION

Project ID:
Tier recommendation:
Owner-approved tier:
Proposal / scope version:
Business goal and primary visitor action:
Included page/sections and functional behavior:
Approved CTA destination and behavior:
Content/copy responsibilities:
Visual/asset responsibilities and rights assumptions:
Responsive, accessibility, SEO and QA scope:
Revision rounds:
Hosting/domain/third-party costs and ownership:
Explicit exclusions:
Dependencies and client responsibilities:
Price / payment milestones / timeline:
Change-request terms:
Defect-support and care boundary:
Studio owner decision + date:
Client agreement evidence + date:
G1 status:
```

Do not quote or promise terms on behalf of the Studio owner. Keep Business/Custom implementation parked until Starter passes its gate and the owner reprioritizes.

## 5. Website Requirements Pack (WRP) review checklist

The WRP is produced by AI/studio from Stages 1–4. It is not a client questionnaire.

- [ ] Links to canonical source/fact/asset/offer/question/CTA/trust/gap IDs.
- [ ] Defines goals, audience, journeys and primary conversion.
- [ ] Defines approved tier, scope, exclusions and constraints.
- [ ] Maps important customer questions to supported answers/sections.
- [ ] Defines content, CTA behavior and real destinations or explicit unresolved status.
- [ ] Records asset provenance, rights, consent, credit and intended use.
- [ ] Defines functional/non-functional and acceptance criteria.
- [ ] Separates preview blockers, production blockers and optional gaps.
- [ ] Records unresolved decisions and version/change control.
- [ ] Operator traceability/feasibility review completed.
- [ ] Required client confirmations and safe fallbacks recorded.
- [ ] Studio owner progression decision recorded.
- [ ] WRP status is exactly `APPROVED_FOR_DESIGN` and G2 passed before Stage 5.

## 6. Content / visual decision request

```text
PROJECT DECISION — [FACTS / CONTENT / VISUAL DIRECTION]

Project:
Artifact and version:
Decision gate: G0 / G3
What is being confirmed:
- Business facts / offer / policy:
- Public contact destinations:
- Asset ownership, rights, consent or credit:
- Customer-facing copy/content:
- Visual direction at the agreed level:

Please respond with:
- CONFIRMED / APPROVED, or
- CHANGES REQUESTED: [specific item and correction], or
- NOT AVAILABLE / NOT APPROVED: [item]

This request applies only to the named artifact/version. It does not approve technical implementation details, commercial scope changes or production release.
```

## 7. Preview review message — G4

```text
STARTER WEBSITE PREVIEW REVIEW

Project:
Preview URL:
Exact branch/commit or release candidate:
Preview date:
Known limitations / NOT TESTED:
Items intentionally represented as concept imagery (not proof):
Included revision rounds remaining:

Please review:
1. Business facts, prices, policies and customer-facing copy.
2. Public destinations and what each CTA does.
3. Asset use/rights and any identifiable people.
4. Whether the offer and next action are understandable.
5. Specific in-scope corrections or new requests.

Decision:
PREVIEW_ACCEPTED, or
CHANGES_REQUESTED: [one consolidated list]

Preview acceptance is not authorization to publish. Production blockers and G5/G6 decisions remain separate.
```

## 8. Change / defect / included revision record

| change_id | request_date | requester | description | classification | approved_scope_ref | price/schedule impact | owner decision | client approval evidence | status |
|---|---|---|---|---|---|---|---|---|---|
| CR-001 | | | | DEFECT / INCLUDED_REVISION / CHANGE_REQUEST | | | | | OPEN |

A defect is a failure to meet approved scope. An included revision adjusts the accepted content/design within the agreed boundary. A change request adds scope or changes an approved direction. Do not begin unapproved out-of-scope work.

## 9. Stage 7 QA and acceptance evidence

Record one result per criterion; do not mark unperformed checks PASS.

| criterion_id | WRP/acceptance reference | test method | exact commit | viewport/state | result (PASS/FAIL/NOT_TESTED/BLOCKED) | evidence link | defect_id / notes |
|---|---|---|---|---|---|---|---|
| QA-001 | | | | | NOT_TESTED | | |

Minimum review areas: factual/evidence/publication integrity; asset rights and credits; customer-question and CTA coverage; responsive behavior/overflow; image crop/alt/loading; keyboard/focus/semantics/contrast/reduced motion; real interaction behavior; build/tests; console/network; metadata; privacy/security where applicable. Capture real browser screenshots for visual-review claims. Distinguish fresh independent review from self-review.

## 10. Release and handover summary

```text
RELEASE / HANDOVER

Project:
WRP version:
Candidate branch/commit:
G4 preview decision + evidence:
G5 production-readiness decision + QA evidence:
G6 release authorization + authorized actions:
Release date / production URL:
Production verification evidence:
Domain registrar / owner / renewal payer:
Hosting account owner / recurring cost:
Repository/source access:
Third-party services/assets and licences:
Backup/rollback:
Known limitations / exclusions:
Support window / care terms:
Final payment status:
G7 client receipt/ownership confirmation:
Studio owner closure:
Final state: RELEASED / HANDED_OVER / NOT_RELEASED
```

Never store passwords, tokens or credentials in this file. Transfer access through an approved secure method.

## 11. Stage 9 retrospective / calibration

| field | record |
|---|---|
| Project / release commit | |
| Estimate vs actual hours/cost | |
| Client wait time / revision rounds | |
| Defects before preview / after release | |
| Root cause | INPUT_SOURCE / MASTER_SKILL_REASONING / IMPLEMENTATION_QA / SCOPE_COMMERCIAL / EXTERNAL_DEPENDENCY |
| Evidence and reproducibility | |
| Minimal correction | |
| Regression check | |
| Reusable system update proposed | |
| Owner decision | |
| Follow-up owner/date | |

Update prompts, skills, standards or tests only when the learning is reusable and evidence-backed.

## 12. AI execution handoff

Use `prompts/starter/00-orchestrator.md` to route to the current stage prompt. Supply the current WRP, scope, relevant canonical IDs, approvals and branch/commit checkpoint. Do not maintain duplicate long-form prompts here; the numbered prompt files and Master Skill are the current execution instructions.
