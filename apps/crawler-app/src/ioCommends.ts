import { Server, Socket } from 'socket.io';
import listVideoIdsByChannelId from './utils/listVideoIdsByChannelId';

export default (io: Server, socket: Socket) => {
  socket.on('list-videos', async (msg) => {
    const channelId = msg.data.channelId;

    const videoIds = await listVideoIdsByChannelId(channelId);
    io.emit('video-ids', {
      data: videoIds,
    });
  });
};
