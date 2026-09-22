import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { DispatchList, Pager, CtaBreak } from '@/components/Blocks';
import { pageItems, pageCount, pageHref } from '@/lib/writing';
import { meta } from '@/lib/site';

// /writing/page/2 onward. Page 1 is /writing itself, and /writing/page/1 redirects
// there in next.config.js so the first page never exists at two URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export function generateMetadata({ params }) {
  const n = Number(params.n);
  // Each page is canonical to itself, not to page 1: pointing every page at the first
  // one tells search engines the older posts' listing does not exist.
  return meta({
    title: `Writing, page ${n}`,
    description: `Questions, dispatches, and essays by Sam Rad. Page ${n} of ${pageCount}.`,
    path: pageHref(n),
  });
}

export default function WritingPage({ params }) {
  const n = Number(params.n);
  if (!Number.isInteger(n) || n < 2 || n > pageCount) notFound();
  return (
    <>
      <Nav active="Writing" />
      <main id="main">
        <section className="dispatches" style={{ paddingTop: 72 }}>
          <div className="narrow">
            <div className="disp-head" style={{ marginBottom: 32 }}>
              <div>
                <div className="tag">Writing · Page {n} of {pageCount}</div>
                <h1 className="h2">More <span className="mint-fill">writing.</span></h1>
              </div>
              <Link href="/writing" className="sec-link">Latest</Link>
            </div>
            <DispatchList dispatches={pageItems(n)} />
            <Pager page={n} count={pageCount} href={pageHref} />
          </div>
        </section>
        <CtaBreak
          image="cta-audience.jpg"
          tag="Bring change to your stage"
          heading={<>Read it here. <span className="mint-fill">Hear</span> it live.</>}
          lead="Everything here is a preview of the keynote. Book Sam to bring the full pattern to your audience."
          caption="Federation of Thai Industries · Bangkok"
        />
      </main>
      <Footer />
    </>
  );
}
