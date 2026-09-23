import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ShareLinks from './ShareLinks';
import Body from './Body';
import { CtaBreak, Bureau, JsonLd } from '@/components/Blocks';
import dispatches from '@/data/dispatches.json';
import { meta, SITE } from '@/lib/site';
import { seriesOf, numberLabel, fmtDate } from '@/lib/series';
import { isDue, isPublished } from '@/lib/writing';

export function generateStaticParams() {
  return dispatches.filter(isDue).map((d) => ({ slug: d.slug }));
}

const get = (slug) => dispatches.find((d) => d.slug === slug);

export function generateMetadata({ params }) {
  const d = get(params.slug);
  if (!d) return {};
  // R-A-D titles end "| Sam Rad", per the series export. Legacy posts keep their
  // "Dispatch Nº" suffix so existing search listings do not churn.
  const s = seriesOf(d);
  return meta({
    // The layout's title template appends " | Sam Rad", so R-A-D passes the bare
    // question. Adding the suffix here printed it twice.
    title: s.key === 'rad' ? d.title : (d.number ? `${d.title} | Dispatch Nº ${d.number}` : d.title),
    description: d.metaDescription || d.deck,
    path: `/writing/${d.slug}`,
    // Posts without a photo get the generated card beside this file. It has to be
    // named here: the file convention alone loses to this config (see
    // opengraph-image.jsx).
    image: d.image ? `/images/${d.image}` : `/writing/${d.slug}/opengraph-image`,
    imageType: d.image ? 'image/jpeg' : 'image/png',
    imageSize: d.image ? undefined : { width: 1200, height: 630 },
    imageAlt: d.imageAlt || d.title,
    article: { published: d.date, modified: d.lastUpdated || d.date, tags: d.tags },
  });
}

export default function Dispatch({ params }) {
  const d = get(params.slug);
  if (!d) notFound();
  const more = dispatches.filter((x) => x.slug !== d.slug && isPublished(x)).slice(0, 3);
  const s = seriesOf(d);
  const date = fmtDate(d.date);
  // Reading time comes from the record. It was hardcoded to "6 min read" for every
  // post, which was wrong for most of them.
  const words = [d.deck, ...(d.body || []).map((b) => b.x || (b.items || []).join(' '))].join(' ').split(/\s+/).length;
  const reading = d.readingTime || `${Math.max(1, Math.round(words / 220))} min read`;

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.deck,
    author: { '@type': 'Person', '@id': `${SITE.url}/#person`, name: 'Sam Rad', url: `${SITE.url}/meet-sam` },
    publisher: { '@id': `${SITE.url}/#person` },
    datePublished: d.date,
    dateModified: d.lastUpdated || d.date,
    image: d.image ? `${SITE.url}/images/${d.image}` : `${SITE.url}/writing/${d.slug}/opengraph-image`,
    articleSection: d.industry,
    isPartOf: { '@type': 'Blog', name: 'Writing', url: `${SITE.url}/writing` },
    ...(s.key !== 'dispatch' ? { genre: s.name } : {}),
    ...(d.tags ? { keywords: d.tags.join(', ') } : {}),
  };

  return (
    <>
      <Nav active="Writing" />
      <main id="main">
        <JsonLd data={article} />
        <section className="article-hero">
          <div className="narrow">
            <div className="meta">
              {d.number && <><span className="n">{numberLabel(d)}</span><span className="sep" /></>}
              {s.shown && <><span>{s.label}</span><span className="sep" /></>}
              {d.industry && <><span>{d.industry}</span><span className="sep" /></>}
              <span>{date}</span><span className="sep" />
              <span>{reading}</span>
            </div>
            <h1 className="h1">{d.title}</h1>
            <p className="deck">{d.deck}</p>
            <div className="byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/headshot-avatar.jpg" alt="Sam Rad" />
              <div>
                <div className="who">Sam Rad</div>
                <div className="what">The Change Futurist · Writing</div>
              </div>
            </div>
          </div>
        </section>

        {/* Only legacy posts carry a photo. R-A-D posts go straight from the header into
            the body; their link preview is generated in opengraph-image.jsx. */}
        {d.image && (
          <div className={d.imageKind === 'card' ? 'article-photo card' : 'article-photo'}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/${d.image}`} alt={d.imageAlt || ''} style={d.imagePosition ? { objectPosition: d.imagePosition } : undefined} />
          </div>
        )}

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
                {s.key === 'rad' && (
                  <p className="author-block">
                    <b>Sam Rad, The Change Futurist.</b> Keynote speaker on change, transformation,
                    resilience, and AI adoption. Author of <em>Radical Next</em>.{' '}
                    <Link href="/speaking">Book a keynote</Link>
                  </p>
                )}
                <div className="follow">
                  <p>
                    More like this on LinkedIn.{' '}
                    <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">Follow @samradofficial<span className="ext" aria-hidden="true" /></a>
                  </p>
                </div>
                <ShareLinks url={`${SITE.url}/writing/${d.slug}`} title={d.title} />
              </div>
              <aside className="side">
                {s.key === 'rad' && (
                  <div className="side-card" style={{ marginBottom: 24 }}>
                    <div className="h">R-A-D</div>
                    <p>
                      Research and Development with Sam Rad. One pressing question about the future,
                      answered. <Link href="/writing">Read the series</Link>
                    </p>
                  </div>
                )}
                <div className="side-card">
                  <div className="h">Bring this to your room</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 8 }}>
                    Everything here is a preview of the keynote. Sam delivers <em>Change Has a Pattern</em>, customized to the room in front of her.
                  </p>
                  {/* Deliberately generic. Once a sector has enough posts of its own,
                      this can point at that industry page instead. See the roadmap. */}
                  <Link href="/speaking" className="btn btn-ink">Keynote</Link>
                  <Bureau />
                </div>
                <div className="side-card" style={{ marginTop: 24 }}>
                  <div className="h">More writing</div>
                  <div className="mini-list">
                    {more.map((m) => (
                      <Link className="mini" href={`/writing/${m.slug}`} key={m.slug}>
                        <div className="n">{numberLabel(m)}</div>
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
          lead="One keynote, customized to your industry. The room walks out ready for what's coming."
          caption="Federation of Thai Industries · Bangkok"
        />
      </main>
      <Footer />
    </>
  );
}
