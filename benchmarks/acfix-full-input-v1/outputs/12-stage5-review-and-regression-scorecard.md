# ACFIX Full-Input Benchmark — Stage 5 Review & Regression Scorecard

**Reviewer mode:** same-session structured self-review; NOT an independent fresh-context review  
**Run mode:** INTERNAL_BENCHMARK  
**Input:** acfix-full-input-v1  
**Design output:** `11-stage-5-art-direction-output.md`  
**Visual board:** `acfix-two-direction-board.svg`  
**Status:** STAGE 5 PASS WITH CONCERNS · implementation not started

## 1. Full-input readiness

| Check | Result | Evidence |
|---|---|---|
| Seven source documents inventoried | PASS | SRC-FI-001–SRC-FI-007 |
| Source coverage reviewed end-to-end | PASS | 7/7 mapped in normalized output |
| Offer and price data | PASS | Four core offers, PK prices, durations, inclusions/exclusions and add-ons |
| Operations and policy data | PASS | Hours, capacity, zone fees, preparation, payment, cancellation and warranty |
| Brand/visual input | PASS | Positioning, audience, preferences, dislikes, references and autonomy rules |
| Asset packet | PASS WITH CONCERN | Four concept assets supplied; hero resolution/24° image artifact require correction before implementation |
| Unsupported proof | PASS | Reviews, credentials, ratings, staff evidence and actual job photography remain unavailable and prohibited |
| Client/production approval | N/A | Synthetic internal benchmark only |

## 2. Revised Stage 5 prompt regression

| Requirement | Previous ACFIX Stage 5 prompt | Revised prompt result |
|---|---|---|
| Creative problem tied to real source material | One general direction statement | Specific residential comfort problem and customer anxieties |
| Reference research | Broad reference list | Five directly opened references, each with a lesson and a no-copy boundary |
| Number of concepts | One general direction | Two materially different directions with different image language and macro-composition |
| Wireframes | Not required in practical detail | Desktop wireframes for both concepts |
| Prior-work comparison | Differentiation intent, without completed screenshot verdict | Explicit comparison to old ACFIX, ZACKS and Semburat |
| Anti-template avoidance | Generic warning | Concrete exclusions: repeated cards, editorial ledger, HVAC blue/red, fake proof, dashboard/diagnostic UI |
| Selected direction rationale | General tone/fingerprint | A specific business/audience/asset/implementation comparison |
| Visual board | Text description/reference list | Original two-direction SVG board with asset, palettes, composition and annotations |
| Responsive direction | General desktop/tablet/mobile intent | Separate behavior for desktop/tablet/mobile |
| Gate discipline | Client WRP/G2/G3 required, which blocked internal retrospective tests | Explicit INTERNAL_BENCHMARK mode; G3 remains N/A and production gates stay intact |

**Observed improvement:** the revised process forced visible creative alternatives and a reasoned selection instead of defaulting immediately to one safe editorial direction.

## 3. Art-direction review

### Strengths
- The selected concept is grounded in the home-service audience and the owner's visual preferences.
- Direction A uses a domestic image as the primary visual subject, moving away from the previous small technical diagram/ledger hero.
- The service selector, pricing, service-process, coverage, preparation and policy sections have different information jobs; they need not become one repeated card system.
- Direction B is visibly different: diagram/floor-plan-led, graphic, route-based and high contrast.
- The reference study distinguishes learning from copying and prohibits reuse of third-party claims/assets.

### Concerns
- The hero concept image is a modest 520 × 309 asset and contains a generated “24°” display. It is not ready for final large-format implementation until replaced/cropped.
- The visual board is an original two-direction study, not a detailed final design system or a screenshot of a working website.
- The ZACKS comparison uses documented design fingerprints but not a verified current rendered screenshot. Cross-project comparison remains PARTIAL.
- The selected design may still fall into the generic warm-green home-services look if the actual composition, typography, image art direction and section-specific layouts are not executed with enough character.
- The concept has not been tested at rendered scale, with real browser crops, accessibility checks or visitor comprehension.

## 4. Separate quality verdicts

| Dimension | Verdict | Reason |
|---|---|---|
| Source completeness for this fixture | PASS | All supplied source domains and assets mapped |
| WRP completeness | PASS | Customer tasks, offers, policies, CTA behavior and acceptance criteria documented |
| Creative exploration | PASS | Two materially different concepts created |
| Visual-board readiness | PASS WITH CONCERNS | Original board exists; final art/hero resolution still limited |
| Prior-work comparison | PARTIAL | ACFIX and Semburat render evidence; ZACKS fingerprint/source only |
| Website aesthetic quality | NOT TESTED | No implementation exists for the selected direction |
| Functional/technical quality | NOT TESTED | No implementation exists |
| Production readiness | BLOCKED / N/A | Fictional input, no real contact, client approval, publication permission or production domain |

Do not label the new website DISTINCTIVE until a real browser-rendered implementation is reviewed against the design pack and prior projects. The selected direction is a promising design hypothesis, not a validated final result.

## 5. What changed in system behavior

This experiment shows that the first system improvement has changed **the quality and completeness of the design decision process**. It has not yet demonstrated that the resulting HTML/CSS will execute the direction successfully.

The important distinction:
- Previously: technically safe but narrow design direction accepted with no completed aesthetic verdict.
- Now: source-complete fixture → multiple concepts → explicit comparison → selected visual fingerprint → original board → explicit NOT_TESTED boundary.

## 6. Next controlled test

Create one bounded implementation in the existing ACFIX experiment workspace using:
- the same full-input fixture and WRP;
- the selected HOME, IN COMFORT design pack;
- the existing HTML/CSS/JS stack, with no framework migration or backend;
- one implementation slice at a time and a checkpoint after each;
- actual browser screenshots, then an independent aesthetic/technical review.

Do not regenerate discovery or design unless implementation evidence exposes a specific design defect. Do not make any changes to Master `main`.

**Decision:** retain the progressive-disclosure orchestrator and the revised Stage 5 creative process as the current experiment candidate. Wait for rendered-site evidence before claiming an actual website-quality improvement.
