import re, base64, mimetypes, os, sys, glob
page, out = sys.argv[1], sys.argv[2]
html = open(f'.next/server/app/{page}.html').read()
css = open(glob.glob('.next/static/css/*.css')[0]).read()
html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
html = re.sub(r'<script[^>]*/>', '', html)
html = re.sub(r'<link[^>]*_next/static[^>]*>', '', html)

# Unwrap every max-width media block >= 390px, in source order, so phone rules
# apply unconditionally (a narrow iframe alone does not trigger them).
out_css, tail, i = [], [], 0
while i < len(css):
    m = re.compile(r'@media\s*\(max-width:\s*(\d+)px\)\s*\{').search(css, i)
    if not m:
        out_css.append(css[i:]); break
    out_css.append(css[i:m.start()])
    depth, j = 1, m.end()
    while depth and j < len(css):
        if css[j] == '{': depth += 1
        elif css[j] == '}': depth -= 1
        j += 1
    body = css[m.end():j-1]
    if int(m.group(1)) >= 390: tail.append(body)
    i = j
css = ''.join(out_css) + '\n/* flattened phone rules */\n' + '\n'.join(tail)

def b64(path):
    p = 'public' + path
    if not os.path.exists(p): print('MISSING', path); return path
    mt = mimetypes.guess_type(p)[0] or 'image/jpeg'
    return f'data:{mt};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

html = re.sub(r'(src="|href="|srcSet="|srcset=")(/(?:images|logos)/[^"]+)(")',
                lambda m: m.group(1)+b64(m.group(2))+m.group(3), html)
html = re.sub(r'url\((/images/[^)]+)\)', lambda m: 'url('+b64(m.group(1))+')', html)
css = re.sub(r'url\(["\']?(/images/[^)"\']+)["\']?\)', lambda m: 'url('+b64(m.group(1))+')', css)

frame = ('<style>html{background:#3a3a3a;}body{margin:0;}'
         '.phone{width:390px;margin:0 auto;background:var(--paper);'
         'box-shadow:0 0 60px rgba(0,0,0,.5);overflow-x:hidden;}</style>')
html = html.replace('</head>', '<style>'+css+'</style>'+frame+'</head>', 1)
html = html.replace('<body', '<body data-mobile-preview="390px"', 1)
html = re.sub(r'(<body[^>]*>)', r'\1<div class="phone">', html, count=1)
html = html.replace('</body>', '</div></body>', 1)
open(out, 'w').write(html)
print(out, len(html)//1024, 'KB')
