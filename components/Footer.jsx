import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="narrow">
        <div className="f-grid">
          <div>
            <h3 className="f-title">Ready for what&apos;s <span className="mint">next?</span></h3>
            <p className="f-copy">What&apos;s coming next is radically different. Sam writes about what happens after the future happens.</p>
            <div className="f-where">
              <a className="btn-li" href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                </svg>
                Connect on LinkedIn<span className="ext" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <div className="f-col-title">Navigate</div>
            <ul className="f-links">
              <li><Link href="/meet-sam">Meet Sam</Link></li>
              <li><Link href="/speaking">Speaking</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/body-of-work">Body of Work</Link></li>
              <li><Link href="/book">Book Sam →</Link></li>
            </ul>
          </div>
          <div>
            <div className="f-col-title">Learn</div>
            <ul className="f-links">
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/podcasts">Podcasts</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/samrad-ai">SamRad.AI</Link></li>
              <li><Link href="/cv">CV</Link></li>
              <li><a href={SITE.social.illicitShadows} target="_blank" rel="noopener noreferrer">Illicit Shadows</a></li>
            </ul>
          </div>
          <div>
            <div className="f-col-title">Connect</div>
            <ul className="f-links">
              <li><a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href={SITE.social.x} target="_blank" rel="noopener noreferrer">X</a></li>
              <li><a href={SITE.bureau.orgUrl} target="_blank" rel="noopener noreferrer">Executive Speakers Bureau</a></li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <div className="f-cred">Anthropologist <span className="dot">·</span> Tech Entrepreneur <span className="dot">·</span> Bestselling Author</div>
          <div>© {new Date().getFullYear()} Sam Rad · Samantha Radocchia</div>
          <div className="f-sig">Stay Rad</div>
        </div>
      </div>
    </footer>
  );
}
