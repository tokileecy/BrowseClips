import type { GetServerSideProps } from 'next'
import WatchPage from '../../components/pages/WatchPage'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  
  return { props: { id } }
} 

export default WatchPage
