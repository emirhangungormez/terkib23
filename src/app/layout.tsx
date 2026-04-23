import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://terkib23.com"),
  title: "Terkib23",
  description: "Multilingual web production for Turkey and Europe.",
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
