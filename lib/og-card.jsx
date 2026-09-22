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
