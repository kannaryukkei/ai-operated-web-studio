# ZACKS Starter Website — React/Vite Reference

A responsive, static-first portfolio reference for the Starter website tier. This implementation is the ZACKS-specific reference used to validate the selected React/Vite Starter stack. It is not a universal blank website. The site demonstrates a complete one-page journey: editorial hero, vehicle and treatment selection, class-based pricing, Care Finder, service principles, additional treatments, visual gallery, process, service coverage, WhatsApp consultation and FAQ.

## Canonical Starter stack

**Owner decision — 2026-11-17: React 18 + Vite 6 is the selected implementation stack for Starter.**

- React 18
- Vite 6
- Lucide React
- Plain CSS with desktop, tablet and mobile layouts
- Node.js 20 or newer
- npm with the committed `package-lock.json`; use `npm ci` for reproducible installation
- Playwright with Chromium for browser regression tests

Starter remains static-first. This reference has no backend, database, CMS, admin dashboard, authentication, analytics or stored booking records. Do not add server-side capabilities without an approved business requirement.

## ZACKS reference boundary

This implementation remains a ZACKS Detailing automotive/local-service reference. It contains brand identity, automotive interactions, sample pricing, contact details, imagery and service-specific content. Do not present it as a universal blank Starter template or deploy it unchanged for another client.

A separate blank Starter variant will use the selected React/Vite stack while excluding ZACKS identity, content, prices, contacts, assets and client-specific interactions. That separation is handled as a distinct implementation task.

## Stack

- React 18
- Vite 6
- Lucide React
- Plain CSS with desktop, tablet and mobile layouts
- No backend, database, CMS, admin dashboard, authentication, analytics or stored booking records

## Run locally

```bash
npm ci
npm run dev
```

Production build and browser tests:

```bash
npm run build
npm run preview
npm run test:e2e
```

Install the browser used by the test suite when needed:

```bash
npx playwright install chromium
```

GitHub Actions runs the Playwright suite at viewport widths from 320px to 1440px. The suite covers responsive overflow, navigation, pricing interactions, Care Finder, WhatsApp handoff, date handling, image loading, typography, contrast and content-evidence safeguards.

## Demonstrated website capabilities

- Responsive navigation and editorial page layout.
- Interactive vehicle selection and S / M / L / XL class-based package pricing.
- Care Finder: a guided starting recommendation based on the visitor's stated need.
- Additional service cards with starting-price presentation.
- Service philosophy, visual gallery, process explanation, service coverage and FAQs.
- WhatsApp consultation form that prepares a message without storing data or confirming an appointment.
- Evidence-led content presentation: the reference does not invent customer stories, testimonials, ratings or business-performance metrics.

## Content configuration

Edit `src/data/zacks-site.js` to update approved business details, pricing, vehicle classes, add-on services, gallery images, FAQs, process, photo credits and service coverage.

Do not add fictional customer identities, quotations, ratings, review counts, awards, conversion figures or business-performance statistics to simulate trust. When verified proof is unavailable, omit the proof section rather than filling it with sample social proof. See [Starter Content Evidence Gate](../../../../docs/STARTER_CONTENT_EVIDENCE_GATE_v1.0.md).

The package finder and consultation form are client-side only. The form composes a WhatsApp message; it does not store booking data or confirm an appointment.

## Production content gate

- This reference keeps `site.contentMode: 'portfolio-demo'` so the footer identifies it as a portfolio demonstration. It does not enable fabricated testimonials or performance metrics.
- Before any live release, reconcile services, inclusions, exclusions, prices, service areas, public WhatsApp number, social destinations, policies and visual permissions with the owner's current approved source. The static fallback catalog is not proof of the current live Laravel catalog.
- Replace or approve every visual reference. Unsplash imagery is illustrative reference material, not documentation of completed ZACKS customer work.
- No action should be called a confirmed booking unless a real booking workflow exists. The current form only opens a prefilled WhatsApp consultation message.
- The starter template keeps `noindex,nofollow` in `index.html`; remove or replace this safeguard only after the owner approves the production domain and launch.
- Only publish reviews, testimonials, ratings, awards or performance claims when their source, accuracy, publication permission and owner approval are recorded.

## Demo content and accuracy

This repository is a **portfolio demonstration**, not an operational ZACKS production website.

- Package and add-on values are based on the audited ZACKS frontend fallback catalog. They must be reviewed against the current owner-approved catalog before operational use.
- Vehicle classes and model examples are guidance only; the final class is confirmed during consultation.
- Hero and gallery photos are visual references sourced from Unsplash, with photographer credits in the page. They are not documentation of completed ZACKS customer work.
- Service facts and consultation copy are based on the available audited materials and still require owner confirmation before launch.
- Replace or approve all data, images, pricing, claims and policies before using this site as a live business website.

## Product scope

The site remains static-first. WhatsApp links open a prefilled conversation; the website does not record bookings or save submitted customer data.


## Media inbox

Copy `media-import-queue.example.json` to `media-import-queue.json`, populate it from the approved media plan, then run `npm run media:watch`. Save each next image using ChatGPT Images' Save control or the licensed stock provider's official download UI. The watcher imports and records new files without manual renaming, moving or register editing. It never approves publication; rights, licence and provider-terms decisions remain pending for explicit review. A failed file can be retried by passing its exact path with `npm run media:watch -- --retry "<file-path>"`. Optional responsive WebP variants require `npm install --save-dev sharp`. Full instructions: `../../../../docs/MEDIA_IMPORT_AUTOMATION_v1.0.md`.
