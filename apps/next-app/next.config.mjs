/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    APP_ENV: process.env?.APP_ENV ?? 'development',
    NEST_URL: process.env?.SERVER_NEST_URL ?? 'http://127.0.0.1:4000/',
    NEST_WS_URL: process.env?.SERVER_NEST_WS_URL ?? 'http://127.0.0.1:4000/',
  },
  publicRuntimeConfig: {
    APP_ENV: process.env?.APP_ENV ?? 'development',
    NEST_URL: process.env?.PUBLIC_NEST_URL ?? 'http://127.0.0.1:4000/',
    NEST_WS_URL: process.env?.PUBLIC_NEST_WS_URL ?? 'http://127.0.0.1:4000/',
    BRAND_NAME: process.env?.BRAND_NAME ?? 'BRAND_NAME',
  },
  webpack: (config) => {
    config.resolve.preferRelative = true;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
