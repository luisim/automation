import { test, expect } from "@playwright/test";
import { TRAINING_CLIENT_LOCAL } from "./constants";

test("Logout", async ({ page }) => {
  await page.goto(TRAINING_CLIENT_LOCAL);

  await page.locator("a", { hasText: "log out" }).first().click();

  await expect(page).toHaveURL(/login/);
});
