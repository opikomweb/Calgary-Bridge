import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { TranslationProvider } from "@/lib/translation-context";

// Poppins — clean, geometric sans-serif used across the whole product
// for maximum legibility and a consistent, professional look.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    "Askonnect",
    "tourism",
    "things to do in Calgary",
  ],
  icons: {
    // Keep .png for icons — browsers need PNG/ICO for favicons
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
      <head>
        {/* Noto Sans multi-script fonts. Poppins (the brand font) only ships Latin
            glyphs, so every non-Latin translation target needs an explicit fallback
            family or it silently renders as empty "tofu" boxes:
              - Arabic       -> Noto Sans Arabic
              - Punjabi      -> Noto Sans Gurmukhi
              - Amharic      -> Noto Sans Ethiopic
              - Cantonese/zh -> Noto Sans TC (Traditional)
              - Mandarin     -> Noto Sans SC (Simplified)
              - Russian/Ukrainian -> Noto Sans (covers Cyrillic; Poppins does not) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Sans+Ethiopic:wght@400;600;700&family=Noto+Sans+Gurmukhi:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+TC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <TranslationProvider>
              {children}
            </TranslationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
