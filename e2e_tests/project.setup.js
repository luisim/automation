const fs = require("fs");
const {expect} = require('@playwright/test')
const {
  TRAINING_CLIENT_LOCAL,
  TRAINING_CLIENT_USER,
  TRAINING_CLIENT_PASSWORD
} = require("./tests/constants");
const { chromium } = require("@playwright/test");
const { LoginPage } = require("./tests/POM/LoginPage.class");

module.exports = async () => {
  const dir = "./states";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.awaitAuth0Form();
  await loginPage.emailInput.click();
  await loginPage.fillInput(loginPage.emailInput, TRAINING_CLIENT_USER);
  await loginPage.passwordInput.click();
  await loginPage.fillInput(loginPage.passwordInput, TRAINING_CLIENT_PASSWORD);
  await loginPage.loginButton.click();
  await page.context().storageState({ path: `${dir}/state.json` });
  await browser.close();

  return () => fs.rmSync(dir, { recursive: true });
};
