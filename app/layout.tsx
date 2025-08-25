// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Rubik, Manrope } from "next/font/google";
import "./globals.css";

const dmSans = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pulselines.com"),
  title: {
    default: "PULSE LINE — международные перевозки и доставка посылок",
    template: "%s | PULSE LINE",
  },
  description:
    "PULSE LINE — международные пассажирские перевозки и доставка посылок: Европа ⇄ Украина, Россия, Беларусь. Поездки автобусами/микроавтобусами, отправка документов, личных вещей и хрупких грузов. Комфортно, надёжно, по доступной цене.",
  keywords: [
    "пассажирские перевозки Европа",
    "автобус Украина Европа",
    "перевозки Украина Россия",
    "перевозки Беларусь Европа",
    "автобус Киев Варшава",
    "доставка посылок Европа",
    "отправка документов и личных вещей",
    "перевозки хрупких грузов",
    "Pulse Lines",
    "Пульс Лайн отзывы",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://pulselines.com/",
    siteName: "PULSE LINE",
    locale: "ru_RU",
    title: "PULSE LINE — международные перевозки и доставка посылок",
    description:
      "Международные автобусные перевозки и доставка посылок по Европе, Украине, России и Беларуси. Комфортные поездки, надёжная доставка.",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "PULSE LINE — международные перевозки и доставка посылок",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSE LINE — международные перевозки и доставка посылок",
    description:
      "Поездки по Европе и доставка посылок: Европа ⇄ Украина, Россия, Беларусь.",
    images: ["/og-cover.jpg"],
  },
  alternates: {
    canonical: "https://pulselines.com/",
    languages: { "ru-RU": "https://pulselines.com/" },
  },
  themeColor: "#0A0F1F",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <style>{`
          html {
            font-family: ${dmSans.style.fontFamily};
            --font-sans: ${dmSans.variable};
            --font-space-grotesk: ${spaceGrotesk.variable};
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PULSE LINE",
              url: "https://pulselines.com",
              logo: "https://pulselines.com/favicon.png",
              description:
                "Международные пассажирские перевозки и доставка посылок: Европа ⇄ Украина, Россия, Беларусь.",
              areaServed: ["EU", "UA", "RU", "BY"],
              brand: "PULSE LINE",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
