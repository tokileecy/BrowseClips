import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VideoCard from './VideoCard'
import { useSelector, useDispatch } from 'react-redux'
import { setVideos } from '@/redux/features/videos/videoSlice'
import { RootState } from '@/redux/store'

const mockDatas = Array(50)
  .fill({
    imgUrl: '/mock/mock1.png',
    name: 'mock1',
    userName: 'S',
    description: 'This is a mock image.',
  })
  .reduce((acc, data, index) => {
    acc[index] = data
    return acc
  }, {})

export default function HomePage() {
  const dispatch = useDispatch()
  const videos = useSelector((state: RootState) => state.videos)

  useEffect(() => {
    dispatch(
      setVideos({ ids: [...Object.keys(mockDatas)], itemById: mockDatas })
    )
  }, [])
  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          pl: 8,
          pr: 8,
          pt: 4,
        }}
      >
        <Box sx={{ pl: 3, pb: 3 }}>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Clip List
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'white',
            }}
          >
            調整中
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            justifyItems: 'center',
            width: '100%',
            rowGap: 4,
          }}
        >
          {videos.ids.map((id) => {
            const videoData = videos.itemById[id]

            return <VideoCard key={id} {...videoData} />
          })}
        </Box>
      </Box>
    </Layout>
  )
}
