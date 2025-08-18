import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import "./globals.css"

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
  title: "CONSTANTA TUR | Революционные перевозки по Европе",
  description:
    "Футуристические пассажирские перевозки с интерактивной 3D картой. Голографический опыт бронирования поездок по Европе.",
  generator: "v0.app",
  keywords: "пассажирские перевозки, микроавтобус, Европа, трансфер, поездки, 3D карта, голографический",
  openGraph: {
    title: "CONSTANTA TUR | Революционные перевозки",
    description: "Футуристические поездки с интерактивной 3D картой Европы",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${dmSans.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <style>{`
html {
  font-family: ${dmSans.style.fontFamily};
  --font-sans: ${dmSans.variable};
  --font-space-grotesk: ${spaceGrotesk.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
