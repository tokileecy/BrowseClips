import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import api from '@/api'
import Layout from '../../components/Layout'
import VideoCard from './VideoCard'

export default function VideoPage() {
  const [videos, setVedios] = useState<any[]>([])

  const fetchVideos = async () => {
    try {
      const res = await api.listVideos()

      const sortVideos = res.data.sort(
        (a, b) => dayjs(b.publishedAt).unix() - dayjs(a.publishedAt).unix()
      )

      setVedios(sortVideos)
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
            margin: 'atuo',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          {videos.map((video) => {
            const thumbnails =
              (
                video.thumbnails?.standard ??
                video.thumbnails?.high ??
                video.thumbnails?.medium ??
                video.thumbnails?.default
              ).url ?? ''

            return (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnails={thumbnails}
                description={video.description}
              />
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}
