import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak } from '@/components/Blocks';
import resources from '@/data/resources.json';
import { meta } from '@/lib/site';

const get = (slug) => resources.find((r) => r.slug === slug);

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = get(slug);
  if (!r) return {};
  return meta({
    title: `${r.title} | Resources`,
    description: r.deck,
    path: `/resources/${r.slug}`,
    image: `/images/${r.image}`,
    imageAlt: r.imageAlt,
  });
}

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  const r = get(slug);
  if (!r) notFound();

  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image={r.image}
          eyebrow={`Resources · ${r.industry}`}
          short
          lead={r.deck}
          note={`Updated ${r.updated}`}
        >
          {r.title}
        </PhotoHero>

        <section className="media-page">
          <div className="wide">
            {r.sections.map((sec) => (
              <div className="myear" key={sec.title}>
                <div className="yr res-head">{sec.title}</div>
                <div className="mlist">
                  {sec.items.map((it) => (
                    <a className="mrow" href={it.url} target="_blank" rel="noopener noreferrer" key={it.url}>
                      <span className="out">{it.source}</span>
                      <span className="ttl">{it.title}</span>
                      <span className="arw">→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="byline-note">
              <p>
                This list backs the{' '}
                <Link href={`/industries/${r.industrySlug}`}>{r.industry.toLowerCase()} keynote</Link>.
                Sources are external and open in a new tab. Nothing here is gated.
              </p>
            </div>
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Booking"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want your people to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
