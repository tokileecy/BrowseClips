import Box from '@mui/material/Box'
import Layout from '@/components/Layout'
import LoginPaper from './LoginPaper'


export default function LoginPage() {
  return (
    <Layout variant="login">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoginPaper />
      </Box>
    </Layout>
  )
}
