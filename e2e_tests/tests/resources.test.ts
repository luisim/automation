import { test, expect, Page } from "@playwright/test";
import { ResourcesPage } from "./POM/ResourcesPage.class";
import { EventsPage } from "./POM/EventsPage.class";

test.describe("Resources page", () => {
  let page: Page;
  let resourcesPage: ResourcesPage;
  let eventsPage: EventsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    resourcesPage = new ResourcesPage(page);
    eventsPage = new EventsPage(page);

    await eventsPage.navigate();
    await eventsPage.enterFirstEvent();
  });

  test("User can view and click resources links", async () => {
    await resourcesPage.navigate();
    const heading = resourcesPage.heading;

    await expect(page).toHaveURL(/resources/);
    await expect(heading).toHaveText("Resources");

    const quickLinksHeading = resourcesPage.quickLinksHeading;
    await expect(quickLinksHeading).toBeVisible();

    const resourceLink = resourcesPage.firstResourceLink;
    const [newTabResource] = await Promise.all([
      page.context().waitForEvent("page"),
      resourceLink.click(),
    ]);

    const slackLink = resourcesPage.slackLink;
    const [newTabSlack] = await Promise.all([
      page.context().waitForEvent("page"),
      slackLink.click(),
    ]);

    const discordLink = resourcesPage.discordLink;
    const [newTabDiscord] = await Promise.all([
      page.context().waitForEvent("page"),
      discordLink.click(),
    ]);

    const zoomLink = resourcesPage.zoomLink;
    const [newTabZoom] = await Promise.all([
      page.context().waitForEvent("page"),
      zoomLink.click(),
    ]);

    expect(newTabResource).toBeDefined();
    expect(newTabSlack).toBeDefined();
    expect(newTabDiscord).toBeDefined();
    expect(newTabZoom).toBeDefined();
  });
});
