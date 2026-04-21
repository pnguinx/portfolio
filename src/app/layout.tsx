import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Penguin - Digital Code Explorer",
  description:
    "Interactive portfolio of Penguin, a digital entity exploring the codeverse. Built by Siraj Ahmed.",
  keywords: [
    "Penguin",
    "Digital Entity",
    "Portfolio",
    "Full-Stack",
    "Web Development",
    "Next.js",
  ],
  authors: [
    {
      name: "Penguin",
      url: "https://sirajahmedx.github.io",
    },
  ],
  creator: "Penguin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sirajahmedx.github.io",
    title: "Penguin - Digital Code Explorer",
    description:
      "Interactive portfolio of Penguin, a digital entity exploring the codeverse.",
    siteName: "Penguin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Penguin - Digital Code Explorer",
    description:
      "Interactive portfolio of Penguin, a digital entity exploring the codeverse.",
    creator: "@sirajahmedx",
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={cn(
          "bg-gradient-to-br from-primary/5 via-background to-accent/5 font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true} // Enable system theme detection
        >
          <Header />
          <main className="flex flex-col overflow-auto">
            {children}

            <SpeedInsights />
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
