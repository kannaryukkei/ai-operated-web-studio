# Website Product Tiers v1.2

Status: Draft — Master Revision candidate, 2026-11-15
Supersedes: v1.1. Aligns demo-evidence rules and makes Starter the only active implementation priority.
Audience: UMKM and local businesses first.
Core rule: sell the outcome and completeness, not a page count or a list of technical features.

**Active implementation priority:** Starter only. Business and Custom remain tier definitions for qualification and future planning; do not build their product blueprints until Starter passes `docs/STARTER_PRODUCT_ACCEPTANCE_GATE_v1.1.md` and the Studio owner explicitly reprioritizes.

## Product positioning

| Tier | Product promise | Best fit | Delivery model |
|---|---|---|---|
| Starter | A complete, conversion-ready online presence in one focused page | Small/local businesses with one main offer and a straightforward customer journey | One-page, static-first |
| Business | A deeper business website that organizes multiple offers, audiences or decision journeys | Businesses with several service/product categories, richer proof, locations or content needs | Multi-page, static-first by default |
| Custom | A purpose-built digital experience for workflows or requirements that standard website structures cannot serve well | Businesses needing custom interactions, data, accounts, integrations or operational tools | Bespoke discovery, architecture and implementation |

## Shared quality baseline (all tiers)

Every live client website should have, where relevant and supported by evidence:
- Clear business positioning and value proposition.
- Audience-specific messaging.
- Products/services explained in customer language.
- Pricing or a clear explanation of how pricing is determined.
- Differentiators grounded in real evidence.
- A useful process / how it works.
- Location, service area or delivery information.
- Genuine trust evidence, credentials, policies or transparent alternatives.
- FAQs based on real customer questions.
- Clear contact and conversion path with a real approved destination.
- Responsive, accessible, fast, searchable and maintainable implementation.
- Clear expectations: what happens after the visitor clicks or submits.

Completeness is conditional, not filler. Do not add empty pages, unsupported claims, fake reviews, invented guarantees, or interactions that do not work.

## Starter — complete one-page presence

**Promise:** compact architecture, not incomplete content.

Typical section system (select only what fits the business):
1. Header / navigation.
2. Hero: what the business offers, for whom, why it matters, primary action.
3. Business introduction / positioning.
4. Product or service discovery: categories, packages, options, inclusions/exclusions, pricing logic.
5. Selection help: who each option is for, comparison, chooser or guided recommendation when useful.
6. Differentiators / standards / genuine evidence or a transparent value explanation.
7. Process / what happens next.
8. Gallery, product imagery, projects or visual showcase. Concept imagery may illustrate design but is not proof of customer work.
9. Location, coverage, delivery, availability or operating information.
10. Policies / preparation / important expectations when relevant.
11. FAQs.
12. Contact / booking / inquiry CTA and footer.

Starter should not force every item into every project. It must demonstrate that every critical visitor question has a useful answer somewhere on the page. Avoid repetitive card grids; vary presentation according to content.

Default exclusions: CMS, admin, database, customer accounts, persistent booking, payment, inventory, custom API, unless explicitly scoped and commercially approved.

### Starter launch offer — target Rp500,000

This is a constrained entry offer, not a promise to deliver arbitrary scope for Rp500,000. It remains a pilot hypothesis until actual paid delivery effort, costs and margin are measured.

**Included:** one focused static page; business-first content structure and basic copy refinement from client-supplied facts; one primary approved CTA; responsive implementation; production build and browser smoke tests; deployment to a free static-hosting plan; first-year domain registration up to a pre-agreed Rp150,000 allowance; two consolidated revision rounds; basic handover.

**Client supplies:** verified business information, final pricing/policies, approved contact destination, logo and usable images or explicit permission to use clearly disclosed concept imagery, plus timely review and approval.

**Excluded:** multi-page sitemap, custom logo/identity, original photography/video, paid stock, full copywriting without source facts, CMS/admin, backend/database, booking or reservation engine, ecommerce cart/checkout/payment, inventory, accounts/portal, paid email hosting, paid hosting plans, analytics subscription, integrations, ongoing content updates and maintenance. Any such requirement triggers a separate scope and quote.

**Domain and hosting boundary:** the domain is registered in the client's own registrar account and included for year one only within the allowance. Static hosting uses an eligible free plan where the website can remain fully static; this is not a promise of free server-side hosting, database, email or unlimited provider services. The client owns the hosting account and domain, and pays renewals after the included period. If the desired domain or provider exceeds the allowance or requires a paid plan, the client pays the difference before purchase.

Price reference snapshot checked 14 November 2026: DomaiNesia displayed .com at Rp149,000 promotional / Rp235,000 regular ([domain pricing](https://www.domainesia.com/)); Cloudflare Pages Free documents up to 500 builds/month and custom-domain support ([Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)). Verify the provider's live checkout and policy before every quote; do not rely on a past promotion.

The Rp500,000 offer is a pilot hypothesis. Record actual studio hours, domain spend, revisions and support after the first real delivery. Do not continue selling at this price if the measured scope cannot sustain a reasonable margin.

## Business — multi-page business information system

**Promise:** deeper discovery and decision support, not simply a longer Starter.

Typical architecture:
- Home — positioning, key offers, proof, primary paths.
- Products / Services — detailed category and item pages, packages, comparisons and pricing logic.
- About / Why Us — business story, people, expertise and standards supported by evidence.
- Projects / Gallery / Case Studies — when the business has real or clearly labelled concept material.
- Process / How It Works — expectations, stages, turnaround or preparation.
- Locations / Coverage / Delivery — only where relevant.
- FAQ / Policies — detailed answers and terms.
- Contact / Booking — clear routes by intent and real destinations.

Possible capabilities (scope-driven): searchable/filterable catalog, detailed product/service pages, project archive, multiple locations, structured inquiry forms, editorial content, simple CMS. Each capability needs an explicit owner, data source and maintenance plan.

Business acceptance requires:
- Page map driven by audience tasks and content depth.
- No duplicated thin pages.
- Cross-page navigation and contextual CTAs.
- Page-specific SEO metadata and internal linking.
- Consistent content and reusable design system.
- Tested interactions and clear mobile navigation.

## Custom — bespoke digital product

**Promise:** solve a defined business problem that a standard marketing website cannot solve adequately.

Required discovery:
- Business workflow and user roles.
- Data entities, ownership, sensitivity and retention.
- User journeys and edge cases.
- Integrations and external dependencies.
- Authentication / authorization needs.
- Operational risks, security and privacy.
- Hosting, backup, monitoring and maintenance ownership.
- Acceptance criteria, milestones and change control.

Possible scope: booking/appointment systems, portals, member experiences, inventory, payments, internal dashboards, APIs or other workflow software. These are not included by default; each must be designed, priced, approved and tested as its own scope.

Custom is not "Starter with more animations". It needs a solution architecture and explicit lifecycle/support plan.

## Tier selection rules

Recommend Starter when one primary audience and one main conversion path can be served clearly on one page.

Recommend Business when the visitor needs distinct journeys, detailed categories, multiple decision stages, meaningful page-level SEO, or enough content to justify separate pages.

Recommend Custom only when a real requirement needs persistent data, roles, transactions, integrations, or bespoke workflow logic. Do not upsell technical complexity without a business reason.

## Demo and proof integrity

Never fabricate or simulate testimonials, reviews, ratings, awards, customer counts, satisfaction scores, performance metrics, case results, credentials, guarantees or third-party endorsements — including in portfolio/demo work. A demo label does not make invented social proof acceptable. Use source-backed and appropriately approved evidence only; when it is unavailable, omit the proof or explain the real process, scope or offer without implying an endorsement or result. Clearly disclosed concept imagery and illustrative layouts are allowed only when they cannot be mistaken for real client work.

## Commercial boundary

Every proposal should state:
- Included pages/sections and capabilities.
- Content/assets supplied by client vs studio.
- Revision rounds and approval gates.
- Third-party costs (domain, hosting, CMS, email, integrations).
- Ongoing maintenance/support scope.
- Explicit exclusions and change-request process.
