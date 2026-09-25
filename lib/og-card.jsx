// Link-preview cards for /writing, rendered at build time by next/og.
//
// R-A-D posts carry no cover image (decided 22 Sep 2026: the thumbnail-style covers
// were off brand). Their preview is generated from the question itself, in the site's
// own type and palette, so every post is unique in a feed and none needs designing.
// Only called for posts without a photo; legacy posts keep their photo as og:image.
//
// `stamp` on the record names the word that gets the mint block, the same move as the
// mint word in the site heroes. Falls back to the last word, which is often weak
// ("FOR?"), so the R-A-D agent should always supply it.
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { numberLabel, seriesOf } from '@/lib/series';

export const OG_SIZE = { width: 1200, height: 630 };

const INK = '#0F1F3D';
const PAPER = '#F5F1EA';
const MINT = '#5BC4A0';
const MUTED = '#A0AABE';

const root = process.cwd();
const font = (f) => readFile(path.join(root, f));

function fontSizeFor(title) {
  const n = title.length;
  // Sized so a typical question fills two or three lines. The first version ran a
  // size smaller and left the card mostly empty.
  if (n <= 40) return 128;
  if (n <= 60) return 112;
  if (n <= 80) return 100;
  return 84;
}

export async function renderCard(d) {
  const [bebas, inter] = await Promise.all([
    font('lib/fonts/BebasNeue-Regular.ttf'),
    font('scripts/fonts/Inter-Regular.ttf'),
  ]);
  const fonts = [
    { name: 'Bebas', data: bebas, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter, weight: 400, style: 'normal' },
  ];

  const words = d.title.toUpperCase().split(/\s+/);
  const want = (d.stamp || '').toUpperCase().replace(/[^A-Z0-9']/g, '');
  let hit = want ? words.findIndex((w) => w.replace(/[^A-Z0-9']/g, '') === want) : -1;
  if (hit < 0) hit = words.length - 1;
  const size = fontSizeFor(d.title);
  const label = [numberLabel(d), seriesOf(d).label].filter(Boolean).join('   ·   ');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: INK, padding: '72px 72px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Bebas', fontSize: 30, letterSpacing: 3, color: MINT }}>
          <div style={{ width: 50, height: 3, background: MINT, marginRight: 16 }} />
          {label}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', fontFamily: 'Bebas', fontSize: size, lineHeight: 0.95, color: PAPER, marginTop: -20 }}>
          {words.map((w, i) => (
            <div
              key={i}
              style={i === hit
                ? { display: 'flex', background: MINT, color: INK, padding: '0 12px', marginRight: 22, marginLeft: -4 }
                : { display: 'flex', marginRight: 22 }}
            >
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontFamily: 'Bebas', fontSize: 30, letterSpacing: 2, color: PAPER }}>SAM RAD  |  THE CHANGE FUTURIST</div>
          <div style={{ fontFamily: 'Inter', fontSize: 22, color: MUTED }}>sam-rad.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

// ── The share card in use since 25 Sep 2026 (Sam's pick, "A", from her own reference) ──
// Cream, SAM RAD on the header line, a heavy condensed question (Anton) sitting on the wave
// band with the stamp word in mint type, and the series line in the footer. Everything
// that never changes (rules, compass, grid, waves, orbit) is one background image,
// lib/og/field-notes-bg.png. The ink card above (renderCard) is the previous design, kept
// only as a fallback; nothing calls it.
const CREAM_INK = '#0F1F3D';
const FN_MINT = '#2FC48F';
export async function renderFieldNotes(d, { display = 'anton', showNumber = true, frame = false } = {}) {
  const [bg, anton, bebas, inter, interSemi] = await Promise.all([
    font('lib/og/field-notes-bg.png'), font('lib/fonts/Anton-Regular.ttf'),
    font('lib/fonts/BebasNeue-Regular.ttf'), font('scripts/fonts/Inter-Regular.ttf'), font('scripts/fonts/Inter-SemiBold.ttf'),
  ]);
  const fonts = [
    { name: 'Anton', data: anton, weight: 400, style: 'normal' },
    { name: 'Bebas', data: bebas, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter, weight: 400, style: 'normal' },
    { name: 'Inter', data: interSemi, weight: 600, style: 'normal' },
  ];
  const face = display === 'anton' ? 'Anton' : 'Bebas';
  const words = d.title.toUpperCase().split(/\s+/);
  const want = (d.stamp || '').toUpperCase().replace(/[^A-Z0-9']/g, '');
  let hit = want ? words.findIndex((w) => w.replace(/[^A-Z0-9']/g, '') === want) : -1;
  if (hit < 0) hit = words.length - 1;
  const n = d.title.length;
  const k = display === 'anton' ? 1 : 1.12;
  // Long questions step down so four lines still clear the wave band at the bottom.
  const size = Math.round((n <= 34 ? 142 : n <= 48 ? 124 : n <= 62 ? 92 : 80) * k);
  const src = `data:image/png;base64,${bg.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#F6F2E7', ...(frame ? { border: `6px solid ${CREAM_INK}` } : {}) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={630} style={{ position: 'absolute', left: 0, top: 0 }} alt="" />
        {/* "Field Notes" and the number were dropped (Sam, 25 Sep); the name moved up onto the
            header line, which now starts just after it. */}
        <div style={{ position: 'absolute', left: 44, top: 12, display: 'flex', fontFamily: face, fontSize: 38, color: CREAM_INK, letterSpacing: 1 }}>SAM RAD</div>
        {/* The question sits on the wave band rather than hanging from the header (Sam, 25 Sep):
            a box from under the name to just above the waves, its text aligned to the bottom, so
            a short question lands low and a long one still clears the header. */}
        <div style={{ position: 'absolute', left: 42, top: 110, width: 900, height: 372, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontFamily: face, fontSize: size, lineHeight: 0.96, letterSpacing: display === 'anton' ? -1 : 0, color: CREAM_INK }}>
            {words.map((w, i) => (
              <div key={i} style={{ display: 'flex', marginRight: Math.round(size * 0.16), color: i === hit ? FN_MINT : CREAM_INK }}>{w}</div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 44, top: 598, display: 'flex', alignItems: 'center', fontFamily: 'Inter', fontSize: 16, color: CREAM_INK }}>
          <span style={{ fontWeight: 600, letterSpacing: 4 }}>CHANGE HAS A PATTERN</span>
          <span style={{ margin: '0 14px' }}>|</span>
          <span style={{ letterSpacing: 2 }}>Rethink. Anticipate. Disrupt.</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
