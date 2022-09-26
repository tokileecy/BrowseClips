import { Page } from 'playwright';

export default async function getVideoDatas(page: Page, id: string) {
  console.log(` channel videos crawl starting.`);

  await page.goto(`https://www.youtube.com/watch?v=${id}`);

  await page.waitForTimeout(1000);

  // const ytdAppLocator = page.locator('ytd-app');

  // const jsonLD = await ytdAppLocator.evaluate((node) => {
  //   return JSON.parse(
  //     node.querySelector('script[type="application/ld+json"]').textContent,
  //   );
  // });

  const countLocator = page.locator('ytd-video-view-count-renderer');

  const count = await countLocator.evaluate((node) => {
    return node.querySelector('.view-count').textContent.split(' ')[0];
  });

  await page.close();
  console.log(`channel videos crawl finished`);
  return {
    id,
    count,
  };
}
