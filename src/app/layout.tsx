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
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — CS Student & Developer`,
    description: PORTFOLIO_DATA.personal.headline,
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
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-emerald-500/15 rounded-full blur-[140px]" />
          {/* Cyan secondary glow on right */}
          <div className="absolute top-[28rem] -right-40 w-[550px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
          {/* Indigo subtle accent on bottom left */}
          <div className="absolute top-[60rem] -left-40 w-[600px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px]" />
          {/* Subtle geometric dot grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {children}
        </div>
      </body>
    </html>
  );
}
