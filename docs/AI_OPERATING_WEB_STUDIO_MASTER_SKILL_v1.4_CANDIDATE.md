# AI-Operated Web Studio — Universal Master Skill
Version: v1.4 CANDIDATE
Status: Candidate informed by Pilot 04 service-business validation. Keep v1.3 immutable as baseline; validate this candidate on an independent pilot before marking stable.

## Mission
Deliver useful, distinctive, reliable websites with the least unnecessary complexity. The client brief is the source of business facts; this skill governs process, quality, and safe execution.

## Non-negotiable rules
1. Treat the approved client brief and approved client assets as the only source of client-specific facts.
2. Classify material information as VERIFIED, CLIENT-PROVIDED/UNVERIFIED, DEMO, ASSUMPTION, or MISSING.
3. Never invent prices, service inclusions, contact details, addresses, hours, staff, credentials, testimonials, ratings, guarantees, outcomes, policies, or operational claims.
4. Keep internal project-coordination contacts separate from public website contacts. Internal email/phone is not a public CTA destination unless explicitly approved.
5. Every CTA must have a real approved destination or an explicit honest unavailable/demo state. Never imply a message was sent, stored, booked, or received when it was not.
6. A missing contact endpoint blocks live conversion, not necessarily a truthful preview. Disclose the limitation; do not create fake forms, mailto/tel/WhatsApp links, or success messages.
7. Read the client brief, current skill version, benchmark, and existing repository before work.
8. Follow Base → Refine → Independent QA. Improve the same base; do not regenerate from scratch without a documented reason.
9. Use the simplest stack that meets approved scope. Static-first by default. No API, backend, database, CMS, auth, or persistent form unless required and approved.
10. Make low-risk decisions autonomously and record assumptions. Ask only when missing information materially blocks safe or correct delivery; batch questions and do not repeat answered questions.
11. Do not send messages, spend money, publish, change DNS, or transfer ownership without explicit authorization.
12. Save stage outputs, decisions, provenance, and test evidence in the project repository—not only in chat.
13. Distinguish preview readiness from production readiness. A successful build alone does not prove production readiness.

## Stage 0 — Intake validation
- Normalize the brief and identify its version/source.
- Classify each material fact using the information labels above.
- Identify business category, audience, offer/services, service area, website objective, scope, assets, and primary visitor action.
- Record public contact destinations separately from internal contacts. Include an explicit not-provided/not-available state.
- For each requested CTA, record destination, owner, and status: APPROVED / MISSING / DEMO-ONLY.
- Identify blockers only. A missing fact is required only when the selected content or interaction depends on it.
- Output: normalized brief, fact classification, missing critical inputs, CTA/contact map, scope risks.

## Stage 1 — Discovery and qualification
- Identify audience intent, visitor questions, offer, and primary conversion.
- Distinguish informational content from features requiring persistence, accounts, payments, integrations, CMS, or backend.
- Recommend Starter / Business / Custom scope and explain rationale, exclusions, and dependencies.
- Output: discovery brief, visitor journey, tier recommendation, scope boundary, risks.

## Stage 2 — Information architecture and content
- Build a page/section map from the visitor journey. Every section must answer a visitor question or support the primary action.
- Write specific headlines, body copy, navigation, microcopy, FAQs, metadata, and social preview copy.
- Map every CTA to an approved destination or explicit unavailable/demo state.
- Do not invent service inclusions from service names alone. Keep descriptions within the evidence supplied by the brief.
- Output: page map, copy draft, factual-claims approval list, CTA map, asset requirements.

## Stage 3 — Creative direction and assets
- Define business-specific art direction: visual concept, palette, typography, grid, spacing, image language, layout rhythm, interactions, and responsive behavior.
- Use benchmarks for craft and quality, not for copying business-specific features or identity.
- Prefer client-owned approved assets, then purpose-generated visuals, licensed stock, and finally abstract/typographic fallbacks.
- Do not block production solely because photography is missing. Use a suitable fallback and disclose illustrative/generated/stock imagery where it could be mistaken for real client evidence.
- Never present generated or stock imagery as actual premises, staff, customers, products, or completed work.
- Record provenance, credits, alt text, dimensions, loading priority, and responsive crop.
- Output: creative direction, responsive notes, component language, asset register.

## Stage 4 — Base implementation
- Inspect repository, scripts, components, and conventions before coding.
- Build one complete implementation within approved scope.
- Keep content/data separate from presentation where it improves maintainability; avoid over-engineering small sites.
- Implement navigation, links, CTA behavior, and required interactions honestly.
- Make mobile a deliberate composition.
- Include semantic structure, focus states, keyboard behavior, reduced-motion support, useful alt text, metadata, and favicon.
- Output: working base, changed files, implementation notes, known limitations.

## Stage 5 — Refinement
- Review actual desktop/mobile screenshots against the approved direction and relevant benchmark.
- Prioritize issues by impact: critical / high / medium / low.
- Improve hierarchy, typography, imagery, composition, specificity, clarity, conversion, and interactions.
- Preserve successful work; document why any major base change is needed.
- Do not add features merely because a benchmark contains them.
- Output: refined site, change log, resolved/deferred issues.

## Stage 6 — Independent QA
Run the actual production build and browser tests. Source inspection is not browser evidence.

### Minimum checks
- Dependency install and production build.
- Required sections and one clear H1.
- Navigation, mobile menu, keyboard behavior, and interactive elements.
- Every CTA destination and unavailable/demo state.
- No fabricated public contact endpoint, fake submission, or false success state.
- No unsupported business claims or cross-client/branch content contamination.
- All images load; check browser natural dimensions.
- No horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280, and 1440px where supported.
- Desktop and mobile screenshots saved as project/CI evidence.

### Additional checks
- Keyboard-only navigation, focus, semantic landmarks, accessible names/states.
- Contrast, labels, alt text, reduced motion.
- SEO/social metadata, favicon, indexability.
- Console/network errors, dependency exposure, image weight/loading, basic performance.
- Lighthouse or equivalent when available; otherwise mark NOT TESTED.

### QA reporting
Every check is PASS / FAIL / NOT TESTED. For failures, record severity, location, reproduction, expected/actual, evidence, and fix. Fix in-scope defects and rerun affected tests. Never claim accessibility, performance, cross-browser, conversion, or production readiness unless actually tested.

## Stage 7 — Release and handover
Prepare preview, revision register, launch checklist, rollback plan, handover notes, third-party asset/service register, and known limitations. Confirm client approval and production facts. Never deploy, change DNS, or transfer ownership without explicit authorization.

## Cross-project regression discipline
When combining learnings from multiple pilots, merge reusable rules and test cases—not fictional client facts, brands, services, contacts, prices, or claims. Keep one canonical client brief per project. Add negative tests for likely contamination when pilots share a repository or template.

## Required completion record
For each stage record: status (COMPLETE / NEEDS_INPUT / BLOCKED / FAILED), inputs and classifications, decisions/assumptions, files/artifacts, tests and evidence, unresolved risks/approvals, and next stage/owner.

## Definition of done
The approved scope is implemented; the primary visitor journey works; factual claims and CTA destinations are approved or honestly unavailable; browser QA is passed or exceptions are accepted; visual evidence exists; and release permissions are confirmed.