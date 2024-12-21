import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: "Sapplinns - A Revolution in Smart Farming",
  description:
    "Sapplinns is a revolutionary smart farming platform that leverages cutting-edge technology for soil quality monitoring, crop prediction, irrigation management, and more.",
  applicationName: "Sapplinns - A Revolution in Smart Farming",
  keywords: [
    "smart farming",
    "soil monitoring",
    "crop prediction",
    "irrigation management",
    "precision agriculture",
    "farming technology",
    "sustainable farming",
  ],
  authors: [
    { name: "Gunjan Rajput", url: "https://github.com/gunjanrajput" },
    { name: "Anuj Joshi", url: "https://anujjoshi.netlify.app" },
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: appUrl,
    title: "Sapplinns - A Revolution in Smart Farming",
    description:
      "Sapplinns is a revolutionary smart farming platform that leverages cutting-edge technology for soil quality monitoring, crop prediction, irrigation management, and more.",
    images: [
      {
        url: `${appUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Sapplinns - A Revolution in Smart Farming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sapplinns",
    title: "Sapplinns - A Revolution in Smart Farming",
    description:
      "Sapplinns is a revolutionary smart farming platform that leverages cutting-edge technology for soil quality monitoring, crop prediction, irrigation management, and more.",
    images: [`${appUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: appUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-clip antialiased relative`}
        suppressHydrationWarning>
        <Header />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
