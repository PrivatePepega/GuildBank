/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GB_ACCESS_KEY_ID: process.env.GB_ACCESS_KEY_ID,
    GB_SECRET_ACCESS_KEY: process.env.GB_SECRET_ACCESS_KEY,
    GB_SECRET_ID: process.env.GB_SECRET_ID,
    TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
  },
};

export default nextConfig;