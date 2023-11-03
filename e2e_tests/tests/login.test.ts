import path from "path";
import { test, expect } from "@playwright/test";
import {
  TRAINING_CLIENT_LOCAL,
  TRAINING_CLIENT_USER,
  TRAINING_CLIENT_PASSWORD,
} from "./constants";
import { LoginPage } from "./POM/LoginPage.class";

test.use({
  storageState: path.join(__dirname, "userRoles/unauthedUser.json"),
});

test("Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.awaitAuth0Form();
  await loginPage.fillInput(loginPage.emailInput, TRAINING_CLIENT_USER);
  await loginPage.fillInput(loginPage.passwordInput, TRAINING_CLIENT_PASSWORD);
  await loginPage.loginButton.click();
  await expect(page).toHaveURL(`${TRAINING_CLIENT_LOCAL}/my-programs`);
});
