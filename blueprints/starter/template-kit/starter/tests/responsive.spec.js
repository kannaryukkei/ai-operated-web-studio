import { test, expect } from '@playwright/test';

async function inspectControlTextContrast(page, selector, state) {
  return page.locator(selector).evaluateAll((controls, stateLabel) => {
    const parseColor = (value) => {
      const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : match[4].endsWith('%') ? Number.parseFloat(match[4]) / 100 : Number.parseFloat(match[4]);
      return [Number(match[1]), Number(match[2]), Number(match[3]), alpha];
    };
    const composite = (front, back) => {
      const alpha = front[3] + back[3] * (1 - front[3]);
      if (!alpha) return [0, 0, 0, 0];
      return [0, 1, 2].map((index) => (front[index] * front[3] + back[index] * back[3] * (1 - front[3])) / alpha).concat(alpha);
    };
    const luminance = (color) => {
      const channels = color.slice(0, 3).map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const describe = (element) => element.tagName.toLowerCase() + (typeof element.className === 'string' && element.className ? '.' + element.className.trim().replace(/\s+/g, '.') : '');
    const samples = [];
    const manualReview = [];

    for (const control of controls) {
      const textNodes = [];
      const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (walker.currentNode.textContent.trim()) textNodes.push(walker.currentNode);
      }

      for (const textNode of textNodes) {
        const element = textNode.parentElement;
        if (!element || !element.getClientRects().length) continue;
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;

        let background = [255, 255, 255, 1];
        let unresolvedSurface = false;
        let ancestor = element;
        const ancestry = [];
        while (ancestor) {
          ancestry.unshift(ancestor);
          ancestor = ancestor.parentElement;
        }
        for (const layer of ancestry) {
          const layerStyle = getComputedStyle(layer);
          if (layerStyle.backgroundImage !== 'none') unresolvedSurface = true;
          if (Number(layerStyle.opacity) !== 1) unresolvedSurface = true;
          const color = parseColor(layerStyle.backgroundColor);
          if (color && color[3] > 0) background = composite(color, background);
        }

        const text = textNode.textContent.trim().replace(/\s+/g, ' ');
        const location = stateLabel + ' / ' + describe(element) + ' / "' + text.slice(0, 64) + '"';
        if (unresolvedSurface) {
          manualReview.push(location + ' uses an image, gradient, or opacity-composited surface');
          continue;
        }

        const foreground = parseColor(style.color);
        if (!foreground) {
          manualReview.push(location + ' has an unparseable computed foreground color');
          continue;
        }
        const renderedForeground = composite(foreground, background);
        const foregroundLuminance = luminance(renderedForeground);
        const backgroundLuminance = luminance(background);
        const ratio = (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
        const fontSize = Number.parseFloat(style.fontSize);
        const isBold = Number.parseInt(style.fontWeight, 10) >= 700;
        const minimum = fontSize >= 24 || (fontSize >= 18.66 && isBold) ? 3 : 4.5;
        samples.push({ location, foreground: style.color, background: 'rgb(' + background.slice(0, 3).map(Math.round).join(', ') + ')', ratio: Number(ratio.toFixed(2)), minimum });
      }
    }
    return { samples, manualReview };
  }, state);
}

test('core portfolio sections render at all nine canonical viewports', async ({ page }) => {
  const widths = [320, 360, 390, 640, 768, 900, 1024, 1280, 1440];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#treatments')).toBeVisible();
    await expect(page.locator('#care-finder')).toBeAttached();
    await expect(page.locator('#booking')).toBeAttached();
    await expect(page.locator('.site-footer')).toBeAttached();
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

test('mobile navigation and selected vehicle/class states retain readable contrast', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const toggle = page.locator('.mobile-menu-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  const mobileContrast = await inspectControlTextContrast(page, '#mobile-navigation a', 'mobile navigation expanded at 390px');
  expect(mobileContrast.samples.length, 'expanded mobile navigation should have measurable visible control text').toBeGreaterThan(0);
  expect(mobileContrast.samples.filter((sample) => sample.ratio + 0.01 < sample.minimum), 'mobile navigation contrast failures: ' + JSON.stringify(mobileContrast.samples.filter((sample) => sample.ratio + 0.01 < sample.minimum))).toEqual([]);
  for (const surface of mobileContrast.manualReview) console.info('Manual contrast review required: ' + surface);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const vehicleTab = page.locator('.vehicle-tab').filter({ hasText: 'Motor' });
  await vehicleTab.click();
  await expect(vehicleTab).toHaveAttribute('aria-pressed', 'true');
  const classOption = page.locator('.class-option').filter({ hasText: 'Matic besar' });
  await classOption.click();
  await expect(classOption).toHaveAttribute('aria-pressed', 'true');
  const selectedContrast = await inspectControlTextContrast(page, '.vehicle-tab.is-active, .class-option.is-active', 'Motor / Matic besar selected at 1440px');
  expect(selectedContrast.samples.length, 'selected vehicle and class controls should have measurable visible text').toBeGreaterThan(0);
  expect(selectedContrast.samples.filter((sample) => sample.ratio + 0.01 < sample.minimum), 'selected vehicle/class contrast failures: ' + JSON.stringify(selectedContrast.samples.filter((sample) => sample.ratio + 0.01 < sample.minimum))).toEqual([]);
  for (const surface of selectedContrast.manualReview) console.info('Manual contrast review required: ' + surface);
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
  await expect(page.getByRole('status')).toContainText('WhatsApp terbuka dengan pesan konsultasi');
  await expect(page.locator('.form-disclaimer')).toContainText('bukan konfirmasi booking');
});

test('consultation form provides a direct WhatsApp fallback when the popup is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      window.__zacksWhatsAppUrl = url;
      return null;
    };
  });
  await page.goto('/');
  await page.getByLabel('Nama', { exact: true }).fill('Starter QA');
  await page.getByLabel('Merek / model kendaraan', { exact: true }).fill('Honda HR-V');
  await page.getByRole('button', { name: /Lanjutkan ke WhatsApp/ }).click();

  const status = page.getByRole('status');
  await expect(status).toContainText('Browser memblokir jendela baru');
  const fallback = page.getByRole('link', { name: /Buka WhatsApp/ });
  const destination = new URL(await fallback.getAttribute('href'));
  expect(destination.hostname).toBe('wa.me');
  expect(destination.pathname).toBe('/6282359713072');
  expect(destination.searchParams.get('text')).toContain('Nama: Starter QA');
  expect(destination.searchParams.get('text')).toContain('Merek / model: Honda HR-V');
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
  for (const id of ['treatments', 'care-finder', 'approach', 'additional', 'gallery', 'process', 'coverage', 'booking', 'faq']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});


test('unverified testimonials and performance metrics are excluded from the Starter reference', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.stories-section, .story-card, .proof-strip, .proof-metric')).toHaveCount(0);
  const visibleCopy = await page.locator('main').innerText();
  for (const fabricatedClaim of [/1,250\+/, /4\.9\/5/, /92%/, /Raka P\./, /Dimas A\./, /Nadia K\./, /SIMULATED CUSTOMER STORY/i, /SAMPLE STORIES/i]) {
    expect(visibleCopy).not.toMatch(fabricatedClaim);
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
