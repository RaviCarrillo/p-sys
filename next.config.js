/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/p-sys',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/p-sys/',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 