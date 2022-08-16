import '../styles/globals.css'
import type { AppProps } from 'next/app'
import store from '@/redux/store'
import Head from 'next/head'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import AppThemeProvider from '@/styles/AppThemeProvider'

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
          {/* <title></title> */}
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </AppThemeProvider>
    </Provider>
  )
}

export default MyApp
