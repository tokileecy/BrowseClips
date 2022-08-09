import { Router } from 'express';
import api from '../api';
import { listVideoIdsByChannelIds } from '../utils/listVideoIdsByChannelId';

export default (router: Router) => {
  router.get('/channels/:id/videos', async () => {
    const channelIds = (await api.listChannels()).data.map(
      (channel) => channel.id,
    );

    const videoIds = await listVideoIdsByChannelIds(channelIds);

    try {
      console.log('add videos');
      api.addVideoByIds(
        Object.values(videoIds).reduce((acc, curr) => [...acc, ...curr], []),
      );
    } catch (error) {
      console.error(`addVideos failed`);
    }
  });
};
