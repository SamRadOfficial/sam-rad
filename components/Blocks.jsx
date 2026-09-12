import Link from 'next/link';
import { SITE } from '@/lib/site';
import clients from '@/data/clients.json';
import logoWall from '@/data/logo-wall.json';
import featuredIn from '@/data/featured-in.json';

const LOGO_FILES = Object.fromEntries(clients.filter((c) => c.file).map((c) => [c.name, c]));
import IndustryIcon from './IndustryIcon';

// The agent mailto is a booking path and stays live everywhere: some buyers would
// rather email a named person than fill in a form, and it is already CC'd to Sam.
// The bureau's own URL is different. It lands on a page with its own booking form,
// so linking it next to a "Book Sam" button hands the lead to a third party at the
// moment of conversion. Pass `linked` only where the page is not asking for a
// booking (press, CV). Do not set it on a page with a CTA.
export function Bureau({ light, linked }) {
  return (
    <div className={light ? 'bureau-line light' : 'bureau-line'}>
      Managed by <a href={SITE.bureau.mailto}>{SITE.bureau.agent}</a> at{' '}
      {linked ? (
        <a href={SITE.bureau.orgUrl} target="_blank" rel="noopener noreferrer">{SITE.bureau.org}</a>
      ) : (
        SITE.bureau.org
      )}
    </div>
  );
}

export function PhotoHero({ image, eyebrow, children, descriptors, lead, note, cta, caption, short, compact, position, light, video }) {
  // `light` is for plates with a pale field behind the copy (a cutout on paper,
  // for instance). It drops the dark scrim and flips the type to ink. Without it
  // the headline renders paper-on-paper and disappears.
  // `video` takes a basename in /public/video and plays .webm then .mp4, muted and
  // looping, with `image` as the poster. The poster is what shows before the file
  // loads, on a failed decode, and whenever the visitor has asked for reduced motion
  // (handled in CSS, which hides the video and leaves the <picture> underneath).
  return (
    <section className={`photo-hero${short ? ' short' : ''}${compact ? ' compact' : ''}${light ? ' light' : ''}${video ? ' has-video' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source srcSet={`/images/${image.replace(/\.jpe?g$/i, '.webp')}`} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${image}`}
          alt=""
          fetchPriority="high"
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
      {video && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`/images/${image}`}
          aria-hidden="true"
          tabIndex={-1}
          style={position ? { objectPosition: position } : undefined}
        >
          <source src={`/video/${video}.webm`} type="video/webm" />
          <source src={`/video/${video}.mp4`} type="video/mp4" />
        </video>
      )}
      <div className="inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="h1">{children}</h1>
        {descriptors && <div className="descriptors">{descriptors}</div>}
        {lead && <p className="lead">{lead}</p>}
        {note && <div className="hero-note">{note}</div>}
        {cta && <div className="cta">{cta}</div>}
      </div>
      {caption && <div className="cap">{caption}</div>}
    </section>
  );
}

export function YouAreHere({ eyebrow, heading, lead, cta, tall }) {
  return (
    <section className={tall ? 'yah tall' : 'yah'}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-home.jpg" alt="Sam Rad on stage at TFWA Cannes beside a slide reading You Are Here, Age of Acceleration" />
      <div className="inner">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="h2">{heading}</h2>
        {lead && <p className="lead">{lead}</p>}
        {cta}
      </div>
      <div className="cap">TFWA · Cannes · Age of Acceleration</div>
    </section>
  );
}

export function CtaBreak({ image, tag, heading, lead, caption, center, bureau, position, btn = 'Book Sam →', btnExternal, id = 'book', href, external }) {
  return (
    <section className={center ? 'cta-break center' : 'cta-break'} id={id}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source srcSet={`/images/${image.replace(/\.jpe?g$/i, '.webp')}`} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${image}`}
          alt=""
          loading="lazy"
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
      <div className="inner">
        <div className="tag">{tag}</div>
        <h2 className="h2">{heading}</h2>
        {lead && <p className="lead">{lead}</p>}
        {external ? (
          <a href={href} className="btn btn-mint" target="_blank" rel="noopener noreferrer">{btn}{btnExternal && <span className="ext" aria-hidden="true" />}</a>
        ) : (
          <Link href={href || '/book'} className="btn btn-mint">{btn}</Link>
        )}
        {bureau && (
          // Sits directly under the Book Sam button, so the bureau's own URL stays
          // unlinked here for the reason given on the Bureau component above.
          <div className="bureau">
            Managed by <a href={SITE.bureau.mailto}>{SITE.bureau.agent}</a> at {SITE.bureau.org}
          </div>
        )}
      </div>
      {caption && <div className="cap">{caption}</div>}
    </section>
  );
}

// Publications Sam has written for or been covered by. Renders nothing until at
// least four logo files resolve, so a half-empty bar never ships.
export function FeaturedIn({ label = "Featured in", cta }) {
  return (
    <section className="featured-in">
      <div className="wide">
        <div className="fi-label">{label}</div>
        <div className="fi-grid">
          {featuredIn.map((p) => (
            <div className="fi-cell" key={p.file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/press/${p.file}`} alt={p.name} loading="lazy" />
            </div>
          ))}
        </div>
        {cta && <div className="fi-foot">{cta}</div>}
      </div>
    </section>
  );
}

export function LogoStrip({ label = 'Trusted by governments, Fortune 500s, and global institutions', dark }) {
  return (
    <section className={dark ? 'logo-strip dark' : 'logo-strip'}>
      <div className="logo-strip-label">{label}</div>
      <div className="wide">
        <div className="logo-wall">
          {logoWall.map((l) => (
            <div className="lw-cell" key={l.file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${l.file.replace(/\.svg$/, '.png')}`} alt={l.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientLogos({ names = [], label }) {
  const marks = names.map((n) => LOGO_FILES[n]).filter(Boolean);
  if (marks.length < 2) return null;
  return (
    <section className="client-logos">
      <div className="narrow">
        <div className="logo-strip-label">{label}</div>
        <div className="client-logo-row">
          {marks.map((m) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="logo-mark" key={m.file} src={`/logos/${m.file.replace(/\.svg$/, '.png')}`} alt={m.name} title={m.name} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}



export function IndustryGrid({ industries, numbered = true, allLink = true }) {
  return (
    <div className="ind-grid">
      {industries.map((ind, i) => (
        <Link className="ind" href={`/industries/${ind.slug}`} key={ind.slug}>
          <span className="lead">
            <IndustryIcon slug={ind.slug} />
            <span className="n">{String(numbered ? ind.number : i + 1).padStart(2, '0')}</span>
          </span>
          <span className="t">{ind.name}</span>
          <span className="arw" aria-hidden="true">→</span>
        </Link>
      ))}
      {allLink && (
        <Link className="ind ind-all" href="/industries">
          <span className="t">See all industries</span>
          <span className="arw" aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}


export function DispatchList({ dispatches }) {
  return (
    <div className="disp-list">
      {dispatches.map((d) => (
        <Link className="disp" href={`/writing/${d.slug}`} key={d.slug}>
          <div className="n">{d.number ? `Nº ${d.number}` : ''}</div>
          <div className="i">{d.industry || 'Writing'}</div>
          <div className="t">{d.title}</div>
          <div className="d">
            {new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Testimonials({ items }) {
  return (
    <div className="t-grid">
      {items.map((t) => (
        <div className="tcard" key={t.name}>
          <div className="m">&ldquo;</div>
          <p className="q">{t.quote}</p>
          <div className="dv" />
          <div className="nm">{t.name}</div>
          <div className="rl">{t.role}</div>
        </div>
      ))}
    </div>
  );
}

export function TestimonialBanner({ noCta }) {
  return (
    <section className="tbanner">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/gofest-mindset-portrait.jpg" alt="" />
      <div className="inner">
        <div className="mark">&ldquo;</div>
        <h2 className="q">
          Sam is a rare individual who has the unique ability to <u>catalyze and inspire</u> everyone around her.
        </h2>
        <div className="who">Asael Meir · Partner, CohnReznick LLP</div>
        {!noCta && <Link href="/book" className="btn btn-mint tb-cta">Book Sam →</Link>}
      </div>
    </section>
  );
}

export function Moves({ moves, dark }) {
  return (
    <section className={dark ? 'moves dark' : 'moves'} id="moves">
      <div className="narrow">
        <div className="tag mint">The four moves</div>
        <h2 className="h2">See it. Let it go. <span className="mint-fill">Lead it.</span> Take it off.</h2>
        <div className="moves-grid">
          {moves.map((m) => (
            <div className="move" key={m.n}>
              <div className="n">{m.n}</div>
              <div className="mv-head">
                <div className="t">{m.title}</div>
              </div>
              <div className="d">{m.body}</div>
              <div className="k">{m.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cycle({ stages }) {
  return (
    <section className="cycle">
      <div className="narrow">
        <div className="tag">The pattern</div>
        <h2 className="h2">Five stages. <span className="mint-fill">Every</span> revolution.</h2>
        <p className="lead" style={{ maxWidth: 720, marginTop: 20 }}>
          Most people only live through one or two, so they can&apos;t see the shape. Sam has lived through four from the inside and studied the rest.
        </p>
        <div className="cycle-row">
          {stages.map((s) => (
            <div className={s.now ? 'stage now' : 'stage'} key={s.n}>
              <div className="n">{s.n}</div>
              <div className="t">{s.title}</div>
              <div className="d">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Eras({ eras }) {
  return (
    <section className="eras">
      <div className="wide">
        <div className="tag">Every era. One cycle.</div>
        <h2 className="h2">Every evolution in history <span className="mint-fill">followed the same pattern.</span></h2>
        <div className="eras-track">
          <div className="eras-line" />
          <div className="eras-grid">
            {eras.map((e) => (
              <div className={`era-t ${e.now ? 'now' : ''} ${e.future ? 'future' : ''}`} key={e.name}>
                <div className="ph">
                  {e.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={`/images/${e.image}`} alt={`${e.name} era`} />
                  )}
                  {e.tech && <span className="tech">{e.tech}</span>}
                </div>
                <div className="dot" />
                <div className="nm">{e.name}</div>
                <div className="dt">{e.dates}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sizzle() {
  return (
    <section className="section" style={{ padding: '120px 0', background: 'var(--ink)' }}>
      <div className="narrow">
        <div className="tag mint">Watch</div>
        <h2 className="h2" style={{ color: 'var(--paper)', marginBottom: 40 }}>Sam <span className="mint-fill">on stage.</span></h2>
        <div className="video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${SITE.sizzleId}?rel=0`}
            title="Sam Rad sizzle reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <a href={SITE.social.youtube} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer">More on YouTube<span className="ext" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

export function BookBar({ text, sub, mint, deep, cta = 'Book Sam →' }) {
  const cls = mint ? 'bookbar mint' : deep ? 'bookbar deep' : 'bookbar';
  return (
    <section className={cls}>
      <div className="inner">
        <div>
          <div className="txt">{text}</div>
          {sub && <div className="sub">{sub}</div>}
        </div>
        <Link href="/book" className={mint ? 'btn btn-ink' : 'btn btn-mint'}>{cta}</Link>
      </div>
    </section>
  );
}

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
