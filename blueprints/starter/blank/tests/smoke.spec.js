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
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const durations = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.animationDuration = '10s';
    probe.style.transitionDuration = '4s';
    document.body.append(probe);
    const style = getComputedStyle(probe);
    return {
      preferenceMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      animation: Number.parseFloat(style.animationDuration),
      transition: Number.parseFloat(style.transitionDuration),
    };
  });

  expect(durations.preferenceMatches).toBe(true);
  expect(durations.animation).toBeLessThan(0.001);
  expect(durations.transition).toBeLessThan(0.001);
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
