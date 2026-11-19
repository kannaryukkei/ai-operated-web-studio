# Media & Asset Pipeline v1.0

**Status:** Supporting media-rights and implementation reference for Master Skill v1.13  
**Scope:** Optional specialist guidance for projects that need supplied, stock or generated visual assets  
**Operating model:** API-free/manual sourcing and locally stored, rights-cleared assets

## 1. Purpose

Make the actual business visually legible and compelling. The website should use relevant photography, video, animation and illustration to explain the offer, communicate the customer's context, show approved proof and improve conversion—not merely decorate a generic layout.

This guide supplements the project conversation, the material-ingestion and media-sourcing skills, the website design direction and the relevant quality review. It does not require a separate project-management system or fixed artifact pack.

## 2. Operating principles

1. **Client-owned reality first.** Prefer the client's real premises, staff, products, service process, completed work, product packaging and approved customer proof.
2. **Stock is supporting context, not client proof.** Stock can establish atmosphere or explain a general service category. Never present it as the client's premises, employees, product, completed work, before/after result or customer.
3. **Permission is asset-specific.** A platform-wide "free" label is not a licence record for an individual file. Record the exact asset page, applicable licence, date checked and relevant third-party rights.
4. **Unknown means not publishable.** Client-supplied files do not automatically carry commercial rights. Unknown/restricted rights stay PENDING or BLOCKED.
5. **Design from the business, not from the stock library.** Create the media brief from the actual business and visitor questions first; search only for roles that are genuinely required.
6. **Local, optimized and traceable.** Put selected media in the project repository. Do not hotlink third-party stock/CDN files as the normal production strategy.
7. **Purposeful motion only.** Animation and video must explain, guide, demonstrate or reinforce the brand. Never use motion solely to make the page look busy.
8. **No invented proof.** AI-generated or stock media must never imply actual client work, customer outcomes, staff or premises. Never fabricate testimonials, reviews, ratings, certification or before/after results.
9. **Provider terms are a separate gate.** A content licence does not automatically authorize accessing the provider for every project purpose or acquiring content by every method. Check the provider's current Terms of Service, API/download rules and project-context restrictions before accessing, downloading, caching or embedding media.

## 3. Where the pipeline fits

Use this guidance when the website genuinely needs external, supplied or generated visual assets. Typically, media review happens after the business and page purpose are understood and before selected assets are implemented. Re-check rendered crops, rights and loading behavior during website QA. It is an optional method, not a mandatory stage sequence.

For real client work, the business owner must supply or confirm rights/consent where required, and the Studio owner must explicitly authorize consequential publication/release actions. Keep those decisions in the project conversation, linked to the exact asset when practical. A build, screenshot or licence record alone is not publication approval.

## 4. Media requirements before searching

For every planned image, video or animation, record:
- requirement ID and target section;
- visitor question / business job the media supports;
- exact subject, context and useful visual detail;
- whether it must be actual client evidence or may be illustrative;
- preferred source hierarchy and minimum quantity;
- orientation/aspect ratio, target dimensions and focal point;
- caption/alt-text intent;
- permission and publication gate;
- fallback if no suitable asset exists;
- expected file weight and loading behavior.

Do not start with generic keywords such as "business website stock photo". Translate the business into specific search phrases. Example for a motorcycle detailing business:

- motorcycle detailing close up foam wash
- motorcycle paint correction polishing close up
- motorcycle ceramic coating application
- motorcycle detailing workshop wide interior
- motorcycle mechanic hands cleaning engine detail

These are search phrases only; a search result is not evidence of a specific business's work or permission.

## 5. Source hierarchy

### A. Client-supplied originals — first choice for authenticity

Request only what is needed: logo/brand files, exterior/interior of premises, team (if relevant), product/service context, real work-in-progress, real completed results, product catalogue and approved customer material.

The studio should provide a compact asset request to the client, not a long technical questionnaire. Suggested minimum for a visual business: 1 strong hero/context photo, 3–6 actual service/product images, 2–4 process/detail photos, and 4–8 approved gallery items where a gallery materially helps the buying decision. These are planning recommendations, not mandatory quotas.

### B. Free stock libraries — supporting visual context

The following are source options, not a blanket approval of every asset:

| Source | Useful media | Commercial-use rule to verify per item |
|---|---|---|
| Pexels | Photos and video | Pexels License generally permits free commercial use without attribution. Do not imply endorsement, misuse identifiable people/brands, redistribute stock as a standalone library or use it as a trademark. |
| Unsplash | Photography | Unsplash License generally permits free commercial and non-commercial use without attribution. Do not resell unmodified images or compile them to replicate a competing service. Consider people, property, artwork and trademark rights separately. |
| Pixabay | Photos, video, illustration, audio | Review the current Pixabay Content License and prohibited-use rules for the selected item; do not redistribute the asset standalone. |
| Mixkit | Video, motion/creative assets, audio | Verify the individual item's license. Only items marked Free License may be used commercially; Restricted License is not suitable for commercial client websites. |
| LottieFiles | Lottie animation | Verify the animation is covered by Lottie Simple License or a suitable commercial licence. Free Simple License permits commercial use subject to the same licence terms; attribution is optional but encouraged. |
| Openverse / Wikimedia Commons | Openly licensed media | These are discovery/catalogue sources. Verify the original item's licence (CC0, CC BY, CC BY-SA, public domain, etc.), attribution, share-alike and third-party rights. The search service itself is not the licence. |

Official licence references (check again when each asset is acquired):
- Pexels: https://www.pexels.com/license/ and https://www.pexels.com/terms-of-service/
- Unsplash: https://unsplash.com/license and https://unsplash.com/terms
- Pixabay: https://pixabay.com/service/license-summary/
- Mixkit: https://mixkit.co/license/ and the exact item licence modal
- LottieFiles: https://lottiefiles.com/page/license and https://help.lottiefiles.com/animation-licensing-basics-
- Openverse: https://openverse.org/ (then follow the original source and licence)

A "free" stock licence normally grants a copyright-use permission within stated limits. It does not automatically clear model releases, trademarks, private property, artwork, logos, music or implied endorsements. Check the actual depicted content and the terms.


**Provider-terms gate — read before accessing a source.** The source table above is a discovery list, not blanket approval to use any service in any context. Review the current provider Terms of Service separately from the exact content licence. Record the provider-terms URL/date, the actual project context (for example, client production, portfolio, internal experiment, performance benchmark or competitive-product development), the acquisition method and a decision of APPROVED/PENDING/BLOCKED. If the terms expressly prohibit the context/method, mark BLOCKED. If ambiguous, mark PENDING and do not access, download, automate, cache or embed until express written provider permission or an approved legal/policy decision resolves it.

As one example, Pexels' Terms of Service page reviewed 2026-11-16 displays a last-updated date of November 15, 2024. Section 8 includes wording restricting access to its Service for purposes of performance benchmarking or building/marketing a competitive product, and also addresses unauthorized automated extraction and bulk/systematic copying. The scope of that wording for a downstream website-production workflow benchmark is not determined by this guide. Do not infer either that it certainly applies or that a general commercial-use content licence overrides it. Treat that project context as PENDING until the provider confirms the permitted scope. Separately, Section 5 and Pexels' help guidance warn that depicted trademarks, logos and third-party rights may require separate permission.

### Professional stock and AI-generated image lanes

Professional stock is a normal option for ordinary commercial client websites when exact-item content licensing, provider terms, project context, acquisition method and depicted third-party rights all pass. Candidates:
- **Adobe Stock** — non-editorial stock items can be used in websites and commercial creative projects under the applicable licence. Use the provider's official License action for the exact item. Treat each client project independently; do not assume one licensed download covers unrelated client projects. Editorial-only media is not commercially cleared.
  - Usage/licensing: https://helpx.adobe.com/stock/help/usage-licensing.html
  - Official website workflow: https://helpx.adobe.com/stock/help/using-adobe-stock-website.html
  - Adobe Stock terms: https://www.adobe.com/go/stockterms
- **Envato Elements** — each download is registered to a specific project; new projects require the relevant project licence. Client transfer is limited to the final End Product and does not give the client standalone rights to extract/reuse the raw asset. Its acceptable-use rules prohibit automated/bot/script access and retrieval; use the official site manually.
  - Licence: https://elements.envato.com/license-terms
  - Client work: https://help.elements.envato.com/hc/en-us/articles/360000621263-Can-I-use-Envato-Elements-items-for-client-work
  - Client transfer: https://help.elements.envato.com/hc/en-us/articles/360000621283-Can-I-transfer-an-Envato-Elements-license-to-a-client
  - Acceptable use: https://envato.com/acceptable-use-policy/
- **Shutterstock** — optional alternative; verify the exact item, plan, intended website use and current terms: https://www.shutterstock.com/license

The exact content licence and provider Terms of Service are separate mandatory gates. Professional photography can be genuine, high-quality category context; it is never the client's own workshop, staff, customers, products or completed work merely because it looks relevant.

AI-generated imagery is a first-class `CONCEPT_ART` source for editorial hero imagery, atmosphere, abstract service context and generic visual storytelling. It must never fabricate actual business evidence. Record `source_type=AI_GENERATED`, `proof_class=CONCEPT_ART`, `client_proof=NO`, the generating tool/session and prompt reference. Avoid recognizable third-party logos/trademarks and unintended likeness. Keep rights/publication PENDING until project approval is completed. Use ChatGPT native Image Generation in the same working session and the standard Save action; no image API key is required.

### API-free local media inbox

The local watcher `blueprints/starter/template-kit/starter/scripts/media-inbox.mjs` removes repetitive file handling after an image is saved. Blank Starter ships a self-contained copy of this helper alongside `src/components/ResponsiveImage.js`; a parity regression keeps the Blank and ZACKS copies aligned: deterministic ID/hash naming, original preservation, optional asset-register insertion, import logging and optional responsive WebP variants. When this helper is useful, prepare an ordered `media-import-queue.json`; the operator starts `npm run media:watch` once and saves each image to Downloads through ChatGPT or the licensed provider's official UI. It does not browse or automate provider websites, click Save/License, download stock, approve rights or select images for build. Sharp is resolved from the target website project's own dependencies. Without optional Sharp it preserves the source and records the optimization limitation. See `docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`.

### C. Studio-created illustration / motion — fallback, not fake evidence

Use original SVG, CSS, simple diagrams or AI-generated concept imagery when real assets and useful stock are unavailable. Label or frame the result so visitors cannot mistake it for the client's real premises, staff, products, customers, completed work or results. Do not use generative media to fabricate proof.

## 6. Sourcing procedure

1. When a separate media plan is useful, turn each important visual role into a focused search task.
2. Before accessing the provider, review its current Terms of Service and acquisition/API rules against the actual project purpose and method. Record the provider-terms URL/date, project context, acquisition method and APPROVED/PENDING/BLOCKED decision. Do not access or acquire content while this check is PENDING or BLOCKED.
3. Search the official source/library manually only after the provider-terms gate passes. Do not scrape sites, bulk download, bypass restrictions or build a reusable stock database.
4. Open the exact asset page, not just a search thumbnail.
5. Confirm the asset matches the section, customer, product/service and desired tone.
6. Inspect for visible brands/logos, identifiable people, private property, copyrighted artwork, screens, number plates and misleading context.
7. Read the item's applicable content licence and record the exact licence page, asset page, creator, date checked, commercial-use state, attribution and any release/consent concerns.
8. Score visual suitability (Section 7). Rights are a pass/fail gate, not a score that can be offset by visual quality.
9. Present any material asset choice or permission question in the project conversation. Obtain explicit rights/publication approval from the relevant owner before real-client public use.
10. Acquire the selected original only through a method allowed by the provider's terms; keep provenance and place only approved project copies in the project's local media directory.
11. Optimize responsive variants and update the asset register. Do not overwrite the original or remove licence/provenance evidence.

If no asset passes, omit the visual, use a clearly disclosed concept fallback, or ask the owner for the missing original. Do not lower the rights bar to fill a gallery.

## 7. Asset suitability score

Score each candidate 0–5 in each category:

| Dimension | What to assess |
|---|---|
| Business relevance | Does it visually explain this exact business, service, customer or buying question? |
| Subject/context match | Is the vehicle/product/person/action correct, rather than a superficial keyword match? |
| Brand fit | Does lighting, color, energy and craft quality fit the approved art direction? |
| Composition/crop | Is there a usable focal point and enough resolution for the target layout and responsive crops? |
| Technical quality | Is it sharp, well exposed, clean, free of distracting compression/watermarks and suitable for optimization? |

Use 18/25 as a shortlist threshold. This score does not approve rights. Any unresolved licence, privacy, trademark, consent or property issue blocks publication regardless of score.

## 8. Asset register and proof classes

The existing content-asset-register.csv remains the one canonical register. Add the media-specific fields from the template; do not create competing asset truth tables.

Each real asset row must include its source/page, creator/owner, intended role/section, licence/permission evidence, commercial-use decision, third-party-rights status, publication approval, credit, crop/alt-text and optimized local path.

Use an explicit visual proof class:
- CLIENT_WORK: only actual client material with owner authority, appropriate rights and any required people/property releases.
- STOCK_CONTEXT: stock used as illustrative context; may not be labelled or arranged as the client's completed work, staff or premises.
- CONCEPT_ART: studio-created illustration or generated concept; disclose where needed and never claim as actual evidence.
- PRODUCT_ASSET: approved product/catalogue art supplied or licensed for the exact use.

A stock/context or concept asset must never be represented as CLIENT_WORK.

## 9. Build and performance rules

### Images
- Store project-selected originals and optimized versions locally (for example, public/media/).
- Generate appropriately sized responsive variants; use AVIF/WebP with a compatible fallback where useful.
- Use srcset/sizes or picture for materially different viewport/crop needs.
- Set intrinsic width/height or aspect ratio to avoid layout shift.
- Give informative images concise, truthful alt text; decorative images use empty alt and must not duplicate adjacent copy.
- Lazy-load below-the-fold images; give only the actual hero/critical image high loading priority.
- Crop around the recorded focal point; inspect actual desktop/tablet/mobile renderings.
- Do not hotlink a stock/CDN image as the default delivery strategy. Preserve the exact source URL in the register even after storing a local optimized copy.

### Video
- A video must have a purpose, poster image, dimensions/aspect ratio and a clear fallback.
- No autoplay with sound. User-controlled video uses controls; meaningful speech/video gets captions or a transcript.
- Decorative loops must be muted, inline, short, lightweight and optional; respect prefers-reduced-motion and provide a static poster/fallback.
- Avoid downloading/loading large video before it is needed. Use preload=none by default and avoid making video the only way to understand essential information.
- Verify the source licence covers commercial web display and any audio/music included.

### Animation and motion
- Prefer CSS or original SVG for simple UI transitions and diagrams.
- Use Lottie only when the exact animation licence is suitable and the animation adds explanation or feedback.
- Keep controls keyboard accessible. Never make important information available only through motion.
- Respect prefers-reduced-motion; avoid scroll-jacking, flashing, looping motion without purpose and unnecessary autoplay.
- Do not introduce a motion library just to animate ordinary hover/fade states.

### Budget and measurement
- Establish a media budget from the agreed project scope; never assume unlimited stock or tooling spend.
- As a starting target, keep a typical optimized hero image under 400 KB and ordinary below-fold images under 250 KB each; treat these as review thresholds, not permission to degrade essential imagery. Measure actual page transfer and LCP in the final environment.
- Prefer a small number of strong business-specific assets over a large generic gallery.
- Run browser screenshot review and a performance/network check. Record NOT TESTED if a metric could not be measured.

## 10. Client/publication safety

In `client_service`, an asset may appear in a public build only when:
- the exact item and creator/source are recorded;
- its specific licence/permission supports the intended commercial website use;
- third-party people/property/brand/artwork rights are resolved or not applicable;
- proof class and caption cannot mislead a visitor;
- required credit is present;
- the relevant business/rights holder has explicitly approved the intended use;
- optimized local file and truthful alt/caption/fallback exist;
- QA confirms crop, loading, accessibility and responsive behavior.

In `studio_development`, synthetic assets may appear only in a local/private internal preview with clear development labelling; no public release or deployment is permitted. In `client_service`, if any real-publication condition is unresolved, keep the asset out of production. Any preview fallback must be disclosed and must not misrepresent real work.

## 11. Acceptance criteria

Media Pipeline passes for a project when:
- every planned visual maps to a visitor question/business job and target section;
- the plan states real-client-proof vs illustrative media;
- the client asset request and missing-media list are concise and prioritized;
- every selected asset has an exact source and asset-specific rights record;
- no stock or generated asset is presented as client proof;
- restricted/unknown use is blocked;
- selected media is local, responsive, optimized and accessible;
- video/motion respects controls, reduced-motion and fallback requirements;
- actual rendered screenshots and measured media evidence are retained;
- remaining gaps are recorded rather than concealed.

## 12. Scope and limitations

The workflow is API-free. AI may recommend search terms, shortlist criteria, crops, alt text and implementation patterns; it does not grant licences, verify private releases, approve publication, download/scrape assets automatically or guarantee legal rights. The operator/owner remains responsible for checking the exact item and intended use.

This document is practical operating guidance, not legal advice. For sensitive, high-value, branded, editorial or uncertain use, obtain the relevant rights-holder's permission or qualified legal advice.
