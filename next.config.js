/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      // Redirect dalla pagina contatti duplicata alla home
      {
        source: '/contatti',
        destination: '/',
        permanent: true,
      },
      // Redirect da HTTP a HTTPS (gestito di solito dal server, ma per sicurezza)
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.vistamarerosignano.it/:path*',
        permanent: true,
      },
      // Redirect da vistamarerosignano.it a www.vistamarerosignano.it
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vistamarerosignano.it',
          },
        ],
        destination: 'https://www.vistamarerosignano.it/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 