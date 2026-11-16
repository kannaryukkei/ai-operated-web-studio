---
name: media-sourcing-and-licensing
description: Build a business-specific media requirements plan, discover suitable free or licensed photos/videos/animations, check exact item licences and third-party rights, keep provenance, and prepare optimized local media for Starter websites. Use during Stage 5 and revisit during Stage 7.
---

# Media Sourcing and Licensing

## Authority

Follow docs/MEDIA_AND_ASSET_PIPELINE_v1.0.md, the Client Material Ingestion Protocol, current Asset/Permission Register, WRP and approval policy. This skill is an execution aid for existing Master Stages 0, 5 and 7; it does not create another Master stage or approval authority.

## Mission

Make the actual client's business visually legible and compelling. The target is not "more stock photos"; it is the right media for the right business question, with trustworthy provenance and purposeful presentation.

## Inputs

- Approved Client Brief, source/fact/evidence registers and customer journey.
- Approved WRP and Section Map.
- Client-supplied photos, video, logo, product/catalogue imagery and brand guidelines.
- Current Asset/Permission Register and G0/G2/G3 status.
- Reference direction and visual design acceptance criteria.

## Procedure

### A. Create the media plan before browsing

For each planned image/video/animation, define:
- unique media requirement ID;
- page section and customer question/business job;
- exact subject/context and proof class (CLIENT_WORK, STOCK_CONTEXT, CONCEPT_ART, PRODUCT_ASSET);
- required or optional; preferred quantity;
- preferred source hierarchy;
- aspect ratio/orientation, target dimensions and crop/focal point;
- alt/caption purpose;
- fallback and omission behavior;
- rights and publication gate;
- expected file weight and loading behavior.

Map it to the Section Map. Do not invent a gallery slot when it does not support a visitor question. Do not search generic stock before understanding which business detail must be shown.

### B. Prioritize authentic media

1. Ask for existing client-owned media that shows the real business and offer.
2. Confirm owner/creator, source, intended use, commercial permission, model/property release, visible trademarks and publication approval.
3. Request only the missing high-value media; use a compact, example-led client request.
4. If authentic media is unavailable, decide whether suitable stock can explain general context without implying it is the client's work.
5. Use concept illustration only when clearly identified and not a substitute for evidence.

A client upload does not prove ownership or publication permission. Keep rights PENDING if not evidenced.

### C. Discover candidate assets manually

Use search phrases derived from the business, service, subject, shot type, environment and desired crop. Suitable starting libraries may include:
- Pexels — photos/video; check Pexels License and depicted third-party rights.
- Unsplash — photography; check Unsplash License and depicted third-party rights.
- Pixabay — images/video/audio; check current Pixabay Content License.
- Mixkit — video/motion/audio; commercial use requires the exact item to carry Free License, never Restricted License.
- LottieFiles — animation; check exact item licence, such as Lottie Simple License.
- Openverse/Wikimedia Commons — discovery sources; follow the original source and inspect its exact CC/public-domain licence and attribution/share-alike requirements.

Never treat a search engine or aggregator as a licence grant. Open the exact asset page and the applicable licence page. Do not scrape, bulk-download, bypass restrictions, compile assets into a competing library, or use an API to build an asset dataset.

### D. Score relevance and inspect rights

Score visual candidates 0–5 for:
- business relevance;
- subject/context match;
- brand fit;
- composition/crop;
- technical quality.

Use 18/25 as a shortlist threshold only. Rights are a separate pass/fail gate.

Inspect identifiable people, faces, license plates, brand logos, private buildings, artwork, screens, music/audio and any misleading context. If a required release or permission cannot be established, keep the asset blocked or choose another asset.

Use proof classes carefully:
- Stock image/video = STOCK_CONTEXT, never client work.
- Generated illustration = CONCEPT_ART, never actual premises/work/customer.
- Real work photo = CLIENT_WORK only when client source, owner permission, people/property releases where applicable and approval are recorded.
- Product art = PRODUCT_ASSET only with source and intended-use permission.

### E. Record and prepare files

Update the one canonical content-asset-register.csv. Record:
- source URL and exact asset page URL;
- creator/owner and media type;
- intended role/section and proof class;
- exact content licence name/URL/date, commercial-use state and attribution;
- provider Terms of Service URL/date, actual project-context use, provider-terms decision and permitted acquisition method;
- people/property/trademark checks and evidence;
- permission and publication status/approval reference;
- alt/caption, focal point and crop ratio;
- optimized local project path, format, dimensions/bytes and loading priority;
- notes, restrictions and fallback.

Preserve originals unchanged. Store selected approved project copies in the local project media folder; do not default to remote stock hotlinks.

### F. Art-direct and implement

Make the image composition serve the layout and customer story: select focal point, aspect ratio, crop, contrast, subject placement and responsive variant. Do not choose a strong photograph that leaves the offer/CTA unreadable.

Images: responsive picture/srcset, meaningful alt, width/height or aspect ratio, lazy below fold, high priority only for hero, local optimized file.

Video: poster, useful dimensions, explicit controls when meaningful, captions/transcript if speech matters, no sound autoplay, preload=none default. Decorative loops must be muted, short, low-weight, optional and respect reduced-motion.

Animation: use CSS/SVG for simple UI feedback; Lottie only with verified licence. Respect reduced-motion and keep all essential information available without animation.

### G. Review and handoff

Present a concise shortlist with preview, purpose, source, licence, proof class, crop, rights state and recommendation. Record G3 visual/asset decisions; do not infer approval from a chat reaction or silence.

Return:
- Media Requirements Plan;
- short client asset request / prioritized gaps;
- selected shortlist and rejected candidates with reasons;
- completed Asset/Permission Register records;
- license/source evidence and credit;
- optimized local files and crop/performance plan;
- unverified rights/consent and release blockers;
- exact approval gate/version required.

## Quality gate

Pass only if:
- every selected media item maps to an approved section and business purpose;
- source, exact item page and licence are traceable;
- commercial use is supported by the exact licence;
- third-party rights are clear or not applicable;
- client proof is authentic and approved;
- asset is locally stored, optimized, responsive and accessible;
- video/motion has appropriate fallback/reduced-motion behavior;
- G3 and publication approvals are recorded.

If any condition fails, omit the asset, keep it pending, or use a truthful concept fallback. Do not silently waive a rights check.
