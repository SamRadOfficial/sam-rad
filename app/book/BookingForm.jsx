'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

const INDUSTRIES = ['Financial Services','Healthcare','Future of Work / HR','Higher Education','Supply Chain','Hospitality & Travel','Marketing & Advertising','Technology & AI','Government','Insurance','Retail','Other'];
const SIZES = ['Under 100','100–500','500–1,000','1,000–5,000','5,000+'];
const FORMATS = ['Keynote (45–60 min)','Keynote + Q&A','Virtual','Not sure yet'];

export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const val = (k) => (f.get(k) || '').toString().trim();
    const lines = [
      `Name: ${val('name')}`,
      `Email: ${val('email')}`,
      `Organization: ${val('organization')}`,
      `Event date: ${val('date')}`,
    ];
    const extra = [
      ['Role', val('role')],
      ['Event', val('event')],
      ['Location', val('location')],
      ['Audience size', val('audience')],
      ['Industry', val('industry')],
      ['Format', val('format')],
    ].filter(([, v]) => v);
    if (extra.length) lines.push('', ...extra.map(([k, v]) => `${k}: ${v}`));
    if (val('message')) lines.push('', val('message'));
    const url = `${SITE.bureau.mailto}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = url;
    setSent(true);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Tell us about your event</h3>
      <div className="frow">
        <div><label htmlFor="name">Your name</label><input id="name" name="name" required /></div>
        <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div>
      </div>
      <div className="frow">
        <div><label htmlFor="organization">Organization</label><input id="organization" name="organization" required /></div>
        <div><label htmlFor="date">Event date</label><input id="date" name="date" type="date" /></div>
      </div>

      <button
        type="button"
        className="form-more"
        aria-expanded={open}
        aria-controls="event-details"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? 'Hide event details' : 'Add event details'}</span>
        <span className="form-more-hint">{open ? 'Close' : 'Optional'}</span>
      </button>

      <div id="event-details" className="form-extra" hidden={!open}>
        <div className="frow">
          <div><label htmlFor="role">Your role</label><input id="role" name="role" /></div>
          <div><label htmlFor="event">Event name</label><input id="event" name="event" /></div>
        </div>
        <div className="frow">
          <div><label htmlFor="location">Location</label><input id="location" name="location" placeholder="City, country, or virtual" /></div>
          <div><label htmlFor="audience">Audience size</label><select id="audience" name="audience" defaultValue=""><option value="" />{SIZES.map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="frow">
          <div><label htmlFor="industry">Industry</label><select id="industry" name="industry" defaultValue=""><option value="" />{INDUSTRIES.map((s) => <option key={s}>{s}</option>)}</select></div>
          <div><label htmlFor="format">Format</label><select id="format" name="format" defaultValue=""><option value="" />{FORMATS.map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="frow one">
          <div>
            <label htmlFor="message">Anything else</label>
            <textarea id="message" name="message" placeholder="What is your audience facing right now? Who else is on the program?" />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-ink">Send inquiry →</button>
      <div className="fine" role="status">
        {sent
          ? 'Your email client should have opened with the details filled in. If it did not, write to brandy@executivespeakers.com directly.'
          : `Goes to ${SITE.bureau.agent} at ${SITE.bureau.org}, with Sam copied.`}
      </div>
    </form>
  );
}
