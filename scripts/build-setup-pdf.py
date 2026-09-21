"""Renders the agent setup pack into a single human-readable PDF.

    python3 scripts/build-setup-pdf.py out.pdf  [file.md ...]

Deliberately simple: headings, paragraphs, bullets, numbered lists, code blocks and
tables. It is not a general Markdown engine and does not need to be. Fonts are the
same embedded Inter subsets the CV uses, so diacritics and the bullet glyph survive
text extraction.
"""
import os
import re
import sys

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (HRFlowable, KeepTogether, PageBreak, Paragraph,
                                SimpleDocTemplate, Spacer, Table, TableStyle)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'scripts', 'fonts')
pdfmetrics.registerFont(TTFont('Inter', os.path.join(FONTS, 'Inter-Regular.ttf')))
pdfmetrics.registerFont(TTFont('Inter-Bold', os.path.join(FONTS, 'Inter-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('Inter-Italic', os.path.join(FONTS, 'Inter-Italic.ttf')))
pdfmetrics.registerFontFamily('Inter', normal='Inter', bold='Inter-Bold', italic='Inter-Italic')

INK = colors.HexColor('#0F1F3D')
MINT = colors.HexColor('#3FA383')
SOFT = colors.HexColor('#2A3A57')
MUTED = colors.HexColor('#5B6577')
RULE = colors.HexColor('#D8D1C3')
CODEBG = colors.HexColor('#F3F1EC')

S = {
    'h1': ParagraphStyle('h1', fontName='Inter-Bold', fontSize=19, leading=23, textColor=INK,
                         spaceBefore=4, spaceAfter=10),
    'h2': ParagraphStyle('h2', fontName='Inter-Bold', fontSize=12.5, leading=16, textColor=INK,
                         spaceBefore=16, spaceAfter=4),
    'h3': ParagraphStyle('h3', fontName='Inter-Bold', fontSize=10, leading=13, textColor=MINT,
                         spaceBefore=12, spaceAfter=3),
    'p': ParagraphStyle('p', fontName='Inter', fontSize=9.2, leading=13.4, textColor=SOFT,
                        spaceAfter=6),
    'li': ParagraphStyle('li', fontName='Inter', fontSize=9.2, leading=13.4, textColor=SOFT,
                         leftIndent=13, bulletIndent=2, spaceAfter=3),
    'code': ParagraphStyle('code', fontName='Courier', fontSize=8.2, leading=11.6, textColor=INK),
    'cap': ParagraphStyle('cap', fontName='Inter', fontSize=7.4, leading=10, textColor=MUTED),
}

def inline(t):
    """Markdown inline to ReportLab markup.

    Code spans are lifted out first. Without that, a `*` or `_` inside backticks
    gets read as emphasis and the resulting tags interleave, which ReportLab rejects
    with a parse error rather than degrading. `/press/:path*` is a real example from
    HANDOFF and it broke the first build of this script.
    """
    t = t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    spans = []

    def stash(m):
        spans.append(m.group(1))
        return f'\x00{len(spans) - 1}\x00'

    t = re.sub(r'`([^`]+)`', stash, t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'<i>\1</i>', t)
    t = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<link href="\2" color="#3FA383">\1</link>', t)
    return re.sub(
        r'\x00(\d+)\x00',
        lambda m: f'<font name="Courier" size="8.4" color="#0F1F3D">{spans[int(m.group(1))]}</font>',
        t)


def code_block(lines):
    body = '<br/>'.join(
        l.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace(' ', '&nbsp;')
        for l in lines)
    t = Table([[Paragraph(body, S['code'])]], colWidths=[165 * mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CODEBG),
        ('LEFTPADDING', (0, 0), (-1, -1), 9), ('RIGHTPADDING', (0, 0), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LINEBEFORE', (0, 0), (0, -1), 2, MINT),
    ]))
    return [Spacer(1, 3), t, Spacer(1, 8)]


def md_table(rows):
    head, body = rows[0], rows[2:]
    data = [[Paragraph(f'<b>{inline(c)}</b>', S['li']) for c in head]]
    data += [[Paragraph(inline(c), S['li']) for c in r] for r in body]
    t = Table(data, colWidths=[165 * mm / max(1, len(head))] * len(head))
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LINEBELOW', (0, 0), (-1, 0), 1, INK),
        ('LINEBELOW', (0, 1), (-1, -1), 0.4, RULE),
        ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ]))
    return [Spacer(1, 4), t, Spacer(1, 10)]


def render(md):
    out, lines, i = [], md.split('\n'), 0
    while i < len(lines):
        ln = lines[i]
        if ln.startswith('```'):
            buf = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                buf.append(lines[i]); i += 1
            out += code_block(buf); i += 1; continue
        if ln.startswith('|') and i + 1 < len(lines) and set(lines[i + 1].replace('|', '').strip()) <= set('-: '):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]); i += 1
            out += md_table(rows); continue
        if ln.startswith('### '):
            out.append(Paragraph(inline(ln[4:]).upper(), S['h3']))
        elif ln.startswith('## '):
            out.append(Paragraph(inline(ln[3:]), S['h2']))
            out.append(HRFlowable(width='100%', thickness=1, color=INK, spaceAfter=5))
        elif ln.startswith('# '):
            out.append(Paragraph(inline(ln[2:]), S['h1']))
        elif ln.strip() in ('---', '***'):
            out.append(HRFlowable(width='100%', thickness=0.6, color=RULE,
                                  spaceBefore=8, spaceAfter=8))
        elif re.match(r'^\s*[-*] ', ln) or re.match(r'^\s*\d+\. ', ln):
            # Pull in continuation lines. A wrapped list item is one item, and a
            # **bold** span straddling the line break only closes if the lines are
            # joined first; otherwise the asterisks render literally.
            ind = (len(ln) - len(ln.lstrip())) // 2
            num = re.match(r'^\s*(\d+)\. ', ln)
            body = re.sub(r'^\s*(?:[-*]|\d+\.) ', '', ln)
            while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(
                    r'^(\s*[-*] |\s*\d+\. |#|```|\||---)', lines[i + 1]):
                i += 1
                body += ' ' + lines[i].strip()
            st = ParagraphStyle('x', parent=S['li'], leftIndent=13 + ind * 12,
                                bulletIndent=2 + ind * 12)
            out.append(Paragraph(inline(body), st,
                                 bulletText=(num.group(1) + '.') if num else '\u2022'))
        elif ln.strip():
            buf = [ln]
            while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(
                    r'^(\s*[-*] |\s*\d+\. |#|```|\|)', lines[i + 1]):
                i += 1; buf.append(lines[i])
            out.append(Paragraph(inline(' '.join(x.strip() for x in buf)), S['p']))
        i += 1
    return out


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Inter', 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, 'sam-rad.com  ·  Agent setup and handoff')
    canvas.drawRightString(A4[0] - 18 * mm, 10 * mm, f'Page {canvas.getPageNumber()}')
    canvas.restoreState()


def main():
    out = sys.argv[1]
    files = sys.argv[2:]
    doc = SimpleDocTemplate(out, pagesize=A4,
                            leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=16 * mm, bottomMargin=17 * mm,
                            title='sam-rad.com, agent setup and handoff',
                            author='Sam Rad', creator='sam-rad.com')
    F = []
    for n, f in enumerate(files):
        if n:
            F.append(PageBreak())
        with open(f, encoding='utf8') as fh:
            F.append(Paragraph(os.path.basename(f), S['cap']))
            F += render(fh.read())
    doc.build(F, onFirstPage=footer, onLaterPages=footer)
    print('written:', out)


if __name__ == '__main__':
    main()
