import Layout from '../../Layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

const VideoPage = () => {
  const [vedios, setVedios] = useState<any[]>([])

  const fetchVideos = async () => {
    try {
      const res = await api.listVideos()

      console.log(res.data)
      setVedios(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVideos()
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
        <Box sx={{ pb: 3 }}>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Vedios
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
          {vedios.map((vedio) => {
            return (
              <VideoCard
                key={vedio.id}
                id={vedio.id}
                title={vedio.title}
                thumbnails={vedio.thumbnails.standard.url}
                description={vedio.description}
              />
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export default VideoPage
