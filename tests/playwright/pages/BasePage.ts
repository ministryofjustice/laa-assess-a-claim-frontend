import type { Locator, Page } from "@playwright/test";

/**
 * Base page with shared navigation + utilities
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly url: string;
  protected readonly headingSize: string;

  /**
   * Constructs the page object
   * @param {Page} page The Playwright page instance
   * @param {string} route Page route
   * @param {string} headingSize Heading size
   */
  constructor(page: Page, route: string, headingSize: string) {
    this.page = page;
    this.url = `http://localhost:3001/${route}`;
    this.headingSize = headingSize;
  }

  /**
   * Navigate to a relative path
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Wait for page to finish loading
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Gets the main heading element
   * @returns {Locator} The main heading locator
   */
  get heading(): Locator {
    return this.page.locator(`h1.govuk-heading-${this.headingSize}`);
  }
}