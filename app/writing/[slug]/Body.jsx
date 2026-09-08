// Renders a dispatch body from data/dispatches.json.
// Blocks: p, h3, pull, ul, ol, img. Inline: **bold**, *italic*, [text](url).

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function inline(text) {
  const out = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const ext = /^https?:\/\//.test(m[2]);
      out.push(
        <a key={i++} href={m[2]} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}>
          {inline(m[1])}
        </a>,
      );
    } else if (m[3] !== undefined) out.push(<strong key={i++}>{inline(m[3])}</strong>);
    else if (m[4] !== undefined) out.push(<em key={i++}>{inline(m[4])}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Body({ blocks = [] }) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case 'h3': return <h3 key={i}>{inline(b.x)}</h3>;
      case 'pull': return <div className="pull" key={i}>{inline(b.x)}</div>;
      case 'ul': return <ul key={i}>{b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>;
      case 'ol': return <ol key={i}>{b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ol>;
      case 'img': return (
        <figure className="article-fig" key={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${b.src}`} alt={b.cap || ''} loading="lazy" />
          {b.cap && <figcaption>{b.cap}</figcaption>}
        </figure>
      );
      default: return <p key={i}>{inline(b.x)}</p>;
    }
  });
}
