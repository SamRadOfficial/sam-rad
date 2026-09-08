import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, LogoStrip, ClientLogos, DispatchList, Bureau, JsonLd } from '@/components/Blocks';
import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import { meta, SITE } from '@/lib/site';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

function get(slug) {
  return industries.find((i) => i.slug === slug);
}

export function generateMetadata({ params }) {
  const ind = get(params.slug);
  if (!ind) return {};
  const short = ind.name.split(' & ')[0];
  return meta({
    title: `The Future of ${short} | Keynote by Sam Rad`,
    description: `Sam Rad's ${short.toLowerCase()} keynote maps the forces reshaping the industry and the four moves that turn the corner. Book a ${short.toLowerCase()} futurist speaker.`,
    path: `/industries/${ind.slug}`,
    image: '/images/hero-industries.jpg',
    imageAlt: `Sam Rad keynoting on change for ${ind.name} leaders`,
  });
}

export default function IndustryPage({ params }) {
  const ind = get(params.slug);
  if (!ind) notFound();
  const short = ind.name.split(' & ')[0];
  const lower = short.toLowerCase();
  const related = industries.filter((i) => i.slug !== ind.slug).slice(0, 4);
  const feed = dispatches.slice(0, 4);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Keynote speaking',
    name: `Change Has a Pattern — ${short} Keynote`,
    provider: { '@id': `${SITE.url}/#person` },
    areaServed: 'Worldwide',
    audience: { '@type': 'BusinessAudience', audienceType: ind.audiences },
    description: ind.body[0],
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `${SITE.url}/book` },
  };

  return (
    <>
      <Nav active="Industries" />
      <main id="main">
        <JsonLd data={serviceSchema} />
        <PhotoHero
          image="hero-industries.jpg"
          eyebrow={`Industries · ${ind.name}`}
          short
          lead={<><em>Change Has a Pattern</em>, built for {lower} leaders. The cycle every big change follows, applied to the forces reshaping your world right now. <strong>Your people walk out ready for it.</strong></>}
          cta={<Link href="/book" className="btn btn-mint">Book Sam for your {lower} event →</Link>}
        >
          The future of <span className="mint-fill">{lower}.</span>
        </PhotoHero>

        <LogoStrip />

        <section className="prose">
          <div className="narrow">
            <div className="prose-grid">
              <div>
                <div className="tag mint">The keynote, for {lower}</div>
                <h2 className="h2" style={{ marginBottom: 40 }}>{ind.heading}</h2>
                <div className="prose-body">
                  {ind.body.map((p, i) => <p key={i}>{p}</p>)}
                  <p>In this keynote, Sam Rad shows {lower} leaders the cycle every big change follows, why the new tools aren&apos;t paying off yet, and the four moves that turn the corner. The pattern has repeated for five thousand years, which is why it lands with any room in this industry.</p>
                  <h3>The four moves</h3>
                  <p>See the pattern. Let go of the old way. Lead the jetpack. Take it off. The arc underneath: recognition, reassurance, challenge, agency, practice, hope.</p>
                  <p><strong>We don&apos;t have an adoption problem. We have a reinvention problem.</strong> The returns happen after you redesign.</p>
                </div>
              </div>
              <aside className="side">
                <div className="side-card">
                  <div className="h">Book for {lower}</div>
                  <ul>
                    <li><strong>Format</strong><br />Keynote 45–60 min · Keynote + Q&amp;A</li>
                    <li><strong>Audiences</strong><br />{ind.audiences}</li>
                    <li><strong>Customized</strong><br />Built around your agenda and your audience</li>
                    <li><strong>Delivery</strong><br />In-person or virtual</li>
                    <li><strong>Travels from</strong><br />New York City</li>
                  </ul>
                  <Link href="/book" className="btn btn-ink">Book Sam →</Link>
                  <Bureau />
                </div>
                <div className="side-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/headshot.jpg" alt="Sam Rad" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <ClientLogos names={ind.logos} label={`Sam has spoken for ${lower} organizations including`} />

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${ind.band}`} alt={`Sam Rad keynoting for a ${lower} audience`} />
        </section>

        <section className="themes">
          <div className="narrow">
            <div className="tag">The pattern in {lower}</div>
            <h2 className="h2">Three forces Sam maps <span className="mint-fill">on stage.</span></h2>
            <div className="theme-grid">
              {ind.forces.map((f, i) => (
                <div className="theme" key={f.title}>
                  <div className="n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="t">{f.title}</div>
                  <div className="d">{f.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBreak
          image="tfwa-audience.jpg" id="trusted"
          tag="Trusted in the room"
          heading={<>Governments. Fortune 500s. <span className="mint-fill">Global</span> institutions.</>}
          lead="Sam has keynoted on five continents for organizations including Cisco, Dell, SAP, the United Nations, the World Economic Forum, and the Federal Reserve Bank."
          caption="TFWA · Cannes"
        />

        <section className="dispatches" id="dispatches">
          <div className="narrow">
            <div className="section-header">
              <div className="tag">Foresight · {short}</div>
              <h2 className="h2">Latest {lower} <span className="mint-fill">dispatches.</span></h2>
            </div>
            <DispatchList dispatches={feed} />
            <div className="more"><Link href="/foresight" className="btn btn-ghost">All dispatches →</Link></div>
          </div>
        </section>

        <section className="related">
          <div className="narrow">
            <div className="tag">Related industries</div>
            <h2 className="h2">The same pattern, <span className="mint-fill">next door.</span></h2>
            <div className="related-row">
              {related.map((r) => (
                <Link className="rel" href={`/industries/${r.slug}`} key={r.slug}>
                  <small>{String(r.number).padStart(2, '0')} / {industries.length}</small>
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau
          tag="Book Sam Rad"
          heading={<>Book Sam for your {lower} <span className="mint-fill">event.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
