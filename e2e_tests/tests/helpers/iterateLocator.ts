import { Locator } from "@playwright/test";

/**
 * Creates an iterable object for Locators to be able to loop through them
 * @param locator A locator that points to many elements
 */
async function* iterateLocator(locator: Locator): AsyncGenerator<Locator> {
  for (let index = 0; index < (await locator.count()); index++) {
    yield locator.nth(index);
  }
}

export { iterateLocator };
