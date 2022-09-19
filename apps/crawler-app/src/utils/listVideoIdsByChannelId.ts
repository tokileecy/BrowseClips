import playwright, { Page } from 'playwright';

const HTTP_PROXY_URL = process.env.HTTP_PROXY_URL;
const HTTP_PROXY_USERNAME = process.env.HTTP_PROXY_USERNAME;
const HTTP_PROXY_PASSWORD = process.env.HTTP_PROXY_PASSWORD;

const proxyConfig = {
  server: HTTP_PROXY_URL,
  username: HTTP_PROXY_USERNAME,
  password: HTTP_PROXY_PASSWORD,
};

const getVideos = async (page: Page, id: string) => {
  console.log(`${id} channel videos crawl starting.`);

  await page.goto(`https://www.youtube.com/channel/${id}/videos`);

  await page.waitForTimeout(1000);

  const vedios = page.locator('ytd-grid-video-renderer #thumbnail');

  await page.waitForTimeout(1000);

  const vedioLinks = await vedios.evaluateAll((list) =>
    list.map((vedio) => vedio.getAttribute('href')),
  );

  const vedioIds = vedioLinks.map((link) => link.replace('/watch?v=', ''));

  await page.close();
  console.log(`${id} channel videos crawl finished`);
  return vedioIds;
};

export async function listVideoIdsByChannelIds(ids: string[]) {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
    proxy: proxyConfig,
  });

  const context = await browser.newContext();
  const videosIdsByChannelId: Record<string, string[]> = {};

  while (ids.length > 0) {
    const currentIds = ids.splice(0, 5);

    await Promise.all(
      currentIds.map(
        (id) =>
          new Promise((resolve) => {
            const fetchVideoIds = async () => {
              const page = await context.newPage();

              try {
                const videoIds = await getVideos(page, id);

                videosIdsByChannelId[id] = videoIds;

                resolve(videoIds);
              } catch (error) {
                console.error(`get channel ${id} videos failed.`, error);
                resolve([]);
              }
            };

            fetchVideoIds();
          }),
      ),
    );
  }

  await browser.close();

  return videosIdsByChannelId;
}

export default async function listVideoIdsByChannelId(id: string) {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
    proxy: proxyConfig,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`goto ${id} channel page`);

  await page.goto(`https://www.youtube.com/channel/${id}/videos`);

  await page.waitForTimeout(1000);

  console.log('get vedios thumbnails');

  const vedios = page.locator('ytd-grid-video-renderer #thumbnail');

  await page.waitForTimeout(1000);
  console.log('get vedios links');

  const vedioLinks = await vedios.evaluateAll((list) =>
    list.map((vedio) => vedio.getAttribute('href')),
  );

  const vedioIds = vedioLinks.map((link) => link.replace('/watch?v=', ''));

  console.log('browser close');

  await browser.close();
  return vedioIds;
}
