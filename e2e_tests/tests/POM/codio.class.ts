import { Locator, Page } from "@playwright/test";
import path from "path";

export class CodeioPagePOM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visitCodio(){
    await this.page.goto("https://www.codio.com/")
    await this.page.locator('//a[contains(text(),"Sign In")]').first().click();
  }


  async loginToCodio(username: string, password: string){
    await this.page.locator("[name='user']").type(username);
    await this.page.waitForTimeout(3000)
    await this.page.locator("[type='password']").type(password)
  }

  async clickSignIn(){
    await this.page.locator('[type="submit"]').click()
  }

  async clickFellowTest(){
    await this.page.locator('//button[contains(text(),"Fellow Test Course")]').click()
  }

  async clickCssDayOneLessionOne(){
    await this.page.locator("//button[contains(text(),'Intro to CSS: Day 1 Lesson 1')]").click()
    await this.page.waitForTimeout(5000)
  }

  async clickWordpressDayOneLessionOne(){
    await this.page.locator("//button[contains(text(),'Introduction to Wordpress: Day 1 Lesson 1')]").click()
    await this.page.waitForTimeout(5000)
  }


  async clickUnmarkAsComplete(){
    await this.page.waitForTimeout(5000)
    console.log(await this.page.locator('text=Unmark As Complete').isVisible())
    await this.page.waitForSelector('text=Unmark As Complete')
    await this.page.locator('text=Unmark As Complete').click({force: true});
  }

  async enterRemovedStatus(){
    await this.page.waitForTimeout(5000)
    await this.page.locator('[name="confirmText"]').type("remove completed status");
    await this.page.locator('//button[contains(text(),"Ok")]').click()
  }

  async clickLogout(){
    await this.page.locator("//button[contains(text(),'Got it')]").click();
    await this.page.locator('[title="Logout"]').click()
    await this.page.locator("//button[contains(text(),'Yes')]").click()
  }

  async Grading(){
    await this.page.locator('[title="Open grading dialog"]').first().click()
    await this.page.locator("//button[contains(text(),'Edit')]").click()
    await this.page.fill(".gradingModal-input","87");
    await this.page.locator("//button[contains(text(),'Done')]").click()
    await this.page.locator("//button[contains(text(),'Close')]").click()
  }
}