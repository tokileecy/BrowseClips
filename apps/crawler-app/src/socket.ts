import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { io, Socket } from 'socket.io-client';
import { CrawledVideoData, Video } from './types';
import crawChannels from './commands/crawChannels';
import browserState from './browserState';
import crawVideos from './commands/crawVideos';

dotenv.config();

let isCrawing = false;
let retryCount = 0;

const PUBLIC_NEST_WS_URL = process.env.PUBLIC_NEST_WS_URL;

interface ServerToClientEvents {
  crawChannels: (
    channels: { id: string }[],
    cb: (channelDatas: Record<string, Video[]>) => void,
  ) => void;
  crawVideos: (
    videoIds: string[],
    cb: (videoDatas: Record<string, CrawledVideoData>) => void,
  ) => void;
  isIdle: (cb: (isIdle: boolean) => void) => void;
  askCategory: (cb: (category: string) => void) => void;
}

interface ClientToServerEvents {
  join: (roomName: string, callback: (res: any) => void) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(PUBLIC_NEST_WS_URL);

const init = async () => {
  await browserState.init();
  socket.on('connect', function () {
    console.log('Connected');
    socket.removeAllListeners();
    socket.emit('join', 'crawler', (res) => {
      console.log(res);
    });

    socket.on('askCategory', async (cb) => {
      cb('crawler');
    });

    socket.on('crawChannels', async (channels, cb) => {
      isCrawing = true;

      const context = await browserState.browser.newContext();

      const channelDatas = await crawChannels(context, channels);

      await cb(channelDatas);
      isCrawing = false;
    });

    socket.on('crawVideos', async (videoIds, cb) => {
      isCrawing = true;

      const context = await browserState.browser.newContext();

      const videoDataById: Record<string, CrawledVideoData> = await crawVideos(
        context,
        videoIds,
      );

      await cb(videoDataById);
      isCrawing = false;
    });

    socket.on('isIdle', async (cb) => {
      await cb(!isCrawing);
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
};

init();

export default socket;
