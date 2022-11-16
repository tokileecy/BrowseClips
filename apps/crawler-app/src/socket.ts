import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { io, Socket } from 'socket.io-client';
import { getIsCrawing, setIsCrawing } from './global';
import {
  listVideoIdsByChannelIds,
  listStreamIdsByChannelIds,
} from './utils/listVideoIdsByChannelId';
import { google } from 'googleapis';
import { Video } from './types';

dotenv.config();

const PUBLIC_NEST_WS_URL = process.env.PUBLIC_NEST_WS_URL;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface ServerToClientEvents {
  crawChannels: (
    channels: any,
    cb: (channelDatas: Record<string, Video[]>) => void,
  ) => void;
}

interface ClientToServerEvents {
  join: (roomName: string, callback: (res: any) => void) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(PUBLIC_NEST_WS_URL);

export const crawChannels = async (channels: { id: string }[]) => {
  if (!getIsCrawing()) {
    try {
      console.log('start crawing Videos');
      setIsCrawing(true);

      const videoIdsByChannelId = await listVideoIdsByChannelIds(
        channels.map((channel) => channel.id),
      );

      const streamIdsByChannelId = await listStreamIdsByChannelIds(
        channels.map((channel) => channel.id),
      );

      console.log('get videos by yt api');

      const service = google.youtube('v3');

      const vediosByChanneld = Object.entries(videoIdsByChannelId).concat(
        Object.entries(streamIdsByChannelId),
      );

      const videosByChannelId: Record<string, Video[]> = {};

      for (let i = 0; i < vediosByChanneld.length; i++) {
        const channelId = vediosByChanneld[i][0];
        const videoIds = vediosByChanneld[i][1];
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
      console.error(`addVideos failed`);
      return null;
    } finally {
      setIsCrawing(false);
    }
  } else {
    return null;
  }
};

socket.on('connect', function () {
  console.log('Connected');

  socket.emit('join', 'crawler', (res) => {
    console.log(res);
  });

  socket.on('crawChannels', async (channels, cb) => {
    const channelDatas = await crawChannels(channels);

    cb(channelDatas);
  });
});

socket.on('connect_error', function (data) {
  console.error(data);
  setTimeout(() => {
    socket.connect();
  }, 5000);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

writeFileSync(path.resolve(__dirname, '../tmp/pid'), process.pid.toString());

export default socket;
