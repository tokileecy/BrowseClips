import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link
          rel="icon"
          type="image/png"
          href="image"
          sizes="32x32"
        /> */}
        {/* <title></title> */}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
