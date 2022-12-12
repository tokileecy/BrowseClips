import type { AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AppThemeProvider from '@/styles/AppThemeProvider';
import store from '@/redux/store';
import '@/styles/globals.css';

const { publicRuntimeConfig } = getConfig();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Head>
          {/* <link
            rel="icon"
            type="image/png"
            href="image"
            sizes="32x32"
          /> */}
          <title>{publicRuntimeConfig.BRAND_NAME}</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </AppThemeProvider>
    </Provider>
  );
};

export default MyApp;
