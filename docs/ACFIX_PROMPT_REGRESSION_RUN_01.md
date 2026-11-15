# ACFIX Prompt Regression — System Improvement Experiment 01

**Run mode:** INTERNAL_BENCHMARK  
**Fixture:** EXP04-ACFIX / SNAP-0001 (synthetic; DEMO_ONLY)  
**Existing website commit:** `1b9f45f40186d6b9d3807fb607b8b4b1c8dbe26e`  
**Existing browser evidence:** [ACFIX Actions Run #42](https://github.com/kannaryukkei/web-studio-experiment-04-acfix-studio/actions/runs/43758529949)  
**System branch under test:** `experiment/web-studio-system-improvement-01`  
**Status:** PROMPT DRY-RUN COMPLETE — no website code changed

> This is an internal prompt-execution dry-run in the current assistant context, not an independent external-agent replication. It validates whether the revised prompts produce the required outputs and expose the baseline's weakness. It does not prove that every external AI executor will behave identically.

## 1. Fixed test input

The same ACFIX packet was reused without additions:
- `01-discovery/raw-materials/01-simulated-interview.md`
- `01-discovery/raw-materials/02-simulated-asset-packet.md`
- `02-discovery/04-client-website-brief-v2.1.md`
- `02-discovery/08-buying-journey-and-ia.md`
- `02-discovery/09-website-requirements-pack-v1.0.md`
- Existing visual source: `03-design/00-art-direction.md`
- Existing rendered evidence: `05-audit/01-rendered-browser-audit-status.md` and Run #42 screenshots.

The packet describes a fictional residential split-AC service in Surabaya/Sidoarjo, three services, illustrative prices, no public contact endpoint, no real job photography, no credentials/reviews and no client-owned visual assets. The WRP remains DRAFT and is explicitly out-of-gate. The exercise therefore ran as an `INTERNAL_BENCHMARK`; it did not create G0–G3 approval or production permission.

## 2. Reference study

| Reference | Inspection status | Useful lesson | Not to copy |
|---|---|---|---|
| [Dyson — Air Treatment](https://www.dyson.com/air-treatment) | Directly opened | Product/technology storytelling alternates strong product imagery with specific explanatory visual modules and airflow/filter diagrams. Use image + explanation as one composed unit rather than a small diagram beside a long paragraph. | Dyson product claims, technical performance numbers, product photography, brand identity or premium appliance-commerce structure. |
| [Climat — Air Conditioning](https://climat.com.au/) | Directly opened | The service category, supporting product categories and advice/contact paths are quickly legible. Useful as a service-information and category-hierarchy reference. | Its broad supplier/product-brand navigation and any trust/experience claims; ACFIX has three service paths and no verified public endpoint. |
| [Sage — 30 Best HVAC Websites](https://sage.agency/blog/best-hvac-websites/) | Directly opened roundup | The roundup highlights variety within HVAC: spacious grids (Nortek), custom branded illustration and font selection (Air-Rite), and distinctive branded shapes/voice. It supports exploring a visual identity beyond generic blue/red contractor templates. | Any real-company review, award, certification, customer proof or conversion claim. The roundup is secondary commentary, not a formal design audit. |
| [Comrade Web — HVAC Website Examples](https://comradeweb.com/blog/best-hvac-websites/) | Directly opened roundup | Clear service categories and visual hierarchy matter. The reviewed examples commonly use real technicians, trust signals, service-area tools and prominent contact actions. This makes the absence of those assets/endpoints a design constraint, not permission to fabricate them. | Fake technician photos, trust badges, booking controls, service-area lookup or a live CTA. |
| [Blueair — Blue Signature](https://www.blueair.com/collections/units/products/blue-signature-midnight) | Search-result inspection only; page did not open | The search result shows a product framed for living rooms/open-plan homes and adjustable visual finishes. A domestic environment can make air treatment feel relevant to the room, not merely to a machine. | Product specs, review ratings, sales claims or a direct ecommerce layout. This reference needs a full manual visual inspection before implementation. |

## 3. Prior-project comparison

### ZACKS — Gloss Atelier / Precision Editorial

Inspected sources: `Frontend/docs/DESIGN-INTELLIGENCE-V1.md`, `CLAUDE-MAXIMUM-DESIGN-REPORT.md` and `PHASE-4-VISUAL-REDESIGN.md` on the ZACKS design branches.

Documented fingerprint:
- Graphite/teal/warm-brass palette.
- Vehicle-photo hero and vehicle/package selection.
- Condensed display + sans body typography.
- Paint-sheen and measurement-ruler devices.
- Ruled pricing/spec-sheet columns and continuous process timeline.
- High-precision automotive detailing language.

**Evidence limit:** the design reports document intended and implemented source changes, but the maximum-design report explicitly says its browser/rendered behavior was not executed. No exact final ZACKS full-page screenshot was available in this run. This is a documented fingerprint comparison, not a verified screenshot-to-screenshot verdict.

### Semburat — The First Tray

Inspected sources: `EXPERIMENT_03_DESIGN_RESEARCH_AND_ART_DIRECTION.md`, `EXPERIMENT_03_FULL_SITE_VISUAL_AUDIT.md` and full-page Chromium artifact from [Run #43683708835](https://github.com/kannaryukkei/web-studio-experiment-03-semburat-bakehouse/actions/runs/43683708835).

Rendered fingerprint:
- Product-led asymmetric hero with large bakery still-life.
- Dark navy copy plane and bespoke dark bake-counter menu.
- Warm paper, butter/yellow and high-energy tomato field.
- Strong bold sans typography.
- Different compositions for menu, craft, brunch, pastry-box comparison and order simulation.
- Brand character is carried by image, colour, menu interface and section-specific composition—not palette alone.

### Existing ACFIX — Aircare Field Manual

Inspected actual desktop/mobile renders from ACFIX Run #42 (exact source SHA above).

Current fingerprint:
- Pale mineral paper, deep ink, cobalt accent.
- Georgia editorial headings + Arial/Helvetica body.
- Split hero with a small technical AC illustration.
- Editorial service rows and separate price ledger.
- Fine dividers, small eyebrow labels, restrained process grid, FAQ and contact-unavailable block.
- One-page explanatory flow with little large-format imagery or graphic variety.

**Comparison verdict:** ACFIX is not a direct copy of ZACKS or Semburat. However, its restrained editorial/ledger treatment shares some of the precision-editorial language already present in the Studio's recent service work. The current page has no strong signature visual beyond the technical line diagrams and cobalt accent.

## 4. Two materially different ACFIX design directions

### Direction A — ROOM TEMPERATURE (selected)

**Creative thesis:** make AC care feel like a home-comfort decision, not a technical manual.

- **Hero:** a large, illustrated cutaway of a calm contemporary living room with a split AC unit integrated into the architecture. The room is a concept visual, not an actual ACFIX customer home. Headline sits across the image boundary, not inside a standard 50/50 split hero.
- **Page geometry:** large asymmetric colour fields, oversized image panels and room-plan framing. Use fewer, larger composition changes rather than a stack of evenly spaced editorial sections.
- **Typography:** confident rounded/soft grotesk with oversized sentence-case headlines; one family can carry the system. Drop repeated uppercase eyebrow labels and italic single-word accents.
- **Palette hypothesis:** fresh pale mint, deep forest, warm citrus and a restrained coral signal. Avoid the existing cream/cobalt field-manual palette and avoid the Studio's existing navy/tomato/butter bakery system.
- **Services:** three spatially distinct service zones arranged like areas of a home plan. Each has its own composition based on its decision: routine care, symptom inspection, installation. Not three identical cards.
- **Price:** large price figures placed beside scope/cost conditions, with the caveat kept adjacent and readable.
- **Diagnostic boundary:** a large visual moment explains “cleaning is not a fault diagnosis”; use a simple concept cutaway, not a technically authoritative diagram or an invented diagnosis.
- **Process:** a connected path across a room-plan motif: explain the issue → inspect physically → confirm scope and cost → work only after approval.
- **Close:** preparation checklist and clear contact-not-configured state.
- **Mobile:** headline first, full-width room illustration next, service zones stacked with distinct visual treatments, simple anchor navigation; no false sticky booking CTA.
- **Signature moment:** the home interior cutaway becomes the brand's visual anchor and recurs in cropped fragments through the page.

**Risks:** relies on one high-quality original concept illustration; if the art is generic stock or a weak AI image, the direction collapses. It must be disclosed as illustrative and never imply a real job, home or technician.

**Non-goals:** fake people, fake premises, before/after results, booking, live scheduling, guarantees, or an oversized multi-section story that adds no decision value.

Desktop wireframe:

```text
┌────────────────────────────────────────────────────────────────┐
│ ACFIX                                      Layanan   Persiapan  │
├────────────────────────────────────────────────────────────────┤
│  KENALI KEBUTUHAN AC RUMAH           ┌────────────────────────┐ │
│  Pilih perawatan                     │                        │ │
│  AC dengan lebih                     │  CUTAWAY RUANG KONSEP  │ │
│  tenang.                             │  AC TERPASANG DI RUMAH │ │
│  [Lihat pilihan layanan]             │                        │ │
│                                      └────────────────────────┘ │
├──────────────┬───────────────────┬──────────────────────────────┤
│ Cuci rutin   │ Cek gangguan      │ Pemasangan                   │
│ zone / shape │ zone / shape      │ zone / shape                 │
├────────────────────────────────────────────────────────────────┤
│ Perkiraan biaya — angka besar + syarat biaya di sebelahnya      │
├────────────────────────────────────────────────────────────────┤
│ Bukan semua masalah selesai dengan cuci — visual cutaway       │
├────────────────────────────────────────────────────────────────┤
│ Jalur pengerjaan / persiapan / FAQ / kanal kontak belum aktif   │
└────────────────────────────────────────────────────────────────┘
```

### Direction B — AIRFLOW SIGNAL (alternate)

**Creative thesis:** turn the invisible movement of air into a bold graphic navigation system.

- **Hero:** full-bleed abstract airflow ribbons cut through oversized condensed typography; an AC silhouette sits as a graphic anchor.
- **Page geometry:** a strong directional path runs across the entire page; section changes are driven by large graphic transitions, not repeated blocks.
- **Typography:** condensed display face with very large scale contrast; neutral sans for supporting copy.
- **Palette hypothesis:** deep violet/ultramarine, acid lime, clean white and a small warm-orange signal. Avoid generic HVAC blue/red.
- **Services:** three branches emerge from one central “what do you need?” airflow junction. The three options behave like directional paths, not service cards.
- **Price:** oversized numerals embedded into a graphic price route; caveats remain attached to each number.
- **Diagnostic boundary:** a high-contrast “cleaning ≠ diagnosis” interruption in the flow; no invented fault codes or sensor readouts.
- **Process:** one continuous visual path from inquiry to inspection to cost approval to work.
- **Mobile:** graphic path becomes a vertical continuous ribbon; text remains in readable blocks.
- **Signature moment:** an abstract airflow line that morphs between sections and anchors the entire brand language.

**Risks:** can become a generic tech/SaaS landing page or look like a technical product diagnostic system. Motion and abstract graphics must not imply real-time measurement, air-quality sensing or diagnosis.

**Non-goals:** fake sensor dashboards, technical specifications, live airflow readings, diagnostic selectors or fabricated performance claims.

## 5. Direction comparison and selection

| Criteria | ROOM TEMPERATURE | AIRFLOW SIGNAL |
|---|---|---|
| Audience fit | Strong: residential homeowners and tenants | Good, but more technical |
| Visitor task | Makes the service feel approachable and domestic | Makes service paths and process very clear |
| Distinctiveness vs ZACKS | Strong: domestic visual world vs automotive precision | Moderate: could drift toward technical precision |
| Distinctiveness vs Semburat | Strong: architecture/home illustration vs food still-life/menu interface | Strong, but graphic colour-led sections may echo high-energy Semburat pacing |
| Asset feasibility | Needs one strong concept interior illustration | Can use original SVG/graphic assets |
| Risk | Concept interior may feel like a fake client home | Can look like generic technology or imply measurement |

**Selected: ROOM TEMPERATURE.**

Reason: the audience is making a home-service decision, not purchasing an AC product or reading an engineering manual. A domestic visual world provides a clearer emotional anchor and is more distinct from the Studio's automotive and bakery experiments. The brief supports this direction without requiring additional business claims. It needs one strong, clearly disclosed concept illustration, not fabricated evidence.

## 6. Retrospective QA of the existing ACFIX website

**Exact render inspected:** ACFIX Run #42, desktop 1440px and mobile 390px screenshots.  
**Exact commit:** `1b9f45f40186d6b9d3807fb607b8b4b1c8dbe26e`.

### Aesthetic verdict

**COMPETENT BUT GENERIC** (provisional internal assessment).  
**Cross-project comparison coverage:** PARTIAL.

Evidence:
- The page is coherent and carefully aligned to the information task.
- The technical line diagrams fit the HVAC subject, and price conditions remain close to their figures.
- However, the hero's main graphic is small and schematic; it does not create an emotionally or visually memorable first impression.
- Repeated small all-caps labels, serif display headings, hairline dividers and restrained ledger/service rows dominate the visual grammar.
- The majority of sections use similar two-column editorial arrangements, with limited shifts in image scale, materiality, section geometry or visual density.
- The cobalt bands and dark process section add contrast, but they do not create a sufficiently distinctive brand moment.
- Semburat's rendered reference has a substantially stronger hero asset, distinct dark menu interface, high-energy craft section and compositions tailored to each offer. ACFIX appears more restrained and less art-directed by comparison.
- ZACKS' documented fingerprint also uses a precision-editorial language, ruled pricing and process structures. Exact ZACKS render comparison was not available, so derivative status is not asserted.

This is not a finding that the website is technically broken. It is a finding that it meets a restrained competence floor but falls short of the Studio's intended distinctiveness standard.

### Business/content status

**PREVIEW_ONLY / production blocked.** All source business facts and prices are fictional; no public contact endpoint or real asset permission exists. The site must remain noindex and internal-only.

### Functional/technical status

**Existing bounded evidence: PASS.** Run #42 passed the experiment's static and Chromium gates. The recorded responsive audit covers nine widths, role-based typography floors, selected solid-surface contrast and mobile-menu behavior. This dry-run did not rerun the website tests because no website source changed.

**Not tested / not certified:** full WCAG conformance, assistive technology, Firefox/WebKit, physical devices, Lighthouse/performance, owner review, visitor validation and business/commercial readiness.

### Overall diagnostic verdict

**FAIL — aesthetic quality target not met.** Functional checks passing do not compensate for a generic visual result. No code change was made under this QA run.

## 7. What the revised prompts changed in this test

| Requirement | Previous prompt behaviour | Revised prompt result |
|---|---|---|
| Context loading | Orchestrator preloaded six broad system documents | Stage-specific progressive disclosure; only the relevant policy/skill is loaded |
| Creative exploration | Asked for one direction/fingerprint and broad token/layout work | Produced two structurally different visual concepts, with wireframes, risks and a selected direction |
| Reference research | References could be general or minimal | Five references were studied with inspection status and exact reusable lessons |
| Differentiation | Master rule existed, but stage prompt did not force the comparison in operational detail | Compared against ZACKS and Semburat fingerprints and identified concrete overlap/differences |
| QA verdict | Technical QA could be reported without an explicit aesthetic outcome | Explicit `COMPETENT BUT GENERIC` diagnostic and overall aesthetic failure |
| Synthetic fixture support | G2 gate would stop the ACFIX DRAFT WRP | Explicit `INTERNAL_BENCHMARK` mode allowed analysis without creating client or production approval |

## 8. Root-cause diagnosis

The ACFIX visual weakness is **not primarily explained by missing client input**. The fixture contains enough information to design a distinctive explanatory website. Missing photography limits photographic realism, but it does not prevent strong art direction: the system can use a deliberate, disclosed concept illustration.

Primary cause: **MASTER SKILL / REASONING + PROMPT HANDOFF.**
- The previous specialist prompt did not force two materially different directions or an implementation-ready visual proof.
- The design process accepted a safe editorial/diagram direction without a memorable brand moment.
- The website was technically refined, but visual differentiation was not treated as a hard outcome.
- The QA prompt did not force a separate aesthetic verdict into the overall acceptance result.

Secondary cause: **ORCHESTRATION / OVER-COMPLEXITY.**
- The original orchestrator loaded too much context before the active task was known.
- The first revised prompts assumed a client-approved WRP, making synthetic retrospective benchmarking impossible until an explicit benchmark mode was defined.

Not evidenced by this run: platform architecture or platform feature gaps. No platform code or new skill dependency is justified by this result.

## 9. Result and next bounded experiment

**Keep:** progressive disclosure, two-direction creative exploration, explicit reference research, selected design pack, separate aesthetic verdict and internal benchmark mode.

**Do not add:** more generic skill repositories, new platform features, a new client questionnaire, another website implementation or new dependencies.

**Next:** test the revised prompt with one genuinely complete benchmark fixture (business facts, actual offers/policies, approved asset packet and explicit visual preferences). Use the same creative direction/QA protocol. If a second controlled run still defaults to generic editorial composition, refine the creative reasoning method—not the platform.

No website code, client facts, client brief, release state or Master `main` branch was changed by this regression run.
