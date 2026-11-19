---
name: website-reference-discovery
description: Find relevant live website examples, inspect their real rendered pages at desktop and mobile sizes, and turn useful visual patterns into clear design direction without copying protected material.
---

# Website Reference Discovery

## Purpose

Help the AI make better design decisions by learning from real websites that solve similar visitor problems. This skill covers the work **before** a visual direction is chosen:

1. Find relevant websites.
2. Open the real pages, not only search snippets.
3. Look at the actual page at useful screen sizes.
4. Study how the design and visitor journey work.
5. Select only the parts worth learning from.
6. Turn those observations into a short direction for the project.

This is not a website copier, asset downloader, crawler, or required project document.

## When to use

Use when:
- the brief leaves the visual direction open;
- a page feels generic and needs a stronger direction;
- the business has useful real-world website examples to learn from;
- the project asks to find, compare, or reverse-engineer website references.

Skip it when the owner has already selected a clear visual reference and only needs it implemented; use `design-screenshot-spec` instead. Do not repeat discovery for a small spacing or color correction.

## 1. Search for useful examples

Start from the business and the visitor's task, not from a vague search such as "best website design".

Search for a mix of:
- real businesses in the same or a nearby industry;
- websites with a similar customer journey or offer;
- strong examples of a particular section, such as a price list, booking explanation, service process, or product page;
- design galleries or templates only when they add useful examples.

Use the web search available in the current environment. Try a few specific searches, then adjust based on the results. Prefer the actual business website over a directory, article, or search-result summary.

Choose up to three useful references for one design pass. More examples usually add noise. A reference is useful because it solves a problem well—not merely because it looks fashionable.

For each candidate, record in the conversation:
- business/site name and exact page URL;
- what type of source it is (real business, portfolio case study, or template);
- the part worth studying;
- why it fits the audience and visitor task;
- any claims, features, or visual material that must not be copied.

Do not treat a search snippet as proof that the website was opened or visually inspected.

Before choosing what to learn from the shortlist, use `design-strategy-and-judgment` to judge the candidates. Do not equate an attractive page, design award, popularity or fashionable style with a strong reference. For each page, assess first-screen clarity, hero/image/CTA strength, hierarchy and craft, fit to the intended audience, visitor journey, trust and responsive quality. Classify the page or individual pattern as KEEP, ADAPT or REJECT with one evidence-based reason. A portfolio concept can be a useful visual reference without proving business/conversion effectiveness; do not claim performance without data. Reject weak patterns even when the rest of the site looks polished.


## 2. Open and capture the real page

A reference is not visually reviewed until the actual rendered page has been seen.

Use the available browser or website-inspection tool when one is available. Open the exact page and inspect the rendered result. When browser automation is available, Playwright is a practical option:

- Reuse Playwright already installed in the project or environment.
- Do not add a paid browser service, API key, browser extension, or new project dependency just for reference research.
- If the project already has Playwright, capture the reference from that environment. Do not assume that a Playwright package alone means a browser is installed.
- Use a temporary folder for reference screenshots. Do not commit third-party screenshots to the website repository by default.

For each selected page, inspect at least:
- desktop: 1440 × 900;
- tablet: 768 × 1024;
- mobile: 390 × 844.

Capture a full-page view at desktop and mobile, plus closer views of the important sections. Check the mobile menu or other visible states only when they help explain the design. Wait for the main content or a key heading to become visible; a successful HTTP response alone does not mean the page has finished rendering. A spinner or blank screen is not a usable screenshot. Allow a short network-idle wait, but do not let analytics or ongoing network requests keep the capture waiting forever.

A simple Playwright capture can use this pattern when the package and browser are already available:

```js
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const outputDir = path.join(tmpdir(), "web-studio-reference-review");
await mkdir(outputDir, { recursive: true });

const references = [
  { name: "reference-one", url: "https://example.com/" },
];

const browser = await chromium.launch({ headless: true });

try {
  for (const reference of references) {
    const page = await browser.newPage({ deviceScaleFactor: 1 });

    for (const viewport of [
      { name: "desktop", width: 1440, height: 900 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      const response = await page.goto(reference.url, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });

      await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
      const contentReady = await page
        .locator("h1, main, [role='main']")
        .first()
        .waitFor({ state: "visible", timeout: 10000 })
        .then(() => true)
        .catch(() => false);

      // Allow visible fonts and page layout to settle without waiting
      // for analytics or every background request.
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await page.waitForTimeout(700);

      const safeName = reference.name.replace(/[^a-z0-9-]/gi, "-");
      await page.screenshot({
        path: path.join(outputDir, `${safeName}-${viewport.name}.png`),
        fullPage: true,
      });

      console.log({
        name: reference.name,
        url: reference.url,
        viewport: viewport.name,
        contentReady,
        status: response?.status() ?? null,
        title: await page.title(),
      });
    }

    await page.close();
  }
  console.log(`Screenshots saved to: ${outputDir}`);
} finally {
  await browser.close();
}
```

Replace the example URL and output path with the chosen reference and a temporary location available in the current environment. This is a starting pattern, not a requirement to add a script to every client project.

If the site blocks automated viewing, requires login, or does not load reliably:
- do not bypass access controls or attempt to evade a block;
- use an available normal browser view or another public reference;
- record what could not be inspected.

**If no browser or screenshot method is available, stop short of visual reverse engineering.** You may still summarize page structure from accessible text, but label the result `TEXT-ONLY REVIEW`. Do not claim to have measured layout, typography, image crop, spacing, or responsive behavior from search snippets or page text.

## 3. Study the design, not just the colors

Inspect the page at full size, then look closely at the parts that matter to the project.

Record what is visible and useful:

- **First impression:** what the visitor understands immediately; headline, image, main action.
- **Page structure:** section order, content width, grid, alignment, and empty space.
- **Typography:** type family when identifiable, size, weight, line height, line length, and wrapping.
- **Color and surfaces:** background, text, accent, borders, shadows, and contrast.
- **Images:** subject, ratio, crop, focal point, and how imagery supports the message.
- **Visitor path:** navigation, service or product details, pricing, process, trust information, and next action.
- **Responsive changes:** what moves, stacks, disappears, or changes size between desktop and mobile.
- **Interaction:** what a button or menu visibly does, when it can be checked safely.

When useful, inspect the rendered page's element sizes and computed styles in the browser. These observations can make spacing and type estimates more accurate. Do not copy the site's source code or treat hidden implementation details as the design itself.

Label each finding:
- `OBSERVED` — directly visible or measured in the rendered page;
- `ESTIMATED` — a reasoned visual estimate;
- `UNKNOWN` — not available from the page or evidence.

Never present an estimate as an exact measurement.

## 4. Choose what to learn from each reference

Do not pick one website and copy the whole thing. A better direction can combine a few specific strengths:

- one site's opening section and image composition;
- another site's pricing presentation;
- another site's service explanation or navigation.

For every borrowed pattern, explain:
- the visitor problem it solves;
- why it fits this business;
- how it should change to fit the project's content and audience.

Keep the new website original. Do not copy logos, brand names, distinctive illustrations, photography, written copy, source code, or proprietary design assets. A public page is a design reference, not permission to reuse its material.

Do not import unsupported business claims, fake reviews, customer counts, awards, prices, service promises, or contact details from reference sites.

## 5. Hand off to design and implementation

Give `frontend-design` a short, useful handoff:
- up to three references and their exact URLs;
- screenshots actually captured and the viewport sizes;
- the strongest design lessons from each;
- the elements to combine;
- patterns to avoid;
- observed facts, estimates, and unknowns;
- project-specific constraints that must not change.

If a screenshot is selected as the direct visual target, pass it to `design-screenshot-spec` for a detailed implementation specification. Do not hand a text-only summary to that skill and call it screenshot reverse engineering.

The handoff belongs in the project conversation by default. Create a file or retain screenshots only when they materially help implementation, review, or later comparison.

## 6. Finish honestly

Use one of these outcomes:

- **VISUALLY REVIEWED** — the live page was opened and screenshots or equivalent browser evidence were inspected at relevant sizes.
- **PARTLY REVIEWED** — only some pages, sections, or sizes could be inspected; state the gaps.
- **TEXT-ONLY REVIEW** — page text or search results were available, but the rendered design was not inspected.
- **BLOCKED** — no reliable access to the reference page or rendered evidence.

Do not use the phrase "reverse-engineered" for a text-only review. Do not claim visual fidelity until the implementation has been compared with the actual reference using `website-quality-review` in VISUAL_FIDELITY mode.
