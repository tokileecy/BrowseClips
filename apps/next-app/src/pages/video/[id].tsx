import type { GetServerSideProps } from 'next'
import WatchPage from '@/containers/WatchPage'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  return { props: { id } }
}

export default WatchPage
