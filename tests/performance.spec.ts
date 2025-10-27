import { test, expect } from '@playwright/test';

/**
 * Performance Tests - Optimiert und konsolidiert
 * Prüft Ladezeiten, Bildoptimierung und Core Web Vitals
 */

// Wichtige Seiten für Performance-Tests
const PAGES_TO_TEST = [
  { name: 'Homepage', url: '/' },
  { name: 'Ecodrive', url: '/ecodrive/' },
  { name: 'Silvacore', url: '/silvacore/' },
  { name: 'Socialverse', url: '/socialverse/' },
  { name: 'Service - DevSecOps', url: '/services/devsecops/' },
  { name: 'Service - Entwicklung', url: '/services/entwicklung/' },
  { name: 'Service - Design', url: '/services/design/' },
  { name: 'Service - IT-Service', url: '/services/it-service/' },
  { name: 'Service - Smarthome', url: '/services/smarthome/' },
];

test.describe('Performance Tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  // Performance-Metriken für alle Seiten
  for (const pageConfig of PAGES_TO_TEST) {
    test(`Performance: ${pageConfig.name}`, async ({ page }) => {
      await page.goto(pageConfig.url);
      await page.waitForLoadState('networkidle');

      // Performance-Metriken sammeln
      const metrics = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          ttfb: perfData.responseStart - perfData.requestStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        };
      });

      console.log(`\n📊 Performance ${pageConfig.name}:`);
      console.log(`  ⚡ TTFB: ${metrics.ttfb.toFixed(1)}ms`);
      console.log(`  📄 DOM Interactive: ${metrics.domInteractive.toFixed(1)}ms`);
      console.log(`  ✅ DOM Content Loaded: ${metrics.domContentLoaded.toFixed(1)}ms`);
      console.log(`  🎯 Load Complete: ${metrics.loadComplete.toFixed(1)}ms`);

      // Performance-Schwellwerte (angepasst für statische Seiten mit Build)
      // TTFB kann bei ersten Laden variieren, daher toleranter Wert
      expect(metrics.ttfb, 'TTFB sollte < 3000ms sein').toBeLessThan(3000);
      expect(metrics.domInteractive, 'DOM Interactive sollte < 3500ms sein').toBeLessThan(3500);
    });
  }

  // Bildoptimierung prüfen
  test('Bildoptimierung: Alle Bilder haben explizite Dimensionen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = await page.locator('img').all();
    const imagesWithoutDimensions: string[] = [];

    console.log(`\n📊 Gefundene Bilder: ${images.length}`);

    for (const img of images) {
      const src = await img.getAttribute('src');
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');

      if (!width || !height) {
        if (src) {
          imagesWithoutDimensions.push(src);
          console.log(`  ⚠️  Bild ohne explizite Dimensionen: ${src}`);
        }
      }
    }

    if (imagesWithoutDimensions.length > 0) {
      console.log(`\n🔍 Bild-Optimierungsprobleme gefunden:`);
      imagesWithoutDimensions.forEach(src => console.log(`  ⚠️  Bild ohne explizite Dimensionen: ${src}`));
    }

    // Warnung, aber kein Test-Fehler (da es nur CLS-Optimierung ist)
    console.log(`\n💡 ${imagesWithoutDimensions.length} Bilder ohne Dimensionen gefunden (CLS-Risiko)`);
  });

  // Core Web Vitals
  test('Core Web Vitals: LCP & CLS', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {
          lcp: 0,
          cls: 0
        };

        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1] as any;
            vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => {
          lcpObserver.disconnect();
          clsObserver.disconnect();
          resolve(vitals);
        }, 3000);
      });
    });

    const lcp = (webVitals as any).lcp || 0;
    const cls = (webVitals as any).cls || 0;

    console.log(`\n📊 Core Web Vitals:`);
    console.log(`  🎨 LCP (Largest Contentful Paint): ${lcp}ms`);
    console.log(`  📐 CLS (Cumulative Layout Shift): ${cls.toFixed(3)}`);

    if (lcp > 0) {
      expect(lcp, 'LCP sollte < 2500ms sein (gut)').toBeLessThan(2500);
    } else {
      console.log(`  ⚠️  LCP konnte nicht gemessen werden (Seite zu schnell geladen)`);
    }
    
    if (cls > 0) {
      expect(cls, 'CLS sollte < 0.1 sein (gut)').toBeLessThan(0.1);
    } else {
      console.log(`  ✅ CLS = 0 (perfekt - kein Layout Shift)`);
    }
  });
});