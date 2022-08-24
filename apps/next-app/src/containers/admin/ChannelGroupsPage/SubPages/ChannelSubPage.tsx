import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import api from '@/api';
import ChannelCard from '../../ChannelPage/ChannelCard';
import Title from '../Title';
import CreateChannelDialog, {
  ChannelFormData,
} from '../Dialogs/CreateChannelDialog';

export interface ChannelSubPageProps {
  groupName?: string;
}

export default function ChannelSubPage(props: ChannelSubPageProps) {
  const { groupName } = props;

  const [channels, setChannels] = useState<any[]>([]);
  const [channelDialogOpen, setChannelDialogOpen] = useState(false);

  const fetchChannelGroup = async () => {
    if (groupName === undefined) {
      return;
    }

    try {
      const res = await api.getChannelGroupByName(groupName);

      setChannels(res.data.channels.map((data) => data.channel));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChannel = () => {
    setChannelDialogOpen(true);
  };

  const handleChannelDialogOk = async (form: ChannelFormData) => {
    try {
      await api.addChannelByIds({
        ids: form.channelIds?.split(','),
        groupName,
      });
      await fetchChannelGroup();
      setChannelDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelDialogCancel = () => {
    setChannelDialogOpen(false);
  };

  useEffect(() => {
    if (groupName !== undefined) {
      fetchChannelGroup();
    }
  }, [groupName]);

  const isChannelListView = groupName !== undefined;

  return (
    <>
      <Title
        text={isChannelListView ? groupName : 'ChannelGroups'}
        onIconClick={handleCreateChannel}
      />
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          pt: 2,
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {channels.map((channel) => {
          return (
            <ChannelCard
              key={channel.id}
              id={channel.id}
              title={channel.title}
              thumbnails={channel.thumbnails.default.url}
              description={channel.description}
            />
          );
        })}
      </Box>
      <CreateChannelDialog
        open={channelDialogOpen}
        onOk={handleChannelDialogOk}
        onCancel={handleChannelDialogCancel}
      />
    </>
  );
}
