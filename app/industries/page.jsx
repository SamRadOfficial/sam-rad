import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, YouAreHere, CtaBreak, IndustryGrid, DispatchList } from '@/components/Blocks';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Industries | Change Impacting Your Industry',
  description: 'One keynote, built for twenty industries. Sam Rad maps the forces reshaping your world and the four moves that turn the corner.',
  path: '/industries',
});

export default function Industries() {
  return (
    <>
      <Nav active="Industries" />
      <main id="main">
        <PhotoHero
          image="gofest-faster-horses.jpg"
          eyebrow="Industries"
          short
          lead={<>The same pattern has reshaped every industry for five thousand years. Sam builds each keynote around the forces reshaping yours, so it lands as your story, not a generic future.</>}
          caption="GOFEST 2026 · Bogotá"
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

        <YouAreHere
          eyebrow="You are here"
          heading={<>Same pattern. <span className="mint-fill">Your</span> industry.</>}
          lead="Each page carries the keynote framed for that audience, the three forces Sam maps on stage, and everything a booker needs to say yes."
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
        />

        <section className="dispatches">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Foresight</div>
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
          caption="Keynote · 2024"
        />
      </main>
      <Footer />
    </>
  );
}
