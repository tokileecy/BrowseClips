/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    APP_ENV: process.env?.APP_ENV ?? 'development',
    NEST_URL: process.env?.SERVER_NEST_URL ?? 'http://127.0.0.1:4000/',
  },
  publicRuntimeConfig: {
    APP_ENV: process.env?.APP_ENV ?? 'development',
    NEST_URL: process.env?.PUBLIC_NEST_URL ?? 'http://127.0.0.1:4000/',
  },
}

export default nextConfig
