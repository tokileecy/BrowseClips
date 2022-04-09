import { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ParallaxProvider } from 'react-scroll-parallax'

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: 'white',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 'auto',
          width: ['100%', '100%', 640, 1024],
        },
      },
    },
  },
})

export interface ThemeProviderProps {
  children: ReactNode
}

const BaseThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  )
}

export default BaseThemeProvider
