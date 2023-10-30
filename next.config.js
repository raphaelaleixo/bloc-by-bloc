/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_DATABASE_LINK: process.env.REACT_APP_DATABASE_LINK,
  },
}

module.exports = nextConfig
