/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    REACT_APP_DATABASE_LINK: process.env.REACT_APP_DATABASE_LINK,
  },
}

module.exports = nextConfig
