import dispatches from '@/data/dispatches.json';
import { renderFieldNotes, OG_SIZE } from '@/lib/og-card';
import { isDue } from '@/lib/writing';

// Generated link-preview card for posts without a photo (R-A-D). Served at
// /writing/<slug>/opengraph-image and referenced explicitly from generateMetadata in
// page.jsx.
//
// Found on 22 Sep 2026: in Next 15.5 the openGraph.images returned by
// generateMetadata wins over this file-convention image, not the other way round. So
// page.jsx must point og:image here for card posts; the file alone does nothing.
// Legacy posts are excluded from params and 404 here, which is fine: nothing links
// to them, and their og:image stays their photo.
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Writing by Sam Rad, The Change Futurist';
export const dynamicParams = false;

export function generateStaticParams() {
  return dispatches.filter((d) => !d.image && isDue(d)).map((d) => ({ slug: d.slug }));
}

export default async function Image({ params }) {
  return renderFieldNotes(dispatches.find((x) => x.slug === params.slug));
}
