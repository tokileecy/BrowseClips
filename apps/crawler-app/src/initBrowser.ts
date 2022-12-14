import playwright from 'playwright';

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

const initBrowser = async () => {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
    proxy: proxyConfig,
  });

  const context = await browser.newContext();

  return {
    browser,
    context,
  };
};

export default initBrowser;
