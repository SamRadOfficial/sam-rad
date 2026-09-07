import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import {
  PhotoHero, YouAreHere, CtaBreak, IndustryGrid, Testimonials, TestimonialBanner,
  Moves, Cycle, Eras, Sizzle, Bureau, BookBar, JsonLd,
} from '@/components/Blocks';
import industries from '@/data/industries.json';
import testimonials from '@/data/testimonials.json';
import eras from '@/data/eras.json';
import moves from '@/data/moves.json';
import cycle from '@/data/cycle.json';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Speaking | Change Has a Pattern',
  description: 'The cycle every big change follows, the four moves that turn the corner. A foresight keynote customized to your industry. Book Sam Rad.',
  path: '/speaking',
  image: '/images/gofest-conquest.jpg',
});

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['Who is Sam Rad?', 'Sam Rad (Samantha Radocchia) is a keynote speaker, anthropologist, and four-time technology founder who wrote the #1 bestseller Radical Next. She delivers the keynote Change Has a Pattern to Fortune 500s, governments, and associations worldwide.'],
    ['What is Sam Rad\'s keynote about?', 'Change Has a Pattern shows audiences the cycle every big change follows, why new tools are not paying off yet, and the four moves that turn the corner: see the pattern, let go of the old way, lead the jetpack, and take it off.'],
    ['What industries does Sam Rad speak to?', 'Sam customizes the keynote for twenty industries including financial services, healthcare, future of work, higher education, supply chain, hospitality, technology, retail, insurance, and government.'],
    ['How long is the keynote?', 'The standard format is 45 to 60 minutes. A keynote with Q&A and a half-day workshop are also available, in person or virtual.'],
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
          image="gofest-conquest.jpg"
          eyebrow="Speaking · The keynote"
          lead={<>The cycle every big change follows, why the new tools aren&apos;t paying off yet, and the four moves that turn the corner. <strong>Customized to your industry, your audience, your moment.</strong></>}
          cta={<Link href="/book" className="btn btn-mint">Book this keynote →</Link>}
          caption="GOFEST 2026 · Bogotá"
        >
          Change has<br />a <span className="mint-fill">pattern.</span>
        </PhotoHero>

        <section className="prose" id="detail">
          <div className="narrow">
            <div className="prose-grid">
              <div>
                <div className="tag mint">The keynote</div>
                <h2 className="h2" style={{ marginBottom: 40 }}>Every powerful new technology is a <span className="mint-fill">jetpack.</span></h2>
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
                    <li><strong>Format</strong><br />Keynote 45–60 min · Half-day workshop</li>
                    <li><strong>Role in the room</strong><br />Open the day or close it. The catalyst, not the consultant.</li>
                    <li><strong>Audience</strong><br />Fortune 500, associations, government, NGOs</li>
                    <li><strong>Delivery</strong><br />In-person or virtual</li>
                    <li><strong>Customization</strong><br />Built for your industry</li>
                    <li><strong>Travels from</strong><br />New York City</li>
                  </ul>
                  <Link href="/book" className="btn btn-ink">Book Sam →</Link>
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
          text="Bring the pattern to your stage."
          sub="45 to 60 minutes, customized to your industry. In person or virtual."
        />

        <section className="moment">
          <div className="narrow">
            <div className="tag">The moment</div>
            <h2 className="h2">It&apos;s not working like <span className="mint-fill">you want it to.</span></h2>
            <p className="lead" style={{ maxWidth: 720, marginTop: 20 }}>
              <strong>Everyone strapped on the jetpack. Almost nobody is flying.</strong>
            </p>
            <div className="moment-grid">
              <div className="mstat"><div className="n">9 in 10</div><div className="d">Companies use AI somewhere. About four in ten see any effect on earnings.</div><div className="s">McKinsey 2025 · Gallup 2026</div></div>
              <div className="mstat"><div className="n">14%</div><div className="d">Of employees say it has transformed how work gets done. Time saved on email goes back into the same work.</div><div className="s">Gallup · NBER</div></div>
              <div className="mstat"><div className="n">4%</div><div className="d">Of adopting firms have redesigned comprehensively. The few that have are nearly three times as likely to see returns.</div><div className="s">U.S. Census 2026 · BCG · McKinsey</div></div>
            </div>
          </div>
        </section>

        <Cycle stages={cycle} />

        <BookBar
          text="Your people are living the dip right now."
          sub="The keynote shows them the chapter after it."
        />

        <Moves moves={moves} />
        <Eras eras={eras} />

        <BookBar
          mint
          text="Five thousand years of the same cycle. One hour to hand it to your room."
          cta="Check a date →"
        />

        <YouAreHere
          eyebrow="You are here"
          heading={<>This is the <span className="mint-fill">dip.</span></>}
          lead="The tools arrived. The returns didn't. Every revolution has this chapter, and every one of them made it to the other side."
          cta={<Link href="/book" className="btn btn-mint">Book Sam →</Link>}
        />

        <Sizzle />

        <section className="logo-divider">
          <div className="wide">
            <div className="lbl">Past audiences</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logos-past-audiences.png" alt="Past audiences: Dell, Pfizer, BMW, Cisco, MIT, Federal Reserve, SAP, Columbia, Nestlé, Coca-Cola, Pinterest, ICI, Audible, JLL, World Economic Forum, GE, Whirlpool, United Nations, Unilever, P&G, IBM, Gobierno de México, LinkedIn, LVMH" />
          </div>
        </section>

        <BookBar
          text="Cisco, Dell, SAP, the UN, the Federal Reserve."
          sub="Sam has keynoted on five continents. Your event next."
        />

        <section className="industries">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Customized by industry</div>
              <h2 className="h2">The keynote, built for <span className="mint-fill">your</span> world.</h2>
            </div>
            <IndustryGrid industries={industries} total={industries.length} />
          </div>
        </section>

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
          image="cta-red.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Let&apos;s make sure your people walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when your people are facing change and you need them to walk out ready for it."
          caption="Keynote · 2024"
        />
      </main>
      <Footer />
    </>
  );
}
