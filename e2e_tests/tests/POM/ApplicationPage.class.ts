import { Locator, Page } from "@playwright/test";
import path from "path";

export class ApplicationPagePOM {
  readonly page: Page;
  answerOtherField: boolean;

  constructor(page: Page) {
    this.page = page;
    this.answerOtherField = true;
  }

  // Actions

  navigate = async () => {
    await this.page.locator("text=Available Programs").click();
    await this.page.locator("text=Apply").first().click();
  };

  startAnApplication = async () => {
    await this.clickActionButton("Start");
  };

  goToNextFormPage = async () => {
    await this.clickActionButton("Next");
  };

  submitApplicationForm = async () => {
    await this.clickActionButton("Submit");
  };

  clickActionButton = async (text: string) => {
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.page.locator(`text=${text}`).click(),
    ]);
  };

  unFocusElement = async (element: Locator) => {
    return element.evaluate((e) => e.blur());
  };

  toggleAnswerOther = () => {
    this.answerOtherField = !this.answerOtherField;
  };

  answerQuestion = async (question: Locator) => {
    const type = await question.getAttribute("data-question-type");
    switch (type) {
      case "OPTION_SELECT_SEARCH":
        await this.answerOptionSelectSearch(question);
        break;
      case "MULTIPLE_CHOICE":
        await this.answerMultipleChoice(question);
        break;
      case "SINGLE_CHOICE":
        await this.answerSingleChoice(question);
        break;
      case "SINGLE_CHOICE_RATING":
        await this.answerSingleChoiceRating(question);
        break;
      case "TEXT_SHORT":
        await this.answerTextShort(question);
        break;
      case "TEXT_LONG":
        await this.answerTextLong(question);
        break;
      case "NUMBER":
        await this.answerNumber(question);
        break;
      case "DECIMAL":
        await this.answerDecimal(question);
        break;
      case "DATE":
        await this.answerDate(question);
        break;
      case "FILE":
        await this.answerFile(question);
        break;
      case "TIMESLOT":
        await this.answerTimeslot();
        break;
      case "IFRAME":
        await this.answerIframe();
        break;
    }
  };

  answerOptionSelectSearch = async (question: Locator) => {
    await question.locator(`form`).click();
    const options = question.locator("role=option");
    const selectedOption = Math.floor(
      Math.random() * ((await options.count()) - 1)
    );
    await options.nth(selectedOption).click();
  };

  answerMultipleChoice = async (question: Locator) => {
    const options = question.locator("label");
    const optionsCount = await options.count();

    const selectedOption = Math.floor(Math.random() * (optionsCount - 1));

    await options.nth(selectedOption).click();

    const checkboxes = question.locator("css=[data-other-option]");
    const isOtherAvailable = await checkboxes.getAttribute("data-other-option");

    if (this.answerOtherField && isOtherAvailable === "true") {
      await options.nth(optionsCount - 1).click();
      await question.locator('input[type="text"]').fill("Other text");
      await this.unFocusElement(checkboxes);
      this.toggleAnswerOther();
    }
  };

  answerSingleChoice = async (question: Locator) => {
    const options = question.locator("label");
    const selectedOption = Math.floor(
      Math.random() * ((await options.count()) - 1)
    );
    await options.nth(selectedOption).click();
  };

  answerSingleChoiceRating = async (question: Locator) => {
    const ratings = question.locator("label");
    const selectedRating = Math.floor(
      Math.random() * ((await ratings.count()) - 1)
    );
    await ratings.nth(selectedRating).click();
  };

  answerTextShort = async (question: Locator) => {
    const inputField = question.locator("input");
    await inputField.fill("Random text");
    await this.unFocusElement(inputField);
  };

  answerTextLong = async (question: Locator) => {
    const inputField = question.locator("textarea");
    const answer = "a".repeat(100);
    await inputField.fill(answer);
    await this.unFocusElement(inputField);
  };

  answerNumber = async (question: Locator) => {
    const input = question.locator("input");
    const numberMax = await input.getAttribute("data-number-max");
    const numberMin = await input.getAttribute("data-number-min");

    if (numberMax) {
      await input.fill(numberMax);
    } else if (numberMin) {
      await input.fill(numberMin);
    } else {
      await input.fill("3");
    }

    await this.unFocusElement(input);
  };

  answerDecimal = async (question: Locator) => {
    const input = question.locator("input");
    await input.fill("3.5");
    await this.unFocusElement(input);
  };

  answerDate = async (question: Locator) => {
    const inputDate = question.locator("input");
    await inputDate.fill("1997-07-11");
    await this.unFocusElement(inputDate);
  };

  answerFile = async (question: Locator) => {
    await question
      .locator("input")
      .setInputFiles(path.join(__dirname, "../mocks/dummy.pdf"));
  };

  answerTimeslot = async () => {
    // TODO: Implement answering timeslot logic #FEL-116
  };

  answerIframe = async () => {
    // TODO: Implement answering IFrame logic #FEL-116
  };

  // Getters

  get isLastPage(): Promise<boolean> {
    return this.page.locator("text=Submit").isVisible();
  }

  get pageQuestions(): Locator {
    return this.page.locator("css=[data-question-type]");
  }

  get applicationCurrentStatus(): Locator {
    return this.page.locator("css=[data-current-status]");
  }
}
