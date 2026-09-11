"""Renders the ATS version of the CV from data/cv.json. Run from the repo root:

    python3 scripts/build-cv-docx.py

Outputs public/cv/samantha-radocchia-cv.docx.

This is the machine-readable copy, not the designed one. Deliberately plain: single
column, no tables, no text boxes, no headers or footers, standard heading names
(Experience, Concurrent Appointments, Patents, Publications, Education, Skills) that
applicant tracking systems recognize. Content is the same as the professional PDF.

Requires python-docx:  pip3 install python-docx
"""
import json
import os
import re

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cv = json.load(open(os.path.join(ROOT, 'data', 'cv.json'), encoding='utf-8'))

INK = RGBColor(0x0F, 0x1F, 0x3D)
MUTED = RGBColor(0x5B, 0x65, 0x77)

# ATS parsers key off conventional section names, so the display headings used on the
# website are mapped to the ones they expect.
HEADINGS = {
    'appointments': 'Experience',
    'current': 'Experience',
    'patents': 'Patents',
    'fieldwork': 'Research and Fieldwork',
    'publications': 'Publications',
    'cited': 'Cited In',
    'education': 'Education',
    'training': 'Training and Certification',
    'advisory': 'Advisory',
    'awards': 'Awards',
    'skills': 'Skills',
}

TAG = re.compile(r'<[^>]+>')


def text(h):
    """HTML -> plain text, keeping the line breaks that separate title from body."""
    h = re.sub(r"<span class='sub'>", ' | ', h)
    h = re.sub(r'<s>(.*?)</s>', '\x00\\1\x00', h)
    h = re.sub(r'<br\s*/?>', '\n', h)
    h = TAG.sub('', h)
    h = h.replace('&amp;', '&').replace('&nbsp;', ' ')
    return re.sub(r'[ \t]+', ' ', h).strip()


def first_line(h):
    """The bolded title line, used as the entry's lead so a parser sees
    date, title, organization together at the start of the entry."""
    m = re.search(r'<b>(.*?)</b>', h)
    return TAG.sub('', m.group(1)).replace('&amp;', '&').strip() if m else ''


doc = Document()

style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(10)
style.paragraph_format.space_after = Pt(4)
style.paragraph_format.line_spacing = 1.08


STRIKE = re.compile(r'\x00(.*?)\x00')


def para(txt, size=10, bold=False, color=None, space_before=0, space_after=4, italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    # text() marks struck spans with \x00 sentinels so the formatting survives
    # the tag stripping. A thesis title with a struck word is meaningless without it.
    for i, part in enumerate(STRIKE.split(txt)):
        if not part:
            continue
        run = p.add_run(part)
        run.bold = bold
        run.italic = italic
        run.font.strike = bool(i % 2)
        run.font.size = Pt(size)
        if color is not None:
            run.font.color.rgb = color
    return p


def heading(txt):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(3)
    run = p.add_run(txt.upper())
    run.bold = True
    run.font.size = Pt(11)
    run.font.color.rgb = INK


def subheading(txt):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(txt)
    run.bold = True
    run.font.size = Pt(10)
    run.font.color.rgb = INK


def entries(rows):
    for r in rows:
        if 'head' in r:
            subheading(r['head'])
            continue
        if 'note' in r:
            para(text(r['note']), size=9.5, color=MUTED, space_before=4, space_after=4)
            continue
        label = text(r['label'])
        body = text(r['html'])
        lines = [ln for ln in body.split('\n') if ln.strip()]
        lead = lines[0] if lines else ''
        rest = lines[1:]
        # One paragraph per entry start: "2014 - 2019 | Co-Founder, Chronicled".
        # The separator and the paragraph break keep two roles from merging.
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(7)
        p.paragraph_format.space_after = Pt(1)
        run = p.add_run((f'{label} | {lead}' if lead else label).replace('\x00', ''))
        run.bold = True
        run.font.size = Pt(10)
        run.font.color.rgb = INK
        for ln in rest:
            para(ln, size=9.5, color=MUTED, space_after=2)


# ------------------------------------------------------------------ header
para(cv['name'], size=18, bold=True, color=INK, space_after=2)
para('Publishes and speaks as Sam Rad', size=10, color=MUTED, space_after=4)
para(f"{cv['location']} | {cv['email']} | {cv['linkedin']} | ORCID {cv['orcid']} | sam-rad.com/cv",
     size=9.5, color=MUTED, space_after=8)

heading('Summary')
para(text(cv['subhead']['professional']), size=10)
para('Focus areas: ' + ' | '.join(cv['focusAreas']), size=9.5, color=MUTED)

s = cv['sections']

heading('Experience')
entries(s['appointments'])

heading('Current Practice')
entries(s['current'])

for key in ['patents', 'fieldwork', 'publications', 'cited', 'education', 'training',
            'advisory', 'awards', 'skills']:
    heading(HEADINGS[key])
    entries(s[key])

para(f"Last updated: {cv['lastUpdated']}", size=9, color=MUTED, space_before=12)

core = doc.core_properties
core.title = f"{cv['name']}, Curriculum Vitae"
core.author = cv['name']
core.subject = 'Professional curriculum vitae of Samantha Radocchia, who publishes and speaks as Sam Rad.'
core.keywords = ', '.join(cv['focusAreas'])

out = os.path.join(ROOT, 'public', 'cv', 'samantha-radocchia-cv.docx')
os.makedirs(os.path.dirname(out), exist_ok=True)
doc.save(out)
print('written:', out)
