import path from "path";
import { test, expect } from "@playwright/test";
import { TRAINING_CLIENT_USER, TRAINING_CLIENT_PASSWORD } from "./constantsTestCodio";
import { MyProgramsPage } from "./POM/MyProgramsPage.class";
import {CodeioPagePOM} from "./POM/codio.class"

test.use({
  storageState: path.join(__dirname, "userRoles/unauthedUser.json"),
});


test("WORDPRESS DAY 1 LESSION 1", async ({ page, context }) => {
  const myProgramsPage = new MyProgramsPage(page);
  const codeioPagePOM = new CodeioPagePOM(page);
  await myProgramsPage.navigate();
  await myProgramsPage.awaitAuth0Form();
  await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
  await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
  await myProgramsPage.NextButton2.click();
  await myProgramsPage.EnterButton.click();
  await myProgramsPage.SubButton.click();
  await page.locator("(//button[@id='accordion-button-0'])[13]").click();
  const pagePromise = context.waitForEvent('page');
  await page.locator("(//button/div/span[contains(text(),'View submission')])[1]").click({force: true});
  
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  try {
    await newPage.waitForTimeout(15000);
    const iframeOne = await newPage.frameLocator('(//iframe)[1]')
    const markComplete = await iframeOne.locator('.codio-button-type-complete.plain')
    const enterYesField =  await newPage.locator('#confirmation-code');
    const clickOKOnMarkComplete = await newPage.locator('//button[contains(text(),"Ok")]')
    console.log(await markComplete.isVisible());
    if(await markComplete.isVisible() == false){
      await newPage.close()
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickWordpressDayOneLessionOne();
      await page.waitForTimeout(3000)
      await codeioPagePOM.clickUnmarkAsComplete()
      await codeioPagePOM.enterRemovedStatus();
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(3000)

      await context.clearCookies();
      await page.waitForTimeout(3000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-0'])[13]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'View submission')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(2000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());
    }else{
      await page.waitForTimeout(3000)
      await markComplete.click({force: true});
      await page.waitForTimeout(3000)
      await enterYesField.type("yes");
      await clickOKOnMarkComplete.click({force: true})
      await page.waitForTimeout(5000)
      await newPage.close() 
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickWordpressDayOneLessionOne();
      await page.waitForTimeout(5000)
      await codeioPagePOM.clickUnmarkAsComplete()
      await codeioPagePOM.enterRemovedStatus();
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(2000)
      await context.clearCookies();
      await page.waitForTimeout(5000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-0'])[13]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'View submission')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(15000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());
      
    }
  } catch (error) {
    throw new Error("unable to click"+ error)
  }


 



});

test("css DAY 1 LESSION 1", async ({ page, context }) => {
  const myProgramsPage = new MyProgramsPage(page);
  const codeioPagePOM = new CodeioPagePOM(page);
  await myProgramsPage.navigate();
  await myProgramsPage.awaitAuth0Form();
  await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
  await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
  await myProgramsPage.NextButton2.click();
  await myProgramsPage.EnterButton.click();
  await myProgramsPage.SubButton.click();
  await page.locator("(//button[@id='accordion-button-1'])[10]").click();
  const pagePromise = context.waitForEvent('page');
  await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  await newPage.waitForTimeout(3000);
  console.log(await newPage.title());
  try {
    await newPage.waitForTimeout(15000);
    const iframeOne = await newPage.frameLocator('(//iframe)[1]')
    const markComplete = await iframeOne.locator('.codio-button-type-complete.plain')
    const enterYesField =  await newPage.locator('#confirmation-code');
    const clickOKOnMarkComplete = await newPage.locator('//button[contains(text(),"Ok")]')
    console.log(await markComplete.isVisible());
    if(await markComplete.isVisible() == false){
      await newPage.close()
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickCssDayOneLessionOne();
      await page.waitForTimeout(3000)
      await codeioPagePOM.clickUnmarkAsComplete()
      await codeioPagePOM.enterRemovedStatus();
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(3000)

      await context.clearCookies();
      await page.waitForTimeout(3000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-1'])[10]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      await page.waitForTimeout(3000)
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(2000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());

    }else{
      await page.waitForTimeout(3000)
      await newPage.locator("//button[contains(text(),'Got it')]").click()
      await page.waitForTimeout(3000)
      await markComplete.click({force: true});
      await page.waitForTimeout(3000)
      await enterYesField.type("yes");
      await clickOKOnMarkComplete.click({force: true})
      await page.waitForTimeout(5000)
      await newPage.close() 
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickCssDayOneLessionOne();
      await page.waitForTimeout(5000)
      await codeioPagePOM.clickUnmarkAsComplete()
      await codeioPagePOM.enterRemovedStatus();
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(2000)
      await context.clearCookies();
      await page.waitForTimeout(5000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-1'])[10]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(15000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());
      
    }
  } catch (error) {
    throw new Error("unable to click"+ error)
  }


 



});

test("css DAY 1 LESSION 1 - grading", async ({ page, context }) => {
  const myProgramsPage = new MyProgramsPage(page);
  const codeioPagePOM = new CodeioPagePOM(page);
  await myProgramsPage.navigate();
  await myProgramsPage.awaitAuth0Form();
  await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
  await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
  await myProgramsPage.NextButton2.click();
  await myProgramsPage.EnterButton.click();
  await myProgramsPage.SubButton.click();
  await page.locator("(//button[@id='accordion-button-1'])[10]").click();
  const pagePromise = context.waitForEvent('page');
  await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  try {
    await newPage.waitForTimeout(15000);
    const iframeOne = await newPage.frameLocator('(//iframe)[1]')
    const markComplete = await iframeOne.locator('.codio-button-type-complete.plain')
    const enterYesField =  await newPage.locator('#confirmation-code');
    const clickOKOnMarkComplete = await newPage.locator('//button[contains(text(),"Ok")]')
    console.log(await markComplete.isVisible());
    if(await markComplete.isVisible() == false){
      await newPage.close()
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickCssDayOneLessionOne();
      await page.waitForTimeout(3000)
      await codeioPagePOM.Grading();
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(3000)

      await context.clearCookies();
      await page.waitForTimeout(3000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-1'])[10]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(2000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());
      const okBtn = await newPageTab.locator('//button[contains(text(),"ok")]');
      await okBtn.click();
      const grading = await iframeOne.locator(".studentFeedbackStatsHeader-statItem--grade");
      console.log(await grading.isVisible())

    }else{
      await page.waitForTimeout(5000)
      await newPage.locator("//button[contains(text(),'Got it')]").click()
      await page.waitForTimeout(3000)
      await markComplete.click({force: true});
      await page.waitForTimeout(3000)
      await enterYesField.type("yes");
      await clickOKOnMarkComplete.click({force: true})
      await page.waitForTimeout(5000)
      await newPage.close() 
      await page.locator('[href="/"]').click()
      await page.waitForNavigation()
      await page.waitForTimeout(10000)
      await context.clearCookies();
      await codeioPagePOM.visitCodio();
      await codeioPagePOM.loginToCodio("luis.escobar@correlation-one.com", "Tsuite360_")
      await codeioPagePOM.clickSignIn();
      await codeioPagePOM.clickFellowTest();
      await codeioPagePOM.clickCssDayOneLessionOne();
      await page.waitForTimeout(5000)
      await codeioPagePOM.Grading()
      await codeioPagePOM.clickLogout()
      await page.waitForTimeout(2000)
      await context.clearCookies();
      await page.waitForTimeout(5000)
      await myProgramsPage.navigate();
      await myProgramsPage.awaitAuth0Form();
      await myProgramsPage.fillInput(myProgramsPage.emailInput, TRAINING_CLIENT_USER);
      await myProgramsPage.fillInput(myProgramsPage.passwordInput, TRAINING_CLIENT_PASSWORD);
      await myProgramsPage.NextButton2.click();
      await myProgramsPage.EnterButton.click();
      await myProgramsPage.SubButton.click();
      await page.locator("(//button[@id='accordion-button-1'])[10]").click();
      const pagePromise = context.waitForEvent('page');
      await page.locator("(//button/div/span[contains(text(),'Open in Workspace')])[1]").click({force: true});
      const newPageTab = await pagePromise;
      await newPageTab.waitForLoadState();
      console.log(await newPageTab.title());
      await newPageTab.waitForTimeout(15000);
      const iframeOne = await newPageTab.frameLocator('(//iframe)[1]')
      const markCourseComplete = await iframeOne.locator('.codio-button-type-complete.plain')
      console.log(await markCourseComplete.isVisible());
      await newPageTab.waitForTimeout(5000);
      const okBtn = await newPageTab.locator('.btn.btn-primary');
      await newPageTab.waitForTimeout(3000);
      await okBtn.click({force: true});
      const grading = await iframeOne.locator(".studentFeedbackStatsHeader-statItem--grade");
      console.log(await grading.isVisible());
      
    }
  } catch (error) {
    throw new Error("unable to click"+ error)
  }


 



});
