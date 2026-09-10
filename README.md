# sam-rad.com

Next.js App Router marketing site for Sam Rad, keynote speaker and futurist. Static
generated, deployed on Vercel from `main`. **The site is live. Every push to `main`
goes straight to production.**

## Read this first

**[`HANDOFF.md`](./HANDOFF.md)** is the working document: the rules that keep getting
broken, the stack, the design system, the component inventory, verified content facts,
page order, infrastructure, roadmap, and open items. It is kept current in the same
batch as the change it describes. Nothing about this project should be inferred from
this README instead.

**[`PLAYBOOK.md`](./PLAYBOOK.md)** is the generalized version, written so the next site
starts from the lessons rather than relearning them.

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # must print "Generating static pages (47/47)"
npm run check:images   # run before every push
```

Node 18.17+ required.

## Before you push

Build, run `npm run check:images`, and grep the built HTML in `.next/server/app` to
confirm your change actually landed. See HANDOFF section 1.

---

*This file was 75 lines of structure and editing notes that had drifted out of date by
launch. It now points at the one document that is maintained. Do not rebuild it.*
