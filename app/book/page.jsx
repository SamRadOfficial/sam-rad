import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, TestimonialBanner } from '@/components/Blocks';
import BookingForm from './BookingForm';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Book Sam Rad | Keynote Speaker',
  description: 'Booking inquiries for Sam Rad, represented by Brandy Gibson at Executive Speakers Bureau. Keynote, 45 to 60 minutes, customized to your industry.',
  path: '/book',
});

export default function Book() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="hero-home.jpg"
          eyebrow="Booking"
          compact
          lead="Your people are facing change. Let's make sure they walk out ready for it. Tell us about the room and we'll be in touch within one business day."
          caption="TFWA · Cannes · Age of Acceleration"
        >
          Book <span className="mint-fill">Sam Rad.</span>
        </PhotoHero>

        <section className="book-page">
          <div className="narrow">
            <div className="book-grid">
              <BookingForm />
              <div className="book-side">
                <div className="tag mint">How booking works</div>
                <h2 className="h3">One keynote. Built for your room.</h2>
                <p><em>Change Has a Pattern</em> is delivered as a 45 to 60 minute keynote, or a keynote with Q&amp;A, in person or virtual. Every version is customized to your industry and your organization&apos;s moment.</p>
                <p>Sam can open the day (lift the overwhelm, prime the room for what follows) or close it (send them out fired up, with an optimism they didn&apos;t walk in with). Say which on the planning call.</p>
                <div className="who">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/brandy-gibson.jpg" alt="Brandy Gibson" />
                  <div>
                    <b>{SITE.bureau.agent}</b>
                    <span>{SITE.bureau.org}</span>
                    <br />
                    <a href={SITE.bureau.mailto}>brandy@executivespeakers.com</a>
                  </div>
                </div>
                <p><strong>Travels from</strong> New York City. <strong>Requirements</strong>: earset lavalier mic, confidence monitor, countdown clock, clear front-stage area. Full rider on request.</p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialBanner noCta />
      </main>
      <Footer />
    </>
  );
}
