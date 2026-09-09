import industries from '@/data/industries.json';
import dispatches from '@/data/dispatches.json';
import resources from '@/data/resources.json';
import { SITE } from '@/lib/site';

export default function sitemap() {
  const now = new Date();
  const statics = [
    ['', 1.0],
    ['/speaking', 0.9],
    ['/industries', 0.8],
    ['/writing', 0.8],
    ['/samrad-ai', 0.7],
    ['/resources', 0.6],
    ['/press', 0.6],
    ['/podcasts', 0.6],
    ['/meet-sam', 0.8],
    ['/body-of-work', 0.7],
    ['/book', 0.9],
  ].map(([p, priority]) => ({ url: `${SITE.url}${p}`, lastModified: now, priority }));

  return [
    ...statics,
    ...industries.map((i) => ({ url: `${SITE.url}/industries/${i.slug}`, lastModified: now, priority: 0.8 })),
    ...resources.map((r) => ({ url: `${SITE.url}/resources/${r.slug}`, priority: 0.5 })),
    ...dispatches.map((d) => ({ url: `${SITE.url}/writing/${d.slug}`, lastModified: new Date(d.date), priority: 0.6 })),
  ];
}
