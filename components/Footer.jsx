import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="narrow">
        <div className="f-grid">
          <div>
            <h3 className="f-title">Radical <span className="mint">Next</span></h3>
            <p className="f-copy">What&apos;s coming next is radically different. Stay ahead of it. I promise it will be Rad.</p>
            <form className="f-news" action="#" method="post">
              <label htmlFor="nl" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>Email address</label>
              <input id="nl" name="email" type="email" placeholder="your@email.com" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div>
            <div className="f-col-title">Navigate</div>
            <ul className="f-links">
              <li><Link href="/meet-sam">Meet Sam</Link></li>
              <li><Link href="/speaking">Speaking</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/body-of-work">Body of Work</Link></li>
              <li><Link href="/book">Book Sam</Link></li>
            </ul>
          </div>
          <div>
            <div className="f-col-title">Learn</div>
            <ul className="f-links">
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/podcasts">Podcasts</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/samrad-ai">SamRad.AI</Link></li>
              <li><a href={SITE.social.illicitShadows} target="_blank" rel="noopener noreferrer">Illicit Shadows</a></li>
              <li><Link href="/body-of-work#books">Order the books</Link></li>
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
