import { ChangeEvent, useEffect, useState } from 'react';

import getConfig from 'next/config';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Layout from '@/components/Layout';
import {
  useAddChannelByIdsMutation,
  useLazySyncChannelsQuery,
} from '@/redux/services/channels';
import { useAddVideoByIdsMutation } from '@/redux/services/videos';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const runtimeConfig =
  typeof document === 'undefined' ? serverRuntimeConfig : publicRuntimeConfig;

const { NODE_ENV } = runtimeConfig;

export default function AdminPage() {
  const [channelIds, setChannelIds] = useState('');
  const [videoId, setVideoId] = useState('');

  const [addChannelByIds] = useAddChannelByIdsMutation();

  const [addVideoByIds] = useAddVideoByIdsMutation();
  const [syncChannels] = useLazySyncChannelsQuery();

  const handleAddChannel = () => {
    addChannelByIds({ ids: channelIds.split(',') });
  };

  const handleAddVideo = () => {
    addVideoByIds({
      ids: [videoId],
    });
  };

  const handleSync = () => {
    syncChannels();
  };

  const handleChannelIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelIds(e.target.value);
  };

  const handleVideoIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoId(e.target.value);
  };

  useEffect(() => {
    if (NODE_ENV === 'development') {
      localStorage.debug = '*';
    }
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
        <Box sx={{ pb: 3 }}>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Admin
          </Typography>
        </Box>
        <Box>
          <Paper sx={{ display: 'flex', p: 4, flexDirection: 'column' }}>
            <Typography
              sx={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              Add Data
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <TextField
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                  }}
                  size="small"
                  label="Channel Id"
                  value={channelIds}
                  onChange={handleChannelIdChange}
                />
                <Button variant="contained" onClick={handleAddChannel}>
                  Add
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <TextField
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                  }}
                  size="small"
                  label="Video Id"
                  value={videoId}
                  onChange={handleVideoIdChange}
                />
                <Button variant="contained" onClick={handleAddVideo}>
                  Add
                </Button>
              </Box>
              <Button variant="contained" onClick={handleSync}>
                Sync Videos
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
}
