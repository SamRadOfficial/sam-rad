import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ShareLinks from './ShareLinks';
import Body from './Body';
import { CtaBreak, Bureau, JsonLd } from '@/components/Blocks';
import dispatches from '@/data/dispatches.json';
import { meta, SITE } from '@/lib/site';

export function generateStaticParams() {
  return dispatches.map((d) => ({ slug: d.slug }));
}

const get = (slug) => dispatches.find((d) => d.slug === slug);

export function generateMetadata({ params }) {
  const d = get(params.slug);
  if (!d) return {};
  return meta({
    title: d.number ? `${d.title} | Dispatch Nº ${d.number}` : d.title,
    description: d.deck,
    path: `/writing/${d.slug}`,
    image: `/images/${d.image}`,
    imageAlt: d.title,
  });
}

export default function Dispatch({ params }) {
  const d = get(params.slug);
  if (!d) notFound();
  const more = dispatches.filter((x) => x.slug !== d.slug && !x.archived).slice(0, 3);
  const date = new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.deck,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#person` },
    datePublished: d.date,
    dateModified: d.date,
    image: `${SITE.url}/images/${d.image}`,
    articleSection: d.industry,
    isPartOf: { '@type': 'Blog', name: 'Dispatches from the Frontier' },
  };

  return (
    <>
      <Nav active="Writing" />
      <main id="main">
        <JsonLd data={article} />
        <section className="article-hero">
          <div className="narrow">
            <div className="meta">
              {d.number && <><span className="n">Nº {d.number}</span><span className="sep" /></>}
              {d.industry && <><span>{d.industry}</span><span className="sep" /></>}
              <span>{date}</span><span className="sep" />
              <span>6 min read</span>
            </div>
            <h1 className="h1">{d.title}</h1>
            <p className="deck">{d.deck}</p>
            <div className="byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/headshot-avatar.jpg" alt="Sam Rad" />
              <div>
                <div className="who">Sam Rad</div>
                <div className="what">The Change Futurist · Dispatches from the frontier</div>
              </div>
            </div>
          </div>
        </section>

        <div className="article-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${d.image}`} alt={d.imageAlt || ''} style={d.imagePosition ? { objectPosition: d.imagePosition } : undefined} />
        </div>

        <section className="article">
          <div className="narrow">
            <div className="article-grid">
              <div className="article-body">
                <Body blocks={d.body} />
                {d.sources && d.sources.length > 0 && (
                  <div className="sources">
                    <div className="h">Sources</div>
                    <ol>
                      {d.sources.map((src, i) => (
                        <li key={i}>
                          {src.url
                            ? <a href={src.url} target="_blank" rel="noopener noreferrer">{src.x}</a>
                            : src.x}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="follow">
                  <p>
                    More like this on LinkedIn.{' '}
                    <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">Follow @samradofficial →</a>
                  </p>
                </div>
                <ShareLinks url={`${SITE.url}/writing/${d.slug}`} title={d.title} />
              </div>
              <aside className="side">
                <div className="side-card">
                  <div className="h">Bring this to your room</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 8 }}>
                    Every dispatch is a preview of the keynote. Sam delivers <em>Change Has a Pattern</em>, customized to the room in front of her.
                  </p>
                  {/* Deliberately generic. Once a sector has enough posts of its own,
                      this can point at that industry page instead. See the roadmap. */}
                  <Link href="/speaking" className="btn btn-ink">The keynote →</Link>
                  <Bureau />
                </div>
                <div className="side-card" style={{ marginTop: 24 }}>
                  <div className="h">More dispatches</div>
                  <div className="mini-list">
                    {more.map((m) => (
                      <Link className="mini" href={`/writing/${m.slug}`} key={m.slug}>
                        <div className="n">{m.number ? `Nº ${m.number}` : ''}</div>
                        <div className="t">{m.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-audience.jpg" center bureau
          tag="Read it here. Hear it live."
          heading={<>Bring change to your <span className="mint-fill">stage.</span></>}
          lead="One keynote, customized to your industry. Your people walk out ready for what's coming."
          caption="Federation of Thai Industries · Bangkok"
        />
      </main>
      <Footer />
    </>
  );
}
