// Pagination for /writing. The newest live post is the featured block on page 1 and is
// left out of page 1's list, so it never appears twice.
//
//   /writing            page 1: featured + the next PER_PAGE
//   /writing/page/2     page 2: the PER_PAGE after that, no featured block
//
// Order is array order in data/dispatches.json, newest first. There is no date sort,
// so a new post must be prepended, not appended.
import dispatches from '@/data/dispatches.json';

export const PER_PAGE = 10;

const today = new Date().toISOString().slice(0, 10);
// Published means dated on or before the day of the build. Future-dated posts wait for
// the daily scheduled redeploy of their day.
// isDue: the date has arrived, so the page may be built (archived posts stay reachable
// at their URL, as before). isPublished: due and not archived, so it may be listed.
export const isDue = (d) => d.date <= today;
export const isPublished = (d) => !d.archived && isDue(d);
export const live = dispatches.filter(isPublished);
export const featured = live[0] || null;
const rest = live.slice(1);

export const pageCount = Math.max(1, Math.ceil(rest.length / PER_PAGE));
export const pageItems = (n) => rest.slice((n - 1) * PER_PAGE, n * PER_PAGE);
export const pageHref = (n) => (n <= 1 ? '/writing' : `/writing/page/${n}`);
