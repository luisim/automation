import { Page, Locator } from "@playwright/test";
import { TRAINING_CLIENT_LOCAL } from "../constantsTestCodio";

export class MyProgramsPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly googleSignInButton: Locator;
  readonly auth0Form: Locator;
  readonly EnterButton: Locator;
  readonly NextButton: Locator;
  readonly NextButton2: Locator;
  readonly SubButton: Locator;
  readonly UploadButton: Locator;
  readonly ClickTrue: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('//*[@id="1-email"]');
    this.passwordInput = this.page.locator('//*[@id="1-password"]');
    this.googleSignInButton = this.page.locator('//*[@id="auth0-lock-container-1"]/div/div[2]/form/div/div/div/div/div[2]/div[2]/span/div/div/div/div/div/div/div/div/div[2]/div[1]/div/a/div[2]');
    this.auth0Form = this.page.locator("#auth0-lock-container-1");
    this.EnterButton = this.page.locator('//*[@id="root"]/div/main/div/div/div/div/div[2]/div/div[2]/button');
    this.NextButton = this.page.locator('//*[@id="identifierNext"]/div/button/div[3]');
    this.NextButton2 = this.page.locator('//*[@id="1-submit"]');
    this.SubButton = this.page.locator('//*[@id="root"]/div[1]/div[1]/div/div/nav/div[1]/a[2]');
    this.UploadButton = this.page.locator('button.Button__StyledButton-sc-1gva32s-0.cjGZKo:has-text("Submit Through Workspace")');
    this.ClickTrue = this.page.locator('//*[@id="react_container"]/div/div[3]/div/div[4]/div[5]/div[2]/fieldset/div/div[1]/label/i');
    
  }

  // Actions
  navigate = async () => {
    await this.page.goto(TRAINING_CLIENT_LOCAL);
  };

  fillInput = async (inputLocator: Locator, text: string) => {
    await inputLocator.fill(text);
  };

  awaitAuth0Form = async () => {
    await this.auth0Form.waitFor({ state: "attached" });
  };
}
