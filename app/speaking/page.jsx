import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  PhotoHero, CtaBreak, IndustryGrid, Testimonials, TestimonialBanner,
  Moves, Eras, Sizzle, Bureau, BookBar, LogoStrip, JsonLd,
} from '@/components/Blocks';
import testimonials from '@/data/testimonials.json';
import eras from '@/data/eras.json';
import moves from '@/data/moves.json';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Speaking | Change Has a Pattern',
  description: 'The cycle every big change follows, the four moves that turn the corner. A foresight keynote customized to your industry. Book Sam Rad.',
  path: '/speaking',
  image: '/images/hero-meet.jpg',
  imageAlt: 'Sam Rad delivering a keynote at the SIM Executive Conference',
});

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Who is Sam Rad?', 'Sam Rad (Samantha Radocchia) is a keynote speaker, anthropologist, and four-time technology founder who wrote the #1 bestseller Radical Next. She delivers the keynote Change Has a Pattern to Fortune 500s, governments, and associations worldwide.'],
    ['What is Sam Rad\'s keynote about?', 'Change Has a Pattern shows audiences the cycle every big change follows, why new tools are not paying off yet, and the four moves that turn the corner: see the pattern, let go of the old way, lead the jetpack, and take it off.'],
    ['What industries does Sam Rad speak to?', 'Sam customizes the keynote for your industry, including financial services, healthcare, future of work, higher education, supply chain, hospitality, technology, retail, insurance, and government.'],
    ['How long is the keynote?', 'The standard format is 45 to 60 minutes. A keynote with Q&A is also available, in person or virtual.'],
    ['Where does Sam Rad travel from?', 'Sam Rad travels from New York City and has keynoted on five continents.'],
    ['How do you book Sam Rad?', 'Sam Rad is represented by Brandy Gibson at Executive Speakers Bureau. Booking inquiries go through the form at sam-rad.com/book.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Keynote speaking',
  name: 'Change Has a Pattern',
  provider: { '@id': `${SITE.url}/#person` },
  areaServed: 'Worldwide',
  description: 'A foresight keynote on the cycle every big change follows and the four moves that turn the corner.',
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `${SITE.url}/book` },
};

export default function Speaking() {
  return (
    <>
      <Nav active="Speaking" />
      <main id="main">
        <JsonLd data={service} />
        <JsonLd data={faq} />
        <PhotoHero
          image="hero-meet.jpg"
          eyebrow="Speaking · The keynote"
          lead={<>The cycle every big change follows, why the new tools aren&apos;t paying off yet, and the four moves that turn the corner. <strong>Customized to your industry, your audience, your moment.</strong></>}
          cta={<Link href="/book" className="btn btn-mint">Book this keynote</Link>}
          caption="SIM Executive Conference"
        >
          Change has<br />a <span className="mint-fill">pattern.</span>
        </PhotoHero>

        <LogoStrip label="Past audiences" />


        <section className="prose" id="detail">
          <div className="narrow">
            <div className="prose-grid">
              <div>
                <div className="tag mint">The keynote</div>
                <div className="keynote-name">Change Has a Pattern</div>
                <h2 className="h2" style={{ marginBottom: 40 }}>Every powerful new technology is like a <span className="mint-fill">jetpack.</span></h2>
                <div className="prose-body">
                  <p>It promises new heights, and it scares you about where it might take you. Once everyone has one, not having one is how you get left behind. But owning it isn&apos;t the point, and neither is using it. <strong>Steering it is.</strong></p>
                  <p>In <em>Change Has a Pattern</em>, anthropologist and futurist Sam Rad shows audiences the cycle every big change follows, why the new tools aren&apos;t paying off yet, and the four moves that turn the corner. The pattern has repeated through five thousand years of recorded history, which is why the message works in any industry and lands with any room: it is universal, and above all, human.</p>
                  <p>In times of radical disruption there is no roadmap, and what got you here won&apos;t get you there. The natural reaction is to brace. Sam uses history, and a clear look at what&apos;s coming, to make the change feel less daunting.</p>
                  <p>People don&apos;t just walk out ready for what&apos;s next. <strong>They walk out wanting it.</strong></p>
                  <h3>The four moves</h3>
                  <p>See the pattern. Let go of the old way. Lead the jetpack. Take it off. The arc underneath: recognition, reassurance, challenge, agency, practice, hope.</p>
                  <p><strong>We don&apos;t have an adoption problem. We have a reinvention problem.</strong> The jetpack was handed to individuals while the organization around them stayed the same. That produces more output, not more progress. The returns happen after you redesign.</p>
                  <h3>The role in the room</h3>
                  <p>Sam opens the day or closes it. Opening: break the room&apos;s brain gently, lift the overwhelm, and prime people to embrace the technical changes the rest of the offsite will present. Closing: send them out fired up about the future, with an optimism they didn&apos;t know they walked in with.</p>
                  <p>The catalyst, not the consultant.</p>
                </div>
              </div>
              <aside className="side">
                <div className="side-card">
                  <div className="h">At a glance</div>
                  <ul>
                    <li><strong>Format</strong><br />Keynote 45–60 min · Keynote + Q&amp;A</li>
                    <li><strong>Role in the room</strong><br />Open the day or close it. The catalyst, not the consultant.</li>
                    <li><strong>Audience</strong><br />Fortune 500, associations, government, NGOs</li>
                    <li><strong>Delivery</strong><br />In-person or virtual</li>
                    <li><strong>Customization</strong><br /><Link href="/industries" style={{ color: 'var(--mint-deep)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Built for your industry</Link></li>
                    <li><strong>Travels from</strong><br />New York City</li>
                  </ul>
                  <Link href="/book" className="btn btn-ink">Book Sam</Link>
                  <Bureau />
                </div>
                <div className="side-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/backstage.jpg" alt="Sam Rad backstage" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <BookBar
          mint
          text="Bring change to your stage."
          sub="45 to 60 minutes, customized to your industry. In person or virtual."
        />

        <Eras eras={eras} />

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gofest-doctrine.jpg" alt="Sam Rad on stage at GOFEST in Bogota presenting the Classical Era of the change cycle" style={{ objectPosition: 'center 40%' }} />
          <div className="cap">GOFEST 2026 · Bogotá</div>
        </section>

        <Moves moves={moves} />

        <BookBar
          text="Four moves. One room. Everything after is different."
          sub="Tell us about your audience and we'll be in touch within one business day."
          cta="Check a date"
        />

        <section className="split white" id="jetpack">
          <div className="narrow">
            <div className="split-grid flip">
              <div className="split-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/skydive-exit.jpg" alt="Sam Rad exiting an aircraft as a competitive skydiver" />
              </div>
              <div>
                <div className="tag mint">The jetpack</div>
                <h2 className="h2" style={{ marginBottom: 32 }}>Owning it isn&apos;t the point. <span className="mint-fill">Steering</span> is.</h2>
                <div className="split-body">
                  <p>Every powerful new technology arrives the same way. It promises new heights, and it scares you about where it might take you. Once everyone has one, not having one is how you get left behind.</p>
                  <p>So everyone straps in. And almost nobody flies. <strong>The tool is not the transformation.</strong></p>
                  <p>Sam knows the feeling from the inside. Before the boardrooms she was a competitive skydiver, hundreds of jumps that funded her first company while she was still in college. It is where the metaphor comes from, and it is why the promise at the end of the keynote lands.</p>
                  <p>She isn&apos;t reassuring the room from the ground. <strong>She&apos;s telling them what it looks like from the 14,000 foot view.</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Sizzle />

        <TestimonialBanner />

        <section className="testimonials">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">What people say</div>
              <h2 className="h2">What audiences<br />say <span className="mint-fill">afterward.</span></h2>
            </div>
            <Testimonials items={testimonials} />
          </div>
        </section>

        <BookBar
          mint
          text="Ready when you are."
          sub="Tell us about the room and we'll be in touch within one business day."
        />

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Book Sam Rad"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want the room to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
