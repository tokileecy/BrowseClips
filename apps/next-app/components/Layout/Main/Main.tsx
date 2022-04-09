import { ReactNode } from 'react'
import Box from '@mui/material/Box'

export interface MainProps {
  children?: ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#1c1c1c',
      }}
    >
      {children}
    </Box>
  )
}

export default Main
