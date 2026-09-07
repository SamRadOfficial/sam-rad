import Link from 'next/link';
import industries from '@/data/industries.json';
import { ICONS } from './IndustryIcon';

const ITEMS = [
  ['Meet Sam', '/meet-sam'],
  ['Speaking', '/speaking'],
  ['Industries', '/industries'],
  ['Foresight', '/foresight'],
  ['Body of Work', '/body-of-work'],
];

function IndustriesMenu({ active }) {
  return (
    <li className="nav-drop">
      <Link href="/industries" className={active === 'Industries' ? 'active' : undefined}>
        Industries
        <span className="nav-caret" aria-hidden="true" />
      </Link>
      <div className="mega">
        <div className="mega-inner">
        <div className="mega-head">
          <span className="t">Change impacting your industry</span>
          <span className="s">{industries.length} industries</span>
        </div>
        <div className="mega-grid">
          {industries.map((ind) => (
            <Link className="mega-cell" href={`/industries/${ind.slug}`} key={ind.slug}>
              <span className="mi">{ICONS[ind.slug]}</span>
              {ind.name}
            </Link>
          ))}
        </div>
        <div className="mega-foot">
          <span className="note">
            One keynote, built around the forces reshaping your world. Don&apos;t see yours? Sam builds it.
          </span>
          <Link href="/book">Ask about your industry →</Link>
        </div>
        </div>
      </div>
    </li>
  );
}

export default function Nav({ active }) {
  return (
    <nav>
      <Link href="/" className="nav-logo">Sam Rad</Link>
      <ul className="nav-items">
        {ITEMS.map(([label, href]) =>
          label === 'Industries' ? (
            <IndustriesMenu active={active} key={href} />
          ) : (
            <li key={href}>
              <Link href={href} className={active === label ? 'active' : undefined}>{label}</Link>
            </li>
          )
        )}
      </ul>
      <Link href="/book" className="book-btn">Book Sam</Link>
    </nav>
  );
}
