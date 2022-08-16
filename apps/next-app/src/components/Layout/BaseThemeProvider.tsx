import { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ParallaxProvider } from 'react-scroll-parallax'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: true
    mobile: true
    tablet: true
    laptop: true
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xl: 1440,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'fixed',
          zIndex: 1000,
          // backgroundColor: 'white',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 'auto',
          width: ['100%', '100%', '95%'],
          maxWidth: 'initial',
        },
      },
    },
  },
})

export interface ThemeProviderProps {
  children: ReactNode
}

export default function BaseThemeProvider(props: ThemeProviderProps) {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  )
}
