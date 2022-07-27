import Layout from '../../Layout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const WatchPage = (props: {id?: string}) => {
  const { id = '' } = props

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
            Watch
          </Typography>
        </Box>
        <Box>
          <iframe
            width="480"
            height="360"
            src={`//www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
    </Layout>
  )
}

export default WatchPage
