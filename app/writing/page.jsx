import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, IndustryGrid, DispatchList } from '@/components/Blocks';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import { meta } from '@/lib/site';

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
          cta={<Link href="#latest" className="btn btn-mint">Latest dispatches ↓</Link>}
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
              <div className="tag">Browse by industry</div>
              <h2 className="h2">Twenty industries. <span className="mint-fill">One</span> lens.</h2>
            </div>
            <IndustryGrid industries={industries} cta="Dispatches + keynote →" />
          </div>
        </section>

        <CtaBreak
          image="hero-work.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="Ivanti Solutions Summit"
        />
      </main>
      <Footer />
    </>
  );
}
