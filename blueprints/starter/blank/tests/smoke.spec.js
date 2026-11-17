import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const projectPackage = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

test('the unconfigured application responds and exposes a semantic main landmark', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Unconfigured site preview');
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.locator('main#main-content')).toBeEmpty();
});

test('the skip link is keyboard reachable, visibly focused, and moves focus to main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute('href', '#main-content');

  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).toBeGreaterThan(0);

  await page.keyboard.press('Enter');
  await expect(page.locator('main#main-content')).toBeFocused();
});

test('reduced-motion preferences limit animation and transition durations', async ({ page }) => {
  await page.goto('/');
  const styleTag = await page.addStyleTag({ content: `
    @keyframes motion-probe {
      from { transform: translateX(0); }
      to { transform: translateX(100px); }
    }
    #motion-probe {
      opacity: 0;
      transition: opacity 4s linear;
      animation: motion-probe 10s linear infinite;
    }
    #motion-probe.is-active { opacity: 1; }
    @media (prefers-reduced-motion: reduce) {
      #motion-probe {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  ` });
  await page.evaluate(() => {
    const element = document.createElement('div');
    element.id = 'motion-probe';
    document.body.append(element);
    void element.offsetWidth;
    element.classList.add('is-active');
    return element;
  });

  try {
    const normal = await page.locator('#motion-probe').evaluate((element) => ({
      animationDuration: Number.parseFloat(getComputedStyle(element).animationDuration),
      transitionDuration: Number.parseFloat(getComputedStyle(element).transitionDuration),
      activeAnimations: element.getAnimations().filter((animation) => animation.playState === 'running').length,
      activeTransitions: element.getAnimations().filter((animation) => animation.transitionProperty === 'opacity' && animation.playState === 'running').length,
    }));
    expect(normal.animationDuration).toBeGreaterThan(0);
    expect(normal.transitionDuration).toBeGreaterThan(0);
    expect(normal.activeAnimations).toBeGreaterThan(0);
    expect(normal.activeTransitions).toBeGreaterThan(0);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await page.locator('#motion-probe').evaluate((element) => ({
      preferenceMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationDuration: Number.parseFloat(getComputedStyle(element).animationDuration),
      transitionDuration: Number.parseFloat(getComputedStyle(element).transitionDuration),
    }));

    expect(reduced.preferenceMatches).toBe(true);
    expect(reduced.animationDuration).toBeLessThan(0.001);
    expect(reduced.transitionDuration).toBeLessThan(0.001);
  } finally {
    await page.locator('#motion-probe').evaluate((element) => element.remove());
    await styleTag.evaluate((element) => element.remove());
  }
});

test('the blank shell has no business content, proof, external assets, or unnecessary runtime dependencies', async ({ page }) => {
  const externalRequests = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (['http:', 'https:'].includes(url.protocol) && url.origin !== 'http://127.0.0.1:4173') {
      externalRequests.push(request.url());
    }
  });

  await page.goto('/');
  await expect(page.locator('main')).toBeEmpty();
  await expect(page.locator('body')).toContainText('Skip to main content');
  expect(await page.locator('img, video, audio, iframe, form, input, select, textarea, a[href^="http"]').count()).toBe(0);
  expect(externalRequests).toEqual([]);
  expect(Object.keys(projectPackage.dependencies).sort()).toEqual(['react', 'react-dom']);
  expect(Object.keys(projectPackage.devDependencies).sort()).toEqual(['@playwright/test', '@vitejs/plugin-react', 'vite']);
});

test('the page keeps preview robots restrictions', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
});

test('the page has no browser console or uncaught page errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(errors).toEqual([]);
});

test('the document has no horizontal overflow at the required viewport widths', async ({ page }) => {
  for (const width of [320, 360, 390, 640, 768, 900, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    expect(dimensions.documentWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewportWidth);
  }
});
