import type { GetServerSideProps } from 'next';
import ChannelGroupPage from '@/containers/ChannelGroupPage';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name } = query;

  return { props: { name } };
};

export default ChannelGroupPage;
