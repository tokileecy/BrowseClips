import { useState } from 'react';
import Box from '@mui/material/Box';
import ChannelCard from '../../ChannelPage/ChannelCard';
import Title from '../Title';
import CreateChannelDialog, {
  ChannelFormData,
} from '../Dialogs/CreateChannelDialog';
import {
  useAddChannelByIdsMutation,
  useGetChannelGroupByNameQuery,
} from '@/redux/services/nestApi';

export interface ChannelSubPageProps {
  groupName?: string;
}

export default function ChannelSubPage(props: ChannelSubPageProps) {
  const { groupName } = props;

  const [channelDialogOpen, setChannelDialogOpen] = useState(false);

  const {
    data: channelGroup,
    isLoading,
    error,
    refetch,
  } = useGetChannelGroupByNameQuery(groupName);

  const [addChannelByIds] = useAddChannelByIdsMutation();

  const handleCreateChannel = () => {
    setChannelDialogOpen(true);
  };

  const handleChannelDialogOk = async (form: ChannelFormData) => {
    try {
      await addChannelByIds({
        ids: form.channelIds?.split(','),
        groupName,
      });
      await refetch();
      setChannelDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelDialogCancel = () => {
    setChannelDialogOpen(false);
  };

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
        {!isLoading &&
          !error &&
          channelGroup !== undefined &&
          channelGroup.channels.map((channelData) => {
            const channel = channelData.channel;

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
