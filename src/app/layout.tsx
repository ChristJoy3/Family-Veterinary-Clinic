import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Motion } from "@/components/motion/Motion";
import { PawTrail } from "@/components/motion/PawTrail";
import { clinic, links } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const description =
  "Family-owned, full-service animal hospital in Gambrills serving Crofton, Bowie, Millersville, Odenton and Waugh Chapel, MD since 1982. Wellness, sick care, surgery, dental, and a Cat Friendly Veterinarian.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.familyveterinaryclinic.com"),
  title: {
    default: "Family Veterinary Clinic | Veterinarian in Crofton & Gambrills, MD",
    template: "%s | Family Veterinary Clinic",
  },
  description,
  keywords: [
    "veterinarian Crofton MD",
    "vet Gambrills MD",
    "animal hospital Crofton",
    "cat friendly vet Maryland",
    "Family Veterinary Clinic",
    "vet Bowie MD",
    "vet Odenton MD",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title: "Family Veterinary Clinic | Crofton & Gambrills, MD",
    description,
    locale: "en_US",
    images: [{ url: "/images/exam-room.jpg", width: 515, height: 460, alt: "A veterinarian examining a Boston terrier" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: clinic.name,
  url: "https://www.familyveterinaryclinic.com",
  logo: "https://www.familyveterinaryclinic.com/images/logo.png",
  image: "https://www.familyveterinaryclinic.com/images/exam-room.jpg",
  telephone: "+1-410-721-4545",
  email: clinic.email,
  foundingDate: String(clinic.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.street,
    addressLocality: clinic.city,
    addressRegion: clinic.region,
    postalCode: clinic.postalCode,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
  areaServed: clinic.areas.map((name) => ({ "@type": "City", name: `${name}, MD` })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
  ],
  sameAs: [links.facebook, links.instagram],
};

/** Runs before paint: opt into motion styles and skip the loader if it already played this session. */
const bootScript = `(function(){var d=document.documentElement;try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion')}catch(e){}try{if(sessionStorage.getItem('fvc-loader-seen'))d.classList.add('loader-seen')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-bold focus:text-ivory"
        >
          Skip to main content
        </a>
        <Motion />
        <PawTrail />
        <div id="top">
          <TopBar />
        </div>
        <Header />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
