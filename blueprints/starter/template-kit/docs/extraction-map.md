# Extraction Map — ZACKS to Starter / Business / Custom

Status: Extraction plan implemented for Starter initial scaffold; local validation pending  
Reference repository: https://github.com/kannaryukkei/zacks-detailing  
Reference branch: `design-intelligence-v1`  
Reference commit: `6ab85e93a12a3bfe8fcfb96199a91a5ce600595b`  
Verified branch head: 2026-11-12 11:14:05 UTC / 18:14:05 WIB  
Target repository: https://github.com/kannaryukkei/web-studio-template-kit

Only the branch above was inspected for this map. The branch list was checked again on 2026-11-13; no newer branch head was present.

## 1. Portfolio comparison rule

All three demonstrations use ZACKS Detailing and the same owner-approved business facts/assets. The variable is the product tier, not the industry or the business.

- **Starter:** comprehensive one-page, static-first site.
- **Business:** multi-page, static-first site with deeper information architecture.
- **Custom:** bespoke project treatment. The existing ZACKS Laravel-backed site is the strongest current real-world reference; do not invent additional functionality. A new Custom demo is only needed if the current site does not adequately demonstrate the intended custom tier.

Keep all prices, service details, operating policies, contact details, service areas, testimonials, and image claims verified. The live Laravel database may contain admin-updated values that differ from the seeder or static fallback; confirm the current approved values with the owner before building the new demos.

## 2. Source-to-target extraction matrix

| ZACKS source | Current responsibility | Action | Target treatment |
|---|---|---|---|
| `src/site/SiteLayout.jsx` | Header, responsive nav, footer, socials, shell | **Rebuild selectively** | Generic header/footer driven by business config; remove ZACKS logo, CatalogContext, route coupling, analytics and motion dependencies |
| `src/site/pages/Home.jsx` | Hero, vehicle selector, process preview, service area, FAQ preview, CTA | **Adapt structure** | Keep hero, process, coverage, FAQ preview, CTA; replace vehicle-specific selector with generic service/category presentation |
| `src/site/pages/Layanan.jsx` | Automotive pricing catalog, vehicle and size selectors, add-ons | **Rebuild content UI** | Generic service/package cards and pricing groups; remove car/motor S/M/L/XL schema and vehicle lightbox |
| `src/site/pages/Area.jsx` | Service-area details | **Adapt** | Compact coverage/location section in Starter; dedicated page in Business when useful |
| `src/site/pages/Proses.jsx` | Four-step service process | **Adapt** | Optional process section with steps supplied by business config |
| `src/site/pages/Faq.jsx` | FAQ page and CTA | **Adapt** | Reusable FAQ accordion; same Q&A can appear as a short preview in Starter and full page/section in Business |
| `src/site/pages/Konsultasi.jsx` | Vehicle-specific inquiry form that creates WhatsApp message | **Do not copy** | Starter uses simple WhatsApp CTA. Add a generic form only when a real form endpoint/provider and privacy behavior are chosen |
| `src/site/ui.jsx` | PageHead, CtaBand, WaLink, FAQ and price/catalog cards | **Extract patterns, rewrite dependencies** | Small neutral components: Button/Link, SectionHeading, CTA, ServiceCard, FAQList, WhatsAppLink |
| `src/site/routes.js` | ZACKS page metadata and navigation | **Rebuild** | Starter uses a single page with anchors; Business defines its own small route list and per-page SEO metadata |
| `src/site/content.js` | ZACKS-specific process, areas, price notes and captions | **Do not copy as generic content** | Move verified facts into the ZACKS reference config; keep generic section logic separate |
| `src/data/catalog.js` | Static fallback and automotive catalog schema | **Use only as fact reference** | Create a neutral, simple business config: profile, contacts, services, packages, gallery, FAQs, process and coverage |
| `src/lib/catalog.js` | Vehicle/size/category selectors and pricing utilities | **Do not copy wholesale** | Implement only generic formatting/filter helpers that Starter actually needs |
| `src/lib/whatsapp.js` | wa.me links plus automotive context/pricing messages | **Rewrite small helper** | Generic phone normalization and message builder, with no hard-coded ZACKS fallback |
| `src/lib/seo.js` + `scripts/postbuild.mjs` | Dynamic metadata and static route SEO generation | **Adapt selectively** | Generic title, description, canonical, Open Graph and sitemap handling; no ZACKS domain or AutomotiveBusiness schema hard-coded |
| `src/lib/security.js` | Social URL validation and public setting validation | **Adapt if needed** | Validate allowed HTTPS social URLs; no admin settings logic in Starter |
| `src/site/site.css` | Public website styles and design tokens | **Study, do not copy wholesale** | Rebuild a small token set and clean responsive CSS |
| `src/site/atelier.css` | ZACKS-specific Gloss Atelier art direction layer | **Study visual principles only** | Keep editorial hierarchy, spacing, image framing and restrained motion ideas; do not reuse selectors or ZACKS palette as a template |
| `src/site/motion.js`, `ScrollControls.jsx` | Custom motion and scroll effects | **Defer** | No motion dependency in Starter until the static layout is finished and tested |
| `src/admin/*`, `src/context/AuthContext.jsx` | Admin dashboard and authentication | **Exclude** | Not part of a static Starter or default Business package |
| `src/context/CatalogContext.jsx`, `src/lib/api.js` | Laravel API catalog loading and fallback | **Exclude from Starter** | Static business config; no API request required |
| `Backend/zacks-backend/` | Laravel API, Sanctum, admin CRUD, catalog database | **Keep in ZACKS only** | Custom projects may use Laravel when scoped; do not add it to Starter/Business by default |
| `Frontend/tests/*`, `scripts/*` | Existing regression, content/security validation and build helpers | **Reuse test ideas** | Add focused tests for config shape, links, metadata, assets and build; don't copy tests tied to automotive selectors |
| `Frontend/public/*` | ZACKS logo, favicon, OG image, illustrations | **Select assets individually** | Copy only approved ZACKS assets. Label illustrative visuals honestly; do not call them completed-job photos |

## 3. ZACKS content and asset findings

### Content available in the audited source
- Business identity, WhatsApp contact and default message.
- Service areas and base location.
- Instagram and TikTok links.
- Packages, descriptions, features and indicative prices.
- Add-ons and pricing notes.
- Vehicle classes and explanations.
- FAQs and process steps.

### Important source-of-truth rule
The current public frontend calls Laravel `GET /api/v1/catalog`. The static catalog in `Frontend/src/data/catalog.js` is a fallback. The Laravel seeder is bootstrap data, not guaranteed to equal the live database after admin edits. Before copying factual content, reconcile:
1. owner-approved/current live catalog values;
2. Laravel config and current database values;
3. static fallback values.

Do not silently assume the seed data or static fallback is the latest commercial truth.

### Public assets found
- `images/hero-detailing.webp`
- `images/area-home.webp`
- vehicle class illustration images (car/motor S, M, L, XL)
- `zacks-logo-mark.png`, `zacks-favicon.png`, `zacks-og-image.jpg`

The inspected copy explicitly labels the hero/area visual as illustration. The vehicle images are class-reference illustrations. The inspected public assets did not establish a verified before/after gallery or customer testimonial collection. This is not a blocker for presentation: keep a visual gallery using AI-generated or illustrative demo images with clear captions. Do not invent customer results, before/after claims, or testimonials.

## 4. Starter target — minimum clean structure

Create a standalone React/Vite static project:

```text
starter/
  package.json
  index.html
  vite.config.js
  public/
    images/
  src/
    main.jsx
    App.jsx
    data/
      zacks-site.js
    components/
      Header.jsx
      Footer.jsx
      SectionHeading.jsx
      ServiceCard.jsx
      FaqList.jsx
      WhatsAppLink.jsx
    styles/
      tokens.css
      global.css
      sections.css
```

Keep it intentionally small:
- React + Vite.
- Plain CSS (the current ZACKS public site uses custom CSS; Tailwind is configured for the existing admin area only).
- No React Router for the single-page Starter.
- No Tailwind, Laravel, Sanctum, Supabase, database, admin, CMS, analytics, or payment integration by default.
- Use one clear config file for business-specific content.
- Only add a component when it meaningfully reduces repetition or improves clarity.

Starter one-page sections:
1. Header / navigation
2. Hero
3. Business introduction
4. Services and packages
5. Differentiators / why choose the business
6. Process
7. Coverage / location
8. Gallery should remain part of the presentation. Use approved work photos when available; otherwise use AI-generated or designed illustrative visuals, captioned as conceptual/demo imagery. Never present generated visuals as actual completed customer work.
9. FAQ
10. Contact CTA and footer

A testimonials section is optional and must be omitted until verified testimonials exist.

## 5. Business target

Build Business only after Starter is validated. Use the Starter visual system and verified ZACKS data, but introduce distinct page-level information architecture, not merely more sections.

Suggested routes:
- Home
- Services & Pricing
- About / Process
- Area / Coverage
- FAQ / Contact

Business remains static-first. Laravel is not automatically included just because ZACKS currently has it.

## 6. Custom target

Do not invent a universal Custom template. Custom means scoped bespoke work.

Use the existing ZACKS implementation as a real high-complexity reference where appropriate:
- custom visual direction;
- multiple public routes;
- Laravel API;
- catalog administration;
- Sanctum-protected admin functions.

Only claim features that are present, deployed, and verified. For a new customer, start from Starter or Business only if appropriate; otherwise begin from a clean project.

## 7. Repository simplification decision

Do **not** create a shared npm package/component library yet. That would add build and dependency complexity before we know which parts are truly stable.

Keep each tier independently buildable/deployable. Start with `starter/`; after it works, copy/fork the validated baseline into `business/` and adapt it. Keep `custom/` as a concise project-start guide, not a forced template.

A `shared/` directory can be introduced later only if at least two real projects need the same stable component and extracting it makes maintenance simpler.

## 8. Extraction sequence

1. Starter source scaffold committed under `starter/` using ZACKS as the single reference business.
2. A complete one-page section flow and responsive design system are implemented in the initial source.
3. The visual gallery is included using original conceptual SVG illustrations; missing real photography is not treated as a blocker.
4. Reconcile prices and operational details with the live Laravel catalog/owner before final public deployment.
5. Run install/build, link checks, mobile QA, accessibility checks and visual review. Fix any failures before sign-off.
6. After Starter passes, create Business from the validated baseline.
7. Use the existing ZACKS custom implementation as the Custom reference; do not duplicate the backend into this repository.
