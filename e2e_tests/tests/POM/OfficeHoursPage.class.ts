import { Page, Locator } from "@playwright/test";

export class OfficeHoursPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  navigate = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.locator("nav :text('Office Hours')").click(),
    ]);
  };

  // Getters

  get firstLink(): Locator {
    return this.page.locator('css=[data-test-id="calendar-link"]').first();
  }

  get heading(): Locator {
    return this.page.locator("role=heading").first();
  }
}
