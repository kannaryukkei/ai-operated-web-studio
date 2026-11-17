# Blank Starter

## Purpose and boundaries

Blank Starter is a neutral, independently buildable technical foundation and the default starting point for a new client website project. It intentionally has no customer-facing page structure or business content. Its rendered application contains only a keyboard-accessible skip link and an empty `main` landmark.

Create the website structure and populate `src/config/site-config.js` only after the client’s Website Requirements Pack (WRP) has been approved. Let that WRP determine which content, sections, actions, assets, and interactions belong in the site. Add components only when an approved requirement demonstrates a real reusable need.

This project has no backend, database, CMS, authentication, admin dashboard, analytics, form submission, booking, checkout, payment, or data persistence. It has no business facts, fabricated content, social proof, logo, favicon, Open Graph image, external font, or remote image. Automated media import is not included.

## Selected stack

- React 18 and Vite 6.
- Plain CSS with a small neutral token set and a system-font stack.
- Node.js 20 or newer.
- npm with the committed `package-lock.json` and `npm ci`.
- Playwright with Chromium for foundation smoke tests.
- Lucide React is omitted because the blank foundation has no interface icons.

The project is static-first and works independently. It is not part of a shared npm workspace or component library.

## Install and run

From the project root:

```bash
npm ci
npm run dev
```

Create a production build and preview it locally:

```bash
npm run build
npm run preview
```

Install Playwright Chromium when needed, then run the browser checks after building:

```bash
npx playwright install chromium
npm run test:e2e
```

The `test:e2e` script uses the production preview server. It checks the application response, semantic `main` landmark, skip-link keyboard behavior, visible keyboard focus, reduced-motion support, preview robots metadata, browser errors, the blank-content boundary, runtime dependencies, and horizontal overflow at 320, 360, 390, 640, 768, 900, 1024, 1280, and 1440 pixels.

## Customize after an approved WRP

1. Keep the approved WRP and its source/evidence decisions with the client project.
2. Add only approved, source-traceable client values to `src/config/site-config.js` and create the page structure justified by the WRP.
3. Add local assets only after source, rights, and publication approval are recorded. Do not invent business facts, testimonials, reviews, ratings, awards, metrics, customer stories, or other social proof.
4. Add forms or persistence only if a separate approved requirement defines the actual destination, privacy behavior, and implementation scope. A static page does not store submissions.
5. Set the document language in `index.html` to the approved content language. The initial `id` value is only a default and must be changed when the target audience and content use another language.

The initial document title is `Unconfigured site preview`, and `index.html` sets `noindex,nofollow`. Keep preview indexing restrictions while the website is a preview. Replace preview metadata with approved production metadata and remove or change the robots restriction only at the release stage, after the production domain and launch have been approved. Configure canonical and social metadata only when their real values and assets are approved.

## Foundation CI and acceptance boundary

The root Blank Starter workflow performs clean dependency installation, a production build, Playwright Chromium smoke tests, semantic and accessibility foundation checks, responsive overflow checks, preview-metadata checks, browser-error checks, and blank-content/dependency checks. It uploads the smoke-test report and any failure traces as CI evidence. The empty `.website-quality/evidence-manifest.json` uses the shared gate's valid empty-manifest schema and is reserved for a later populated site. The workflow does not invoke the shared rendered-site quality gate while this blueprint is unconfigured.

The shared rendered-site quality gate is **NOT APPLICABLE — intentionally deferred until real website content exists**. Apply it after a real site has been populated from an approved WRP and has enough meaningful rendered content to satisfy the gate’s measurement requirements. Technical foundation CI remains separate from content/design quality and commercial acceptance.

Passing this project’s technical CI does not mean that a populated client website has passed the Starter Product Acceptance Gate, is ready to publish, or is commercially ready. Do not describe this blank foundation as production-ready.

## Separate ZACKS reference

`blueprints/starter/template-kit/starter/` remains the separate ZACKS-specific reference implementation. It contains automotive business assumptions and is not the neutral starting point for a new client project. The `template-kit/` tree is preserved independently from this blank foundation.
