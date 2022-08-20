import { GetServerSideProps } from 'next';
import ChannelGroupsPage from '@/containers/admin/ChannelGroupsPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params = {} } = context;

  return {
    props: { groupName: params.groupName },
  };
};

export default ChannelGroupsPage;
