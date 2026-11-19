import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResponsiveImage } from '../src/components/ResponsiveImage.js';

test('renders AVIF/WebP sources with a local fallback, responsive sizes and intrinsic dimensions', () => {
  const markup = renderToStaticMarkup(ResponsiveImage({
    src: '/media/hero-original.jpg',
    alt: 'Detail of the approved product',
    width: 1800,
    height: 1200,
    sizes: '(max-width: 48rem) 100vw, 50vw',
    sources: [
      { type: 'image/avif', srcSet: '/media/hero-640.avif 640w, /media/hero-1280.avif 1280w' },
      { type: 'image/webp', srcSet: '/media/hero-640.webp 640w, /media/hero-1280.webp 1280w' },
    ],
  }));

  assert.match(markup, /^<picture>/);
  assert.match(markup, /<source type="image\/avif"/);
  assert.match(markup, /<source type="image\/webp"/);
  assert.match(markup, /src="\/media\/hero-original\.jpg"/);
  assert.match(markup, /alt="Detail of the approved product"/);
  assert.match(markup, /width="1800"/);
  assert.match(markup, /height="1200"/);
  assert.match(markup, /sizes="\(max-width: 48rem\) 100vw, 50vw"/);
});

test('defaults to lazy loading and async decoding, and supports empty alt for decorative images', () => {
  const markup = renderToStaticMarkup(ResponsiveImage({
    src: '/media/ornament.webp',
    alt: '',
    width: 600,
    height: 400,
  }));

  assert.match(markup, /alt=""/);
  assert.match(markup, /loading="lazy"/);
  assert.match(markup, /decoding="async"/);
  assert.doesNotMatch(markup, /fetchPriority=/);
});

test('allows high fetch priority only for an eagerly loaded critical image', () => {
  const markup = renderToStaticMarkup(ResponsiveImage({
    src: '/media/hero.webp',
    alt: 'Approved hero image',
    width: 1800,
    height: 1000,
    loading: 'eager',
    fetchPriority: 'high',
  }));

  assert.match(markup, /loading="eager"/);
  assert.match(markup, /fetchPriority="high"/);
});

test('rejects remote URLs so the reusable primitive defaults to local project assets', () => {
  assert.throws(() => ResponsiveImage({
    src: 'https://images.example.test/hero.jpg',
    alt: 'Hero',
    width: 1200,
    height: 800,
  }), /local project asset/);
  assert.throws(() => ResponsiveImage({
    src: '/media/hero.jpg',
    srcSet: 'https://cdn.example.test/hero-640.jpg 640w',
    alt: 'Hero',
    width: 1200,
    height: 800,
  }), /local project asset/);
});

test('rejects missing alt text, intrinsic dimensions, invalid sources and misleading priority combinations', () => {
  const base = { src: '/media/hero.jpg', alt: 'Hero', width: 1200, height: 800 };
  assert.throws(() => ResponsiveImage({ ...base, alt: undefined }), /alt must be a string/);
  assert.throws(() => ResponsiveImage({ ...base, width: 0 }), /positive intrinsic/);
  assert.throws(() => ResponsiveImage({ ...base, sources: [{ type: 'image/png', srcSet: '/media/hero.png 1x' }] }), /image\/avif or image\/webp/);
  assert.throws(() => ResponsiveImage({ ...base, loading: 'lazy', fetchPriority: 'high' }), /eagerly loaded critical image/);
});
