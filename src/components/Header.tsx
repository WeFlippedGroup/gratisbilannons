"use client"

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Header() {
    const { user, openModal, signOut } = useAuth()
    const router = useRouter()

    const handleSellClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (user) {
            router.push('/create-ad')
        } else {
            openModal()
        }
    }

    return (
        <header style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '24px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#171a20' // Black text for clean look (ensure background supports it or use mix-blend-mode)
        }}>
            {/* Logo */}
            {/* Logo */}
            <Link href="/" style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '1px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/logo.png" alt="Logo" style={{ height: '24px', width: 'auto' }} />
                GRATISBILANNONS
            </Link>

            {/* Nav */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <Link href="/ads" style={{ fontSize: '14px', fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>
                    Bilar
                </Link>
                <button onClick={handleSellClick} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 500, color: 'inherit', cursor: 'pointer' }}>
                    Sälj
                </button>
                {user ? (
                    <>
                        <Link href="/my-ads" style={{ fontSize: '14px', fontWeight: 500, color: 'inherit', textDecoration: 'none' }}>
                            Mina Annonser
                        </Link>
                        <button onClick={() => signOut()} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 500, color: 'inherit', cursor: 'pointer', opacity: 0.6 }}>
                            Logga ut
                        </button>
                    </>
                ) : (
                    <button onClick={openModal} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 500, color: 'inherit', cursor: 'pointer' }}>
                        Konto
                    </button>
                )}
            </div>
        </header>
    )
}
