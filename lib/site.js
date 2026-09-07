export const SITE = {
  name: 'Sam Rad',
  legalName: 'Samantha Radocchia',
  url: 'https://sam-rad.com',
  title: 'Change Has a Pattern',
  defaultOg: '/images/hero-home.jpg',
  bureau: {
    agent: 'Brandy Gibson',
    org: 'Executive Speakers Bureau',
    orgUrl: 'https://www.executivespeakers.com/speaker/sam-rad',
    mailto:
      'mailto:brandy@executivespeakers.com?cc=sam@sam-rad.com&subject=SAM%20RAD%20%7C%20Keynote',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/samantharadocchia/',
    instagram: 'https://www.instagram.com/samradofficial/',
    twitter: 'https://twitter.com/SamRadOfficial',
    youtube: 'https://www.youtube.com/@samradofficial',
    forbes: 'https://www.forbes.com/sites/samantharadocchia/',
  },
  sizzleId: 'itaGfenlxPw',
};

export function meta({ title, description, path = '/', image }) {
  const url = `${SITE.url}${path}`;
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
      type: 'website',
      images: [{ url: image || SITE.defaultOg, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@SamRadOfficial',
      images: [image || SITE.defaultOg],
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
    SITE.social.twitter,
    SITE.social.youtube,
    SITE.social.forbes,
    SITE.bureau.orgUrl,
    'https://www.youm.ai/',
  ],
};
