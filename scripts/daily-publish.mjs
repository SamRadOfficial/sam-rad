// Daily publish: reveal today's post, confirm it is live, tell Bing.
//
// Run by .github/workflows/daily-publish.yml every weekday at 11:30 UTC, which is
// 7:30 a.m. Eastern in summer time and 6:30 a.m. in winter time, so the page is live
// before the 8:00 a.m. LinkedIn post either way.
//
// 1. Find posts dated today (UTC) in data/dispatches.json. None: stop, no rebuild.
// 2. Call the Vercel deploy hook. The build's date gate (lib/writing.js) then includes
//    today's posts, which it hid until now.
// 3. Wait until each new page returns 200 and its preview image loads. If that has not
//    happened in 20 minutes, fail, and GitHub emails Sam.
// 4. Ping IndexNow, which tells Bing at once; Bing's index feeds ChatGPT search and
//    Copilot.
//
// No dependencies. Node 18+ for fetch.
import { readFileSync } from 'node:fs';

const SITE = process.env.SITE_URL || 'https://sam-rad.com';
const HOOK = process.env.VERCEL_DEPLOY_HOOK;
const INDEXNOW_KEY = 'cf53ccc352c5ae796e9118ea88622d50';   // public by design; the file public/cf53ccc352c5ae796e9118ea88622d50.txt proves ownership
const TODAY = process.env.PUBLISH_DATE || new Date().toISOString().slice(0, 10);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 20 * 60 * 1000);
const DRY = process.env.DRY_RUN === '1';

const posts = JSON.parse(readFileSync(new URL('../data/dispatches.json', import.meta.url), 'utf8'));
const due = posts.filter((d) => d.date === TODAY && !d.archived);
if (!due.length) {
  console.log(`${TODAY}: nothing dated today. No rebuild.`);
  process.exit(0);
}
console.log(`${TODAY}: ${due.length} post(s) due:`, due.map((d) => `Nº ${d.number} ${d.slug}`).join(', '));

if (DRY) console.log('dry run: skipping the deploy hook');
else {
  if (!HOOK) { console.error('VERCEL_DEPLOY_HOOK is not set'); process.exit(1); }
  const r = await fetch(HOOK, { method: 'POST' });
  if (!r.ok) { console.error('deploy hook failed:', r.status); process.exit(1); }
  console.log('rebuild triggered');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function live(url) {
  try {
    const r = await fetch(url, { redirect: 'manual', headers: { 'cache-control': 'no-cache' } });
    if (r.status !== 200) return false;
    const html = await r.text();
    const og = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (!og) return false;
    // Check the image on the same host as the page, so a test against a local or
    // preview build checks that build's image, not production's.
    const img = await fetch(og[1].replace(/^https?:\/\/[^/]+/, SITE));
    return img.ok;
  } catch { return false; }
}

const started = Date.now();
const pending = new Map(due.map((d) => [d.slug, `${SITE}/writing/${d.slug}`]));
while (pending.size) {
  for (const [slug, url] of pending) {
    if (await live(url)) { console.log('live:', url); pending.delete(slug); }
  }
  if (!pending.size) break;
  if (Date.now() - started > TIMEOUT_MS) {
    console.error('NOT LIVE after', Math.round(TIMEOUT_MS / 60000), 'minutes:', [...pending.values()].join(', '));
    console.error('Do not post these to LinkedIn until they load.');
    process.exit(1);
  }
  await sleep(30 * 1000);
}

const urls = due.map((d) => `${SITE}/writing/${d.slug}`);
if (DRY) console.log('dry run: would ping IndexNow with', urls);
else {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: INDEXNOW_KEY, keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`, urlList: urls }),
  });
  console.log('IndexNow:', r.status, r.status < 300 ? 'accepted' : await r.text());
}
console.log('Done. Safe to post to LinkedIn.');
