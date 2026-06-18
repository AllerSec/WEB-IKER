import type { Metadata } from "next";
import { Inter, Manrope, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CookieBanner } from "@/components/legal/cookie-banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const host = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-host",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoFlow — Automatización Inteligente para tu Negocio",
  description:
    "Plataforma de automatización con IA. Optimiza procesos, reduce costos y libera a tu equipo de tareas repetitivas.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "AutoFlow — Automatización Inteligente",
    description:
      "Optimiza procesos, reduce costos y libera a tu equipo de tareas repetitivas con IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${manrope.variable} ${host.variable} ${playfair.variable}`}
    >
      <body className="antialiased">
        <SmoothScroll />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
