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

export default async function getChannelDatas(id: string) {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
    proxy: proxyConfig,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`channel ${id} videos crawl starting.`);

  await page.goto(`https://www.youtube.com/channel/${id}/videos?sort=dd`);

  await page.waitForTimeout(1000);

  const vedioLocator = page.locator('ytd-rich-item-renderer');

  const videoDatas = await vedioLocator.evaluateAll((list) =>
    list.map((node) => {
      const vedioLink = node.querySelector('#thumbnail').getAttribute('href');

      const vedioId = vedioLink.replace('/watch?v=', '');

      const timeStatusElement = node.querySelector(
        'ytd-thumbnail-overlay-time-status-renderer',
      );

      const title = node.querySelector('#details #video-title').textContent;

      const metadataLine = node.querySelector(
        '#details #metadata-line',
      ).textContent;

      return {
        id: vedioId,
        liveState: timeStatusElement?.getAttribute('overlay-style'),
        title,
        metadataLine,
      };
    }),
  );

  await page.goto(`https://www.youtube.com/channel/${id}/streams?sort=dd`);

  await page.waitForTimeout(1000);

  const streamLocator = page.locator('ytd-rich-item-renderer');

  const streamDatas = await streamLocator.evaluateAll((list) =>
    list.map((node) => {
      const streamLink = node.querySelector('#thumbnail').getAttribute('href');

      const streamId = streamLink.replace('/watch?v=', '');

      const timeStatusElement = node.querySelector(
        '#thumbnail ytd-thumbnail-overlay-time-status-renderer',
      );

      const title = node.querySelector('#details #video-title').textContent;

      const metadataLine = node.querySelector(
        '#details #metadata-line',
      ).textContent;

      return {
        id: streamId,
        liveState: timeStatusElement?.getAttribute('overlay-style'),
        title,
        metadataLine,
      };
    }),
  );

  await browser.close();

  console.log(`channel ${id} videos crawl finished`);
  return {
    id,
    videoDatas,
    streamDatas,
  };
}
