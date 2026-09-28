import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { themeScript, loaderScript } from "@/lib/head-scripts";
import { Loader } from "@/components/Loader";
import { CursorLabel } from "@/components/CursorLabel";
import { EnquiryFallback } from "@/components/Enquiry";
import { site } from "@/data/site";
import "./globals.css";

const description = site.positioning;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.shortTitle}`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.shortTitle}`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.shortTitle}`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + loaderScript }} />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
      </head>
      <body>
        <Loader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <EnquiryFallback />
        <CursorLabel />
      </body>
    </html>
  );
}
