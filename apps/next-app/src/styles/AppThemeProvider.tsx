import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ParallaxProvider } from 'react-scroll-parallax';

declare module '@mui/material/styles' {
  type CustomColors = 'background';

  interface Theme {
    custom: {
      asideWidth: string;
      headerHeight: string;
      headerPaddingLeft: string;
      headerPaddingRight: string;
      colors?: {
        [key in CustomColors]: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      asideWidth?: string;
      headerHeight?: string;
      headerPaddingLeft?: string;
      headerPaddingRight?: string;
      colors?: {
        [key in CustomColors]: string;
      };
    };
  }

  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

let theme = createTheme({
  custom: {
    asideWidth: '240px',
    headerHeight: '64px',
    headerPaddingLeft: '36px',
    headerPaddingRight: '36px',
    colors: {
      background: '#1c1c1c',
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1440,
    },
  },
});

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
          minHeight: `calc(100% -${theme.custom.headerHeight})`,
          paddingTop: theme.spacing(4),
          [theme.breakpoints.up('mobile')]: {
            paddingLeft: 16,
            paddingRight: 16,
            width: '100%',
            maxWidth: '540px',
          },
          [theme.breakpoints.up('tablet')]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '800px',
          },
          [theme.breakpoints.up('desktop')]: {
            maxWidth: '1100px',
          },
        },
      },
    },
  },
});

export interface AppThemeProviderProps {
  children: ReactNode;
}

export default function AppThemeProvider(props: AppThemeProviderProps) {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ThemeProvider>
  );
}
