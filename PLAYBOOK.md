# Site Build Playbook

Distilled from the sam-rad.com build and migration, September 2026. Written for an
agent starting a new marketing site from scratch, with no memory of that project.
Everything here was learned by getting it wrong once. Where a rule seems oddly
specific, that is why.

The original project: a Next.js speaker site replacing a Squarespace site, 46 static
pages, JSON-driven content, one CSS file, hosted on Vercel. Two days from first build
to live DNS. The patterns transfer to any content-led marketing site: a documentary
series, an investigations hub, a founder brand.

---

## 1. Working method

### Keep one handoff file, and update it in the same batch as the change

`HANDOFF.md` at the project root. A fresh agent reads it first. It holds: the rules
that keep getting broken, the stack, the design system, the component inventory,
verified content facts, current page order, infrastructure, roadmap, open items.

**Update it in the same commit as the change it describes.** A handoff updated "later"
is a handoff that lies. On the original project the analytics section was silently
skipped because a script asserted on a string that had already changed, and the agent
reported success without re-checking. Re-check.

### Show, then build

For any design decision with more than one reasonable answer, produce two or three
mockups as standalone HTML using the site's real CSS, and let the owner pick. Do not
build the first idea into source and ask afterwards. Mockups are cheap; reverting
source is not.

Name the options by what they trade off, not A/B/C: "credential line under the bio"
versus "credentials card in the sidebar."

### Verify against the built output, never against your intent

After every structural change: build, then grep the generated HTML for what you
expect. Count cells, check headings, confirm links, list section order. On the
original project this caught stale grid numbers ("19 / 9"), a duplicated section,
missing image files, and a redirect loop, none of which were visible in source.

The build page count is a cheap tripwire. Know what it should be and check it every
time.

### One risky thing at a time

Do not combine a site launch with a DNS zone migration, or a dependency upgrade with a
content change. When something breaks in two hours you want one suspect, not four.

### Ship distinctly named packages

If the owner receives files by download, name each delivery for what it is
(`site-source-LAUNCH-FIX.zip`). A Downloads folder accumulates, and an older archive
with the same name got deployed once, shipping a stale config to production.

Never ship the `public/` folder in a source zip. Copying it over the project deletes
every image not in the zip. Send images separately.

---

## 2. Stack decisions that held up

**Next.js App Router, JavaScript, static output, on Vercel.** Zero config deploy,
preview URLs per branch, and the redirect map lives in `next.config.js` where it is
version-controlled.

**Content in JSON files, not a CMS, until the shape settles.** Every content type
(industries, posts, press, clients, resources) is a JSON array in `/data`, and pages
render from it. A CMS models the shape; do not model a shape that is still moving.
On the original project the industry schema changed twice in one afternoon, and the
CMS was correctly parked. Draft the schemas anyway, so they are ready.

**One hand-written CSS file with design tokens at the top.** No Tailwind, no
component library. ~50KB served the whole site. Tokens: paper, paper-white,
paper-soft, ink, ink-deep, accent, accent-deep. Sections must alternate backgrounds;
the owner flagged "bleeding into one color" three times before this became a rule.

**Four runtime dependencies.** Framework, React, React DOM, analytics. Fonts via a
`<link>`. Everything else hand-written. Check `npm outdated` monthly; never bump a
major version without a preview branch.

**Shared sections live in one file** (`components/Blocks.jsx`): hero, CTA break,
booking bar, logo strip, client logos, grids, lists, testimonials. Pages compose
these. New page types reuse them rather than inventing a fourth treatment.

---

## 3. Content patterns

### Data-driven pages with a single template

Nine industry pages rendered from one `[slug]/page.jsx` and one JSON file. Adding a
page is adding a JSON entry. The same pattern works for episodes, investigations,
cases, partners.

Give each entry a `display` field separate from `name` when the headline needs
different words from the nav label ("Work" in the H1, "Future of Work" in the menu).

### The unlisted-but-indexed pattern

An `archived: true` flag keeps a page live and in the sitemap but hides it from index
listings and feeds. Used to keep old high-traffic pages earning search without
letting them define the section. Applies to any archive: old episodes, retired
investigations, legacy posts.

### Never key ordered data by year in a JSON object

JavaScript reorders integer-like object keys ascending. `{ "2025": [...], "2024":
[...] }` renders 2024 first. Use arrays of `{ year, items }`.

### No counters on lists

Never render "All 20", "9 industries", "20 items", or any count of things in a list.
The numbers go stale the moment the list changes and nobody is counting. "See all" or
nothing. This does not cover claims ("50+ countries") which are facts, not counters.

### Separate provenance, always

On the original site, speaking clients and consortium participants were different
claims, and merging them would have been false. Keep them in separate data, separate
components, separate sections, with a visible label ("Consortium participants, not
speaking engagements"). For a documentary or investigations site, the analogue is
sources versus subjects versus partners versus funders. Never let a logo row imply a
relationship that did not exist.

### Curated lists are the owner's, not the agent's

When building a bibliography, reading list, or source list, draft candidates with
verified links and hand them over for cutting. Do not publish a list as the owner's
curation without their review. Every load-bearing number should be checked against
the source before it ships.

### Don't label what an embed already says

A Spotify or YouTube embed prints its own title, show, and date. A label above it
duplicates all three. Let third-party embeds speak for themselves.

### Research and secondary links go below the conversion CTA

If a page's job is a booking, a signup, or a donation, put "go deeper" links after the
final CTA. Anyone who scrolls past the ask without acting is researching, not
converting; give them sources at that point, not halfway down as an exit.

### Generic before specific

A sidebar CTA that said "the healthcare keynote" on a healthcare post was right in
theory and wrong in practice, because there was not enough per-sector content to
justify it. Ship the generic version first; specialize when the content exists to
support it. Record the intent so it is not lost.

---

## 4. Images

### Serve WebP with a JPEG fallback, and generate WebP for every image

Wrap heroes and full-bleed images in `<picture>` with a WebP `<source>`. A 2000px JPEG
at 500KB becomes ~125KB. **But**: a `<picture>` picks its source by format support,
not by whether the file exists. A WebP that 404s renders **nothing**; the browser does
not fall back to the JPEG. Generate WebP for every image, not just the ones you think
you need, and run a checker (below) before every push.

### Prioritize the LCP image

`fetchPriority="high"` on the hero `<img>`. Below-fold images get `loading="lazy"`.
The single biggest perceived-speed win for the cost of two attributes.

### Portrait images in wide slots need positioning, and you have to look

`object-fit: cover` centers by default, and a 2:3 portrait in a 21:9 or 2.16:1 slot
shows 29–32% of its height. Centered, that is the torso; the head is gone. Set
`object-position` per image. Do not estimate where the face is: render four candidate
crops side by side, look, pick.

### Mobile tiles need per-source aspect ratios

Forcing every gallery tile to 4:3 on mobile cut 50% of the height off portrait
photos. Give portrait sources 4:5, landscape 3:2, and anchor portraits at
`center 18%` so heads stay in frame.

### Logo processing

Normalize to 240px tall, transparent background, PNG or SVG. Keying the background by
sampling the top-left corner fails when the logo touches that corner (SHRM, NXP): use
border-connected white regions instead, so white inside the mark survives. Six logos
fit one clean row at ~170px each; seven wraps. Show fewer, stronger marks rather than
a wrapped row.

Typeset names instead of logos is a legitimate fallback, and better than a mixed row
of two logos and eight names.

### Preview generators must inline every image reference

If you produce standalone HTML previews, inline `src`, `href`, `srcset` **and
`srcSet`**. The preview generator on the original project inlined `src` only, and
every hero was invisible in previews for a full day after `<picture>` was introduced,
while the live site was fine. Mobile previews additionally need `@media` blocks
flattened, since clamping the viewport width does not trigger them.

---

## 5. Migration and redirects

### Tier the old content before migrating any of it

Export the old site's search performance (Search Console → Pages, 12 months). On the
original project 8 of 130 posts earned 83% of clicks and 48 earned zero. Three tiers:

1. **Visible** — on-brand, worth reading today. Migrate and list.
2. **Unlisted but indexed** — off-brand but earning search. Migrate with
   `archived: true`, keep the URL earning.
3. **Retired** — redirect to the section index. Do not migrate.

Expect most of an old archive to be tier 3. That is fine.

### Three-tier redirect map

1. Old pages with a new equivalent → permanent redirect to the new path.
2. Migrated content → bespoke rule per item, **above** any catch-all.
3. Everything else → an archive subdomain that keeps serving the old site.

Keep the old site alive on `archive.example.com` for at least a few weeks so nothing
404s, then noindex it once Google has seen the 301s land on real pages.

### Redirects run before pages, so they shadow them

Before adding any route, grep `next.config.js` for a rule matching its path. A rule
for `/press` served the archive for a day after `/press` became a real page. Leave a
comment explaining any deliberately missing catch-all.

### `:path+` not `:path*` when the base path is a real page

`*` matches zero segments, so `/press/:path*` matched `/press` and redirected it to
itself, forever. `+` requires at least one segment. Write a loop simulator: walk every
rule up to six hops and fail on any chain that does not terminate.

### Old blog URLs carry random suffixes

Squarespace appends `-abc12-xyz34`. Strip it for the new slug, keep the full old path
in a `legacyPath` field, and generate the redirect from that field.

---

## 6. DNS and launch

### Find out who actually hosts the DNS zone before touching anything

The registrar (GoDaddy) and the DNS host (Squarespace) were different, and the zone
held the **Google Workspace MX records**. Disconnecting the domain from Squarespace
would have taken the zone, and the email, with it. The registrar's own DNS screen
said "DNS is managed elsewhere"; read that line.

### Launch order

1. Add the archive subdomain to the old host and confirm it resolves.
2. Add apex and `www` in the new host; note the exact A and CNAME values it wants.
3. Make sure the new host's primary domain (apex vs `www`) matches the site's canonical
   tags. Vercel defaulted to `www` while every canonical said apex.
4. In the DNS zone: delete only the old host's A and CNAME records, add the new ones,
   **touch nothing else**. MX, TXT, SPF, verification records stay.
5. Set the archive subdomain as the old host's primary.
6. **Do not remove the apex domain from the old host** if it hosts the zone. It will
   show a red "DNS Error." That is correct.
7. Wait. Then check: apex loads, `www` redirects, a redirected old URL lands, the
   archive serves, **an email arrives**.
8. Submit the sitemap. Noindex the archive two weeks later, not before.

Screenshot the full DNS record list before starting. It is the backup.

### The `.vercel.app` domain is indexable

Vercel's automatic `noindex` covers preview and outdated deployments, not a
`.vercel.app` domain assigned to current production. Redirect it to the real domain
in the Vercel dashboard (Domains → Edit → 301). Do it in the dashboard, not in code:
Vercel redirects at the edge before the app runs, so a code rule never fires.

### Alt domains

Redirect them at the registrar to the main site and disconnect them from the old host,
**after** checking each for its own MX records.

---

## 7. Forms, analytics, footer

**A form with `action="#"` is worse than no form.** It reloads the page and discards
the input while appearing to work. Find these before launch. If there is no service
behind a signup, remove the form; do not wire it to a collector that cannot send,
since opt-in and unsubscribe are legal requirements in the EU.

**Booking or contact forms → Formspree** or equivalent, with a honeypot field and
reply-to set to the inquirer. Four visible fields, the rest behind an expander.

**Analytics:** Vercel Web Analytics (cookieless, no banner) plus GA4 if you want
depth. The GA measurement ID is not a secret; hardcode it in config next to the other
service IDs rather than hiding it in an env var that fails silently when unset. GA
does nothing until the ID is set; Vercel Analytics does nothing until enabled in the
dashboard. Verify both with a realtime view before moving on.

**Footer:** three or four columns, each roughly even. Navigate (the nav), Learn
(archives, resources, side projects), Connect (social and contact). A one-item column
looks broken; fold it. Do not put a social-profile link among productions or vice
versa.

**There is no stable public URL that opens LinkedIn's connect modal.** Link to the
profile and label it honestly.

---

## 8. Scripts worth carrying forward

Included alongside this file.

- `check-images.mjs` — walks built HTML, collects every `src` and `srcSet`, fails if
  any file is missing on disk. Run after `next build`, before `git push`. Exists
  because of §4.
- `preview.py` / `mobile.py` — standalone HTML previews with every asset inlined and,
  for mobile, media queries flattened. Regenerate the preview scripts' inlining regex
  if you add a new attribute that references images.
- The redirect loop simulator pattern from §5, kept inline in the handoff.

---

## 9. Rules for the agent

- Read the handoff before touching anything. Update it in the same batch.
- Build after every structural change. Know the page count. Grep the output.
- Mock up before building when there is a real design choice.
- Never invent a curated list, a client relationship, or a credential. Draft for
  approval, cite what you verified.
- Never ship `public/` in a source zip. Never drag folders in Finder.
- Never write a file with `open(f,'w')` and `open(f).read()` in one expression.
- Run the image checker before every push.
- One risky thing at a time.
- When the owner reports something looks wrong, reproduce it in the built output
  before explaining it. Twice on the original project the explanation was "that's
  my preview generator," and once it was "that's a real bug on the live site."
  They need different answers.
