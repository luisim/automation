import { test, expect, Page } from "@playwright/test";
import { OfficeHoursPage } from "./POM/OfficeHoursPage.class";
import { EventsPage } from "./POM/EventsPage.class";
import { LDClientClass } from '../LDClientClass'

test.describe("Office hours page", () => {
  let page: Page;
  let officeHoursPage: OfficeHoursPage;
  let eventsPage: EventsPage;
  let LDClientInstance: LDClientClass;
  
  test.beforeAll(async ({ browser }) => {
    LDClientInstance = new LDClientClass()
    await LDClientInstance.initialize()
    
    page = await browser.newPage();
    officeHoursPage = new OfficeHoursPage(page);
    eventsPage = new EventsPage(page);

    await eventsPage.navigate();
    await eventsPage.enterFirstEvent();
  });

  test("User can view and click office hours links", async () => {

    test.skip(LDClientInstance.flags['help-bar-support-feature'],"Office hour page is going to be deprecated once we have the help bar feature")

    await officeHoursPage.navigate();
    const heading = officeHoursPage.heading;

    await expect(page).toHaveURL(/office-hours/);
    await expect(heading).toHaveText("Office Hours");

    const taCalendarLink = officeHoursPage.firstLink;

    const [newTabCalendarPage] = await Promise.all([
      page.context().waitForEvent("page"),
      taCalendarLink.click(),
    ]);

    expect(newTabCalendarPage).toBeDefined();
  });
});
