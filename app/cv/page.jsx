import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/Blocks';
import { meta, SITE } from '@/lib/site';
import cv from '@/data/cv.json';

export const metadata = meta({
  title: 'Samantha Radocchia | Curriculum Vitae',
  description:
    'Curriculum vitae of Samantha Radocchia, who publishes and speaks as Sam Rad. Anthropologist and technologist, four-time founder, first-named inventor on four granted US patents, field researcher in illicit economies, co-founder of MISTIC. Research on perceptual security.',
  path: '/cv',
  image: '/images/headshot.jpg',
  imageAlt: 'Samantha Radocchia',
});

// Bumped whenever the PDFs are regenerated, so a cached copy is never served.
const PDF_V = '2026-09';

const H = ({ html }) => <span dangerouslySetInnerHTML={{ __html: html }} />;

function Rows({ items, tight }) {
  return items.map((r, i) =>
    r.head ? (
      <div className="cv-subhead" key={i}>
        {r.head}
      </div>
    ) : r.note ? (
      <p className="cv-note-row" key={i}>
        <H html={r.note} />
      </p>
    ) : (
      <div className={tight ? 'cv-row tight' : 'cv-row'} key={i}>
        <span className="l">
          <H html={r.label} />
        </span>
        <span className="r">
          <H html={r.html} />
        </span>
      </div>
    )
  );
}

function Sec({ title, children }) {
  return (
    <div className="cv-sec">
      <div className="cv-h">{title}</div>
      {children}
    </div>
  );
}

export default function CV() {
  const s = cv.sections;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${SITE.url}/#person`,
          name: 'Samantha Radocchia',
          alternateName: 'Sam Rad',
          identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: cv.orcid },
          url: `${SITE.url}/cv`,
          jobTitle: 'Anthropologist and technologist',
          email: `mailto:${cv.email}`,
          description: cv.subhead.professional,
          address: { '@type': 'PostalAddress', addressLocality: 'New York', addressRegion: 'NY' },
          alumniOf: [
            { '@type': 'CollegeOrUniversity', name: 'New York University' },
            { '@type': 'CollegeOrUniversity', name: 'Colgate University' },
          ],
          award: ['Newsweek Blockchain Impact Award', 'Forbes 30 Under 30, Enterprise Technology'],
          knowsAbout: cv.focusAreas,
          sameAs: [
            SITE.social.linkedin,
            `https://orcid.org/${cv.orcid}`,
            SITE.social.x,
            SITE.social.youtube,
            SITE.social.instagram,
            SITE.bureau.orgUrl,
          ],
        }}
      />
      <Nav />
      <main id="main">
        <section className="cv-hero">
          <div className="narrow">
            <div className="cv-hero-grid">
              <div>
                <div className="tag">Research &amp; Practice</div>
                <h1 className="cv-name">{cv.name}</h1>
                <p className="cv-aka">Publishes and speaks as Sam Rad</p>
                <p className="cv-sub">{cv.subhead.web}</p>
                <p className="cv-focus">
                  <b>Focus areas:</b> {cv.focusAreas.join(' · ')}
                </p>
                <div className="cv-meta">
                  {cv.location} <span>&middot;</span> {cv.email} <span>&middot;</span>{' '}
                  <a href={cv.linkedinUrl}>{cv.linkedin}</a> <span>&middot;</span> ORCID{' '}
                  <a href={`https://orcid.org/${cv.orcid}`}>{cv.orcid}</a>
                </div>
                <div className="cv-dl">
                  <a
                    className="btn btn-ink"
                    href={`/cv/samantha-radocchia-cv.pdf?v=${PDF_V}`}
                    download
                  >
                    Professional CV, PDF
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={`/cv/samantha-radocchia-academic-cv.pdf?v=${PDF_V}`}
                    download
                  >
                    Academic CV, PDF
                  </a>
                  <a
                    className="btn btn-ghost"
                    href={`/cv/samantha-radocchia-cv.docx?v=${PDF_V}`}
                    download
                  >
                    Plain CV, Word
                  </a>
                </div>
              </div>
              <div className="cv-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/headshot.jpg" alt="Samantha Radocchia" />
              </div>
            </div>
          </div>
        </section>

        <section className="cv">
          <div className="narrow">
            <div className="cv-summary">
              <div>
                <div className="cv-h">At a glance</div>
                <Rows tight items={cv.glance.map(([label, html]) => ({ label, html }))} />
              </div>
              <div className="cv-side">
                <div className="cv-h">Education</div>
                <Rows tight items={s.education} />
              </div>
            </div>

            <Sec title="Current practice"><Rows items={s.current} /></Sec>
            <Sec title="Invention and standards"><Rows items={s.patents} /></Sec>
            <Sec title="Ventures and appointments"><Rows items={s.appointments} /></Sec>
            <Sec title="Fieldwork"><Rows items={s.fieldwork} /></Sec>
            <Sec title="Publications"><Rows items={s.publications} /></Sec>
            <Sec title="Cited in"><Rows items={s.cited} /></Sec>
            <Sec title="Advisory"><Rows items={s.advisory} /></Sec>
            <Sec title="Awards"><Rows items={s.awards} /></Sec>
            <Sec title="Training and certification"><Rows items={s.training} /></Sec>
            <Sec title="Skills and methods"><Rows items={s.skills} /></Sec>

            <div className="cv-note">
              <h3>Speaking and commercial inquiries</h3>
              <p>
                This page covers research, publications, and institutional work. For keynotes, Sam is
                represented by Executive Speakers Bureau.
              </p>
              <Link href="/speaking">Speaking and booking →</Link>
            </div>

            <p className="cv-updated">Last updated: {cv.lastUpdated}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
