import re, base64, mimetypes, os, sys, glob
page, out = sys.argv[1], sys.argv[2]
html = open(f'.next/server/app/{page}.html').read()
css = open(glob.glob('.next/static/css/*.css')[0]).read()
html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
html = re.sub(r'<script[^>]*/>', '', html)
html = re.sub(r'<link[^>]*_next/static[^>]*>', '', html)
def b64(path):
    p = 'public' + path
    if not os.path.exists(p): print('MISSING', path); return path
    mt = mimetypes.guess_type(p)[0] or 'image/jpeg'
    return f'data:{mt};base64,' + base64.b64encode(open(p,'rb').read()).decode()
# /video is inlined too, or a standalone preview of a video hero silently shows
# nothing but the poster and the reviewer cannot tell the difference.
html = re.sub(r'(src="|href="|srcSet="|srcset=")(/(?:images|logos|video)/[^"]+)(")',
                lambda m: m.group(1)+b64(m.group(2))+m.group(3), html)
html = re.sub(r'url\((/(?:images|logos)/[^)]+)\)', lambda m: 'url('+b64(m.group(1))+')', html)
css = re.sub(r'url\(["\']?(/(?:images|logos)/[^)"\']+)["\']?\)', lambda m: 'url('+b64(m.group(1))+')', css)
html = html.replace('</head>', '<style>'+css+'</style></head>', 1)
open(out,'w').write(html); print(out, len(html)//1024, 'KB')
