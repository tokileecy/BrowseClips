import { Server, Socket } from 'socket.io';
import crawVideos from './utils/crawVideos';

export default (io: Server, socket: Socket) => {
  socket.on('crawl-videos', async () => {
    crawVideos();
  });
};
