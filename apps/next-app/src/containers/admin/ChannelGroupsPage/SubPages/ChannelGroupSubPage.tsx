import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import api from '@/api';
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

export default function ChannelSubPage() {
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [category, setCategory] = useState<ChannelCategory>('Streamer');

  const router = useRouter();

  const [channelGroups, setChannelGroups] = useState<
    {
      id: number;
      name: string;
      channelIds?: string[];
    }[]
  >([]);

  const fetchChannelGroups = async () => {
    try {
      const res = await api.listChannelGroups();

      setChannelGroups(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateGroup = () => {
    setGroupDialogOpen(true);
  };

  const handleGroupDialogOk = async (form: ChannelGroupFormData) => {
    try {
      await api.createChannelGroup(form);
      await fetchChannelGroups();
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
      await api.addChannelByIds({ ids: form.channelIds?.split(','), category });
      setChannelDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelDialogCancel = () => {
    setChannelDialogOpen(false);
  };

  useEffect(() => {
    fetchChannelGroups();
  }, []);

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
        {channelGroups.map((channelGroups) => {
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
