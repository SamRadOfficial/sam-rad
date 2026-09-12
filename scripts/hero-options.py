"""Builds a single standalone HTML holding every candidate homepage hero.

Clones the real <section class="photo-hero"> out of the built homepage and swaps only
the image, so each option is the actual component with the actual CSS, not a
re-creation. Images are inlined as base64 so the file opens anywhere.

    python3 scripts/hero-options.py /tmp/hero-options.html
"""
import base64
import mimetypes
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def built(page):
    name = 'index.html' if page == '/' else page.strip('/') + '.html'
    return os.path.join(ROOT, '.next', 'server', 'app', name)
CSS_DIR = os.path.join(ROOT, '.next', 'static', 'css')

# page, label, file, object-position, caption, note
OPTIONS = [
    ('/', 'HOME · hero-meet', 'hero-meet.jpg', 'center 30%', 'SIM Executive Conference',
     'Your pick. Also currently the hero on /speaking and /book.'),
    ('/', 'HOME · current', 'hero-work.jpg', 'center top', 'Ivanti Solutions Summit',
     'For reference. The politician read.'),
    ('/speaking', 'SPEAKING · audience-women', 'audience-women.jpg', 'center 40%', 'SHRM · Dallas',
     'Your pick. Currently the hero on /meet-sam, so that page needs the replacement below.'),
    ('/meet-sam', 'MEET SAM · subway close-up', 'nyc-subway-stairs-wide.jpg', 'center 40%', 'New York',
     'NEW. The 5304x7952 original, extended left so the headline has a quiet field.'),
    ('/meet-sam', 'MEET SAM · green suit on ink', 'meet-green-ink.jpg', 'center center', '',
     'NEW. Cutout composited on brand ink. No photograph behind the type at all.'),
    ('/meet-sam', 'MEET SAM · green suit on paper', 'meet-green-paper.jpg', 'center center', '',
     'NEW. Same cutout on paper. Lighter page, type goes dark.'),
    ('/body-of-work', 'BODY OF WORK · Williamsburg Bridge', 'williamsburg-bridge-walk.jpg', 'center 35%', 'Williamsburg Bridge',
     'NEW. Walking, book in hand, pink rails.'),
    ('/body-of-work', 'BODY OF WORK · subway close-up', 'nyc-subway-stairs-wide.jpg', 'center 40%', 'New York',
     'Same extended plate, if you would rather it lived here than on Meet Sam.'),
    ('/body-of-work', 'BODY OF WORK · current', 'nyc-archway.jpg', 'center 30%', 'New York',
     'For reference. What shipped last week.'),
]


def b64(path):
    with open(path, 'rb') as fh:
        data = fh.read()
    mime = mimetypes.guess_type(path)[0] or 'image/jpeg'
    return f'data:{mime};base64,' + base64.b64encode(data).decode()


def main(out_path):
    heroes = {}
    for page in {o[0] for o in OPTIONS}:
        with open(built(page), encoding='utf8') as fh:
            html = fh.read()
        m = re.search(r'<section class="photo-hero.*?</section>', html, re.S)
        if not m:
            sys.exit(f'no hero section found in {page}')
        heroes[page] = m.group(0)

    css = []
    for name in sorted(os.listdir(CSS_DIR)):
        if name.endswith('.css'):
            with open(os.path.join(CSS_DIR, name), encoding='utf8') as fh:
                css.append(fh.read())
    css = '\n'.join(css)
    # Inline any font or image the stylesheet pulls from /images.
    def css_url(mo):
        rel = mo.group(1).lstrip('/')
        p = os.path.join(ROOT, 'public', rel)
        return f'url({b64(p)})' if os.path.exists(p) else mo.group(0)
    css = re.sub(r'url\((/images/[^)]+)\)', css_url, css)

    blocks = []
    for page, label, img, pos, caption, note in OPTIONS:
        hero = heroes[page]
        jpg = os.path.join(ROOT, 'public', 'images', img)
        webp = jpg.rsplit('.', 1)[0] + '.webp'
        if not os.path.exists(jpg):
            print('MISSING', jpg)
            continue
        h = hero
        h = re.sub(r'srcSet="[^"]*"|srcset="[^"]*"', f'srcset="{b64(webp)}"', h)
        h = re.sub(r'src="/images/[^"]*"', f'src="{b64(jpg)}"', h)
        h = re.sub(r'object-position:[^";]*', f'object-position:{pos}', h)
        h = re.sub(r'(<div class="cap">)[^<]*', lambda mo: mo.group(1) + caption, h)
        dims = ''
        try:
            from PIL import Image
            w, hh = Image.open(jpg).size
            dims = f' &nbsp;·&nbsp; {w}×{hh}'
        except Exception:
            pass
        blocks.append(
            f'<div class="opt"><div class="opt-bar"><b>{label}</b>'
            f'<span>{img}{dims}{" &nbsp;·&nbsp; " + note if note else ""}</span></div>{h}</div>')

    doc = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hero options</title>
<style>{css}</style>
<style>
  body {{ margin:0; background:#14161c; }}
  .opt {{ margin:0 0 34px; }}
  .opt-bar {{ position:sticky; top:0; z-index:50; background:#14161c; color:#f2efe9;
    font:600 13px/1.5 Inter,system-ui,sans-serif; padding:10px 18px; display:flex;
    gap:16px; align-items:baseline; border-bottom:1px solid #2a2e38; }}
  .opt-bar span {{ font-weight:400; color:#9aa1ad; font-size:12px; }}
  .photo-hero {{ min-height:78vh; }}
  .sheet-head {{ color:#f2efe9; font:600 15px/1.6 Inter,system-ui,sans-serif;
    padding:22px 18px; border-bottom:1px solid #2a2e38; }}
  .sheet-head em {{ color:#9aa1ad; font-style:normal; font-weight:400; }}
</style>
</head><body>
<div class="sheet-head">Hero options across four pages &nbsp;<em>Each block is that
page's real PhotoHero with the real stylesheet, so headline, lead and CTA are the ones
that page actually uses. Only the image and its object-position change.</em></div>
{''.join(blocks)}
</body></html>"""

    with open(out_path, 'w', encoding='utf8') as fh:
        fh.write(doc)
    print(out_path, len(doc) // 1024, 'KB,', len(blocks), 'options')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '/tmp/hero-options.html')
