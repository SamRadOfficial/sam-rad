'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

const INDUSTRIES = ['Financial Services','Healthcare','Future of Work / HR','Higher Education','Supply Chain','Hospitality & Travel','Marketing & Advertising','Technology & AI','Government','Insurance','Retail','Other'];
const SIZES = ['Under 100','100–500','500–1,000','1,000–5,000','5,000+'];
const FORMATS = ['Keynote (45–60 min)','Keynote + Q&A','Virtual','Not sure yet'];

export default function BookingForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    const f = new FormData(form);
    if ((f.get('_gotcha') || '').toString().trim()) return; // bot

    const val = (k) => (f.get(k) || '').toString().trim();
    const payload = {
      Name: val('name'),
      Email: val('email'),
      Organization: val('organization'),
      'Event date': val('date'),
      Role: val('role'),
      'Event name': val('event'),
      Location: val('location'),
      'Audience size': val('audience'),
      Industry: val('industry'),
      Format: val('format'),
      Message: val('message'),
      _replyto: val('email'),
      _subject: `SAM RAD | Keynote inquiry from ${val('organization') || val('name')}`,
    };
    Object.keys(payload).forEach((k) => { if (!payload[k]) delete payload[k]; });

    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Bad response');
      setStatus('sent');
      form.reset();
      setOpen(false);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form form-sent" role="status" aria-live="polite">
        <h3>Thank you.</h3>
        <p>Your inquiry is in. You will hear back within one business day.</p>
        <p className="fine">
          Need to add something? Write to{' '}
          <a href="mailto:sam@sam-rad.com">sam@sam-rad.com</a>.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <h3>Tell us about your event</h3>

      <div className="frow">
        <div><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required /></div>
        <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div className="frow">
        <div><label htmlFor="organization">Organization</label><input id="organization" name="organization" autoComplete="organization" required /></div>
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

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

      <button type="submit" className="btn btn-ink" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>

      <div className="fine" role="status" aria-live="polite">
        {status === 'error' ? (
          <>
            Something went wrong sending that. Please write to{' '}
            <a href="mailto:sam@sam-rad.com">sam@sam-rad.com</a> and we will pick it up from there.
          </>
        ) : (
          'Expect a reply within one business day.'
        )}
      </div>
    </form>
  );
}
