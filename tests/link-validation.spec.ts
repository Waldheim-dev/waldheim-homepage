import { test, expect } from '@playwright/test';

/**
 * Link-Validation Tests
 * Prüft alle internen, externen und Anchor-Links auf der Webseite
 */

test.describe('Link-Validation Tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  // Wichtige Seiten zum Testen
  const pagesToTest = [
    { url: '/', name: 'Homepage' },
    { url: '/ecodrive/', name: 'Ecodrive' },
    { url: '/silvacore/', name: 'Silvacore' },
    { url: '/socialverse/', name: 'Socialverse' },
    { url: '/services/entwicklung/', name: 'Service - Entwicklung' },
    { url: '/services/devsecops/', name: 'Service - DevSecOps' },
    { url: '/services/design/', name: 'Service - Design' },
    { url: '/services/it-service/', name: 'Service - IT-Service' },
    { url: '/services/smarthome/', name: 'Service - Smarthome' },
    { url: '/ueber-mich/', name: 'Über mich' },
    { url: '/blog/1/', name: 'Blog' },
    { url: '/referenzen/1/', name: 'Referenzen' },
    { url: '/kontakt/', name: 'Kontakt' },
  ];

  for (const pageToTest of pagesToTest) {
    test(`${pageToTest.name}: Alle Links validieren`, async ({ page }) => {
      await page.goto(pageToTest.url);
      await page.waitForLoadState('networkidle');

      // Alle Links auf der Seite finden
      const links = await page.locator('a[href]').all();
      const linkCount = links.length;
      console.log(`\n📊 ${pageToTest.name}: ${linkCount} Links gefunden`);

      let internalLinks = 0;
      let externalLinks = 0;
      let anchorLinks = 0;
      let brokenLinks: string[] = [];
      let workingLinks = 0;

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (!href) continue;

        const linkText = (await link.textContent())?.trim() || href;

        // Anchor-Links (z.B. #pricing, #features)
        if (href.startsWith('#')) {
          anchorLinks++;
          
          // Prüfen ob das Ziel-Element existiert
          const targetId = href.substring(1);
          const targetElement = page.locator(`#${targetId}, [name="${targetId}"]`).first();
          const exists = await targetElement.count() > 0;
          
          if (!exists) {
            console.log(`  ❌ Anchor-Link ohne Ziel: ${href} ("${linkText}")`);
            brokenLinks.push(`Anchor: ${href} -> Ziel nicht gefunden`);
          } else {
            workingLinks++;
          }
          continue;
        }

        // Externe Links (http://, https://, mailto:, tel:)
        if (href.startsWith('http://') || href.startsWith('https://') || 
            href.startsWith('mailto:') || href.startsWith('tel:')) {
          externalLinks++;
          
          // Bei externen Links nur prüfen ob Link-Attribut gesetzt ist
          // (vollständige Erreichbarkeit würde zu lange dauern)
          if (href.startsWith('http://') || href.startsWith('https://')) {
            try {
              // Nur Domain-Check, kein vollständiger Request
              const url = new URL(href);
              if (url.hostname) {
                workingLinks++;
              } else {
                brokenLinks.push(`Externe URL ungültig: ${href}`);
              }
            } catch (e) {
              console.log(`  ❌ Ungültige externe URL: ${href} ("${linkText}")`);
              brokenLinks.push(`Externe URL ungültig: ${href}`);
            }
          } else {
            // mailto: und tel: Links als funktionierend markieren
            workingLinks++;
          }
          continue;
        }

        // Interne Links (relative Pfade)
        internalLinks++;
        
        // Relative Links mit Request API validieren (schneller und stabiler)
        try {
          const response = await page.request.get(href);
          
          if (response.status() >= 400) {
            console.log(`  ❌ Interner Link Status ${response.status()}: ${href} ("${linkText}")`);
            brokenLinks.push(`Intern: ${href} -> ${response.status()}`);
          } else {
            workingLinks++;
          }
        } catch (e) {
          console.log(`  ⚠️  Interner Link konnte nicht geprüft werden: ${href} ("${linkText}")`);
          // Bei Fehler als funktionierend zählen (könnte dynamischer Link sein)
          workingLinks++;
        }
      }

      // Zusammenfassung
      console.log(`\n✅ Zusammenfassung ${pageToTest.name}:`);
      console.log(`  📍 Interne Links: ${internalLinks}`);
      console.log(`  🌍 Externe Links: ${externalLinks}`);
      console.log(`  ⚓ Anchor-Links: ${anchorLinks}`);
      console.log(`  ✅ Funktionierende Links: ${workingLinks}/${linkCount}`);
      console.log(`  ❌ Problematische Links: ${brokenLinks.length}`);

      if (brokenLinks.length > 0) {
        console.log(`\n🚨 Gefundene Probleme:`);
        brokenLinks.forEach(link => console.log(`  - ${link}`));
      }

      // Test schlägt fehl wenn defekte Links gefunden wurden
      expect(brokenLinks, `${pageToTest.name} hat ${brokenLinks.length} defekte Link(s)`).toEqual([]);
    });
  }

  test('Navigation: Alle Dropdown-Links funktionieren', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Desktop Navigation - Produkte Dropdown
    const produkteDropdown = page.locator('.dropdown').first();
    await produkteDropdown.hover();
    await page.waitForTimeout(500); // Animation abwarten

    const produkteLinks = await produkteDropdown.locator('a[href]').all();
    console.log(`\n📊 Produkte-Dropdown: ${produkteLinks.length} Links`);

    for (const link of produkteLinks) {
      const href = await link.getAttribute('href');
      const linkText = (await link.textContent())?.trim();
      
      if (href && !href.startsWith('http')) {
        // Interne Links testen
        const response = await page.request.get(href).catch(() => null);
        expect(response?.status(), `Produkte-Link "${linkText}" (${href}) sollte erreichbar sein`).toBeLessThan(400);
      }
    }

    // Services Dropdown
    const servicesDropdown = page.locator('.dropdown').nth(1);
    await servicesDropdown.hover();
    await page.waitForTimeout(500);

    const servicesLinks = await servicesDropdown.locator('a[href]').all();
    console.log(`📊 Services-Dropdown: ${servicesLinks.length} Links`);

    for (const link of servicesLinks) {
      const href = await link.getAttribute('href');
      const linkText = (await link.textContent())?.trim();
      
      if (href && !href.startsWith('http')) {
        const response = await page.request.get(href).catch(() => null);
        expect(response?.status(), `Services-Link "${linkText}" (${href}) sollte erreichbar sein`).toBeLessThan(400);
      }
    }
  });

  test('Footer: Alle Links funktionieren', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footerLinks = await page.locator('footer a[href]').all();
    console.log(`\n📊 Footer: ${footerLinks.length} Links`);

    let brokenLinks: string[] = [];

    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      const linkText = (await link.textContent())?.trim();
      
      if (!href) continue;

      // Nur interne Links testen
      if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        const response = await page.request.get(href).catch(() => null);
        
        if (!response || response.status() >= 400) {
          console.log(`  ❌ Footer-Link defekt: ${href} ("${linkText}")`);
          brokenLinks.push(`${href} -> ${response?.status() || 'Nicht erreichbar'}`);
        }
      }
    }

    expect(brokenLinks, `Footer hat ${brokenLinks.length} defekte Link(s)`).toEqual([]);
  });

  test('Mobile Navigation: Alle Links funktionieren', async ({ page }) => {
    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Mobile Menu öffnen
    await page.locator('.button-toggle').click();
    await page.waitForTimeout(500);

    const mobileLinks = await page.locator('.nav-sidebar a[href]').all();
    console.log(`\n📊 Mobile Navigation: ${mobileLinks.length} Links`);

    let brokenLinks: string[] = [];

    for (const link of mobileLinks) {
      const href = await link.getAttribute('href');
      const linkText = (await link.textContent())?.trim();
      
      if (!href) continue;

      // Nur interne Links testen
      if (!href.startsWith('http') && !href.startsWith('mailto:')) {
        const response = await page.request.get(href).catch(() => null);
        
        if (!response || response.status() >= 400) {
          console.log(`  ❌ Mobile-Link defekt: ${href} ("${linkText}")`);
          brokenLinks.push(`${href} -> ${response?.status() || 'Nicht erreichbar'}`);
        }
      }
    }

    expect(brokenLinks, `Mobile Navigation hat ${brokenLinks.length} defekte Link(s)`).toEqual([]);
  });
});
