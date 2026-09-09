import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, Sizzle, JsonLd } from '@/components/Blocks';
import { meta, SITE } from '@/lib/site';


const EMBEDS = [
  { show: 'POLITICO Tech', title: "A futurist's take on institutional power in a post-human world",
    url: 'https://open.spotify.com/embed/episode/0SLp31uYGxR9WZRZgZlpEH' },
  { show: 'Leaders of AI', title: 'AI, Ego Death, and the End of Reality?',
    url: 'https://open.spotify.com/embed/episode/1HupFJHkD9sC9rGAfllynr' },
  { show: 'The Quiet Professional', title: 'Illicit Shadows: Criminal Networks Shape the Global Underworld',
    url: 'https://open.spotify.com/embed/episode/2kOVEDDPvuKh3P1VZlXTqU' },
];

const HIGHLIGHTS = [
  { outlet: 'POLITICO Tech', title: "A futurist's take on institutional power in a post-human world", year: '2025',
    url: 'https://open.spotify.com/episode/0SLp31uYGxR9WZRZgZlpEH' },
  { outlet: 'TFWA Cannes', title: 'Keynote programme alongside Hillary Clinton', year: '2024',
    url: 'https://www.trbusiness.com/regional-news/international/hillary-clinton-to-deliver-keynote-at-20' },
  { outlet: 'Dell Technologies', title: 'Innovation or Irritation? The future of disruptive technologies', year: '2023',
    url: 'https://www.dell.com/en-us/perspectives/innovation-or-irritation-the-future-of-new-and-disrupti' },
  { outlet: 'TechCrunch', title: 'LOVE unveils a modern video messaging app', year: '2021',
    url: 'https://techcrunch.com/2021/08/25/love-unveils-a-modern-video-messaging-app-with-a-business-mod' },
  { outlet: 'Newsweek', title: 'Blockchain Impact Award winner', year: '2019',
    url: 'https://www.newsweek.com/2019/03/08/introducing-blockchain-impact-award-winner-chronicled-13393' },
  { outlet: 'The New York Times', title: 'Beyond the Bitcoin Bubble', year: '2018',
    url: 'https://mobile.nytimes.com/2018/01/16/magazine/beyond-the-bitcoin-bubble.html' },
  { outlet: 'Fortune', title: 'MediLedger tracks meds', year: '2017',
    url: 'http://fortune.com/2017/09/21/pharma-blockchain/' },
  { outlet: 'Forbes', title: '30 Under 30, Enterprise Technology', year: '2017',
    url: 'https://www.forbes.com/30-under-30-2017/enterprise-technology/' },
];

export const metadata = meta({
  title: 'Body of Work | Books, Productions & Media',
  description: 'Radical Next, Bitcoin Pizza, Illicit Shadows, MISTIC, and keynote video from five continents.',
  path: '/body-of-work',
  image: '/images/hero-foresight.jpg',
  imageAlt: 'Sam Rad keynoting at the Ivanti Solutions Summit in front of a projected map',
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
          image="hero-foresight.jpg"
          eyebrow="Body of Work"
          short
          lead={<>Two #1 bestsellers. An investigative production and the institute behind it. Patents, inventions, and a stage archive spanning five continents. <strong>This is the work behind the keynote.</strong></>}
          cta={<Link href="#books" className="btn btn-mint">The books ↓</Link>}
          caption="Ivanti Solutions Summit"
        >
          Built across <span className="mint-fill">decades</span> &amp; disciplines.
        </PhotoHero>

        <section className="work" id="books">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Books</div>
              <h2 className="h2">Two #1 <span className="mint-fill">bestsellers.</span></h2>
            </div>
            <div className="split-grid" id="radical-next" style={{ alignItems: 'start' }}>
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
                <div className="tag mint">2025</div>
                <h3 className="h3" style={{ marginBottom: 10 }}>Radical Next: Reclaiming Your Humanity in a Post-Human World</h3>
                <div className="book-meta">Amplify · ISBN 979-8-89138-248-0</div>
                <div className="split-body">
                  <p>As humans merge ever more deeply with technologies that seem to be advancing impossibly fast, we have entered a new era, the Age of Acceleration, that will call our very humanity into question. Are you ready for what comes next?</p>
                  <p>Drawing from cutting-edge science and deep personal experience, <strong>Radical Next</strong> is both a forward-thinking manual for deprogramming from the conventional operating systems that have defined us for centuries and a provocative call to action to shape a future that is balanced, connected, and profoundly human.</p>
                </div>
                <a href="https://www.amazon.com/Radical-Next-Reclaiming-Humanity-Post-Human/dp/B0DGV4265T" className="btn btn-ink" target="_blank" rel="noopener noreferrer">Buy on Amazon →</a>
              </div>
            </div>

            <div className="split-grid flip" id="bitcoin-pizza" style={{ alignItems: 'start', marginTop: 96 }}>
              <div className="book-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/book-bitcoin-pizza.png" alt="Bitcoin Pizza" />
              </div>
              <div>
                <div className="tag mint">2019</div>
                <h3 className="h3" style={{ marginBottom: 10 }}>Bitcoin Pizza: The No-Bullshit Guide to Blockchain</h3>
                <div className="book-meta">ISBN 978-1-5445-0443-8</div>
                <div className="split-body">
                  <p>Whether you&apos;re a business leader preparing for a decentralized future or simply curious about blockchain, this guide will boost your confidence and enthusiasm, offering a broader perspective that makes the technology&apos;s possibilities exciting rather than intimidating.</p>
                  <p>Published under Samantha Radocchia.</p>
                </div>
                <a href="https://www.amazon.com/Bitcoin-Pizza-No-Bullshit-Guide-Blockchain/dp/1544504438" className="btn btn-ink" target="_blank" rel="noopener noreferrer">Buy on Amazon →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="work" id="press" style={{ background: 'var(--paper-white)' }}>
          <div className="wide">
            <div className="tag">Press &amp; podcasts</div>
            <h2 className="h2">Covered on <span className="mint-fill">the record.</span></h2>

            <div className="emb3">
              {EMBEDS.map((e) => (
                <iframe
                  key={e.url}
                  src={e.url}
                  loading="lazy"
                  title={`${e.show}: ${e.title}`}
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              ))}
            </div>

            <div className="subh">Selected coverage</div>
            <div className="mlist bordered">
              {HIGHLIGHTS.map((h) => (
                <a className="mrow" href={h.url} target="_blank" rel="noopener noreferrer" key={h.url}>
                  <span className="out">{h.outlet}</span>
                  <span className="ttl">{h.title}</span>
                  <span className="yrc">{h.year}</span>
                  <span className="arw">→</span>
                </a>
              ))}
            </div>

            <div className="press-foot">
              <div className="bureau-line">
                Former <a href={SITE.social.forbes} target="_blank" rel="noopener noreferrer">Forbes contributor</a>.
              </div>
              <div className="press-btns">
                <Link href="/press" className="btn btn-ink">All press →</Link>
                <Link href="/podcasts" className="btn btn-ghost">All podcasts →</Link>
              </div>
            </div>
          </div>
        </section>

        <CtaBreak
          image="illicit-shadows-whitehouse.jpg" id="illicit"
          tag="Productions"
          heading={<>Illicit <span className="mint-fill">Shadows.</span></>}
          lead="An investigative documentary series exploring the dark forces shaping the global criminal underworld, produced by RADOC. Through Illicit Shadows, LLC, Sam co-founded MISTIC, an institute mapping organized crime, emerging technology, and global threat networks, and home to Project Helix: an AI intelligence fusion center and predictive convergence system."
          href={SITE.social.illicitShadows}
          external
          btn="Visit Illicit Shadows →"
          caption="Illicit Shadows · Washington, DC"
        />

        <div id="media"><Sizzle /></div>

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gofest-faster-horses.jpg" alt="Sam Rad keynoting to a full auditorium at GOFEST in Bogota" style={{ objectPosition: 'center 45%' }} />
          <div className="cap">GOFEST 2026 · Bogotá</div>
        </section>

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
              ['gp-d', 'cta-red.jpg', 'CITE'],
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
            <a href={SITE.social.youtube} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">All videos on YouTube →</a>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
