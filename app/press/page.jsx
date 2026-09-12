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
          lead="Coverage of Sam's work across technology, supply chain, and the future of business."
          note={<span className="bureau-line light">Interview requests: <a href={SITE.bureau.mailto}>Brandy Gibson</a> at <a href={SITE.bureau.orgUrl} target="_blank" rel="noopener noreferrer">Executive Speakers Bureau</a></span>}
          caption="CRMC · Chicago"
        >
          In the <span className="mint-fill">press.</span>
        </PhotoHero>

        <section className="media-page">
          <div className="wide">
            <MediaList kind="press" openYears={['2024', '2023', '2022', '2021', '2019']} />
            <div className="byline-block" id="bylines">
              <div className="tag">Bylines</div>
              <h2 className="h2">Written by <span className="mint-fill">Sam.</span></h2>
              <p>
                Sam wrote for <strong>Forbes</strong> between 2017 and 2020, publishing over fifty
                pieces on the intersection of emerging technology and cultural trends, from supply
                chain provenance and environmental crime to remote work and digital identity. She also
                wrote for <strong>Inc.</strong>, <strong>HuffPost</strong>, <strong>IBTimes</strong>,
                and <strong>Medium</strong>.
              </p>
              <MediaList kind="bylines" openYears={['2020', '2019']} label="Show earlier writing" />
              <a className="btn btn-ink" href={SITE.social.forbes} target="_blank" rel="noopener noreferrer">
                Read Sam&apos;s Forbes author page<span className="ext" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Booking"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want the room to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
