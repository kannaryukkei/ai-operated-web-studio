# ZACKS Starter Website

A responsive, static-first portfolio demonstration for the Starter website tier. The visual direction is automotive editorial: cinematic photography, bold display typography, a guided vehicle / treatment finder, dynamic package pricing, additional service menu, illustrative social proof, consultation composer, and responsive content sections.

## Stack

- React 18
- Vite 6
- Lucide React
- Plain CSS with desktop, tablet, and mobile layouts
- No backend, database, CMS, admin dashboard, authentication, analytics, or stored booking records.

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

The Playwright responsive smoke suite runs in GitHub Actions at viewport widths from 320px to 1440px. It checks horizontal overflow, mobile navigation, class-based pricing, Care Finder recommendations, and footer bounds.

## Demonstrated website capabilities

- Mobile navigation and responsive editorial layout.
- Interactive vehicle selection and S / M / L / XL class-based package pricing.
- Care Finder: a guided need-based treatment suggestion.
- Additional service cards with starting-price presentation.
- Visual gallery, service philosophy, process explanation, service-area section, and FAQs.
- WhatsApp consultation form with customer, vehicle, area, preferred date, selected treatment, and notes.
- Portfolio demo proof metrics and sample customer-story cards.

## Content configuration

Edit `src/data/zacks-site.js` to update business details, pricing, class examples, add-on services, gallery images, FAQs, process, story scenarios, photo credits, and demo metrics.

The package finder and consultation form are client-side only. The consultation form composes a WhatsApp message; it does not store booking data or confirm an appointment.

## Production content gate

- `site.contentMode: 'portfolio-demo'` enables the explicitly fictional sample metrics and customer stories. Set it to `'client-production'` for a real client site; those simulated proof sections and the portfolio-only footer label will be omitted.
- Before any live release, reconcile services, inclusions, exclusions, prices, service areas, public WhatsApp number, social destinations, policies, and visual permissions with the owner's current approved source. The static fallback catalog is not proof of the current live Laravel catalog.
- Replace or approve every visual reference. Do not convert simulated stories, metrics, or Unsplash references into claims about completed customer work.
- Rename no action as a booking unless a real booking workflow exists. The current form only opens a prefilled WhatsApp consultation message.
- The starter template keeps `noindex,nofollow` in `index.html`; remove or replace this safeguard only after the owner approves the production domain and launch.

## Demo content and accuracy

This repository is a **portfolio demonstration**, not an operational ZACKS production website.

- Package and add-on values are based on the audited ZACKS frontend fallback catalog. They must be reviewed before any operational launch.
- Vehicle classes and examples are guidance only.
- The proof metrics and customer-story cards are deliberately fictional portfolio sample data. They demonstrate content components and must not be represented as independently verified business statistics or genuine customer testimonials.
- Hero and gallery photos are visual references sourced from Unsplash, with photographer credits in the page. They are not documentation of completed ZACKS customer work.
- The website includes a sample home-service preparation note and consultation journey to demonstrate the Starter package's content capabilities.
- Replace or approve all data, images, pricing, claims, and policies before using this site as a live business website.

## Product scope

The site remains static-first. WhatsApp links open a prefilled conversation; the website does not record bookings or save submitted customer data.
