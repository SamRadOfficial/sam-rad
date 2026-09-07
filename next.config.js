/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Squarespace pages that no longer exist here. Point at the closest new home.
      // Legacy pages preserved on the old site: update the destinations once the
      // Squarespace instance is parked at legacy.sam-rad.com.
      { source: '/about', destination: '/meet-sam', permanent: true },
      { source: '/contact', destination: '/book', permanent: true },
      { source: '/writing', destination: '/foresight', permanent: true },
      { source: '/blog', destination: '/foresight', permanent: true },
      { source: '/blog/:slug', destination: '/foresight/:slug', permanent: true },
      { source: '/books', destination: '/body-of-work', permanent: true },
      { source: '/radical-next-book', destination: '/body-of-work', permanent: true },
      { source: '/bitcoin-pizza-book', destination: '/body-of-work', permanent: true },
      { source: '/radicalnext', destination: '/body-of-work', permanent: true },
      { source: '/photos', destination: '/body-of-work', permanent: true },
      { source: '/events', destination: '/speaking', permanent: true },
      { source: '/meta-human', destination: '/meet-sam', permanent: true },
      { source: '/resources', destination: '/foresight', permanent: true },
      { source: '/cart', destination: '/', permanent: true },
    ];
  },
};
module.exports = nextConfig;
