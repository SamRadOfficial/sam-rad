import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  PhotoHero, YouAreHere, CtaBreak, LogoStrip, IndustryGrid, DispatchList,
  Testimonials, TestimonialBanner, Eras, Bureau, BookBar,
} from '@/components/Blocks';
import IndustryIcon from '@/components/IndustryIcon';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import testimonials from '@/data/testimonials.json';
import eras from '@/data/eras.json';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Sam Rad | Change Has a Pattern | Keynote Speaker & Futurist',
  description:
    "Anthropologist, four-time tech founder, and #1 bestselling author. Sam Rad shows leaders the pattern behind every big change, so they're ready for what's next.",
  path: '/',
});

const featured = industries.filter((i) => i.featuredOrder).sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="hero-work.jpg"
          eyebrow="The Change Futurist"
          descriptors={<>Anthropologist <span className="dot">·</span> 4× Tech Founder <span className="dot">·</span> #1 Bestselling Author</>}
          lead={<>See it, and you&apos;re ready for whatever comes next.</>}
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
          caption="Ivanti Solutions Summit"
        >
          Change has<br />a <span className="mint-fill">pattern.</span>
        </PhotoHero>

        <section className="logo-divider" style={{ padding: '72px 0', background: 'var(--paper-soft)' }}>
          <div className="wide">
            <div className="lbl">Trusted by governments, Fortune 500s, and global institutions</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logos-past-audiences.png" alt="Past audiences include Dell, Pfizer, BMW, Cisco, MIT, the Federal Reserve, SAP, Columbia University, Nestlé, Coca-Cola, Pinterest, ICI, Audible, JLL, the World Economic Forum, GE, Whirlpool, the United Nations, Unilever, P&G, IBM, Gobierno de México, LinkedIn, and LVMH" />
          </div>
        </section>

        <section className="split white" id="meet">
          <div className="narrow">
            <div className="split-grid">
              <div className="split-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sam Rad" />
              </div>
              <div>
                <div className="tag mint">Meet Sam</div>
                <h2 className="h2" style={{ marginBottom: 32 }}>Curiosity of an anthropologist. Grit of a tech founder. <span className="mint-fill">Energy</span> of a rock star.</h2>
                <div className="split-body">
                  <p>Sam Rad is an anthropologist who spent twenty years inside technology revolutions, founding four companies through the rise of e-commerce, blockchain, and AI, and learning one thing above all: <em>change has a pattern.</em></p>
                  <p>With the curiosity of an anthropologist, the grit of a tech founder, the candor of a friend, and the calm of an ex-professional skydiver, Sam shows leaders and their teams the pattern behind every big change, so they&apos;re ready for whatever comes next.</p>
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

        <section className="split">
          <div className="narrow">
            <div className="split-grid flip">
              <div className="split-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/skydive-exit.jpg" alt="Sam Rad exiting an aircraft as a competitive skydiver" />
              </div>
              <div>
                <div className="tag">Where the calm comes from</div>
                <h2 className="h2" style={{ marginBottom: 32 }}>Hundreds of jumps. <span className="mint-fill">One</span> lesson.</h2>
                <div className="split-body">
                  <p>Before the boardrooms, Sam was a competitive skydiver. Hundreds of jumps that funded her first company while she was still in college.</p>
                  <p>It&apos;s where the keynote&apos;s jetpack metaphor comes from, and it&apos;s why the &ldquo;you&apos;re going to be OK&rdquo; at the end lands. She isn&apos;t reassuring the room from the ground. <strong>She&apos;s telling them what it looks like from the 14,000 foot view.</strong></p>
                </div>
                <Link href="/meet-sam" className="btn btn-ghost">The full story →</Link>
              </div>
            </div>
          </div>
        </section>

        <TestimonialBanner />

        <BookBar
          mint
          text="Sam doesn't just predict the future. She lives in it."
          sub="Twenty years inside four technology revolutions. Now she hands the room the map."
        />

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
          tag="Trusted worldwide"
          heading={<>Governments. Fortune 500s. <span className="mint-fill">Global</span> institutions.</>}
          lead="Five continents. Two decades. One question every room is asking: what happens next, and are we ready for it?"
          caption="TFWA 40th · Cannes"
        />

        <section className="industries" id="industries">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Industries</div>
              <h2 className="h2">One keynote.<br />Customized to <span className="mint-fill">your</span> industry.</h2>
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
              <Link className="ind custom" href="/industries">
                <IndustryIcon slug="custom" />
                <div className="n">All 20</div>
                <div className="t">See every industry.</div>
                <div className="a">Industries →</div>
              </Link>
            </div>
          </div>
        </section>

        <YouAreHere
          eyebrow="The Age of Acceleration"
          heading={<>You are <span className="mint-fill">here.</span></>}
          lead="Every era gets a name, a date range, and a jetpack. This is the one you're living in. The pattern says what comes next."
          cta={<Link href="/speaking" className="btn btn-mint">See the pattern →</Link>}
        />

        <section className="dispatches" id="foresight">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Foresight</div>
              <h2 className="h2">Latest dispatches<br />from the <span className="mint-fill">frontier.</span></h2>
            </div>
            <DispatchList dispatches={dispatches} />
            <div className="more"><Link href="/foresight" className="btn btn-ghost">All dispatches →</Link></div>
          </div>
        </section>

        <BookBar
          deep
          text="Ready when you are."
          sub="Tell us about the room and we'll be in touch within one business day."
          cta="Check a date →"
        />

        <section className="quote">
          <div className="narrow">
            <h2 className="q">The future belongs to the pattern breakers.</h2>
            <div className="a">Sam Rad</div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Body of Work</div>
              <h2 className="h2">Built across<br /><span className="mint-fill">decades</span> &amp; disciplines.</h2>
            </div>
            <div className="work-grid">
              {[
                ['Books', 'Radical Next', '#1 bestseller. Reclaiming your humanity in a post-human world.', 'book', '/images/book-radical-next.png', 'Read'],
                ['Books', 'Bitcoin Pizza', 'The no-bullshit guide to blockchain. Bestselling primer on Web3.', 'book', '/images/book-bitcoin-pizza.png', 'Read'],
                ['Productions', 'Illicit Shadows', 'An investigative documentary series on the forces shaping the global criminal underworld, and the institute mapping them.', 'c3', '/images/illicit-shadows-whitehouse.jpg', 'Explore'],
                ['Media', 'On Stage', 'Keynotes, panels, and interviews from Dell Technologies World, TFWA, Cisco Live, GOFEST, and more.', 'c4', '/images/gofest-mindset-portrait.jpg', 'Watch'],
              ].map(([eyebrow, title, desc, cover, img, link]) => (
                <Link className="work-card" href="/body-of-work" key={title}>
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
          mint
          text="The worldview in print. The keynote, live."
          sub="Radical Next is the Age of Acceleration at book length. Bring the stage version to your room."
          cta="Book the keynote →"
        />

        <section className="stats">
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
              ['gp-c', 'cta-red.jpg', 'CRN · Keynote'],
              ['gp-d', 'hillary-tfwa.jpg', 'TFWA 40th · with Hillary Clinton'],
              ['gp-e', 'neil-degrasse-tyson.jpg', 'With Neil deGrasse Tyson'],
              ['gp-f', 'cisco-live.jpg', 'Cisco Live · IT Leadership'],
              ['gp-g', 'chicago-ballroom.jpg', 'Chicago'],
            ].map(([cls, img, label]) => (
              <div className={`gp ${cls}`} key={img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${img}`} alt={label} />
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">What people say</div>
              <h2 className="h2">What audiences<br />say <span className="mint-fill">afterward.</span></h2>
            </div>
            <Testimonials items={testimonials} />
          </div>
        </section>

        <CtaBreak
          image="gofest-faster-horses.jpg"
          center
          bureau
          tag="Book Sam Rad"
          heading={<>Your people are facing change. Let&apos;s make sure they walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when your people are facing change and you need them to walk out ready for it. You're going to be OK."
          caption="GOFEST 2026 · Bogotá"
        />
      </main>
      <Footer />
    </>
  );
}
