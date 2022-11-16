import { io } from 'socket.io-client';
import { getIsCrawing, setIsCrawing } from './global';
import {
  listVideoIdsByChannelIds,
  listStreamIdsByChannelIds,
} from './utils/listVideoIdsByChannelId';
import { google } from 'googleapis';
import { Video } from '@browse_clips/api';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const socket = io('ws://nest-app:81');

export const crawChannels = async () => {
  if (!getIsCrawing()) {
    try {
      console.log('start crawing Videos');
      setIsCrawing(true);

      const channels: { id: string }[] = await new Promise((resolve) => {
        socket.emit('get-channels', (res) => {
          resolve(res.data);
        });
      });

      const videoIdsByChannelId = await listVideoIdsByChannelIds(
        channels.map((channel) => channel.id),
      );

      const streamIdsByChannelId = await listStreamIdsByChannelIds(
        channels.map((channel) => channel.id),
      );

      console.log('add videos');

      const service = google.youtube('v3');

      const vediosByChannelEntries = Object.entries(videoIdsByChannelId).concat(
        Object.entries(streamIdsByChannelId),
      );

      const videosByChannelId: Record<string, Video[]> = {};

      for (let i = 0; i < vediosByChannelEntries.length; i++) {
        const channelId = vediosByChannelEntries[i][0];
        const videoIds = vediosByChannelEntries[i][1];
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

      return videosByChannelId;
    } catch (error) {
      console.error(`addVideos failed`);
      return {};
    } finally {
      setIsCrawing(false);
    }
  }
};

export const crawChannels1 = async (channels: { id: string }[]) => {
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

  // socket.emit('get-channels', (res) => {
  //   console.log('!', res);
  // });

  socket.emit('join', 'crawler', (res) => {
    console.log(res);
  });

  socket.on('craw-channels', async (channels, cb) => {
    const channelDatas = await crawChannels1(channels);

    cb(channelDatas);
  });
});

socket.on('exception', function (data) {
  console.log(data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});
