'use client';

import { useState } from 'react';

export default function ShareLinks({ url, title }) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="share">
      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Share ${title} on LinkedIn`}>
        Share on LinkedIn
      </a>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
    </div>
  );
}
