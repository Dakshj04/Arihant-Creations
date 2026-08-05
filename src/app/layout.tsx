import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MotionWrapper from "@/components/motion/MotionWrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { generateLocalBusinessSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} — Architectural Aluminium Windows & Doors`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Architectural-grade aluminium windows & doors manufacturer in India. Custom luxury fenestration systems engineered for high wind load, weather sealing, and acoustic performance.",
  keywords: [
    "aluminium windows",
    "architectural aluminium doors",
    "sliding doors India",
    "thermal break casement windows",
    "office acoustic glass partitions",
    "frameless glass railings",
    "ACP facade cladding",
    "Reynaers Schüco alternative India",
  ],
  authors: [{ name: BUSINESS.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Architectural Aluminium Systems`,
    description:
      "Custom architectural aluminium fenestration systems crafted for luxury residences and modern developments.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — Architectural Aluminium Systems`,
    description:
      "Custom architectural aluminium fenestration systems crafted for luxury residences and modern developments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}
    >
      <head>
        {/* LocalBusiness JSON-LD Schema (Server-Rendered) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* GA4 Analytics Integration — Configurable via NEXT_PUBLIC_GA_MEASUREMENT_ID */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F9FB] text-[#111827]">
        <MotionWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomBar />
        </MotionWrapper>
      </body>
    </html>
  );
}
