import { test, Page, chromium, Locator } from "@playwright/test";

const loginPageElements = new Map<string, Locator>();

export async function loginPage(page: Page) {
  await page.goto("https://www.saucedemo.com/");
  const userName = page.locator("#user-name");
  const passWord = page.locator("#password");
  const submitButton = page.locator("#login-button");
  const menuClick = page.locator("#react-burger-menu-btn");
  const logout = page.locator("#logout_sidebar_link");

  loginPageElements.set("userName", userName);
  loginPageElements.set("passWord", passWord);
  loginPageElements.set("submitButton", submitButton);
  loginPageElements.set("menuClick", menuClick);
  loginPageElements.set("logout", logout);

  return loginPageElements;
}
