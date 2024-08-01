/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects: () => [
        {
            source: '/radix-menu-to-modal',
            destination: '/radix-menu-to-dialog',
            permanent: false,
        },
    ],
}

module.exports = nextConfig
