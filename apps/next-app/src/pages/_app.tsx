import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { Api } from '@browse_clips/api';
import AppThemeProvider from '@/styles/AppThemeProvider';
import store from '@/redux/store';
import '@/styles/globals.css';
import api from '@/api';

declare global {
  interface Window {
    api?: Api;
  }
}

const { publicRuntimeConfig } = getConfig();

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (
      publicRuntimeConfig.APP_ENV === 'development' &&
      typeof document !== 'undefined'
    ) {
      window.api = api;
    }
  }, []);

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
          {/* <title></title> */}
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </AppThemeProvider>
    </Provider>
  );
};

export default MyApp;
