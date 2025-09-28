/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'blog-next-server-5nzm.onrender.com', // your Render backend
      'res.cloudinary.com' // if using Cloudinary
    ],
  },
};

export default nextConfig;
