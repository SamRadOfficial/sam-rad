import media from '@/data/media.json';

// media.json stores each section as an ARRAY of { year, items }, not an object.
// Object keys that look like integers are reordered ascending by JS, which put
// 2024 above 2025 and 2017 above 2018. Arrays preserve the order as authored.

function Year({ year, items }) {
  return (
    <div className="myear">
      <div className="yr">{year}</div>
      <div className="mlist">
        {items.map(([outlet, title, url]) => (
          <a className="mrow" href={url} target="_blank" rel="noopener noreferrer" key={url + title}>
            <span className="out">{outlet}</span>
            <span className="ttl">{title}</span>
            <span className="arw ext-arw" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MediaList({ kind, openYears, label }) {
  const groups = media[kind];
  const open = openYears ? groups.filter((g) => openYears.includes(g.year)) : groups;
  const hidden = openYears ? groups.filter((g) => !openYears.includes(g.year)) : [];
  return (
    <>
      {open.map((g) => <Year year={g.year} items={g.items} key={g.year} />)}
      {hidden.length > 0 && (
        <details className="earlier">
          <summary>
            <span>{label || 'Show earlier coverage'}</span>
            <span className="c">{hidden[0].year} and earlier</span>
          </summary>
          {hidden.map((g) => <Year year={g.year} items={g.items} key={g.year} />)}
        </details>
      )}
    </>
  );
}
