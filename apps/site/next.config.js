/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'res.cloudinary.com',
            'images.pexels.com',
            'placeimg.com',
            'placehold.co',
            'via.placeholder.com'
            // 'via.placeholder.com',
        ],
    },

};

module.exports = nextConfig;
