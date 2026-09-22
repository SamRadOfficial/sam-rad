# Prompt for a new sam-rad.com thread

**Attach three things to the fresh conversation:**

1. `sam-rad-source.zip`, the complete source tree. **Required.** Without it the agent
   is guessing.
2. This folder's `HANDOFF.md` and `PLAYBOOK.md`. They are also inside the source zip,
   but attaching them separately means the agent can read them before unzipping
   anything.
3. Nothing else. `public/` never travels in a source zip. Send images only when asked,
   in their own assets zip.

Then paste everything below the line.

---

I'm Sam Rad. We're continuing work on sam-rad.com, a live Next.js speaker site. I've
attached the source. Read `HANDOFF.md` first, then `PLAYBOOK.md`. They're written for
exactly this situation and `HANDOFF.md` is kept current, so trust it over anything you
infer from the code.

**Your first task, before any site work: stand the project up and prove the tooling
works.**

```bash
mkdir -p ~/work && cd ~/work
# unzip the source here
npm install
npm run build          # must print "Generating static pages (N/N)", no failures
npm run check:images   # must print "images ok"
```

The page count is not a fixed number any more. It rises by one per post, and by two
per R-A-D post, which also gets a generated preview card. Check it went up by what you
added, not that it equals a number.

`scripts/preview.py`, `scripts/mobile.py` and `scripts/check-images.mjs` are in the zip
and they work. Do not rewrite them. Verify them:

```bash
python3 scripts/preview.py index /tmp/home.html
python3 scripts/mobile.py index /tmp/home-mobile.html
```

**Then open `/tmp/home.html` and confirm the hero renders.** If you cannot open an HTML
file and look at it, set up a headless browser before you do anything else. An agent
that cannot see its own output will ship a blank hero and tell me it looks great. That
is not hypothetical; it is why these scripts exist.

I don't have `public/` in the zip. Ask me for images and I'll send them in a separate
assets zip. Previews will not render until you have them.

## The loop

1. I ask for a change, or you propose one.
2. If there's a real design choice, you build 2 to 4 **mockups as standalone HTML
   files** using the site's own CSS, and I pick. You don't describe options in prose.
3. You make the change in the source.
4. You run `npm run build`, then `npm run check:images`.
5. You generate a **standalone HTML preview** of every page you touched, images inlined
   as base64, and share it so I can open it and actually look.
6. You give me the copy, build, commit and push commands.

Steps 2 and 5 are non-negotiable. I review by looking, not by reading descriptions.

## How you deliver

**Two zips, every time.**

- **`sam-rad-source-<WHAT>.zip`** wraps a `sam-rad-source/` folder holding the
  **complete** source tree, not just what changed. I install it by replacing folders,
  so anything missing from a folder you include gets deleted. **Never `public/`.**
- **`sam-rad-assets-<WHAT>.zip`** wraps `sam-rad-assets/public/`, mirroring the real
  tree, for any images, PDFs or video. I copy it with a trailing `/.` so it merges.

Name each zip for what it holds. A generic `sam-rad-source.zip` sitting in Downloads
got deployed once from an older copy. Deletions cannot travel in a zip; they need an
explicit `git rm` line in the commands.

## Rules that will save you from repeating our mistakes

- **Verify against the built output, never your intent.** Grep `.next/server/app/*.html`.
  Extract the text back out of a PDF. Screenshot the page. A source diff proves you
  typed something, not that it rendered.
- **`npm run check:images` before every push.** A `<picture>` source that 404s renders
  *nothing*; the browser does not fall back to the `<img>`. The checker does not yet
  audit CSS `url()` or video sources, so those still fail silently.
- **Check `next.config.js` before adding a route.** 59 redirect rules, and they run
  before pages, so one will shadow a real route without warning.
- **Update `HANDOFF.md` in the same batch as the change it describes**, and ship it in
  the source zip. A handoff that lies is worse than none. That is not a maxim; this
  project has had to unpick it twice.
- **Read `corpus/VOICE.md` before writing any copy**, once it exists. Voice work
  happens in a separate thread; that file is the only thing that crosses between them.
- **No counters in copy.** "9 industries", "all 20". They go stale and nobody updates
  them.
- **American English. No em dashes.**
- **One risky change at a time.** `main` auto-deploys to production.

The roadmap is `HANDOFF.md` section 9. Ask me what's next rather than picking for me.
