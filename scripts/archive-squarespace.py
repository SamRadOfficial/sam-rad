#!/usr/bin/env python3
"""Archive the old Squarespace site before it is cancelled.

    python3 scripts/archive-squarespace.py --dry-run      # look first, download nothing big
    python3 scripts/archive-squarespace.py                # the full archive

Writes to ~/Documents/sam-rad-archive by default (override with --out). Deliberately
**outside** the site repo: the images alone can run to hundreds of megabytes, and none
of it should ship to Vercel.

What it captures, for every URL in the site's sitemap:

- the rendered HTML, as a visitor saw it
- Squarespace's own JSON for the page (`?format=json`), which carries the full post body,
  publish date, tags, categories and author, far cleaner than scraping HTML
- every post in every collection (blog, events, galleries), paginated to the end
- the **original** of every image, not the resized copy the page displayed. Squarespace
  serves images from its own CDN; once the subscription ends those URLs are not
  guaranteed, so a post that still links to them is a post that will eventually lose
  its pictures
- an SQLite database, `archive.sqlite`, with tables `pages`, `posts` and `images`, plus
  `posts.json` and `posts.csv` for anything that would rather not speak SQL

Standard library only, so it runs on a stock Mac Python with nothing to install. It
ignores robots.txt on purpose: the archive host disallows crawlers because we told it
to, and this is Sam archiving her own site.

It is safe to re-run. Anything already downloaded is skipped, so a run interrupted by a
dropped connection resumes where it stopped.
"""
import argparse
import csv
import hashlib
import html
import json
import os
import re
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) sam-rad-archive/1.0'
DELAY = 0.35          # seconds between requests; polite, and Squarespace rate-limits
RETRIES = 3


# ── fetching ────────────────────────────────────────────────────────────────────

def fetch(url, binary=False):
    """GET with retries. Returns (status, bytes-or-text, final_url) or (status, None, url)."""
    last = None
    for attempt in range(RETRIES):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
            with urllib.request.urlopen(req, timeout=40) as r:
                body = r.read()
                time.sleep(DELAY)
                return r.status, (body if binary else body.decode('utf-8', 'replace')), r.geturl()
        except urllib.error.HTTPError as e:
            if e.code in (404, 410, 403):
                time.sleep(DELAY)
                return e.code, None, url
            last = e
        except Exception as e:  # network blips, timeouts
            last = e
        time.sleep(1.5 * (attempt + 1))
    print(f'  ! gave up on {url}: {last}', file=sys.stderr)
    return 0, None, url


def with_query(url, **params):
    p = urllib.parse.urlsplit(url)
    q = dict(urllib.parse.parse_qsl(p.query))
    q.update({k: str(v) for k, v in params.items()})
    return urllib.parse.urlunsplit((p.scheme, p.netloc, p.path, urllib.parse.urlencode(q), ''))


def safe_name(url_path):
    """/blog/some-post -> blog__some-post ; / -> _home"""
    p = url_path.strip('/') or '_home'
    return re.sub(r'[^A-Za-z0-9._-]+', '__', p)[:180]


# ── sitemap ─────────────────────────────────────────────────────────────────────

def sitemap_urls(base):
    status, text, _ = fetch(urllib.parse.urljoin(base, '/sitemap.xml'))
    if not text:
        return [], []
    try:
        root = ET.fromstring(text.encode('utf-8'))
    except ET.ParseError:
        return [], []
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'i': 'http://www.google.com/schemas/sitemap-image/1.1'}
    pages, images = [], []
    # A sitemap index points at child sitemaps; follow one level.
    for sm in root.findall('s:sitemap/s:loc', ns):
        _, child, _ = fetch(sm.text.strip())
        if child:
            try:
                croot = ET.fromstring(child.encode('utf-8'))
                pages += [l.text.strip() for l in croot.findall('s:url/s:loc', ns)]
                images += [l.text.strip() for l in croot.findall('.//i:image/i:loc', ns)]
            except ET.ParseError:
                pass
    pages += [l.text.strip() for l in root.findall('s:url/s:loc', ns)]
    images += [l.text.strip() for l in root.findall('.//i:image/i:loc', ns)]
    return list(dict.fromkeys(pages)), list(dict.fromkeys(images))


# ── image discovery ─────────────────────────────────────────────────────────────

class ImgFinder(HTMLParser):
    """Every image URL an HTML fragment mentions, including Squarespace's lazy-load
    attributes, which is where most of them live."""
    ATTRS = ('src', 'data-src', 'data-image', 'data-image-focal-point-src', 'srcset', 'data-srcset', 'href')

    def __init__(self):
        super().__init__()
        self.found = set()

    def handle_starttag(self, tag, attrs):
        for k, v in attrs:
            if not v or k not in self.ATTRS:
                continue
            for part in v.split(','):
                u = part.strip().split(' ')[0]
                if is_image_url(u):
                    self.found.add(u)


def is_image_url(u):
    if not u or u.startswith('data:'):
        return False
    low = u.lower().split('?')[0]
    return ('squarespace-cdn.com' in low or 'sqspcdn.com' in low
            or low.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif', '.tif', '.tiff')))


def original_of(u):
    """Squarespace resizes by query string (?format=750w). The bare URL is the upload."""
    u = html.unescape(u)
    if u.startswith('//'):
        u = 'https:' + u
    p = urllib.parse.urlsplit(u)
    if 'squarespace-cdn.com' in p.netloc or 'sqspcdn.com' in p.netloc:
        return urllib.parse.urlunsplit((p.scheme or 'https', p.netloc, p.path, '', ''))
    return u


def images_in_html(fragment):
    f = ImgFinder()
    try:
        f.feed(fragment or '')
    except Exception:
        pass
    return {original_of(u) for u in f.found}


def images_in_json(obj):
    out = set()
    def walk(x):
        if isinstance(x, dict):
            for k, v in x.items():
                if isinstance(v, str):
                    if k in ('assetUrl', 'imageUrl', 'thumbnailUrl', 'socialImageUrl') and is_image_url(v):
                        out.add(original_of(v))
                    elif '<img' in v or 'data-src' in v:
                        out.update(images_in_html(v))
                else:
                    walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
    walk(obj)
    return out


# ── the archive ─────────────────────────────────────────────────────────────────

SCHEMA = """
CREATE TABLE IF NOT EXISTS pages (
  url TEXT PRIMARY KEY, path TEXT, title TEXT, status INTEGER,
  html_file TEXT, json_file TEXT, kind TEXT, fetched_at TEXT);
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY, url TEXT, path TEXT, collection TEXT, title TEXT,
  published TEXT, updated TEXT, author TEXT, tags TEXT, categories TEXT,
  excerpt TEXT, body_html TEXT, featured_image TEXT, source_json TEXT);
CREATE TABLE IF NOT EXISTS images (
  url TEXT PRIMARY KEY, local_file TEXT, bytes INTEGER, sha256 TEXT,
  status INTEGER, first_seen_on TEXT);
"""


def iso(ms):
    try:
        return datetime.fromtimestamp(int(ms) / 1000, tz=timezone.utc).isoformat()
    except Exception:
        return None


def item_row(it, collection):
    return {
        'id': it.get('id') or it.get('urlId') or it.get('fullUrl'),
        'url': it.get('fullUrl'),
        'path': it.get('fullUrl'),
        'collection': collection,
        'title': html.unescape(it.get('title') or ''),
        'published': iso(it.get('publishOn') or it.get('addedOn')),
        'updated': iso(it.get('updatedOn')),
        'author': ((it.get('author') or {}).get('displayName')) if isinstance(it.get('author'), dict) else None,
        'tags': json.dumps(it.get('tags') or []),
        'categories': json.dumps(it.get('categories') or []),
        'excerpt': re.sub(r'<[^>]+>', '', html.unescape(it.get('excerpt') or '')).strip(),
        'body_html': it.get('body') or '',
        'featured_image': original_of(it['assetUrl']) if it.get('assetUrl') else None,
        'source_json': json.dumps(it, ensure_ascii=False),
    }


def run(base, out, dry):
    base = base.rstrip('/') + '/'
    for d in ('html', 'json', 'images'):
        os.makedirs(os.path.join(out, d), exist_ok=True)
    db = sqlite3.connect(os.path.join(out, 'archive.sqlite'))
    db.executescript(SCHEMA)
    now = datetime.now(timezone.utc).isoformat()

    print(f'Reading the sitemap at {base}sitemap.xml')
    pages, sitemap_images = sitemap_urls(base)
    if not pages:
        pages = [base, urllib.parse.urljoin(base, 'blog')]
        print('  no sitemap found; starting from the home page and /blog')
    print(f'  {len(pages)} pages, {len(sitemap_images)} images listed')
    if dry:
        pages = pages[:6]
        print('  dry run: first six pages only, no image downloads')

    images = {original_of(u): 'sitemap' for u in sitemap_images}
    collections = []

    for n, url in enumerate(pages, 1):
        path = urllib.parse.urlsplit(url).path or '/'
        name = safe_name(path)
        print(f'[{n}/{len(pages)}] {path}')
        st, text, _ = fetch(url)
        html_file = None
        if text:
            html_file = f'html/{name}.html'
            open(os.path.join(out, html_file), 'w', encoding='utf-8').write(text)
            for u in images_in_html(text):
                images.setdefault(u, path)
        jst, jtext, _ = fetch(with_query(url, format='json'))
        json_file, kind, title = None, 'page', None
        if jtext and jtext.lstrip().startswith('{'):
            json_file = f'json/{name}.json'
            open(os.path.join(out, json_file), 'w', encoding='utf-8').write(jtext)
            try:
                j = json.loads(jtext)
                title = (j.get('collection') or {}).get('title') or (j.get('item') or {}).get('title')
                for u in images_in_json(j):
                    images.setdefault(u, path)
                if 'items' in j and isinstance(j['items'], list):
                    kind = 'collection'
                    collections.append((url, j))
                elif 'item' in j:
                    kind = 'item'
                    db.execute('INSERT OR REPLACE INTO posts VALUES (:id,:url,:path,:collection,:title,:published,'
                               ':updated,:author,:tags,:categories,:excerpt,:body_html,:featured_image,:source_json)',
                               item_row(j['item'], (j.get('collection') or {}).get('urlId')))
            except json.JSONDecodeError:
                pass
        db.execute('INSERT OR REPLACE INTO pages VALUES (?,?,?,?,?,?,?,?)',
                   (url, path, title, st, html_file, json_file, kind, now))
        db.commit()

    # Walk every collection to its last page. The sitemap lists posts, but the
    # collection listing is the authority on what exists, including anything the
    # sitemap left out.
    for url, first in collections:
        cname = (first.get('collection') or {}).get('urlId') or urllib.parse.urlsplit(url).path.strip('/')
        page, j, seen = 1, first, 0
        while True:
            for it in j.get('items') or []:
                db.execute('INSERT OR REPLACE INTO posts VALUES (:id,:url,:path,:collection,:title,:published,'
                           ':updated,:author,:tags,:categories,:excerpt,:body_html,:featured_image,:source_json)',
                           item_row(it, cname))
                for u in images_in_json(it):
                    images.setdefault(u, it.get('fullUrl') or cname)
                seen += 1
            db.commit()
            pg = j.get('pagination') or {}
            if dry or not pg.get('nextPage') or not pg.get('nextPageOffset'):
                break
            page += 1
            st, jtext, _ = fetch(with_query(url, format='json', offset=pg['nextPageOffset']))
            if not jtext:
                break
            open(os.path.join(out, f'json/{safe_name(cname)}__page{page}.json'), 'w', encoding='utf-8').write(jtext)
            j = json.loads(jtext)
        print(f'  collection /{cname}: {seen} items across {page} page(s)')

    # Images, originals only, content-addressed so duplicates collapse.
    todo = sorted(images)
    print(f'Images to fetch: {len(todo)}' + (' (skipped in a dry run)' if dry else ''))
    if not dry:
        for n, u in enumerate(todo, 1):
            row = db.execute('SELECT local_file FROM images WHERE url=? AND status=200', (u,)).fetchone()
            if row and row[0] and os.path.exists(os.path.join(out, row[0])):
                continue
            st, data, _ = fetch(u, binary=True)
            if data:
                ext = os.path.splitext(urllib.parse.urlsplit(u).path)[1].lower()[:6] or '.bin'
                sha = hashlib.sha256(data).hexdigest()
                base_name = re.sub(r'[^A-Za-z0-9._-]+', '-', os.path.basename(urllib.parse.urlsplit(u).path))[:80]
                rel = f'images/{sha[:12]}-{base_name or "image"}'
                if not rel.lower().endswith(ext):
                    rel += ext
                open(os.path.join(out, rel), 'wb').write(data)
                db.execute('INSERT OR REPLACE INTO images VALUES (?,?,?,?,?,?)', (u, rel, len(data), sha, st, images[u]))
            else:
                db.execute('INSERT OR REPLACE INTO images VALUES (?,?,?,?,?,?)', (u, None, 0, None, st, images[u]))
            if n % 25 == 0:
                db.commit()
                print(f'  {n}/{len(todo)} images')
        db.commit()

    # Flat exports of the posts, for anything that would rather not use SQL.
    rows = db.execute('SELECT id,url,collection,title,published,updated,author,tags,categories,'
                      'excerpt,featured_image,body_html FROM posts ORDER BY published').fetchall()
    cols = ['id', 'url', 'collection', 'title', 'published', 'updated', 'author', 'tags',
            'categories', 'excerpt', 'featured_image', 'body_html']
    recs = [dict(zip(cols, r)) for r in rows]
    json.dump(recs, open(os.path.join(out, 'posts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    with open(os.path.join(out, 'posts.csv'), 'w', newline='', encoding='utf-8') as fh:
        w = csv.writer(fh)
        w.writerow(cols[:-1])
        for r in recs:
            w.writerow([r[c] for c in cols[:-1]])

    got = db.execute('SELECT COUNT(*) FROM images WHERE status=200').fetchone()[0]
    failed = db.execute('SELECT url FROM images WHERE status<>200').fetchall()
    print('\n── Summary ─────────────────────────────')
    print(f'pages archived        {db.execute("SELECT COUNT(*) FROM pages WHERE status=200").fetchone()[0]} of {len(pages)}')
    print(f'posts in the database {len(recs)}')
    for c, k in db.execute('SELECT collection, COUNT(*) FROM posts GROUP BY collection'):
        print(f'   /{c}: {k}')
    print(f'images downloaded     {got} of {len(todo)}')
    if failed:
        print(f'images that failed    {len(failed)} (listed in failed-images.txt)')
        open(os.path.join(out, 'failed-images.txt'), 'w').write('\n'.join(u for (u,) in failed))
    print(f'\nEverything is in {out}')
    db.close()


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--base', default='https://archive.sam-rad.com/')
    ap.add_argument('--out', default=os.path.expanduser('~/Documents/sam-rad-archive'))
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    run(a.base, a.out, a.dry_run)
