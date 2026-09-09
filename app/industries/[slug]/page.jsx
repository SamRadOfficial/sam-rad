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
  const short = ind.display || ind.name.split(' & ')[0];
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
  const display = (ind.display || short).toLowerCase();
  const related = industries.filter((i) => i.slug !== ind.slug).slice(0, 4);
  // Only show the feed when this industry has at least two posts of its own.
  // A generic feed put 2019 essays on a healthcare booking page.
  const matches = dispatches.filter((d) => !d.archived && d.industrySlug === ind.slug);
  const feed = matches.length >= 2 ? matches.slice(0, 4) : [];

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
          The future of <span className="mint-fill">{display}.</span>
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
                  <h3>Change Has a Pattern</h3>
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
                    <li><strong>Keynote</strong><br /><em>Change Has a Pattern</em>, built for {lower}</li>
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
                  <img src="/images/gofest-mindset-portrait.jpg" alt="Sam Rad delivering a keynote at GOFEST in Bogota" />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <ClientLogos names={ind.logos} label={`Sam has spoken for ${lower} organizations including`} />

        {ind.consortium && (
          <section className="consortium">
            <div className="narrow">
              <div className="tag mint">{ind.consortium.tag}</div>
              <h2 className="h2">{ind.consortium.heading}</h2>
              <p className="c-body">{ind.consortium.body}</p>
              <div className="c-members">
                {ind.consortium.members.map((m) => (
                  <span className="c-name" key={m}>{m}</span>
                ))}
              </div>
              <div className="c-foot">
                <span className="c-note">{ind.consortium.note}</span>
                {ind.consortium.url && (
                  <a href={ind.consortium.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                    {ind.consortium.linkLabel}
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="photo-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${ind.band}`} alt={`Sam Rad keynoting for a ${lower} audience`} />
        </section>

        <section className="bio-split">
          <div className="narrow">
            <div className="tag">Your speaker</div>
            <h2 className="h2" style={{ marginBottom: 44 }}>
              Sam doesn&apos;t just predict the future. <span className="mint-word">She lives in it.</span>
            </h2>
            <div className="bio-grid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/headshot.jpg" alt="Sam Rad" />
              <div>
                <p>
                  Sam Rad is an anthropologist and four-time technology founder. She built companies
                  through the rise of e-commerce, blockchain, and AI: two that used AI to map personal
                  taste, then <strong>Chronicled</strong>, the San Francisco company bringing trust to
                  global commerce and supply chains, and <strong>NYOUM</strong>, a London-based
                  generative AI communication platform.
                </p>
                <p>
                  Trained in anthropology and linguistics, her research runs to simulated realities,
                  cognitive security, and post-human society. She holds a family of patents linking the
                  physical and digital worlds, and her early blockchain protocols contributed to ERC-721,
                  the standard behind NFTs. She has advised the United Nations, the World Economic Forum,
                  and the Federal Reserve Bank, keynoted on five continents, and written two #1
                  bestsellers, <em>Radical Next</em> and <em>Bitcoin Pizza</em>.
                </p>
                <p>
                  She was named to the Forbes 30 Under 30 for enterprise technology and spent a year
                  off-grid in the Amazon. Before the boardrooms she was a competitive skydiver, which is
                  where the keynote&apos;s jetpack metaphor comes from, and why the reassurance at the end
                  of it lands.
                </p>
                <div className="bio-stats">
                  <div><div className="n">50+</div><div className="l">Countries</div></div>
                  <div><div className="n">2×</div><div className="l">#1 Bestsellers</div></div>
                  <div><div className="n">4×</div><div className="l">Founder</div></div>
                </div>
                <Link href="/meet-sam" className="btn btn-ghost" style={{ marginTop: 26 }}>Full bio →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="reel">
          <div className="narrow">
            <div className="tag">On stage</div>
            <h2 className="h2">See the room <span className="mint-fill">react.</span></h2>
            <div className="reel-frame">
              <iframe
                src={`https://www.youtube.com/embed/${SITE.sizzleId}`}
                title="Sam Rad keynote reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
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

        {feed.length > 0 && (
          <section className="dispatches" id="dispatches">
            <div className="narrow">
              <div className="section-header">
                <div className="tag">Writing</div>
                <h2 className="h2">Latest <span className="mint-fill">dispatches.</span></h2>
              </div>
              <DispatchList dispatches={feed} />
              <div className="more"><Link href="/writing" className="btn btn-ghost">All writing →</Link></div>
            </div>
          </section>
        )}

        <section className="related">
          <div className="narrow">
            <div className="tag">Related industries</div>
            <h2 className="h2">The same pattern, <span className="mint-fill">next door.</span></h2>
            <div className="related-row">
              {related.map((r) => (
                <Link className="rel" href={`/industries/${r.slug}`} key={r.slug}>
                  <small>{String(r.number).padStart(2, '0')}</small>
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
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
