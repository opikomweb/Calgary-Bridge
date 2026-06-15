import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Calgary Konnect - Everything Calgary. One Place.",
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
  icons: {
    icon: "/calgary-connect-logo.png",
    apple: "/calgary-connect-logo.png",
  },
  openGraph: {
    title: "Calgary Konnect - Everything Calgary. One Place.",
    description:
      "Find services, support, opportunities, programs, local businesses, community resources, and trusted guidance.",
    type: "website",
    images: ["/calgary-connect-logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#07111F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
