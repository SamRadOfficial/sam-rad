export const SITE = {
  name: 'Sam Rad',
  legalName: 'Samantha Radocchia',
  url: 'https://sam-rad.com',
  title: 'Change Has a Pattern',
  // hero-meet since 22 Sep 2026. hero-work, the red-stars stage shot, read as a
  // politician and was taken off the homepage for that reason.
  defaultOg: '/images/hero-meet.jpg',
  defaultOgAlt: 'Sam Rad, The Change Futurist, delivering a keynote',
  bureau: {
    agent: 'Brandy Gibson',
    org: 'Executive Speakers Bureau',
    orgUrl: 'https://www.executivespeakers.com/speaker/sam-rad',
    mailto:
      'mailto:brandy@executivespeakers.com?cc=sam@sam-rad.com&subject=SAM%20RAD%20%7C%20Keynote',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/samradofficial',
    instagram: 'https://www.instagram.com/samradofficial/',
    x: 'https://x.com/SamRadOfficial',
    youtube: 'https://www.youtube.com/@samradofficial',
    forbes: 'https://www.forbes.com/sites/samantharadocchia/',
    illicitShadows: 'https://illicitshadows.com',
  },
  sizzleId: 'itaGfenlxPw',
  formEndpoint: 'https://formspree.io/f/xgaepolw',
  // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Empty = no GA script.
  // Not a secret; it is visible in the page source of every site that uses it.
  gaId: 'G-KLJW49X8L4',
};

// `article` switches og:type to article and carries publish and modified times, which
// is what link previews and search use to date a post. Everything else stays 'website'.
export function meta({ title, description, path = '/', image, imageAlt, imageType = 'image/jpeg', imageSize, article }) {
  const url = `${SITE.url}${path}`;
  const src = image || SITE.defaultOg;
  const alt = imageAlt || SITE.defaultOgAlt;
  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: article ? 'article' : 'website',
      locale: 'en_US',
      images: [{ url: src, alt, type: imageType, ...(imageSize || {}) }],
      ...(article ? {
        publishedTime: article.published,
        modifiedTime: article.modified || article.published,
        authors: [`${SITE.url}/meet-sam`],
        ...(article.tags ? { tags: article.tags } : {}),
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@SamRadOfficial',
      creator: '@SamRadOfficial',
      images: [{ url: src, alt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: 'Sam Rad',
  alternateName: 'Samantha Radocchia',
  url: SITE.url,
  image: `${SITE.url}/images/headshot.jpg`,
  jobTitle: 'Keynote Speaker and Futurist',
  description:
    'Sam Rad (Samantha Radocchia) is an anthropologist, four-time technology founder, and #1 bestselling author who shows leaders the pattern behind every big change.',
  knowsAbout: [
    'Strategic foresight',
    'Organizational change',
    'Artificial intelligence',
    'Perceptual security',
    'Digital anthropology',
    'Blockchain',
    'Emerging technology',
  ],
  award: ['Forbes 30 Under 30 (2017)'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Colgate University' },
    { '@type': 'CollegeOrUniversity', name: 'New York University' },
  ],
  sameAs: [
    SITE.social.linkedin,
    SITE.social.instagram,
    SITE.social.x,
    SITE.social.youtube,
    SITE.social.forbes,
    SITE.social.illicitShadows,
    SITE.bureau.orgUrl,
    'https://www.youm.ai/',
  ],
};
