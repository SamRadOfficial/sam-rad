import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  PhotoHero, CtaBreak, LogoStrip, IndustryGrid,
  TestimonialBanner, Eras, Bureau, BookBar,
} from '@/components/Blocks';
import IndustryIcon from '@/components/IndustryIcon';
import industries from '@/data/industries.json';
import eras from '@/data/eras.json';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Sam Rad | Change Has a Pattern | Keynote Speaker & Futurist',
  description:
    "Anthropologist, four-time tech founder, and #1 bestselling author. Sam Rad shows leaders the pattern behind every big change, so they're ready for what's next.",
  path: '/',
  image: '/images/hero-work.jpg',
  imageAlt: 'Sam Rad keynoting at the Ivanti Solutions Summit',
});

const featured = industries.filter((i) => i.featuredOrder).sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="hero-work.jpg"
          position="center top"
          eyebrow="The Change Futurist"
          lead={<>See it, and you&apos;re ready for whatever comes next.</>}
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
          caption="Ivanti Solutions Summit"
        >
          Change has<br />a <span className="mint-fill">pattern.</span>
        </PhotoHero>

        <LogoStrip />

        <section className="split white" id="meet">
          <div className="narrow">
            <div className="split-grid">
              <div className="split-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sam Rad" />
              </div>
              <div>
                <div className="tag mint">Meet Sam</div>
                <h2 className="h2" style={{ marginBottom: 32 }}><span className="mint-word">Curiosity</span> of an anthropologist. <span className="mint-word">Instinct</span> of a tech founder. <span className="mint-word">Energy</span> of a rock star.</h2>
                <div className="split-body">
                  <p>Sam Rad is an anthropologist who spent twenty years inside technology revolutions, founding four companies through the rise of e-commerce, blockchain, and AI, and learning one thing above all: <em>change has a pattern.</em></p>
                  <p>With the curiosity of an anthropologist, the instinct of a tech founder, the candor of a friend, and the calm of an ex-competitive skydiver, Sam shows leaders and their teams the pattern behind every big change, so they&apos;re ready for whatever comes next.</p>
                  <p>She says the things other speakers won&apos;t, and she says them with warmth. Her talks lift the overwhelm, hand the room a simple way to read what&apos;s happening, and end on the promise every anxious audience needs to hear: <strong>you&apos;re going to be OK.</strong></p>
                </div>
                <div className="stat-row">
                  <div><div className="n">5</div><div className="l">Continents</div></div>
                  <div><div className="n">50+</div><div className="l">Countries</div></div>
                  <div><div className="n">2×</div><div className="l">#1 Bestsellers</div></div>
                  <div><div className="n">4×</div><div className="l">Founder</div></div>
                </div>
                <Link href="/meet-sam" className="btn btn-ghost">Full bio →</Link>
                <Bureau />
              </div>
            </div>
          </div>
        </section>

        <TestimonialBanner />

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/crn-innovators.jpg" alt="Sam Rad on stage at CITE beside a screen reading The Future Needs Innovators" />
          <div className="cap">CITE · The future needs innovators</div>
        </section>

        <section className="keynote-sec" id="keynote">
          <div className="narrow">
            <div className="tag mint">Speaking · The keynote</div>
            <h2 className="h2">Change has<br />a <span className="mint">pattern.</span></h2>
            <div className="keynote-grid">
              <div>
                <div className="keynote-body">
                  <p>Every powerful new technology is like a jetpack. It promises new heights, and it scares you about where it might take you. Once everyone has one, not having one is how you get left behind. But owning it isn&apos;t the point, and neither is using it. <strong>Steering it is.</strong></p>
                  <p>In <em>Change Has a Pattern</em>, anthropologist and futurist Sam Rad shows audiences the cycle every big change follows, why the new tools aren&apos;t paying off yet, and the four moves that turn the corner. The pattern has repeated through five thousand years of recorded history, which is why the message works in any industry and lands with any room: it is universal, and above all, human.</p>
                  <p>In times of radical disruption there is no roadmap, and what got you here won&apos;t get you there. The natural reaction is to brace. Sam uses history, and a clear look at what&apos;s coming, to make the change feel less daunting. She hands the room the moves to let go of the old way, reset on the real goal, and use the new tools for expansion instead of more of the same.</p>
                  <p>People don&apos;t just walk out ready for what&apos;s next. <strong>They walk out wanting it.</strong></p>
                </div>
                <div style={{ marginTop: 40 }}>
                  <Link href="/speaking" className="btn btn-mint">The full keynote →</Link>
                  <Bureau light />
                </div>
              </div>
              <div>
                <div className="keynote-photo" style={{ marginTop: 0, marginBottom: 32 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/gofest-mindset.jpg" alt="Sam Rad on stage at GOFEST Bogotá" />
                </div>
                <div className="facts">
                  <div className="fact"><div className="n">5,000</div><div className="l">Years of the same pattern</div></div>
                  <div className="fact"><div className="n">4</div><div className="l">Moves that turn the corner</div></div>
                  <div className="fact"><div className="n">Any</div><div className="l">Industry. Any room.</div></div>
                  <div className="fact"><div className="n">1</div><div className="l">Promise: you&apos;re going to be OK</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Eras eras={eras} />

        <CtaBreak
          image="tfwa-cannes-wide.jpg"
          id="trusted"
          tag="Five continents"
          heading={<>Every room is asking the <span className="mint-fill">same</span> question.</>}
          lead="What happens next, and are we ready for it? Sam has answered it for rooms in Cannes, Bogotá, Bangkok, and beyond."
          caption="TFWA 40th · Cannes"
        />

        <section className="industries" id="industries">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Industries</div>
              <h2 className="h2">One keynote.<br />Customized to <span className="mint-fill">your</span> industry.</h2>
              <Link href="/industries" className="sec-link">See all industries →</Link>
            </div>
            <div className="ind-grid">
              {featured.map((ind, i) => (
                <Link className="ind" href={`/industries/${ind.slug}`} key={ind.slug}>
                  <IndustryIcon slug={ind.slug} />
                  <div className="n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="t">{ind.name}</div>
                  <div className="a">See the keynote →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/chicago-ballroom.jpg" alt="Sam Rad keynoting to a full ballroom under chandeliers at CRMC in Chicago" style={{ objectPosition: 'center 26%' }} />
          <div className="cap">CRMC · Chicago</div>
        </section>

        <section className="work" id="work">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Body of Work</div>
              <h2 className="h2">Built across<br /><span className="mint-fill">decades</span> &amp; disciplines.</h2>
            </div>
            <div className="work-grid">
              {[
                ['Books', 'Radical Next', '#1 bestseller. Reclaiming your humanity in a post-human world.', 'book', '/images/book-radical-next.png', 'Read', '/body-of-work#radical-next'],
                ['Books', 'Bitcoin Pizza', 'The no-bullshit guide to blockchain. Bestselling primer on Web3.', 'book', '/images/book-bitcoin-pizza.png', 'Read', '/body-of-work#bitcoin-pizza'],
                ['Productions', 'Illicit Shadows', 'An investigative documentary series on the forces shaping the global criminal underworld, and the institute mapping them.', 'c3', '/images/illicit-shadows-whitehouse.jpg', 'Explore', '/body-of-work#illicit'],
                ['Media', 'On Stage', 'Keynotes, panels, and interviews from Dell Technologies World, TFWA, Cisco Live, GOFEST, and more.', 'c4', '/images/gofest-mindset-portrait.jpg', 'Watch', '/body-of-work#media'],
              ].map(([eyebrow, title, desc, cover, img, link, href]) => (
                <Link className="work-card" href={href} key={title}>
                  <div className={`work-cover ${cover}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} />
                  </div>
                  <div className="work-body">
                    <div className="work-eyebrow">{eyebrow}</div>
                    <h3 className="work-title">{title}</h3>
                    <p className="work-desc">{desc}</p>
                    <span className="work-link">{link}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <BookBar
          deep
          text="Sam doesn't just predict the future. She lives in it."
          sub="Twenty years inside four technology revolutions. Now she hands the room the map."
        />

        <section className="stats desktop-only">
          <div className="stats-grid">
            <div className="stat"><div className="n">5</div><div className="l">Continents</div></div>
            <div className="stat"><div className="n">50+</div><div className="l">Countries</div></div>
            <div className="stat"><div className="n">2×</div><div className="l">#1 Bestsellers</div></div>
            <div className="stat"><div className="n">4×</div><div className="l">Tech Founder</div></div>
          </div>
        </section>

        <section className="gallery">
          <div className="gallery-head">
            <div className="gal-eyebrow">From the road</div>
            <h2 className="h2">On stage. <span style={{ color: 'var(--mint-deep)' }}>Worldwide.</span></h2>
          </div>
          <div className="gal-grid">
            {[
              ['gp-h', 'gofest-faster-horses.jpg', 'GOFEST 2026 · Bogotá'],
              ['gp-a', 'stage-hrsw.jpg', 'HR Southwest · Fort Worth'],
              ['gp-b', 'panel-dell.jpg', 'Dell Technologies World'],
              ['gp-c', 'cta-red.jpg', 'CITE'],
              ['gp-d', 'hillary-tfwa.jpg', 'TFWA 40th · with Hillary Clinton'],
              ['gp-e', 'neil-degrasse-tyson.jpg', 'Dell Technologies World · with Neil deGrasse Tyson'],
              ['gp-f', 'cisco-live.jpg', 'Cisco Live · IT Leadership'],
              ['gp-g', 'chicago-ballroom.jpg', 'CRMC · Chicago'],
            ].map(([cls, img, label]) => (
              <div className={`gp ${cls}`} key={img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${img}`} alt={label} />
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <CtaBreak
          image="gofest-faster-horses.jpg"
          center
          bureau
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="GOFEST 2026 · Bogotá"
        />
      </main>
      <Footer />
    </>
  );
}
