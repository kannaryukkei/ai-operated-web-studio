import { createElement as h } from 'react';

const ALLOWED_SOURCE_TYPES = new Set(['image/avif', 'image/webp']);
const ALLOWED_LOADING = new Set(['eager', 'lazy']);
const ALLOWED_PRIORITY = new Set(['high', 'low', 'auto']);
const ALLOWED_DECODING = new Set(['async', 'sync', 'auto']);

function isPositiveDimension(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}

function assertLocalImageUrl(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(label + ' must be a non-empty local URL.');
  }
  const url = value.trim();
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) {
    throw new TypeError(label + ' must reference a local project asset, not a remote URL.');
  }
}

function validateSrcSet(srcSet, label) {
  if (typeof srcSet !== 'string' || !srcSet.trim()) {
    throw new TypeError(label + ' must be a non-empty srcSet string.');
  }
  for (const candidate of srcSet.split(',')) {
    const url = candidate.trim().split(/\s+/)[0];
    assertLocalImageUrl(url, label);
  }
}

function normalizeSources(sources, defaultSizes) {
  if (!Array.isArray(sources)) throw new TypeError('sources must be an array.');
  return sources.map((source, index) => {
    if (!source || typeof source !== 'object') {
      throw new TypeError('sources[' + index + '] must be an object.');
    }
    if (!ALLOWED_SOURCE_TYPES.has(source.type)) {
      throw new TypeError('sources[' + index + '].type must be image/avif or image/webp.');
    }
    validateSrcSet(source.srcSet, 'sources[' + index + '].srcSet');
    const normalized = {
      type: source.type,
      srcSet: source.srcSet.trim(),
      sizes: source.sizes ?? defaultSizes,
    };
    if (typeof normalized.sizes !== 'string' || !normalized.sizes.trim()) {
      throw new TypeError('sources[' + index + '].sizes must be a non-empty string.');
    }
    if (source.media !== undefined) {
      if (typeof source.media !== 'string' || !source.media.trim()) {
        throw new TypeError('sources[' + index + '].media must be a non-empty media query.');
      }
      normalized.media = source.media;
    }
    return normalized;
  });
}

/**
 * Render a local responsive image with optional AVIF/WebP sources and a fallback.
 * Supply intrinsic dimensions to prevent layout shift. Images are lazy by default.
 */
export function ResponsiveImage({
  src,
  srcSet,
  sizes = '100vw',
  sources = [],
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  className,
  pictureClassName,
  objectPosition,
}) {
  assertLocalImageUrl(src, 'src');
  if (srcSet !== undefined) validateSrcSet(srcSet, 'srcSet');
  if (typeof alt !== 'string') throw new TypeError('alt must be a string; use an empty string only for decorative images.');
  if (!isPositiveDimension(width) || !isPositiveDimension(height)) {
    throw new TypeError('width and height must be positive intrinsic image dimensions.');
  }
  if (typeof sizes !== 'string' || !sizes.trim()) throw new TypeError('sizes must be a non-empty string.');
  if (!ALLOWED_LOADING.has(loading)) throw new TypeError('loading must be eager or lazy.');
  if (fetchPriority !== undefined && !ALLOWED_PRIORITY.has(fetchPriority)) {
    throw new TypeError('fetchPriority must be high, low or auto.');
  }
  if (fetchPriority === 'high' && loading !== 'eager') {
    throw new TypeError('High fetch priority is reserved for an eagerly loaded critical image.');
  }
  if (!ALLOWED_DECODING.has(decoding)) throw new TypeError('decoding must be async, sync or auto.');

  const sourceNodes = normalizeSources(sources, sizes).map((source, index) =>
    h('source', { key: source.type + '-' + index, ...source }),
  );
  const imageStyle = objectPosition ? { objectPosition } : undefined;
  const image = h('img', {
    src,
    ...(srcSet ? { srcSet } : {}),
    sizes,
    alt,
    width,
    height,
    loading,
    decoding,
    ...(fetchPriority ? { fetchPriority } : {}),
    ...(className ? { className } : {}),
    ...(imageStyle ? { style: imageStyle } : {}),
  });

  return h('picture', pictureClassName ? { className: pictureClassName } : null, ...sourceNodes, image);
}
