import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/Cookie-Consent";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SEO + GEO optimized metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.karmamakers.com"),

  title: {
    default: "Karma Makers | IA, Consultoría y Producto Digital",
    template: "%s | Karma Makers",
  },

  description:
    "Agencia especializada en inteligencia artificial, consultoría tecnológica y desarrollo de producto digital. Transformamos ideas en sistemas escalables con IA.",

  applicationName: "Karma Makers",

  authors: [{ name: "Karma Makers" }],

  keywords: [
    "IA agencia",
    "consultoría inteligencia artificial",
    "producto digital",
    "desarrollo software IA",
    "transformación digital",
    "automatización empresarial",
    "AI consulting Spain",
  ],

  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en",
    },
  },

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.karmamakers.com",
    siteName: "Karma Makers",
    title: "Karma Makers | IA, Consultoría y Producto Digital",
    description:
      "Agencia de inteligencia artificial y producto digital. Construimos sistemas inteligentes para escalar negocios.",
    images: [
      {
        url: "/og/karma-makers-og.jpg",
        width: 1200,
        height: 630,
        alt: "Karma Makers - IA y Producto Digital",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Karma Makers | IA y Producto Digital",
    description:
      "Consultoría en IA y desarrollo de producto digital para empresas modernas.",
    images: ["/og/karma-makers-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Navbar />
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}