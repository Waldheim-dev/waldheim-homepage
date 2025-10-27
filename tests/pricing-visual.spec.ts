import { test, expect } from '@playwright/test';

test.describe('Pricing Pages Visual Check', () => {
  test.use({ 
    viewport: { width: 1920, height: 1080 }
  });

  test('Silvacore Pricing (Referenz)', async ({ page }) => {
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await page.goto('/silvacore');
    await page.waitForLoadState('networkidle');
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();
    await pricing.screenshot({ path: '/tmp/silvacore-pricing.png' });
    console.log('✅ Silvacore Pricing Screenshot gespeichert');
  });

  test('Socialverse Pricing', async ({ page }) => {
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await page.goto('/socialverse');
    await page.waitForLoadState('networkidle');
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();
    await pricing.screenshot({ path: '/tmp/socialverse-pricing.png' });
    console.log('✅ Socialverse Pricing Screenshot gespeichert');
  });

  test('Service Pricing', async ({ page }) => {
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; }' });
    await page.goto('/services/entwicklung');
    await page.waitForLoadState('networkidle');
    const pricing = page.locator('section').first();
    await pricing.scrollIntoViewIfNeeded();
    await pricing.screenshot({ path: '/tmp/service-pricing.png' });
    console.log('✅ Service Pricing Screenshot gespeichert');
  });
});
