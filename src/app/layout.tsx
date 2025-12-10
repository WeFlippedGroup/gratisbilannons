import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import AuthModal from '@/components/AuthModal'
import FooterWrapper from '@/components/FooterWrapper'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GratisBilAnnons.se | Sälj din bil gratis',
  description: 'Sveriges snyggaste och enda helt gratis bilannonsplattform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AuthProvider>
          {children}
          <FooterWrapper />
          <AuthModal />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  )
}
