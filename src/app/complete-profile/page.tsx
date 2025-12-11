"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

export default function CompleteProfilePage() {
    const { user, session } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [nickname, setNickname] = useState('')
    const [phone, setPhone] = useState('')
    const [county, setCounty] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        if (!session && !loading) {
            // Wait a bit or redirect to home if definitely no user
        }
    }, [session, loading])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!user) return

        const { error } = await supabase
            .from('profiles')
            .update({
                nickname,
                phone,
                county,
                city,
                // You might want to set a "profile_complete" flag here or inferred from data
            })
            .eq('id', user.id)

        if (error) {
            alert('Fel vid sparning: ' + error.message)
            setLoading(false)
        } else {
            router.push('/create-ad') // Redirect to desired destination
        }
    }

    return (
        <main style={{ maxWidth: '400px', margin: '100px auto', padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>Slutför din profil</h1>
            <p style={{ textAlign: 'center', marginBottom: '32px', color: '#5c5e62' }}>Låt oss göra det seriöst. Fyll i dina uppgifter för att kunna annonsera.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label className="label">Användarnamn (Visas i annonsen)</label>
                    <input
                        className="input-reset"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        placeholder="T.ex. VolvoJanne"
                        required
                    />
                </div>

                <div>
                    <label className="label">Telefonnummer</label>
                    <input
                        className="input-reset"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="070-123 45 67"
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label className="label">Län</label>
                        <input
                            className="input-reset"
                            value={county}
                            onChange={e => setCounty(e.target.value)}
                            placeholder="Stockholm"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Ort</label>
                        <input
                            className="input-reset"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Solna"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '12px' }}>
                    {loading ? 'Sparar...' : 'Spara och fortsätt'}
                </button>
            </form>

            <style jsx>{`
                .label {
                    display: block; 
                    margin-bottom: 8px; 
                    font-size: 13px; 
                    font-weight: 600; 
                    color: #5c5e62; 
                }
                .input-reset {
                    background-color: #f4f4f4;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    height: 48px;
                    padding: 0 16px;
                    width: 100%;
                    font-size: 16px;
                    color: #171a20;
                    margin-bottom: 0;
                }
                .input-reset:focus {
                    background-color: #fff;
                    border-color: #ccc;
                    outline: none;
                }
            `}</style>
        </main>
    )
}
