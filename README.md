# sam-rad.com

Next.js 14 (App Router) marketing site for Sam Rad, keynote speaker and futurist.
Static-generated, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Node 18.17+ required.

## Structure

```
app/
  layout.jsx              fonts, Person JSON-LD, skip link
  page.jsx                /
  speaking/               /speaking            keynote, moves, cycle, eras, FAQ + Service schema
  industries/
    page.jsx              /industries          all 19
    [slug]/page.jsx       /industries/:slug    generated from data/industries.json
  foresight/
    page.jsx              /foresight           dispatch index
    [slug]/page.jsx       /foresight/:slug     dispatch article
  meet-sam/               /meet-sam            bio, patents, RADOC / MISTIC / Project Helix
  body-of-work/           /body-of-work        books (Book schema), Illicit Shadows, video
  book/                   /book                booking form (mailto, MVP)
  sitemap.js              generated from data/
  robots.js               allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
  not-found.jsx           404
components/
  Nav, Footer, Blocks (PhotoHero, YouAreHere, CtaBreak, IndustryGrid, DispatchList,
  Moves, Cycle, Eras, Sizzle, Testimonials, JsonLd), IndustryIcon
data/
  industries.json         19 industries — edit here, pages regenerate
  dispatches.json         dispatch feed
  testimonials.json  eras.json  moves.json  cycle.json
lib/site.js               config, metadata helper, Person schema
public/images/            55 assets
```

## Editing content

**Industries.** `data/industries.json`. Each entry: name, slug, number, heading, body[2],
audiences, forces[3], logos[], hero, featuredOrder. Add an entry, add a matching icon in
`components/IndustryIcon.jsx`, push. Do not edit generated pages directly.

**Dispatches.** `data/dispatches.json` now; the pipeline will write here (or to Sanity) later.

**Images.** Drop into `public/images/`. Two era tiles are typographic placeholders until
`era-agrarian.jpg` and `era-industrial.jpg` exist — see `corpus/ERA-IMAGE-PROMPTS.md`.

**Design tokens.** Top of `app/globals.css`.

## Booking form

MVP has no backend. It composes a `mailto:` to Brandy Gibson with Sam cc'd,
subject `SAM RAD | Keynote`. Untrackable by design for now.

To add tracking later: create `app/api/book/route.js`, POST from `BookingForm.jsx`,
send via Resend, and fire an analytics goal. `.env.example` has the variables.

## Redirects

`next.config.js` maps the known Squarespace paths. Expand after crawling the live site.

## Fonts

Loaded via `<link>` in `app/layout.jsx` so the repo builds in any environment.
For better performance switch to `next/font/google` (self-hosts, no layout shift):
uncomment the variables in globals.css and use the Bebas_Neue / Inter loaders.
