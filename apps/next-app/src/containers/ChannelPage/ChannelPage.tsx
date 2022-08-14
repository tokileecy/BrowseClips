import Layout from '../../components/Layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import api from '@/api'
import { useEffect, useState } from 'react'
import ChannelCard from './ChannelCard'

const HomePage = () => {
  const [channels, setChannels] = useState<any[]>([])

  const fetchChannelList = async () => {
    try {
      const res = await api.listChannels()

      setChannels(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchChannelList()
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
          {channels.map((channel) => {
            return (
              <ChannelCard
                key={channel.id}
                id={channel.id}
                title={channel.title}
                thumbnails={channel.thumbnails.default.url}
                description={channel.description}
              />
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export default HomePage
