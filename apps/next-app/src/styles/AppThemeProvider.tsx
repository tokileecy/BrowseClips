import { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ParallaxProvider } from 'react-scroll-parallax'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      headerHeight: string
      headerPaddingLeft: string
      headerPaddingRight: string
    }
  }

  interface ThemeOptions {
    custom?: {
      headerHeight?: string
      headerPaddingLeft?: string
      headerPaddingRight?: string
    }
  }

  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    laptop: true
    desktop: true
  }
}

let theme = createTheme({
  custom: {
    headerHeight: '64px',
    headerPaddingLeft: '36px',
    headerPaddingRight: '36px',
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1440,
    },
  },
})

theme = createTheme(theme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'fixed',
          zIndex: 1000,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          margin: 'auto',
          maxWidth: 'initial',
          minHeight: '100%',
          paddingTop: theme.spacing(4),
          [theme.breakpoints.up('mobile')]: {
            paddingLeft: 36,
            paddingRight: 36,
            width: '100%',
          },
          [theme.breakpoints.up('tablet')]: {
            paddingLeft: 0,
            paddingRight: 0,
            width: '600px',
          },
          [theme.breakpoints.up('laptop')]: {
            width: '900px',
          },
          [theme.breakpoints.up('desktop')]: {
            width: '1200px',
          },
        },
      },
    },
  },
})

export interface AppThemeProviderProps {
  children: ReactNode
}

export default function AppThemeProvider(props: AppThemeProviderProps) {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  )
}
