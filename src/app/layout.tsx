import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import AuthModal from '@/components/AuthModal'
import FooterWrapper from '@/components/FooterWrapper'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GratisBilAnnons.se | Sälj din bil gratis',
    template: '%s | GratisBilAnnons.se',
  },
  description: 'Sveriges snyggaste och enda helt gratis bilannonsplattform. Köp och sälj begagnade bilar utan dolda avgifter.',
  keywords: ['sälja bil gratis', 'begagnade bilar', 'gratis bilannons', 'köpa bil', 'bilmarknad', 'sälja bil'],
  openGraph: {
    title: 'GratisBilAnnons.se - Marknadsplatsen för bilar',
    description: 'Lägg in din bilannons helt gratis. Vi tar inga avgifter.',
    url: 'https://gratisbilannons.se',
    siteName: 'GratisBilAnnons.se',
    locale: 'sv_SE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
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
