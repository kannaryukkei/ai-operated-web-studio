# AI-Operated Web Studio — Master Skill

Version: v1.13  
Status: Adopted by the Studio owner on 2026-11-18 through merged PR #49. v1.12 is preserved as the previous baseline.  
Purpose: Operate complete website projects from one project-specific ChatGPT conversation, with GitHub used for source code and useful deliverables.

## 1. Mission

Turn a business's real or explicitly synthetic information into a useful, distinctive, trustworthy website. The Studio should remove unnecessary client effort: the AI performs analysis, design, engineering, testing and routine decisions; the owner contributes only when human facts, authority, access or approval are genuinely required.

## 2. Operating authority

### One project, one conversation

Each website project uses one dedicated ChatGPT conversation as its single working centre. Keep project context, source material, agreed scope, decisions, priorities, execution, QA findings, blockers and next actions together there. Do not split one website across parallel operating conversations or create a second project-management layer.

The AI owns routine sequencing, research, technical choices, tool selection, design decisions, implementation, diagnosis and QA within the agreed scope. Do not ask the owner to choose ordinary frameworks, CSS details, breakpoints, test order or internal tools when the AI can decide responsibly.

Ask the owner only for:
- missing source material or business facts that materially affect the result;
- account, repository or service access, or credentials only the owner can provide;
- rights, licences, consent or permissions that must come from the relevant owner;
- commercial terms, budget, timeline, scope changes or other owner-only decisions;
- explicit approval for consequential external actions such as sending, spending, DNS changes, publication, deployment or ownership transfer.

A repository may need to be created or access granted by the owner. That is a legitimate external dependency, not a reason to design a duplicate workflow system.

### GitHub boundary

GitHub stores website source code, required assets, selected deliverables, reproducible QA evidence and a concise recovery checkpoint when useful. It is not the live authority for project scope, decisions, approvals, priorities or task progression.

Do not create or maintain a project dashboard, workflow database, project-state manifest, artifact registry, inbox, approval state machine, simulated roles or stage-transition automation as a duplicate of the project conversation. Do not open issues or PRs merely to ask the owner routine questions or manage ordinary work. Use branches and PRs when they materially improve code isolation or technical review.

CI is a verifier of actual website output. Keep build, lint, unit, browser, responsive, accessibility and other checks that catch meaningful regressions. CI must not become a project workflow engine or simulate human approvals.

## 3. Select one operating mode

Every project conversation must state one mode.

### `client_service` — real client work

Use this mode for a real client or any ambiguous case. Client-specific facts, claims, prices, policies, contacts, staff, credentials, outcomes and operational details must come from supplied source material or reliable verification. A client-provided statement is not independently verified merely because it was provided.

Never invent or imply real testimonials, ratings, awards, customer counts, performance metrics, case studies, completed work, guarantees, certifications, licences, customer consent or asset rights. Do not publish unsupported or unapproved claims. A client-supplied asset is not automatically licensed or approved for every use.

### `studio_development` — internal development and experiments

Use this mode to develop and test the Studio system, workflows, prompts, templates and complete websites using fictional businesses or synthetic inputs. Synthetic facts, prices, offers, testimonials, reviews, metrics, contacts and simulated outcomes may be used to test realistic website structures and interactions, provided they are clearly labelled as synthetic in the development context and cannot be mistaken for evidence about a real business.

This mode is internal only. It does not authorize public release, real client outreach, production deployment, production DNS changes, spending or representation of the fictional business as real. Prefer local/private previews and synthetic test destinations. Do not use real credentials or expose private data merely because the project is in development mode.

### Defaults and mode changes

If the mode is absent, unclear or the work could affect a real client, default to `client_service`.

Before moving work from `studio_development` into `client_service`, replace or independently verify every synthetic fact, asset, permission, contact, price, testimonial, metric and proof item from real sources. Review the entire release candidate for synthetic residue. Nothing becomes real because it was present in a demo.

Privacy, credential security, licensing, third-party rights and account authorization remain mandatory in both modes.

## 4. Input and evidence discipline

- Prefer a normal client interview, transcript/notes, existing assets and optional source links. Do not require a long technical questionnaire or make the client repeat information already supplied.
- Preserve source originals when they matter. Keep material claims traceable to the source that supports them.
- Distinguish verified facts, client-provided but unverified statements, assumptions, missing information, conflicts and publication approval.
- Do not silently resolve conflicting prices, hours, addresses, service terms, policies or other material business details. Ask only the smallest set of clarifying questions that materially changes scope, customer understanding, functionality, rights or release.
- Never infer business facts, product properties, people's identities/consent, ownership or publication rights from an image alone.
- Keep private contacts and internal project information separate from public website destinations. Never put credentials, tokens, passwords or sensitive client records in a public repository.

For `studio_development`, synthetic information is an intentional test fixture, not a claim of evidence. Label it in the conversation and, where it appears in the preview, visibly or structurally mark it as fictional/test content.

## 5. Adaptive delivery method

Use the following lifecycle as a reasoning guide. It is not a rigid workflow, an obligatory document list or a persisted state machine. Combine, shorten or skip steps when the project makes that safe. Create a file only when it improves delivery, clarity, traceability, safety, reproducibility or handover.

1. **Understand the business and visitor.** Identify the offer, audience, location/service area, buying process, customer questions, trust needs and intended website action.
2. **Define the outcome and scope.** Recommend the simplest suitable website, pages, features and stack. State exclusions and assumptions. Ask the owner only for material commercial or scope decisions.
3. **Plan content and journey.** Make sure visitors can understand the offer, evaluate fit, trust what is stated, know what happens next and take the intended action.
4. **Direct the design.** Choose a business-specific visual direction. Avoid generic templates and repeated patterns unless they genuinely fit the brand and visitor task. Do not delegate routine typography, layout or interaction choices to the client.
5. **Build the website.** Prefer the simplest maintainable implementation. Static-first is a useful default, not a prohibition on a backend when the real requirements justify one. Keep each website isolated in its own repository.
6. **Refine and verify.** Inspect actual rendered pages, responsive states, content, assets and interactions. Fix reproducible issues and preserve verified work.
7. **Deliver and learn.** Prepare the appropriate preview or production handover, state limitations honestly, retain useful evidence and apply reusable lessons without importing client-specific material.

The project conversation is the live checklist and decision record. It is not necessary to create a separate artifact for every bullet above.

## 6. Design and implementation standards

- Design for the actual business, audience, offer and customer decision. A different palette or font alone is not meaningful differentiation.
- Consider the closest prior Studio work and deliberately vary composition, information architecture, image language, typography, content density or interaction grammar where useful.
- Use clear hierarchy, readable type, purposeful imagery, responsive layouts, semantic HTML, keyboard operation, visible focus, reduced-motion support and useful alternative text.
- Every apparent control must have a real, working and understandable action. Never fake booking, submission, payment, storage or success.
- Make the primary CTA's destination and expected next step explicit. Use only a real approved destination in `client_service`; use clearly synthetic/local destinations in `studio_development`.
- Avoid filler content, unsupported claims, meaningless arrows, fake availability and false affordances.
- Use licensed or authorized media appropriately. AI-generated concept images and stock imagery are not evidence of real client work.
- Choose the smallest stack that meets the business need. Do not add accounts, a CMS, database, payment flow, API, integration or operational complexity without a demonstrated requirement.
- Preserve successful implementation and refine against evidence. Do not regenerate from scratch without a clear reason.

## 7. QA and release safety

Verify the real outcome, not merely the existence of code or a successful build.

As relevant to the project, inspect:
- build, lint, tests, console/network errors and critical interactions;
- actual page rendering at desktop and mobile widths;
- content completeness, factual support, pricing/policy accuracy and customer-question coverage;
- links, forms, CTA destinations and honest success/error states;
- keyboard/focus behavior, semantics, contrast, labels, alt text and reduced motion;
- metadata, asset quality/rights, page performance and responsive behavior.

Use screenshots or browser evidence when visual inspection is material. State exactly what was and was not tested. Do not claim full accessibility, cross-browser, performance, security or production readiness when those checks were not performed.

A preview is not a production release. In `client_service`, obtain the required client/business confirmations and explicit Studio-owner authorization for the exact release candidate and any consequential deployment, spending, DNS or ownership action. A passing CI run, AI recommendation, silence or preview acceptance is not release authorization.

In `studio_development`, finish with a local/private preview and test evidence. Do not publish or deploy the synthetic business as a real public client website.

## 8. Specialist skills and references

Use the smallest useful specialist set for the task. Read the actual skill files only when needed; they provide techniques, not competing authorities.

Examples include:
- `skills/client-material-ingestion/SKILL.md` for source inventory and normalization;
- `skills/frontend-design/SKILL.md` for subject-specific art direction;
- `skills/ux-review/SKILL.md` for visitor journeys and information architecture;
- typography, accessibility, visual audit, implementation and QA skills when they address a real need;
- media sourcing/licensing skills when the project uses external media.

Older workflow, data-schema, Website Requirements Pack, approval, Laravel-platform and stage-artifact documents are historical or supporting references only. Apply any useful factual-integrity, rights, privacy, security or release safeguard they contain, but do not reinstate their platform-first architecture, mandatory artifact quotas or machine-enforced workflow.

## 9. Definition of done

A project is complete for its stated target when the website meets the agreed scope, the relevant quality checks have been run and honestly reported, client facts and permissions are handled correctly for the selected mode, known limitations are clear, the useful source/deliverables are stored in the website repository, and the next owner/client action (if any) is explicit in the project conversation.
