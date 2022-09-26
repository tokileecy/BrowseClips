import { getIsCrawing, setIsCrawing } from '../global';
import api from '../api';
import { listVideoIdsByChannelIds } from './listVideoIdsByChannelId';

export default async function crawVideos() {
  if (!getIsCrawing()) {
    try {
      console.log('start crawing Videos');
      setIsCrawing(true);

      const channelIds = (await api.listChannels()).data.map(
        (channel) => channel.id,
      );

      const videoIds = await listVideoIdsByChannelIds(channelIds);

      console.log('add videos');
      await api.addVideoByIds(
        Object.values(videoIds).reduce((acc, curr) => [...acc, ...curr], []),
      );
    } catch (error) {
      console.error(`addVideos failed`);
    } finally {
      setIsCrawing(false);
    }
  }
}
