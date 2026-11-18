# Media Import Automation v1.0

**API-free local handoff for two image lanes: AI-generated concept images and professionally licensed stock.**

## One-time setup per website project

1. Copy `media-import-queue.example.json` to `media-import-queue.json`.
2. Prepare the queue from the project's chosen media needs. Each item is one image, with an optional unique asset ID and target section. Keep queue order aligned with download order.
3. Run `npm install` in the website project.
4. Optional one-time install for responsive WebP output: `npm install --save-dev sharp`. Without Sharp, the importer preserves the original and records that optimization was not performed.
5. Run `npm run media:watch` from that website folder. Default watched folder is the user's Downloads directory. To override: `npm run media:watch -- --downloads "D:\\Users\\<you>\\Downloads"`.

## Each image batch

1. Prepare an ordered queue and image prompts when the project needs multiple media imports.
2. For concept art, use native ChatGPT Image Generation in the same AI work session, then click Save in ChatGPT Images to download the generated file.
3. For professional photography, open the exact asset page, verify its item licence and current provider Terms of Service/project context, then use the provider's official License/Download control. Adobe Stock and Envato Elements are supported candidates. Envato discovery, licensing and download must stay manual in its official UI. Register the item to the specific client/project and respect client-transfer restrictions.
4. With the watcher running, save/download only the next queued image. Do not download unrelated images until the queue is empty; new supported files are mapped sequentially to queue items.
5. The watcher waits for file stability, detects format, computes SHA-256, preserves the original under `public/media/originals/`, gives the project image a queue-ID/hash name, optionally creates responsive WebP sizes, appends a row (including the SHA-256 source fingerprint) to the canonical `02-content/content-asset-register.csv`, and writes `.studio/media-import-log.json`.
6. Repeat one Save/License action per image. The watcher stops when the queue is empty. Press Ctrl+C to stop early.

## What stays manual

- Start the watcher once per batch.
- Click Save/License/Download using the provider's normal interface once per image.
- Verify licence/permissions/consent and approve publication when needed.

No API key, paid image API, stock-site scraper, browser automation, manual file renaming, manual file moving or manual register editing is required.

## Non-negotiable boundaries

- Only files created after the watcher starts are detected; existing Downloads are ignored.
- Each new file is mapped to the next queue item. Keep downloads sequential and avoid unrelated downloads during a batch.
- The watcher does not browse providers, download stock directly, click website controls, bypass restrictions or automate licensing.
- Imported media is never auto-approved. The importer ignores queue-supplied approval claims: rights/publication, content-licence review and stock provider-terms review start PENDING; permission evidence is blank and `is_selected_for_build=NO`. AI output terms are recorded separately and are not treated as a stock licence.
- AI media must be `source_type=AI_GENERATED`, `proof_class=CONCEPT_ART`, `client_proof=NO`; never present it as actual client premises, employees, customers, product state, work results, reviews or before/after proof.
- Stock media is contextual stock, never client proof. Exact-item content licence and provider Terms of Service/acquisition method are separate gates.
- Only image files JPEG, PNG, WebP, AVIF and TIFF are supported. Video/audio/animation retain their existing controlled workflow.
- If Sharp is absent or fails, original files remain; do not claim optimization.

## Recovery and verification

Every import records a SHA-256 hash in both the register and import log. Writes are retry-safe: an identical original file and register row are reused rather than duplicated. If the watcher skips a file after an error, correct the cause and retry that exact saved file without downloading it again:

```bash
npm run media:watch -- --retry "C:\\Users\\<you>\\Downloads\\filename.jpg"
```

The retry command consumes only the first queue item and uses the same project/queue/register options. Confirm the original copy, canonical register row, import log, queue consumption and pending approval states. The import log is not a licence grant or publication approval.
