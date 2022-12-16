import * as path from 'path';
import { appendFileSync } from 'fs';
import { CrawledVideoData } from '../types';
import getVideoData from '../utils/getVideoData';
import initBrowser from '../initBrowser';

const crawVideos = async (videoIds: string[]) => {
  const browser = await initBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const videoDataById: Record<string, CrawledVideoData> = {};

    for (let i = 0; i < videoIds.length; i++) {
      const id = videoIds[i];
      const videoData = await getVideoData(page, id);

      videoDataById[id] = videoData;
    }

    page.close();

    return videoDataById;
  } catch (error) {
    appendFileSync(
      path.resolve(__dirname, '../../tmp/crawVideosFailed'),
      new Error(error).message.toString(),
    );
    console.error(`crawVideosFailed`);
    return null;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
};

export default crawVideos;
