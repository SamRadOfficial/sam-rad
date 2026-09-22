#!/usr/bin/env python3
"""Download every image the Squarespace export points at, before Squarespace goes.

Run from inside the unzipped archive folder:

    cd ~/Documents/sam-rad-archive
    python3 fetch-images.py

The WordPress export Squarespace produces carries post text and *links* to images on
Squarespace's CDN, not the images themselves. Once the subscription is cancelled those
links are not guaranteed to keep working. This fetches the original upload of each one
(the URL with Squarespace's ?format= resize parameter stripped) into ./images, and
records the local file against the URL in archive.sqlite so a post's body can be
rewritten to point at the saved copy later.

Standard library only. Safe to re-run: anything already downloaded is skipped, so an
interrupted run picks up where it stopped. Prints a summary and writes
failed-images.txt for anything that would not come down.
"""
import hashlib
import os
import re
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) sam-rad-archive/1.0'
HERE = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(HERE, 'archive.sqlite')
OUT = os.path.join(HERE, 'images')


def fetch(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            if e.code in (403, 404, 410):
                return e.code, None
        except Exception:
            pass
        time.sleep(2 * (attempt + 1))
    return 0, None


def main():
    if not os.path.exists(DB):
        sys.exit('archive.sqlite not found. Run this from inside the archive folder.')
    os.makedirs(OUT, exist_ok=True)
    db = sqlite3.connect(DB)
    todo = db.execute("SELECT url FROM images WHERE status <> 'ok'").fetchall()
    total = db.execute('SELECT COUNT(*) FROM images').fetchone()[0]
    print(f'{total} images in the archive, {len(todo)} still to fetch')
    for n, (url,) in enumerate(todo, 1):
        status, data = fetch(url)
        if data:
            path = urllib.parse.urlsplit(url).path
            base = re.sub(r'[^A-Za-z0-9._-]+', '-', os.path.basename(path))[:80] or 'image'
            sha = hashlib.sha256(data).hexdigest()
            rel = f'images/{sha[:12]}-{base}'
            with open(os.path.join(HERE, rel), 'wb') as fh:
                fh.write(data)
            db.execute("UPDATE images SET local_file=?, bytes=?, status='ok' WHERE url=?", (rel, len(data), url))
        else:
            db.execute('UPDATE images SET status=? WHERE url=?', (f'failed {status}', url))
        if n % 20 == 0 or n == len(todo):
            db.commit()
            print(f'  {n}/{len(todo)}')
        time.sleep(0.25)
    db.commit()
    ok = db.execute("SELECT COUNT(*), COALESCE(SUM(bytes),0) FROM images WHERE status='ok'").fetchone()
    bad = db.execute("SELECT url, status FROM images WHERE status <> 'ok'").fetchall()
    print(f'\nDownloaded {ok[0]} of {total} ({ok[1] / 1e6:.1f} MB) into ./images')
    if bad:
        with open(os.path.join(HERE, 'failed-images.txt'), 'w') as fh:
            fh.write('\n'.join(f'{s}\t{u}' for u, s in bad))
        print(f'{len(bad)} failed; listed in failed-images.txt. Re-run to retry them.')
    else:
        print('Nothing failed. The archive is complete.')


if __name__ == '__main__':
    main()
