# Source Audit — ZACKS Latest Branch

Status: Initial source audit completed (static repository review; local build/browser QA not run)  
Repository: kannaryukkei/zacks-detailing  
Audited branch: `design-intelligence-v1`  
Audited commit: `6ab85e93a12a3bfe8fcfb96199a91a5ce600595b`  
Commit date: 2026-11-12 11:14 UTC (18:14 WIB)  
Scope: This audit uses only the latest branch head identified from the repository's branch list. Older branches and commit histories were not audited.

## 1. Current technical stack

### Frontend
- React 18.3.1
- Vite 6.4.6
- React Router 7.18.5
- Tailwind CSS 3.4.10
- Lucide React 0.555
- Node engine: `^20.0.0 || >=22.0.0`
- Build checks include catalog validation, security audit, automated tests, asset validation, Vite build, and postbuild SEO generation.

### Backend
- Laravel application under `Backend/zacks-backend/`.
- API routes are versioned under `/api/v1`.
- Public catalog endpoint: `GET /api/v1/catalog`.
- Authentication uses Laravel Sanctum session/CSRF flow.
- Protected admin endpoints manage packages, add-ons, FAQs, vehicle classes, and public site settings.
- The frontend has a development proxy for `/api` and `/sanctum`; production API origin is configured through the public `VITE_API_BASE_URL` setting.

### Supabase clarification
- The audited frontend `package.json` does **not** include `@supabase/supabase-js`.
- The current frontend API helper uses cookie-based requests to Laravel; CatalogContext loads `/api/v1/catalog` and falls back to static catalog data if the API fails.
- AuthContext uses Laravel endpoints for user/login/logout.
- Legacy SQL schema/migration files remain under `Frontend/supabase/`. Treat these as retained historical/archive files, not evidence of active Supabase runtime integration. Do not copy them into the new template kit.

## 2. Frontend structure and reusable candidates

| Source | Current role | Extraction guidance |
|---|---|---|
| `src/site/SiteLayout.jsx` | Header, nav, mobile menu, footer, social links, shell behavior | Rebuild/parameterize; currently hard-coded to ZACKS and CatalogContext |
| `src/site/pages/Home.jsx` | Hero, vehicle selector, process preview, service-area block, FAQ preview, CTA | Strong information-flow reference; remove vehicle-specific logic |
| `src/site/pages/Layanan.jsx` | Vehicle/category/size selection, price catalog, add-on presentation, image lightbox | Reuse interaction/layout patterns selectively; catalog schema is automotive-specific |
| `src/site/pages/Area.jsx` | Service-area information | Reusable as a location/service-coverage pattern |
| `src/site/pages/Proses.jsx` | Four-step service process | Reusable process/storytelling pattern after rewriting business content |
| `src/site/pages/Faq.jsx` | FAQ and support CTA | Reusable FAQ pattern |
| `src/site/pages/Konsultasi.jsx` | Multi-field consultation form that prepares WhatsApp message | Useful interaction reference; field model is vehicle-specific |
| `src/site/ui.jsx` | PageHead, CtaBand, WaLink, price cards, FAQ and catalog UI | Some primitives reusable; several depend on CatalogContext, ZACKS catalog, analytics and WhatsApp utilities |
| `src/site/routes.js` | Public routes and SEO metadata | Reuse the pattern, replace all ZACKS-specific labels and metadata |
| `src/site/content.js` | ZACKS process, areas, price notes and copy | Business-specific; do not reuse as generic content |
| `src/data/catalog.js` | Static fallback catalog/settings | Data shape and values are specific to detailing; design a simpler neutral business config |
| `src/lib/api.js`, `context/*` | Laravel API, catalog state, Sanctum auth | Exclude from static Starter; Business only needs backend if an explicit requirement exists |
| `src/lib/seo.js`, `scripts/postbuild.mjs` | SEO metadata and build-time route metadata | Reuse concepts after removing domain/path/asset assumptions |
| `src/site/site.css`, `src/site/atelier.css` | Large ZACKS-specific visual layers | Do not copy wholesale; extract tokens/patterns selectively |
| `src/site/motion.js`, `ScrollControls.jsx` | Motion and scroll controls | Optional; add only if they improve UX and pass reduced-motion/accessibility checks |

## 3. ZACKS-only items to isolate

- ZACKS name, logo, typography identity, colors, brand marks.
- Automotive imagery, vehicle class selectors, pricing dimensions (S/M/L/XL), car/motor labels.
- Detailing treatment names, descriptions, prices, add-ons, business policies and FAQs.
- Service-area facts, home-service process and business contact/social information.
- Laravel API origin, API catalog schema, Sanctum authentication, admin dashboard.
- GA4 measurement ID, canonical domain, Open Graph assets, Netlify/Vercel deployment settings.
- Redirects and legacy URL compatibility rules.

## 4. Recommended extraction strategy

### Starter
Create a clean static React/Vite project with one configurable business data file and a small set of reusable sections. No Laravel, Sanctum, admin, database, or CMS by default.

### Business
Build from proven Starter foundations, adding multi-page information architecture, deeper content and a more flexible navigation system. Keep static-first.

### Custom
Start from the closest tier or a clean project, depending on scope. Add backend services only when the customer actually needs persistent data, authentication, payments or workflows.

### All tiers
Use the same verified ZACKS business facts and approved assets so portfolio comparisons demonstrate differences in product tier, not different content or businesses.

## 5. Risks / constraints

1. Do not copy the entire ZACKS frontend or backend into the master repository.
2. Do not copy secrets, credentials, local environment files, real customer records, or live API tokens.
3. Do not assume Laravel is needed for a brochure/business website.
4. Do not copy the automotive catalog model as a universal business schema.
5. Do not reuse large CSS files without extracting/normalizing their design tokens and dependencies.
6. Do not claim build/test/browser QA passed: this audit was performed by reading source on GitHub; no local commands or browser tests were executed.
7. Keep the ZACKS production repository untouched during extraction.

## 6. Next action

Produce a concise extraction map for Starter:
- shared shell patterns to rebuild
- sections to adapt
- ZACKS-only logic to remove
- static content/config schema
- dependencies and build scripts

Then create Starter in this repository and run its full local validation before moving to Business.
