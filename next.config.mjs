/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GB_ACCESS_KEY_ID: process.env.GB_ACCESS_KEY_ID,
    GB_SECRET_ACCESS_KEY: process.env.GB_SECRET_ACCESS_KEY,
    GB_SECRET_ID: process.env.GB_SECRET_ID,
  },
};

export default nextConfig;