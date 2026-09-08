# sam-rad.com — Handoff

Read this before touching anything. Written for a fresh agent picking up with no
memory of prior sessions. Last updated 8 September 2026, the day the site went live.

**Live:** https://sam-rad.com
**Old site:** https://archive.sam-rad.com (Squarespace, still serving ~300 legacy URLs)
**Repo:** github.com/SamRadOfficial/sam-rad → Vercel project `samradsite` (auto-deploys on push to `main`)
**Local:** `~/Documents/sam-rad`

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
to forget in the copy line and it now holds 60 redirect rules.

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

**Verify counts after any data change.** Cutting industries from 20 to 9 left stale
`number` fields rendering "19 / 9" in the grid. Grep the built HTML, don't assume.

---

## 2. Stack

Next.js **15.5.25**, React **19**, App Router, JavaScript (no TypeScript). All pages
static at build time. One hand-written CSS file. No Tailwind. **No CMS yet.**

```
app/
  layout.jsx              fonts via <link>, Person JSON-LD, skip link
  globals.css             ~48KB, all styling, design tokens at top
  page.jsx                /
  speaking/  meet-sam/  book/  body-of-work/
  industries/page.jsx     /industries
  industries/[slug]/      9 pages from data/industries.json
  writing/page.jsx        /writing   (was /foresight until 8 Sep 2026)
  writing/[slug]/         18 posts from data/dispatches.json
    Body.jsx              renders the block format (see §5)
    ShareLinks.jsx        client component: LinkedIn intent + copy to clipboard
  sitemap.js robots.js not-found.jsx
components/
  Nav.jsx                 client: desktop mega-menu (3 cols) + mobile drawer
  Footer.jsx              credential line, nav, socials, newsletter
  Blocks.jsx              every shared section (see §4)
  IndustryIcon.jsx  MoveIcon.jsx  logos.jsx (logos.jsx unused)
data/
  industries.json         9 live entries
  industries-archive.json 10 retired entries, restorable
  dispatches.json         18 posts, 8 visible + 10 unlisted
  clients.json            31-brand name → logo file registry
  eras.json moves.json cycle.json testimonials.json
lib/site.js               config, meta() helper, Person schema
next.config.js            60 redirect rules
public/images/            60+ photos
public/logos/             33 brand marks + LICENSE.md
```

```bash
npm install
npm run dev      # localhost:3000
npm run build    # must print "Generating static pages (39/39)"
```

**Known issue:** npm audit flags a high-severity postcss advisory. The only fix is
Next 16, which broke the Vercel deploy previously (Turbopack). Do not upgrade to 16
without testing on a preview branch.

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
| `Moves` | four moves, icons right-aligned |
| `Eras` | six-era timeline (see §6) |
| `Sizzle` | YouTube embed, `itaGfenlxPw` |
| `Bureau` | "Managed by Brandy Gibson…" line |
| `JsonLd` | schema injection |
| `Cycle`, `YouAreHere` | **unused.** Both cut. Do not reinstate without asking. |

Not in Blocks: `.photo-band`, a pure image divider with no copy, written inline.

---

## 5. Writing posts

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
- Three patents, all Chronicled: Identity of Things (US 2016/0358186, granted
  US 11,354,676), Provenance and Tracking (US 2018/0108024), early ERC-721 protocols.
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

**Other domains still on Squarespace:** `samradocchia.com`, `samradofficial.com`,
`samantharadocchia.com`. The last one **has its own MX records** — do not delete it.

**Booking form** posts to Formspree (`https://formspree.io/f/xgaepolw`), set in
`lib/site.js` as `formEndpoint`. Notifications go to sam@sam-rad.com only; adding
Brandy is a Formspree dashboard change on a paid plan. Honeypot `_gotcha` field,
`_replyto` set to the inquirer.

**Redirects:** 60 rules in `next.config.js`. Three tiers — pages with a new
equivalent, the 18 migrated posts (**these must stay above** the `/blog/:slug*`
catch-all), and everything else to `archive.sam-rad.com`.

**Squarespace cannot be retired** until the remaining archive content moves, because
it serves both `archive.sam-rad.com` and the DNS zone.

---

## 9. Roadmap

1. **Move to Claude Code.** Direct repo access instead of the zip-and-copy loop,
   which has caused three deploy mistakes. Read this file first; a fresh session
   starts with no context.
2. **Industry page copy.** 9 pages, agency-drafted, only Healthcare reviewed. Needs
   Sam's real client names per sector — several pages show no logo row because their
   `logos` lists are placeholders like "Automotive associations".
3. **Press section.** Sam is supplying the links. The Squarespace export contains 35
   press items with **no body and no external URLs**, only titles and screenshots.
   Build as one page, linked from Body of Work and the footer.
4. **Sept 22 task:** check Search Console, move DNS to GoDaddy, retire Squarespace.
   Order matters — content must move before Squarespace is cancelled.
5. **Three alt domains** → redirect to sam-rad.com via Vercel.
6. **Analytics.** None installed.
7. **Sanity CMS.** Draft schemas exist (industry, post, client, testimonial). Parked
   until the design settles. Studio would live at `/admin`. On-demand revalidation
   preferred over full-rebuild webhooks.

---

## 10. Known open items

**Content**
- 8 migrated posts have **auto-generated decks** cut from their first paragraph.
  Need a pass in Sam's voice.
- **8 inline images dropped** during migration; they live on Squarespace's CDN and
  need downloading and re-hosting. List was saved during the session.
- "How to Get Into Ketosis Fast" converted to **143 blocks**. Unlisted, but it is her
  highest-traffic page.
- **103 blog posts left unmigrated**, mostly 2017–2019 blockchain. Deliberately
  retired; they redirect to `/writing`.
- Only **3 testimonials**. She wants more.
- Speaking stat sources not yet cited on the page.

**Images**
- `hero-work.jpg` (home) is a Lanczos upscale of a 1179px original. `hero-foresight.jpg`
  is 1179×781 native. Both are heavily used heroes and both are soft at full-bleed.
  **Original camera files from Ivanti Solutions Summit would fix both.**
- Era images are clean, text-free artwork. That old open item is resolved.

**Technical**
- postcss advisory, see §2.
- Open Graph images are 3:2; the spec wants 1200×630. Platforms centre-crop.
- No analytics, no CMS.
