import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import CircleAdd from '@/images/circle-add.svg';
import Layout from '@/components/Layout';
import api from '@/api';
import ChannelGroupCard from './ChannelCard';
import CreateGroupDialog, { ChannelGroupFormData } from './CreateGroupDialog';

export default function HomePage() {
  const [open, setOpen] = useState(false);

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

  const handleCreateSvgClick = () => {
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
  }, []);

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
            ChannelGroups
          </Typography>
          <IconButton onClick={handleCreateSvgClick}>
            <SvgIcon
              component={CircleAdd}
              sx={{ width: '20px', height: '20px', color: 'white' }}
            ></SvgIcon>
          </IconButton>
        </Box>
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
              />
            );
          })}
        </Box>
      </Box>
      <CreateGroupDialog open={open} onOk={handleOk} onCancel={handleCancel} />
    </Layout>
  );
}
