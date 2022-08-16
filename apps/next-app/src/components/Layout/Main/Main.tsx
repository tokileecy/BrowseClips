import { ReactNode } from 'react'
import Box from '@mui/material/Box'

export interface MainProps {
  children?: ReactNode
}

export default function Main(props: MainProps) {
  const { children } = props

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        overflowY: 'auto',
        marginTop: '64px',
      }}
    >
      {children}
    </Box>
  )
}
