import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpportunityAI — Smart Student Career & Opportunity Matcher",
  description:
    "AI-powered platform that intelligently matches students to internships, hackathons, scholarships, courses, and open-source programs using a smart skill and interest scoring algorithm.",
  keywords: [
    "student opportunities",
    "internships India",
    "hackathons 2026",
    "scholarships",
    "GSoC",
    "SIH 2026",
    "career matcher",
    "AI matching",
  ],
  authors: [{ name: "OpportunityAI" }],
  openGraph: {
    title: "OpportunityAI — Smart Student Career Matcher",
    description: "Find your perfect internship, hackathon, or scholarship with AI-powered skill matching.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
