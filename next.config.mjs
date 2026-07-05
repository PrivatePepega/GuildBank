/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GB_ACCESS_KEY_ID: process.env.GB_ACCESS_KEY_ID,
    GB_SECRET_ACCESS_KEY: process.env.GB_SECRET_ACCESS_KEY,
    GB_SECRET_ID: process.env.GB_SECRET_ID,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;