import dotenv from 'dotenv';
import playwright from 'playwright';
import path from 'path';

dotenv.config();

const statePath = path.resolve(__dirname, './tmp/state.json');

export async function login() {
  const browser = await playwright.firefox.launch({
    headless: false, // setting this to true will not run the UI
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  // const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');
  await page.waitForTimeout(1000); // wait for 5 seconds
  await page.locator('//*[@id="buttons"]/ytd-button-renderer/a').click();
  await page.waitForTimeout(1000); // wait for 5 seconds
  await page.locator('//*[@id="identifierId"]').fill(process.env.USER_EMAIL);
  await page.locator('//*[@id="identifierNext"]/div/button/div[3]').click();
  await page
    .locator('//*[@id="password"]/div[1]/div/div[1]/input')
    .fill(process.env.PASSWORD);
  await context.storageState({ path: statePath });
  await page.locator('//*[@id="passwordNext"]/div/button').click();
  return {
    browser,
    context,
    page,
  };
}
