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

class BrowserState {
  browser: playwright.Browser;
  isInited: boolean;

  constructor() {
    this.isInited = false;
  }

  async init() {
    if (!this.isInited) {
      const newBrowser = await playwright.firefox.launch({
        headless: true, // setting this to true will not run the UI
        proxy: proxyConfig,
      });

      newBrowser.once('disconnected', async () => {
        this.browser = await playwright.firefox.launch({
          headless: true, // setting this to true will not run the UI
          proxy: proxyConfig,
        });
      });
      this.browser = newBrowser;
      this.isInited = true;
    }
  }
}

export default new BrowserState();
