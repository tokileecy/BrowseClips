import VideoPage from '@/containers/VideoPage';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category = null } = query ?? {};

  return { props: { category } };
};

export default VideoPage;
