import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import CircleAdd from '@/images/circle-add.svg';
import Layout from '@/components/Layout';
import api from '@/api';
import ChannelGroupCard from './ChannelCard';
import ChannelCard from '../ChannelPage/ChannelCard';
import CreateGroupDialog, { ChannelGroupFormData } from './CreateGroupDialog';
import { useRouter } from 'next/router';

export interface ChannelGroupsPageProps {
  groupName?: string;
}

export default function ChannelGroupsPage(props: ChannelGroupsPageProps) {
  const { groupName } = props;
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<any[]>([]);

  const [channelGroups, setChannelGroups] = useState<
    {
      id: number;
      name: string;
      channelIds?: string[];
    }[]
  >([]);

  const router = useRouter();

  const fetchChannelGroups = async () => {
    try {
      const res = await api.listChannelGroups();

      setChannelGroups(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleCreateChannelGroup = () => {
    setOpen(true);
  };

  const handleCreateChannel = () => {
    setOpen(true);
  };

  const handleOk = async (form: ChannelGroupFormData) => {
    try {
      await api.createChannelGroup(form);
      await fetchChannelGroups();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchChannelGroups();
  }, [groupName]);

  useEffect(() => {
    if (groupName !== undefined) {
      fetchChannelGroup();
    }
  }, [groupName]);

  const isGroupView = groupName !== undefined;

  const title = (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {isGroupView ? groupName : 'ChannelGroups'}
      </Typography>
      <IconButton
        onClick={isGroupView ? handleCreateChannel : handleCreateChannelGroup}
      >
        <SvgIcon
          component={CircleAdd}
          sx={{ width: '20px', height: '20px', color: 'white' }}
        ></SvgIcon>
      </IconButton>
    </Box>
  );

  const channelGroupsNode = (
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
  );

  const channelsNode = (
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
  );

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {title}
        {isGroupView ? channelsNode : channelGroupsNode}
      </Box>
      <CreateGroupDialog open={open} onOk={handleOk} onCancel={handleCancel} />
    </Layout>
  );
}
