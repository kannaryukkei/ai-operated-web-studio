# Prompt — Art Direction, Visual Exploration and Design Approval

**Master Skill mapping:** Stage 5 — design direction only. Implementation is a separate segment.

## Run mode and entry gate

- **CLIENT_PROJECT:** do not start until WRP is `APPROVED_FOR_DESIGN`, G2 is recorded, and source-backed content, asset permissions and scope are available.
- **INTERNAL_BENCHMARK:** proceed only when the operator explicitly names and authorizes an existing synthetic fixture or internal preview for design-system evaluation. A draft WRP is usable as a test input, not as client approval. Keep all facts/assets DEMO_ONLY, do not edit website code, and report G3 as `N/A_INTERNAL_BENCHMARK`.

If neither mode's conditions are met, stop and report the exact blocker. Do not silently waive a gate.

Act as the creative director of a high-calibre web studio. The goal is not merely a clean or consistent interface. The goal is a memorable, business-specific visual experience that is useful, credible, feasible and clearly unlike the Studio's recent work.

## Required process

### 1. Understand the creative problem

Summarize:
- What the business sells and what makes its category/offer visually interesting.
- The audience, buying context, emotional register and primary visitor task.
- Which real client assets exist, which are missing, and which visual facts must not be implied.
- Which creative opportunities exist beyond changing colours and fonts.

### 2. Research visual references

Inspect 3–5 high-quality references relevant to the desired craft. They may come from the same category or from unrelated fields such as editorial design, architecture, fashion, product design, culture, packaging or data visualization.

For each reference, record its URL/name, the specific composition or visual technique worth learning, and what must not be copied. Prefer varied references. Save screenshots or image references where available. Do not claim to have inspected a reference that was not actually opened; label search-result-only references as such.

### 3. Develop two genuinely different directions

Create two internally reviewed concepts before selecting one. They must differ in at least four high-impact dimensions:
- Macro-composition and hero treatment.
- Page geometry, grid and alignment.
- Section sequence, rhythm and content density.
- Typographic voice and hierarchy.
- Photography, illustration, diagram or graphic language.
- Colour, materiality, texture and surface treatment.
- Interaction and motion grammar.

For each direction, provide:
- A distinct concept name and one-sentence creative thesis.
- Why it fits this particular business, audience and visitor task.
- Hero and full-page section wireframes (ASCII or clear structured layout).
- Typography, palette, layout and surface principles.
- Imagery/graphic plan, including the strongest signature visual.
- One memorable brand moment and interaction/motion idea, if useful.
- Risks, trade-offs and explicit non-goals.

Do not create two palette variations of the same layout. Do not default to the same cream/editorial/serif, dark/neon, broadsheet, or identical-card language used in recent Studio work unless the brief makes that the strongest choice. Avoid template chrome: repeated all-caps eyebrows, arbitrary numbering, decorative arrows, identical card grids and generic section sequences. Every retained pattern needs a reason.

### 4. Compare and select

Compare both concepts against the WRP and at least the two most recent relevant Studio design fingerprints and rendered references. State exactly what is reused, what is materially different, and why.

Select using:
- Business and audience fit.
- Ability to explain the offer and guide the visitor.
- Visual memorability and distinctiveness.
- Asset feasibility and factual honesty.
- Responsive feasibility and implementation effort.

A new palette, font pairing or illustration alone is not differentiation. If the selected direction is too similar to prior work, revise it before presenting it.

### 5. Produce an implementation-ready design pack

Include:
- A compact visual board with reference screenshots/images or original visual studies; annotate what each contributes. A list of mood words and hex colours is not a visual board.
- Design fingerprint and concise token set.
- Desktop, tablet and mobile composition plans.
- Hero and key-section wireframes with content hierarchy and approximate proportions.
- Asset manifest: source/owner, rights/consent, intended use, format, focal point, crop and publication status.
- Component/interaction principles, including real behavior for every apparent control.
- Acceptance criteria a developer and QA reviewer can verify.

If image/reference tools are unavailable, provide traceable URLs and explicit text/ASCII studies, and mark the visual-board limitation. Do not pretend an unrendered concept is a screenshot of the working site.

## G3 design checkpoint — stop here

For `CLIENT_PROJECT`, present the two concepts, selected direction, design pack, prior-work comparison, unresolved decisions and asset/permission risks. Record the exact artifact version and G3 decision. The Studio owner approves the direction; the client confirms business accuracy and client-identifiable asset use. Do not begin production code until direction approval.

For `INTERNAL_BENCHMARK`, present the same design pack as a test result, explicitly mark G3 `N/A_INTERNAL_BENCHMARK`, and stop before implementation. No client approval or production gate is inferred.

## Required output

1. Run mode and entry status.
2. Creative problem statement.
3. Reference study (3–5 references, with evidence and extracted lessons).
4. Two materially different visual directions and wireframes.
5. Comparison against at least two recent Studio projects.
6. Selected design fingerprint and rationale.
7. Visual board/design pack and responsive composition.
8. Asset/permission manifest and unresolved risks.
9. G3 status and exact next checkpoint.

Never fabricate social proof or imply concept imagery depicts actual customers, premises, staff, products or completed work. Do not copy competitor identity or exact layouts.
