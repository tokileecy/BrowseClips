import api from '../api';
import { listVideoIdsByChannelIds } from './listVideoIdsByChannelId';

export default async function crawVideos() {
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
}
