# YouTube audit: @samradofficial

Audited 18 September 2026 against the live sam-rad.com. The channel's video list is
blocked to automated access, so this covers the channel name, About text, and the
videos visible through search. The video list needs a manual pass using the rules in
section 4.

---

## 1. What is wrong

| | Channel now | Site says | Why it matters |
|---|---|---|---|
| **Name** | SAM RAD 🔮 · Futurist | Sam Rad, **The Change Futurist** | The identity line. Every other surface uses it. |
| **Projects** | RADOC only | RADOC, Illicit Shadows, MISTIC, R-A-D | Illicit Shadows, the co-founded series, is absent from the channel entirely. |
| **Opening line** | "Futurist, entrepreneur, and best-selling author who combines the mindsets..." | "Change has a pattern. See it, and you're ready for whatever comes next." | The channel never states the thesis. |
| **Keynote** | Not named | **Change Has a Pattern** | A buyer cannot tell what they would be booking. |
| **In production** | "Shadowverse; The Future is Rad" | Illicit Shadows; **R-A-D** | Both names are retired. "The Future is Rad" is the old working title of R-A-D. |
| **Patents** | "holds several patents" | "first-named inventor on four granted US patents" | Vague where the site is precise and verifiable. |
| **Book title** | "Reclaiming **your** Humanity" | "Reclaiming **Your** Humanity" | Title casing drift. |
| **Book title** | "The No Bullshit Guide" | "The No-Bullshit Guide" | Hyphen drift. |
| **Framing** | "radical and accelerating change" | "change has a pattern" | The Radical Futurist era. |
| **Booking** | None in the About text | sam-rad.com/speaking | The channel does not ask for the one thing that pays. |
| **Sizzle description** | "founder of Radical Next, a meta-media..." | RADOC; Radical Next is the book | Stale, and it is the video embedded on /speaking. |

Also found in the same sweep, off-channel: the **LinkedIn headline** still reads
"Human Intelligence Futurist," which `bio-facts` records as superseded by The Change
Futurist on 14 Sep 2026. Same fix, different platform.

---

## 2. Paste-ready replacement

### Channel name (29 of 50 characters)

```
SAM RAD | The Change Futurist
```

Sam's choice, 18 Sep 2026. Caps match the site wordmark in the nav, and the pipe
matches the site's own title pattern.

### Handle

**Keep `@samradofficial`.** It is linked from the site footer and sits in the Person
schema `sameAs`. Changing it breaks both, plus every link already in the wild.

### Description (995 of 1000 characters)

Opens with who Sam is, at Sam's direction, then the thesis, then what is on the
channel. 5 characters of headroom, so any addition means a cut.

```
Sam Rad (Samantha Radocchia) is The Change Futurist: an anthropologist, four-time tech founder, first-named inventor on four granted US patents, and author of the #1 bestseller Radical Next: Reclaiming Your Humanity in a Post-Human World.

Every big change follows the same pattern. Her keynote, Change Has a Pattern, shows Fortune 500s, governments, and associations on five continents how to see it, so they're ready for whatever comes next.

On this channel:
R-A-D | Research and Development with Sam Rad. One pressing question about the future, answered.
Change Has a Pattern. Keynote clips, by theme.
Illicit Shadows. Investigative documentary series on the global illicit economy, with David M. Luna.
Talks on AI, change, resilience, and perceptual security.

Sam also founded RADOC, a media studio working in narrative futurism, and co-founded MISTIC, an institute on the convergence of crime and technology.

Book a keynote: sam-rad.com/speaking
Represented by Executive Speakers Bureau.
```

Written to match the site word for word where it can, so a model reading the channel
and then the site finds one entity rather than two.

It deliberately does **not** promise a cadence for R-A-D. Say "every weekday" only once
the first month is actually published.

**Held back on purpose:** the Museum of Illicit Shadows (Phase I is 2027, so naming it
here implies it is live), Project Helix, and the two books in progress. Add any of them
only once they are public.

### Links block, in this order

1. Book a keynote → `https://sam-rad.com/speaking`
2. sam-rad.com → `https://sam-rad.com`
3. Radical Next → `https://sam-rad.com/body-of-work#radical-next`
4. LinkedIn → `https://www.linkedin.com/in/samradofficial`
5. Instagram → `https://www.instagram.com/samradofficial`
6. X → `https://x.com/SamRadOfficial`

Booking first. YouTube shows the first link beside the channel name. It points at
`/speaking`, not at the form: every external booking link goes to the page that makes
the case, and the form is one click from it. Set 21 Sep 2026.

---

## 3. Curation

**Channel trailer, for people who have not subscribed:** the keynote reel. Retitle
it and replace its description.

```
SAM RAD | The Change Futurist | Keynote Reel
```

**Featured video, for subscribers:** the latest R-A-D episode once the series is live,
the reel until then.

**Playlists,** grouped by what a buyer is looking for rather than by event:

1. **R-A-D | Research and Development with Sam Rad.** Shorts, question as the title.
2. **Change Has a Pattern.** Keynote clips. The flagship.
3. **Illicit Shadows.** Trailers and short films. See the handling note below.
4. **AI and the human.**
5. **Change, resilience, and adoption.**
6. **Perceptual and cognitive security.**
7. **Archive: blockchain and Web3, 2017 to 2022.** Kept, unlisted from the home tab.

**Illicit Shadows on this channel follows the Illicit Shadows rules, not this
channel's.** Named companies get reciprocal treatment in the same video; INTEL-tagged
material stays uncleared; nothing investor-facing; Madre de Dios held back from
promotional cuts; HUNTER BILL never appears. The pieces are positioned as short films
for festival purposes, so title them as films, not as episodes of a channel series.
If the series later gets its own channel, these become the reposts, not the originals.

**Do not delete the archive.** Two reasons. Old videos carry views and backlinks that
a deletion throws away. And some of them are **evidence**: the Singularity University
talks, *Welcome to the Bank of You* at Exponential Finance included, are the public
proof of a faculty appointment SU no longer lists on its own site. Deleting them would
remove the one external verification the CV has for that line.

---

## 4. Rules for the manual pass over the video list

- **New videos:** title is the question verbatim; description opens with the 40 to 60
  word answer, then links to `sam-rad.com/writing/[question-slug]`. Already agreed for
  R-A-D.
- **Old videos:** fix titles that put a retired brand first. "2023: A Retrospective
  with Radical Next" treats the book as the brand; lead with Sam Rad.
- **Any description** naming LOVE, Radical Next as a company, Shadowverse, The Future is
  Rad, or Radical Futurist gets corrected or moved to the archive playlist.
- **Pin a comment** on the trailer and the top five videos pointing at
  `sam-rad.com/speaking`.

---

## 5. One decision only you can make

**The 🔮.** It is on YouTube, LinkedIn, Instagram and X, so it is a genuine cross-platform
mark, and dropping it on one surface only would be its own inconsistency. But the site
does not use it, and a crystal ball says *prediction*, which is close to the opposite
of your thesis. Change Has a Pattern argues the future is legible, not foreseen. The
name above drops it. Keep it or drop it everywhere.
