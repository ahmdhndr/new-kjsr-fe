import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site-config";
import QueryProviders from "@/providers/query-provider";

import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Home ❤️ ${siteConfig.title}`,
    template: `%s ❤️ ${siteConfig.title}`,
  },
  keywords: [
    "Yayasan Jantung Indonesia",
    "Klub Jantung Sehat",
    "Klub Jantung Sehat Remaja",
    "Klub Jantung Remaja",
    "YJI",
    "KJS",
    "KJSR",
    "KJR",
    "SEHAT",
    "yayasan jantung indonesia",
    "klub jantung sehat",
    "klub jantung sehat remaja",
    "klub rantung remaja",
    "sehat",
    "jantung sehat",
    "yji",
    "kjs",
    "kjsr",
    "kjr",
    "sehat",
    "remaja",
  ],
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} ${geistMono.variable} bg-white-kjsr selection:bg-primary selection:text-white-kjsr h-full w-full font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <QueryProviders>{children}</QueryProviders>
        </div>
        <Toaster
          richColors
          closeButton
          theme="light"
          toastOptions={{
            classNames: {
              closeButton: "!-right-5 !w-7 !h-7 justify-self-end",
            },
          }}
        />
      </body>
    </html>
  );
}
