/** @type {import('next').NextConfig} */

// The Squarespace site stays live at this host after cutover, noindexed.
// Archive content with no equivalent on the new site (blog, press, events,
// glossary) redirects here so nothing 404s. As dispatches are backfilled,
// add a bespoke /blog/:slug -> /writing/:slug rule above the legacy catch-all.
const LEGACY = 'https://legacy.sam-rad.com';

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // ── Pages with a direct equivalent on the new site ──────────────────
      { source: '/home', destination: '/', permanent: true },
      { source: '/about', destination: '/meet-sam', permanent: true },
      { source: '/contact', destination: '/book', permanent: true },
      { source: '/books', destination: '/body-of-work#books', permanent: true },
      { source: '/radicalnext', destination: '/body-of-work#radical-next', permanent: true },
      { source: '/radical-next-book', destination: '/body-of-work#radical-next', permanent: true },
      { source: '/bitcoin-pizza-book', destination: '/body-of-work#bitcoin-pizza', permanent: true },
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/foresight', destination: '/writing', permanent: true },
      { source: '/foresight/:slug', destination: '/writing/:slug', permanent: true },
      { source: '/resources', destination: '/writing', permanent: true },
      { source: '/photos', destination: '/body-of-work', permanent: true },
      { source: '/photos/all', destination: '/body-of-work', permanent: true },
      { source: '/events', destination: '/speaking', permanent: true },
      { source: '/meta-human', destination: '/meet-sam', permanent: true },
      { source: '/virtual-likeness', destination: '/meet-sam', permanent: true },
      { source: '/conversations-with-myself', destination: '/meet-sam', permanent: true },
      { source: '/cart', destination: '/', permanent: true },
      // /speaking exists on both sites at the same path. No redirect needed.

      // ── Blog taxonomy pages: send to Foresight, not the legacy archive ──
      { source: '/blog/category/:cat*', destination: '/writing', permanent: true },
      { source: '/blog/tag/:tag*', destination: '/writing', permanent: true },

      // ── Posts already backfilled to the new site (keep ABOVE the legacy catch-all) ──
      { source: '/blog/blurring-reality-ai-and-the-perceptual-breakdown', destination: '/writing/blurring-reality-ai-and-the-perceptual-breakdown', permanent: true },
      { source: '/blog/will-quantum-computing-break-encryption', destination: '/writing/will-quantum-computing-break-encryption', permanent: true },

      // ── Archive content preserved on the legacy host ────────────────────
      { source: '/blog/:slug*', destination: `${LEGACY}/blog/:slug*`, permanent: true },
      { source: '/press', destination: `${LEGACY}/press`, permanent: true },
      { source: '/press/:path*', destination: `${LEGACY}/press/:path*`, permanent: true },
      { source: '/events/all', destination: `${LEGACY}/events/all`, permanent: true },
      { source: '/events/all/:path*', destination: `${LEGACY}/events/all/:path*`, permanent: true },
      { source: '/bitcoin-pizza-glossary', destination: `${LEGACY}/bitcoin-pizza-glossary`, permanent: true },
      { source: '/bitcoin-pizza-glossary/:path*', destination: `${LEGACY}/bitcoin-pizza-glossary/:path*`, permanent: true },
      { source: '/glossary', destination: `${LEGACY}/bitcoin-pizza-glossary`, permanent: true },
      { source: '/bitcoin', destination: `${LEGACY}/bitcoin`, permanent: true },
      { source: '/resources/:path*', destination: `${LEGACY}/resources/:path*`, permanent: true },
      { source: '/jobs', destination: `${LEGACY}/jobs`, permanent: true },
    ];
  },
};
module.exports = nextConfig;
