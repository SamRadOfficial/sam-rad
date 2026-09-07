'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';

const INDUSTRIES = ['Financial Services','Healthcare','Future of Work / HR','Higher Education','Supply Chain','Hospitality & Travel','Marketing & Advertising','Technology & AI','Government','Insurance','Retail','Other'];
const SIZES = ['Under 100','100–500','500–1,000','1,000–5,000','5,000+'];
const FORMATS = ['Keynote (45–60 min)','Keynote + Q&A','Half-day workshop','Virtual','Not sure yet'];

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Organization: ${f.get('organization')}`,
      `Role: ${f.get('role')}`,
      `Event: ${f.get('event')}`,
      `Date: ${f.get('date')}`,
      `Location: ${f.get('location')}`,
      `Audience size: ${f.get('audience')}`,
      `Industry: ${f.get('industry')}`,
      `Format: ${f.get('format')}`,
      '',
      f.get('message') || '',
    ].join('\n');
    const url = `${SITE.bureau.mailto}&body=${encodeURIComponent(lines)}`;
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
        <div><label htmlFor="organization">Organization</label><input id="organization" name="organization" /></div>
        <div><label htmlFor="role">Your role</label><input id="role" name="role" /></div>
      </div>
      <div className="frow">
        <div><label htmlFor="event">Event name</label><input id="event" name="event" /></div>
        <div><label htmlFor="date">Event date</label><input id="date" name="date" type="date" /></div>
      </div>
      <div className="frow">
        <div><label htmlFor="location">Location</label><input id="location" name="location" placeholder="City, country, or virtual" /></div>
        <div><label htmlFor="audience">Audience size</label><select id="audience" name="audience">{SIZES.map((s) => <option key={s}>{s}</option>)}</select></div>
      </div>
      <div className="frow">
        <div><label htmlFor="industry">Industry</label><select id="industry" name="industry">{INDUSTRIES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label htmlFor="format">Format</label><select id="format" name="format">{FORMATS.map((s) => <option key={s}>{s}</option>)}</select></div>
      </div>
      <div className="frow one">
        <div>
          <label htmlFor="message">Anything else</label>
          <textarea id="message" name="message" placeholder="What is your audience facing right now? Who else is on the program?" />
        </div>
      </div>
      <button type="submit" className="btn btn-ink">Send inquiry →</button>
      <div className="fine" role="status">
        {sent
          ? 'Your email client should have opened with the details filled in. If it did not, write to brandy@executivespeakers.com directly.'
          : `Goes to ${SITE.bureau.agent} at ${SITE.bureau.org}, with Sam copied. No fees are published; every keynote is scoped to the room.`}
      </div>
    </form>
  );
}
