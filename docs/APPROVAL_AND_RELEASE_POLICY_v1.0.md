# Approval & Release Policy v1.0

**Document ID:** AWOS-GOV-001  
**Version:** 1.0  
**Status:** Draft — Master Revision candidate  
**Last updated:** 2026-11-15  
**Authority:** Master PRD v1.0, Canonical Operating Workflow v1.0, Canonical Discovery Data Schema v1.0, Website Requirements Pack v1.0

## 1. Purpose

Define who reviews, confirms, approves and authorizes each important project decision. It prevents AI-generated drafts, client statements, passing tests or silence from being treated as approval.

This is the operating policy for the current manual workflow. The Laravel platform does not currently implement a complete persisted approval engine. Until a tested implementation exists, approvals are recorded in a versioned project approval register with links to the exact artifact, version and supporting evidence.

## 2. Authority model

| Actor | May do | May not do |
|---|---|---|
| AI / coding agent | Analyze, draft, recommend, inventory sources/assets, flag uncertainty, implement authorized work, prepare QA/release material | Confirm client facts, grant asset rights, approve commercial scope, authorize spending/DNS/publication/release, transfer ownership |
| Studio operator | Conduct interview, manage project materials, check source fidelity, prepare decisions, request clarification, implement approved scope, run QA and record evidence | Override owner-only commercial/release decisions or grant client-owned rights |
| Studio owner | Approve tier, scope, pricing, margin, timeline, change requests, public-claim policy, budget, release and ownership/handover decisions | Claim a client fact or third-party right is verified without supporting evidence |
| Client / authorized business owner | Confirm business facts, offer details, policies, public contact destinations, asset ownership/rights/consent, content accuracy and agreed preview/release checkpoint | Approve the Studio's internal technical mechanics, hidden implementation details or third-party permissions they do not control |

A role may be held by the same human in a small project, but the authority attached to each decision remains explicit.

## 3. Approval record

Every approval that affects scope, public claims/assets, design progression, production or handover must be traceable. Use one entry per distinct decision:

| Field | Required | Meaning |
|---|---:|---|
| approval_id | Yes | Stable project-scoped ID, e.g. APR-0001 |
| project_id | Yes | Project reference |
| gate | Yes | Named gate from Section 5 |
| approval_type | Yes | FACT_CONFIRMATION / PUBLICATION_APPROVAL / ASSET_PERMISSION / CTA_DESTINATION / TIER_SCOPE_COMMERCIAL / WRP_DESIGN_GATE / CONTENT / DESIGN_DIRECTION / PREVIEW_ACCEPTANCE / PRODUCTION_RELEASE / PAID_SPEND / DOMAIN_DNS / HANDOVER |
| subject_and_scope | Yes | Exact decision being requested; no vague "approve project" entry |
| artifact_ref_and_version | Yes | Exact brief, fact, asset, WRP, content, preview, release or handover artifact/version |
| requested_from | Yes | Person/role expected to decide |
| decision | Yes | APPROVED / CHANGES_REQUESTED / REJECTED / NOT_APPLICABLE |
| decided_by | Yes | Named authorized person |
| decided_at | Yes | Timestamp/date |
| evidence_reference | Yes | Link/path to email, signed note, project message, recorded decision or other durable evidence |
| conditions_or_notes | Yes | Conditions, limits, corrections or explicit NONE |
| supersedes_approval_id | No | Prior decision superseded by this entry |

A pending request has no decision yet. Do not record a pending request as APPROVED. A verbal decision may be recorded by the operator with the date, participants, exact scope and confirmation source; ask the decision maker to correct the record if needed.

## 4. Distinct review and approval states

Do not collapse all review steps into one generic "approved" status.

### 4.1 Artifact workflow state

- DRAFT — AI/operator has prepared the artifact.
- STUDIO_REVIEW_REQUIRED — source fidelity, completeness or feasibility has not yet been checked.
- STUDIO_REVIEWED — operator has checked structure, traceability and scope for the relevant milestone.
- CLIENT_CONFIRMATION_REQUIRED — one or more specific business facts, permissions, destinations or agreed content items await client confirmation.
- CLIENT_CONFIRMED — the named client decisions are explicitly recorded; this does not mean independent verification.
- OWNER_DECISION_REQUIRED — an owner-only commercial, policy or release decision is outstanding.
- OWNER_APPROVED — the owner decision is explicitly recorded for the exact scope/version.
- CHANGES_REQUESTED — the reviewer has requested a defined correction.
- REJECTED — the artifact/decision is not accepted.
- SUPERSEDED — a newer version replaces it; retain the old version and decision history.

These are workflow states, not replacements for the Canonical Discovery Data Schema's answer, evidence, publication or page-coverage statuses.

### 4.2 Final decision and release states

- **PREVIEW_READY:** internal preview is coherent and safe to review, with all preview blockers resolved and remaining production blockers clearly disclosed.
- **PREVIEW_ACCEPTED:** required client/business review of the named preview version is recorded; this is not production approval.
- **PRODUCTION_READY:** every required production acceptance criterion and factual/permission/CTA dependency has passed; no production blocker remains.
- **RELEASE_AUTHORIZED:** Studio owner explicitly authorizes publication of the exact approved release candidate; required client/business approvals are recorded.
- **RELEASED:** the authorized deployment is complete and production verification evidence is recorded.
- **HANDED_OVER:** repository, account/asset ownership, renewal and support boundaries are transferred/confirmed and recorded.

No state may be inferred from a successful build alone.

## 5. Required approval gates

### G0 — Discovery facts, public claims and assets

**AI prepares:** source register, fact register, asset/permission register, conflicts and clarification list.

**Operator checks:** source locators, evidence, public/private contact separation, missing sources and permission records.

**Client/business owner confirms:** material business facts, current offers/prices/policies, public contact destinations, asset ownership, commercial-use permission and identifiable-person consent.

**Owner controls:** publication policy and acceptance of public claims for the project.

**Pass evidence:** specific confirmations and approvals are recorded against the fact/asset/CTA IDs and the discovery snapshot. A client statement may remain CLIENT-PROVIDED-UNVERIFIED; fact confirmation is not the same as independent verification.

### G1 — Tier, scope and commercial approval

**AI prepares:** tier recommendation, scope/exclusions and proposal inputs.

**Operator checks:** delivery feasibility, dependencies, assumptions and client responsibilities.

**Studio owner approves:** tier, price, margin, timeline, revision limits, third-party costs, exclusions and change-control boundary.

**Client agrees:** the actual commercial offer and responsibilities before work proceeds under that scope.

**Pass evidence:** owner commercial decision and client agreement are recorded against the proposal/scope version. AI recommendations alone do not commit the Studio.

### G2 — Website Requirements Pack approval for design

**AI prepares:** WRP derived from approved discovery and scoped decisions.

**Operator checks:** source references, completeness, feasibility, customer-question coverage, CTA behavior, assets, functional boundaries and acceptance criteria.

**Studio owner approves:** tier/scope fit and progression to design.

**Client confirms:** material facts, public destinations and asset/permission decisions that affect the pack.

**Pass evidence:** WRP status is APPROVED_FOR_DESIGN, with owner approval reference and required client confirmations/safe fallbacks. No creative direction or implementation begins while a preview blocker or unresolved scope decision remains.

### G3 — Content, claims and visual direction

**AI prepares:** content, claims, visual direction and preview assets.

**Operator checks:** traceability, evidence status, publication status, scope and design-quality criteria.

**Client confirms:** business accuracy, public wording, offer/policy details, contact routes and approved use of supplied/client-identifiable material.

**Studio owner approves:** final commercial/policy claims and any material change in scope or cost. Design-direction sign-off is requested only at the agreed checkpoint; the client is not asked to prescribe implementation mechanics.

**Pass evidence:** exact content/design version and its confirmations/decisions are recorded. Facts pending publication approval remain unpublished or clearly preview-only.

### G4 — Preview and revision acceptance

**AI/operator prepares:** preview URL, version/commit, customer-question coverage, known limitations and consolidated review request.

**Client reviews:** business accuracy, customer-facing copy, offers, policies, visual direction at the agreed level, public destinations and whether the intended next action is understandable.

**Operator manages:** feedback, duplicate comments, scope classification, revision rounds and regression evidence.

**Owner decides:** out-of-scope changes, extra cost, timeline and whether a preview exception is acceptable for internal review.

**Pass evidence:** PREVIEW_ACCEPTED for the exact preview/version or CHANGES_REQUESTED with a consolidated issue list. Preview acceptance never bypasses production gates.

### G5 — Production readiness

**Operator/independent reviewer verifies:** Starter/Product Acceptance Gate or project-specific acceptance criteria; build and browser tests; responsive behavior; accessibility/performance checks; visual evidence; source-to-page coverage; asset rights; CTA behavior; SEO/metadata; hosting/domain ownership; backups/rollback and handover readiness.

**Client/business owner confirms:** final facts, public content, public contact destinations, operational readiness to receive inquiries/orders and client-controlled permissions.

**Studio owner decides:** all commercial, policy and production blockers are resolved and the exact candidate is eligible for release.

**Pass evidence:** a production QA report and approval record with exact commit/release candidate. Any untested area stays NOT TESTED; no unresolved production blocker is silently waived.

### G6 — Production release authorization

**Studio owner explicitly authorizes:** the exact release candidate, domain/DNS actions, publishing action, approved spend and rollback plan.

**Client/business owner approves:** live public content, business facts, asset use, destination behavior, domain/account arrangements and release according to the agreed contract.

**Operator executes:** only the authorized deployment steps, then verifies the production URL, primary CTA and critical behavior.

**Pass evidence:** RELEASE_AUTHORIZED before publication; RELEASED only after production verification. Never publish based on silence, a passed CI run or a preview approval.

### G7 — Handover and closure

**Operator prepares:** repository and source access, hosting/domain ownership, account access, asset register, renewal costs/dates, limitations, backup/rollback notes, support and maintenance boundaries.

**Client confirms:** receipt, access, ownership and understanding of ongoing costs/responsibilities.

**Studio owner closes:** final commercial obligations, support transition and project closure.

**Pass evidence:** handover record and ownership/access confirmation. Do not transfer credentials or account ownership without explicit authorization and secure handling.

## 6. Preview versus production

A preview may proceed with a limited, disclosed exception only when:
- no preview blocker remains;
- unapproved content or assets cannot reasonably be mistaken for verified public proof;
- any unavailable CTA/form is clearly non-functional and is not represented as working;
- the preview is access-controlled or otherwise marked as a preview;
- the exception, owner and safe fallback are recorded.

Production must not proceed when any of the following remains unresolved:
- material facts, prices, policies or claims that will be published;
- required publication permission or asset/people consent;
- primary CTA destination or expected behavior;
- critical customer question or buying-journey gap;
- functional/technical/accessibility/security blocker required by the acceptance gate;
- required client or Studio owner approval;
- domain, hosting, ownership, cost or release authorization.

A preview exception never becomes an implied production waiver. Remove or resolve the item and retest before release.

## 7. Changes after approval

An approval applies only to the artifact/version and scope recorded. A material change to approved facts, prices, policies, public copy, CTA destination, asset, scope, visual direction, functionality or release candidate must:
1. identify the changed item and affected approval IDs;
2. determine which prior decisions are invalidated;
3. request only the necessary new confirmation/approval;
4. update the relevant records and pack/version;
5. rerun the affected tests and evidence checks.

Do not force a full re-approval for an unrelated technical correction that does not change approved customer-facing behavior or scope.

## 8. Current platform implementation boundary

The current platform provides project/client records and manual discovery runs, but does not implement the full approval workflow defined here. The existing approval gates are an operating procedure and must be recorded in project artifacts; they are not yet persisted as a first-class approval model with transition enforcement, client review UI or audit tests.

Do not claim that the platform currently blocks publication based on these gates. Segments 11–12 will specify and implement only the minimum platform support justified by the Master PRD. Until then:
- keep an approval register in the project workspace;
- link each decision to the exact artifact/version and evidence;
- maintain fact/asset publication status separately in the canonical records;
- require the operator to verify the gate before advancing;
- retain human authorization for all external/release actions.

## 9. Definition of done

The approval process is valid when each critical decision has a named authority, a specific subject/version, an explicit decision and durable evidence; preview and production are separate; no AI-generated output or silence is treated as authorization; and the released project has verifiable approval, release and handover records.
