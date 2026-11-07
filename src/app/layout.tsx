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
  title: `${PORTFOLIO_DATA.personal.name} — CS Student & Systems/Full-Stack Developer`,
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
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-emerald-950 selection:text-emerald-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          {children}
        </div>
      </body>
    </html>
  );
}
