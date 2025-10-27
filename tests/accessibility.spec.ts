import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Barrierefreiheit (A11y) Tests', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('Homepage (index)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    console.log('\n📊 HOMEPAGE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Help: ${violation.helpUrl}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
        violation.nodes.slice(0, 3).forEach(node => {
          console.log(`   - ${node.html.substring(0, 80)}...`);
        });
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Silvacore Pricing', async ({ page }) => {
    await page.goto('/silvacore');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 SILVACORE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Socialverse Pricing', async ({ page }) => {
    await page.goto('/socialverse');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 SOCIALVERSE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Service Pricing', async ({ page }) => {
    await page.goto('/services/entwicklung');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 SERVICE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Ecodrive', async ({ page }) => {
    await page.goto('/ecodrive');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 ECODRIVE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Ausgabeschein Generator', async ({ page }) => {
    await page.goto('/ausgabeschein-generator');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 AUSGABESCHEIN GENERATOR:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Astro AI llms.txt Generator', async ({ page }) => {
    await page.goto('/astro-ai-llms-txt');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 ASTRO AI LLMS.TXT:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('DevSecOps Service', async ({ page }) => {
    await page.goto('/services/devsecops');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 DEVSECOPS:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Design Service', async ({ page }) => {
    await page.goto('/services/design');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 DESIGN:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('IT-Service', async ({ page }) => {
    await page.goto('/services/it-service');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 IT-SERVICE:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Smarthome Service', async ({ page }) => {
    await page.goto('/services/smarthome');
    await page.waitForLoadState('networkidle');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    console.log('\n📊 SMARTHOME:');
    console.log(`  ✅ Passed: ${accessibilityScanResults.passes.length}`);
    console.log(`  ⚠️  Violations: ${accessibilityScanResults.violations.length}`);
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n🚨 VIOLATIONS:');
      accessibilityScanResults.violations.forEach((violation, i) => {
        console.log(`\n${i + 1}. ${violation.id} (${violation.impact})`);
        console.log(`   ${violation.description}`);
        console.log(`   Affected: ${violation.nodes.length} element(s)`);
      });
    }
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
