import { Page, Locator } from "@playwright/test";

export class ResourcesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  navigate = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.locator("nav :text('Resources')").click(),
    ]);
  };

  // Getters

  get quickLinksHeading(): Locator {
    return this.page.locator("role=heading >> text=Quick Links");
  }

  get slackLink(): Locator {
    return this.page.locator("role=link >> :text('Slack')").first();
  }

  get discordLink(): Locator {
    return this.page.locator("role=link >> :text('Discord')").first();
  }

  get zoomLink(): Locator {
    return this.page.locator("role=link >> :text('Zoom')").first();
  }

  get firstResourceLink(): Locator {
    return this.page
      .locator('[aria-labelledby="accordion-button-0"] >> role=link')
      .first();
  }

  get heading(): Locator {
    return this.page.locator("role=heading").first();
  }
}
