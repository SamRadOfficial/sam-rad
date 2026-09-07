import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { CtaBreak, Bureau, JsonLd } from '@/components/Blocks';
import dispatches from '@/data/dispatches.json';
import industries from '@/data/industries.json';
import { meta, SITE } from '@/lib/site';

export function generateStaticParams() {
  return dispatches.map((d) => ({ slug: d.slug }));
}

const get = (slug) => dispatches.find((d) => d.slug === slug);

export function generateMetadata({ params }) {
  const d = get(params.slug);
  if (!d) return {};
  return meta({
    title: `${d.title} | Dispatch Nº ${d.number}`,
    description: d.deck,
    path: `/foresight/${d.slug}`,
    image: `/images/${d.image}`,
  });
}

export default function Dispatch({ params }) {
  const d = get(params.slug);
  if (!d) notFound();
  const ind = industries.find((i) => i.slug === d.industrySlug);
  const more = dispatches.filter((x) => x.slug !== d.slug).slice(0, 3);
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
      <Nav active="Foresight" />
      <main id="main">
        <JsonLd data={article} />
        <section className="article-hero">
          <div className="narrow">
            <div className="meta">
              <span className="n">Nº {d.number}</span><span className="sep" />
              <span>{d.industry}</span><span className="sep" />
              <span>{date}</span><span className="sep" />
              <span>6 min read</span>
            </div>
            <h1 className="h1">{d.title}</h1>
            <p className="deck">{d.deck}</p>
            <div className="byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/headshot.jpg" alt="Sam Rad" />
              <div>
                <div className="who">Sam Rad</div>
                <div className="what">The Change Futurist · Dispatches from the frontier</div>
              </div>
            </div>
          </div>
        </section>

        <div className="article-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${d.image}`} alt="" />
        </div>

        <section className="article">
          <div className="narrow">
            <div className="article-grid">
              <div className="article-body">
                <p>Every powerful new technology is a jetpack. It promises new heights, and it scares you about where it might take you. This week, {d.industry.toLowerCase()} got another reminder of what that means in practice.</p>
                <p><strong>We&apos;ve been here before.</strong></p>
                <h3>The pattern, again</h3>
                <p>Every advance in this industry has followed the same arc. It arrives promising new heights. Early adopters get burned because the system around the tool hasn&apos;t changed. Then the institutions that steer instead of brace write the rules everyone else follows for the next generation.</p>
                <div className="pull">Accuracy isn&apos;t the risk. Untraceability is.</div>
                <p>That&apos;s not a technology problem. It&apos;s a redesign problem, and it is the chapter we are in right now.</p>
                <h3>What leaders should do now</h3>
                <p><strong>See the pattern.</strong> The cycle is recognizable, and recognizing it is what turns a headline into a chapter rather than a crisis.</p>
                <p><strong>Let go of the old way.</strong> Unlearn before you upskill. The process built for the old tool is the thing holding the returns hostage.</p>
                <p><strong>Lead the jetpack.</strong> Aim it at the real goal, not the old process. Task to workflow to value.</p>
                <p>Change has a pattern. This is the part where you steer.</p>
                <div className="sources">
                  <div className="h">Sources</div>
                  <ol>
                    <li>Placeholder. The dispatch pipeline cites real, dated sources on every published article.</li>
                  </ol>
                </div>
                <div className="share">
                  <a href="#">Share on LinkedIn</a>
                  <a href="#">Copy link</a>
                </div>
              </div>
              <aside className="side">
                <div className="side-card">
                  <div className="h">Bring this to your room</div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 8 }}>
                    Every dispatch is a preview of the keynote. Sam delivers <em>Change Has a Pattern</em> built for {d.industry.toLowerCase()} audiences.
                  </p>
                  {ind && <Link href={`/industries/${ind.slug}`} className="btn btn-ink">The {d.industry.toLowerCase()} keynote →</Link>}
                  <Bureau />
                </div>
                <div className="side-card" style={{ marginTop: 24 }}>
                  <div className="h">More dispatches</div>
                  <div className="mini-list">
                    {more.map((m) => (
                      <Link className="mini" href={`/foresight/${m.slug}`} key={m.slug}>
                        <div className="n">Nº {m.number}</div>
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
          heading={<>Bring the pattern to your <span className="mint-fill">room.</span></>}
          lead="One keynote, customized to your industry. Your people walk out ready for what's coming."
          caption="Federation of Thai Industries · Bangkok"
        />
      </main>
      <Footer />
    </>
  );
}
