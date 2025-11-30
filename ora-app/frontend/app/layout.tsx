import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LandingFooter } from "@/components/ui/landing-footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ORA - Tèks an Vwa Kreyòl",
  description: "Konvèti tèks Kreyòl an vwa natirèl ak miltip vwa",
  generator: "predika.app",
  icons: {
    icon: [
      {
        url: "/placeholder.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/predika-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ht" suppressHydrationWarning>
      <body
        className={`font-sans antialiased`}
        suppressHydrationWarning
        style={{
          // global app color variables (used by landing hero and other components)
          "--app-bg": "#030303",
          "--app-accent-start": "#10b981",
          "--app-accent-end": "#3b82f6",
        } as React.CSSProperties}
      >
        {children}
       
        <Analytics />
      </body>
    </html>
  )
}
