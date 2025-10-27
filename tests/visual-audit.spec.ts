import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'Homepage', url: '/', sections: [] },
  { name: 'Silvacore', url: '/silvacore/', sections: [] },
  { name: 'Ecodrive', url: '/ecodrive/', sections: [] },
  { name: 'Socialverse', url: '/socialverse/', sections: [] },
  { name: 'Über-mich', url: '/ueber-mich/', sections: [] },
  { name: 'Service-Entwicklung', url: '/services/entwicklung/', sections: ['#leistungen'] },
  { name: 'Service-DevSecOps', url: '/services/devsecops/', sections: ['#leistungen'] },
  { name: 'Service-Design', url: '/services/design/', sections: ['#leistungen'] },
  { name: 'Service-IT-Service', url: '/services/it-service/', sections: ['#leistungen'] },
  { name: 'Service-SmartHome', url: '/services/smarthome/', sections: ['#leistungen'] },
];

test.describe('Visual Audit - Full Page Screenshots', () => {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  
  test.beforeAll(() => {
    // Erstelle Screenshots-Ordner
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  for (const page of pages) {
    test(`Screenshot: ${page.name}`, async ({ page: browserPage }) => {
      // Navigiere zur Seite
      await browserPage.goto(page.url);
      
      // Warte auf Netzwerk-Idle (alle Ressourcen geladen)
      await browserPage.waitForLoadState('networkidle');
      
      // Scroll komplett nach unten, um ALLE GSAP-Animationen zu triggern
      await browserPage.evaluate(async () => {
        // Scroll ganz nach unten
        window.scrollTo(0, document.body.scrollHeight);
        
        // Warte kurz
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Scroll wieder nach oben
        window.scrollTo(0, 0);
      });
      
      // Warte auf GSAP-Animationen (längste Animation-Delay + Dauer)
      // Max delay ist ca. 1.5s + Animation-Dauer 1s = 2.5s
      await browserPage.waitForTimeout(3000);
      
      // Full-Page Screenshot
      const screenshotPath = path.join(screenshotsDir, `${page.name.replace(/\s+/g, '-').toLowerCase()}.png`);
      await browserPage.screenshot({ 
        path: screenshotPath, 
        fullPage: true 
      });
      
      console.log(`✅ Screenshot gespeichert: ${screenshotPath}`);
      
      // Prüfe, ob wichtige Elemente vorhanden sind
      if (page.sections.length > 0) {
        for (const section of page.sections) {
          const sectionExists = await browserPage.locator(section).count() > 0;
          expect(sectionExists, `Section ${section} sollte auf ${page.name} vorhanden sein`).toBeTruthy();
        }
      }
      
      // Prüfe auf console errors
      const consoleErrors: string[] = [];
      browserPage.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Optional: Prüfe auf alte SVG-Icons (sollten durch FA-Icons ersetzt sein)
      const svgCount = await browserPage.locator('svg').count();
      console.log(`ℹ️  ${page.name}: ${svgCount} SVG-Elemente gefunden`);
      
      // Optional: Prüfe auf FA-Icons
      const faIconCount = await browserPage.locator('[class*="fa-"]').count();
      console.log(`ℹ️  ${page.name}: ${faIconCount} FontAwesome Icons gefunden`);
    });
  }
});

test.describe('Component Audit - Individual Components', () => {
  test('Check gradient text usage', async ({ page }) => {
    await page.goto('/');
    
    // Prüfe, ob Gradient-Text-Klassen verwendet werden
    const gradientElements = await page.locator('[class*="bg-clip-text"]').count();
    console.log(`ℹ️  Homepage: ${gradientElements} Gradient-Text-Elemente gefunden`);
    expect(gradientElements).toBeGreaterThan(0);
  });
  
  test('Check modern card design', async ({ page }) => {
    await page.goto('/services/entwicklung/');
    
    // Prüfe auf moderne Card-Klassen
    const modernCards = await page.locator('[class*="border-blue-500/20"], [class*="border-purple-500/20"], [class*="border-green-500/20"]').count();
    console.log(`ℹ️  Entwicklung: ${modernCards} moderne Cards gefunden`);
    expect(modernCards).toBeGreaterThan(0);
  });
  
  test('Check FontAwesome icons on all pages', async ({ page }) => {
    const testPages = ['/silvacore/', '/ecodrive/', '/socialverse/', '/ueber-mich/'];
    
    for (const url of testPages) {
      await page.goto(url);
      const faCount = await page.locator('i[class*="fa-"]').count();
      console.log(`ℹ️  ${url}: ${faCount} FA-Icons gefunden`);
      expect(faCount, `${url} sollte FontAwesome Icons verwenden`).toBeGreaterThan(0);
    }
  });
});
