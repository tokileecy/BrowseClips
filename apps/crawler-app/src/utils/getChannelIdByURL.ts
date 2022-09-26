import { Page } from 'playwright';

export default async function getChannelIdByURL(page: Page, url: string) {
  console.log(`crawl starting.`);

  await page.goto(url);

  await page.waitForTimeout(1000);

  const bodyLocator = page.locator('body');

  const channelId = await bodyLocator.evaluate(
    (node) =>
      node.querySelector('[itemprop="channelId"]').attributes['content'].value,
  );

  await page.close();
  console.log(`crawl finished`);
  return channelId;
}
