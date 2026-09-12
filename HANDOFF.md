# sam-rad.com — Handoff

Read this before touching anything. Written for a fresh agent picking up with no
memory of prior sessions. Last updated 11 September 2026.

**Live:** https://sam-rad.com
**Old site:** https://archive.sam-rad.com (Squarespace, still serving ~300 legacy URLs)
**Repo:** github.com/SamRadOfficial/sam-rad → Vercel project `samradsite` (auto-deploys on push to `main`)
**Local:** `~/Documents/sam-rad`

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
cp -R app components data lib next.config.js ~/Documents/sam-rad/
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

### Writing posts

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

**Do not remove sam-rad.com from Squarespace.** Squarespace hosts the DNS zone
including five Google Workspace MX records. Disconnecting risks taking the zone —
and her email — with it. It shows "DNS Error" in Squarespace; that is expected and
correct.

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

**/cv** is the research and institutional page: Samantha Radocchia, not Sam Rad. It
renders from `data/cv.json`, and two PDFs render from the **same** JSON via
`python3 scripts/build-cv-pdfs.py` into `public/cv/`. Edit the JSON, rerun the script,
ship both PDFs. Never edit the PDFs by hand or they drift from the page. The
professional PDF leads with patents and ventures; the academic one with education
and fieldwork and adds a research-interests paragraph. The page itself uses the
narrative order with the at-a-glance panel.

### Bureau credit, linking policy

Set 12 September 2026. **The credit text appears everywhere; the bureau's own URL
does not.** `executivespeakers.com/speaker/sam-rad` has its own booking form on it, so
linking it beside a "Book Sam" button hands the lead to a third party at the moment of
conversion, and as of the September audit that page still calls *Radical Next*
upcoming.

- **Agent mailto stays live everywhere.** It is a second booking path, not leakage:
  some buyers would rather email a named agent than fill in a form, and it is already
  CC'd to Sam.
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

1. **Three more resource guides**, in this order and not all at once. Six lists is
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

2. **Sept 22 task:** check Search Console, move DNS to GoDaddy, retire Squarespace.
   Order matters — content must move before Squarespace is cancelled.
3. **New sizzle reel** cut for the **industry pages**, replacing the placeholder.
   Separate from the homepage hero reel in item 0; that one is a silent background
   loop, this one is a watchable reel with sound.
4. **Bring back dispatch thumbnails** once the Writing archive has enough posts with
   distinct images. Removed 9 Sep 2026: four of the eight visible posts shared the same
   NYC portrait set, so the 96px column showed near-identical crops, and a crop that
   small carries no information anyway. The CSS rules are commented in `globals.css`
   next to `.disp`. Revisit at roughly twenty posts.
5. **Re-industrialize the dispatch CTAs.** The sidebar on every writing post links to
   `/speaking` with generic copy, and the industry dispatch feed only appears once a
   sector has two posts of its own. Both were deliberate on 9 Sep 2026: with 8 visible
   posts there was not enough per-sector content to justify pointing a healthcare
   reader at the healthcare keynote. Once the archive is backfilled, point the sidebar
   at the matching industry page (the `industrySlug` field on each post already
   carries it) and the feeds will reappear on their own.
6. **Sanity CMS.** Draft schemas exist (industry, post, client, testimonial). Parked
   until the design settles. Studio would live at `/admin`. On-demand revalidation
   preferred over full-rebuild webhooks.
7. **Responsive images.** Parked 9 Sep 2026. A phone downloads the same 2358px hero
   as a desktop: 797KB where 195KB would do, a 75% saving on mobile. WebP and
   `fetchPriority` are already in place, so this is the remaining win. Two options:
   the cheap one adds a 900px WebP per hero plus a `srcset` to the `<picture>`
   elements in `Blocks.jsx`, about an hour; the thorough one converts all 38 `<img>`
   tags to Next's `Image`, about a day. Do the cheap one first.
8. **Move to Claude Code.** Considered and deferred on 8 Sep 2026. Sam prefers to
   keep working in chat with the zip-and-copy loop. Worth revisiting for mechanical
   work (bulk migrations, repeated builds) while keeping copy and design decisions
   in chat, where the reasoning is discussed rather than just executed. A fresh
   Claude Code session starts with no context: point it at this file first.

### Carried over from ROADMAP.md, folded in 10 September 2026

These were the items still live when that file was retired. Everything else in it had
already shipped or been superseded.

**Sam's to do**
- **Export LinkedIn posts.** IN PROCESS as of 12 Sep 2026. Settings, Data Privacy,
  Get a copy of your data, Posts. The voice corpus in `corpus/` needs it, and so does
  the dispatch backfill.
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
  - The blog footer naming Kate DesRosier at Gotham Artists: **DONE, 12 Sep 2026.**
    Sam removed every mention from the Squarespace archive before the Sept 22
    retirement.
- **Review the industry page copy.** All nine except Healthcare are agent drafts.

**Assets to source**
- Speaking photos with industry context, with the client name visible: finance,
  healthcare, insurance, education. Each industry page wants one. Retail is covered
  by `ballroom-retail`.
- YouTube clips titled as questions: "What is perceptual security?", "The four
  moves", "What is the dip?" The highest-leverage AI-visibility item.
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
  **after** the CMS decision in item 6: translating a hand-edited codebase is how the
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
  retired; they redirect to `/writing`.
- Speaking stat sources not yet cited on the page.
- **Export the Squarespace newsletter subscribers before cancelling.** The old site
  ran a working Radical Next signup and those addresses live in the Squarespace
  account. Squarespace, Contacts or Marketing, export CSV. Do this before the Sept 22
  retirement or the list is gone.

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
