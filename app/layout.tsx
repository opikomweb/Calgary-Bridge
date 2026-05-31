import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calgary Connect - Everything Calgary. One Place.",
  description:
    "Find services, support, opportunities, programs, local businesses, community resources, and trusted guidance—without searching dozens of websites.",
  keywords: [
    "Calgary",
    "newcomers",
    "resources",
    "city services",
    "immigration",
    "housing",
    "jobs",
    "community",
    "Calgary Bridge AI",
  ],
  openGraph: {
    title: "Calgary Connect - Everything Calgary. One Place.",
    description:
      "Find services, support, opportunities, programs, local businesses, community resources, and trusted guidance.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0B1020]">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
