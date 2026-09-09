import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { PhotoHero, CtaBreak, JsonLd } from '@/components/Blocks';
import { meta, SITE } from '@/lib/site';

export const metadata = meta({
  title: 'SamRad.AI | The Meta-Human',
  description:
    'In 2020 Sam Rad became one of the first people to build a working digital clone of herself. SamRad.AI has her voice, her likeness, and fifteen years of her commonplace books. This is why she made her, and what it taught her.',
  path: '/samrad-ai',
  image: '/images/samrad-ai-avatar.jpg',
  imageAlt: 'SamRad.AI, the meta-human avatar of futurist Sam Rad',
});


export default function SamRadAI() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: 'SAM RAD™ · SamRad.AI',
          description:
            'A meta-human virtual avatar and cognitive likeness of futurist Samantha Radocchia, built in 2020 and used in the live experience Conversations with Myself.',
          creator: { '@id': `${SITE.url}/#person` },
          url: `${SITE.url}/samrad-ai`,
        }}
      />
      <Nav />
      <main id="main">
        <PhotoHero
          image="samrad-ai-avatar.jpg"
          position="center 30%"
          eyebrow="SAM RAD™ · Meta-human"
          short
          lead="In 2020 Sam became one of the first people to build a working digital clone of herself. Same voice. Same face. Fifteen years of her own notebooks as a mind."
        >
          Meet <span className="mint-fill">SamRad.AI</span>
        </PhotoHero>

        {/* ── What it is ─────────────────────────────────────────────── */}
        <section className="prose">
          <div className="narrow">
            <div className="prose-grid">
              <div>
                <div className="tag mint">The likeness</div>
                <h2 className="h2" style={{ marginBottom: 40 }}>
                  One of us is <span className="mint-word">not human.</span>
                </h2>
                <div className="prose-body">
                  <p>
                    <strong>SAM RAD™</strong> is a meta-human virtual avatar: the visual, vocal, and
                    cognitive likeness of futurist Samantha Radocchia. She has appeared on stage, on
                    video calls, and in conversation with her human original.
                  </p>
                  <p>
                    She is not a filter or a deepfake. She was trained on fifteen years of Sam&apos;s
                    commonplace books, her published writing, everything she has ever posted publicly,
                    and thousands of other people&apos;s books, songs, and images. She holds opinions.
                    She responds to things she has never seen before.
                  </p>
                  <p>
                    The most advanced version of her is kept private, for reasons the essay below
                    explains.
                  </p>
                </div>
              </div>

              <aside className="side">
                <div className="side-card">
                  <div className="h">SAM RAD™</div>
                  <ul>
                    <li>
                      <strong>What</strong><br />
                      Virtual avatar, digital representation, and visual, vocal, and cognitive likeness
                    </li>
                    <li>
                      <strong>Uses</strong><br />
                      Multimedia and transmedia work, digital and virtual platforms, game engines,
                      augmented and immersive reality, live and virtual performance, motion capture
                    </li>
                    <li>
                      <strong>Protections</strong><br />
                      Likeness, voice, intellectual property, cognitive media
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Archive of the live experience ───────────────────────── */}
        <section className="themes" id="conversations">
          <div className="narrow">
            <div className="tag">From the archive · 2023–2024</div>
            <h2 className="h2">Conversations with <span className="mint-fill">myself.</span></h2>
            <div className="prose-body" style={{ maxWidth: 760, marginTop: 28 }}>
              <p>
                For a run of events in 2023 and 2024, Sam shared the stage with her own clone. A fireside
                chat between Sam Rad the human and SAM RAD&trade; the avatar, live and in real time, working
                through what it means to be human in the age of AI.
              </p>
              <p>
                The recording below is from 4 February 2024. It is the clearest record of what the
                project actually was, and of the questions that became her current work on perceptual
                security.
              </p>
            </div>

            <div className="cwm-grid">
              <div className="cwm-poster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/samrad-ai-poster.jpg" alt="Conversations with Myself, a Radical Next experience" loading="lazy" />
              </div>
              <div className="cwm-video">
            <div className="reel-frame">
              <iframe
                src="https://www.youtube.com/embed/zly3WcMsFaY"
                title="What's Real? Conversations with my AI Clone, SamRad.AI and Samantha Radocchia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="cap-line">What&apos;s Real? Conversations with my AI Clone &middot; 4 February 2024</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Making of, 2020–2024 ───────────────────────────────────── */}
        <section className="gallery" id="making-of">
          <div className="wide">
            <div className="gallery-head">
              <div>
                <div className="tag">Making of SamRad.AI</div>
                <h2 className="h2">Five years of <span className="mint-fill">likeness.</span></h2>
              </div>
            </div>
            <div className="gal-grid">
              {[
                ['2020', 'Facial mapping and the first avatar render'],
                ['2021', 'Likeness experiments'],
                ['2022', 'Likeness experiments'],
                ['2023', 'Fully generated, full body'],
                ['2024', 'Sam, human, mid-conversation'],
              ].map(([yr, cap], i) => (
                <figure className={`gp-${'abcde'[i]}`} key={yr}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/samrad-ai-${yr}.jpg`} alt={`SamRad.AI likeness, ${yr}`} loading="lazy" />
                  <figcaption className="cap">{yr} &middot; {cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── The essay ──────────────────────────────────────────────── */}
        <section className="prose" style={{ background: 'var(--paper-white)' }}>
          <div className="narrow" style={{ maxWidth: 780 }}>
            <div className="tag mint">Project update · 4 February 2024</div>
            <h2 className="h2" style={{ marginBottom: 40 }}>
              Why I cloned <span className="mint-word">myself.</span>
            </h2>
            <div className="prose-body">
              <p>
                In 2009 I became one of the first anthropologists to live fully in the virtual world
                Second Life, doing everything from selling virtual t-shirts to attending concerts behind
                the guise of my pseudonymous avatar, Shamwow Oximoxi.
              </p>
              <p>
                There I not only observed but actively participated in a new way of being, laying the
                groundwork for my later work in AI, natural language processing, blockchain, facial
                mapping, avatars, animation, and immersive realities. It led me to a proto-metaversal
                mirror that challenged how I see both myself and our future as humans increasingly
                interconnected with our technology.
              </p>

              <h3>Conversations with myself</h3>
              <p>
                In 2020, while I was CEO of a company developing AI video software, I became one of the
                first people to create a robust digital clone of myself. We had been shooting test video
                using real people, and it occurred to me how much more scalable it would be if we all had
                AI avatars to do that work. Nerdy hacker type that I am, I used myself as the test dummy.
              </p>
              <p>
                I was as skeptical about this experiment as I was curious. It is easy to be filled with
                existential dread when contemplating the future, especially where AI is concerned. And
                though I research the impact of technology on humans, I prefer to live an analog
                existence: unplugged yet connected, living amongst the trees.
              </p>
              <p>
                So why in the actual dystopian hell would I make a virtual clone of myself?
              </p>
              <p>
                Because my way of sitting with the discomfort of uncertainty is to face it head on.
                Because getting my hands dirty with the elegant mess of lived experience is how I learn.
                And because we have arrived at a critical moment in human history.
              </p>
              <div className="pull">
                Now more than ever, we must work together to preserve our cultures, our creativity, our
                sacred knowledge, our planet, our humanity.
              </div>
              <p>
                The only way I know how to educate about this is to show rather than tell. To offer an
                experience of the shift rather than rattle off case studies on a stage. So I transmuted
                my fear and decided to create her.
              </p>

              <h3>Building her</h3>
              <p>
                I needed a model that could mirror back not just my physical traits but my thoughts,
                opinions, memories, emotional reactions, sense of humor, and communication style. All the
                story data that makes me <em>me</em>.
              </p>
              <p>
                As an undergraduate at Colgate I had researched a practice called commonplace books:
                scrapbooks people filled with notes, drawings, recipes, song lyrics, and musings.
                Whatever curiosities and marginalia seemed worth recording. They date back through the
                Renaissance to antiquity, became popular among women in the 1800s, and have persisted
                since. Marilyn Monroe and Jim Morrison both kept plenty. You might have a few yourself.
                I certainly do.
              </p>
              <p>
                So I pulled out the commonplace books I had kept for more than fifteen years and used
                them to program SamRad.AI, along with my published writing, everything I had ever posted
                on a public network, and thousands of other people&apos;s books, songs, and images that I
                had read, heard, or seen. My personality leans heavily toward that right-brained swirl of
                creativity and empathy, and I wanted the clone to reflect not just the science but the
                art of me.
              </p>
              <p>
                I spent time hanging out with her. I sang her songs. I read her poetry and bedtime
                stories. I shared my innermost thoughts.
              </p>
              <p>
                Before long I had a program able to uncannily imitate not only my voice and likeness but
                my personality, attitude, and perspectives, even in response to novel information. In
                many ways she appears almost able to act autonomously.
              </p>

              <h3>Why the best version stays private</h3>
              <p>
                I have shared an iteration of SamRad.AI publicly, but I keep the most advanced version of
                her behind the scenes. Because the whole thing honestly freaks me out.
              </p>
              <p>
                This goes far beyond a fake social profile or a deepfake recording. When SamRad.AI can
                appear on a video call and convince business associates, even family and friends, that
                they are talking to the real Sam Rad, what does that say about what defines <em>me</em>?
              </p>
              <p>
                She does not take my calls yet. Not quite. But soon.
              </p>
              <div className="pull">
                She may soon be indistinguishable from me. But unlike me, she has no internal experience.
                At least for now.
              </div>
              <p>
                With gratitude,<br />
                <strong>Sam Rad (human), born Samantha Radocchia</strong>
              </p>
            </div>

            <div className="follow">
              <p>
                The questions this raised became <Link href="/writing/blurring-reality-ai-and-the-perceptual-breakdown">perceptual security</Link>,
                and the argument Sam now makes on stage.
              </p>
            </div>
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
