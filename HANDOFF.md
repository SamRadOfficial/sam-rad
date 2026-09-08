# sam-rad.com — Handoff

Read this before touching anything. It is written for a fresh agent picking up
mid-project with no memory of prior sessions.

**Live:** https://samradsite.vercel.app
**Repo:** github.com/SamRadOfficial/sam-rad → Vercel project `samradsite` (auto-deploys on push to `main`)
**Local:** `~/Documents/sam-rad`

Sam has the working copy with all images. Ask her to zip and upload
`app/ components/ data/ lib/` (and `public/images/` only if you need to see the photos).

---

## 1. Rules that keep getting broken

**Never ship a zip containing a `public/` folder.** Copying it over the project
replaces the whole directory and deletes all 57 images. This has happened. Send
`app components data lib` only. Send individual images as standalone files.

**Never tell her to drag folders in Finder.** Finder's Replace deletes anything
in the destination that isn't in the source — it wiped `components/Footer.jsx`
once and `public/images/` once. Always instruct:

```bash
cp -R app components data lib ~/Documents/sam-rad/
```

**Never write a file with `open(f,'w')` and `open(f).read()` in one expression.**
Python evaluates the write first, truncating the file before the read. This
blanked all eight pages once. Read into a variable first.

**Be careful with index-slicing edits on JSX.** Two separate incidents where
cutting from marker A to marker B removed more than intended and left orphaned
props behind. Always `npx next build` after a structural edit, and check the
section order printed back.

**Mobile previews are unreliable.** Clamping `html` to 390px does not trigger
`@media (max-width:900px)` — the browser reads the real viewport. If you generate
a mobile preview, flatten the media blocks so the phone rules apply
unconditionally, or she will report fixes as "not working" when they are fine.

**Only 4 of 6 era images exist in a fresh sandbox.** Sam has all six locally.
`era-agrarian.jpg` and `era-industrial.jpg` will 404 for you unless she uploads them.

---

## 2. Stack

Next.js 14.2.5, App Router, JavaScript (no TypeScript). All 37 pages static at
build time. One hand-written CSS file. No Tailwind, no CMS, no database.

```
app/
  layout.jsx              fonts via <link>, Person JSON-LD, skip link
  globals.css             ~45KB, all styling, design tokens at top
  page.jsx                /
  speaking/               /speaking
  meet-sam/               /meet-sam
  industries/page.jsx     /industries
  industries/[slug]/      20 pages from data/industries.json
  foresight/page.jsx      /foresight
  foresight/[slug]/       5 pages from data/dispatches.json
  body-of-work/           /body-of-work
  book/page.jsx           + book/BookingForm.jsx (client component)
  sitemap.js robots.js not-found.jsx
components/
  Nav.jsx                 client component: mega-menu + mobile drawer
  Footer.jsx
  Blocks.jsx              every shared section (see §4)
  IndustryIcon.jsx        20 inline SVGs, keyed by industry slug
  MoveIcon.jsx            4 inline SVGs for the four moves
  logos.jsx               10 brand SVGs, currently unused
data/
  industries.json         20 entries — drives all industry pages
  dispatches.json         5 entries — placeholder copy
  eras.json  moves.json  cycle.json  testimonials.json  clients.json
lib/site.js               config, meta() helper, Person schema
public/images/            57 files
public/logos/             10 SVGs + LICENSE, currently unused
```

```bash
npm install
npm run dev      # localhost:3000
npm run build    # must print "Generating static pages (37/37)"
```

---

## 3. Design system

Tokens are at the top of `globals.css`:

```
--paper       #F5F1EA   page ground
--paper-white #FCFBF6   alternating sections
--paper-soft  #EDE7DA   strips, eras band
--ink         #0F1F3D   text, borders, dark sections
--ink-deep    #08132A   footer, deep CTA bars
--mint        #5BC4A0   accent on dark
--mint-deep   #3FA383   accent on light
```

Bebas Neue for all headings, labels, numbers, buttons. Inter for body.
American English. **No em dashes** — she asked for these removed; use commas or
periods. The only em dashes left are inside verbatim testimonial quotes.

Section backgrounds must alternate. She has flagged "bleeding into one color"
three times. Check what sits above and below before adding a section.

Photos have no borders. UI cards (industry cells, move cards, sidebars,
testimonial cards) do.

---

## 4. Components in `Blocks.jsx`

| Component | Notes |
|---|---|
| `PhotoHero` | full-bleed hero. Props: `image, eyebrow, children, descriptors, lead, cta, caption, short, position`. `position` sets `object-position` for awkward crops. |
| `CtaBreak` | full-bleed photo + heading + Book Sam. `center`, `bureau` variants. |
| `YouAreHere` | Age of Acceleration band on `hero-home.jpg`. Not on home or Meet Sam any more. |
| `BookBar` | inline CTA strip. Variants: default navy, `mint`, `deep`. |
| `LogoStrip` | 24-logo screenshot. Horizontal scroll on mobile. `dark` variant exists but home and Speaking both use light. |
| `IndustryGrid` | grid of industry cells with icons |
| `DispatchList` | dispatch rows with thumbnails |
| `Testimonials` / `TestimonialBanner` | cards / full-bleed banner with Book Sam |
| `Moves` | four moves, icons right-aligned with each title |
| `Cycle` | five stages. **Currently unused** — the dip content was cut. |
| `Eras` | six-era timeline with technology overlays |
| `Sizzle` | YouTube embed, `itaGfenlxPw` |
| `Bureau` | "Managed by Brandy Gibson…" line |
| `JsonLd` | schema injection |

Not in Blocks: `.photo-band`, a pure image divider with no copy. Written inline
on Home and Meet Sam. Styles are in `globals.css`.

---

## 5. Current page order

**Home** — PhotoHero → LogoStrip → Meet Sam split → TestimonialBanner → photo band → Keynote → Eras → CtaBreak (Every room) → Industries → Body of Work → BookBar → Gallery → Stats (desktop only) → CtaBreak (Walk out ready)

**Speaking** — PhotoHero → LogoStrip → Keynote prose + sidebar → BookBar → Eras → BookBar → Moves → BookBar → Jetpack + skydiving → Sizzle → TestimonialBanner → Testimonial cards → BookBar → CtaBreak

**Meet Sam** — PhotoHero → Bio split → TestimonialBanner → Prose (technologist / inventor / author / speaker) → photo band → Skydive split → BookBar → Gallery → CtaBreak

Heroes: home `hero-work.jpg` · speaking `audience-women.jpg` · meet-sam
`cisco-live.jpg` · industries `gofest-faster-horses.jpg` · foresight and book
`hero-home.jpg` · body-of-work `chicago-ballroom.jpg`

---

## 6. Content facts — verified, do not change without asking

- **Sam Rad**, born Samantha Radocchia. Both names on Meet Sam.
- Keynote is **Change Has a Pattern**. No trademark symbol (she had it removed).
- Bureau: **Brandy Gibson, Executive Speakers Bureau**. Mailto is
  `brandy@executivespeakers.com`, cc `sam@sam-rad.com`, subject `SAM RAD | Keynote`.
- **No fees published.**
- Education: **Colgate + NYU**. Not Cornell.
- Company: **NYOUM (YOUM.AI)**, a generative AI communication platform, youm.ai.
  Not "LOVE" — the old Squarespace site is wrong.
- Trained in **anthropology and linguistics**; research in simulated realities,
  cognitive security, post-human society.
- **Forbes 30 Under 30 (2017)** — in the Meet Sam sidebar only, not on the homepage.
- **2× #1 bestsellers.** Radical Next ISBN 979-8-89138-248-0 (2025);
  Bitcoin Pizza ISBN 978-1-5445-0443-8 (2019).
- Always **competitive skydiver**, never "professional skydiver".
- Three patents, all Chronicled: Identity of Things (US 2016/0358186, granted
  US 11,354,676), Provenance and Tracking (US 2018/0108024), early ERC-721 protocols.
- RADOC → produces **Illicit Shadows** → **MISTIC** institute → **Project Helix**,
  an AI intelligence fusion center and predictive convergence system.
- **20 industries.** 8 featured: financial-services, healthcare, future-of-work,
  higher-education, supply-chain, hospitality, technology-ai, retail.
- Six eras: Agrarian (Grain & Plough) · Classical (Medicine & Math) ·
  Exploration (Ships & Maps) · Industrial (Steam & Loom) · Internet (Air & Mobile) ·
  Acceleration (AI & Space, current).
- Four moves: See the pattern · Let go of the old way · Lead the jetpack · Take it off.
- Five-stage cycle (Panic, Adoption, The Dip, Redesign, Ordinary) — **cut from the site.**
  She said there was "too much about the dip." Do not reinstate without asking.

Recurring lines: "Change has a pattern" · "You're going to be OK" ·
"Sam doesn't just predict the future. She lives in it." · "Walk out ready" ·
"We don't have an adoption problem. We have a reinvention problem."

---

## 7. Known open items

**Images**
- Era images: she has all six locally. The four in the repo are crops of stage
  photos and still carry the deck's own typography, which she has flagged. Ideal
  fix is text-free artwork exported from the deck.
- `hero-work.jpg` is a Lanczos upscale (2358×1552) of a 1179×776 original. Soft
  at full-bleed. The original camera file would be better.
- The wide audience shot used as the Speaking hero is captioned "Keynote" —
  **the event name is unknown.** Ask her.
- Logo screenshot has 24 brands and **does not include American Express**, which
  she asked for. Needs re-export.

**Content**
- 19 of 20 industry pages are agency-drafted, not hers. Only Healthcare has been
  reviewed. `data/industries.json` is the source.
- The 5 dispatches are placeholder titles with templated article bodies. The
  Foresight page is live in the nav with this content.
- The 3 stats on Speaking (9-in-10, 14%, 4%) must be validated to primary source
  before public launch. Her own strategy memo forbids the viral "95% of pilots
  fail" statistic — never use it.
- Only 3 testimonials. She wants more.

**Technical**
- Booking form composes a `mailto:` — no tracking. A Next route + Resend would fix it.
- Next.js 14.2.5 has a security advisory. `next@15` is the safe upgrade;
  **16 broke the Vercel deploy** (Turbopack), so do not jump to it.
- `public/logos/` has 10 MIT-licensed brand SVGs, unused. Only 10 of 25 brands
  were available, so mixing them with wordmarks looked inconsistent.
- No analytics. No CMS — Sanity is planned but not started.
- Canonical URLs point at `sam-rad.com`, which still serves Squarespace.
- Redirect map is partial. Full Squarespace crawl still needed.

---

## 8. Working style she expects

Show a **preview before building.** Standard loop: make the change, `npx next build`,
serve locally, inline the CSS and base64 the images into a single self-contained
HTML file, present it. She reviews and iterates.

She proposes changes in batches and expects push-back when something is wrong.
She has accepted counter-proposals repeatedly — say so when you disagree, and say
why. Do not agree by default.

When she asks for something you cannot do — source a logo, generate a photo,
upscale beyond what's possible — say so plainly and offer the nearest real option.

Deploy instructions she is used to:

```bash
cd ~/Downloads/sam-rad-source
cp -R app components data lib ~/Documents/sam-rad/
cd ~/Documents/sam-rad
npm run dev
git add -A
git commit -m "..."
git push
```

`git add -A`, not `-am` — new files appear regularly and `-am` skips them.
