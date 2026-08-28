import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Rethink Sans loaded under the original variable names (--font-geist-sans,
// --font-geist-mono, --font-heading) so every existing fontFamily reference
// across components resolves to it unchanged — only the typeface changes.
const geistSans = Rethink_Sans({
  variable: "--font-geist-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const geistMono = Rethink_Sans({
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const archivoBlack = Rethink_Sans({
  variable: "--font-heading",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lishan Chamod — Portfolio",
  description:
    "Computer Science student building at the hardware edge. From embedded vision pipelines to web dashboards.",
  icons: {
    icon: "/favicon.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
