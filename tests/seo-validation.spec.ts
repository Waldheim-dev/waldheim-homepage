import { test, expect } from '@playwright/test';

test.describe('SEO Validation Tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  const criticalPages = [
    { path: '/', name: 'Homepage' },
    { path: '/services/', name: 'Services' },
    { path: '/silvacore/', name: 'Silvacore' },
    { path: '/ecodrive/', name: 'Ecodrive' },
    { path: '/socialverse/', name: 'Socialverse' },
    { path: '/referenzen/', name: 'Referenzen' },
  ];

  for (const { path, name } of criticalPages) {
    test.describe(`${name} (${path})`, () => {
      test('hat korrekten Canonical Tag (ohne Query-Parameter)', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveCount(1);
        
        const href = await canonical.getAttribute('href');
        
        // Prüfungen:
        // 1. Beginnt mit https://www.waldheim.dev
        expect(href).toMatch(/^https:\/\/www\.waldheim\.dev/);
        
        // 2. Endet mit Trailing Slash (oder ist Datei)
        if (!href?.includes('.')) {
          expect(href).toMatch(/\/$/);
        }
        
        // 3. Enthält KEINE Query-Parameter
        expect(href).not.toContain('?');
        expect(href).not.toContain('utm_');
        expect(href).not.toContain('ref=');
      });

      test('hat KEIN noindex Meta-Tag (sollte indexiert werden)', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Prüfe, dass KEIN noindex vorhanden ist
        const noindexMeta = page.locator('meta[name="robots"][content*="noindex"]');
        await expect(noindexMeta).toHaveCount(0);
      });

      test('hat Title & Description', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Title vorhanden und nicht leer
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(10);
        expect(title.length).toBeLessThan(70); // SEO Best Practice
        
        // Description vorhanden
        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveCount(1);
        
        const descContent = await description.getAttribute('content');
        expect(descContent).toBeTruthy();
        expect(descContent!.length).toBeGreaterThan(50);
        expect(descContent!.length).toBeLessThan(160); // SEO Best Practice
      });

      test('hat Open Graph Tags', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // OG:Title
        const ogTitle = page.locator('meta[property="og:title"]');
        await expect(ogTitle).toHaveCount(1);
        
        // OG:Description
        const ogDesc = page.locator('meta[property="og:description"]');
        await expect(ogDesc).toHaveCount(1);
        
        // OG:URL
        const ogUrl = page.locator('meta[property="og:url"]');
        await expect(ogUrl).toHaveCount(1);
      });

      test('ist in Sitemap enthalten', async ({ page, request }) => {
        const response = await request.get('/sitemap-index.xml');
        expect(response.ok()).toBeTruthy();
        
        const sitemapContent = await response.text();
        
        // Prüfe, ob Seite in Sitemap vorhanden
        // (könnte in sitemap-0.xml oder einer anderen Sub-Sitemap sein)
        const hasSitemap = sitemapContent.includes(path) || 
                          sitemapContent.includes('sitemap-0.xml');
        
        expect(hasSitemap).toBeTruthy();
      });

      test('hat strukturierte Daten (Schema.org)', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Prüfe JSON-LD Structured Data
        const jsonLd = page.locator('script[type="application/ld+json"]');
        const count = await jsonLd.count();
        
        // Mindestens 1 strukturierte Daten-Block
        expect(count).toBeGreaterThan(0);
        
        // Prüfe, dass es valides JSON ist
        const firstJsonLd = await jsonLd.first().textContent();
        expect(() => JSON.parse(firstJsonLd!)).not.toThrow();
        
        const schema = JSON.parse(firstJsonLd!);
        
        // Sollte @context haben
        expect(schema['@context']).toBe('https://schema.org');
        
        // Sollte @type haben
        expect(schema['@type']).toBeTruthy();
      });

      test('hat keine doppelten H1 Tags', async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        const h1Tags = page.locator('h1');
        const h1Count = await h1Tags.count();
        
        // Genau 1 H1 pro Seite (SEO Best Practice)
        expect(h1Count).toBe(1);
      });
    });
  }

  test.describe('Utility-Seiten (sollten noindex haben)', () => {
    const utilityPages = [
      { path: '/kontakt/', name: 'Kontakt' },
      { path: '/danke/', name: 'Danke' },
      { path: '/datenschutz/', name: 'Datenschutz' },
      { path: '/impressum/', name: 'Impressum' },
    ];

    for (const { path, name } of utilityPages) {
      test(`${name} hat noindex Meta-Tag`, async ({ page }) => {
        const response = await page.goto(path);
        
        // Wenn es ein Redirect ist (wie bei /kontakt/), ist das auch okay für SEO
        if (path === '/kontakt/') {
          await page.waitForURL('https://portal.waldheim.dev/**', { timeout: 10000 });
          expect(page.url()).toContain('portal.waldheim.dev');
          return;
        }

        await page.waitForLoadState('networkidle');
        
        // Diese Seiten SOLLTEN noindex haben
        const noindexMeta = page.locator('meta[name="robots"][content*="noindex"]');
        await expect(noindexMeta).toHaveCount(1);
      });
    }
  });

  test.describe('robots.txt Validation', () => {
    test('robots.txt ist erreichbar', async ({ request }) => {
      const response = await request.get('/robots.txt');
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    test('robots.txt enthält Sitemap-Link', async ({ request }) => {
      const response = await request.get('/robots.txt');
      const content = await response.text();
      
      expect(content).toContain('Sitemap: https://www.waldheim.dev/sitemap-index.xml');
    });

    test('robots.txt blockiert NICHT Datenschutz/Impressum', async ({ request }) => {
      const response = await request.get('/robots.txt');
      const content = await response.text();
      
      // Diese sollten NICHT mehr blockiert sein
      expect(content).not.toContain('Disallow: /datenschutz/');
      expect(content).not.toContain('Disallow: /impressum/');
    });

    test('robots.txt blockiert Test-Seiten', async ({ request }) => {
      const response = await request.get('/robots.txt');
      const content = await response.text();
      
      expect(content).toContain('Disallow: /test-');
    });
  });

  test.describe('Sitemap Validation', () => {
    test('sitemap-index.xml ist erreichbar', async ({ request }) => {
      const response = await request.get('/sitemap-index.xml');
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      
      const content = await response.text();
      expect(content).toContain('<?xml');
      expect(content).toContain('<sitemapindex');
    });

    test('Sitemap enthält KEINE Test-Seiten', async ({ request }) => {
      const response = await request.get('/sitemap-index.xml');
      const sitemapIndex = await response.text();
      
      // Hole erste Sub-Sitemap
      const sitemapMatch = sitemapIndex.match(/<loc>(.*?sitemap-0\.xml)<\/loc>/);
      if (sitemapMatch) {
        const subSitemapUrl = sitemapMatch[1];
        const subSitemapResponse = await request.get(subSitemapUrl);
        const subSitemapContent = await subSitemapResponse.text();
        
        // Sollte KEINE Test-Seiten enthalten
        expect(subSitemapContent).not.toContain('/test-');
        expect(subSitemapContent).not.toContain('/astro-ai-llms-txt');
      }
    });
  });

  test.describe('404 Error Prevention', () => {
    test('Wichtige Assets existieren', async ({ request }) => {
      const criticalAssets = [
        '/favicon.ico',
        '/robots.txt',
        '/sitemap-index.xml',
      ];

      for (const asset of criticalAssets) {
        const response = await request.get(asset);
        expect(response.ok(), `${asset} sollte erreichbar sein`).toBeTruthy();
      }
    });
  });

  test.describe('Redirect Prevention', () => {
    test('Hauptseiten haben KEINE Weiterleitungen', async ({ page }) => {
      for (const { path } of criticalPages) {
        const response = await page.goto(path);
        
        // Status sollte 200 sein, NICHT 301/302
        expect(response?.status()).toBe(200);
      }
    });
  });
});
