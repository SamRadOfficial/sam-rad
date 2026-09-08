import Link from 'next/link';
import { SITE } from '@/lib/site';
import IndustryIcon from './IndustryIcon';
import { MOVE_ICONS } from './MoveIcon';

export function Bureau({ light }) {
  return (
    <div className={light ? 'bureau-line light' : 'bureau-line'}>
      Managed by <a href={SITE.bureau.mailto}>{SITE.bureau.agent}</a> at{' '}
      <a href={SITE.bureau.orgUrl} target="_blank" rel="noopener noreferrer">{SITE.bureau.org}</a>
    </div>
  );
}

export function PhotoHero({ image, eyebrow, children, descriptors, lead, cta, caption, short, compact, position }) {
  return (
    <section className={`photo-hero${short ? ' short' : ''}${compact ? ' compact' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${image}`} alt="" style={position ? { objectPosition: position } : undefined} />
      <div className="inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="h1">{children}</h1>
        {descriptors && <div className="descriptors">{descriptors}</div>}
        {lead && <p className="lead">{lead}</p>}
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

export function CtaBreak({ image, tag, heading, lead, caption, center, bureau, btn = 'Book Sam →', id = 'book', href, external }) {
  return (
    <section className={center ? 'cta-break center' : 'cta-break'} id={id}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/${image}`} alt="" />
      <div className="inner">
        <div className="tag">{tag}</div>
        <h2 className="h2">{heading}</h2>
        {lead && <p className="lead">{lead}</p>}
        {external ? (
          <a href={href} className="btn btn-mint" target="_blank" rel="noopener noreferrer">{btn}</a>
        ) : (
          <Link href={href || '/book'} className="btn btn-mint">{btn}</Link>
        )}
        {bureau && (
          <div className="bureau">
            Managed by <a href={SITE.bureau.mailto}>{SITE.bureau.agent}</a> at{' '}
            <a href={SITE.bureau.orgUrl} target="_blank" rel="noopener noreferrer">{SITE.bureau.org}</a>
          </div>
        )}
      </div>
      {caption && <div className="cap">{caption}</div>}
    </section>
  );
}

export function LogoStrip({ label = 'Trusted by governments, Fortune 500s, and global institutions', dark }) {
  return (
    <section className={dark ? 'logo-strip dark' : 'logo-strip'}>
      <div className="logo-strip-label">{label}</div>
      <div className="logo-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos-past-audiences.png"
          alt="Past audiences include Dell, Pfizer, BMW, Cisco, MIT, the Federal Reserve, SAP, Columbia University, Nestle, Coca-Cola, Pinterest, ICI, Audible, JLL, the World Economic Forum, GE, Whirlpool, the United Nations, Unilever, P&G, IBM, Gobierno de Mexico, LinkedIn, and LVMH"
        />
      </div>
      <span className="logo-hint">Swipe to see all</span>
    </section>
  );
}

export function IndustryGrid({ industries, total, cta = 'See the keynote →', showCustom = true, numbered = true }) {
  return (
    <div className="ind-grid">
      {industries.map((ind, i) => (
        <Link className="ind" href={`/industries/${ind.slug}`} key={ind.slug}>
          <IndustryIcon slug={ind.slug} />
          <div className="n">{numbered ? `${String(ind.number).padStart(2, '0')} / ${total}` : String(i + 1).padStart(2, '0')}</div>
          <div className="t">{ind.name}</div>
          <div className="a">{cta}</div>
        </Link>
      ))}
      {showCustom && (
        <Link className="ind custom" href="/book">
          <IndustryIcon slug="custom" />
          <div className="n">Custom</div>
          <div className="t">Your industry next.</div>
          <div className="a">Ask about your industry →</div>
        </Link>
      )}
    </div>
  );
}

export function DispatchList({ dispatches }) {
  return (
    <div className="disp-list">
      {dispatches.map((d) => (
        <Link className="disp" href={`/foresight/${d.slug}`} key={d.number}>
          <div className="th">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/${d.image}`} alt="" />
          </div>
          <div className="n">Nº {d.number}</div>
          <div className="i">{d.industry}</div>
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
        <h2 className="h2">See it. Let it go. Lead it. <span className="mint-fill">Take it off.</span></h2>
        <div className="moves-grid">
          {moves.map((m) => (
            <div className="move" key={m.n}>
              <div className="n">{m.n}</div>
              <div className="mv-head">
                <div className="t">{m.title}</div>
                <span className="mv-ico">{MOVE_ICONS[m.n]}</span>
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
        <div className="tag">Six eras. One cycle.</div>
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
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="bureau-line light" style={{ margin: 0 }}>Sizzle reel</div>
          <a href={SITE.social.youtube} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer">More on YouTube →</a>
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
