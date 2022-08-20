import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Layout from '@/components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
      </Box>
    </Layout>
  );
}
