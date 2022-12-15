import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import apiInstance from '@/api';

export default function TestingFeaturePaper() {
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleChannelIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChannelId(e.target.value);
  };

  const handleVideoIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoId(e.target.value);
  };

  const handleCrawChannel = async () => {
    const res = await apiInstance.get(
      `/crawler-chat/craw-channels/${channelId}`,
      {
        timeout: 600000,
      },
    );

    console.log('channel data', res.data);
  };

  const handleCrawVideo = async () => {
    const res = await apiInstance.get(`/crawler-chat/craw-videos/${videoId}`, {
      timeout: 600000,
    });

    console.log('channel data', res.data);
  };

  return (
    <Paper sx={{ display: 'flex', p: 3, flexDirection: 'column' }}>
      <Typography
        sx={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        Testing Feature
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
            label="ChannelId"
            value={channelId}
            onChange={handleChannelIdChange}
          />
          <Button variant="contained" onClick={handleCrawChannel}>
            Craw Channel
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
            label="VideoId"
            value={videoId}
            onChange={handleVideoIdChange}
          />
          <Button variant="contained" onClick={handleCrawVideo}>
            Craw Video
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
