import { test, expect, Page } from "@playwright/test";
import { EventsPage } from "./POM/EventsPage.class";
import { SubmissionsPage } from "./POM/SubmissionsPage.class";

test.describe("Submissions", () => {
  let page: Page;
  let submissionsPage: SubmissionsPage;
  let eventsPage: EventsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    eventsPage = new EventsPage(page);
    submissionsPage = new SubmissionsPage(page);

    await eventsPage.navigate();
    await eventsPage.enterFirstEvent();

    await submissionsPage.navigate();
  });

  test("User can make a link submission", async () => {
    const submitByButton = submissionsPage.firstLinkSubmitButton;
    const submissionHeader = submissionsPage.firstLinkHeader;
    const submissionTitle = await submissionsPage.getSubmissionTitle(
      submissionHeader
    );

    await submissionsPage.fillLinkModal(submitByButton);

    const [newTabTestLink] = await submissionsPage.clickTestLink();
    expect(newTabTestLink).toBeDefined();

    await submissionsPage.submitModal();
    await submissionsPage.waitForData(submitByButton);

    const submissionStatus = await submissionsPage.getStatusByTitle(
      submissionTitle
    );
    expect(submissionStatus).toBe("Submitted");
  });

  test("User can make a text submission", async () => {
    const submitByButton = submissionsPage.firstTextSubmitButton;
    const submissionHeader = submissionsPage.firstTextHeader;
    const submissionTitle = await submissionsPage.getSubmissionTitle(
      submissionHeader
    );

    await submissionsPage.fillTextModal(submitByButton);

    await submissionsPage.submitModal();

    await submissionsPage.waitForData(submitByButton);

    const submissionStatus = await submissionsPage.getStatusByTitle(
      submissionTitle
    );
    expect(submissionStatus).toBe("Submitted");
  });

  test("User can make a file submission", async () => {
    // Skipping this test in local as the file submission is not working locally
    // The issue https://correlation-one.atlassian.net/browse/FEL-964 tracks it,
    // Remove this lines when the issue gets resolved.
    if (process.env.SERVER_URL?.includes("localhost")) {
      console.warn(
        "Skipping file submission test in local because it isn't working"
      );

      return;
    }

    const submitByButton = submissionsPage.firstFileSubmitButton;
    const submissionHeader = submissionsPage.firstFileHeader;
    const submissionTitle = await submissionsPage.getSubmissionTitle(
      submissionHeader
    );

    await submissionsPage.uploadFileModal(submitByButton);

    await submissionsPage.submitModal();
    await submissionsPage.closeModalButton.waitFor({ state: "attached" });

    await submissionsPage.closeModalButton.click();
    await submissionsPage.waitForData(submitByButton);

    const submissionStatus = await submissionsPage.getStatusByTitle(
      submissionTitle
    );
    expect(submissionStatus).toBe("Submitted");
  });
});
