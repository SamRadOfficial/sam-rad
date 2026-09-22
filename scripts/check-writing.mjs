// Sanity checks on data/dispatches.json. Run before every push: npm run check:writing
//
// Added 22 Sep 2026 after a test record ("not-built-yet", Nº 0099) was left in the data
// by a script test and shipped in a source zip. The date gate hid it, but it would have
// published on 9 October. Every check below would have caught it.
import { readFileSync } from 'node:fs';

const d = JSON.parse(readFileSync(new URL('../data/dispatches.json', import.meta.url), 'utf8'));
const errs = [];
const seen = (key) => { const m = new Map(); d.forEach((x) => { if (x[key]) m.set(x[key], (m.get(x[key]) || 0) + 1); }); return [...m].filter(([, n]) => n > 1).map(([k]) => k); };

for (const k of ['slug', 'number']) for (const v of seen(k)) errs.push(`duplicate ${k}: ${v}`);

const numbered = d.filter((x) => x.number).map((x) => ({ ...x, n: Number(x.number) })).sort((a, b) => a.n - b.n);
numbered.forEach((x, i) => {
  if (i && x.n !== numbered[i - 1].n + 1) errs.push(`gap in numbering before Nº ${x.number} (previous Nº ${numbered[i - 1].number})`);
  if (i && x.date < numbered[i - 1].date) errs.push(`Nº ${x.number} (${x.date}) is dated before Nº ${numbered[i - 1].number} (${numbered[i - 1].date})`);
});

for (const x of d) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(x.date || '')) errs.push(`${x.slug}: date is not YYYY-MM-DD (${x.date})`);
  if (!x.title || !x.deck || !Array.isArray(x.body) || !x.body.length) errs.push(`${x.slug}: missing title, deck or body`);
  if (x.series === 'rad') {
    if (!x.internalId) errs.push(`${x.slug}: R-A-D post without an internalId`);
    if (!x.stamp) errs.push(`${x.slug}: R-A-D post without a stamp`);
    else if (!x.title.toLowerCase().replace(/[^a-z0-9']/g, ' ').includes(x.stamp.toLowerCase().replace(/[^a-z0-9']/g, ' ').trim())) errs.push(`${x.slug}: stamp "${x.stamp}" is not in the title`);
    if (x.image) errs.push(`${x.slug}: R-A-D posts carry no image`);
  }
  if (JSON.stringify(x).includes('\u2014')) { if (x.series === 'rad') errs.push(`${x.slug}: em dash`); }
}

const future = d.filter((x) => x.date > new Date().toISOString().slice(0, 10));
if (errs.length) { console.error(`writing check FAILED, ${errs.length} problem(s):\n  ` + errs.join('\n  ')); process.exit(1); }
console.log(`writing ok: ${d.length} records, Nº ${numbered[0].number} to ${numbered.at(-1).number} unbroken, ${future.length} scheduled`);
