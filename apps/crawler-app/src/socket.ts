import dotenv from 'dotenv';
import { writeFileSync, appendFileSync } from 'fs';
import * as path from 'path';
import { io, Socket } from 'socket.io-client';
import getChannelDatas from './utils/getChannelDatas';
import { google } from 'googleapis';
import { Video } from './types';

dotenv.config();

let isCrawingChannels = false;
let retryCount = 0;

const PUBLIC_NEST_WS_URL = process.env.PUBLIC_NEST_WS_URL;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface ServerToClientEvents {
  crawChannels: (
    channels: any,
    cb: (channelDatas: Record<string, Video[]>) => void,
  ) => void;
  isIdle: (cb: (isIdle: boolean) => void) => void;
}

interface ClientToServerEvents {
  join: (roomName: string, callback: (res: any) => void) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(PUBLIC_NEST_WS_URL);

export const crawChannels = async (channels: { id: string }[]) => {
  try {
    console.log('start crawing Videos');

    const channelIds = channels.map((channel) => channel.id);

    const channelDataById: Record<
      string,
      {
        id: string;
        videoDatas: {
          id: string;
          liveState: string;
          title: string;
          metadataLine: string;
        }[];
        streamDatas: {
          id: string;
          liveState: string;
          title: string;
          metadataLine: string;
        }[];
      }
    > = {};

    for (let i = 0; i < channelIds.length; i++) {
      channelDataById[channelIds[i]] = await getChannelDatas(channelIds[i]);
    }

    console.log('get videos by yt api');

    const service = google.youtube('v3');

    const vediosByChannelEntries = Object.entries(channelDataById);

    const videosByChannelId: Record<string, Video[]> = {};

    for (let i = 0; i < vediosByChannelEntries.length; i++) {
      const channelId = vediosByChannelEntries[i][0];

      const videoIds = vediosByChannelEntries[i][1].videoDatas
        .map((d) => d.id)
        .concat(vediosByChannelEntries[i][1].streamDatas.map((d) => d.id));

      const videoDatas = [];

      while (videoIds.length > 0) {
        const ids = videoIds.splice(0, 50);

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

        videoDatas.push(
          ...res.data.items.map((item) => ({
            id: item.id,
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
          })),
        );
      }

      videosByChannelId[channelId] = videoDatas;
    }

    console.log('get videos by yt api -- fininshed');

    return videosByChannelId;
  } catch (error) {
    appendFileSync(
      path.resolve(__dirname, '../tmp/addVideosFailed'),
      new Error(error).message.toString(),
    );
    console.error(`addVideos failed`);
    return null;
  }
};

socket.on('connect', function () {
  console.log('Connected');

  socket.emit('join', 'crawler', (res) => {
    console.log(res);
  });

  socket.on('crawChannels', async (channels, cb) => {
    isCrawingChannels = true;

    const channelDatas = await crawChannels(channels);

    await cb(channelDatas);
    isCrawingChannels = false;
  });

  socket.on('isIdle', async (cb) => {
    await cb(!isCrawingChannels);
  });
});

socket.on('connect_error', function (data) {
  console.error(
    '----------------------------- connect_error -----------------------------',
  );
  retryCount++;
  console.error(data);

  if (retryCount < 5) {
    setTimeout(() => {
      socket.connect();
    }, 5000);
  }
});

socket.on('disconnect', (reason) => {
  console.error(
    '----------------------------- disconnect -----------------------------',
  );
  console.log(reason);

  if (reason === 'io server disconnect') {
    console.warn('io server disconnect');
    socket.connect();
  }

  console.log('Disconnected');
});

writeFileSync(path.resolve(__dirname, '../tmp/pid'), process.pid.toString());

export default socket;
