import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Layout from '@/components/Layout';
import VideoCard from '@/components/VideoCard';
import { useDispatch } from 'react-redux';
import { updateVideos, setVideos } from '@/redux/features/videos';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useListChannelGroupsQuery } from '@/redux/services/channels';
import { useLazyListVideosQuery } from '@/redux/services/videos';
import { ChannelCategory } from '@/redux/services/types';

export interface VideoPageProps {
  category: ChannelCategory | null;
}

export default function VideoPage(props: VideoPageProps) {
  const { category } = props;
  const videoCursorRef = useRef<string>();

  const [selectedChannelGroupIdMap, setSelectedChannelGroupIdMap] = useState<
    Record<number, boolean>
  >({});

  const {
    data: channelGroups,
    isLoading,
    error,
  } = useListChannelGroupsQuery({ withVideos: '0' });

  const videos = useSelector((state: RootState) => state.videos);
  const dispatch = useDispatch();

  const [listVideos] = useLazyListVideosQuery();

  const fetchVideos = async (
    option: {
      reset?: boolean;
      cursor?: string;
      channelGroupIds?: number[];
    } = {},
  ) => {
    const { reset, cursor, channelGroupIds } = option;

    try {
      const videosData = await listVideos({
        channelGroupIds,
        category: category ?? 'Streamer',
        sortBy: 'publishedAt',
        orderBy: 'desc',
        cursor: reset ? undefined : cursor,
      }).unwrap();

      if (videosData.length > 0) {
        videoCursorRef.current = videosData[videosData.length - 1].id;
      } else {
        videoCursorRef.current = undefined;
      }

      if (cursor && !reset) {
        dispatch(
          updateVideos({
            ids: [...videos.ids, ...videosData.map(({ id }) => id)],
            videos: videosData,
          }),
        );
      } else {
        dispatch(
          setVideos({
            videos: videosData,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getIdsFromIdMap = () => {
    return Object.entries(selectedChannelGroupIdMap).reduce<number[]>(
      (prev, [id, selected]) => {
        if (selected) {
          prev.push(Number(id));
        }

        return prev;
      },
      [],
    );
  };

  const handleScrollTopBottom = () => {
    if (videos.ids.length !== 0) {
      fetchVideos({
        cursor: videoCursorRef.current,
        channelGroupIds: getIdsFromIdMap(),
      });
    }
  };

  useEffect(() => {
    fetchVideos({
      cursor: videoCursorRef.current,
      reset: true,
      channelGroupIds: getIdsFromIdMap(),
    });
  }, [selectedChannelGroupIdMap]);

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
            Videos
          </Typography>
        </Box>
        <Stack
          direction="row"
          sx={{
            mb: 3,
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {!isLoading &&
            !error &&
            channelGroups !== undefined &&
            channelGroups.map((channelGroup) => (
              <Chip
                sx={{
                  'fontWeight': 'bold',
                  'cursor': 'pointer',
                  'color': 'white',
                  '&.MuiChip-clickable:hover': {
                    backgroundColor: '#6f6f6f',
                  },
                  '&.MuiChip-clickable:active': {
                    backgroundColor: '#969696',
                  },
                  ...(selectedChannelGroupIdMap[channelGroup.id] && {
                    'backgroundColor': '#969696',
                  }),
                }}
                key={channelGroup.id}
                label={channelGroup.name}
                variant="outlined"
                onClick={() => {
                  setSelectedChannelGroupIdMap((prev) => ({
                    ...prev,
                    [channelGroup.id]: !prev[channelGroup.id],
                  }));
                }}
              />
            ))}
        </Stack>
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
                  isLive={video.liveState === 'LIVE'}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
}
