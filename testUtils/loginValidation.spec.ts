import { test, expect, Page, chromium, Locator } from '@playwright/test';
import { loginPage } from '../pageUtils/loginPage'
import { excelRead } from '../commonUtils/excelRead'

const testDataPath: string = "./testBed/TestData.xlsx";
interface LoginData {
  UserName: string;
  Password: string;
}

test("Valdiate the user is able to login and logout ", async ({ }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPageElements = await loginPage(page);
  const userName = loginPageElements.get("userName");
  const passWord = loginPageElements.get("passWord");
  const submitButton = loginPageElements.get("submitButton");
  const menuClick = loginPageElements.get("menuClick");
  const logout = loginPageElements.get("logout");

  const testData = excelRead(testDataPath, "Login") as LoginData[];

  for (const row of testData) {
    const usernameData = row["UserName"];
    const passWordData = row["Password"];
    const urlAssertValue = row["homePageLink "]
    await userName?.fill(usernameData);
    await passWord?.fill(passWordData);
    await submitButton?.click();
    const homePageLink = await page.url();
    expect(homePageLink).toEqual(urlAssertValue);
    await menuClick?.click();
    await logout?.click();
    const logoutPageLink = await page.url();
    expect(logoutPageLink).toEqual("https://www.saucedemo.com/");


  }

});