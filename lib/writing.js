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

export const live = dispatches.filter((d) => !d.archived);
export const featured = live[0] || null;
const rest = live.slice(1);

export const pageCount = Math.max(1, Math.ceil(rest.length / PER_PAGE));
export const pageItems = (n) => rest.slice((n - 1) * PER_PAGE, n * PER_PAGE);
export const pageHref = (n) => (n <= 1 ? '/writing' : `/writing/page/${n}`);
