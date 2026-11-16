# Prompt — Creative Direction, Design Specification and Assets

**Master Skill mapping:** Stage 5 — Creative direction and implementation (design portion).  
**Required specialist:** `media-sourcing-and-licensing` when the approved WRP includes external or supplied visual media.

Do not start until the approved WRP is `APPROVED_FOR_DESIGN`, G2 is recorded, and the relevant asset/permission decisions and scope are resolved.

Read `docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md` and activate `media-sourcing-and-licensing`. Act as creative director. Use the approved WRP, customer journey, source-backed content, brand assets, references, Stage 0 Media Readiness Summary and Starter scope. Create:
- Distinctive art-direction statement tied to the actual business, audience and category.
- Design fingerprint and rationale; do not rely on palette/font changes alone for differentiation.
- Color, typography, spacing, grid, layout, component, imagery and motion direction.
- Intentional desktop/tablet/mobile composition and responsive behavior.
- Media Requirements Plan mapping each important visual to a visitor question, section, proof class, priority, required subject, source preference, aspect ratio, focal point, fallback, performance expectation and approval gate.
- Asset shortlist from client originals first, then exact-item-verified commercial stock where it is only STOCK_CONTEXT, then clearly disclosed studio concept artwork if needed.
- Asset plan/register with exact asset page, creator, content licence, provider Terms of Service, project context, acquisition method, commercial-use decision, people/property/trademark checks, credit, proof class, crop, local path and publication state.
- Professional stock shortlist from Adobe Stock / Envato Elements / Shutterstock where appropriate; verify exact item licence and separate provider terms. Use the official provider UI; never automate discovery, licensing or downloads.
- When suitable, create an ordered `media-import-queue.json` and generate original concept images with native ChatGPT Image Generation in this same work session. Generated media is CONCEPT_ART, never client evidence.
- A compact client asset request for high-value missing real business media; no long technical questionnaire.
- Visual concept/reference board and design acceptance criteria.
- Design Implementation Spec when the approved target is a supplied screenshot, mockup or selected visual reference; use `design-screenshot-spec` for a traceable, measured/inferred handoff.

Missing client photography is not a blocker to a coherent preview, but it is often a production trust gap. Do not search stock until the Media Requirements Plan is tied to the approved WRP. Prefer authentic client media for their real workshop, people, products and completed work; use free-stock sources only for STOCK_CONTEXT. Never represent stock as the client's premises or results. Before accessing or acquiring any stock asset, verify both the provider's current Terms of Service for this project purpose/acquisition method and the exact item's content licence; ambiguous benchmarking, competitive-use, automation, scraping or bulk-copy restrictions are a stop gate. Then verify depicted third-party rights. Use disclosed concept imagery or designed illustration only as a truthful fallback. Never imply generated imagery depicts the real client's premises, staff, products, customers or completed work. Use `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md` and the local `npm run media:watch` inbox to import saved images automatically. Do not ask the operator to rename/move files or edit the register manually. Keep rights/publication pending until reviewed. Use local, optimized files; no default third-party hotlink. Video needs a poster, no sound autoplay, controls/captions where meaningful and reduced-motion fallback. Animation must respect reduced motion and remain nonessential to understanding. Never fabricate social proof, even for a portfolio demo. Do not copy competitor identity or exact layouts.

Present the visual direction at the agreed checkpoint. Record G3 content/claims and visual-direction confirmations/decisions against the exact artifact version. The client confirms business accuracy and approved use of client-identifiable material; the Studio owner controls policy claims and material scope/cost changes. Do not ask the client to prescribe hidden implementation mechanics.

## Required output

Art-direction document, design fingerprint, responsive composition plan, Media Requirements Plan, selected/rejected asset shortlist, asset/permission map with exact licence evidence, client asset request, media performance/motion plan, reference list, Design Implementation Spec (when applicable), unresolved rights and exact G3 status.
