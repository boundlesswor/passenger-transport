import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"
// удаляю импорт ThemeToggle

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PULSE LINE | Пассажирские перевозки и доставка посылок по Европе",
  description:
    "Пассажирские перевозки из СНГ в Европу. Автобусы в Германию, Польшу, Литву. Доставка посылок. Бронирование онлайн. Безопасно и комфортно.",
  generator: "v0.app",
  keywords:
    "пассажирские перевозки Европа, автобус в Германию, автобус в Польшу, доставка посылок в Европу, международные перевозки, трансфер СНГ Европа, микроавтобус, поездки в Европу",
  robots: "index, follow",
  openGraph: {
    title: "PULSE LINE | Пассажирские перевозки по Европе",
    description: "Пассажирские перевозки и доставка посылок из СНГ в Европу. Забронируйте поездку онлайн.",
    type: "website",
    url: "https://pulselines.com/",
    siteName: "PULSE LINE",
    locale: "ru_RU",
    images: [
      {
        url: "https://pulselines.com/favicon.png",
        width: 512,
        height: 512,
        alt: "PULSE LINE - Пассажирские перевозки по Европе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSE LINE | Пассажирские перевозки по Европе",
    description: "Пассажирские перевозки и доставка посылок из СНГ в Европу",
    images: ["https://pulselines.com/favicon.png"],
  },
  alternates: {
    canonical: "https://pulselines.com/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
      </head>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
