import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/blocks/navbar";
import Footer from "@/components/blocks/footer";
import CustomCursor from "@/components/blocks/custom-cursor";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Trip Scanner — Kerala's Gateway to the World",
  description:
    "Kerala-based travel agency specializing in domestic and international tours. Explore Kashmir, Bali, Maldives, Thailand & more from Kerala.",
  keywords: "travel agency kerala, kerala tour packages, international tours from kerala, bali tour, kashmir tour",
  openGraph: {
    title: "Trip Scanner — Kerala's Gateway to the World",
    description: "From the backwaters of Kerala to the beaches of Bali",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-dm antialiased bg-white text-[#171717]">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
