import { Page } from 'playwright';

export default async function getChannelDatas(page: Page, id: string) {
  console.log(` channel videos crawl starting.`);

  await page.goto(`https://www.youtube.com/channel/${id}/videos?sort=dd`);

  await page.waitForTimeout(1000);

  const vedioLocator = page.locator('ytd-grid-video-renderer');

  const videoDatas = await vedioLocator.evaluateAll((list) =>
    list.map((node) => {
      const vedioLink = node.querySelector('#thumbnail').getAttribute('href');

      const vedioId = vedioLink.replace('/watch?v=', '');

      const timeStatusElement = node.querySelector(
        '#thumbnail ytd-thumbnail-overlay-time-status-renderer',
      );

      const title = node.querySelector('#details #video-title').textContent;

      const metadataLine = node.querySelector(
        '#details #metadata-line',
      ).textContent;

      return {
        id: vedioId,
        liveState: timeStatusElement.getAttribute('overlay-style'),
        title,
        metadataLine,
      };
    }),
  );

  await page.close();
  console.log(`channel videos crawl finished`);
  return {
    id,
    videoDatas,
  };
}
