import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak } from '@/components/Blocks';
import MediaList from '@/components/MediaList';
import { meta } from '@/lib/site';

export const metadata = meta({
  title: 'Podcasts & Interviews | Sam Rad',
  description:
    'Long-form conversations with Sam Rad on AI, perception, the future of work, and what happens after the future happens. POLITICO Tech, Leaders of AI, Bloomberg, and more.',
  path: '/podcasts',
  image: '/images/gofest-mindset.jpg',
  imageAlt: 'Sam Rad keynoting at GOFEST in Bogota',
});

export default function Podcasts() {
  return (
    <>
      <Nav />
      <main id="main">
        <PhotoHero
          image="gofest-mindset.jpg"
          eyebrow="Podcasts"
          short
          position="center 38%"
          lead="Long-form conversations on AI, perception, the future of work, and what happens after the future happens."
          caption="GOFEST 2026 · Bogotá"
        >
          On the <span className="mint-fill">record.</span>
        </PhotoHero>

        <section className="media-page">
          <div className="wide">
            <MediaList kind="podcasts" />
          </div>
        </section>

        <CtaBreak
          image="cta-red.jpg" center bureau position="center 15%"
          tag="Booking"
          heading={<>Walk out <span className="mint-fill">ready.</span></>}
          lead="Sam Rad is the speaker you book when you are facing change, and you want the room to walk out inspired to shape what comes next."
          caption="CITE"
        />
      </main>
      <Footer />
    </>
  );
}
