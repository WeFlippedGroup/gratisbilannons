import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GratisBilAnnons.se | Köp och sälj bilar gratis',
  description: 'Sveriges mest användarvänliga plattform för bilannonser.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}
