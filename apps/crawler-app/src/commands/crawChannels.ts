import * as path from 'path';
import { google } from 'googleapis';
import { appendFileSync } from 'fs';
import { Video } from '../types';
import getChannelDatas, {
  VideoAndStreamHashMap,
} from '../utils/getChannelDatas';
import { BrowserContext } from 'playwright';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const crawChannels = async (
  context: BrowserContext,
  channels: { id: string }[],
) => {
  try {
    console.log(`start crawing Videos with ${channels.length} channels.`);

    const channelIds = channels.map((channel) => channel.id);

    const channelDataById: Record<
      string,
      {
        id: string;
        videoDatas: VideoAndStreamHashMap;
        streamDatas: VideoAndStreamHashMap;
      }
    > = {};

    for (let i = 0; i < channelIds.length; i++) {
      channelDataById[channelIds[i]] = await getChannelDatas(
        context,
        channelIds[i],
      );
    }

    console.log('get videos by yt api');

    const service = google.youtube('v3');

    const vediosByChannelEntries = Object.entries(channelDataById);

    const videosByChannelId: Record<string, Video[]> = {};

    for (let i = 0; i < vediosByChannelEntries.length; i++) {
      const channelId = vediosByChannelEntries[i][0];

      const videosAndStreamsDataByVideoId = {
        ...vediosByChannelEntries[i][1].videoDatas,
        ...vediosByChannelEntries[i][1].streamDatas,
      };

      const videosAndStreamsIds = Object.values(
        videosAndStreamsDataByVideoId,
      ).map((d) => d.id);

      const videoAndStreamDatas = [];

      while (videosAndStreamsIds.length > 0) {
        const ids = videosAndStreamsIds.splice(0, 50);

        const res = await service.videos.list({
          auth: GOOGLE_API_KEY,
          part: [
            'id',
            'status',
            'contentDetails',
            'liveStreamingDetails',
            'snippet',
            'statistics',
          ],
          id: ids,
        });

        const videoAndStreamData = [
          ...res.data.items.map((item) => {
            return {
              id: item.id,
              liveState: videosAndStreamsDataByVideoId[item.id].liveState,
              channelId: item.snippet.channelId,
              title: item.snippet.title,
              description: item.snippet.description,
              publishedAt: item.snippet.publishedAt,
              thumbnails: item.snippet.thumbnails as any,
              tags: item.snippet.tags as string[],
              status: item.status as any,
              statistics: item.statistics as any,
              liveStreamingDetails: item.liveStreamingDetails as any,
              contentDetails: item.contentDetails as any,
              youtubeData: item,
            };
          }),
        ];

        videoAndStreamDatas.push(...videoAndStreamData);
      }

      videosByChannelId[channelId] = videoAndStreamDatas;
    }

    console.log('get videos by yt api -- fininshed');

    return videosByChannelId;
  } catch (error) {
    appendFileSync(
      path.resolve(__dirname, '../../tmp/addVideosFailed'),
      new Error(error).message.toString(),
    );
    console.error(`addVideos failed`);
    return null;
  }
};

export default crawChannels;
