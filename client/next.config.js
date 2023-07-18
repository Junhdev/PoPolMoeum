/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    reactStrictMode: true, 
    //swcMinify: true,
    images: {
      // 이미지 업로드 관련 domain 설정
      domains: [
        "www.gravatar.com", "localhost"
      ]
    }
  }
  
  module.exports = nextConfig
  