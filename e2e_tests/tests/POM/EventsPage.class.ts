import { Page } from "@playwright/test";
import { TRAINING_CLIENT_LOCAL } from "./../constants";

export class EventsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  navigate = async () => {
    await this.page.goto(`${TRAINING_CLIENT_LOCAL}/my-programs`);
  };

  enterFirstEvent = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.locator("button", { hasText: "Enter" }).first().click(),
    ]);
  };
}
