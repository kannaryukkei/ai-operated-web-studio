---
name: media-sourcing-and-licensing
description: Plan and source business-specific visual assets, verify exact-item licences and third-party rights, preserve provenance and prepare optimized local website media.
---

# Media Sourcing and Licensing

## Authority and operating mode

Follow the current project conversation, Master Skill v1.13 and the applicable asset/permission safeguards. This skill is a specialist method, not a new project stage, approval authority or required document workflow.

- In `client_service`, never publish client work, identifiable people, stock media or third-party brands without appropriate rights, consent and publication permission.
- In `studio_development`, synthetic imagery and fictitious media may be used for internal testing when clearly labelled. Development mode does not waive licensing, privacy or third-party rights and never authorizes public release.

## Mission

Choose media that helps the visitor understand the actual business. The target is not "more stock photos"; use the right asset for the right purpose, with trustworthy provenance and purposeful presentation.

## Plan before sourcing

For each image/video/animation that could improve the page, decide its section, visitor/business purpose, required/optional status, subject/context, proof class, aspect ratio, crop/focal point, alt/caption purpose, rights requirements, loading behavior and fallback.

Use proof classes carefully:

- `CLIENT_WORK`: authentic work only when the real source and permissions are evidenced.
- `STOCK_CONTEXT`: licensed generic context, never represented as the client's business/work.
- `CONCEPT_ART`: AI-generated or illustrative concept, not actual premises/work/customer proof.
- `PRODUCT_ASSET`: a real product asset with source and intended-use permission.

Do not invent a gallery slot when media does not support a visitor question.

## Prioritize authentic material

1. Review client-owned or client-supplied media first.
2. Confirm creator/source, owner, intended use, commercial permission, model/property release, trademarks and publication approval.
3. Ask for only missing high-value material; provide a compact, example-led request.
4. If authentic media is unavailable, determine whether licensed stock can explain context without implying that it depicts the client.
5. Use concept imagery only with clear disclosure and never as proof.

A client upload does not establish ownership or publication rights. Keep uncertain permission pending.

## Find and verify stock

Professional sources may include Adobe Stock, Envato Elements and Shutterstock. Free-stock libraries may be candidates only after their current exact-item licence and provider terms are checked.

Examples:
- Pexels — inspect its licence and depicted third-party rights.
- Unsplash — inspect its licence and depicted third-party rights.
- Pixabay — inspect the current content licence.
- Mixkit — commercial use requires the exact item to have a Free License, not a Restricted License.
- LottieFiles — verify the exact item licence.
- Openverse/Wikimedia Commons — follow the original source and check exact CC/public-domain licence and attribution/share-alike requirements.

A search engine or aggregator is not a licence grant. Open the exact asset page and applicable licence terms. Do not scrape, bulk-download, bypass restrictions, compile a competing asset library or automate provider-site downloads.

Score shortlist candidates 0–5 for relevance, subject/context match, brand fit, composition/crop and technical quality. Use 18/25 only as a shortlist heuristic; rights remain a separate pass/fail gate.

Inspect identifiable people, faces, license plates, logos, private buildings, artwork, screens, music/audio and misleading context. If permission cannot be established, block the asset or choose another.

## Generate and import concept media

Use native ChatGPT Image Generation in the same working session when available. Label generated assets `AI_GENERATED` + `CONCEPT_ART` + `client_proof=NO`. Do not present them as actual client premises, work, customers or products.

Where the Starter local media inbox is applicable, use `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md` to import files from Downloads and create responsive variants. It does not automate browsers/provider sites, licence acceptance or downloads, and it requires no API key. If the inbox is not needed, simply place optimized assets in the website repository and record their origin.

## Prepare and implement selected files

Preserve original files. For each chosen asset, retain the exact source/item URL, creator/owner, licence name/URL/date, provider-terms decision, proof class, permission/consent state, intended role, alt/caption, crop/focal point and optimized local path. A compact asset register is useful for multiple assets; do not create one by default for a single obvious image.

Implement images with responsive sources, meaningful alt text, width/height or aspect ratio, lazy loading below the fold and high loading priority only when appropriate for the hero. For video, provide a poster, meaningful controls, captions/transcript when speech matters, no sound autoplay and a conservative preload. Respect reduced motion for video/animation.

## Handoff and quality check

Give the project conversation a concise summary of selected assets, their business purpose, provenance/licence, proof class, crop plan, remaining permission blockers and safe fallback.

A selected asset passes only when it supports a real section purpose, exact source/licence is traceable, commercial use is permitted, applicable third-party rights are clear, authenticity is not misrepresented, the file is optimized/responsive/accessible and any required client permission is explicit.

If any condition fails, omit the asset, leave it pending or use a truthful concept fallback. Never silently waive a rights check.
