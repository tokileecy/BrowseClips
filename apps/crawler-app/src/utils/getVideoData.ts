import { Page } from 'playwright';

export default async function getVideoData(page: Page, id: string) {
  await page.goto(`https://www.youtube.com/watch?v=${id}`);

  await page.waitForTimeout(1000);

  const countLocator = page.locator('ytd-video-view-count-renderer');

  const count = await countLocator.evaluate((node) => {
    return node.querySelector('.view-count').textContent.split(' ')[0];
  });

  const videoObjectLocator = page.locator(
    '[itemtype="http://schema.org/VideoObject"]',
  );

  const videoObject = await videoObjectLocator.evaluate((node: HTMLElement) => {
    const publicationElement = node.querySelector('[itemprop="publication"]');

    const isLiveBroadcastMeta =
      publicationElement.querySelector<HTMLMetaElement>(
        '[itemprop="isLiveBroadcast"]',
      );

    const startDateMeta = publicationElement.querySelector<HTMLMetaElement>(
      '[itemprop="startDate"]',
    );

    const endDateMeta = publicationElement.querySelector<HTMLMetaElement>(
      '[itemprop="endDate"]',
    );

    const channelIdMeta = node.querySelector<HTMLMetaElement>(
      '[itemprop="channelId"]',
    );

    const datePublishedMeta = node.querySelector<HTMLMetaElement>(
      '[itemprop="datePublished"]',
    );

    const uploadDateMeta = node.querySelector<HTMLMetaElement>(
      '[itemprop="uploadDate"]',
    );

    const genreMeta = node.querySelector<HTMLMetaElement>('[itemprop="genre"]');

    const nameMeta = node.querySelector<HTMLMetaElement>('[itemprop="name"]');

    const descriptionMeta = node.querySelector<HTMLMetaElement>(
      '[itemprop="description"]',
    );

    const interactionCountMeta = node.querySelector<HTMLMetaElement>(
      '[itemprop="interactionCount"]',
    );

    return {
      publication: {
        isLiveBroadcast: isLiveBroadcastMeta?.content,
        startDate: startDateMeta?.content,
        endDate: endDateMeta?.content,
      },
      channelId: channelIdMeta?.content,
      datePublished: datePublishedMeta?.content,
      uploadDate: uploadDateMeta.content,
      genre: genreMeta?.content,
      name: nameMeta?.content,
      description: descriptionMeta?.content,
      interactionCount: interactionCountMeta?.content,
    };
  });

  console.log(`channel videos crawl finished`);
  return {
    id,
    count,
    ...videoObject,
  };
}
