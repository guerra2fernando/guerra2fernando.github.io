import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/data";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guerra2fernando.github.io"),
  title: {
    default: `${site.name} | Growth Operator & AI Product Builder`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Fernando Guerra",
    "growth operator",
    "growth marketing",
    "CRM",
    "retention",
    "lifecycle marketing",
    "AI product builder",
    "AI products",
    "FastAPI",
    "Next.js",
    "multi-agent systems",
    "RAG",
    "vector search",
    "iGaming growth",
    "portfolio",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Growth Operator & AI Product Builder`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name}, growth operator and AI product builder`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Growth Operator & AI Product Builder`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
