import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const barlowCondensed = localFont({
  src: [
    {
      path: "../public/fonts/BarlowCondensed-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BarlowCondensed-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BarlowCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BarlowCondensed-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: 'Santa`s Sports Roast – Get Your Teams Toasted by a Rude, Witty Santa',
//   description: 'Let Santa go rogue on your favorite teams! Enjoy snappy, ruthless sports trash-talk in a hilarious webapp that redefines holiday cheer. Try it now.',
//   icons: {
//     icon: '/favicon.ico',
//   },
//   keywords: 'Santa sports roast, sports trash-talk, humorous sports commentary, witty sports insults, holiday sports humor',
//   openGraph: {
//     title: 'Santas Ruthless Sports Roast',
//     description: 'Ditch the milk and cookies—this Santa serves up sarcastic, snarky, and hilarious takedowns of your favorite teams, players, and fanbases. Get ready to laugh!',
//     images: [],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Santa`s Sports Roast',
//     description: 'Snarky, irreverent Santa is here to dish out ruthless sports insults. Dare to let him roast your beloved team?'
//   },
// };

export const metadata: Metadata = {
  title: "Ann Therapist – Ruthless Sports Therapy Sessions",
  description:
    "Get your favorite teams analyzed and annihilated by Ann Therapist. She’s got the sass, the smarts, and zero chill when it comes to your sports obsessions. Therapy has never been this savage.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords:
    "Ann Therapist, sports roast, witty sports therapy, humorous sports analysis, savage sports commentary",
  openGraph: {
    title: "Ann Therapist – Savage Sports Therapy",
    description:
      "She’s not here to heal—Ann Therapist serves unfiltered sports takedowns with a side of sass. Book your session and get roasted.",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ann Therapist – Sports Therapy with a Bite",
    description:
      "Tired of biased analysts? Ann tells it like it is. Sharp, witty, and downright ruthless. Your team needs therapy—Ann's style.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${barlowCondensed.variable} font-barlow-condensed`}
      lang="en"
    >
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MZG150102B"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MZG150102B');`}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={clsx("min-h-screen font-sans antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="relative flex flex-col h-screen w-screen">
            {/* <NavBar /> */}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
