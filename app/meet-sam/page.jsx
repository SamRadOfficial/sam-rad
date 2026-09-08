import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, YouAreHere, CtaBreak, TestimonialBanner, Bureau } from '@/components/Blocks';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Meet Sam | Sam Rad, The Change Futurist',
  description: 'Sam Rad (born Samantha Radocchia) is an anthropologist, four-time tech founder, inventor, and #1 bestselling author of Radical Next.',
  path: '/meet-sam',
  image: '/images/cisco-live.jpg',
});

const PATENTS = [
  ['Open Registry for Identity of Things', 'Registering and verifying physical objects on a shared, tamper-resistant ledger. Granted as US 11,354,676. Foundational work for provenance and digital twins.', 'US 2016/0358186', 'https://patents.google.com/patent/US20160358186A1/en'],
  ['Open Registry for Internet of Things', 'Extending the registry model to connected devices and sensors, linking physical assets to verifiable digital identities.', 'US 2017/0300928', 'https://patents.google.com/patent/US20170300928A1/en'],
  ['Open Registry for Provenance and Tracking of Goods in the Supply Chain', 'Chain-of-custody and authenticity for goods moving through global supply chains. The work Chronicled was built on.', 'US 2018/0108024', 'https://patents.google.com/patent/US20180108024A1/en'],
  ['Early protocols behind ERC-721', 'Non-fungible, uniquely identifiable digital assets, developed at Chronicled, that fed into what became the ERC-721 standard.', '2016–2017', null],
];

export default function MeetSam() {
  return (
    <>
      <Nav active="Meet Sam" />
      <main id="main">
        <PhotoHero
          image="cisco-live.jpg"
          eyebrow="Meet Sam"
          short
          lead={<>Anthropologist. Four-time tech founder. #1 bestselling author. Twenty years inside technology revolutions, and one lesson above all: <strong>change has a pattern.</strong></>}
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
          caption="Cisco Live · IT Leadership Program"
        >
          The change <span className="mint-fill">futurist.</span>
        </PhotoHero>

        <section className="split white">
          <div className="narrow">
            <div className="split-grid">
              <div className="split-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Sam Rad" />
              </div>
              <div>
                <div className="tag mint">Biography</div>
                <h2 className="h2" style={{ marginBottom: 32 }}><span className="mint-fill">Curiosity</span> of an anthropologist. <span className="mint-fill">Instinct</span> of a tech founder. <span className="mint-fill">Energy</span> of a rock star.</h2>
                <div className="split-body">
                  <p>Sam Rad (born Samantha Radocchia) is an anthropologist who spent twenty years inside technology revolutions, founding four companies through the rise of e-commerce, blockchain, and AI, and learning one thing above all: <em>change has a pattern.</em></p>
                  <p>With the curiosity of an anthropologist, the instinct of a tech founder, the candor of a friend, and the calm of an ex-professional skydiver, Sam shows leaders and their teams the pattern behind every big change, so they&apos;re ready for whatever comes next.</p>
                  <p>She says the things other speakers won&apos;t, and she says them with warmth. Her talks lift the overwhelm, hand the room a simple way to read what&apos;s happening, and end on the promise every anxious audience needs to hear: <strong>you&apos;re going to be OK.</strong></p>
                  <p>Managed by <a href={SITE.bureau.mailto}>Brandy Gibson</a> at <a href={SITE.bureau.orgUrl}>Executive Speakers Bureau</a>, Sam Rad is the speaker you book when your people are facing change and you need them to walk out ready for it.</p>
                </div>
                <div className="stat-row">
                  <div><div className="n">5</div><div className="l">Continents</div></div>
                  <div><div className="n">50+</div><div className="l">Countries</div></div>
                  <div><div className="n">2×</div><div className="l">#1 Bestsellers</div></div>
                  <div><div className="n">4×</div><div className="l">Founder</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialBanner />

        <section className="prose">
          <div className="narrow">
            <div className="prose-grid">
              <div className="prose-body">
                <h3 style={{ marginTop: 0 }}>The technologist</h3>
                <p>Trained in anthropology and linguistics, Sam focused her research on simulated realities, cognitive security, and post-human society. She was among the first anthropologists to live inside the virtual world Second Life in 2009, and in 2020 she deepfaked herself in a project called SamRad.AI. She calls herself an archaeologist of the future: applying an ethnographic approach to envisioning what comes next.</p>
                <p>A four-time entrepreneur, she co-founded <a href="https://www.youm.ai/">NYOUM (YOUM.AI)</a>, a London-based generative AI communication platform, and Chronicled, a San Francisco blockchain company bringing trust to global commerce and supply chains. Prior to Chronicled, Sam founded two companies leveraging AI to map personal taste.</p>

                <h3>The inventor</h3>
                <p>Sam holds a family of patents linking the physical and digital worlds, all filed at Chronicled with co-inventors David Aho, Ryan Orr, and Maurizio Greco, and is noted for early blockchain protocols that contributed to ERC-721, the standard behind NFTs.</p>
                <div className="inv-list">
                  {PATENTS.map(([t, d, num, href]) => (
                    <div className="inv" key={t}>
                      <div>
                        <div className="t">{t}</div>
                        <div className="d">{d}</div>
                      </div>
                      <div className="n">{href ? <a href={href}>{num}</a> : num}</div>
                    </div>
                  ))}
                </div>

                <h3>The author and producer</h3>
                <p>She is the author of two #1 bestselling books, <strong>Radical Next: Reclaiming Your Humanity in a Post-Human World</strong> (2025) and <strong>Bitcoin Pizza: The No-Bullshit Guide to Blockchain</strong> (2019), and the founder of <strong>RAD Original Creations (RADOC)</strong>, a next-generation media studio producing stories that shape a better future.</p>
                <p>RADOC is the producer of <strong>Illicit Shadows</strong>, an investigative documentary series exploring the dark forces shaping the global criminal underworld. Through Illicit Shadows, LLC, Sam co-founded <strong>MISTIC</strong>, the Illicit Shadows Media, Technology, and Innovation Convergence institute, mapping where organized crime, emerging technology, and global threat networks intersect. MISTIC is home to <strong>Project Helix</strong>, an AI intelligence fusion center and predictive convergence system. She also coined <strong>perceptual security</strong>, a framework for protecting human judgment, trust, and decision-making in an era of synthetic media and AI.</p>

                <h3>The speaker</h3>
                <p>A Forbes 30 Under 30 honoree and former Forbes contributor, Sam has keynoted on five continents and advised the United Nations, the World Economic Forum, and the Federal Reserve Bank. True to her &ldquo;Rad&rdquo; name, she is no stranger to risk: hundreds of jumps as an ex-competitive skydiver, and the calm that comes with it.</p>
              </div>
              <aside className="side">
                <div className="side-card">
                  <div className="h">Credentials</div>
                  <ul>
                    <li>Forbes 30 Under 30 (2017)</li>
                    <li>Inventor · Patents in IoT + cryptography</li>
                    <li>2× #1 Bestselling Author</li>
                    <li>Four-time tech founder</li>
                    <li>Advisor: UN · WEF · Federal Reserve</li>
                    <li>Keynoted on five continents</li>
                    <li>Early protocols behind ERC-721</li>
                  </ul>
                  <Link href="/book" className="btn btn-ink">Book Sam →</Link>
                  <Bureau />
                </div>
                <div className="side-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/stage-white.jpg" alt="Sam Rad on stage" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/plane-window.jpg" alt="Sam Rad pointing out an aircraft window" />
          <div className="cap">In transit</div>
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

        <YouAreHere
          eyebrow="You are here"
          heading={<>Twenty years inside the <span className="mint-fill">pattern.</span></>}
          lead="Four companies through e-commerce, blockchain, and AI. Sam has lived through this cycle from the inside, which is why she can hand the room the map."
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
        />

        <section className="gallery">
          <div className="gallery-head">
            <div className="gal-eyebrow">From the road</div>
            <h2 className="h2">On stage. <span style={{ color: 'var(--mint-deep)' }}>Worldwide.</span></h2>
          </div>
          <div className="gal-grid">
            {[
              ['gp-a', 'stage-hrsw.jpg', 'HR Southwest'],
              ['gp-b', 'hero-industries.jpg', 'Stansberry · Boston'],
              ['gp-c', 'portrait-leopard.jpg', 'Dell Panel'],
              ['gp-d', 'backstage.jpg', 'Backstage'],
              ['gp-e', 'skydive-exit.jpg', 'Competitive skydiving'],
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
          image="hero-work.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Let&apos;s make sure your people walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when your people are facing change and you need them to walk out ready for it."
          caption="Ivanti Solutions Summit"
        />
      </main>
      <Footer />
    </>
  );
}
