import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="photo-hero short">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-home.jpg" alt="" />
          <div className="inner">
            <div className="eyebrow">404</div>
            <h1 className="h1">This page moved on.</h1>
            <p className="lead">Change has a pattern. Broken links, unfortunately, do too. Try one of these.</p>
            <div className="cta">
              <Link href="/" className="btn btn-mint">Home</Link>
              <Link href="/speaking" className="btn btn-outline-light">The keynote</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
