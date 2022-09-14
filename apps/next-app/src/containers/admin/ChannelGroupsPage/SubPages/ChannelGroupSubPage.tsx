import { useState } from 'react';
import Box from '@mui/material/Box';
import Title from '../Title';
import ChannelGroupCard from '../ChannelCard';
import CreateChannelGroupDialog, {
  ChannelGroupFormData,
} from '../Dialogs/CreateGroupDialog';
import { useRouter } from 'next/router';
import CreateChannelDialog, {
  ChannelFormData,
} from '../Dialogs/CreateChannelDialog';
import { ChannelCategory } from '@browse_clips/api';
import {
  useAddChannelByIdsMutation,
  useCreateChannelGroupMutation,
  useListChannelGroupsQuery,
} from '@/redux/services/nestApi';

export default function ChannelSubPage() {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [category, setCategory] = useState<ChannelCategory>('Streamer');

  const router = useRouter();

  const {
    data: channelGroups,
    error,
    isLoading,
    refetch: refetchChannelGroups,
  } = useListChannelGroupsQuery();

  const [createChannelGroup] = useCreateChannelGroupMutation();
  const [addChannelById] = useAddChannelByIdsMutation();

  const handleCreateGroup = () => {
    setGroupDialogOpen(true);
  };

  const handleGroupDialogOk = async (form: ChannelGroupFormData) => {
    try {
      await createChannelGroup(form);
      await refetchChannelGroups();
      setGroupDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGroupDialogCancel = () => {
    setGroupDialogOpen(false);
  };

  const [channelDialogOpen, setChannelDialogOpen] = useState(false);

  const handleCreateStreamerChannel = () => {
    setChannelDialogOpen(true);
    setCategory('Streamer');
  };

  const handleCreateClipperChannel = () => {
    setChannelDialogOpen(true);
    setCategory('Clipper');
  };

  const handleChannelDialogOk = async (form: ChannelFormData) => {
    try {
      await addChannelById({ ids: form.channelIds?.split(','), category });
      setChannelDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelDialogCancel = () => {
    setChannelDialogOpen(false);
  };

  return (
    <>
      <Title text="Streamers" onIconClick={handleCreateStreamerChannel} />
      <Title text="Clippers" onIconClick={handleCreateClipperChannel} />
      <Title text="ChannelGroups" onIconClick={handleCreateGroup} />
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          pt: 2,
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }}
      >
        {!isLoading &&
          !error &&
          channelGroups !== undefined &&
          channelGroups.map((channelGroups) => {
            return (
              <ChannelGroupCard
                key={channelGroups.id}
                name={channelGroups.name}
                onClick={() => {
                  router.push(`/admin/channel-groups/${channelGroups.name}`);
                }}
              />
            );
          })}
      </Box>

      <CreateChannelGroupDialog
        open={groupDialogOpen}
        onOk={handleGroupDialogOk}
        onCancel={handleGroupDialogCancel}
      />
      <CreateChannelDialog
        open={channelDialogOpen}
        onOk={handleChannelDialogOk}
        onCancel={handleChannelDialogCancel}
      />
    </>
  );
}
