import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak } from '@/components/Blocks';
import MediaList from '@/components/MediaList';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Press | Sam Rad',
  description:
    "Coverage of Sam Rad's work across technology, supply chain, and the future of business, from the New York Times, Fortune, Newsweek, TechCrunch, Forbes, and more.",
  path: '/press',
  image: '/images/chicago-ballroom.jpg',
  imageAlt: 'Sam Rad keynoting to a full ballroom at CRMC in Chicago',
});

export default function Press() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="chicago-ballroom.jpg"
          eyebrow="Press"
          short
          position="center 26%"
          lead="Coverage of Sam's work across technology, supply chain, and the future of business. For interview requests, contact Brandy Gibson at Executive Speakers Bureau."
          caption="CRMC · Chicago"
        >
          In the <span className="mint-fill">press.</span>
        </PhotoHero>

        <section className="media-page">
          <div className="wide">
            <MediaList kind="press" openYears={['2024', '2023', '2022', '2021', '2019']} />
            <div className="byline-note">
              <p>
                Sam wrote for <strong>Forbes</strong>, <strong>Inc.</strong>, <strong>HuffPost</strong>, and{' '}
                <strong>IBTimes</strong> between 2017 and 2019, mostly on blockchain, supply chain, and emerging
                technology. Read the archive on{' '}
                <a href={SITE.social.forbes} target="_blank" rel="noopener noreferrer">Forbes →</a>
              </p>
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Booking"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
