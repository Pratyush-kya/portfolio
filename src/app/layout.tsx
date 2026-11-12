import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/content";
import { getPersonJsonLd } from "@/data/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pratyushrath.vercel.app"),
  title: `${PORTFOLIO_DATA.personal.name} — CS Student & Developer`,
  description: PORTFOLIO_DATA.personal.headline,
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: PORTFOLIO_DATA.personal.github }],
  keywords: [
    "Pratyush Kiran Rath",
    "Computer Science",
    "Centurion University",
    "LLM Inference Telemetry",
    "KV-Cache Profiler",
    "PyTorch",
    "Next.js",
    "TypeScript",
    "n8n Workflow Automation",
    "Systems Programming",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratyushrath.vercel.app",
    title: `${PORTFOLIO_DATA.personal.name} — CS Student & Developer`,
    description: PORTFOLIO_DATA.personal.headline,
    siteName: `${PORTFOLIO_DATA.personal.name} Engineering Portfolio`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_DATA.personal.name} Systems & Full-Stack Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — CS Student & Developer`,
    description: PORTFOLIO_DATA.personal.headline,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getPersonJsonLd();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-emerald-950 selection:text-emerald-200 relative">
        {/* Ambient atmospheric background glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top Emerald Ambient Glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-emerald-500/15 rounded-full blur-[160px]" />
          {/* Cyan secondary glow on right */}
          <div className="absolute top-[28rem] -right-20 w-[800px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px]" />
          {/* Indigo subtle accent on bottom left */}
          <div className="absolute top-[60rem] -left-20 w-[900px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px]" />
          {/* Subtle geometric dot grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        {/* Full-bleed responsive container taking the whole screen */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-6 md:py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
