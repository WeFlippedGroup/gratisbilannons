"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

export default function MyAdsPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [ads, setAds] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchMyAds = async () => {
            const { data, error } = await supabase
                .from('ads')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (data) setAds(data)
            setLoading(false)
        }

        fetchMyAds()
    }, [user])

    const handleDelete = async (adId: number) => {
        if (!confirm('Är du säker på att du vill ta bort annonsen? Detta går inte att ångra.')) return

        try {
            // Delete from Supabase
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('id', adId)

            if (error) throw error

            // Remove from local state
            setAds(prev => prev.filter(a => a.id !== adId))
            alert('Annons borttagen.')
        } catch (error) {
            console.error('Error deleting ad:', error)
            alert('Kunde inte ta bort annonsen.')
        }
    }

    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <h2>Du måste vara inloggad.</h2>
                <Link href="/ads" className="button-primary">Gå till annonser</Link>
            </div>
        )
    }

    return (
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '120px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '40px' }}>Mina Annonser</h1>

            {ads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px', background: '#f9f9f9', borderRadius: '8px' }}>
                    <p style={{ marginBottom: '24px', color: '#5c5e62' }}>Du har inga aktiva annonser.</p>
                    <Link href="/create-ad" className="button" style={{
                        background: '#171a20', color: 'white', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none'
                    }}>
                        Skapa annons
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {ads.map((ad) => (
                        <div key={ad.id} style={{
                            background: 'white',
                            border: '1px solid #e8e8e8',
                            borderRadius: '8px',
                            padding: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                                    {ad.brand} {ad.model} <span style={{ opacity: 0.5 }}>{ad.year}</span>
                                </h3>
                                <p style={{ fontSize: '14px', color: '#5c5e62' }}>
                                    {ad.price.toLocaleString()} kr • {ad.miles.toLocaleString()} mil
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Link href={`/ads/${ad.id}`} style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: '1px solid #e8e8e8',
                                    color: '#171a20',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    Visa
                                </Link>
                                <button
                                    onClick={() => alert('Redigering är inte klar än! (WIP)')}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        border: '1px solid #e8e8e8',
                                        background: 'white',
                                        color: '#171a20',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Redigera
                                </button>
                                <button
                                    onClick={() => handleDelete(ad.id)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        border: '1px solid #ef4444',
                                        background: 'transparent',
                                        color: '#ef4444',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Ta bort
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}
