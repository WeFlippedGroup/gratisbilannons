"use client"

import CreateAdForm from '@/components/CreateAdForm'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

export default function CreateAdPage() {
    const { user, isLoading: loadingAuth } = useAuth()
    const [isCheckingProfile, setIsCheckingProfile] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkProfile = async () => {
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('nickname')
                    .eq('id', user.id)
                    .single()

                if (!profile?.nickname) {
                    router.push('/complete-profile')
                }
                setIsCheckingProfile(false)
            } else if (!loadingAuth) {
                // Not logged in
                setIsCheckingProfile(false)
            }
        }

        if (!loadingAuth) {
            checkProfile()
        }
    }, [user, loadingAuth, router])

    if (loadingAuth || isCheckingProfile) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Laddar...</div>
    }

    if (!user) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h2>Du måste logga in för att skapa en annons</h2>
                <button onClick={() => window.location.href = '/'} style={{ marginTop: '16px', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--accent-blue)' }}>
                    Tillbaka till startsidan
                </button>
            </div>
        )
    }

    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="title-large" style={{ marginBottom: '16px' }}>Ny annons</h1>
                <p className="title-medium" style={{ color: 'var(--gray-500)', fontSize: '24px' }}>Nå ut till hela Sverige.</p>
            </div>

            <CreateAdForm />
        </main>
    )
}
