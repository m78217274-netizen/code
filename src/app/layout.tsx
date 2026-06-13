import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { companyName } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  title: companyName,
  description:
    "A luxury, conversion-focused real estate website for buyers, sellers, and investors.",
  keywords: [
    "real estate",
    "property dealer",
    "luxury homes",
    "property listings",
    "investment properties"
  ],
  openGraph: {
    title: companyName,
    description:
      "Discover exceptional real estate opportunities with a trusted property dealer.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} bg-paper text-charcoal antialiased dark:bg-navy dark:text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
