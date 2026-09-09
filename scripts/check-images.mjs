// Audits every image reference in the built site against the files on disk.
// Exists because a <picture> <source> that 404s does NOT fall back to the <img>:
// the browser renders nothing. Run after `next build`, before pushing.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : p.endsWith('.html') && out.push(p);
  }
  return out;
};

let missing = [];
const seen = new Set();
for (const file of walk('.next/server/app')) {
  const html = readFileSync(file, 'utf8');
  const refs = [
    ...html.matchAll(/<source\s+srcSet="(\/(?:images|logos)\/[^"]+)"/g),
    ...html.matchAll(/<img[^>]+src="(\/(?:images|logos)\/[^"]+)"/g),
  ].map((m) => m[1]);
  for (const r of refs) {
    if (seen.has(r)) continue;
    seen.add(r);
    if (!existsSync(join('public', r))) missing.push(r);
  }
}

if (missing.length) {
  console.error(`\n  ${missing.length} image reference(s) point at files that do not exist:\n`);
  for (const m of missing) console.error('   ' + m);
  console.error('\n  A missing <source> renders nothing. Fix before pushing.\n');
  process.exit(1);
}
console.log(`  images ok — ${seen.size} references, all present`);
