# ZACKS Starter Website

A responsive, static-first portfolio reference for the Starter website tier. The site demonstrates a complete one-page journey: editorial hero, vehicle and treatment selection, class-based pricing, Care Finder, service principles, additional treatments, visual gallery, process, service coverage, WhatsApp consultation and FAQ.

## Stack

- React 18
- Vite 6
- Lucide React
- Plain CSS with desktop, tablet and mobile layouts
- No backend, database, CMS, admin dashboard, authentication, analytics or stored booking records

## Run locally

```bash
cd starter
npm install
npm run dev
```

Production build and browser tests:

```bash
npm run build
npm run preview
npm run test:e2e
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
