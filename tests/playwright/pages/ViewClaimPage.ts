import type { Page, Locator } from '@playwright/test';
import { BasePage } from "#tests/playwright/pages/BasePage.js";

/**
 * Page object for the view claim page
 */
export class ViewClaimPage extends BasePage {

  /**
   * Creates a new view claim page object
   * @param {Page} page - The Playwright page instance
   * @param {number} id - the claim id
   */
  constructor(page: Page, id: number) {
    super(page, `claims/${id}`, 'xl');
  }

  /**
   * Gets the main heading element
   * @returns {Locator} The main heading locator
   */
  get heading(): Locator {
    return this.page.locator('h1.govuk-heading-xl');
  }

  /**
   * get the summary table
   * @returns {Locator} The summary table locator
   */
  get summaryTable(): Locator {
    return this.page.locator('.govuk-summary-list');
  }

  /**
   * get the primary button
   * @returns {Locator} The button locator
   */
  get primaryButton(): Locator {
    return this.page.locator('.govuk-button-group .govuk-button').first();
  }
}