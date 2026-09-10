"""Renders the two CV PDFs from data/cv.json. Run after editing the JSON:
    python3 scripts/build-cv-pdfs.py
Outputs public/cv/samantha-radocchia-cv.pdf and ...-academic-cv.pdf."""
import json, re, html
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                KeepTogether, HRFlowable)

INK=colors.HexColor('#0F1F3D'); MINT=colors.HexColor('#3FA383'); MUTED=colors.HexColor('#5B6577')
SOFT=colors.HexColor('#2A3A57'); RULE=colors.HexColor('#D8D1C3')

cv=json.load(open('data/cv.json'))

def clean(h):
    """JSX-flavoured HTML -> ReportLab mini-HTML."""
    h=h.replace('&rsquo;',"'").replace('&ndash;','–').replace('&middot;','·').replace('&amp;','&')
    h=h.replace('&iacute;','í').replace('&aacute;','á').replace('&Ccaron;','Č').replace('&cacute;','ć')
    h=re.sub(r'<br\s*/?>','<br/>',h)
    h=re.sub(r"<span class='sub'>",'<br/><font color="#5B6577" size="8.6">',h)
    h=h.replace('</span>','</font>')
    h=re.sub(r'<a [^>]*>','',h).replace('</a>','')
    return h

st_name=ParagraphStyle('n',fontName='Helvetica-Bold',fontSize=22,leading=24,textColor=INK,spaceAfter=3)
st_tag=ParagraphStyle('t',fontName='Helvetica-Bold',fontSize=7.5,leading=10,textColor=MINT,spaceAfter=6)
st_sub=ParagraphStyle('s',fontName='Helvetica',fontSize=9.6,leading=13.5,textColor=SOFT,spaceAfter=6)
st_meta=ParagraphStyle('m',fontName='Helvetica',fontSize=7.8,leading=11,textColor=MUTED)
st_h=ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=8,leading=10,textColor=MINT,spaceBefore=11,spaceAfter=3)
st_l=ParagraphStyle('l',fontName='Helvetica-Bold',fontSize=7.4,leading=10,textColor=MUTED)
st_r=ParagraphStyle('r',fontName='Helvetica',fontSize=8.9,leading=12.2,textColor=SOFT)
st_lede=ParagraphStyle('ld',fontName='Helvetica',fontSize=9.4,leading=13.4,textColor=SOFT,spaceAfter=4)

def section(title, rows, label_w=36*mm):
    out=[Paragraph(title.upper(), st_h), HRFlowable(width='100%',thickness=1.1,color=INK,spaceAfter=2)]
    data=[[Paragraph(clean(r['label']).upper(), st_l), Paragraph(clean(r['html']), st_r)] for r in rows]
    t=Table(data, colWidths=[label_w, None])
    t.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LINEBELOW',(0,0),(-1,-2),0.4,RULE),
        ('TOPPADDING',(0,0),(-1,-1),4.5),('BOTTOMPADDING',(0,0),(-1,-1),4.5),
        ('LEFTPADDING',(0,0),(-1,-1),1),('RIGHTPADDING',(0,0),(-1,-1),4),
    ]))
    out.append(t)
    return out

def build(path, sub, order, with_interests):
    doc=SimpleDocTemplate(path,pagesize=A4,leftMargin=16*mm,rightMargin=16*mm,topMargin=14*mm,bottomMargin=14*mm,
                          title=f"{cv['name']} — CV", author=cv['name'])
    F=[]
    F.append(Paragraph('CURRICULUM VITAE', st_tag))
    F.append(Paragraph(cv['name'].upper(), st_name))
    F.append(Paragraph(clean(sub), st_sub))
    F.append(Paragraph(f"{cv['location']} &nbsp;·&nbsp; {cv['email']} &nbsp;·&nbsp; ORCID {cv['orcid']} &nbsp;·&nbsp; sam-rad.com/cv", st_meta))
    F.append(Spacer(1,4)); F.append(HRFlowable(width='100%',thickness=1.4,color=INK,spaceAfter=2))
    if with_interests:
        F.append(Paragraph('RESEARCH INTERESTS', st_h)); F.append(HRFlowable(width='100%',thickness=1.1,color=INK,spaceAfter=4))
        F.append(Paragraph(clean(cv['interests']), st_lede))
    s=cv['sections']
    titles={'current':'Current practice','fieldwork':'Fieldwork','patents':'Invention and standards',
            'appointments':'Ventures and appointments','publications':'Publications','cited':'Cited in',
            'education':'Education','training':'Training and certification','advisory':'Advisory',
            'awards':'Awards','skills':'Skills and methods'}
    for key in order:
        F.extend(section(titles[key], s[key]))
    doc.build(F)
    return path

pro = build('public/cv/samantha-radocchia-cv.pdf', cv['subhead']['professional'],
    ['patents','appointments','current','fieldwork','publications','cited','education','training','advisory','awards','skills'], False)
aca = build('public/cv/samantha-radocchia-academic-cv.pdf', cv['subhead']['academic'],
    ['education','fieldwork','current','publications','cited','patents','appointments','training','advisory','awards','skills'], True)
print('written:', pro); print('written:', aca)
