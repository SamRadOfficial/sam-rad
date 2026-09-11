import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, TestimonialBanner } from '@/components/Blocks';
import BookingForm from './BookingForm';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'Book Sam Rad | Keynote Speaker',
  description: 'Booking inquiries for Sam Rad, represented by Brandy Gibson at Executive Speakers Bureau. Keynote, 45 to 60 minutes, customized to your industry.',
  path: '/book',
  image: '/images/hero-meet.jpg',
  imageAlt: 'Sam Rad delivering a keynote at the SIM Executive Conference',
});

export default function Book() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="hero-meet.jpg"
          eyebrow="Booking"
          compact
          position="center 30%"
          lead="Your room is facing change. Let's make sure it walks out ready for it."
          caption="SIM Executive Conference"
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
                <a className="who" href={SITE.bureau.mailto}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/brandy-gibson.jpg" alt="Brandy Gibson" />
                  <div>
                    <b>{SITE.bureau.agent}</b>
                    <span>{SITE.bureau.org}</span>
                    <br />
                    <span className="who-mail">brandy@executivespeakers.com</span>
                  </div>
                </a>
                <p><strong>Travels from</strong> New York City. <strong>Requirements</strong>: Full rider on request.</p>

                <div className="book-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/nyc-subway-stairs.jpg" alt="Sam Rad in New York City" />
                </div>
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
