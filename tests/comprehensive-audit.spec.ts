import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'Homepage', url: '/', requiredSections: ['nav', 'footer'] },
  { name: 'Silvacore', url: '/silvacore/', requiredSections: ['nav', 'footer', '#features'] },
  { name: 'Ecodrive', url: '/ecodrive/', requiredSections: ['nav', 'footer', '#features'] },
  { name: 'Socialverse', url: '/socialverse/', requiredSections: ['nav', 'footer', '#features'] },
  { name: 'Über-mich', url: '/ueber-mich/', requiredSections: ['nav', 'footer'] },
  { name: 'Service-Entwicklung', url: '/services/entwicklung/', requiredSections: ['nav', 'footer', '#leistungen'] },
  { name: 'Service-DevSecOps', url: '/services/devsecops/', requiredSections: ['nav', 'footer', '#leistungen'] },
  { name: 'Service-Design', url: '/services/design/', requiredSections: ['nav', 'footer', '#leistungen'] },
  { name: 'Service-IT-Service', url: '/services/it-service/', requiredSections: ['nav', 'footer', '#leistungen'] },
  { name: 'Service-SmartHome', url: '/services/smarthome/', requiredSections: ['nav', 'footer', '#leistungen'] },
  { name: 'Kontakt', url: '/kontakt/', requiredSections: ['nav', 'footer'] },
  { name: 'Datenschutz', url: '/datenschutz/', requiredSections: ['nav', 'footer'] },
  { name: 'Impressum', url: '/impressum/', requiredSections: ['nav', 'footer'] },
];

interface AuditResult {
  page: string;
  url: string;
  success: boolean;
  errors: string[];
  warnings: string[];
  metrics: {
    svgCount: number;
    faIconCount: number;
    faIconPercentage: number;
    gradientTextElements: number;
    modernCards: number;
    consoleErrors: number;
    loadTime: number;
  };
}

const auditResults: AuditResult[] = [];

test.describe('🔍 Comprehensive Site Audit', () => {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  const auditReportPath = path.join(process.cwd(), 'audit-report.json');
  
  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  for (const pageConfig of pages) {
    test(`Audit: ${pageConfig.name}`, async ({ page }) => {
      const startTime = Date.now();
      const errors: string[] = [];
      const warnings: string[] = [];
      const consoleErrors: string[] = [];
      
      // Console Error Listener
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Page Error Listener
      page.on('pageerror', error => {
        errors.push(`JavaScript Error: ${error.message}`);
      });

      try {
        // 1. Navigiere zur Seite mit Timeout
        await page.goto(pageConfig.url, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        // 2. Warte auf kritische Elemente
        try {
          await page.waitForSelector('nav', { timeout: 5000 });
          await page.waitForSelector('footer', { timeout: 5000 });
        } catch (e) {
          errors.push(`Timeout: Nav oder Footer nicht gefunden auf ${pageConfig.name}`);
        }
        
        // 3. Trigger ALLE GSAP-Animationen
        await page.evaluate(async () => {
          // Scroll-Strategie: Mehrfach scrollen, um alle IntersectionObserver zu triggern
          const scrollSteps = 5;
          const scrollHeight = document.body.scrollHeight;
          
          for (let i = 0; i <= scrollSteps; i++) {
            const scrollTo = (scrollHeight / scrollSteps) * i;
            window.scrollTo(0, scrollTo);
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          
          // Scroll wieder nach oben
          window.scrollTo(0, 0);
          await new Promise(resolve => setTimeout(resolve, 500));
        });
        
        // 4. Warte auf GSAP-Animationen (max delay + duration)
        await page.waitForTimeout(3500);
        
        // 5. Prüfe Required Sections
        for (const selector of pageConfig.requiredSections) {
          const exists = await page.locator(selector).count() > 0;
          if (!exists) {
            errors.push(`Required Section fehlt: ${selector}`);
          }
        }
        
        // 6. Sammle Metriken
        const svgCount = await page.locator('svg').count();
        const faIconCount = await page.locator('i[class*="fa-"]').count();
        const totalIcons = svgCount + faIconCount;
        const faIconPercentage = totalIcons > 0 ? Math.round((faIconCount / totalIcons) * 100) : 0;
        
        const gradientTextElements = await page.locator('[class*="bg-clip-text"]').count();
        const modernCards = await page.locator('[class*="rounded-2xl"][class*="border"]').count();
        
        // 7. Warnungen basierend auf Metriken
        if (faIconPercentage < 60) {
          warnings.push(`Niedrige FA-Icon-Coverage: ${faIconPercentage}% (Ziel: >60%)`);
        }
        
        if (svgCount > 30) {
          warnings.push(`Viele SVG-Elemente: ${svgCount} (prüfen, ob ersetzbar)`);
        }
        
        if (consoleErrors.length > 0) {
          warnings.push(`${consoleErrors.length} Console Errors: ${consoleErrors.slice(0, 3).join(', ')}`);
        }
        
        // 8. Screenshot
        const screenshotPath = path.join(screenshotsDir, `${pageConfig.name.replace(/\s+/g, '-').toLowerCase()}.png`);
        await page.screenshot({ 
          path: screenshotPath, 
          fullPage: true 
        });
        
        // 9. Berechne Load Time
        const loadTime = Date.now() - startTime;
        
        // 10. Speichere Ergebnis
        const result: AuditResult = {
          page: pageConfig.name,
          url: pageConfig.url,
          success: errors.length === 0,
          errors,
          warnings,
          metrics: {
            svgCount,
            faIconCount,
            faIconPercentage,
            gradientTextElements,
            modernCards,
            consoleErrors: consoleErrors.length,
            loadTime
          }
        };
        
        auditResults.push(result);
        
        // 11. Console Output
        console.log(`\n${'='.repeat(60)}`);
        console.log(`📄 ${pageConfig.name} (${pageConfig.url})`);
        console.log(`${'='.repeat(60)}`);
        console.log(`✅ Status: ${result.success ? 'PASS' : 'FAIL'}`);
        console.log(`⏱️  Load Time: ${loadTime}ms`);
        console.log(`\n📊 Metriken:`);
        console.log(`   - FA-Icons: ${faIconCount} (${faIconPercentage}%)`);
        console.log(`   - SVGs: ${svgCount}`);
        console.log(`   - Gradient Text: ${gradientTextElements}`);
        console.log(`   - Modern Cards: ${modernCards}`);
        console.log(`   - Console Errors: ${consoleErrors.length}`);
        
        if (errors.length > 0) {
          console.log(`\n❌ Errors (${errors.length}):`);
          errors.forEach(err => console.log(`   - ${err}`));
        }
        
        if (warnings.length > 0) {
          console.log(`\n⚠️  Warnings (${warnings.length}):`);
          warnings.forEach(warn => console.log(`   - ${warn}`));
        }
        
        console.log(`\n📸 Screenshot: ${screenshotPath}`);
        
        // 12. Test Assertions
        expect(errors.length, `${pageConfig.name} sollte keine Errors haben: ${errors.join(', ')}`).toBe(0);
        
      } catch (error) {
        errors.push(`Test Exception: ${error}`);
        auditResults.push({
          page: pageConfig.name,
          url: pageConfig.url,
          success: false,
          errors,
          warnings,
          metrics: {
            svgCount: 0,
            faIconCount: 0,
            faIconPercentage: 0,
            gradientTextElements: 0,
            modernCards: 0,
            consoleErrors: consoleErrors.length,
            loadTime: Date.now() - startTime
          }
        });
        throw error;
      }
    });
  }
  
  test.afterAll(() => {
    // Generiere zusammenfassenden Report
    const report = {
      timestamp: new Date().toISOString(),
      totalPages: auditResults.length,
      passed: auditResults.filter(r => r.success).length,
      failed: auditResults.filter(r => !r.success).length,
      results: auditResults,
      summary: {
        avgFaIconPercentage: Math.round(
          auditResults.reduce((sum, r) => sum + r.metrics.faIconPercentage, 0) / auditResults.length
        ),
        totalSVGs: auditResults.reduce((sum, r) => sum + r.metrics.svgCount, 0),
        totalFAIcons: auditResults.reduce((sum, r) => sum + r.metrics.faIconCount, 0),
        totalConsoleErrors: auditResults.reduce((sum, r) => sum + r.metrics.consoleErrors, 0),
        avgLoadTime: Math.round(
          auditResults.reduce((sum, r) => sum + r.metrics.loadTime, 0) / auditResults.length
        )
      }
    };
    
    fs.writeFileSync(auditReportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📊 AUDIT SUMMARY`);
    console.log(`${'='.repeat(80)}`);
    console.log(`✅ Passed: ${report.passed}/${report.totalPages}`);
    console.log(`❌ Failed: ${report.failed}/${report.totalPages}`);
    console.log(`\n📈 Site-Wide Metrics:`);
    console.log(`   - Avg FA-Icon Coverage: ${report.summary.avgFaIconPercentage}%`);
    console.log(`   - Total FA-Icons: ${report.summary.totalFAIcons}`);
    console.log(`   - Total SVGs: ${report.summary.totalSVGs}`);
    console.log(`   - Total Console Errors: ${report.summary.totalConsoleErrors}`);
    console.log(`   - Avg Load Time: ${report.summary.avgLoadTime}ms`);
    console.log(`\n📄 Report saved: ${auditReportPath}`);
    console.log(`${'='.repeat(80)}\n`);
  });
});

test.describe('🎨 Design System Consistency Check', () => {
  test('Check global FontAwesome usage in Nav & Footer', async ({ page }) => {
    await page.goto('/');
    
    const navSVGs = await page.locator('nav svg').count();
    const footerSVGs = await page.locator('footer svg').count();
    
    expect(navSVGs, 'Nav sollte keine SVGs mehr haben (alle FA-Icons)').toBe(0);
    expect(footerSVGs, 'Footer sollte keine SVGs mehr haben (alle FA-Icons)').toBe(0);
    
    const navFAIcons = await page.locator('nav i[class*="fa-"]').count();
    const footerFAIcons = await page.locator('footer i[class*="fa-"]').count();
    
    console.log(`✅ Nav: ${navFAIcons} FA-Icons, ${navSVGs} SVGs`);
    console.log(`✅ Footer: ${footerFAIcons} FA-Icons, ${footerSVGs} SVGs`);
    
    expect(navFAIcons, 'Nav sollte FA-Icons verwenden').toBeGreaterThan(0);
    expect(footerFAIcons, 'Footer sollte FA-Icons verwenden').toBeGreaterThan(0);
  });
  
  test('Check gradient text pattern consistency', async ({ page }) => {
    const testPages = ['/', '/silvacore/', '/ecodrive/', '/socialverse/'];
    
    for (const url of testPages) {
      await page.goto(url);
      const gradients = await page.locator('[class*="bg-clip-text"][class*="bg-gradient"]').count();
      console.log(`ℹ️  ${url}: ${gradients} Gradient-Text-Elemente`);
      expect(gradients, `${url} sollte Gradient-Text verwenden`).toBeGreaterThan(0);
    }
  });
  
  test('Check GSAP animation classes', async ({ page }) => {
    await page.goto('/');
    
    const gsapElements = await page.locator('[class*="gsap-fadein"]').count();
    console.log(`ℹ️  Homepage: ${gsapElements} GSAP-animierte Elemente`);
    expect(gsapElements, 'Homepage sollte GSAP-Animationen haben').toBeGreaterThan(0);
  });
});
