# Media & Asset Pipeline v1.0

**Document ID:** AWOS-MEDIA-001  
**Version:** 1.0  
**Status:** Candidate for Starter workflow  
**Workflow mapping:** Master Stage 0, Stage 5 and Stage 7 — no additional Master Skill stages  
**Operating model:** API-free / manual sourcing / locally stored approved assets

## 1. Purpose

Make the actual business visually legible and compelling. The website should use relevant photography, video, animation and illustration to explain the offer, communicate the customer's context, show approved proof and improve conversion—not merely decorate a generic layout.

This pipeline supplements the existing Client Material Ingestion Protocol, Asset/Permission Register, Section Map, Design Direction and Independent QA. It does not replace them or create a parallel approval system.

## 2. Operating principles

1. **Client-owned reality first.** Prefer the client's real premises, staff, products, service process, completed work, product packaging and approved customer proof.
2. **Stock is supporting context, not client proof.** Stock can establish atmosphere or explain a general service category. Never present it as the client's premises, employees, product, completed work, before/after result or customer.
3. **Permission is asset-specific.** A platform-wide "free" label is not a licence record for an individual file. Record the exact asset page, applicable licence, date checked and relevant third-party rights.
4. **Unknown means not publishable.** Client-supplied files do not automatically carry commercial rights. Unknown/restricted rights stay PENDING or BLOCKED.
5. **Design from the business, not from the stock library.** Create the media brief from the approved business/customer questions first; search only for the roles that are actually required.
6. **Local, optimized and traceable.** Put selected media in the project repository. Do not hotlink third-party stock/CDN files as the normal production strategy.
7. **Purposeful motion only.** Animation and video must explain, guide, demonstrate or reinforce the brand. Never use motion solely to make the page look busy.
8. **No invented proof.** AI-generated or stock media must never imply actual client work, customer outcomes, staff or premises. Never fabricate testimonials, reviews, ratings, certification or before/after results.

## 3. Where the pipeline fits

| Master stage | Media responsibility | Required output |
|---|---|---|
| Stage 0 — Material ingestion | Inventory client photos/videos/brand material, source and permissions; record what's missing | Raw Material Index, Asset/Permission Register, Media Readiness Summary |
| Stage 1 — Business intelligence | Identify which visual evidence can answer buying questions and which is missing | Trust/Evidence Register and media gaps |
| Stages 3–4 — Content/WRP | Map the visitor question and section to a visual requirement | Media Requirements Plan linked to Section Map |
| Stage 5 — Art direction | Source, shortlist, validate licence/rights, art-direct composition, decide motion | Approved Asset Shortlist, Asset/Permission Register, Art Direction |
| Stages 5–6 — Build/refine | Prepare local responsive media, responsive crops, captions, fallbacks and behavior | Optimized local media files and implementation notes |
| Stage 7 — Independent QA | Verify visual relevance, rights, alt/captions, crops, responsive behavior, loading and motion | Media QA checklist and screenshot/network evidence |
| Stages 8–9 — Release/calibration | Confirm required approvals/credits and record actual media costs/time | Release evidence and retrospective |

Gates remain unchanged: G0 covers source facts and asset rights/consent; G2 approves the WRP; G3 confirms content/claims and visual direction; G5 checks production readiness; G6 authorizes release.

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

### C. Studio-created illustration / motion — fallback, not fake evidence

Use original SVG, CSS, simple diagrams or AI-generated concept imagery when real assets and useful stock are unavailable. Label or frame the result so visitors cannot mistake it for the client's real premises, staff, products, customers, completed work or results. Do not use generative media to fabricate proof.

## 6. Sourcing procedure

1. Convert the approved Media Requirements Plan into one search task per visual role.
2. Search the official source/library manually. Do not scrape sites, bulk download, bypass restrictions or build a reusable stock database.
3. Open the exact asset page, not just a search thumbnail.
4. Confirm the asset matches the section, customer, product/service and desired tone.
5. Inspect for visible brands/logos, identifiable people, private property, copyrighted artwork, screens, number plates and misleading context.
6. Read the item's applicable licence and terms. Record the exact licence page, asset page, creator, date checked, commercial-use state, attribution and any release/consent concerns.
7. Score visual suitability (Section 7). Rights are a pass/fail gate, not a score that can be offset by visual quality.
8. Show the shortlist at the agreed visual-direction checkpoint. Record G3 approval against the exact asset IDs.
9. Download the selected original from the authorised page, keep provenance, and place only approved project copies in the project's local media directory.
10. Optimize responsive variants and update the asset register. Do not overwrite the original or remove licence/provenance evidence.

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
- Establish a per-project media budget from the WRP rather than assuming unlimited assets.
- As a starting target, keep a typical optimized hero image under 400 KB and ordinary below-fold images under 250 KB each; treat these as review thresholds, not permission to degrade essential imagery. Measure actual page transfer and LCP in the final environment.
- Prefer a small number of strong business-specific assets over a large generic gallery.
- Run browser screenshot review and a performance/network check. Record NOT TESTED if a metric could not be measured.

## 10. Release gates

An asset may appear in a public build only when:
- the exact item and creator/source are recorded;
- its specific licence/permission supports the intended commercial website use;
- third-party people/property/brand/artwork rights are resolved or not applicable;
- proof class and caption cannot mislead a visitor;
- required credit is present;
- owner/client approval is recorded at the correct gate;
- optimized local file and truthful alt/caption/fallback exist;
- QA confirms crop, loading, accessibility and responsive behavior.

If any condition is unresolved, keep it out of the production build. A preview may use an approved/disclosed concept fallback only within the preview approval policy.

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

This document is a workflow control, not legal advice. For sensitive, high-value, branded, editorial or uncertain use, obtain the relevant rights-holder's permission or qualified legal advice.
