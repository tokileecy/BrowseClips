import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from '@/components/Layout';
import ChannelCard from './ChannelCard';
import { useListChannelsQuery } from '@/redux/services/nestApi';

export default function HomePage() {
  const { data: channels, error, isLoading } = useListChannelsQuery();

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
            Channels
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          {!isLoading &&
            !error &&
            channels &&
            channels.map((channel) => {
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
      </Box>
    </Layout>
  );
}
