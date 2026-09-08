import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, IndustryGrid, DispatchList } from '@/components/Blocks';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Industries | Change Impacting Your Industry',
  description: 'One keynote, built for twenty industries. Sam Rad maps the forces reshaping your world and the four moves that turn the corner.',
  path: '/industries',
  image: '/images/hero-industries.jpg',
  imageAlt: 'Sam Rad keynoting in a red suit at the Stansberry Conference in Boston',
});

export default function Industries() {
  return (
    <>
      <Nav active="Industries" />
      <main id="main">
        <PhotoHero
          image="hero-industries.jpg"
          eyebrow="Industries"
          short
          lead={<>The same pattern has reshaped every industry for five thousand years. Sam builds each keynote around the forces reshaping yours, so it lands as your story, not a generic future.</>}
          caption="Stansberry Conference · Boston"
        >
          Change impacting<br /><span className="mint-fill">your</span> industry.
        </PhotoHero>

        <section className="industries">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Choose your industry</div>
              <h2 className="h2">The keynote, built for <span className="mint-fill">your</span> world.</h2>
            </div>
            <IndustryGrid industries={industries} total={industries.length} />
          </div>
        </section>

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gofest-venue.jpg" alt="The GOFEST 2026 conference venue in Bogota" />
          <div className="cap">GOFEST 2026 · Bogotá</div>
        </section>

        <section className="dispatches">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Writing</div>
              <h2 className="h2">Latest across<br />all <span className="mint-fill">industries.</span></h2>
            </div>
            <DispatchList dispatches={dispatches} />
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau
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
