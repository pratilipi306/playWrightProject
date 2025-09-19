import { test, expect, Page, chromium, Locator } from "@playwright/test";
import { loginPage } from "../pageUtils/loginPage";
import { excelRead } from "../commonUtils/excelRead";

const testDataPath: string = "./testBed/TestData.xlsx";
interface LoginData {
  UserName: string;
  Password: string;
}

test("Valdiate the user is able to login sucessfully for all the users given in test data sheet", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const testData = excelRead(testDataPath, "Login");

  for (const row of testData) {
    const page = await context.newPage();

    const loginPageElements = await loginPage(page);
    const userName = loginPageElements.get("userName");
    const passWord = loginPageElements.get("passWord");
    const submitButton = loginPageElements.get("submitButton");

    const usernameData = row["UserName"];
    const passWordData = row["Password"];

    await userName?.fill(usernameData);
    await passWord?.fill(passWordData);
    await submitButton?.click();
    const headerLabelActual = await page.getByText("Swag Labs").textContent();
    expect(headerLabelActual).toContain("Swag Labs");
    await page.close();
  }
});

test("Valdiate the user is able to logout when logged  sucessfully for all the users given in test data sheet.", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  const testData = excelRead(testDataPath, "Login");

  for (const row of testData) {
    const page = await context.newPage();

    const loginPageElements = await loginPage(page);

    const userName = loginPageElements.get("userName");
    const passWord = loginPageElements.get("passWord");
    const submitButton = loginPageElements.get("submitButton");
    const menuClick = loginPageElements.get("menuClick");
    const logout = loginPageElements.get("logout");

    const usernameData = row["UserName"];
    const passWordData = row["Password"];

    await userName?.fill(usernameData);
    await passWord?.fill(passWordData);
    await submitButton?.click();
    await menuClick?.click();
    await logout?.click();
    const logoutNav = await page.locator(".login_logo").isEnabled();
    expect(logoutNav).toBeTruthy();
    await page.close();
  }
});
