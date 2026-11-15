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
      offenders: [...document.querySelectorAll('body *')]
        .map((node) => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return {
            element: node.tagName.toLowerCase() + (typeof node.className === 'string' && node.className ? '.' + node.className.trim().replace(/\\s+/g, '.') : ''),
            text: (node.innerText || node.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 64),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            scrollWidth: node.scrollWidth,
            clientWidth: node.clientWidth,
            position: style.position,
          };
        })
        .filter((item) => item.right > document.documentElement.clientWidth + 1 || item.scrollWidth > item.clientWidth + 1)
        .sort((a, b) => b.right - a.right)
        .slice(0, 12),
    }));
    expect(
      dimensions.document,
      `horizontal overflow at ${width}px: document=${dimensions.document}, viewport=${dimensions.viewport}; offenders=${JSON.stringify(dimensions.offenders)}`,
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



const STARTER_VIEWPORTS = [320, 360, 390, 640, 768, 900, 1024, 1280, 1440];

test('readability role floors hold at all nine Starter viewports', async ({ page }) => {
  const roles = [
    { name: 'body copy and customer-facing labels', min: 15, selector: 'main p, main li, main label, main summary, main .care-finder-note, main .finder-needs button > span, main .finder-needs button small, .site-footer p' },
    { name: 'interactive controls and navigation', min: 13, selector: 'main button, main input, main select, main textarea, main .button, main .package-link, main .additional-link, main .class-option strong, .site-header .desktop-nav a, .site-header .mobile-nav a, .site-header .button' },
    { name: 'compact metadata and disclosures', min: 11, selector: 'main small, main .eyebrow:not(.eyebrow--light), main .eyebrow--light, main .micro-label, main .hero-kicker, main .hero-aside-eyebrow, main .hero-image-caption, main .hero-bottom, main .hero-location, main .package-meta, main .active-class-indicator, main .package-title-row > span, main .additional-top, main .additional-card > small, main .additional-price > span, main .additional-note, main .gallery-category, main .gallery-side-note, main .gallery-item figcaption span, main .gallery-item figcaption > a, main .gallery-disclaimer, main .process-count span, main .coverage-tags span, main .readiness-strip, main .form-heading > span, main .form-heading > small, main .optional, main .finder-topline, main .contact-footnote, .site-footer small, .site-footer .footer-legal-inner, .site-footer .footer-demo-note, .site-footer .footer-social > span, .site-footer .footer-nav > span' },
  ];

  for (const width of STARTER_VIEWPORTS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    for (const role of roles) {
      const metrics = await page.locator(role.selector).evaluateAll((nodes) => nodes
        .filter((node) => {
          const style = getComputedStyle(node);
          const rect = node.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0 && (node.innerText || node.textContent || '').trim().length > 0;
        })
        .map((node) => ({
          text: (node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 72),
          fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
          element: node.tagName.toLowerCase() + (typeof node.className === 'string' && node.className ? '.' + node.className.trim().replace(/\s+/g, '.') : ''),
        })));
      expect(metrics.length, role.name + ' should have rendered samples at ' + width + 'px').toBeGreaterThan(0);
      const violations = metrics.filter((item) => item.fontSize < role.min);
      expect(violations, role.name + ' below ' + role.min + 'px at ' + width + 'px').toEqual([]);
    }
  }
});

test('text contrast meets WCAG AA on measurable solid-color surfaces', async ({ page }) => {
  const selector = 'main p, main li, main label, main summary, main button, main input, main select, main textarea, main a, main small, main .eyebrow, main .micro-label, main .hero-kicker, main .hero-aside-eyebrow, main .hero-image-caption, main .hero-bottom, main .hero-location, main .package-meta, main .active-class-indicator, main .package-title-row > span, main .class-option small, main .class-disclaimer, main .additional-top, main .additional-price > span, main .additional-note, main .gallery-item figcaption span, main .gallery-item figcaption > a, main .gallery-disclaimer, main .process-count span, main .coverage-tags span, main .coverage-stamp small, main .coverage-stamp span, main .readiness-strip, main .form-heading > span, main .form-heading > small, main .optional, main .finder-topline, main .finder-result > div:first-child > small, main .contact-footnote, .site-header a, .site-footer a, .site-footer p, .site-footer small, .site-footer .footer-legal-inner, .site-footer .footer-social > span, .site-footer .footer-nav > span';
  const inspectContrast = async () => page.evaluate((textSelector) => {
    const parseColor = (value) => {
      const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : match[4].endsWith('%') ? Number.parseFloat(match[4]) / 100 : Number.parseFloat(match[4]);
      return [Number(match[1]), Number(match[2]), Number(match[3]), alpha];
    };
    const over = (front, back) => {
      const alpha = front[3];
      const outAlpha = alpha + back[3] * (1 - alpha);
      if (!outAlpha) return [0, 0, 0, 0];
      return [0, 1, 2].map((index) => (front[index] * alpha + back[index] * back[3] * (1 - alpha)) / outAlpha).concat(outAlpha);
    };
    const luminance = (rgb) => {
      const channels = rgb.slice(0, 3).map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const ratio = (first, second) => {
      const a = luminance(first);
      const b = luminance(second);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const elements = [...document.querySelectorAll(textSelector)];
    const failures = [];
    const skipped = [];
    let checked = 0;
    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text || style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0 || Number(style.opacity) === 0) continue;
      if (element.closest('.hero, .philosophy-photo, .gallery-photo, .coverage-art')) {
        skipped.push({ text: text.slice(0, 48), reason: 'photographic / gradient surface requires screenshot review' });
        continue;
      }
      const chain = [];
      let current = element;
      let unsupportedSurface = false;
      while (current) {
        chain.push(current);
        current = current.parentElement;
      }
      let background = [255, 255, 255, 1];
      let opacity = 1;
      for (const ancestor of chain.reverse()) {
        const ancestorStyle = getComputedStyle(ancestor);
        opacity *= Number.parseFloat(ancestorStyle.opacity || '1');
        if (ancestorStyle.backgroundImage && ancestorStyle.backgroundImage !== 'none') { unsupportedSurface = true; break; }
        const layer = parseColor(ancestorStyle.backgroundColor);
        if (layer && layer[3] > 0) background = over(layer, background);
      }
      if (unsupportedSurface) {
        skipped.push({ text: text.slice(0, 48), reason: 'CSS background image / gradient requires screenshot review' });
        continue;
      }
      const foreground = parseColor(style.color);
      if (!foreground) {
        skipped.push({ text: text.slice(0, 48), reason: 'unsupported computed foreground color' });
        continue;
      }
      foreground[3] *= opacity;
      const renderedForeground = over(foreground, background);
      const fontSize = Number.parseFloat(style.fontSize);
      const isBold = Number.parseInt(style.fontWeight, 10) >= 700;
      const minimum = fontSize >= 24 || (fontSize >= 18.66 && isBold) ? 3 : 4.5;
      const measured = ratio(renderedForeground, background);
      checked += 1;
      if (measured + 0.01 < minimum) failures.push({ text: text.slice(0, 64), element: element.tagName.toLowerCase() + (typeof element.className === 'string' && element.className ? '.' + element.className.trim().replace(/\s+/g, '.') : ''), foreground: style.color, background: 'rgb(' + background.slice(0, 3).map(Math.round).join(', ') + ')', fontSize: style.fontSize, contrast: Number(measured.toFixed(2)), required: minimum });
    }
    return { checked, skippedCount: skipped.length, failures, skippedExamples: skipped.slice(0, 5) };
  }, selector);

  for (const width of STARTER_VIEWPORTS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const result = await inspectContrast();
    expect(result.checked, 'solid-surface text samples should be checked at ' + width + 'px').toBeGreaterThan(20);
    expect(result.failures, 'contrast failures at ' + width + 'px; excluded image/gradient surfaces: ' + result.skippedCount + '; examples: ' + JSON.stringify(result.skippedExamples)).toEqual([]);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('.mobile-menu-toggle').click();
  let stateResult = await inspectContrast();
  expect(stateResult.failures, 'mobile navigation expanded-state contrast').toEqual([]);
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('.vehicle-tab').filter({ hasText: 'Motor' }).click();
  await page.locator('.class-option').filter({ hasText: 'Matic besar' }).click();
  stateResult = await inspectContrast();
  expect(stateResult.failures, 'selected vehicle/class state contrast').toEqual([]);
});
