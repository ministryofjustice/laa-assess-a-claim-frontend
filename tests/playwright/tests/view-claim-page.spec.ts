import { test, expect } from '../fixtures/index.js';

test('homepage should have the correct title', async ({ page }) => {
	// Navigate to the homepage
	await page.goto('/claims/1');

	// Check for the title of the application
	await expect(page).toHaveTitle(/Assess Claim for Civil Work – GOV.UK/);
});

test('home page displays service name and table', async ({ pages, checkAccessibility }) => {
  const page = pages.viewClaimPage(1);
  await page.navigate();
  await page.waitForLoad();
  
  // Test the service name heading is present
  await expect(page.heading).toBeVisible();
  const serviceName = await page.getServiceName();
  expect(serviceName).toBeTruthy();

  await expect(page.heading).toContainText('Fixed fee: Special Children Act (Care)')

  const primaryBttn = page.primaryButton
  await expect(primaryBttn).toBeVisible();
  await expect(primaryBttn).toContainText('Make a decision');
    
  // Run accessibility check
  await checkAccessibility();
});
