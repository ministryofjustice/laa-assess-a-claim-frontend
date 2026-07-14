import { expect, test } from "../fixtures/index.js";
import { claim1Id } from "#tests/playwright/factories/handlers/api.js";

test('homepage should have the correct title', async ({ page }) => {
	// Navigate to the homepage
	await page.goto(`/claims/${claim1Id}`);

	// Check for the title of the application
	await expect(page).toHaveTitle('Fixed fee: Special Children Act (Care) – Assess claim for civil work – GOV.UK');
});

test('home page displays service name and table', async ({ pages, checkAccessibility }) => {
  const page = pages.viewClaimPage(claim1Id);
  await page.navigate();
  await page.waitForLoad();

  // Test the service name heading is present
  await expect(page.heading).toBeVisible();
  await expect(page.heading).toHaveText('Fixed fee: Special Children Act (Care)');

  const primaryBttn = page.primaryButton
  await expect(primaryBttn).toBeVisible();
  await expect(primaryBttn).toContainText('Make a decision');

  // Run accessibility check
  await checkAccessibility();
});
