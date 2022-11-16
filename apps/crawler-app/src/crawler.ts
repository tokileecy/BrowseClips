import dotenv from 'dotenv';
import playwright from 'playwright';

dotenv.config();

const HTTP_PROXY_URL = process.env.HTTP_PROXY_URL;
const HTTP_PROXY_USERNAME = process.env.HTTP_PROXY_USERNAME;
const HTTP_PROXY_PASSWORD = process.env.HTTP_PROXY_PASSWORD;

const proxyConfig =
  HTTP_PROXY_URL !== ''
    ? {
        server: HTTP_PROXY_URL,
        username: HTTP_PROXY_USERNAME,
        password: HTTP_PROXY_PASSWORD,
      }
    : undefined;

export let isInit = false;
export let browser: playwright.Browser | null = null;
export let context: playwright.BrowserContext | null = null;

const init = async () => {
  browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
    proxy: proxyConfig,
  });

  context = await browser.newContext();

  isInit = true;
};

init();
