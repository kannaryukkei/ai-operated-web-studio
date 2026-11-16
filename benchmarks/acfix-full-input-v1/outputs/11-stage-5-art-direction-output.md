# ACFIX Full-Input Benchmark — Stage 5 Art Direction Output

**Run mode:** INTERNAL_BENCHMARK  
**Input:** `acfix-full-input-v1`  
**WRP:** WRP-FI-001 v1.0  
**Design status:** INTERNAL TEST RESULT · G3 = N/A_INTERNAL_BENCHMARK  
**Implementation status:** NOT STARTED · this segment stops before code

## 1. Creative problem

ACFIX is not selling an air-conditioning unit. It is helping a homeowner make a practical decision about home comfort, maintenance, inspection and installation. The website should make a mildly technical service feel understandable, considerate and low-friction without pretending that a cleaning visit guarantees a specific cooling result.

The strongest visual subject available is the relationship between a domestic space and the AC unit inside it. The visual should make the service feel relevant to a real household, not like a generic HVAC contractor landing page or an engineering manual.

The current asset bundle is enough to set a visual direction but not enough for a final photo-rich production site:
- The room-interior concept image is 520 × 309 and usable as a reference/low-resolution preview, not a final full-width production hero.
- The airflow and process SVGs are original concept explainers.
- No real staff, customer-home or completed-job images exist.
- No proof section should be added to compensate for missing proof.

## 2. Reference study

Five references were directly opened and inspected. The lessons below concern composition and information design only; claims, assets, copy and brand identity are not transferable.

| Reference | Observed design lesson | Application to ACFIX | Do not copy |
|---|---|---|---|
| [Quilt](https://www.quilt.com/) | Places its climate product in varied domestic interiors and uses large lifestyle imagery to relate equipment to rooms and household comfort. | Make the living space—not the machine schematic—the primary emotional context. Show how the service relates to a room and household routine. | Smart-system claims, temperature control, efficiency figures, reviews, customer quotes, equipment specs or product ecosystem. |
| [Dyson Air Treatment](https://www.dyson.com/air-treatment) | Uses large product/technology visual moments followed by focused explanatory modules, helping a visitor understand one technical feature at a time. | Pair one major home visual with concise service explanations and one conceptual airflow graphic only where it helps the visitor. | HEPA/air-quality/health claims, sensor dashboards, test results, performance numbers, product photography or Dyson's identity. |
| [Climat](https://climat.com.au/) | Makes broad categories and the path to a service/quote visible early; its navigation exposes a large product/service catalogue. | Keep ACFIX's four service types legible early, then route visitors to the relevant details and price conditions. | Its multi-category navigation, product brands, “#1” or expert claims, large catalogue depth and contact/quote mechanisms. |
| [Air-Rite Heating & Cooling](https://www.air-rite.com/) | Separates maintenance, repair, replacement and commercial offerings; clearly exposes service geography and a service path. | Make service boundaries, service areas, hours and travel fees easy to find, with clear differences between service and installation. | Its real company history, review feed, certification, award, technician claims, city pages, phone number and broad product range. |
| [Poppy Cake — Sahlit Design](https://sahlitdesign.com/work/poppy-cake-baking-company) | A distinct display typeface, warm palette and consistent visual language create recognisable brand character across the site and related materials. | Carry one ACFIX brand grammar across hero, price table, diagram, navigation and any future social preview. | Bakery motifs, its display typeface, menu treatment, serif/editorial style or its exact layouts. |

Additional research signals from [Zarla's HVAC design roundup (updated October 2026)](https://www.zarla.com/inspiration/hvac) suggest that HVAC websites often lean on real technicians, reviews and direct booking; ACFIX has none of those real assets/endpoints. Those conventional trust devices must therefore not be simulated. The opportunity is to create a memorable service brand through the home-comfort subject, original visuals, transparent scope and a clear decision path.

## 3. Prior-work fingerprint comparison

### Previous ACFIX — Aircare Field Manual

**Actual previous render:** ACFIX existing site at `1b9f45f40186d6b9d3807fb607b8b4b1c8dbe26e`; desktop/mobile screenshots from Run #42.

Fingerprint:
- Pale mineral paper, deep ink and cobalt.
- Georgia editorial display + Arial/Helvetica body.
- Off-centre two-column hero with small AC line diagram.
- Editorial service rows, separate price ledger, thin dividers and repeated two-column content blocks.
- Explanatory technical-manual tone.

**New direction must move away from:** paper/ledger/technical-manual presentation, small diagram as hero, repeated ruled editorial rows and the same serif-led display voice.

### ZACKS — Gloss Atelier / Precision Editorial

**Evidence:** documented fingerprints from `DESIGN-INTELLIGENCE-V1.md`, `CLAUDE-MAXIMUM-DESIGN-REPORT.md` and `PHASE-4-VISUAL-REDESIGN.md` on ZACKS design branches. The design report explicitly marks rendered/browser verification as unexecuted; this is a documented source/fingerprint comparison, not a screenshot-to-screenshot judgment.

Fingerprint:
- Graphite, teal and warm brass.
- Condensed display + sans body.
- Vehicle photography and package selection.
- Paint-sheen/ruler visual devices.
- Ruled price/specification layouts and timeline/process structures.

**New direction must move away from:** automotive precision language, graphite/brass palette, ruler/tick motifs, vehicle-like package selector and spec-sheet pricing.

### Semburat — The First Tray

**Evidence:** [full-site visual audit](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/blob/experiment/03-semburat-s05-visit-faq-order/docs/EXPERIMENT_03_FULL_SITE_VISUAL_AUDIT.md) and Chromium evidence [Run #43683708835](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43683708835), with the rendered artifact inspected.

Fingerprint:
- Large product-led asymmetrical hero and editorial still-life photography.
- Dark bake-counter catalogue.
- Butter/paper/ink/tomato palette.
- Bold display sans.
- Each menu/offer area has a composition based on its content; not a repeated card grid.

**New direction must move away from:** bakery product still-life, dark catalogue UI, tomato/butter palette, menu-board grammar and offer-specific product merchandising.

## 4. Direction A — HOME, IN COMFORT (preferred)

**Creative thesis:** show the calm, considered home environment ACFIX helps maintain; make the service feel like a useful part of home care rather than a technical intervention.

### Macro-composition

- **Hero:** a wide domestic interior image becomes the visual anchor. The supplied concept image is used as a low-resolution art-direction study only. Set the headline in a deliberately positioned, high-contrast block that overlaps the image edge instead of the common equal 50/50 split hero. Keep one CTA and a small, factual service-area line.
- **Navigation:** compact, quiet and practical; service, price, area and process. No multi-level product catalogue.
- **Service choice:** an open typographic selector/stacked bands with four clear routes. Each service gets a distinct shape/graphic cue derived from its task; avoid four identical rounded cards.
- **Price experience:** an expressive price comparison table with larger price figures, capacity selector as a clear control, and adjacent inclusions/exclusions. The price module is the most structured part of the page; surrounding sections should not repeat its table grammar.
- **Scope clarity:** a bold “Tambahan pekerjaan? Kami jelaskan dulu.” statement, paired with a simple visual checklist explaining quote → approval → work. This is the trust moment, replacing fake stars/badges.
- **Process:** a long horizontal/curved four-step path using the original process graphic as an optional support; mobile becomes a vertical sequence.
- **Coverage:** a broad location field with two clearly distinguished area bands, fee and district list. Not a fake interactive map.
- **Preparation:** a compact, practical checklist with one visual/photo treatment; do not use a row of icons for every sentence.
- **Policies/FAQ:** readable accordions or open editorial list, with important payment/warranty/cancellation details visible without being buried.
- **Close:** a distinctive forest-green/citrus band with the local-only simulated consultation CTA and an unmissable “no message is sent or stored” note.

### Visual grammar

- Palette: forest green / deep teal, warm chalk, soft sage and a controlled citrus signal; one small warm coral accent may be used only if it helps differentiate a state.
- Typography: one expressive contemporary grotesk family with a wide display range; no default serif/mono pairing. Use large sentence-case headline typography.
- Imagery: contextual domestic interior, generous photo scale, carefully controlled crops; use graphic air-flow lines sparingly as a signature motif.
- Shapes: asymmetrical image frames, soft but deliberate radius variation, broad curved/diagonal surfaces. No universal pill-card system.
- Motion: one restrained entry/transition or a purposeful menu/accordion state only; no scroll-jacking and no repeated fade-up for every section.

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────┐
│ ACFIX     Layanan    Harga    Area    Cara Kerja    [Konsultasi]│
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   RUMAH LEBIH NYAMAN,          ┌──────────────────────────────┐ │
│   MULAI DARI AC                │                              │ │
│                                │   HOME INTERIOR / AC UNIT    │ │
│   Perawatan dan pemeriksaan    │   LARGE IMAGE / AIR MOTIF    │ │
│   dengan lingkup dan biaya     │                              │ │
│   yang dijelaskan dahulu.      └──────────────────────────────┘ │
│   [Simulasikan konsultasi]                                      │
├────────────────────────────────────────────────────────────────┤
│ PILIH KEBUTUHAN                                                  │
│ [Cuci rutin]   [Deep clean]   [Periksa gangguan]   [Pasang baru]│
├───────────────────────────────┬────────────────────────────────┤
│ HARGA BERDASARKAN KAPASITAS   │ APA YANG TERMASUK / TIDAK       │
│ 0.5–1 PK | 1.5–2 PK | 2.5 PK  │ approval-before-extra-work      │
├────────────────────────────────────────────────────────────────┤
│ HOW THE VISIT WORKS — clear four-step journey                    │
├───────────────────────────────┬────────────────────────────────┤
│ ZONA A / ZONA B               │ PERSIAPAN / AKSES               │
├────────────────────────────────────────────────────────────────┤
│ PAYMENT • CANCELLATION • WORKMANSHIP WARRANTY                   │
│ FAQ                                                             │
├────────────────────────────────────────────────────────────────┤
│ FOREST GREEN CLOSE / LOCAL DEMO CONSULTATION / CLEAR DISCLAIMER  │
└────────────────────────────────────────────────────────────────┘
```

### Responsive behavior

- Tablet: hero image keeps its dominant role and is not simply shrunk into a tiny side column; headline block moves to a clean overlay or adjacent panel based on crop.
- Mobile: headline and one CTA precede the hero image; a high-impact crop remains visible; service selector becomes a compact vertical list; pricing uses a carefully designed stacked comparison or scroll table with clear column labels; no horizontal overflow.
- Keep CTA available without a fake sticky booking control. Avoid a second fixed bottom bar unless rendered testing proves it helps without covering content.

### Signature moment

**The home comfort scene:** a broad interior image with a visual airflow trace that connects to the service explanation. It should be instantly recognisable as ACFIX's visual anchor. The image is concept-only and must never be represented as a customer result or actual premises.

### Risks / non-goals

- Requires a higher-resolution, original concept image before implementation; current AST-FI-002 is only a design-study size.
- Do not imply savings, health improvement or temperature performance through copy or graphics.
- Do not add fake technician photographs or social proof.
- Do not make the hero into a generic stock image with text pasted over it; the composition must be intentionally art-directed.

## 5. Direction B — THE AIR SERVICE ROUTE (alternate)

**Creative thesis:** turn the customer's service decision into a bold, clear visual route through the home—where each branch answers a different AC need.

### Macro-composition

- **Hero:** a high-impact, illustrated home floor-plan / cutaway with one highlighted AC location and a branching line system. The headline is huge and typographic, with the room diagram acting as the main visual. No hero photography.
- **Page geometry:** asymmetric, modular poster-like compositions with strong edge alignment and large blocks; use dark forest, bright citrus and off-white fields.
- **Service selection:** a single branching path: maintenance → cleaning/deep cleaning; symptom → initial inspection; new room/unit → installation. Not a card grid, not a fake diagnostic tool. It explains options but does not diagnose.
- **Pricing:** a compact route table, with prices attached to the path and clear conditions.
- **Scope:** a high-contrast “No extra work without approval” panel.
- **Process:** visual line/route sequence from explain → inspect → approve → work.
- **Coverage:** district names arranged as zone clusters, with travel fee shown as a clear legend.
- **FAQ/policies:** clean, high-contrast information register with accordion behavior.

### Visual grammar

- Palette: near-black green, warm white, bright lime/citrus and a muted sky/ice color for airflow only.
- Typography: bold geometric sans with oversized display statements; no serif and no mono data-label system.
- Imagery: original isometric room/floor-plan illustration and clear diagrams, little or no photography.
- Shapes: cut-out blocks, route lines, large numerals only where they represent real stages, selective outlined surfaces.
- Motion: route line may draw once on entry or respond to service selection; no fake sensor gauges or diagnostic readouts.

### Desktop wireframe

```text
┌────────────────────────────────────────────────────────────────┐
│ ACFIX       Layanan       Harga       Area       [Konsultasi]   │
├────────────────────────────────────────────────────────────────┤
│  AC SERVICE, MADE CLEAR       ┌────────────────────────────────┐│
│  Start with what you notice.  │  ISOMETRIC HOME / AC FLOORPLAN ││
│  Choose the next sensible     │  BRANCHING ROUTE LINES         ││
│  step—not a diagnosis.        │                                ││
│  [Explore service routes]     └────────────────────────────────┘│
├────────────────────────────────────────────────────────────────┤
│       WHAT DO YOU NEED?                                          │
│         ┌─────────────┬─────────────┬─────────────┐              │
│         │ Routine     │ Symptom     │ New unit    │              │
│         │ maintenance │ / issue     │ installation│              │
│         └──────┬──────┴──────┬──────┴──────┬──────┘              │
│                service route branches                            │
├────────────────────────────────────────────────────────────────┤
│ PRICES / SCOPE / APPROVAL RULE                                    │
├────────────────────────────────────────────────────────────────┤
│ ROUTE: EXPLAIN → INSPECT → APPROVE → WORK                         │
├────────────────────────────────────────────────────────────────┤
│ SERVICE ZONES / PREP / TERMS / FAQ / SIMULATED CONSULTATION       │
└────────────────────────────────────────────────────────────────┘
```

### Risks / non-goals

- The floor-plan may feel like a property-management app or technical manual if over-labelled.
- It is closer to old ACFIX's diagram/technical language than Direction A.
- Avoid fake sensor data, diagnostic scores, temperature readings, efficiency gauges or interactive fault diagnosis.
- Must retain readable explanations; visual routing cannot replace service inclusions and caveats.

## 6. Concept comparison and selection

| Criterion | Direction A — Home, in Comfort | Direction B — The Air Service Route |
|---|---|---|
| Audience/emotional fit | Very strong: home comfort and household service context | Strong: practical decision clarity |
| Visual difference from old ACFIX | High: lifestyle image, large organic composition, new type voice | Moderate: remains diagram/route-led |
| Difference from ZACKS | High: domestic lifestyle, softer forms, citrus/sage; no spec-sheet/ruler language | Medium-high: graphic map rather than automotive precision |
| Difference from Semburat | High: home environment/service decision vs food/product still-life/menu | High: technical route system rather than food brand |
| Business comprehension | Strong when paired with price and scope modules | Very strong in service decision path |
| Asset fit | Uses AST-FI-002 and needs higher-resolution image | Uses existing SVG assets but needs a stronger floor-plan illustration |
| Main risk | Could look like generic home-services advertising if composition and image are not distinctive | Could repeat technical manual/diagram visual language |

**Selected direction: A — HOME, IN COMFORT.**

Rationale:
1. It best expresses the customer's own stated preference for warm, light-filled domestic visuals.
2. It moves the category away from generic HVAC contractor visuals and from ACFIX's previous technical field-manual direction.
3. It creates a memorable visual anchor from the available concept image without requiring fake staff/customer proof.
4. It allows the site to remain an information-led Starter experience while making the service feel human and relevant.
5. Its major design decisions differ from ZACKS and Semburat in imagery, visual hierarchy, surface grammar and emotional tone.

## 7. Selected design pack

### Design fingerprint — HOME, IN COMFORT

| Dimension | Selected decision |
|---|---|
| Hero | Large residential interior scene with an asymmetric headline/image overlap |
| Navigation | Compact, horizontal, low-noise; no mega menu |
| Primary grid | Open asymmetrical composition; service options are a purposeful selector, not identical cards |
| Section rhythm | Alternates image-led moments, price comparison, process path and calm information bands |
| Typography | Expressive contemporary grotesk; large sentence-case display type |
| Palette | Forest/teal + warm chalk + sage + controlled citrus |
| Image language | Domestic interior context, large crops, restrained airflow trace |
| Surface language | Varied radius and large image planes; no uniform card system |
| Interaction | Service-anchor navigation, local demo consultation panel, native FAQ |
| Signature brand moment | Home interior + airflow visual linking physical comfort to clear service choices |

### Initial token proposal (not a final lock)

- Deep forest: `#123F35`
- ACFIX teal: `#176F60`
- Fresh sage: `#B7D8C3`
- Warm chalk: `#F6F4EC`
- Citrus signal: `#D5E84B`
- Dark text: `#162821`
- Soft line: `#D8E1D8`

The tokens must be tested for actual contrast pairings and refined in implementation. The palette is subordinate to the selected composition and imagery.

### Responsive composition

- **Desktop:** hero image dominates the first viewport; headline sits on an offset field; service selector spans the width; pricing gets a dedicated high-contrast section; next sections alternate visual density.
- **Tablet:** keep one clear visual anchor, preserve hierarchy and avoid compressing price columns below readable widths.
- **Mobile:** text-first hero followed by large image; service paths become a vertical list with distinct labels; pricing becomes clear stacked groups; the policy and coverage content remains open/legible; CTA has no fake send/booking behavior.

### Asset manifest

| Asset | Planned role | Status / action |
|---|---|---|
| AST-FI-001 wordmark | Header/footer | Available for benchmark |
| AST-FI-002 home-interior concept | Hero art-direction reference | Available at 520 × 309; regenerate larger before full-width implementation |
| AST-FI-003 airflow explainer | Optional support inside service explanation | Available |
| AST-FI-004 process illustration | Service process support | Available |
| Real service/technician photography | Not used | Not available; must not fabricate |
| Reviews/credentials/before-after | Not used | Not applicable; must not fabricate |

### Implementation acceptance notes

- Use AST-FI-002 only as an explicitly synthetic visual concept and not as a real customer project.
- Generate/commission a larger compositionally similar image only when the site build begins and only as concept imagery.
- Ensure hero headline is readable without adding a huge opaque overlay that hides the image.
- Service selector must not act like diagnosis. Each service has a factual explanation and a route to pricing/details.
- Price matrix should be clear on 320px screens; do not shrink important price/policy copy.
- The consultation CTA should open only a local simulation and repeat the no-send/no-store notice.
- No false review strip, technician badge, counter, map pin or real-time availability.

## 8. Design gate result

- Two materially different directions: **PASS**.
- Five references directly inspected: **PASS**.
- Prior-work fingerprint comparison: **PARTIAL** — actual ACFIX and Semburat rendered evidence reviewed; ZACKS is documented fingerprint/source evidence, not a full current screenshot comparison.
- Selected fingerprint is different in more than three high-impact dimensions from prior work: **PROVISIONAL PASS** — needs rendered validation when implementation exists.
- Visual board: **PARTIAL** — selected concept image and three original vector assets exist; this is not yet a designed multi-reference visual board.
- Responsive concept: **PASS** at plan level; not browser-tested.
- Production implementation: **NOT STARTED**.
- G3: **N/A_INTERNAL_BENCHMARK**. No client or production approval is inferred.

## 9. Next checkpoint

Do not start implementation yet. First finish a proper visual board with exact reference crops, a high-resolution approved concept hero asset, and the final desktop/tablet/mobile section compositions. Once the design pack is complete, pass it to the bounded implementation segment and preserve each section checkpoint.
