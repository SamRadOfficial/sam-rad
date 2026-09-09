'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import industries from '@/data/industries.json';
import { ICONS } from './IndustryIcon';

const ITEMS = [
  ['Meet Sam', '/meet-sam'],
  ['Speaking', '/speaking'],
  ['Industries', '/industries'],
  ['Writing', '/writing'],
  ['Body of Work', '/body-of-work'],
];

const featured = industries
  .filter((i) => i.featuredOrder)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

function IndustriesMenu({ active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li className={open ? 'nav-drop open' : 'nav-drop'} ref={ref}>
      <button
        type="button"
        className={`nav-dropbtn${active === 'Industries' ? ' active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Industries
        <span className="nav-caret" aria-hidden="true" />
      </button>
      <div className="mega" onClick={() => setOpen(false)}>
        <div className="mega-inner">
          <div className="mega-head">
            <span className="t">Change impacting your industry</span>
            
          </div>
          <div className="mega-grid">
            {featured.map((ind) => (
              <Link className="mega-cell" href={`/industries/${ind.slug}`} key={ind.slug}>
                <span className="mi">{ICONS[ind.slug]}</span>
                {ind.name}
              </Link>
            ))}
          </div>
          <div className="mega-foot">
            <span className="note">
              Custom built around the forces shaping your world.
            </span>
            <Link href="/industries">See all industries</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
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
        <button
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={open ? 'drawer open' : 'drawer'} role="dialog" aria-modal="true" aria-label="Menu">
        <button className="d-close" aria-label="Close menu" onClick={() => setOpen(false)} />
        {ITEMS.map(([label, href]) => (
          <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="d-book" href="/book" onClick={() => setOpen(false)}>Book Sam</Link>
      </div>
    </>
  );
}
