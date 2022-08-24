import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import api, { API } from '@/api';
import Layout from '@/components/Layout';
import VideoCard from './VideoCard';

export interface VideoPageProps {
  category?: API.ChannelCategory;
}

export default function VideoPage(props: VideoPageProps) {
  const { category } = props;

  const [videos, setVedios] = useState<any[]>([]);

  const fetchVideos = async () => {
    try {
      const res = await api.listVideos(category);

      const sortVideos = res.data.sort(
        (a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix(),
      );

      setVedios(sortVideos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          pb: 3,
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
            {category === 'Streamer' ? 'Videos' : 'Clips'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            margin: 'atuo',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          {videos.map((video) => {
            const thumbnails =
              (
                video.thumbnails?.standard ??
                video.thumbnails?.high ??
                video.thumbnails?.medium ??
                video.thumbnails?.default
              ).url ?? '';

            return (
              <Box
                key={video.id}
                sx={{
                  justifySelf: 'center',
                }}
              >
                <VideoCard
                  id={video.id}
                  title={video.title}
                  thumbnails={thumbnails}
                  description={video.description}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
}
