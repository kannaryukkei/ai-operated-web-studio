# Website Implementation Standard v1.0

Status: Production guideline for Starter-first delivery
Source of truth: This file defines design and implementation guardrails. The Master Skill defines the work stages; the Starter Product Acceptance Gate defines release approval.

## 1. Product principle

Build the smallest website that completely supports the customer's decision and next action. Do not confuse a complete one-page website with a small number of decorative sections. Do not add interactions because they are technically possible.

## 2. Design system

Every project gets a small, project-specific token set before detailed styling:

- **Brand tokens:** primary, secondary, accent, background, surface, text, muted text, border and semantic states. Check actual foreground/background pairs before approval; never assume one accent works on every surface.
- **Contrast contract:** target WCAG AA text contrast (4.5:1 normal text, 3:1 large text) and at least 3:1 for relevant non-text controls/focus indicators. Include translucent text compositing, overlays and real image/gradient surfaces. Record tested pairs and ratios.
- **Typography:** one display family and one body family by default; define a restrained type scale, line heights and readable line lengths. Use 15px as the default primary/supporting copy floor; dense but important allergen/safety, pricing, policy, legal and transaction disclosures should normally be at least 13px. Reserve 11px for non-critical metadata.
- **Spacing and layout:** use a consistent spacing scale, content max-width, grid/gap rules, section rhythm and responsive breakpoints.
- **Components:** define only the components the actual site needs (buttons, links, cards, form controls, navigation, FAQ, gallery/product/project item).
- **Interaction states:** default, hover, focus-visible, active, disabled, loading and error/success states where applicable.
- **Motion:** purposeful and restrained; respect prefers-reduced-motion.
- **Tokens before polish:** use CSS custom properties or the project's existing token system. Avoid one-off values that drift across sections.

The art direction must be specific to the client's business, audience, product and price position. Do not reproduce KALA, SELA, FABLE FORM, RUANG RAPI or ZACKS by swapping only the logo and colors.

## 3. Reuse patterns by business need

- **Brand-led F&B / hospitality:** KALA provides a useful reference for atmosphere, menu storytelling, visit information and editorial rhythm. Publish real menu, location and hours only when approved.
- **Portfolio / project-led services:** SELA provides a useful reference for project filters and accessible project-detail interactions. Project outcomes and imagery must be authentic or explicitly labelled concepts.
- **Retail / catalog:** FABLE FORM demonstrates search, category filters, product variants and cart state. Do not imply stock, checkout, payment, shipping or order confirmation unless each is connected to a real source and tested.
- **Local services:** RUANG RAPI demonstrates source discipline, service scope, process, service area and honest unavailable-contact states. ZACKS demonstrates guided offer selection, price logic, FAQs and an inquiry path. Do not merge their client facts.
- Use the pattern that answers a real visitor question; otherwise omit it.

## 4. Content and conversion contract

- Keep business facts in a clearly identifiable data/configuration layer where practical.
- Classify each public fact: VERIFIED, CLIENT-PROVIDED-UNVERIFIED, APPROVED-FOR-PUBLICATION, DEMO-ONLY, ASSUMPTION or MISSING.
- Do not publish internal notes, guessed facts, fabricated reviews, invented metrics or unsupported guarantees.
- Track each public CTA's label, exact destination, approval status and expected behavior.
- A CTA must not promise booking, payment, saving, submission or response unless that behavior actually occurs.
- Where no public contact destination is approved, show a clear unavailable/contact-not-configured state; do not invent a phone number or use an internal project contact.
- Sample stories and metrics are allowed only in a clearly labelled portfolio preview and must be absent from client-production output.

## 5. Assets

For each image, logo, font or video record its source/owner, permission or license status, intended use, required credit and whether it is real work or concept imagery.

- Prefer client-approved assets, properly licensed stock, generated assets with client approval, or original designed illustrations.
- Never imply concept imagery is a real customer result.
- Prefer optimized local AVIF/WebP for raster photography where suitable; use SVG for logos and simple illustrations.
- Provide intrinsic width/height or aspect-ratio space to reduce layout shift.
- Use descriptive alt text for informative images and empty alt for decorative images.
- Load the primary hero image eagerly with appropriate priority; lazy-load below-the-fold imagery.
- Avoid unnecessary third-party image hotlinks in a live client website. If external hosting is retained, record the dependency and verify the URL, permission, loading and fallback.

## 6. Technical architecture

- Static-first for Starter. Use the existing repository/template stack where it is useful; do not create a framework or component library for a single small site.
- A React/Vite static build is acceptable when the source template already uses it; simple HTML/CSS/JS is acceptable when that is genuinely simpler.
- Separate content from presentation when it reduces editing risk; use one canonical data source when facts drive multiple components or calculations; avoid excessive abstraction and premature shared packages.
- Do not add backend, database, CMS, login, payment, inventory, booking engine, analytics or custom API by default.
- Forms must have a real approved delivery path. A mailto: or WhatsApp handoff must describe exactly what it does and must not claim that the website stores or confirms the request.
- Keep dependencies minimal and pinned/reproducible. Commit the lockfile and use the package manager's clean-install command in CI.
- Never expose API keys, private client details or internal contacts in public source.

## 7. Responsive, accessibility and SEO baseline

- Validate at 320, 360, 390, 640, 768, 900, 1024, 1280 and 1440px; no horizontal overflow.
- Use semantic landmarks, one clear h1, logical heading order, labelled form controls, accessible names, keyboard-operable controls and visible focus.
- Check text/control contrast, keyboard navigation, dialog focus/escape behavior, focus restoration and reduced-motion behavior where relevant. Contrast tests must inspect every rendered instance for each role at the target breakpoints, include relevant interaction states and alpha-composite translucent colors against the actual surface; checking only the first matching element is insufficient.
- Avoid ARIA when native HTML semantics already provide the needed behavior.
- Provide title, useful description, favicon, Open Graph metadata and canonical URL when a production domain exists.
- Keep previews and demo deployments noindex/nofollow. Remove preview restrictions only after domain/content approval; configure robots/sitemap appropriately for launch.
- Add structured data only when facts are accurate, supported and appropriate for the business.
- Do not report SEO or accessibility as passed based only on metadata or source inspection.

## 8. Verification and delivery evidence

For every release candidate:

1. Install using the committed lockfile.
2. Run the production build.
3. Run browser tests for navigation, primary CTA, forms, key interactions and error/empty states.
4. Check responsive widths and screenshots on desktop and mobile.
5. Verify all image loads, alternative text, link destinations and external dependencies.
6. Run accessibility/contrast review and performance measurement; record results and limitations. Preserve the exact tested color pairs, viewport set and untested boundaries; do not describe a targeted contrast regression as full WCAG conformance.
7. Test another browser or explicitly mark it NOT TESTED.
8. Verify production metadata, robots policy, SSL, DNS and client ownership.
9. Record PASS / FAIL / NOT TESTED for each item. A green build is not proof of commercial readiness.

## 9. Handover

The client owns the domain registrar account and all approved business content. Document hosting provider/account, DNS, SSL, deployment source, asset rights, renewal date and payer, update responsibilities, third-party costs, exclusions and support window. Do not promise lifetime hosting or unpriced ongoing maintenance.
