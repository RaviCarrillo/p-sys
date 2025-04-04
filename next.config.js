/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/p-sys',
  assetPrefix: '/p-sys/',
}

module.exports = nextConfig 