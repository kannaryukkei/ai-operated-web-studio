# ADES 2.0 — Quick Start

**One project. One ChatGPT conversation. Multiple specialist AIs. One final website.**

No API key, agent framework, dashboard or paid integration is needed. The normal setup is manual copy/paste plus one HTML file returned by each specialist.

## First run

1. **Stay in the project's main ChatGPT conversation.** Tell ChatGPT to start ADES 2.0. It uses the current brief, facts, assets, constraints and owner preferences; do not repeat intake.
2. **Let ChatGPT choose the design questions.** It decides whether whole-page or section-level exploration is valuable and assigns independent, non-overlapping first-wave tasks.
3. **Prepare one small packet per assignment.** Use `docs/ADES_PACKET_TEMPLATE.md` only when context must travel to another model/session. Fill only relevant fields. For independent first-wave work, keep the assignments separate and do not include the other explorers' concepts.
4. **Open a temporary chat in each specialist AI.** Paste `docs/ADES_PROMPT.md` and that model's packet/assignment. Ask it to return one standalone HTML file only.
5. **Bring each returned HTML file back to the same ChatGPT conversation.** Upload the file. If the model cannot attach a file, use one complete HTML code block and let the lead save it. No separate explanation is needed.
6. **ChatGPT filters and synthesises.** It reads the concept metadata, quickly checks the rendered idea where possible, removes near-duplicates, deeply inspects useful outliers, and commissions a targeted second wave only for meaningful gaps.
7. **Build and verify one website.** The lead alone integrates the synthesis in the real project and runs the existing AWOS QA. Candidate HTML stays out of production.

## Copy this kickoff instruction into the main conversation

> Start ADES 2.0 for this project. Use all context already available and do not repeat intake. Remain the sole conversation gate and final reviewer. Decide whether multi-model exploration is worth the effort; if yes, identify the highest-value design questions and prepare compact, independent assignments using `docs/ADES_PROMPT.md`. Keep each specialist output to one standalone HTML file. Triage for real novelty before deep review; delegate another wave only to fill useful gaps. Maintain a portable ADES packet only when cross-session continuity is needed. Synthesise and build one final website, then report what was actually inspected and tested.

## When a model runs out of quota or a session ends

Do not transfer the entire conversation. Ask the lead to update the compact `ADES_PACKET.md` with:
- confirmed facts and non-negotiable constraints;
- assignments completed and concise concept hypotheses;
- KEEP / ADAPT / REJECT decisions;
- remaining design gaps;
- the next exact assignment.

Open a fresh temporary specialist session, provide the updated packet and universal prompt, and continue. The main ChatGPT conversation remains the source of truth.

## Adding or calibrating another AI model

Do not assume a model is good or bad because of its brand. Give a new model the **same small assignment and same factual packet** already used for a comparable explorer, but in an independent session. Compare the returned HTML on:
- design originality and useful difference;
- business/visitor clarity;
- visual craft and responsive composition;
- adherence to facts, assets and constraints.

Record a short qualitative note such as "useful for bold hero concepts" or "strong at restrained editorial layouts" in the lead conversation or current packet. Do not create permanent rankings or benchmark dashboards. Recalibrate when a model or its capabilities change.

## Keep it lightweight

- One HTML file per specialist assignment.
- No full application, ZIP, dependencies, API calls or production code from explorers.
- No need to create a packet for a one-model, one-session task.
- No need to send every candidate to every model.
- Explore until new work stops adding useful diversity—not until a target count is reached.
- Keep only the useful preview files; do not turn exploration into a permanent archive.
- The client/owner sees one recommended synthesis, not a confusing pile of unfinished options.

**Safety:** `client_service` uses only approved facts, assets and rights. Synthetic content is internal-only in `studio_development`. Specialist previews are never production approval.
