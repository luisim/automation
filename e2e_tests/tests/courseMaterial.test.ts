import { test, expect } from "@playwright/test";
import { TRAINING_CLIENT_LOCAL } from "./constants";

test("View course materials", async ({ page }) => {
  await page.goto(`${TRAINING_CLIENT_LOCAL}/my-programs`);

  // Click text=Enter
  await page.locator("button", { hasText: "Enter" }).first().click();
  // Regex for url to have course-materials
  await expect(page).toHaveURL(/course-materials/);

  // Expand one accordion
  await page.locator("#accordion-button-0").first().click();

  // First accordion was expanded
  await expect(
    page.locator('[class*="AccordionContent"] >> nth=0')
  ).toBeVisible();

  // Click link to new page
  const [newTabResourcePage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator('[class*="AccordionContent"] a >> nth=0').click(),
  ]);

  // New page was opened
  expect(newTabResourcePage).toBeDefined();
});
