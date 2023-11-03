import { Page, Locator } from "@playwright/test";
import * as path from "path";
import { submissionsMock } from "../mocks/submissions";

export class SubmissionsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  navigate = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.locator("role=navigation >> text='Submissions'").click(),
    ]);
  };

  fillLinkModal = async (submitBtn: Locator) => {
    await submitBtn.click();
    await this.page
      .locator("role=textbox >> visible=true")
      .fill(submissionsMock.link);
  };

  fillTextModal = async (submitBtn: Locator) => {
    await submitBtn.click();
    await this.page
      .locator("role=textbox >> visible=true")
      .fill(submissionsMock.text);
  };

  uploadFileModal = async (submitBtn: Locator) => {
    await submitBtn.click();
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.page.locator("role=button", { hasText: "Browse" }).click(),
    ]);
    await fileChooser.setFiles(path.join(__dirname, "../mocks/dummy.pdf"));
  };

  clickTestLink = async (): Promise<[Page, void]> => {
    return Promise.all([
      this.page.context().waitForEvent("page"),
      this.testLinkButton.click(),
    ]);
  };

  getSubmissionTitle = async (header: Locator): Promise<string> => {
    return header.locator("role=paragraph").last().innerText();
  };

  getStatusByTitle = async (title: string): Promise<string> => {
    const submissionHeader = this.page.locator("[data-sub-type]", {
      hasText: title,
    });
    return submissionHeader.locator("role=paragraph").first().innerText();
  };

  submitModal = (): Promise<void> => {
    return this.submitButton.click();
  };

  waitForData = (button: Locator): Promise<void> => {
    return button.waitFor({ state: "detached" });
  };

  // Getters

  get firstTextSubmitButton(): Locator {
    return this.page.locator('[data-sub-type="text"] >> role=button').first();
  }

  get firstTextHeader(): Locator {
    return this.page
      .locator('[data-sub-type="text"]', {
        has: this.page.locator("role=button", { hasText: /upload/i }),
      })
      .first();
  }

  get firstLinkSubmitButton(): Locator {
    return this.page.locator('[data-sub-type="link"] >> role=button').first();
  }

  get firstLinkHeader(): Locator {
    return this.page
      .locator('[data-sub-type="link"]', {
        has: this.page.locator("role=button", { hasText: /add link/i }),
      })
      .first();
  }

  get firstFileSubmitButton(): Locator {
    return this.page.locator('[data-sub-type="File"] >> role=button').first();
  }

  get firstFileHeader(): Locator {
    return this.page
      .locator('[data-sub-type="File"]', {
        has: this.page.locator("role=button", { hasText: /upload/i }),
      })
      .first();
  }

  get closeModalButton(): Locator {
    return this.page.locator("role=dialog >> role=button", {
      hasText: "Close",
    });
  }

  get testLinkButton(): Locator {
    return this.page.locator("role=button", { hasText: /test link/i });
  }

  get submitButton(): Locator {
    return this.page.locator("role=dialog >> role=button", {
      hasText: "Submit",
    });
  }
}
