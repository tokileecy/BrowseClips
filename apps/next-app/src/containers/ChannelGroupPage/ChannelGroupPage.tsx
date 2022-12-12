import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from '@/components/Layout';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import api from '@/api';
import { useEffect, useRef } from 'react';
import { setVideos, updateVideos } from '@/redux/features/videos';
import VideoCard from '@/components/VideoCard';

export interface ChannelGroupPageProps {
  name: string | null;
}

export default function ChannelGroupPage(props: ChannelGroupPageProps) {
  const { name } = props;

  const videos = useSelector((state: RootState) => state.videos);
  const dispatch = useDispatch();
  const videoCursorRef = useRef<string>();

  const fetchVideos = async (
    option: {
      reset?: boolean;
      cursor?: string;
      channelGroupNames?: string[];
    } = {},
  ) => {
    const { reset, cursor, channelGroupNames } = option;

    try {
      const res = await api.listVideos({
        channelGroupNames,
        category: 'Streamer',
        sortBy: 'publishedAt',
        orderBy: 'desc',
        cursor: reset ? undefined : cursor,
      });

      if (res.data.length > 0) {
        videoCursorRef.current = res.data[res.data.length - 1].id;
      } else {
        videoCursorRef.current = undefined;
      }

      if (cursor && !reset) {
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
      fetchVideos({
        cursor: videoCursorRef.current,
        channelGroupNames: name ? [name] : undefined,
      });
    }
  };

  useEffect(() => {
    fetchVideos({
      channelGroupNames: name ? [name] : undefined,
    });
  }, [name]);

  return (
    <Layout onScrollTopBottom={handleScrollTopBottom}>
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
            {name}
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
