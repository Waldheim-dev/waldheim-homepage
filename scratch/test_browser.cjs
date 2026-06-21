const { chromium } = require('@playwright/test');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR] ${err.toString()}`);
  });

  console.log('Navigating to http://localhost:4322/ ...');
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });

  console.log('Page loaded. Checking ROI Calculator...');
  const teamValBefore = await page.textContent('#val-team-size');
  console.log('Team size display before interaction:', teamValBefore?.trim());

  // Click the AI power toggle
  console.log('Locating and clicking the AI power toggle...');
  const toggle = page.locator('#toggle-ai-power');
  console.log('Checkbox isChecked before click:', await toggle.isChecked());
  
  // We click the label wrapping the input
  await page.click('label:has(#toggle-ai-power)');
  
  // Wait a bit for the transition / update
  await page.waitForTimeout(500);

  console.log('Checkbox isChecked after click:', await toggle.isChecked());
  const teamValAfter = await page.textContent('#val-team-size');
  console.log('Team size display after click:', teamValAfter?.trim());

  const outSavingsBefore = await page.textContent('#out-savings');
  console.log('Savings display:', outSavingsBefore?.trim());

  // Let's change the team size slider
  console.log('Changing team size slider to 1...');
  await page.fill('#slider-team-size', '1');
  await page.dispatchEvent('#slider-team-size', 'input');
  await page.waitForTimeout(500);
  
  const teamValFinal = await page.textContent('#val-team-size');
  console.log('Team size display after slider change:', teamValFinal?.trim());
  const outSavingsFinal = await page.textContent('#out-savings');
  console.log('Savings display after slider change:', outSavingsFinal?.trim());

  await browser.close();
  console.log('Done.');
})();
