import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak } from '@/components/Blocks';
import resources from '@/data/resources.json';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Resources | The research behind the keynote',
  description:
    'Curated primary sources behind Sam Rad\'s keynotes. Peer-reviewed research, regulator rulings, and the incident reports behind the headlines, organized by sector.',
  path: '/resources',
  image: '/images/hero-industries.jpg',
  imageAlt: 'Sam Rad speaking to an industry audience',
});

export default function Resources() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="hero-industries.jpg"
          eyebrow="Resources"
          short
          lead="Sam does not ask a room to take her word for it. These are the primary sources behind the keynote: peer-reviewed research, regulator rulings, and the incident reports behind the headlines."
        >
          The research behind <span className="mint-fill">the keynote.</span>
        </PhotoHero>

        <section className="work" style={{ background: 'var(--paper)' }}>
          <div className="wide">
            <div className="res-cards">
              {resources.map((r, i) => (
                <Link className="res-card" href={`/resources/${r.slug}`} key={r.slug}>
                  <div className="n">{String(i + 1).padStart(2, '0')} · {r.industry}</div>
                  <div className="t">{r.title}</div>
                  <div className="d">{r.deck}</div>
                  <div className="c">
                    {r.sections.reduce((n, s) => n + s.items.length, 0)} sources · Updated {r.updated}
                  </div>
                </Link>
              ))}
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
