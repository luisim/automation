import { Page, Locator } from "@playwright/test";
import { formData } from "../mocks/formData";
export class SignupPagePOM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  navigate = async () => {
    await this.page.locator("text=Sign Up").click();
  };

  completeForm = async () => {
    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
    await this.email.fill(formData.email);
    await this.emailConfirmation.fill(formData.email);
    await this.password.fill(formData.password);
    await this.passwordConfirmation.fill(formData.password);
  };

  sendSignUpForm = async () => {
    await this.page.locator("button", { hasText: "Sign up" }).first().click();
  };

  // Getters

  get firstName(): Locator {
    return this.page.locator('[name="first_name"]');
  }

  get lastName(): Locator {
    return this.page.locator('[name="last_name"]');
  }

  get email(): Locator {
    return this.page.locator('[name="email"]');
  }

  get emailConfirmation(): Locator {
    return this.page.locator('[name="confirmEmail"]');
  }

  get password(): Locator {
    return this.page.locator('[name="password"]');
  }

  get passwordConfirmation(): Locator {
    return this.page.locator('[name="confirmPassword"]');
  }

  get successMessage(): Locator {
    return this.page.locator("text=Success!");
  }

  get firstNameErrorMessage(): Locator {
    return this.page.locator("text=First name is required");
  }
}
