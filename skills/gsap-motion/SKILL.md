---
name: gsap-motion
description: Add purposeful, maintainable GSAP motion to a website when it improves storytelling, orientation, feedback or a meaningful interaction. Includes React lifecycle, responsive and reduced-motion safeguards.
---

# GSAP Motion

## Purpose

Use GSAP as an optional implementation tool for purposeful motion. Animation must strengthen the business story, make an interaction easier to understand, guide attention or provide useful feedback. It is not a substitute for a distinctive art direction, strong imagery, hierarchy, clear copy or functioning interactions.

## Activate only when justified

Use this skill when a specific motion concept has a clear user-facing purpose and CSS transitions/keyframes are not sufficient.

Do not add GSAP by default, to make a generic website look more animated, or simply because the library is available. Prefer no motion when it does not improve the experience. One deliberate, well-composed sequence is usually stronger than scattered reveals on every section and card.

## Project setup

Install dependencies only in the website project that actually needs GSAP:

```bash
npm install gsap @gsap/react
```

- `gsap` provides the animation engine and official plugins.
- `@gsap/react` provides the React `useGSAP()` hook.
- Do not add either dependency to the neutral Blank Starter or a client project until the approved design has a concrete GSAP use.
- Do not use a remote CDN or browser-global script when the project already has a package-managed build.

For React, use the official hook rather than manually creating animations in an untracked `useEffect`:

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function MotionSection() {
  const root = useRef(null);

  useGSAP(() => {
    // GSAP setup scoped to this component.
    gsap.to('[data-motion-target]', {
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, { scope: root });

  return <section ref={root}>...</section>;
}
```

The companion `examples/ReactHeroMotion.js` shows a complete fail-open example that keeps content visible without JavaScript and respects the user's reduced-motion preference.

## Motion decision and implementation rules

1. Define the user-facing purpose before choosing an effect. Record the trigger (page entry, scroll, hover, click, state change), affected elements, expected behavior and static/reduced-motion fallback.
2. Preserve the design's composition, hierarchy and reading order. Motion should reinforce the visual direction, not invent a new interaction grammar.
3. Keep motion restrained. Favor purposeful sequencing and a small number of meaningful elements over blanket section/card animation, perpetual loops or excessive parallax.
4. Animate compositor-friendly properties such as `transform` and `opacity` where possible. Avoid repeatedly animating layout and paint-heavy properties (for example, large changes to `width`, `height`, `top` or `left`) without a measured reason.
5. Do not hide essential content in CSS before JavaScript runs. Content must remain visible if scripts fail, GSAP is unavailable or the user prefers reduced motion. Avoid a flash of invisible content (FOUC).
6. Respect `prefers-reduced-motion`. Prefer no non-essential motion in the reduced mode; do not merely shorten an intense or spatially large animation. Use `gsap.matchMedia()` so the setup is reverted and recalculated if the preference or breakpoint changes.
7. Scope selectors to a React component. Do not let an animation in one instance select or mutate another instance's elements.
8. In React, let `useGSAP()` own animation lifecycle and cleanup. Register the hook with `gsap.registerPlugin(useGSAP)`. Do not leave timelines, ScrollTriggers, Draggables, event listeners or observers alive after unmount.
9. Animations created later in click, pointer, timer or other event handlers must be wrapped with `contextSafe()` from `useGSAP()`; normal hook cleanup does not automatically capture animations created after the hook has executed.
10. Use `ScrollTrigger` only when scroll position genuinely controls the experience. Do not hijack scrolling, trap the user in a section, or make important information dependent on scroll-triggered animation.
11. Keep controls semantic and keyboard-operable. Hover-only effects need an equivalent focus treatment. Motion must not be the only way to discover, understand or complete an action.
12. Do not animate a CTA in a way that distracts from its label, changes its hit target unexpectedly or suggests a false state. Never simulate successful booking, sending, payment or saving.

## Responsive and reduced-motion pattern

Use `gsap.matchMedia()` for viewport-specific motion and the user's motion preference. The API internally creates a GSAP context and automatically reverts animations and ScrollTriggers when a query stops matching. Call `revert()` on the match-media instance during component cleanup.

```jsx
const media = gsap.matchMedia(root);

media.add('(prefers-reduced-motion: no-preference)', () => {
  // Create the non-essential animation here.
  // Do not set initial hidden CSS states on essential content.
});

return () => media.revert();
```

Keep the reduced-motion path static and fully understandable. Test both preference states in a real browser, including a preference change while the page is open.

## Plugin guidance

- Register only plugins that the implementation actually uses.
- `ScrollTrigger` is appropriate for deliberate scroll-linked sequences or reveals; it is not a default dependency beyond the GSAP package and must still honor reduced motion and cleanup.
- Avoid adding plugins for effects that native CSS can perform more simply.
- Do not add ScrollSmoother or smooth-scroll hijacking as a default.

## Verification

For a changed website, verify only the actual scope and report what was tested:

- Build and lint after the dependency/import change.
- Capture the real page with normal motion and with `prefers-reduced-motion: reduce`.
- Check that essential content is visible before and without animation.
- Test the exact keyboard/focus path for any animated interaction.
- Test representative desktop and mobile widths; confirm that responsive motion does not hide or overlap content.
- Navigate away/unmount and return to confirm timelines and ScrollTriggers do not duplicate or persist.
- Inspect console errors and browser behavior; measure performance rather than claiming an improvement without data.

A passing build is not visual evidence. A GSAP demonstration is not proof of conversion improvement or production readiness.

## Licensing and product boundary

GSAP is available under the official Standard "No Charge" License. Review the current terms before use: https://gsap.com/standard-license

The license permits use in websites, web applications and digital interfaces, while restricting use inside products that let users build visual animations without code in a way that competes with Webflow's visual animation-building capabilities. The Studio's current use is as an optional code implementation technique for client websites, not as a visual animation editor. Do not turn this into a no-code animation-builder feature or product without a separate license review and any required written permission.

## References

- Official installation: https://gsap.com/docs/v3/Installation/
- Official React integration: https://gsap.com/react
- `gsap.matchMedia()`: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Standard License: https://gsap.com/standard-license
