// /writing is one body of work with one running number. Everything published there,
// whatever its kind, takes the next number in the sequence. The kind is a label beside
// the number, never a namespace: "Nº 0009 · R-A-D". A record with no `series` field is
// a legacy Dispatch.
//
// Series carry no episode numbers. Sam's call, 22 Sep 2026: R-A-D questions are
// evergreen, so "episode 14" would tell a reader nothing and date the piece.
// `shown` decides whether the kind is printed beside a post. R-A-D is a named series
// with a podcast and a YouTube audience, so the label builds recognition. "Dispatch"
// is a word the site retired on 22 Sep 2026; a reader cannot know what it means, so
// the legacy posts show their industry alone (Sam's call, 22 Sep 2026).
export const SERIES = {
  dispatch: { key: 'dispatch', label: 'Dispatch', name: 'Dispatch', shown: false },
  // `shown: false` since 22 Sep 2026: the label is not printed beside each post. R-A-D
  // is named once on /writing, once in each post's sidebar, and on every generated
  // preview card (lib/og-card.jsx reads `label` directly, so the cards keep it).
  // Renamed 25 Sep 2026 (Sam): R-A-D became "Change Has a Pattern with Sam Rad", the same
  // phrase as the keynote, the homepage and the field guide. Display only: the key stays
  // 'rad' in every record, and URLs, numbers and dates are untouched.
  rad: { key: 'rad', label: 'Change Has a Pattern', name: 'Change Has a Pattern with Sam Rad', shown: false },
};

export const seriesOf = (d) => SERIES[d.series] || SERIES.dispatch;

// "Nº 0009". The label is rendered separately so the list and the page can place it.
export const numberLabel = (d) => (d.number ? `Nº ${d.number}` : '');

// American dates. The template used en-GB until 22 Sep 2026.
export const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
