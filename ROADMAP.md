# sam-rad.com — Roadmap

Living document. Items move up as they're done, down as they're deferred.

---

## Before launch (blocking)

| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **Booking form backend** | Dev | Mockup uses `mailto:` which can't be tracked. Production: Next.js route → Resend (or Postmark) → emails Brandy + Sam, stores submission in Sanity, fires a Plausible goal. That gives you a count, a source, and a record. |
| 2 | **LinkedIn export** | Sam | Settings → Data Privacy → Get a copy of your data → Posts. Voice corpus needs it. |
| 3 | **Bureau listing audit** | Sam | Leading Authorities, BigSpeak, AAE, Keynote Curators, Mollie Plotkin Group, Speakerpedia all still say **LOVE** (not NYOUM), "upcoming book" for Radical Next, old training line. The blog footer still names **Kate DesRosier at Gotham Artists**. Every one is an entity-consistency leak for AI search. The Vision memo already lists this. |
| 4 | **Validate the three stats** on the Moment section to primary source before they go live: 9-in-10 / 4-in-10 (McKinsey 2025, Gallup 2026), 14% (Gallup), 4% redesigned (Census 2026), 3× (McKinsey/BCG). Memo says never touch the viral 95% stat. |
| 5 | **Redirect map** from Squarespace URLs. Crawl still needed. |
| 6 | **Review 18 industry pages.** All except Healthcare are my draft. Future of Work and Marketing are newest. |
| 7 | **Real client logos.** Using the screenshot for now. See §Assets. |
| 8 | **Squarespace legacy** — decide fate of `/meta-human` (SamRad.AI page), `/resources`, `/events`, `/photos`, `/writing`, `/radicalnext`. |

## Assets to source

| Asset | Status | Plan |
|---|---|---|
| Client logos as SVG | Screenshot only | Most are on Wikimedia Commons or brand sites (Cisco, Dell, SAP, IBM, GE, P&G, Coca-Cola, Unilever, LinkedIn, Pinterest, LVMH, BMW, UN, WEF, MIT, Columbia, Nestlé, Whirlpool, Pfizer, JLL, Audible). Federal Reserve, ICI, Gobierno de México, CohnReznick need direct sourcing. Normalize to one-color navy at 40px height. ~2 hrs. |
| Speaking photos with industry context | Have retail (ballroom-retail). | Ask event photographers for: finance, healthcare, insurance, education shots with the client name visible. Each industry page wants one. |
| Sizzle reel updated | `itaGfenlxPw` embedded | Cut a 2026 version with GOFEST + TFWA footage. |
| YouTube clips titled as questions | Not started | "What is perceptual security?", "The four moves", "What is the dip?" Highest-leverage AI-visibility item. |
| Additional testimonials | 3 | Target 6–8. Prioritize Future of Work, Education, Supply Chain, Hospitality. |
| Headshot alternates | 1 (mint) | A second, non-mint studio shot for variety. |
| OG images (1200×630) | None | One per page type, generated from the hero. |

## Content roadmap

| Item | When |
|---|---|
| Name the eras on stage consistently — site now shows 10: Stone Age, Agrarian, Classical, Exploration, Enlightenment, Industrial, Internet, Acceleration, Bio-Integration, Quantum. Confirm the dates I assigned to the first six. | Before launch |
| Dispatch pipeline live (voice prompt tuned on LinkedIn corpus) | Launch +2 weeks |
| Migrate blockchain archive to `/foresight/archive` with a "from the blockchain years" framing | Launch |
| `/press` page: bio (short/long), headshots, logos, speaking requirements, book covers | Launch +1 week |
| `/events` — upcoming appearances | When there are dates to list |
| Op-ed: "Your company bought the jetpacks. Why is everyone still standing?" | Per Vision memo, timed to next scaling survey |
| Change Pattern Index (original research) | Q1 2027 |
| Spanish version | After English is stable |
| `/perceptual-security` page | Deferred at Sam's request. Revisit if AI-citation tracking shows the term being asked about. |

## Naming (decided)

**Change Has a Pattern** is the keynote name and the thesis, throughout. The Vision memo's working title "Read the Pattern" is retired. Bureau listings, one-sheet, and the deck should be aligned to match (see bureau audit above).

## Measurement (monthly)

- Booking inquiries by source (the only metric that pays)
- Search Console: impressions/clicks for `keynote futurist speaker`, `change management speaker`, `future of [industry] speaker`
- Manual AI checks: ChatGPT, Claude, Perplexity, Gemini — "Who is Sam Rad?", "top futurist keynote speakers", "what is perceptual security"
- Bot logs: GPTBot, ClaudeBot, PerplexityBot crawling?
- Referrals from `chatgpt.com`, `perplexity.ai`

## Done this build

- 27 pages: home, speaking, meet sam, industries, 19 industry pages, foresight, 1 dispatch, body of work, book
- Four moves, five-stage cycle, ten-era timeline, "the moment" stats — all from the Vision memo
- Change Has a Pattern
- New headshot everywhere
- RADOC / MISTIC / Project Helix on Meet Sam, Body of Work, Defense
- Patents: full Chronicled family with numbers and links
- ISBNs: Radical Next 979-8-89138-248-0 · Bitcoin Pizza 978-1-5445-0443-8 (hardcover), 978-1-5445-0441-4 (paperback)
- Bio corrections: NYOUM as AI-driven decentralized video platform; anthropology + linguistics; SamRad.AI 2020; archaeologist of the future
- Sizzle reel embedded on Speaking + Body of Work
- Homepage top six reordered: Financial Services, Healthcare, Future of Work, Education, Supply Chain, Hospitality
- Booking page with form + mailto fallback (Brandy, Sam cc'd), no fees
- Voice corpus started: `/corpus/`
