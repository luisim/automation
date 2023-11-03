import { Page, Locator } from "@playwright/test";
import { TRAINING_CLIENT_LOCAL } from "../constants";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly auth0Form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('role=textbox[name="Email"]');
    this.passwordInput = this.page.locator('role=textbox[name="Password"]');
    this.loginButton = this.page.locator("role=button", { hasText: "Log In" });
    this.auth0Form = this.page.locator("#auth0-lock-container-1");
  }

  // Actions
  navigate = async () => {
    await this.page.goto(`${TRAINING_CLIENT_LOCAL}/login`);
  };

  fillInput = async (inputLocator: Locator, text: string) => {
    await inputLocator.fill(text);
  };

  awaitAuth0Form = async () => {
    await this.auth0Form.waitFor({ state: "attached" });
  };
}
