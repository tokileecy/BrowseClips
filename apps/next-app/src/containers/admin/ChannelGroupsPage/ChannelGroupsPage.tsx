import Box from '@mui/material/Box';
import Layout from '@/components/Layout';
import ChannelSubPage from './SubPages/ChannelSubPage';
import ChannelGroupSubPage from './SubPages/ChannelGroupSubPage';

export interface ChannelGroupsPageProps {
  groupName?: string;
}

export default function ChannelGroupsPage(props: ChannelGroupsPageProps) {
  const { groupName } = props;

  const isChannelListView = groupName !== undefined;

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
        {isChannelListView && <ChannelSubPage groupName={groupName} />}
        {!isChannelListView && <ChannelGroupSubPage />}
      </Box>
    </Layout>
  );
}
