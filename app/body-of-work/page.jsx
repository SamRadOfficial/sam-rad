import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, YouAreHere, CtaBreak, Sizzle, JsonLd } from '@/components/Blocks';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Body of Work | Books, Productions & Media',
  description: 'Radical Next, Bitcoin Pizza, Illicit Shadows, MISTIC, and keynote video from five continents.',
  path: '/body-of-work',
  image: '/images/chicago-ballroom.jpg',
});

const books = [
  {
    '@context': 'https://schema.org', '@type': 'Book',
    name: 'Radical Next: Reclaiming Your Humanity in a Post-Human World',
    author: { '@id': `${SITE.url}/#person` },
    isbn: '9798891382480', datePublished: '2025-02-11',
    publisher: { '@type': 'Organization', name: 'Amplify Publishing' },
    bookFormat: 'https://schema.org/Hardcover', numberOfPages: 496,
  },
  {
    '@context': 'https://schema.org', '@type': 'Book',
    name: 'Bitcoin Pizza: The No-Bullshit Guide to Blockchain',
    author: { '@id': `${SITE.url}/#person` },
    isbn: '9781544504438', datePublished: '2019-08-13',
    publisher: { '@type': 'Organization', name: 'Machine Elf, LLC' },
    bookFormat: 'https://schema.org/Hardcover', numberOfPages: 356,
  },
];

export default function BodyOfWork() {
  return (
    <>
      <Nav active="Body of Work" />
      <main id="main">
        {books.map((b) => <JsonLd data={b} key={b.isbn} />)}
        <PhotoHero
          image="chicago-ballroom.jpg"
          eyebrow="Body of Work"
          short
          lead={<>Two #1 bestsellers. An investigative production and the institute behind it. Patents, inventions, and a stage archive spanning five continents. <strong>This is the work behind the keynote.</strong></>}
          cta={<Link href="#books" className="btn btn-mint">The books ↓</Link>}
          caption="Chicago"
        >
          Built across <span className="mint-fill">decades</span> &amp; disciplines.
        </PhotoHero>

        <section className="work" id="books">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Books</div>
              <h2 className="h2">Two #1 <span className="mint-fill">bestsellers.</span></h2>
            </div>
            <div className="split-grid" style={{ alignItems: 'start' }}>
              <div>
                <div className="book-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/book-radical-next.png" alt="Radical Next" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/book-plant.jpg" alt="" style={{ aspectRatio: 1, objectFit: 'cover' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/book-holding.jpg" alt="" style={{ aspectRatio: 1, objectFit: 'cover' }} />
                </div>
              </div>
              <div>
                <div className="tag mint">2025 · Amplify · ISBN 979-8-89138-248-0</div>
                <h3 className="h3" style={{ marginBottom: 20 }}>Radical Next: Reclaiming Your Humanity in a Post-Human World</h3>
                <div className="split-body">
                  <p>As humans merge ever more deeply with technologies that seem to be advancing impossibly fast, we have entered a new era, the Age of Acceleration, that will call our very humanity into question. Are you ready for what comes next?</p>
                  <p>Drawing from cutting-edge science and deep personal experience, <strong>Radical Next</strong> is both a forward-thinking manual for deprogramming from the conventional operating systems that have defined us for centuries and a provocative call to action to shape a future that is balanced, connected, and profoundly human.</p>
                </div>
                <a href="https://www.amazon.com/Radical-Next-Reclaiming-Humanity-Post-Human/dp/B0DGV4265T" className="btn btn-ink">Buy the book →</a>
              </div>
            </div>

            <div className="split-grid flip" style={{ alignItems: 'start', marginTop: 96 }}>
              <div className="book-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/book-bitcoin-pizza.png" alt="Bitcoin Pizza" />
              </div>
              <div>
                <div className="tag mint">2019 · ISBN 978-1-5445-0443-8</div>
                <h3 className="h3" style={{ marginBottom: 20 }}>Bitcoin Pizza: The No-Bullshit Guide to Blockchain</h3>
                <div className="split-body">
                  <p>Whether you&apos;re a business leader preparing for a decentralized future or simply curious about blockchain, this guide will boost your confidence and enthusiasm, offering a broader perspective that makes the technology&apos;s possibilities exciting rather than intimidating.</p>
                  <p>Published under Samantha Radocchia.</p>
                </div>
                <a href="https://www.amazon.com/Bitcoin-Pizza-No-Bullshit-Guide-Blockchain/dp/1544504438" className="btn btn-ink">Buy the book →</a>
              </div>
            </div>
          </div>
        </section>

        <CtaBreak
          image="illicit-shadows-whitehouse.jpg" id="illicit"
          tag="Productions"
          heading={<>Illicit <span className="mint-fill">Shadows.</span></>}
          lead="An investigative documentary series exploring the dark forces shaping the global criminal underworld, produced by RADOC. Through Illicit Shadows, LLC, Sam co-founded MISTIC, an institute mapping organized crime, emerging technology, and global threat networks, and home to Project Helix: an AI intelligence fusion center and predictive convergence system."
          btn="Explore the production →"
          caption="Illicit Shadows · Washington, DC"
        />

        <Sizzle />

        <YouAreHere
          eyebrow="You are here"
          heading={<>The worldview, <span className="mint-fill">in print.</span></>}
          lead="Radical Next is the Age of Acceleration at book length. The keynote is the same idea, on stage."
          cta={<Link href="/speaking" className="btn btn-mint">The keynote →</Link>}
        />

        <section className="gallery">
          <div className="gallery-head">
            <div className="gal-eyebrow">Photos</div>
            <h2 className="h2">On stage. <span style={{ color: 'var(--mint-deep)' }}>Worldwide.</span></h2>
          </div>
          <div className="gal-grid">
            {[
              ['gp-a', 'headshot.jpg', 'Studio'],
              ['gp-b', 'cta-audience.jpg', 'Bangkok'],
              ['gp-c', 'stage-hrsw.jpg', 'HR Southwest'],
              ['gp-d', 'cta-red.jpg', 'Keynote'],
              ['gp-e', 'backstage.jpg', 'Backstage'],
            ].map(([cls, img, label]) => (
              <div className={`gp ${cls}`} key={img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${img}`} alt={label} />
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
          <div className="more">
            <a href={SITE.social.youtube} className="btn btn-ghost">All videos on YouTube →</a>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="Keynote · 2024"
        />
      </main>
      <Footer />
    </>
  );
}
