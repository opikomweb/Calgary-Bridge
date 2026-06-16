import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

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
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
