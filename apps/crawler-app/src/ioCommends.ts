import { Server, Socket } from 'socket.io';
import { listVideoIdsByChannelIds } from './utils/listVideoIdsByChannelId';
import api from './api';

export default (io: Server, socket: Socket) => {
  socket.on('crawl-videos', async () => {
    try {
      const channelIds = (await api.listChannels()).data.map(
        (channel) => channel.id,
      );

      const videoIds = await listVideoIdsByChannelIds(channelIds);

      console.log('add videos');
      api.addVideoByIds(
        Object.values(videoIds).reduce((acc, curr) => [...acc, ...curr], []),
      );
    } catch (error) {
      console.error(`addVideos failed`);
      console.error(error);
    }
  });
};
