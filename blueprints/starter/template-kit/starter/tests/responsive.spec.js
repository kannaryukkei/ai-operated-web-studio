import { test, expect } from '@playwright/test';

test('core portfolio sections render and no layout overflows at common viewport widths', async ({ page }) => {
  const widths = [320, 360, 390, 640, 768, 900, 1024, 1280, 1440];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#treatments')).toBeVisible();
    await expect(page.locator('#care-finder')).toBeAttached();
    await expect(page.locator('#stories')).toBeAttached();
    await expect(page.locator('#booking')).toBeAttached();
    await expect(page.locator('.site-footer')).toBeAttached();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.document,
      `horizontal overflow at ${width}px: document=${dimensions.document}, viewport=${dimensions.viewport}`,
    ).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('mobile navigation opens and its links are visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const toggle = page.locator('.mobile-menu-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await expect(page.locator('#mobile-navigation a[href="#booking"]')).toBeVisible();
});

test('vehicle and class selection updates the package price', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('.vehicle-tab').filter({ hasText: 'Motor' }).click();
  await page.locator('.class-option').filter({ hasText: 'Matic besar' }).click();

  await expect(page.locator('.package-card').first().locator('.package-price strong')).toContainText('165.000');
});

test('Care Finder updates its recommendation based on the selected need', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('.finder-needs button').filter({ hasText: 'Detail lebih mendalam' }).click();
  await expect(page.locator('.finder-result > div:first-child > strong')).toHaveText('Deep Detail');

  await page.locator('.finder-needs button').filter({ hasText: 'Perawatan rutin' }).click();
  await expect(page.locator('.finder-result > div:first-child > strong')).toHaveText('Express');
});

test('footer credits stay inside the viewport on desktop and mobile', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const bounds = await page.locator('.footer-legal-inner').evaluate((node) => {
      const rect = node.getBoundingClientRect();
      const childRects = [...node.children].map((child) => {
        const childRect = child.getBoundingClientRect();
        return { left: childRect.left, right: childRect.right };
      });
      return { left: rect.left, right: rect.right, childRects, scrollWidth: node.scrollWidth, clientWidth: node.clientWidth };
    });
    expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.clientWidth + 1);
    for (const child of bounds.childRects) {
      expect(child.left).toBeGreaterThanOrEqual(bounds.left - 1);
      expect(child.right).toBeLessThanOrEqual(bounds.right + 1);
    }
  }
});


test('primary navigation exposes service discovery, process, coverage, and consultation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  for (const [label, target] of [
    ['Treatment', '#treatments'],
    ['Cara kerja', '#process'],
    ['Area layanan', '#coverage'],
    ['FAQ', '#faq'],
    ['Konsultasi', '#booking'],
  ]) {
    await expect(page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: label, exact: true })).toHaveAttribute('href', target);
    await expect(page.locator(target)).toBeAttached();
  }
});

test('Care Finder discloses that package starting prices use vehicle class S', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.finder-price small')).toHaveText('ACUAN MULAI · KELAS S');
  await page.locator('.finder-needs button').filter({ hasText: 'Bau tidak sedap' }).click();
  await expect(page.locator('.finder-price small')).toHaveText('ACUAN MULAI');
});

test('consultation form opens the configured WhatsApp destination with the visitor details', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      window.__zacksWhatsAppUrl = url;
      return {};
    };
  });
  await page.goto('/');
  await page.getByLabel('Nama', { exact: true }).fill('Starter QA');
  await page.getByLabel('Merek / model kendaraan', { exact: true }).fill('Honda HR-V');
  await page.locator('.booking-form select').nth(2).selectOption('Express');
  await page.getByRole('button', { name: /Lanjutkan ke WhatsApp/ }).click();

  const openedUrl = await page.evaluate(() => window.__zacksWhatsAppUrl);
  expect(openedUrl).toBeTruthy();
  const destination = new URL(openedUrl);
  expect(destination.hostname).toBe('wa.me');
  expect(destination.pathname).toBe('/6282359713072');
  const message = destination.searchParams.get('text');
  expect(message).toContain('Nama: Starter QA');
  expect(message).toContain('Merek / model: Honda HR-V');
  expect(message).toContain('Treatment: Express');
  expect(message).toContain('jadwal belum terkonfirmasi');
  await expect(page.getByRole('status')).toContainText('Pesan konsultasi disiapkan');
  await expect(page.locator('.form-disclaimer')).toContainText('bukan konfirmasi booking');
});

test('date minimum follows the browser local calendar date (Asia/Jakarta)', async ({ browser }) => {
  const context = await browser.newContext({ timezoneId: 'Asia/Jakarta' });
  const page = await context.newPage();
  await page.goto('/');
  const expectedLocalDate = await page.evaluate(() => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    return [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join('-');
  });
  await expect(page.locator('input[type="date"]')).toHaveAttribute('min', expectedLocalDate);
  await context.close();
});

test('all internal navigation links resolve to an existing page section', async ({ page }) => {
  await page.goto('/');
  const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) => links
    .map((link) => link.getAttribute('href').slice(1))
    .filter((target) => target && !document.getElementById(decodeURIComponent(target))));
  expect(missingTargets).toEqual([]);
});

test('all WhatsApp CTAs use the configured public business number', async ({ page }) => {
  await page.goto('/');
  const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
  expect(links.length).toBeGreaterThan(5);
  for (const link of links) {
    expect(new URL(link).hostname).toBe('wa.me');
    expect(new URL(link).pathname).toBe('/6282359713072');
  }
});

test('all page images load and include meaningful alternative text', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const images = await page.locator('img').evaluateAll(async (nodes) => {
    nodes.forEach((image) => { image.loading = 'eager'; });
    await Promise.all(nodes.map((image) => image.decode().catch(() => null)));
    return nodes.map((image) => ({
      source: image.currentSrc || image.src,
      loaded: image.complete && image.naturalWidth > 0,
      hasAlt: image.alt.trim().length > 0,
    }));
  });

  expect(images.length).toBeGreaterThan(0);
  expect(images.filter((image) => !image.loaded)).toEqual([]);
  expect(images.filter((image) => !image.hasAlt)).toEqual([]);
});

test('FAQ provides a readable answer list and core sections remain present', async ({ page }) => {
  await page.goto('/');
  const faqItems = page.locator('#faq .faq-item');
  await expect(faqItems).toHaveCount(12);
  const questions = await faqItems.locator('summary').evaluateAll((nodes) =>
    nodes.map((node) => node.textContent.replace(/^\d+/, '').trim()),
  );
  expect(new Set(questions).size).toBe(12);
  expect(questions).toContain('Apakah mengirim form konsultasi berarti sudah booking?');
  for (const id of ['treatments', 'care-finder', 'approach', 'additional', 'gallery', 'stories', 'process', 'coverage', 'booking', 'faq']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});


test('mobile navigation closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Buka menu' }).click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Buka menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('skip link moves keyboard users to the main content', async ({ page }) => {
  await page.goto('/');
  const skipLink = page.getByRole('link', { name: 'Lewati ke konten utama' });
  await skipLink.focus();
  await expect(skipLink).toBeVisible();
  await skipLink.click();
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('main#main-content')).toBeFocused();
});


