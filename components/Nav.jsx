import Link from 'next/link';

const ITEMS = [
  ['Meet Sam', '/meet-sam'],
  ['Speaking', '/speaking'],
  ['Industries', '/industries'],
  ['Foresight', '/foresight'],
  ['Body of Work', '/body-of-work'],
];

export default function Nav({ active }) {
  return (
    <nav>
      <Link href="/" className="nav-logo">Sam Rad</Link>
      <ul className="nav-items">
        {ITEMS.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className={active === label ? 'active' : undefined}>{label}</Link>
          </li>
        ))}
      </ul>
      <Link href="/book" className="book-btn">Book Sam</Link>
    </nav>
  );
}
