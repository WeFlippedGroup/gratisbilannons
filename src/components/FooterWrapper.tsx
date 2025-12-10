"use client"

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
    const pathname = usePathname()

    // Only show footer on homepage
    if (pathname !== '/') {
        return null
    }

    return <Footer />
}
