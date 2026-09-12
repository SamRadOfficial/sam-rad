"""Renders the two CV PDFs from data/cv.json. Run from the repo root after editing
the JSON:

    python3 scripts/build-cv-pdfs.py

Outputs public/cv/samantha-radocchia-cv.pdf and public/cv/samantha-radocchia-academic-cv.pdf.

Notes for whoever touches this next:

* Fonts are embedded from scripts/fonts/ (Inter, subset to Latin Extended-A). Do not
  switch back to the Helvetica built-ins: they are Type 1 with no diacritics, which is
  why Medellin and Yucatan used to extract as black squares.
* Do NOT convert &amp; to & before handing text to ReportLab. ReportLab parses its own
  mini-HTML, so a bare & becomes a broken entity, which is how "R&D lab" once shipped
  as "R&D; lab".
* Every row is wrapped in KeepTogether so a page break cannot land inside an entry and
  glue two roles together on text extraction. Validate with both
  `pdftotext` and `pdftotext -layout` after any layout change.
"""
import json
import os
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate,
                                Spacer, Table, TableStyle)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.path.join(ROOT, 'scripts', 'fonts')

INK = colors.HexColor('#0F1F3D')
MINT = colors.HexColor('#3FA383')
MUTED = colors.HexColor('#5B6577')
SOFT = colors.HexColor('#2A3A57')
RULE = colors.HexColor('#D8D1C3')

# ---------------------------------------------------------------- fonts
# Embedded so diacritics survive text extraction on any machine.
pdfmetrics.registerFont(TTFont('Inter', os.path.join(FONT_DIR, 'Inter-Regular.ttf')))
pdfmetrics.registerFont(TTFont('Inter-Bold', os.path.join(FONT_DIR, 'Inter-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('Inter-Italic', os.path.join(FONT_DIR, 'Inter-Italic.ttf')))
pdfmetrics.registerFontFamily('Inter', normal='Inter', bold='Inter-Bold', italic='Inter-Italic')

cv = json.load(open(os.path.join(ROOT, 'data', 'cv.json'), encoding='utf-8'))
FOCUS = ' · '.join(cv['focusAreas'])
FOOTER_NOTE = f"{cv['name']} · Curriculum Vitae · Last updated: {cv['lastUpdated']}"


def clean(h):
    """JSX-flavored HTML -> ReportLab mini-HTML.

    &amp; is deliberately left alone; see the module docstring.
    """
    h = re.sub(r'<br\s*/?>', '<br/>', h)
    # ReportLab's mini-HTML spells strikethrough <strike>, not <s>.
    h = h.replace('<s>', '<strike>').replace('</s>', '</strike>')
    h = re.sub(r"<span class='chip filed'>(.*?)</span>",
               r'<font color="#5B6577" size="6.8">[\1]  </font>', h)
    h = re.sub(r"<span class='chip'>(.*?)</span>",
               r'<font color="#3FA383" size="6.8">[\1]  </font>', h)
    h = re.sub(r"<span class='sub'>", '<br/><font color="#5B6577" size="8.4">', h)
    h = h.replace('</span>', '</font>')
    # Keep hyperlinks live in the PDF rather than stripping them.
    h = re.sub(r'<a href=[\'"]([^\'"]+)[\'"]>', r'<link href="\1" color="#0F1F3D">', h)
    h = h.replace('</a>', '</link>')
    return h


st_name = ParagraphStyle('n', fontName='Inter-Bold', fontSize=21, leading=23, textColor=INK, spaceAfter=3)
st_tag = ParagraphStyle('t', fontName='Inter-Bold', fontSize=7.5, leading=10, textColor=MINT, spaceAfter=6)
st_sub = ParagraphStyle('s', fontName='Inter', fontSize=9.4, leading=13.2, textColor=SOFT, spaceAfter=5)
st_focus = ParagraphStyle('f', fontName='Inter', fontSize=8.2, leading=11.5, textColor=MUTED, spaceAfter=5)
st_meta = ParagraphStyle('m', fontName='Inter', fontSize=7.6, leading=10.5, textColor=MUTED)
st_h = ParagraphStyle('h', fontName='Inter-Bold', fontSize=8, leading=10, textColor=MINT, spaceBefore=11, spaceAfter=3)
st_sh = ParagraphStyle('sh', fontName='Inter-Bold', fontSize=7.6, leading=10, textColor=INK, spaceBefore=7, spaceAfter=2)
st_l = ParagraphStyle('l', fontName='Inter-Bold', fontSize=7.2, leading=9.8, textColor=MUTED)
st_r = ParagraphStyle('r', fontName='Inter', fontSize=8.7, leading=12, textColor=SOFT)
st_note = ParagraphStyle('nt', fontName='Inter', fontSize=7.6, leading=10.6, textColor=MUTED,
                         spaceBefore=6, spaceAfter=8, leftIndent=44 * mm)
st_lede = ParagraphStyle('ld', fontName='Inter', fontSize=9.2, leading=13, textColor=SOFT, spaceAfter=4)

# 44mm stops "WORLD ECONOMIC FORUM" and "FEDERAL RESERVE BANK OF CHICAGO"
# wrapping awkwardly in the label column.
LABEL_W = 44 * mm


def row_table(rows):
    """One two-column table per entry, so KeepTogether can protect each entry
    individually and no page break lands mid-role."""
    out = []
    for r in rows:
        t = Table([[Paragraph(clean(r['label']).upper(), st_l),
                    Paragraph(clean(r['html']), st_r)]],
                  colWidths=[LABEL_W, None])
        t.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LINEBELOW', (0, 0), (-1, -1), 0.4, RULE),
            ('TOPPADDING', (0, 0), (-1, -1), 4.5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
            ('LEFTPADDING', (0, 0), (-1, -1), 1),
            ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ]))
        out.append(KeepTogether(t))
    return out


def section(title, rows):
    # The heading, its rule and the first entry are bound together, or a page break
    # can strand a section header alone at the foot of a page. ADVISORY did exactly
    # that once the section order changed.
    head = [Paragraph(title.upper(), st_h),
            HRFlowable(width='100%', thickness=1.1, color=INK, spaceAfter=2)]
    first = next((r for r in rows if 'head' not in r and 'note' not in r), None)
    if first is not None:
        # row_table() already wraps each entry in KeepTogether; nesting one inside
        # another makes ReportLab mis-measure and the document triples in length.
        # Unwrap the first entry and bind the raw table to the heading instead.
        out = [KeepTogether(head + [row_table([first])[0]._content[0]])]
        rows = [r for r in rows if r is not first]
    else:
        out = list(head)
    batch = []
    for r in rows:
        if 'head' in r:
            out.extend(row_table(batch))
            batch = []
            out.append(Paragraph(r['head'].upper(), st_sh))
        elif 'note' in r:
            out.extend(row_table(batch))
            batch = []
            out.append(Paragraph(clean(r['note']), st_note))
        else:
            batch.append(r)
    out.extend(row_table(batch))
    return out


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Inter', 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 9 * mm, FOOTER_NOTE)
    canvas.drawRightString(A4[0] - 16 * mm, 9 * mm, f'Page {canvas.getPageNumber()}')
    canvas.restoreState()


def build(path, sub, order, with_interests, subject):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=16 * mm, rightMargin=16 * mm, topMargin=14 * mm, bottomMargin=16 * mm,
        title=f"{cv['name']}, Curriculum Vitae",
        author=cv['name'],
        subject=subject,
        keywords=', '.join(cv['focusAreas']),
        creator='sam-rad.com',
        lang='en-US',
    )
    F = []
    F.append(Paragraph('CURRICULUM VITAE', st_tag))
    F.append(Paragraph(cv['name'].upper(), st_name))
    F.append(Paragraph(clean(sub), st_sub))
    F.append(Paragraph(f'<b>Focus areas:</b> {FOCUS}', st_focus))
    contact = (f"{cv['location']} &nbsp;·&nbsp; {cv['email']} &nbsp;·&nbsp; "
               f"<link href=\"{cv['linkedinUrl']}\" color=\"#5B6577\">{cv['linkedin']}</link> &nbsp;·&nbsp; "
               f"ORCID <link href=\"https://orcid.org/{cv['orcid']}\" color=\"#5B6577\">{cv['orcid']}</link> "
               f"&nbsp;·&nbsp; sam-rad.com/cv")
    F.append(Paragraph(contact, st_meta))
    F.append(Spacer(1, 4))
    F.append(HRFlowable(width='100%', thickness=1.4, color=INK, spaceAfter=2))
    if with_interests:
        F.append(Paragraph('RESEARCH INTERESTS', st_h))
        F.append(HRFlowable(width='100%', thickness=1.1, color=INK, spaceAfter=4))
        F.append(Paragraph(clean(cv['interests']), st_lede))
    s = cv['sections']
    titles = {'current': 'Current practice', 'fieldwork': 'Fieldwork',
              'patents': 'Invention and standards',
              'appointments': 'Ventures and appointments', 'publications': 'Publications',
              'cited': 'Cited in', 'education': 'Education',
              'training': 'Training and certification', 'advisory': 'Advisory',
              'awards': 'Awards', 'skills': 'Skills and methods'}
    for key in order:
        F.extend(section(titles[key], s[key]))
    doc.build(F, onFirstPage=footer, onLaterPages=footer)
    return path


# Professional order, revised 11 Sep 2026. It led with patents from the first commit,
# which answered a question the reader had not asked yet: inventions with no context
# read as trivia. Current practice establishes who she is, patents then land as
# evidence. Mirrors the section order on /cv. The academic order below is inverted on
# purpose, because its reader wants credentials and research first.
PRO_ORDER = ['current', 'patents', 'appointments', 'publications', 'advisory', 'awards',
             'fieldwork', 'cited', 'education', 'training', 'skills']
ACA_ORDER = ['education', 'fieldwork', 'current', 'publications', 'cited', 'patents',
             'appointments', 'training', 'advisory', 'awards', 'skills']

os.makedirs(os.path.join(ROOT, 'public', 'cv'), exist_ok=True)
pro = build(os.path.join(ROOT, 'public', 'cv', 'samantha-radocchia-cv.pdf'),
            cv['subhead']['professional'], PRO_ORDER, False,
            'Professional curriculum vitae of Samantha Radocchia, who publishes and speaks as Sam Rad.')
aca = build(os.path.join(ROOT, 'public', 'cv', 'samantha-radocchia-academic-cv.pdf'),
            cv['subhead']['academic'], ACA_ORDER, True,
            'Academic curriculum vitae of Samantha Radocchia, who publishes and speaks as Sam Rad.')
print('written:', pro)
print('written:', aca)
