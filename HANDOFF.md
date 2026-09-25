# sam-rad.com — Handoff

Read this before touching anything. Written for a fresh agent picking up with no
memory of prior sessions. Last updated 11 September 2026.

**Live:** https://sam-rad.com
**Old site:** https://archive.sam-rad.com (Squarespace, still serving ~300 legacy URLs)
**Repo:** github.com/SamRadOfficial/sam-rad → Vercel project `samradsite` (auto-deploys on push to `main`)
**Local:** `~/Developer/sam-rad`

`PLAYBOOK.md`, alongside this file, is the generalized version of what this project
taught: method, patterns, pitfalls, and the reusable scripts. It exists so the next
site (illicitshadows.com) starts from the lessons rather than relearning them. This
file is project-specific; that one is not.

`README.md` is a short pointer to this file, nothing more. `ROADMAP.md` was deleted on
10 September 2026: it was a pre-launch document describing 27 pages, ten eras, the
five-stage cycle and a `mailto:` booking form, all of which had been superseded, and a
fresh agent reading it would have acted on retired facts. Its still-live items were
folded into the roadmap in section 9. The original is in git history if it is wanted.

**Build the preview tooling first.** Every design and copy decision on this project is
reviewed as a standalone HTML file with all assets inlined, not as a description. Do
not propose a change in prose when you could show it. `scripts/preview.py` and
`scripts/mobile.py` in the kit do this; if they are missing, write them before
anything else. They must inline `src`, `href`, `srcSet` **and** `srcSet` in camelCase,
and the mobile one must flatten `@media` blocks, since clamping the viewport does not
trigger them. A preview generator that misses `srcSet` silently blanks every hero.

Sam has the working copy with all images. Ask her to zip and upload
`app/ components/ data/ lib/ next.config.js` (and `public/images/` only if you need
to see the photos).

---

## 1. Rules that keep getting broken

**Never ship a zip containing a `public/` folder.** Copying it over the project
replaces the whole directory and deletes all 60+ images. This has happened. Send
`app components data lib next.config.js` only. Send images as standalone files, or
in a zip that extracts to its own folder copied with a trailing `/.` so it merges
rather than replaces.

**Name each zip distinctly.** Sam's Downloads folder accumulates them, and an older
`sam-rad-source` got deployed once, shipping a stale `next.config.js` to production.
Use a suffix when it matters (`sam-rad-source-LAUNCH-FIX.zip`).

**`next.config.js` lives at the project root**, outside the four folders. It is easy
to forget in the copy line and it now holds 57 redirect rules.

**Never tell her to drag folders in Finder.** Finder's Replace deletes anything in
the destination that isn't in the source. It wiped `components/Footer.jsx` once and
`public/images/` once. Always instruct:

```bash
cp -R app components data lib next.config.js ~/Developer/sam-rad/
```

**Never write a file with `open(f,'w')` and `open(f).read()` in one expression.**
Python evaluates the write first, truncating the file before the read. This blanked
all eight pages once. Read into a variable first.

**Always `npx next build` after a structural edit** and check the page count.
Index-slicing edits on JSX have twice removed more than intended.

**Mobile previews need media queries flattened.** Clamping `html` to 390px does not
trigger `@media (max-width:900px)`; the browser reads the real viewport. Working
pattern: unwrap every `max-width` media block ≥390px, append those rules
unconditionally, then wrap the body in a 390px frame.

**A `<picture>` `<source>` that 404s renders NOTHING.** The browser picks the source
by format support, not by whether the file exists, and does not fall back to the
`<img>`. Shipping WebP for only some images blanked two CTA banners on the live site.
Every `.jpg` and `.png` in `public/images/` now has a matching `.webp`. Run
`npm run check:images` after building; it audits every reference against disk and
exits non-zero if one is missing.

**Verify counts after any data change.** Cutting industries from 20 to 9 left stale
`number` fields rendering "19 / 9" in the grid. Grep the built HTML, don't assume.

**Check `next.config.js` before adding a route.** Redirects run *before* page
rendering, so a rule matching a new path silently shadows the page. `/press`
served the archive for a day because of this.

**Use `:path+`, not `:path*`, when a redirect's own base path is a real page.**
`*` matches zero segments, so `/press/:path*` matched `/press` and redirected it to
itself. That shipped an `ERR_TOO_MANY_REDIRECTS` loop. There is a loop simulator
pattern: walk every rule up to six hops and flag any chain that doesn't terminate.

**Never key ordered data by year in a JSON object.** JavaScript reorders
integer-like object keys ascending, which put 2024 above 2025 on `/podcasts` and
2017 above 2018 on `/press`. `data/media.json` uses arrays of `{ year, items }`
for this reason. Don't "tidy" it back into an object.

**Update this file in the same batch as the change**, and include `HANDOFF.md` in
the zip. Sam asked for this explicitly on 9 Sep 2026.

---

## 2. Stack

Next.js **15.5.25**, React **19**, App Router, JavaScript (no TypeScript). All pages
static at build time. One hand-written CSS file. No Tailwind. **No CMS yet.**

```
app/
  layout.jsx              fonts, Person JSON-LD, skip link, Vercel Analytics, GA4
  globals.css             ~73KB, all styling, design tokens at top
  page.jsx                /
  speaking/  meet-sam/  book/  body-of-work/
  cv/page.jsx             /cv        Samantha Radocchia, renders from data/cv.json (see §8)
  samrad-ai/page.jsx      /samrad-ai landing target for the samrad.ai domain
  industries/page.jsx     /industries
  industries/[slug]/      9 pages from data/industries.json
  resources/page.jsx      /resources
  resources/[slug]/       3 guides from data/resources.json
  writing/page.jsx        /writing   (was /foresight until 8 Sep 2026)
  press/page.jsx          /press     archive list, 2018 and earlier collapsed
  podcasts/page.jsx       /podcasts  archive list, newest first
  writing/[slug]/         18 posts from data/dispatches.json
    Body.jsx              renders the block format (see §5)
    ShareLinks.jsx        client component: LinkedIn intent + copy to clipboard
  sitemap.js robots.js not-found.jsx
components/
  Nav.jsx                 client: desktop mega-menu (3 cols) + mobile drawer
  Footer.jsx              credential line, nav, socials. No newsletter, see §8.
                          "Order the books" removed from Learn, 11 Sep 2026.
  Blocks.jsx              every shared section (see §4)
  MediaList.jsx           renders /press and /podcasts from data/media.json
  IndustryIcon.jsx  MoveIcon.jsx  logos.jsx (both now unused)
data/
  industries.json         9 live entries
  industries-archive.json 10 retired entries, restorable
  dispatches.json         18 posts, 8 visible + 10 unlisted
  clients.json            59-brand name → logo file registry
  media.json              press + podcast archives, ARRAYS of { year, items }
  resources.json          3 guides
  cv.json                 the single source for /cv, both CV PDFs, and the ATS docx
  eras.json moves.json cycle.json testimonials.json
  featured-in.json logo-wall.json
lib/site.js               config, meta() helper, Person schema
next.config.js            57 redirect rules
public/images/            154 photos
public/logos/             88 files including press marks + LICENSE.md
public/cv/                two generated PDFs and one docx, never hand-edited
scripts/                  check-images.mjs, preview.py, mobile.py, build-cv-*.py
scripts/fonts/            Inter subsets embedded in the CV PDFs, see §8
corpus/                   voice notes and samples, not built or deployed
```

```bash
npm install
npm run dev      # localhost:3000
npm run build    # must print "Generating static pages (47/47)"
npm run check:images   # audits every image reference against disk, run before pushing
```

`npm run build` prints one harmless warning, `autoprefixer: end value has mixed
support`, from `align-items:end` at `globals.css` line 427. Cosmetic, not a bug.

### Dependencies

Deliberately minimal. Four runtime packages, no UI library, no CSS framework, no
analytics SDK beyond Vercel's.

| Package | Version | Why |
|---|---|---|
| `next` | 15.5.25 | Framework. Upgraded from 14.2.5 on 8 Sep 2026 to close a security advisory. |
| `react` / `react-dom` | 19 | Required by Next 15. |
| `@vercel/analytics` | 2.0.1 | Web Analytics collector. Added 9 Sep 2026. |
| `eslint` / `eslint-config-next` | 8 / 15 | Dev only. |

Fonts load from Google Fonts via `<link>` in `app/layout.jsx`, not a package.
Everything else is hand-written.

### When to check for updates

- **Monthly:** `npm outdated` and `npm audit`. Patch and minor bumps on Next and
  React are usually safe; run `npm run build` and confirm 47/47 before pushing.
- **Never bump a major version without a preview branch.** Next 16 broke the Vercel
  deploy once already (Turbopack). Push to a branch, let Vercel build a preview, and
  click through Home, an industry page, a writing post, and the booking form before
  merging.
- **After any dependency change**, check the two dynamic routes specifically
  (`industries/[slug]`, `writing/[slug]`). Next 15 made route `params` async and
  those were the only files that needed code changes.
- **`npm audit` currently flags a high-severity postcss advisory.** The only fix is
  Next 16. Known and accepted; do not chase it without testing on a preview.

### Version control

`main` is the only branch and it auto-deploys to production on push. There is no
staging environment. **The site is live, so every push goes straight to sam-rad.com.**
For anything structural, push to a branch first and use the Vercel preview URL.

---

## 3. Design system

Tokens at the top of `globals.css`:

```
--paper       #F5F1EA   page ground
--paper-white #FCFBF6   alternating sections
--paper-soft  #EDE7DA   strips, eras band
--ink         #0F1F3D   text, borders, dark sections
--ink-deep    #08132A   footer, deep CTA bars
--mint        #5BC4A0   accent on dark
--mint-deep   #3FA383   accent on light
```

Bebas Neue for headings, labels, numbers, buttons. Inter for body.
**American English. No em dashes** — she asked for these removed; use commas or
periods. The only em dashes left are inside verbatim testimonial quotes.

`.mint-fill` is a stamp: mint background, ink text, `text-shadow:none`. **One per
heading.** Three in a row was rejected. For multiple accents in one sentence use
`.mint-word` (coloured text, no background).

Section backgrounds must alternate. She has flagged "bleeding into one color" three
times. Check what sits above and below before adding a section.

Photos have no borders. UI cards (industry cells, move cards, sidebars, testimonial
cards) do.

**No counters on lists.** Never render "All 20", "9 industries", "20 items", or any
count of things in a list. Sam asked for these removed site-wide on 9 Sep 2026: the
numbers go stale the moment the list changes and nobody is counting. Use "See all"
or nothing. The `IndustryGrid` `total` prop was deleted so it cannot drift back.
This does **not** cover the stats row ("50+ Countries", "2× Bestsellers",
"4× Founder") — those are claims about Sam, not counters on a list.

**Don't label an embed with what the embed already says.** The first version of
"Covered on the record" printed the show name and episode title above each Spotify
player, which prints both itself. Let third-party embeds speak for themselves.

**Media rows are the shared pattern.** `/press`, `/podcasts`, and the Body of Work
highlights all use `.mrow`: outlet in Bebas, title in Inter, year right-aligned,
arrow on hover. Keep new media listings in this pattern rather than inventing cards.

---

## 4. Components in `Blocks.jsx`

| Component | Notes |
|---|---|
| `PhotoHero` | full-bleed hero. Props: `image, eyebrow, children, descriptors, lead, cta, caption, short, compact, position`. `short` = 68vh, `compact` = auto height (booking page). `position` sets `object-position`; **home uses `center top`** so her head is never cropped. |
| `CtaBreak` | full-bleed photo + heading + Book Sam. `center`, `bureau` variants. |
| `BookBar` | inline CTA strip. Variants: default navy, `mint`, `deep`. |
| `LogoStrip` | 24-logo screenshot at `max-width:900px`. Label defaults to "Trusted by governments, Fortune 500s, and global institutions" everywhere. |
| `ClientLogos` | per-industry logo row. Resolves names through `clients.json`. **Renders nothing below 2 matches** — this is why some industry pages show no logo row. |
| `IndustryGrid` | industry cells with icons |
| `DispatchList` | post rows with thumbnails |
| `Testimonials` / `TestimonialBanner` | cards / full-bleed banner |
| `Moves` | four moves. **Icons removed 9 Sep 2026**; `MoveIcon.jsx` and its CSS remain in case they return. |
| `Eras` | six-era timeline (see §6) |
| `Sizzle` | YouTube embed, `itaGfenlxPw` |
| `Bureau` | "Managed by Brandy Gibson…" line |
| `JsonLd` | schema injection |
| `MediaList` | (own file) renders `/press` and `/podcasts`. `openYears` puts the rest behind a `<details>` toggle. |
| `Cycle`, `YouAreHere` | **unused.** Both cut. Do not reinstate without asking. |

Not in Blocks: `.photo-band`, a pure image divider with no copy, written inline.

---

## 5. Content schemas

### Industry pages

`data/industries.json`, one entry per page, rendered by `industries/[slug]/page.jsx`:

```json
{ "name": "...", "slug": "...", "number": "...", "heading": "...",
  "body": ["...", "..."], "audiences": "...", "forces": ["...", "...", "..."],
  "logos": ["..."], "band": "image.jpg",
  "featured": true, "featuredOrder": 1 }
```

Adding a page is adding an entry plus a matching icon in `components/IndustryIcon.jsx`.
Never edit a generated page directly. `logos` resolves through `clients.json` and needs
at least two matches or the row does not render at all, see §4.

### Writing: one body of work, one number

Decided 22 Sep 2026, the day R-A-D Nº 0009 went live. **`/writing` is the section and it
is always Writing.** R-A-D is a series inside it, as Dispatches was, as essays and notes
will be. The heading, the nav, the schema `isPartOf` and the byline all say Writing.

- **One running number across everything**, four digits, continuing from the eight
  dispatches. The next post is 0010 whatever kind it is. Never restart a sequence for
  a new series; that was tried on the morning of 22 Sep and lasted an hour.
- **The kind is a label beside the number, not a namespace:** "Nº 0009 · R-A-D". It
  comes from `series` in the record (`dispatch` if absent) via `lib/series.js`. Add
  new kinds there. **No kind prints beside a post as of 22 Sep 2026** (`shown: false` on
  both). Dispatch went first: the site retired the word. R-A-D followed the same evening,
  because once nearly every row said R-A-D the label separated nothing and crowded the
  industry, which is the part a reader scans for. List rows and post meta now carry the
  number, the industry and the date.

  **The series is still named, three times over, where it does work:** the `/writing`
  hero lead no longer names it (Sam, 22 Sep 2026); it reads "The most pressing and
  provocative questions shaping our future (and present), one answered every weekday",
  her wording with the dash turned into parentheses. So the series is named in a
  small sidebar card on every R-A-D post linking back to the series, and every generated
  preview card, which reads "Nº 0021 · R-A-D" wherever a post is shared. `lib/og-card.jsx`
  uses the series `label` directly, so `shown` never affects the cards. Turning the label
  back on in lists is a one-word change.
- **No episode numbers.** R-A-D questions are evergreen; "episode 14" tells a reader
  nothing and dates the piece. The pipeline's own `RAD-0001` IDs are internal.
- **The word "dispatch" is out of reader-facing copy** except as the label on the
  legacy posts. Section heads say "Latest writing"; the keynote card says "Everything
  here is a preview of the keynote."
- The index hero is "Read the pattern.", Sam's pick on 22 Sep 2026 over "Questions worth
  asking." and "Notes from the frontier." It keeps the thesis without repeating the
  homepage and Speaking headline, and works for every kind of post.

Record fields that matter beyond the body: `series`, `readingTime` (else computed at
220 wpm), `lastUpdated` (feeds `dateModified`), `metaDescription` (else the deck),
`imageKind: "card"` for designed covers, which renders at native size instead of the
21:9 crop. Body blocks: `p h2 h3 pull ul ol img`; R-A-D uses `h2` for its two
section heads, legacy posts use `h3`.

### R-A-D batch 01, published 22 Sep 2026, backdated

Twelve questions from the series agent's batch export (internal IDs RAD-0002 to 0013)
went live at once. **At Sam's decision they are backdated, one per day, 10 to 21
September**, the days the site was being built, with the original Nº 0009 moving to
Nº 0021 on the 22nd so numbers still follow dates. Advised against and decided anyway;
recorded so nobody later mistakes the dates for the real publishing history.

- **What was done to keep the backdate honest where it could be:** `lastUpdated` is the
  real build day (22 Sep) on all twelve, so `dateModified` in the schema and `lastmod`
  in the sitemap are true. Only `datePublished` is backdated.
- **Ordering rules used, and to reuse:** no post dated before its own newest source
  ("Would you let an AI agent spend your money?" cites 16 and 18 Sep pieces, so it sits
  on the 19th), and no two neighbors share an industry hub, including the 22nd.
- **Copy changes made:** "five years before" became "four years before" in "Will you have
  to prove you're human online?" (clone 2020, personhood-credentials paper August 2024).
  In Nº 0021: the duplicated "Here's the pattern." removed, "for thirty years" became
  "for decades". Sam kept the five-stage cycle in "Why does every transformation feel
  like it's failing halfway through?", and its two keynote statistics stay unlinked.
- **Sources:** 9 of the 15 linked sources verified against search results before ship
  (Fortune, Pew 2026, KFF, arXiv, TechCrunch, Adobe, Mews, PR Newswire, CRS IF12769).
  Six not yet re-checked; see §10.
- The export's cover plan (hooks, three crops, a default OG image) was superseded before
  it landed: no covers, generated cards, one `stamp` word per post.

### The R-A-D prompt pack

The series agent works from `RAD-PROMPT-PACK`, which lives outside this repo. **v1.8, 22 Sep 2026,** is aligned with the site as built: Writing not R-A-D, one running number and no episode numbers, no blog covers and a required `stamp`, site batches live on arrival, LinkedIn cuts as their own export, every booking link to `/speaking`, the live record schema, plus journalist requests (Qwoted, Featured.com) and the monthly bureau packet. When a site decision changes any of those, update the pack in the same batch, or the next export arrives in the old shape.

### New share card, 25 September 2026

Every series post's link preview is now the **cream card** Sam chose from her own reference:
SAM RAD on the header line with a rule to a compass star; the question in **Anton**, heavy
and condensed, sitting on the wave band, with the `stamp` word in mint type; a grid, a wave
bundle crossing at one point, and a mint orbit with a rising arrow; the footer "CHANGE HAS A
PATTERN | sam-rad.com" It replaces the ink card with the mint block.

- `lib/og-card.jsx` `renderFieldNotes()`; the route `app/writing/[slug]/opengraph-image.jsx`
  calls it. The old `renderCard()` stays in the file, unused, as a fallback.
- The fixed parts are one image, `lib/og/field-notes-bg.png`, drawn once. Change the art
  there; the text layer is generated per post.
- `lib/fonts/Anton-Regular.ttf` (SIL Open Font License, `Anton-OFL.txt`), taken from the
  `@fontsource/anton` package. Used on the cards only; the site itself stays Bebas.
- **Footer, 25 Sep 2026: "CHANGE HAS A PATTERN | sam-rad.com".** The tagline (briefly
  "Rethink. Adapt. Disrupt." with bold initials) was replaced by the site's address the same
  day, so Inter Bold was removed again. The footer sits on a cream backing so the wave lines
  stop behind it instead of running through the text.
- **Question size is fitted, not guessed** (fixed 25 Sep after a long question shared on
  LinkedIn came out small, three lines floating under a wide empty band). Each size from 150
  down to 72 is tried, wrapping the words with Anton's real letter widths from
  `lib/og/anton-widths.json` (measured once from the font; regenerate it if the font
  changes), and the largest that fits four lines in the 900 by 372 box wins. The simulation
  counts the margin after each line's last word, as the renderer does, with a 4% allowance.
  All 60 series cards checked: none reaches the header. The block is bottom-aligned, so it
  sits on the wave band.
- Decided and removed along the way: a "Field Notes" label and the post number (Sam, 25 Sep),
  and a thin ink frame (tested in a mocked LinkedIn feed, added nothing).
- Links already shared keep their old card on LinkedIn until run through Post Inspector.

### Share previews, checked live 25 September 2026

Sam asked whether the social previews were broken. On the live site they are not: each series
post carries `og:type` article, a `summary_large_image` Twitter card, and `og:image` pointing
at its generated card (absolute URL, 1200 by 630, PNG), and the card URL serves an image.
**Where previews go wrong is LinkedIn's cache.** LinkedIn builds a link's preview the first
time it sees the URL and keeps it. A post composed or scheduled before its page went live
(the daily job reveals it about 7:30 a.m. Eastern) caches a blank card. Fix per link:
LinkedIn Post Inspector, paste the URL, Inspect, which refetches. Rule: compose LinkedIn
posts only after the morning's page loads.

What was genuinely weak, and fixed: 20 series posts had share descriptions shorter than 110
characters (the batch export's `metaDescription` was often just the deck's first sentence,
"You don't.") or longer than 160. Each now takes the deck's opening sentences up to 160,
cut at a word with an ellipsis where needed. `check:writing` now warns on any series post
outside 110 to 160. Three legacy dispatches remain short; their decks are short.

### Series renamed: R-A-D became "Change Has a Pattern with Sam Rad", 25 September 2026

Sam's call. Display layer only: the records keep `series: "rad"`, and URLs, slugs, numbers,
dates and post text are untouched. Why: "R-A-D" had no search value and two competing
expansions, while "Change Has a Pattern" is already the keynote, the homepage headline and
the field guide, so every post now reinforces what planners can book; "with Sam Rad" keeps
her name in it for longevity. The tagline "Rethink. Anticipate. Disrupt." existed to spell
R-A-D and is retired; the description line carries the series.

What changed: `lib/series.js` label "Change Has a Pattern" and name "Change Has a Pattern
with Sam Rad"; the generated preview cards now read "Nº 0021 · CHANGE HAS A PATTERN"; the
sidebar card on every series post; the `/writing` meta description; the Article schema
`genre`. `/writing` itself was checked visibly identical: the label has not printed in
lists since 22 Sep. **Outside the repo, still to follow:** the prompt pack (name, tagline,
lockup), the podcast cover art, and the LinkedIn and YouTube images carrying the R-A-D mark.

### Schedule moved up, 23 September 2026 (Sam: "we are ready to go now")

**Batches 02 and 03 go live one per weekday from Thursday 24 September**, Nº 0022 to 0068,
ending **Friday 27 November**. They were dated 9 October to 14 December; only the dates
moved (and `lastUpdated`, `nextReview` with them), numbers and order unchanged. Checked
first that no source in either batch is dated after its new publish day. **Batch 04 is now
due before 27 November**, not 14 December. The sections below keep the original dates as
history.

LinkedIn follows the site day for day, in one file, `RAD-LINKEDIN-SCHEDULE.md`, which
replaces the two exports. Batch 01's eleven remaining LinkedIn cuts (Nº 0010 to 0020,
already live on the site) moved to the end of the run, 30 November to 14 December.

**Favicon changed the same day to "RAD"** in ink on the mint square (was "SR"), at the same
sizes and in the same three files in `app/`.

### Bureau materials, 23 September 2026

One document for every bureau, `SAM RAD - Speaker Materials - 2026.docx`, kept outside the
repo: banner, name and title, highlights, short and full bio, stage intro, the keynote, how
to pitch, links, booking and fees, and, after a single page break that can be deleted, a
table of corrections for existing listings. It replaces ESB's old document, whose "How to
pitch" section described **a different speaker**, and it follows `bio-facts` wording
throughout. Plus `Sam-Rad-Booking-Overview.pdf`, the two-pager, rebuilt with the new bio
line and the booking link to `/speaking`. **Open with Sam:** the fees differ between ESB's
figures and the two-pager's, and which of two videos is current.

### R-A-D batch 02, scheduled 22 Sep 2026

Seventeen questions, RAD-0014 to 0030, as **Nº 0022 to 0038, dated one per weekday from
Friday 9 October to Monday 2 November 2026**, matching the LinkedIn export exactly. They
sit in `dispatches.json` now and the date gate hides them until their morning; the daily
publish job reveals each one. **This replaces "live on arrival" from batch 02 onward**
(Sam, 22 Sep): the site and LinkedIn go out the same morning, the site first.

Sam's decisions, 22 Sep:
- **Quantum reframed.** "Will quantum computing break encryption before 2030?" competed with
  Nº 0007 for the same search. Now "What are you encrypting today that must stay secret in
  2035?", stamp `secret`, new deck, related link to Nº 0007 so the two pages read as a pair.
  The body already argued the new question and is unchanged.
- ***Mindjacked* is "the next book"** in public copy. Four body mentions changed; its four
  self-citations dropped.
- **Archived-industry tags kept** on five posts: Manufacturing (Nº 0027, 0038), Energy (0030,
  0036), Insurance (0033). No hub pages; three posts in one industry is the evidence to
  revive one.
- **The five stages stay** in Nº 0022, as in Nº 0013.
- **Sources verified:** Gartner's 74 percent (2016) to 43 percent (2022), via HBR, May 2023,
  now linked, and the sentence no longer says "the number I've seen most often". Delft's
  self-healing concrete is linked to Jonkers et al., *Ecological Engineering* (2010).
  The other linked sources in the batch were not re-checked here.

### R-A-D batch 03, scheduled 22 Sep 2026

Thirty questions, RAD-0031 to 0060, as **Nº 0039 to 0068, one per weekday from Tuesday
3 November to Monday 14 December 2026**, matching `RAD-LINKEDIN-BATCH-03-EXPORT.md`.
Hidden until each morning, like batch 02. **The run ends 14 December: batch 04 must be
in the repo before then**, or the site and LinkedIn go quiet over the holidays.

Standing decisions applied without asking again: *Mindjacked* is "the next book" (eight
posts; self-citations dropped); the five stages stay (Nº 0039, 0054). Every source the
export flagged "verify" was checked on 22 Sep and linked, or the claim changed:
- **Cut:** the "vice president of electricity" story in "Should your company have a Chief
  AI Officer?" (Nº 0043). No source for the title could be found. The post now opens on
  its own pattern (CIOs, CDOs), with a new closing line; deck rewritten to match.
- **Corrected:** "Nobody is born there" (Antarctica, Nº 0041) is now "Almost nobody": at
  least eleven children have been. "A permanent expression of strain" (bicycle face,
  Nº 0054) is now "some said permanent". The nuclear post (Nº 0059) no longer credits the
  IEA with Belgium, Italy and Germany reversing course: that clause was not in the IEA's
  reports, and the IEA recorded Belgian retirements in 2025.
- **Confirmed and linked:** the GENIUS Act (signed 18 July 2025, P.L. 119-27, CRS); IEA
  record generation in 2025 and 63 reactors under construction; the Literary Digest's
  "The Bicycle Face", 7 Sep 1895; La Reynie's lanterns, 1667 (Lapham's Quarterly); the New
  York elevator operators' strike, September 1945 (NPR); Antarctic population figures.
- **Sam's call still open:** "Will we hack our own brains?" (Nº 0050) touches medical
  territory under the Healthcare hub; it says "I'm not a doctor" and stays off treatment.

**The uploaded `RAD-BATCH-02.zip` of 22 Sep is the pre-edit export. Do not install it**:
batch 02 is already in `dispatches.json` with Sam's decisions applied, and the old copy
would bring back the duplicate quantum question and the *Mindjacked* references.

**Reviewing scheduled posts:** `PREVIEW_DATE=2026-11-02 npm run build` builds as if it were
that day, so scheduled posts render for review. Never set it on Vercel.

**`npm run check:writing`**, added 22 Sep: unique slugs and numbers, an unbroken sequence,
dates that run with numbers, and a stamp and internal ID on every R-A-D post. Run it
before every push. **Why:** a test record, `not-built-yet` as Nº 0099 dated 9 October,
was left in the data by a script test and shipped in the `DAILY-PUBLISH` source zip. The
date gate hid it, but it would have published on 9 October as a copy of Nº 0021. The
check fails on it three ways. It also found Nº 0021 had no internal ID; now `RAD-0001`.

**Homepage, 22 Sep:** the Featured in press strip moved up, from after the book to between
the innovators photo and the keynote, with its button changed to "In the press" (`/press`).
Proof straight after "who she is", before the pitch. The client logo strip stays under
the hero; putting press there too was mocked and rejected, as two logo strips in a row.
**Then, same day (Sam):** the press strip lost its button entirely, and a **Latest questions**
strip went where the press strip used to be, between the book bar and "On stage.
Worldwide." Sam's final form: **"Latest writing."** with the stamp on "writing", the tag
"Writing", the three newest published posts of any kind as list rows (the same rows as
`/writing`), and one **"Read the writing"** button under them, on every screen size.
Because the daily publish job rebuilds the site each morning a post goes live, the
homepage links to a fresh post every weekday, which is the point for discovery.
Homepage section colors, final (Sam, 22 Sep 2026): Latest writing **cream** (`--paper`),
On stage. Worldwide. **white** (`--paper-white`), testimonials **cream**, so each reads as
its own band. The gallery's white is set inline on the homepage only; `.gallery` is shared
with Meet Sam, SamRad.AI and Body of Work, which keep their color. `LatestQuestions` in `Blocks.jsx` keeps the two other mocked layouts (`cards`, `lead`)
behind `variant`.

### Daily publishing, built 22 Sep 2026

**Phase 1, the site, automated.** `.github/workflows/daily-publish.yml` runs
`scripts/daily-publish.mjs` every weekday at 11:30 UTC (7:30 a.m. Eastern in summer
time, 6:30 in winter, so always before the 8:00 LinkedIn post). It finds posts dated
today, triggers a Vercel rebuild so the date gate reveals them, waits until each page
returns 200 and its preview image loads, then pings **IndexNow** (Bing, which feeds
ChatGPT search and Copilot). A day with nothing dated skips the rebuild. If a page is not
live within 20 minutes the run fails and **GitHub emails Sam: that is the signal not to
post that day's LinkedIn yet.** Tested 22 Sep against a local production build: a live
post passes, an empty day exits cleanly, a missing page fails.

- IndexNow key file: `public/cf53ccc352c5ae796e9118ea88622d50.txt`. Public by design.
- One-time setup (Sam): a Vercel deploy hook for `main`, saved in GitHub as the
  repository secret `VERCEL_DEPLOY_HOOK`. **Done and tested 22 Sep 2026**: the dry run
  passed on GitHub. First live run: Friday 9 October. Test with Actions, Daily publish, Run workflow
  (dry run is the default).
- GitHub pauses scheduled workflows in repositories with no activity for 60 days. Any
  push resets it.
- **Sam's working copy lives at `~/Developer/sam-rad`**, moved out of iCloud-synced
  Documents on 22 Sep 2026. In Documents, iCloud was creating conflict copies ("app 2",
  "components 2", "data 2", and so on) whenever whole folders were replaced mid-sync, and
  was syncing `node_modules`. The duplicates were deleted. When Finder asks during a
  paste, the answer is always **Replace**, never Keep Both: source zips carry complete
  folders by design.
- **Sam installs source zips by copying in Finder, which hides dot-folders.** The first
  push of this workflow left `.github` behind and GitHub showed "Get started with GitHub
  Actions". Fix, 22 Sep: in Finder, Command + Shift + . shows hidden items; leave it on so
  `.github` copies with everything else. Tell her again if a future zip adds any other
  dot-file.

**Phase 2, LinkedIn, deliberately manual until Sanity.** Sam pastes each weekday's post
from the LinkedIn export after 8:00, once the page is live. Reasons, 22 Sep 2026: a
LinkedIn developer app needs approval; its access tokens expire about every 60 days and
need re-authorizing; n8n's LinkedIn node was broken against LinkedIn's API as of July
2026; posting through the API means supplying the link preview's title, description and
image by hand; and the first month is when the link-card versus image-first test runs.
LinkedIn Articles have no API at all and stay manual permanently. Revisit when Sanity
lands and approvals live in Studio (roadmap items 8 and 9).

### Scheduling: the publish-date gate

`lib/writing.js` exports `isDue` (dated on or before the build day, UTC) and
`isPublished` (due and not archived). **Every place a post is built or listed uses
them**: the post pages and their cards, `/writing`, the hubs, the sidebar, the sitemap.
A future-dated post is therefore invisible everywhere until a build runs on or after its
date. Proven on 22 Sep with a post dated 2027-01-01: not built, not in the sitemap, not
on `/writing`, not on its hub.

**Sam's call, 22 Sep 2026: posts go live on arrival, all of them, even several on one
day.** Nothing is held back for a daily cadence, so the gate is a capability, not a
schedule; with every post dated on or before its push day it changes nothing. The
daily-redeploy half (a Vercel Deploy Hook fired each morning by n8n or a GitHub Actions
timer) is only needed if she later wants a post to appear on a future day by itself.
Roadmap item 8.

**Hubs** show writing from one post, capped at the three most recent (was: hidden below
two posts, capped at four).

**The writing list** (`DispatchList`), reworked 22 Sep 2026: three columns, number,
post, date. The kind and a **short** industry name ride on one meta line above the title
("R-A-D · Healthcare"), because a category column wrapped to two lines at "R-A-D ·
Healthcare & Life Sciences". Short names live in `industries.json` as `short`; full
names stay everywhere else. **On industry hubs the industry is dropped** (`hideIndustry`),
since every row shares it. The component keeps two alternative layouts behind
`variant` (`column`, `under`) from the comparison; `meta` is the one in use.

**The `/writing` index**, set 22 Sep 2026: the newest live post is a **featured block**
at the top of page 1 (`FeaturedPost` in `Blocks.jsx`, modeled on the Illicit Shadows
newsroom's Featured slot), and is left out of page 1's list so it never appears twice.
Below it the list is paginated at `PER_PAGE = 10` in `lib/writing.js`.

- Page 1 is `/writing`. Pages 2 onward are `/writing/page/[n]`, statically generated.
  `/writing/page/1` redirects to `/writing` so page 1 never exists at two URLs.
- **Each page is canonical to itself**, not to page 1. Pointing them all at page 1
  tells search engines the older listing does not exist.
- `dynamicParams = false`: an out-of-range page is a 404, not a runtime render.
- **The pager renders nothing while there is one page.** At nine posts there is no
  `/writing/page/2` and no pager; they appear on their own at the twelfth live post.
  Tested by building at three per page, which produced pages 2 and 3 with correct
  canonicals and prev/next links, then restored to ten.
- **Order is array order**, newest first. There is no date sort, so a new post is
  prepended to `dispatches.json`, never appended. Sanity (item 7) should replace this
  with a query ordered by `number`.
- **The featured block is text only**, Sam's pick (option C) on 22 Sep 2026: meta row,
  large title, deck, Read link. No cover, by design; the cover leads the post itself
  and is the link preview everywhere else. Do not add it back without asking.

**Images on writing posts, decided 22 Sep 2026.** R-A-D posts carry **no cover**. The
thumbnail-style covers the series agent produced were off brand (yellow, not Bebas, YouTube
grammar) and restated the question directly under an H1 that already asked it. The page
goes straight from the ink header into the body. Legacy dispatches keep their stage
photos, on the page and as their preview.

**Link previews for R-A-D are generated, one per post,** by
`app/writing/[slug]/opengraph-image.jsx` through `lib/og-card.jsx`: the question in Bebas
on ink, the running number and kind in mint, one word in a mint block. The record's
`stamp` field names that word; without it the last word is used, which is usually weak
("FOR?"), so the series agent must supply it. Bebas is bundled at
`lib/fonts/BebasNeue-Regular.ttf` (SIL Open Font License) because the site otherwise
loads it from Google Fonts, which the renderer cannot read.

**The trap, found the hard way:** in Next 15.5 the `openGraph.images` returned by
`generateMetadata` **wins** over the file-convention image. The first build generated
every card correctly and advertised none of them. `page.jsx` must name
`/writing/<slug>/opengraph-image` explicitly as the image for posts without a photo.
Verify by grepping `og:image` in the built HTML, never by the presence of the file.

Only posts without `image` get a generated card (`dynamicParams = false`), so legacy
posts are untouched and the build does not render images nobody links to. Each R-A-D
post therefore adds **two** to the build's page count: the post and its card.

**The site-wide default preview is `hero-meet.jpg`** since 22 Sep 2026, in `SITE.defaultOg`.
It was `hero-work.jpg`, the red-stars stage shot taken off the homepage because it read
as a politician, which meant every page without its own image had been sharing it.

### Writing posts (legacy dispatch format)

`data/dispatches.json`. Each entry:

```json
{ "number": "0018", "slug": "...", "title": "...", "date": "2025-09-17",
  "deck": "...", "image": "panel-dell.jpg", "tags": ["AI"],
  "industry": "Technology & AI", "industrySlug": "technology-ai",
  "legacyPath": "/blog/old-squarespace-slug",
  "archived": false,
  "body": [ ... ], "sources": [{ "x": "...", "url": "..." }] }
```

**Body blocks:** `p`, `h3`, `pull`, `ul`, `ol`, `img`. Inline markup inside any of
them: `**bold**`, `*italic*`, `[text](url)`. Rendered by `writing/[slug]/Body.jsx`.

The inline parser uses `matchAll`, not `exec` with a global regex. **Do not change
this** — a shared `lastIndex` across recursive calls caused an infinite loop and a
build timeout.

**`archived: true`** keeps a post live and in the sitemap but hides it from the
Writing index and industry feeds. Used for old high-traffic posts kept for SEO.

`industry` is optional. Pages guard for its absence.

Every post ends with a LinkedIn follow line, then share links.

---

**The opening bio line, set 22 Sep 2026** (homepage, Meet Sam, and the industry pages):

> Sam Rad is an anthropologist and entrepreneur who spent two decades inside technology
> revolutions, founding four companies across AI, blockchain, and connected hardware,
> and learning one thing above all: change has a pattern.

**Revised the same evening: "connected hardware" replaced "e-commerce"** (Sam's pick of
four). It is the Chronicled work (NFC and Bluetooth authentication chips, IoT sealing, cold
chain sensors) and reads as where things are going, not where they were. Dropping
e-commerce does not break "two decades": the first company already used AI to map taste
in 2010. "IoT" was rejected as a mid-2010s buzzword; "cryptography" as the most futuristic
but at the cost of "blockchain", the word financial services and supply chain buyers
search. The homepage description, capped at 160, says "tech revolutions" and "in AI,
blockchain, and connected hardware" to fit; the page copy keeps the full wording.

**AI comes first, deliberately**, so a reader sees the current field before the older
ones. "Across", not "through the rise of", because the reversed order would otherwise
claim a sequence that did not happen. E-commerce **stays**: it is what makes two decades
add up, and three waves are what make "change has a pattern" evidence rather than a
slogan. Considered and rejected for this line: "metaverse" (reads as a hype cycle that
did not pay off; say "immersive worlds" if it is ever needed) and "applied cryptography"
(overlaps with blockchain in a short list, and dropping blockchain would cost the term
supply chain and financial services buyers search for). Both belong on `/cv` and in the
fuller Meet Sam paragraphs instead.

### Page metadata, audited 22 September 2026

Rules, and what they fixed:

- **No page title repeats "Sam Rad".** `app/layout.jsx` appends " | Sam Rad" to every
  title, so a title that also contained it printed the brand twice: Press, Podcasts,
  Contact, Meet Sam, the CV and all nine industry hubs. Titles are now under 60
  characters everywhere, which is what search results show.
- **Every description is 110 to 160 characters**, checked in the built HTML, not the
  source. Over-long before: the CV (271), SamRad.AI (224), the provenance guide (213),
  Press, Podcasts, Resources, Writing. Too thin: Body of Work (93).
- **The nine industry hubs had one templated description** with the industry word swapped
  in, so nine pages said the same thing. Each now lists that hub's **own forces** from
  `industries.json`, as many as fit, built by `forcesLine()` in the hub page: longest
  version first, singular grammar when only one force fits, the hub's `short` name as the
  label ("Future of Work", not "Work").
- **A resource page's `deck` is page copy, not a description.** Where a deck runs past 160
  characters the record now carries `metaDescription`, trimmed at a sentence, and the
  page uses it for search while the deck stays visible.
- **One job title everywhere: The Change Futurist.** It was "Keynote Speaker and Futurist"
  in the site-wide Person block and "Anthropologist and technologist" in the CV's. Three
  descriptions of one person make a weaker entity for both search and AI answers. Keep
  the two Person blocks in step.
- **Descriptions state what the page answers**, since AI answers quote the useful
  sentence, not the sales line. The homepage now names the identity line and the thesis.

When adding a page: write the title without the brand, keep the description inside 160,
and check the numbers in the built HTML.

### Favicon, added 22 September 2026

There was none before: tabs showed a blank page and Google showed a generic globe beside
the result. Now **"SR" in ink on a mint rounded square**, Bebas, the site's own stamp
color (Sam's pick, B of three). Chosen over cream on ink because the ink square
disappears in dark-mode tab bars; mint stands out in both. Files, all in `app/` so Next
writes the link tags itself: `favicon.ico` (16, 32 and 48 in one file), `icon.png`
(512, which also covers Google's 48-pixel minimum) and `apple-icon.png` (180, the home
screen icon). Source art: the 512 file.

**The build now reports 77 static pages, not 74**: the three icon files count as routes.

**Contact page, under the form**, 22 Sep (Sam): "For all other inquiries:
sam@sam-rad.com", the address itself as the `mailto:` link text, so a machine that blocks
mailto still shows an address to copy. The form covers bookings, the line at its top
routes press to `/press`, and this line catches everything else.

**Contact page lead**, 22 Sep: "Every room is facing change. Yours walks out ready." Sam
proposed "We are facing change. Walk out ready for it"; this keeps her length and her
"walk out ready" while staying pointed at the buyer's audience, and it echoes the
homepage's "Every room is asking the same question" and "Walk out ready."

## 6. Content facts — verified, do not change without asking

- **Sam Rad**, born Samantha Radocchia. Both names on Meet Sam.
- Keynote is **Change Has a Pattern**. No trademark symbol.
- Bureau: **Brandy Gibson, Executive Speakers Bureau**. Mailto is
  `brandy@executivespeakers.com`, cc `sam@sam-rad.com`, subject `SAM RAD | Keynote`.
- **No fees published.**
- Education: **Colgate + NYU**. Not Cornell.
- Company: **NYOUM (YOUM.AI)**, generative AI communication platform. Mentioned on
  Meet Sam as plain text, **not linked** (she asked for the link removed).
- **Illicit Shadows, LLC co-founded with David M. Luna**, a former U.S. diplomat and
  State Department official. Out of it came **MISTIC**, home to **Project Helix**.
- Trained in **anthropology and linguistics**; research in simulated realities,
  cognitive security, post-human society.
- **Forbes 30 Under 30 (2017)** — Meet Sam sidebar only.
- **2× #1 bestsellers.** Radical Next ISBN 979-8-89138-248-0 (2025);
  Bitcoin Pizza ISBN 978-1-5445-0443-8 (2019). No publisher listed for the 2019 book.
- **Four granted patents**, all assigned to Chronicled, Inc., Sam first-named
  inventor on every one. Verified against Google Patents and Justia, 11 Sep 2026:
  - US 11,354,676 B2, *Open Registry for Identity of Things*, granted 7 Jun 2022
  - US 11,113,699 B2, *Open Registry for Identity of Things*, granted 7 Sep 2021
  - US 11,107,088 B2, *Open Registry for Internet of Things*, granted 31 Aug 2021
  - US 10,210,527 B2, *Open Registry for Identity of Things Including Social Record
    Feature*, granted 19 Feb 2019

  Five further applications are filed but not granted. **The two 2021 patents are
  granted continuations, not pending applications**, and the "Including Sealed
  Materials / Item Location Feature / Tamperproof Tags" titles belong to three of the
  pending applications, not to those two numbers. `data/cv.json` conflated them until
  11 Sep 2026. Plus early protocol work open sourced into the Ethereum standards,
  predating and paralleling ERC-721. `data/cv.json` is the authority and all three CV
  artifacts render from it. This entry said "three patents" until 10 Sep 2026.
- Six eras: Agrarian (Grain & Plough) · Industrial (Steam & Loom) ·
  Internet (Air & Mobile) · **Acceleration (AI & Space, "You are here")** ·
  Bio-Integration (Chips & Cells, "Next") · Post-Quantum (Qubits & Worlds, "After next").
  Classical and Exploration were **cut**. Future dates are deliberately "Next" and
  "After next" rather than decades.
- Four moves: See the pattern · Let go of the old way · Lead the jetpack · Take it off.
- Five-stage cycle — **cut from the site.** "Too much about the dip." Do not reinstate.
- Speaking stats (9-in-10, 14%, 4%) have been **validated** by Sam. Sources not yet
  cited on the page; she owes them. Her strategy memo forbids the viral
  "95% of pilots fail" statistic — never use it.

Recurring lines: "Change has a pattern" · "You're going to be OK" ·
"Sam doesn't just predict the future. She lives in it." · "Walk out ready" ·
"We don't have an adoption problem. We have a reinvention problem."

Photo captions, all verified: the red-suit gesture shot is **CITE**;
`neil-degrasse-tyson.jpg` is **Dell Technologies World**; `cta-audience.jpg` is
**Bangkok**; `audience-women.jpg` is **SHRM · Dallas**; `hero-work.jpg` and
`hero-foresight.jpg` are **Ivanti Solutions Summit**; `hero-meet.jpg` is
**SIM Executive Conference**.

**`celebrate-humanity.jpg` and `ai-overlords.jpg` are misnamed.** The first shows an
"Embracer of AI Overlords" ribbon; the second shows her holding Radical Next. Both
unused. The real Celebrate Humanity stage shot is `celebrate-humanity-stage.jpg`.

---

## 7. Current page order

**Home** — PhotoHero (`hero-work`, center top) → LogoStrip → Meet Sam split →
TestimonialBanner → band (`crn-innovators`) → Keynote → Eras → CtaBreak → Industries →
band (`chicago-ballroom`) → Body of Work → BookBar → Stats (desktop) → Gallery → CtaBreak

**Speaking** — PhotoHero (`hero-meet`) → LogoStrip → Keynote prose → BookBar → Eras →
band (`gofest-doctrine`) → Moves → BookBar → Jetpack split → Sizzle →
TestimonialBanner → Testimonials → BookBar → CtaBreak

**Meet Sam** — PhotoHero (`audience-women`) → Bio split → TestimonialBanner → Prose →
band (`cisco-live`) → Skydive split → BookBar → Gallery → CtaBreak

**Industries** — PhotoHero (`hero-industries`) → IndustryGrid → band (`gofest-mindset`)
→ Dispatches → CtaBreak

**Industry page** — PhotoHero (`hero-industries`, shared by all 9) → LogoStrip →
Prose + sidebar → ClientLogos → band (per-industry `band` field) → Themes →
CtaBreak → Dispatches → Related → CtaBreak

**Writing** — PhotoHero (`cta-audience`) → Dispatches → CtaBreak → Industries → CtaBreak

**Book** — PhotoHero (`panel-dell`, compact, `center bottom`) → Form + sidebar →
TestimonialBanner

**Body of Work** — PhotoHero (`hero-foresight`) → Books → CtaBreak (Illicit Shadows) →
Sizzle → band (`gofest-faster-horses`) → Gallery → CtaBreak

**Resources** — PhotoHero (`hero-industries`) → guide cards → CtaBreak (`cta-red`)

**Resource guide** — PhotoHero (per-guide `image`) → linked source list → CtaBreak

**CV** — no PhotoHero. Its own `.cv-hero` (name, thesis, focus areas, contact line,
three download buttons) → at-a-glance panel and the narrative sections from
`data/cv.json`. The only page that does not use the shared hero, deliberately: it is
a document, not a pitch.

**SamRad.AI** — PhotoHero (`samrad-ai-avatar`) → Prose → Themes → Gallery → Prose →
CtaBreak. Landing target for the `samrad.ai` domain, see §8.

**Hero selection rule:** heroes must be visually quiet in the bottom-left text zone.
A measured "busy" score (mean luminance gradient with the scrim applied) of ≤1.6 is
the target; anything with legible slide text on an LED wall was rejected. Busy stage
shots belong in `.photo-band` interstitials where no type sits on them.

---

## 8. Infrastructure

**DNS:** registrar is **GoDaddy**, but nameservers point at **Squarespace**, so the
DNS zone is edited inside Squarespace. `A @ → 216.198.79.1` and
`CNAME www → 5525d82313f37756.vercel-dns-017.com` point at Vercel.
`CNAME archive → ext-cust.squarespace.com` serves the old site.

**Do not remove sam-rad.com from Squarespace** while the zone still lives there.
Squarespace hosts the DNS zone including five Google Workspace MX records.
Disconnecting takes the zone, and her email, with it. It shows "DNS Error" in
Squarespace; that is expected and correct.

### Moving DNS to GoDaddy

Started 14 September 2026, ahead of the Sept 22 date. The principle: **build the new
zone at GoDaddy first and only flip nameservers once both zones answer identically.**
Then propagation, which can take up to 48 hours, is invisible, because whichever
nameserver a resolver reaches gives the same answer.

`scripts/dns-snapshot.sh` exists for this. Run it as `before`, do the work, run it as
`after`, and diff. An empty diff is the goal. It queries 1.1.1.1 directly rather than
the local resolver, which caches and will report no change when everything changed.

The order, and it is not negotiable:

1. **Snapshot.** `./scripts/dns-snapshot.sh before`. Also screenshot the Squarespace
   DNS panel, because a `dig` sweep only finds records you thought to ask about.
2. **Recreate every record at GoDaddy**, in GoDaddy's own DNS management, while the
   nameservers still point at Squarespace. Nothing goes live yet, so this is safe.
   The easy records to forget are not A and CNAME, they are **TXT**: SPF, the
   `google._domainkey` DKIM record, `_dmarc`, and any domain-verification strings.
   Losing those does not stop mail; it quietly sends it to spam, which is worse
   because nobody notices for a week.
3. **Flip the nameservers** at GoDaddy from Squarespace's to GoDaddy's own.
4. **Wait, then verify.** `./scripts/dns-snapshot.sh after`, diff against `before`.
   Separately, send and receive a test email in both directions. MX resolving is not
   the same as mail flowing.
5. **Squarespace is no longer load-bearing, as of 14 Sep 2026.** Until then, eight
   rules in `next.config.js` redirected to `archive.sam-rad.com`, so cancelling the
   subscription would have sent every old blog URL into a dead host, which is worse
   than a 404 because the visitor leaves the site entirely. Those eight now land on
   live pages: `/blog/:slug*` and `/events/all*` to `/writing` and `/speaking`,
   the glossary, `/bitcoin` and `/glossary` to `/body-of-work#bitcoin-pizza`, and
   `/jobs` to `/meet-sam`. Grep for `ARCHIVE` before cancelling and expect zero rules
   using it; the constant is kept only as a reference for backfill work.
   The `archive` CNAME can stay in the zone harmlessly, or be dropped with the
   subscription.

**Do not lower TTLs first.** It is the usual advice and it is wrong here: TTLs live in
the Squarespace zone, so lowering them means editing the thing you are leaving, then
waiting for the old TTL to expire anyway. Identical zones make the TTL question moot.

**Other domains.** `samrad.ai`, `samradocchia.com`, `samradofficial.com`, and
`samantharadocchia.com` all redirect at GoDaddy and were disconnected from Squarespace
on 9 Sep 2026. `samrad.ai` points at `/samrad-ai`; the rest at the homepage.

**The `samradsite.vercel.app` domain 301s to sam-rad.com**, configured in the Vercel
dashboard under Project, Settings, Domains. Not in `next.config.js`: Vercel redirects
at the edge before the app runs, so a rule there would never fire. Vercel's automatic
`x-robots-tag: noindex` covers preview and *outdated* production deployments, not a
`.vercel.app` domain assigned to current production, so without this it would compete
with sam-rad.com in search.

**There is no newsletter.** The footer form was removed on 9 Sep 2026: it posted to
`action="#"`, so it silently discarded every address while appearing to work. Sam has
a Substack she does not write, and judged that a speaker site's traffic books rather
than subscribes. The footer now links to `/writing` and LinkedIn instead. Do not
re-add a signup form without a real ESP behind it (opt-in and unsubscribe are a GDPR
requirement, and Sam is in Spain).

**Analytics.** Two, both mounted in `app/layout.jsx`:
- **Vercel Web Analytics** via `@vercel/analytics`. Also has to be switched on in the
  Vercel dashboard under Project, Analytics; the package alone does nothing. No-ops in
  dev and off-Vercel. Cookieless, so no consent banner.
- **Google Analytics 4**, property `G-KLJW49X8L4`, set as `SITE.gaId` in
  `lib/site.js` and rendered from `app/layout.jsx` on all 47 pages. The script
  renders only when that string is non-empty, so emptying it disables GA site-wide.
  The measurement ID is **not a secret** (it is in the page source of every site
  using GA), so it is hardcoded alongside `formEndpoint` and `sizzleId` rather than
  hidden in an env var, which would fail silently if unset. GA sets cookies and
  carries consent obligations that Vercel Analytics does not.

To verify either is working: GA has **Reports, Realtime**, which shows a visit within
about 30 seconds; Vercel shows an "online" count on the Analytics tab. Both are
blocked by ad blockers and Brave shields, so test in a clean browser. Vercel's
"Get Started" panel is onboarding, not an off switch: Web Analytics is on by default
and the panel disappears once the first event lands.

### Bureau credit, linking policy

Set 12 September 2026. **The credit text appears everywhere; the bureau's own URL
does not.** `executivespeakers.com/speaker/sam-rad` has its own booking form on it, so
linking it beside a "Book Sam" button hands the lead to a third party at the moment of
conversion, and as of the September audit that page still calls *Radical Next*
upcoming.

- **No `mailto:` anywhere it is the only affordance.** Corrected 12 Sep 2026 after
  readers reported the agent link as broken: `mailto:` is blocked on many corporate
  machines and fails **silently**, so a name that is only a mailto looks like a dead
  link. Where an address is genuinely the right channel (`/press`, and the agent card
  on `/contact`), **print the address as visible text** and wrap that in the mailto, so a
  blocked handler still leaves something to copy. Everywhere else the credit is plain
  text and the Book Sam button carries the action.
- **Redirect aliases** `/book`, `/booking` and `/hire` point at `/contact`, the form's
  canonical URL since 21 Sep 2026. Cheap insurance against what people type.
- **Bureau URL is linked only where the page is not asking for a booking:** `/press`
  (interview requests genuinely should reach the agent) and `/cv` (institutional
  context). `Bureau` takes a `linked` prop for this. Do not set it on a page with a CTA.
- The same unlinked rule is hardcoded in `CtaBreak`'s `bureau` block, which sits
  directly under its button.
- **The footer link stays**, and so does `SITE.bureau.orgUrl` in the Person schema
  `sameAs`. Neither is at a decision point, and the schema entry is the entity
  consistency the bureau audit is chasing.
- Credits were cut from five to three: two on the homepage and two on Meet Sam read as
  insecure. One per page.
- `.bureau-line` is dark ink, so on a photo hero it needs `light` or it renders
  invisible. That shipped broken for one build on `/press`.

**Crawlers.** `app/robots.js` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot,
PerplexityBot and Google-Extended alongside `*`. This is deliberate: the AI-visibility
checks in §9 assume these agents can read the site. Do not tighten it without saying so.

### The CV artifacts

`data/cv.json` is the single source for **three** outputs: the `/cv` page, two PDFs,
and an ATS docx. Edit the JSON, rerun both scripts, ship all three. Never edit a PDF
or the docx by hand or they drift from the page.

```bash
python3 scripts/build-cv-pdfs.py   # public/cv/*.pdf   needs reportlab
python3 scripts/build-cv-docx.py   # public/cv/*.docx  needs python-docx
```

Section order per artifact lives in `PRO_ORDER` and `ACA_ORDER` in the PDF script.
The professional PDF led with patents from the first commit until 11 Sep 2026; it now
opens with Current practice, then Invention and standards, then Ventures, matching
`/cv`. Patents first answered a question the reader had not asked yet. The academic
order is inverted on purpose, education and fieldwork first, and it adds a
research-interests paragraph. Do not "align" the two. The **docx is the machine copy**:
single column, no tables, conventional section names (Experience, Patents, Education,
Skills) that applicant tracking systems recognize. It is plain on purpose. Do not
style it.

Three traps in the PDF builder, each of which shipped once:

- **Fonts are embedded from `scripts/fonts/`** (Inter, subset to Latin Extended-A,
  about 40KB each). The Helvetica built-ins are Type 1 with no diacritics, which is
  why Medellín and Yucatán used to extract as black squares.
- **Never convert `&amp;` to `&` before handing text to ReportLab.** It parses its own
  mini-HTML, so a bare `&` becomes a broken entity. That is how "R&D lab" shipped as
  "R&D; lab".
- **Every entry is wrapped in `KeepTogether`** so a page break cannot land inside a
  role and glue two roles together on extraction. After any layout change check with
  **both** `pdftotext` and `pdftotext -layout`: every entry must start on its own line
  with date, title, and organization.

**Entry shape, decided 14 Sep 2026: prose paragraph plus labeled sub-lines, not
bullets.** The role is four or five sentences of prose, voice intact. Structured facts
(products, networks, verticals) go in `<span class='sub'>` lines with a bold label:
`Products:`, `Networks:`, `Built:`. That is what a recruiter or ATS wants from bullets
without the document reading as a job application. A full bullet version was built and
rejected: it pushed the professional PDF from four pages to five and flattened the
argument in every sentence into a feature. The renderers all handle `<ul><li>` if it
is ever wanted, but do not reach for it.

A row in any `cv.json` section can be `{"head": "..."}` instead of label and html.
That renders a subhead: it is what groups patents into Granted and Filed, and what
puts the Concurrent Appointments break inside Ventures and Appointments.

The page links the files with a `?v=` query string, `PDF_V` in `app/cv/page.jsx`.
**Bump it whenever the files are regenerated** or browsers serve the cached copy.

The PDFs are not tagged PDFs. Open-source ReportLab cannot emit a structure tree, so
item 2.5 of the September 2026 CV brief is unresolved. Reading order does extract
correctly in both `pdftotext` modes, which covers parsers; real screen-reader tagging
needs a different toolchain.

**Booking form** posts to Formspree (`https://formspree.io/f/xgaepolw`), set in
`lib/site.js` as `formEndpoint`. Notifications go to sam@sam-rad.com only; adding
Brandy is a Formspree dashboard change on a paid plan. Honeypot `_gotcha` field,
`_replyto` set to the inquirer.

**Redirects:** 57 rules in `next.config.js`. Three tiers — pages with a new
equivalent, the 18 migrated posts (**these must stay above** the `/blog/:slug*`
catch-all), and everything else to `archive.sam-rad.com`.

**Squarespace cannot be retired** until the remaining archive content moves, because
it serves both `archive.sam-rad.com` and the DNS zone.

---

## 9. Roadmap

### Booking form moved to `/contact`: DONE 21 September 2026

The form lived at `/book`, which on an author's site reads as the books. Two
failures proved the point: the CV linked both book titles to the booking form by
mistake, and the URL was about to travel bare in the YouTube description and the
bureau correction copy. First planned as `/booking`, then changed to `/contact` on
21 Sep once Sam set the rule below, because the form's URL no longer needs to be
self-describing; it needs to be what people type.

**The rule: every external booking link points at `/speaking`, never at the form.**
YouTube, the bureau correction copy, business cards, slides, email signatures.
`/speaking` makes the case and carries the button; a buyer dropped cold onto a form
asking for event date and audience size is being asked to commit before being
persuaded. The form is one click from `/speaking`.

What shipped:

- `app/book` moved to `app/contact`, canonical and sitemap follow.
- **The redirect trap, handled.** `/contact` was itself a redirect *to* `/book`. That
  rule was **deleted**, not reversed, because redirects run before pages and it would
  have shadowed the new route. Same failure class as the `/press` loop in §1.
- `/book`, `/booking` and `/hire` each resolve to `/contact` in **one hop**, verified by
  walking every alias through the redirect table: zero loops, zero chains.
- All fifteen internal links rewritten, including the default `href` in `CtaBreak`
  (`Blocks.jsx`), which feeds every call-to-action band without appearing in a page
  file. Built HTML carries zero `href="/book"`.
- `/books` untouched, still `/body-of-work#books`.
- **A routing line above the form**: "Press or interview request? Go to the press
  page." `/contact` is what people type for anything, but the form only asks about
  events.
- The page headline stays "Book Sam Rad." and every button still reads "Book Sam". The
  URL changed, not the language.
- `channels/youtube.md` updated to `/speaking` in all four places.

---

0. **Hero sizzle reel. BUILT AND PARKED, 12 September 2026.** The plumbing is done and
   on `main`; the homepage is back on the still. Sam parked it because the clip's
   quality is not good enough and she will produce a new one. **Do not re-enable the
   current reel.** When a better clip lands, re-encode it with the recipe below, drop
   it in as `hero-sizzle.mp4` / `.webm`, and add `video="hero-sizzle"` back to the
   `PhotoHero` on `app/page.jsx`. Nothing else needs to change.

   `PhotoHero` takes `video="<basename>"`, which resolves to
   `/public/video/<basename>.webm` then `.mp4`, with `image` serving as the poster.
   The first clip was 1920x1080, 12.3s, with an audio track, at 4.3MB; it shipped as
   1600x900, audio stripped, 1.3MB MP4 and 1.1MB WebM, and those files are still in
   `public/video/` as a reference encode.
   - Known weakness in the parked clip, worth avoiding in the replacement: around the
     five-second mark it cuts to a pale blue interview shot and the headline contrast
     drops even with the scrim. Keep the loop tonally dark, or dark in the lower left
     where the type sits.
   - The poster (`hero-sizzle-poster.jpg`) shows before load, on a decode failure, and
     whenever the visitor prefers reduced motion. That last case is handled in CSS by
     hiding `.hero-video`, which leaves the `<picture>` underneath visible. Do not
     remove the `<picture>`; it is the fallback, not a leftover.
   - The scrim (`.photo-hero::after`) carries `z-index:1` so it sits over the video,
     not just the image. Drop that and the headline loses its contrast mid-loop.
   - `preview.py` and `mobile.py` inline `/video` as well as `/images`, so a standalone
     preview actually plays. Without that a video hero previews as a still poster and
     the reviewer cannot tell.
   - **`check:images` still does not audit video.** A missing or misnamed video source
     fails silently, exactly like a broken `<picture>`. Extend the script.
   - Re-encode recipe, for a replacement clip:
     `ffmpeg -i in.mp4 -an -vf scale=1600:-2 -c:v libx264 -crf 27 -preset slow -movflags +faststart -pix_fmt yuv420p out.mp4`
     and `-c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1` for the WebM.

1. **Audit the site for AI discoverability and keywords.** Added 18 September 2026.
   The site is fully indexed by Google (42 of 42 URLs) but nothing has checked how it
   reads to the systems that increasingly do the recommending. This is the audit, not
   the fix; it produces a list, and the fixes get scheduled after.

   What to actually check:
   - **Entity consistency.** Same job the bureau audit did off-site, done on-site.
     Is Sam described identically in the Person schema, the meta descriptions, the
     hero copy and the CV? Divergent job titles and company names are what make a
     model hedge.
   - **Schema coverage.** `/cv` has a Person block. Nothing else does. Candidates:
     `Book` on Body of Work, `Event` once `/events` exists, `Article` on each writing
     post, `FAQPage` where a page genuinely answers questions, `Organization` for
     RADOC and Illicit Shadows, and `speakableSpecification` on the keynote copy.
   - **Answerability.** Models quote passages that answer a question cleanly in one
     place. Check whether "what is perceptual security", "what are the four moves"
     and "what is the dip" each have a single quotable paragraph, or whether the
     answer is scattered across three sections.
   - **The stat citations.** Still uncited on Speaking, see below. An uncited number
     is one a model will not repeat.
   - **Keyword reality check.** Search Console query data against the terms the site
     actually targets: `keynote futurist speaker`, `change management speaker`,
     `future of [industry] speaker`. Where impressions are high and clicks are low,
     the title and description are the problem, not the content.
   - **Crawler access.** `robots.js` already allows GPTBot, OAI-SearchBot, ClaudeBot,
     PerplexityBot and Google-Extended. Confirm from server logs that they are
     actually crawling, which is the monthly check nobody has run yet.
   - **The `/sources` idea from the Illicit Shadows brief applies here too.** A page
     that makes claims citable is the highest-leverage thing a site can do for AI
     search, and this site currently has none.

   Do this **after** the DNS move settles, so Search Console data is not confounded by
   a nameserver change.

2. **Three more resource guides**, in this order and not all at once. Six lists is
   double the upkeep of three; four current lists beat six stale ones.
   - **Government & Public Sector — "Institutional Trust in a Synthetic Age."** The
     strongest candidate and Sam's own territory: perceptual security, Illicit Shadows,
     the Luna work. Client row is UN, WEF, Federal Reserve, OECD, Aduanas México, City
     of New York. Likely anchors: EU AI Act transparency obligations, NIST AI Risk
     Management Framework, OECD AI Policy Observatory, CISA deepfake guidance, and the
     FCC robocall ruling already cited on the fraud page.
   - **Future of Work — "What the Evidence Actually Says About AI and Jobs."** The
     predictions are contested, the evidence is not, and separating the two is the value.
     Deepest buyer group: SHRM, DallasHR, LinkedIn, Skillsoft, SCRUM Alliance. Anchors:
     WEF Future of Jobs Report (Sam has advised WEF), MIT Media Lab "Your Brain on
     ChatGPT" (already cited in Blurring Reality), ILO and Stanford AI Index labor chapters.
   - **Retail & Consumer Brands — "Proving What's Real."** Connects the Chronicled
     counterfeit work to the synthetic-influencer argument on that page. Anchors: C2PA
     content provenance, FTC endorsement guides as applied to AI-generated influencers,
     EU AI Act disclosure rules. Shares the OECD counterfeit data with supply chain.

   **Avoid for now:** Technology & AI becomes a generic AI reading list; Hospitality and
   Higher Education have content available but the smallest buyer groups. Ideally build
   each one *after* booking in that sector, so it answers what a real room asked.

3. **Leaving Squarespace.** Sam's five-step list, 22 Sep 2026, with where each stands:

   | # | Step | Status |
   |---|---|---|
   | 1 | Migrate DNS to GoDaddy | **Done and verified 22 Sep.** Sam entered the target zone below, set `samradocchia.com` to forward to sam-rad.com, and confirmed the checks. Nameservers moved 22 Sep to `ns69`/`ns70.domaincontrol.com`, before the zone was rebuilt, so mail and `www` briefly depended on stale caches. Target zone: A `@` 216.198.79.1; CNAME `www` to the Vercel target `5525d82313f37756.vercel-dns-017.com`; CNAME `archive` to `ext-cust.squarespace.com` until retirement; **one** MX, `smtp.google.com` priority 1 (Google's current single-record setup, as on Illicit Shadows; the five `aspmx` records were retired); TXT SPF `v=spf1 include:_spf.google.com ~all`, replacing Squarespace's `_spfm` include, which died with the old zone; TXT `google-site-verification`; DKIM at `google._domainkey`; DMARC at `_dmarc`. GoDaddy auto-created a DMARC of `p=quarantine` reporting to its own mailbox, which with no DKIM and no SPF would have sent Sam's outgoing mail to spam; set to `p=none` until DKIM verifies. |
   | 2 | Blog and press pages on sam-rad.com | **Done** as `/writing` and `/press`. What remains is the old posts themselves: see step 2b. |
   | 2b | Capture the old blog | **Text captured 22 Sep; images pending.** Sam's WordPress export became `sam-rad-archive-2026-09-22`, kept at `~/Developer/sam-rad-archive`, outside this repo: the original XML, `archive.sqlite`, JSON and CSV. It holds 121 blog posts (18 already on `/writing`, 103 not), 67 glossary entries, 35 press items and 19 pages. The export links to 421 images on Squarespace's CDN but does not contain them. **Sam's call, 22 Sep: the images are not needed**, so they were not downloaded; the text is the record. Once Squarespace is cancelled, image links inside archived post bodies will stop working. The live site does not depend on any of them: checked, zero Squarespace-hosted URLs in the source or the built pages. If an old post is ever backfilled into `/writing`, it needs new images. `fetch-images.py` stays in the archive folder in case that changes before cancellation. The export omits event pages; `scripts/archive-squarespace.py` captures those if a record is wanted. |
   | 3 | Re-point archive redirects | **Done 14 Sep.** No rule references `archive.sam-rad.com`. Old blog URLs land on `/writing`, the 18 backfilled slugs on their own posts. |
   | 4 | Events and glossary | **Decided 22 Sep: keep the redirects as they are.** `/events/all` to `/speaking`; the Bitcoin Pizza glossary (67 entries), `/glossary` and `/bitcoin` to `/body-of-work#bitcoin-pizza`. The glossary text survives in the archive. |
   | 5 | Retire Squarespace | **Done 22 Sep.** Subscription cancelled and the `archive` CNAME deleted. The archive lives on only in `~/Developer/sam-rad-archive`. |

   Decoupled on purpose: steps 1 and 5 no longer depend on each other, because nothing
   on the live site depends on the archive.

4. **Monthly R-A-D production session.** Added 22 Sep 2026, Sam's plan. One working
   session a month produces the next month of R-A-D in a batch:
   - **Writing:** the month's questions drafted, fact-checked and signed off together,
     exported in the batch format of RAD-BATCH-01 (records plus one file per post).
   - **Video:** each question recorded as a short, in the same sitting.
   - **YouTube titles and descriptions written for AI search:** the title is the
     question verbatim; the description opens with the 40 to 60 word answer, then links
     to the post on `/writing`. The rules are in `channels/youtube.md`.
   - **Scheduling:** posts go live on the site when they arrive (Sam's rule, 22 Sep);
     the LinkedIn cuts go out one per weekday. Automating that is item 9, n8n.
   - Each batch export should carry a `stamp` word per post and no blog cover.

5. **New sizzle reel** cut for the **industry pages**, replacing the placeholder.
   Separate from the homepage hero reel in item 0; that one is a silent background
   loop, this one is a watchable reel with sound.
6. **Bring back dispatch thumbnails** once the Writing archive has enough posts with
   distinct images. Removed 9 Sep 2026: four of the eight visible posts shared the same
   NYC portrait set, so the 96px column showed near-identical crops, and a crop that
   small carries no information anyway. The CSS rules are commented in `globals.css`
   next to `.disp`. Revisit at roughly twenty posts.
7. **Re-industrialize the dispatch CTAs.** The sidebar on every writing post links to
   `/speaking` with generic copy, and the industry dispatch feed only appears once a
   sector has two posts of its own. Both were deliberate on 9 Sep 2026: with 8 visible
   posts there was not enough per-sector content to justify pointing a healthcare
   reader at the healthcare keynote. Once the archive is backfilled, point the sidebar
   at the matching industry page (the `industrySlug` field on each post already
   carries it) and the feeds will reappear on their own.
8. **Sanity CMS. Unparked 22 Sep 2026.** It was parked until the design settled, which
   was the right call when writing meant eight posts. It no longer does. R-A-D publishes
   about once a weekday, so roughly twenty posts a month would each be a hand edit to
   `dispatches.json`, a full source zip, and a production deploy. That is code
   deployment used as a publishing tool, and every post risks the site.

   With Sanity, a post is a content edit and the code does not move. The zip-and-copy
   loop stays for code and design; content stops using it.

   - **Writing first, and only writing.** Industries, clients and testimonials change
     monthly at most and can stay in JSON. Do not migrate what is not hurting.
   - **The draft schemas predate today.** The `post` schema must gain everything the
     record gained on 22 Sep: `series` (reference to a series document, so a new kind
     is content rather than code), the running `number`, `readingTime`, `lastUpdated`,
     `metaDescription`, `imageKind`, `tags`, `sources` as an array of label and URL,
     and body blocks as Portable Text with `h2`, `h3`, `pull` and lists.
   - **The number is assigned on publish, not on draft,** so two drafts can never claim
     the same one. A Sanity document action can take the next integer.
   - **Studio at `/admin`**, not on a Sanity subdomain, so it is one property.
   - **On-demand revalidation** on publish, not full-rebuild webhooks. A post should go
     live in seconds without triggering a production build.
   - **Covers through Sanity's image CDN**, which gives responsive sizes for free and
     retires item 10 for the writing covers at least.
   - **Migration script first**, moving all 18 records including the ten archived ones,
     then verify every `/writing/[slug]` renders byte-identical before switching.
     Keep `dispatches.json` in the repo as a frozen fallback for one release.
   - Do this on a branch with a Vercel preview, not on `main`. It is the largest change
     the site has had since launch.

9. **Automation with n8n.** Added 22 Sep 2026. **Comes after Sanity, not before.**
   Automating writes into a JSON file in git automates the wrong thing; n8n writing to
   Sanity's API is clean, reversible and auditable.

   What it should do, in order of value:
   - **The R-A-D pipeline.** The series agent's export (question, deck, body, cover,
     sources, LinkedIn copy) becomes a **Sanity draft**, never a published post. Sam
     approves in Studio; publishing is a human act.
   - **Gate LinkedIn on the page being live.** Every export says "do not publish the
     LinkedIn post until this page is live". Make that a check rather than a rule to
     remember: on publish, n8n requests the URL, confirms a 200 and that the `og:image`
     resolves, and only then posts or schedules at 8:00 a.m. Eastern.
   - **Schedule the LinkedIn Article** seven days after the page, with the "Originally
     published at" line top and bottom.
   - **Append to the content log.** Sam keeps one running CSV catalog of every piece of
     writing, tagged by type (provocative question, informational, educational,
     motivational, statistic, infographic). n8n appends the rows the export already
     specifies, with the live URLs filled in after posting.
   - **Booking inquiries.** Formspree submissions from `/contact` into one sheet or
     CRM with the source recorded, which is the "booking inquiries by source" metric
     in the monthly list below, currently measured by nobody.
   - **The monthly measurement.** Search Console clicks and impressions for the three
     keyword groups, and the AI-crawler bot counts, pulled on the first of the month.

   Guardrails, non-negotiable:
   - **Nothing reaches the live site without a human approving it.** `main` deploys to
     production and Illicit Shadows material has handling rules that an automation
     cannot judge.
   - **No credentials in this repo.** LinkedIn, Sanity and Google tokens live in n8n's
     credential store only. Self-hosted or n8n Cloud is Sam's call; record which here.
   - **Every workflow exports to JSON and is committed** under `automation/` so it can be
     read, reviewed and restored. An automation nobody can read is a liability.

10. **Responsive images.** Parked 9 Sep 2026. A phone downloads the same 2358px hero
   as a desktop: 797KB where 195KB would do, a 75% saving on mobile. WebP and
   `fetchPriority` are already in place, so this is the remaining win. Two options:
   the cheap one adds a 900px WebP per hero plus a `srcset` to the `<picture>`
   elements in `Blocks.jsx`, about an hour; the thorough one converts all 38 `<img>`
   tags to Next's `Image`, about a day. Do the cheap one first.
11. **Move to Claude Code.** Considered and deferred on 8 Sep 2026. Sam prefers to
   keep working in chat with the zip-and-copy loop. Worth revisiting for mechanical
   work (bulk migrations, repeated builds) while keeping copy and design decisions
   in chat, where the reasoning is discussed rather than just executed. A fresh
   Claude Code session starts with no context: point it at this file first.

### Carried over from ROADMAP.md, folded in 10 September 2026

These were the items still live when that file was retired. Everything else in it had
already shipped or been superseded.

**Sam's to do**
- **Export LinkedIn posts. DONE, 14 Sep 2026.** In the repo at `corpus/linkedin/`:
  904 posts and 53 articles, all public visibility. Read `corpus/linkedin/README.md`
  first; the corpus contains two distinct eras of writing and the guide must weight
  the recent one. This unblocks two things:
  - **The voice guide.** Being done in a **separate thread**, not this one, and the
    output lands in `corpus/VOICE.md`. Until that file exists, `VOICE-NOTES.md` is the
    reference. **Read `corpus/VOICE.md` before writing any copy for the site once it
    exists.** That single line is the entire coupling between the two threads.
  - **The dispatch backfill** on `/writing` is **closed**: the 18 legacy posts were the
    selection. New writing comes from R-A-D and the voice guide, not the old archive.
- **Bureau listing audit. DONE, 12 Sep 2026**, recorded in `sam-rad-bureau-audit.xlsx`
  (not in this repo; Sam holds it). 31 listings audited, ranked by severity and
  priority. **The remaining work is correction copy, which Sam is writing with her
  team**, then sending the same text to every bureau. The audit's Correction Text tab
  is the template and is deliberately blank.

  What it found, since this is the entity-consistency picture AI search sees:
  - Book called "upcoming" on 7 listings; published February 2025.
  - Wrong book title, *Radical Next: Thriving in Times of Radical Change*, on 4. That
    is an old working title, so two titles are in circulation.
  - Company named LOVE rather than NYOUM on 3; "CEO of LOVE" on Keppler.
  - Wrong training line, "anthropology, engineering, and symbolic systems", on 6.
    AAE has the correct version (Colgate BA, NYU MA) and is the model to copy.
  - Studio named "Radical Next" rather than RADOC on 6.
  - Keynote either unnamed or given as Radical Next / Radiant Now / Web3 / Metaverse
    on all 16 that list one. Nothing carries the current keynote.
  - Exact fees published on 3, including AAE.
  - Duplicate profiles at APB (2) and All American Speakers (2); ask both to merge.
  - Keppler alone: wrong website (samantharadocchia.com), "CEO of LOVE", and a
    Singularity University faculty claim the auditor could not verify externally.
    **Resolved 12 Sep 2026:** Sam confirms the appointment is real and there is video
    of it across the internet; SU removed her listing from their own site in 2023,
    which is why it does not verify from the obvious source. The CV entry stands. Do
    not soften or remove it.
  - Three name variants in use across the set: Sam Rad, Samantha Radocchia, and both.
  - Priority 1, fix first: Executive Speakers Bureau (the bureau the site points at),
    CAA, Gotham Artists, Keppler, Leading Authorities, and the old blog footer.
  - **Content Authenticity Initiative, Member, 2023 to present.** Added to the CV on
    14 Sep 2026 after a LinkedIn review found it listed only as a skill. It sits in
    Advisory, second row, and `content provenance (C2PA)` was added to Technical
    skills. Sam's stated capacity is member, not advisor or contributor; do not
    upgrade it. The hero focus-areas line was deliberately left alone.
  - The blog footer naming Kate DesRosier at Gotham Artists: **DONE, 12 Sep 2026.**
    Sam removed every mention from the Squarespace archive before the Sept 22
    retirement.
- **Review the industry page copy.** All nine except Healthcare are agent drafts.
- **Update and curate the YouTube channel.** Added 18 Sep 2026.
  `youtube.com/@samradofficial`, linked from the footer and listed in the Person
  schema `sameAs`, so it is an entity source whether or not it is maintained.
  - **Rebrand to The Change Futurist.** The site, the meta titles and the dispatch
    byline all say The Change Futurist; the channel and much of the bureau set still
    say Radical Futurist. Same entity-consistency problem the bureau audit found, and
    a channel is a stronger signal than a directory listing because models and
    viewers both reach it directly. Channel name, handle where possible, banner,
    about text, and the links block.
  - **Curate.** Pin or feature the keynote reel, hide or playlist off anything from
    the Chronicled era that now conflicts with the current positioning, and group what
    remains into playlists by keynote theme rather than by event.
  - **Then the clips.** The "titled as questions" item under Assets below depends on
    this. Posting well-titled clips onto an unbranded, uncurated channel wastes them.
  - Sequence: rebrand, curate, then clips.
  - **Audit done 18 Sep 2026: `channels/youtube.md`.** Paste-ready channel name,
    774-character description, links block, playlist structure, trailer retitle, and
    the rules for the manual pass over old videos. **Keep the handle
    `@samradofficial`**; it is in the footer and the Person schema. **Do not delete
    the archive**: the Singularity University talks are the only public verification
    of a faculty appointment SU no longer lists.

**Assets to source**
- Speaking photos with industry context, with the client name visible: finance,
  healthcare, insurance, education. Each industry page wants one. Retail is covered
  by `ballroom-retail`.
- YouTube clips titled as questions: "What is perceptual security?", "The four
  moves", "What is the dip?" The highest-leverage AI-visibility item, but it comes
  **after** the channel rebrand and curation above, not before.
- More testimonials. Three on the site, six to eight is the target. Priority order:
  Future of Work, Education, Supply Chain, Hospitality.
- A second studio headshot, non-mint, for variety.

**Content**
- The three speaking stats trace to McKinsey 2025 and Gallup 2026 (9-in-10 and
  4-in-10), Gallup (14%), Census 2026 (4% redesigned), McKinsey/BCG (3x). Sam has
  validated the numbers; the citations still need to go on the page. The viral
  "95% of pilots fail" statistic is forbidden, see §6.
- Press kit on `/press`: short and long bio, headshots, logos, speaking
  requirements, book covers. Distinct from the press archive already there.
- `/events`, upcoming appearances, once there are dates to list.
- Op-ed: "Your company bought the jetpacks. Why is everyone still standing?", timed
  to the next scaling survey.
- Change Pattern Index, original research, Q1 2027.
- Spanish version. **PARKED 12 Sep 2026.** Reviewed and deliberately deferred, not
  forgotten. The plumbing is about two days (a `[locale]` segment, hreflang pairs plus
  x-default, sitemap and Person-schema alternates); the cost is the content and its
  permanent upkeep, since every future edit becomes two and drift is invisible in a
  language nobody proofreads weekly. Machine translation is worse than nothing for
  voice-led copy. If it is revived, do a four-page `/es` slice only (landing, speaking,
  short bio, booking form), keep the writing archive and CV English-only, and do it
  **after** the Sanity migration in item 8: translating a hand-edited codebase is how the
  drift starts.
- `/perceptual-security` page, **deferred at Sam's request.** Revisit only if
  AI-citation tracking shows the term being asked about.

**Measure monthly**
- Booking inquiries by source. The only metric that pays.
- Search Console impressions and clicks for `keynote futurist speaker`,
  `change management speaker`, `future of [industry] speaker`.
- Manual AI checks on ChatGPT, Claude, Perplexity and Gemini: "Who is Sam Rad?",
  "top futurist keynote speakers", "what is perceptual security".
- Bot logs: are GPTBot, ClaudeBot and PerplexityBot crawling?
- Referrals from `chatgpt.com` and `perplexity.ai`.

---

### Delivery convention

Sam set this on 10 September 2026, and corrected it the same day. **She replaces whole
folders, she does not merge.** Whatever the zip contains overwrites the destination,
and anything the zip is missing from a folder it does contain is deleted. That single
fact governs everything below.

Every delivery is **two zips, never one**:

1. **`sam-rad-source-<WHAT>.zip`** wraps a `sam-rad-source/` folder holding the
   **complete** source tree, not just the files that changed: `app/ components/
   data/ lib/ scripts/ corpus/` plus `next.config.js jsconfig.json package.json
   package-lock.json .gitignore .env.example HANDOFF.md PLAYBOOK.md README.md`.
   A partial `data/` folder deletes the JSON files left out of it.
   **Never `public/`. Never `node_modules/`, `.next/`, `.git/` or `.vercel/`.**
2. **`sam-rad-assets-<WHAT>.zip`** wraps a `sam-rad-assets/public/` folder holding
   any images, logos or PDFs, mirroring the real `public/` tree. This is the only
   route by which anything under `public/` travels, and it is copied with a trailing
   `/.` so it merges: `cp -R ~/Downloads/sam-rad-assets/public/. public/`

Shipping `public/` inside a source zip is what deleted `public/images/` once. The
split exists for that reason: the source zip is allowed to replace, the assets zip
never is.

**Deletions cannot travel in a zip.** A removed root-level file has to be an explicit
`git rm <path>` line in the commands, or it silently stays in the repo.

Name each zip for what it is. A generic `sam-rad-source.zip` in Downloads got deployed
once from an older copy, shipping a stale `next.config.js` to production.

Every delivery ends with the exact command block: copy lines, `npm run build` with the
expected page count, `npm run check:images`, any `git rm`, then
`git add -A && git commit -m "..." && git push`. Vercel deploys from `main`.
**The site is live, so every push goes straight to sam-rad.com.**

---

## 10. Known open items

- **Six R-A-D batch 01 source links not re-verified at ship time:** Diners Club
  history, the Smithsonian card record, Pew "Health Online 2013", the Deutschland Museum
  1889 page, MIT News on proving humanity, and the APS journal page. If any fails, drop
  the link and keep the citation. The other nine were verified.
- **103 em dashes in the legacy dispatch records,** imported from Squarespace. None in
  R-A-D. Separate cleanup pass.

**Content**
- **The industry-page sizzle reel is a placeholder.** Every industry page embeds
  `SITE.sizzleId` (`itaGfenlxPw`), the same reel used on Speaking and Body of Work.
  Sam wants a purpose-cut reel for these pages. Changing `sizzleId` in `lib/site.js`
  updates every instance at once.
- **35 press links and 25 podcast links** are live but their URLs are **unverified**;
  many are 7-9 years old and some will have rotted. Needs a link check.
- 8 migrated posts have **auto-generated decks** cut from their first paragraph.
  Need a pass in Sam's voice.
- **8 inline images dropped** during migration; they live on Squarespace's CDN and
  need downloading and re-hosting. List was saved during the session.
- "How to Get Into Ketosis Fast" converted to **143 blocks**. Unlisted, but it is her
  highest-traffic page.
- **103 blog posts left unmigrated**, mostly 2017–2019 blockchain. Deliberately
  retired; they redirect to `/writing`. **The selection is settled; do not reopen it.**
  The 18 that came across were chosen by the traffic and backlink analysis done before
  launch, which is why an unlisted post such as the ketosis piece is on the site. The
  other 103 were retired on purpose, and all of them are preserved in the 22 Sep
  archive. Re-proposed on 22 Sep and correctly declined by Sam for exactly this
  reason.
- Speaking stat sources not yet cited on the page.
- Newsletter subscribers: **exported by Sam** before retirement (254 contacts, 76 opted
  in to marketing).

**Images**
- `hero-work.jpg` (home) is a Lanczos upscale of a 1179px original. `hero-foresight.jpg`
  is 1179×781 native. Both are heavily used heroes and both are soft at full-bleed.
  **Original camera files from Ivanti Solutions Summit would fix both.**
- Era images are clean, text-free artwork. That old open item is resolved.

**Technical**
- **Content exports** live outside the repo: `sam-rad-content-export.xlsx` holds the
  91-client roster, the Chronicled participants, and the press and podcast lists with
  URLs. Regenerate from `data/media.json` and the roster if they drift.
- postcss advisory, see §2.
- Open Graph images are 3:2; the spec wants 1200×630. Platforms centre-crop.
- Fonts load via `<link>` in `app/layout.jsx`. Switching to `next/font/google` would
  self-host them and remove the layout shift. The variables are already in
  `globals.css`. Small win, never prioritized.
- The CV PDFs are not tagged for screen readers; see §8.
- **The CV brief of September 2026 is fully closed.** Its one optional item, team size
  and capital raised for NYOUM and Stunable, was closed by Sam on 11 Sep 2026 without
  the figures. The executive-scope line for Stunable is the markets line only. Do not
  reopen this or ask for the numbers again.
- Cited in is fully resolved as of 11 Sep 2026. The Routledge entry was mistitled:
  the real volume is *The Routledge Social Science Handbook of AI*, Elliott, 2021.
  *Journal of Space Law* was removed at Sam's request, as was the working paper and
  the forward-citation count, which was dropped rather than guessed. Nothing in
  `data/cv.json` is a placeholder now; grep for `SAM TO CONFIRM` before shipping the
  CV anywhere formal and expect zero hits.
- No CMS.
