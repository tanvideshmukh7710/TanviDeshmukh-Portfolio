import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Tanvi Deshmukh's Portfolio",
  description: "3D Spatial Portfolio of Tanvi Deshmukh",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-hidden m-0 p-0">{children}</body>
    </html>
  )
}
