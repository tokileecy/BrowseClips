import * as path from 'path';
import { appendFileSync } from 'fs';
import { CrawledVideoData } from '../types';
import getVideoData from '../utils/getVideoData';
import { BrowserContext } from 'playwright';

const crawVideos = async (context: BrowserContext, videoIds: string[]) => {
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
  }
};

export default crawVideos;
