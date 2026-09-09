import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { SITE, personSchema } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Sam Rad | Change Has a Pattern | Keynote Speaker & Futurist',
    template: '%s | Sam Rad',
  },
  description:
    "Anthropologist, four-time tech founder, and #1 bestselling author. Sam Rad shows leaders the pattern behind every big change, so they're ready for what's next.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* Vercel Web Analytics. No-ops in dev and outside Vercel. */}
        <Analytics />

        {/* Google Analytics 4. Renders only when NEXT_PUBLIC_GA_ID is set. */}
        {SITE.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
