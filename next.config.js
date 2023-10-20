/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_DATOCMS_API_TOKEN: process.env.REACT_APP_DATOCMS_API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
