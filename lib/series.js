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
  rad: { key: 'rad', label: 'R-A-D', name: 'R-A-D | Research and Development with Sam Rad', shown: true },
};

export const seriesOf = (d) => SERIES[d.series] || SERIES.dispatch;

// "Nº 0009". The label is rendered separately so the list and the page can place it.
export const numberLabel = (d) => (d.number ? `Nº ${d.number}` : '');

// American dates. The template used en-GB until 22 Sep 2026.
export const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
