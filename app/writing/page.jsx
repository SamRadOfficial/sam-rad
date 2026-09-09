import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, IndustryGrid, DispatchList } from '@/components/Blocks';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import { meta, SITE } from '@/lib/site';


const FORBES_PICKS = [
  { year: '2018', title: 'Fighting fakes with blockchain: making anti-counterfeiting effective for luxury goods',
    url: 'https://www.forbes.com/sites/samantharadocchia/2018/10/16/fighting-fakes-with-blockchain-how-to-make-anti-counterfeiting-methods-effective-for-luxury-goods/' },
  { year: '2018', title: 'Combating illicit markets with blockchain: smart supply chain solutions',
    url: 'https://www.forbes.com/sites/samantharadocchia/2018/07/03/combating-illicit-markets-with-blockchain-smart-supply-chains-solutions/' },
  { year: '2019', title: 'Why identity fluidity and self-sovereignty matter in a virtually mediated future',
    url: 'https://www.forbes.com/sites/samantharadocchia/2019/03/19/why-identity-fluidity-and-self-sovereignty-is-important-in-a-virtually-mediated-future/' },
  { year: '2018', title: '50% of the US workforce will soon be remote. How founders can manage flexible working',
    url: 'https://www.forbes.com/sites/samantharadocchia/2018/07/31/50-of-the-us-workforce-will-soon-be-remote-heres-how-founders-can-manage-flexible-working-styles/' },
  { year: '2018', title: 'Why emerging technology needs to retain a human element',
    url: 'https://www.forbes.com/sites/samantharadocchia/2018/08/06/why-emerging-technology-needs-to-retain-a-human-element/' },
  { year: '2018', title: 'How non-fungible tokens from physical collectibles are strengthening asset-backed securities',
    url: 'https://www.forbes.com/sites/samantharadocchia/2018/07/05/how-non-fungible-tokens-from-physical-collectibles-are-strengthening-asset-backed-securities/' },
];

export const metadata = meta({
  title: 'Writing | Dispatches from the Frontier',
  description: 'Essays on perception, technology, and change. Some written this year, some a decade ago. The pattern was always the same.',
  path: '/writing',
  image: '/images/cta-audience.jpg',
  imageAlt: 'Sam Rad keynoting to a seated audience in Bangkok',
});

export default function Writing() {
  return (
    <>
      <Nav active="Writing" />
      <main id="main">
        <PhotoHero
          image="cta-audience.jpg"
          eyebrow="Writing · You are here"
          short
          lead={<>Essays on perception, technology, and change. Some written this year, some a decade ago. <strong>The pattern was always the same.</strong></>}
          caption="Bangkok"
        >
          Dispatches from<br />the <span className="mint-fill">frontier.</span>
        </PhotoHero>

        <section className="dispatches" id="latest">
          <div className="narrow">
            <div className="disp-head" style={{ marginBottom: 48 }}>
              <h2 className="h2">Latest <span className="mint-fill">dispatches.</span></h2>
            </div>
            <DispatchList dispatches={dispatches.filter((d) => !d.archived)} />
          </div>
        </section>

        <section className="fb-block">
          <div className="wide">
            <div className="fb-head">
              <div className="tag">Contributor · 2017–2020</div>
              <a
                className="fb-logo"
                href={SITE.social.forbes}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sam Rad's author page on Forbes"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/forbes.png" alt="Forbes" />
                <span className="fb-mark-cta">
                  forbes.com/sites/samantharadocchia<span className="ext" aria-hidden="true" />
                </span>
              </a>
            </div>
            <p>
              Sam wrote for Forbes between 2017 and 2020, publishing over fifty pieces on the
              intersection of emerging technology and cultural trends, from supply chain provenance
              and environmental crime to remote work and digital identity.
            </p>
            <div className="fb-list">
              {FORBES_PICKS.map((f) => (
                <a href={f.url} target="_blank" rel="noopener noreferrer" key={f.url}>
                  <span>{f.title}</span><em>{f.year}</em>
                </a>
              ))}
            </div>
            <div className="fb-btns">
              <a
                className="btn btn-ink"
                href={SITE.social.forbes}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Forbes<span className="ext" aria-hidden="true" />
              </a>
              <Link href="/press#bylines" className="btn btn-ghost">All 64 bylines</Link>
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-audience.jpg"
          tag="Bring change to your stage"
          heading={<>Read it here. <span className="mint-fill">Hear</span> it live.</>}
          lead="Every dispatch is a preview of the keynote. Book Sam to bring the full pattern to your audience."
          caption="Federation of Thai Industries · Bangkok"
        />

        <section className="industries">
          <div className="narrow">
            <div className="section-header">
              <div className="sh-copy"><div className="tag">Browse by industry</div>
              <h2 className="h2">Every industry. <span className="mint-fill">One</span> lens.</h2></div>
              <Link href="/industries" className="sec-link">See all industries</Link>
            </div>
            <IndustryGrid industries={industries} />
          </div>
        </section>

        <CtaBreak
          image="hero-work.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want the room to walk out inspired to shape what comes next."
          caption="Ivanti Solutions Summit"
        />
      </main>
      <Footer />
    </>
  );
}
