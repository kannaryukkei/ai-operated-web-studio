# Architecture — Static-first Website Masters

> **Reference architecture note:** This describes the Starter website implementation, not the retired Laravel Studio platform or a mandatory project workflow. Any old references to platform coordination, stages or approval processes are historical; Master Skill v1.13 governs current operations.

Status: Draft v0.2

## Guiding rule

Choose the simplest architecture that fulfills the product scope. A normal business information website does not need a backend merely because the reference ZACKS project has one.

## Tier boundaries

### Starter
- Comprehensive one-page website.
- Static business-content configuration.
- React + Vite and plain CSS.
- No React Router required for a single-page build.
- No CMS, database, admin, authentication, analytics, or customer records by default.

### Business
- Multi-page static website.
- Built only after Starter is validated.
- Can reuse the proven visual/content patterns, but remains independently buildable.
- No backend by default.

### Custom
- Bespoke scope, not a forced universal template.
- Start from Starter/Business only when it is a good fit; otherwise create a clean project.
- Add Laravel or other backend only for explicit needs such as persistent records, authentication, payments, or operational workflows.
- Existing ZACKS Laravel-backed implementation is a real reference for this tier, subject to feature and deployment verification.

## Repository strategy

Keep each tier independently buildable/deployable.

- Create `starter/` first.
- Copy/fork the validated Starter baseline when creating `business/`.
- Keep `custom/` as a concise project-start guide until an actual bespoke case justifies a reusable scaffold.
- Do not create a shared npm package or component library yet. A `shared/` directory is allowed only after at least two real projects need the same stable components and extraction demonstrably simplifies maintenance.

This deliberately avoids monorepo workspace complexity and premature abstraction.

## Starter technical stack

- React
- Vite
- Plain CSS with a small token set
- Lucide React only if icons are required
- No Tailwind in Starter. The audited ZACKS Tailwind configuration targets the existing admin area; public site styling uses custom CSS.
- No backend or database by default.

## Content configuration

Keep business facts separate from UI. Use one small configuration file for:
- Brand and contact details
- Navigation / anchor labels
- Services and packages
- Differentiators
- Process steps
- Gallery assets and truthful captions
- Verified testimonials (optional)
- FAQs
- Location and service coverage
- Operating hours only when supplied and confirmed

Do not build a generic page-builder. Prefer clear data structures and a small number of reusable sections.

## Design extraction

Study the ZACKS design-intelligence branch for:
- Editorial hierarchy and section rhythm
- Strong hero composition
- Responsive navigation
- Clear service/pricing presentation
- FAQ and CTA patterns
- Deliberate image framing and useful negative space
- Responsive and reduced-motion treatment

Do not copy the large ZACKS CSS files wholesale. Rebuild a compact token system and clean layout styles. Keep ZACKS brand identity as the reference content, not as a reusable brand theme for all future clients.

## Security and deployment

- No secrets in frontend source or environment variables.
- Keep public configuration explicitly allowlisted.
- External links use safe URL validation and appropriate `target`/`rel` attributes.
- A static WhatsApp link does not persist customer data.
- Forms must use an explicitly chosen provider or backend; do not imply a static form stores submissions.
- Custom domain, HTTPS, security headers, redirects, canonical metadata and Open Graph data are configured per deployment.
- Review third-party image, font, analytics and form-provider terms.

## Reference data integrity

The audited ZACKS frontend currently requests its catalog from Laravel. The static frontend catalog is fallback data; Laravel seed data is bootstrap data and may not match live admin-edited values. Confirm current approved content with the owner before populating the new static config.

## Extraction strategy

Follow `docs/extraction-map.md`. Do not transplant the ZACKS admin/backend stack. Reuse proven UX patterns, not hidden ZACKS-specific dependencies.
