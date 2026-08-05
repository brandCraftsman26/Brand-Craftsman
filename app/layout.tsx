import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Chatbot from "@/components/Chatbot";
import { HeatmapTracker } from "@/components/HeatmapTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brand Craftsman | Premier Web Design & Digital Marketing Company in Coimbatore",
  description: "Looking for a top web design and digital marketing company in Coimbatore? Brand Craftsman delivers high-end branding, custom development, and SEO-driven strategies to scale your business.",
  keywords: ["Web Design Coimbatore", "Digital Marketing Coimbatore", "SEO Services", "Web Development", "Brand Craftsman"],
  openGraph: {
    title: "Brand Craftsman | Web Design & Digital Marketing",
    description: "High-end branding, custom development, and SEO-driven strategies to scale your business in Coimbatore and beyond.",
    url: "https://brandcraftsman.com",
    siteName: "Brand Craftsman",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Craftsman | Web Design & Digital Marketing",
    description: "High-end branding, custom development, and SEO-driven strategies to scale your business.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Brand Craftsman",
    image: "https://brandcraftsman.com/logo.png",
    description: "Premier Web Design and Digital Marketing Company based in Coimbatore.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    url: "https://brandcraftsman.com",
    telephone: "+91-9876543210",
  };

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <NavBar />
            <HeatmapTracker />
            <main className="relative min-h-screen w-full overflow-x-hidden">
              {children}
              <Chatbot />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
