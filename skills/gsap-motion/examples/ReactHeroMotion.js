import { createElement, useId, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Optional motion example.
 *
 * Install gsap and @gsap/react in the website project before importing this file.
 * The hero remains visible without JavaScript and when reduced motion is preferred.
 */
export function ReactHeroMotion({ eyebrow, title, description, children }) {
  const root = useRef(null);
  const titleId = useId();

  useGSAP(() => {
    const media = gsap.matchMedia(root);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const introElements = gsap.utils.toArray('[data-motion-intro]', root.current);

      if (!introElements.length) return;

      // Movement only: content is never pre-hidden in CSS.
      gsap.fromTo(
        introElements,
        { y: 12 },
        {
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          immediateRender: false,
          clearProps: 'transform',
        },
      );
    });

    return () => media.revert();
  }, { scope: root });

  return createElement(
    'section',
    { ref: root, 'aria-labelledby': titleId },
    createElement('p', { 'data-motion-intro': true }, eyebrow),
    createElement('h1', { id: titleId, 'data-motion-intro': true }, title),
    createElement('p', { 'data-motion-intro': true }, description),
    children,
  );
}

/**
 * For interaction-created animations, wrap the handler with contextSafe().
 * Example inside a component that also uses useGSAP:
 *
 * const { contextSafe } = useGSAP({ scope: root });
 * const onPress = contextSafe(({ currentTarget }) => {
 *   gsap.to(currentTarget, { scale: 0.98, duration: 0.12, yoyo: true, repeat: 1 });
 * });
 *
 * The event animation is then included in useGSAP's automatic cleanup.
 */
