/** @type {import('next').NextConfig} */

// The Squarespace site stays live at this host after cutover, noindexed.
// Archive content with no equivalent on the new site (blog, events,
// glossary) redirects here so nothing 404s. As dispatches are backfilled,
// add a bespoke /blog/:slug -> /writing/:slug rule above the archive catch-all.
const ARCHIVE = 'https://archive.sam-rad.com';

// Note: samradsite.vercel.app -> sam-rad.com is handled by a 301 configured in
// the Vercel dashboard (Project, Settings, Domains), not here. Vercel redirects
// at the edge before this config runs, so a rule here would never fire.

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
      { source: '/meta-human', destination: '/samrad-ai', permanent: true },
      { source: '/virtual-likeness', destination: '/samrad-ai', permanent: true },
      { source: '/conversations-with-myself', destination: '/samrad-ai', permanent: true },
      { source: '/cart', destination: '/', permanent: true },
      // /speaking exists on both sites at the same path. No redirect needed.

      // ── Industry pages retired 2026-09-08. Copy preserved in
      //    data/industries-archive.json. Restore by moving the entry back.
      { source: '/industries/marketing', destination: '/industries/retail', permanent: true },
      { source: '/industries/insurance', destination: '/industries', permanent: true },
      { source: '/industries/defense', destination: '/industries', permanent: true },
      { source: '/industries/manufacturing', destination: '/industries', permanent: true },
      { source: '/industries/automotive', destination: '/industries', permanent: true },
      { source: '/industries/real-estate', destination: '/industries', permanent: true },
      { source: '/industries/energy', destination: '/industries', permanent: true },
      { source: '/industries/media', destination: '/industries', permanent: true },
      { source: '/industries/luxury', destination: '/industries', permanent: true },
      { source: '/industries/professional-services', destination: '/industries', permanent: true },
      { source: '/industries/associations', destination: '/industries', permanent: true },

      // ── Blog taxonomy pages: send to Foresight, not the legacy archive ──
      { source: '/blog/category/:cat*', destination: '/writing', permanent: true },
      { source: '/blog/tag/:tag*', destination: '/writing', permanent: true },

      // ── Posts migrated to the new site (must stay ABOVE the archive catch-all) ──
      { source: '/blog/5-questions-to-ask-before-shaking-hands-with-a-new-business-partner-mx5wj-njf8y', destination: '/writing/5-questions-to-ask-before-shaking-hands-with-a-new-business-partner', permanent: true },
      { source: '/blog/blurring-reality-ai-and-the-perceptual-breakdown', destination: '/writing/blurring-reality-ai-and-the-perceptual-breakdown', permanent: true },
      { source: '/blog/build-a-blog-based-site-with-refinerycms-lzsyk-y298j', destination: '/writing/build-a-blog-based-site-with-refinerycms', permanent: true },
      { source: '/blog/engineering-serendipity-for-happiness-and-success-ene94-g493z', destination: '/writing/engineering-serendipity-for-happiness-and-success', permanent: true },
      { source: '/blog/how-deforestation-and-timber-issues-can-be-solved-with-blockchain-e27ep-49yjs', destination: '/writing/how-deforestation-and-timber-issues-can-be-solved-with-blockchain', permanent: true },
      { source: '/blog/how-to-get-into-ketosis-fast-jnxmk-yxk28', destination: '/writing/how-to-get-into-ketosis-fast', permanent: true },
      { source: '/blog/i-bought-a-goruck-gr2-travel-bag-with-bitcoin-heres-how-you-can-too-438nn-42ehs', destination: '/writing/i-bought-a-goruck-gr2-travel-bag-with-bitcoin-heres-how-you-can-too', permanent: true },
      { source: '/blog/is-bitcoin-a-fad-addressing-the-critiques-of-prominent-skeptics-98dwz-tdxrn', destination: '/writing/is-bitcoin-a-fad-addressing-the-critiques-of-prominent-skeptics', permanent: true },
      { source: '/blog/look-ma-im-a-crypto-keto-influencer-how-is-crypto-like-keto-4kltc-z3kn4', destination: '/writing/look-ma-im-a-crypto-keto-influencer-how-is-crypto-like-keto', permanent: true },
      { source: '/blog/stop-the-grind-a-realistic-solution-to-halt-hustle-culture-fnpxr-a85rr', destination: '/writing/stop-the-grind-a-realistic-solution-to-halt-hustle-culture', permanent: true },
      { source: '/blog/the-art-of-saying-no-h3ltf-jkd6b', destination: '/writing/the-art-of-saying-no', permanent: true },
      { source: '/blog/the-new-society-of-the-spectacle-and-the-future-of-technology-innovation-hp6dy-6j9pn', destination: '/writing/the-new-society-of-the-spectacle-and-the-future-of-technology-innovation', permanent: true },
      { source: '/blog/the-next-industry-to-be-disrupted-by-blockchain-real-estate-bcstr-ww3cg', destination: '/writing/the-next-industry-to-be-disrupted-by-blockchain-real-estate', permanent: true },
      { source: '/blog/what-competitive-skydiving-taught-me-about-business-risk-taking-z2l63-axf6y', destination: '/writing/what-competitive-skydiving-taught-me-about-business-risk-taking', permanent: true },
      { source: '/blog/who-is-satoshi-nakamoto-a-brief-exploration-of-bitcoins-mysterious-founder-5clkm-hbp5a', destination: '/writing/who-is-satoshi-nakamoto-a-brief-exploration-of-bitcoins-mysterious-founder', permanent: true },
      { source: '/blog/why-blockchain-will-change-the-collectibles-landscape-its-more-than-authentication-le25y-7xt6p', destination: '/writing/why-blockchain-will-change-the-collectibles-landscape-its-more-than-authentication', permanent: true },
      { source: '/blog/why-the-us-tax-system-is-preventing-crypto-adoption-for-digital-nomads-n36h3-s3yct', destination: '/writing/why-the-us-tax-system-is-preventing-crypto-adoption-for-digital-nomads', permanent: true },
      { source: '/blog/will-quantum-computing-break-encryption', destination: '/writing/will-quantum-computing-break-encryption', permanent: true },

      // ── Archive content preserved on the archive host ────────────────────
      { source: '/blog/:slug*', destination: `${ARCHIVE}/blog/:slug*`, permanent: true },
      // /press now exists on this site. Old press detail pages were thin stubs
      // (title + screenshot, no article link), so they fold into the new index.
      { source: '/press/:path+', destination: '/press', permanent: true },
      { source: '/events/all', destination: `${ARCHIVE}/events/all`, permanent: true },
      { source: '/events/all/:path*', destination: `${ARCHIVE}/events/all/:path*`, permanent: true },
      { source: '/bitcoin-pizza-glossary', destination: `${ARCHIVE}/bitcoin-pizza-glossary`, permanent: true },
      { source: '/bitcoin-pizza-glossary/:path*', destination: `${ARCHIVE}/bitcoin-pizza-glossary/:path*`, permanent: true },
      { source: '/glossary', destination: `${ARCHIVE}/bitcoin-pizza-glossary`, permanent: true },
      { source: '/bitcoin', destination: `${ARCHIVE}/bitcoin`, permanent: true },
      { source: '/resources/:path*', destination: `${ARCHIVE}/resources/:path*`, permanent: true },
      { source: '/jobs', destination: `${ARCHIVE}/jobs`, permanent: true },
    ];
  },
};
module.exports = nextConfig;
