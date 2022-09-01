import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import api, { API } from '@/api';
import Layout from '@/components/Layout';
import VideoCard from './VideoCard';
import { useDispatch } from 'react-redux';
import { updateVideos, setVideos } from '@/redux/features/videos';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface VideoPageProps {
  category?: API.ChannelCategory;
}

export default function VideoPage(props: VideoPageProps) {
  const { category } = props;
  const videoCursorRef = useRef<string>();

  const videos = useSelector((state: RootState) => state.videos);
  const dispatch = useDispatch();

  const fetchVideos = async (cursor?: string) => {
    try {
      const res = await api.listVideos({
        category,
        sortBy: 'publishedAt',
        orderBy: 'desc',
        cursor,
      });

      videoCursorRef.current = res.data[res.data.length - 1].id;

      if (cursor) {
        dispatch(
          updateVideos({
            ids: [...videos.ids, ...res.data.map(({ id }) => id)],
            videos: res.data,
          }),
        );
      } else {
        dispatch(
          setVideos({
            videos: res.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrollTopBottom = () => {
    if (videos.ids.length !== 0) {
      fetchVideos(videoCursorRef.current);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [category]);

  return (
    <Layout onScrollTopBottom={handleScrollTopBottom}>
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
          sx={(theme) => ({
            display: 'grid',
            margin: 'atuo',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: '1fr',
            [theme.breakpoints.up('mobile')]: {},
            [theme.breakpoints.up('tablet')]: {
              gridTemplateColumns: '1fr 1fr',
            },
            [theme.breakpoints.up('laptop')]: {
              gridTemplateColumns: '1fr 1fr 1fr',
            },
            [theme.breakpoints.up('desktop')]: {
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
            },
          })}
        >
          {videos.ids.map((id) => {
            const video = videos.videoMap[id];

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
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
}
