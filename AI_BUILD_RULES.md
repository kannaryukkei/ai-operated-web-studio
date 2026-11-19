# AI Build Rules

These rules govern AI agents and contributors working on the Studio system and website projects.

## Mission and authority

- Operate each website from one dedicated ChatGPT conversation. That conversation is the working authority for project context, scope, decisions, priorities, execution and next actions.
- GitHub is the versioned home for website source code and relevant deliverables, not a parallel project manager or workflow engine.
- Follow the canonical Master Skill for operating method. Specialist skills provide techniques; they do not create competing plans or override project decisions.
- When instructions conflict, preserve privacy, factual integrity, rights, security and explicit authorization. Use the project conversation's latest confirmed decisions for project-specific scope and priorities.

## Select the operating mode

- `client_service` is the default for real clients and any ambiguous case. Use evidence-backed facts, real source material, actual rights/permissions and explicit approvals. Do not fabricate business facts, prices, testimonials, ratings, metrics, credentials, guarantees, policies, outcomes or operational claims.
- `studio_development` is for internal development, synthetic clients and controlled experiments. Fictional facts and simulated scenarios are permitted only when clearly labelled and kept out of real-client deliverables.
- `studio_development` never authorizes public release, real outreach, spending, DNS changes or production deployment. It does not relax privacy, security, licensing or account authorization.
- To move a development project into client service, re-source or independently verify all facts, assets, permissions, contact details and proof. Never inherit synthetic material as real.

## Operating discipline

- The AI owns routine sequencing and technical choices within the agreed scope. Do not ask the owner to choose ordinary frameworks, CSS details, test order, internal tools or implementation mechanics when the system can decide responsibly.
- Ask the owner only for missing source material or business facts, account/repository access, credentials they must provide, rights/permissions, material scope or commercial decisions, explicit approvals, and consequential external actions.
- Do not make clients repeat information already present in interview material, assets, links or the conversation.
- Keep the process as light as the project permits. Lifecycle stages and specialist checklists are guidance; create an artifact only when it improves the website, traceability, safety, handover or reproducibility.
- Never create a dashboard, database, project-state manifest, stage registry, approval state machine, artifact quota, inbox workflow or issue-based task system as a duplicate of the project conversation without a demonstrated need and explicit owner approval.
- GitHub branches and pull requests are for code isolation and review, not for asking the owner to manage routine project progression.

## Visual continuity and owner judgment

- **Owner feedback on the rendered result is binding design input.** A direct rejection such as "generic", "AI slop", "less clean" or "worse than the previous version" rejects the current visual direction. Stop polishing that direction; identify the concrete causes and return to the last owner-preferred baseline. Do not defend a rejected design with CI scores, AI self-review or trend arguments.
- **Pin the intended baseline before changing a design.** Inspect its exact repository, branch, commit and rendered screenshots, along with the owner's previous visual feedback. Continue from the owner-selected baseline by default. Do not silently switch to `main`, an older scaffold or an unrelated experiment branch when a more relevant selected baseline exists.
- **Preserve proven visual work.** Retain the elements that made the selected baseline successful unless a specific visitor/business problem or owner instruction justifies changing them. A redesign requires a clear reason; "more output", "more modern" or "more visual" alone is not permission to discard the existing visual identity.
- **Interpret "more" as better communication, not more furniture.** Improve composition, hierarchy, typography, relevant imagery, useful information display and responsive craft. Do not use extra sections, cards, labels, numbers, animation, decorative maps or empty space as proxies for quality. Every visible element must earn its place by helping the visitor understand, trust or act.
- **Separate technical and aesthetic verdicts.** Build, accessibility, contrast, typography and responsive gates verify measurable properties; they do not decide whether a design is distinctive or good. Inspect actual desktop and mobile screenshots at useful scale. Until the owner has reviewed the rendered result, report owner visual review as PENDING—not accepted, approved or visually converged.

## Website quality and safety

- Use the simplest stack that meets the real business need. Do not add a backend, CMS, accounts, payments or integrations without a demonstrated requirement.
- Preserve successful work; refine against reproducible findings instead of restarting without cause.
- Every visible interactive affordance must perform its stated action. Never fake submission, booking, storage or success.
- Never infer business facts, product properties, consent, asset rights or publication permission from an image alone.
- Keep private contacts, client materials, secrets and credentials out of public repositories and shared blueprints. Never commit `.env` files, API keys, passwords, tokens or private customer data.
- Do not publish, spend money, change DNS, send external messages or transfer ownership without explicit authorization from the appropriate owner.
- Distinguish preview from production. A passing build or CI run is not client approval or release authorization.
- CI may run build, lint, unit, browser, responsive, accessibility and other website-quality checks. It must not manage project stages, issue simulated approvals or become a second workflow authority.

## Completion report

Report the goal, scope, changed files, actual checks and results, remaining risks, and branch/PR/commit links. Never claim a test, deployment, verification or integration that was not actually performed.
