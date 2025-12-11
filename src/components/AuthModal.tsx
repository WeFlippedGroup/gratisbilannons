"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function AuthModal() {
    const { isModalOpen, closeModal } = useAuth()
    const [view, setView] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    if (!isModalOpen) return null


    const handleOAuth = async (provider: 'google') => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) setError(error.message)
        // Redirection happens automatically
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (view === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password
                })
                if (error) throw error
                // On success, maybe show "check email" or auto login if disabled confirm
                alert('Konto skapat! Kontrollera din e-post.')
                setView('login')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })
                if (error) throw error
                closeModal()
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message || 'Ett fel uppstod')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-overlay" onClick={closeModal}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="auth-close" onClick={closeModal}>×</button>

                <h2 className="auth-title">{view === 'login' ? 'Logga in' : 'Skapa konto'}</h2>

                {/* Google Button */}
                <button
                    onClick={() => handleOAuth('google')}
                    style={{
                        width: '100%',
                        padding: '12px',
                        marginBottom: '24px',
                        background: '#fff',
                        border: '1px solid #e8e8e8',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        fontWeight: 500,
                        color: '#393c41',
                        transition: 'all 0.2s'
                    }}
                    disabled={loading}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {view === 'login' ? 'Logga in med Google' : 'Registrera med Google'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', color: '#5c5e62', fontSize: '13px' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }}></div>
                    <span style={{ padding: '0 12px' }}>ELLER</span>
                    <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }}></div>
                </div>

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label className="label">E-post</label>
                        <input
                            type="email"
                            className="input-reset"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Lösenord</label>
                        <input
                            type="password"
                            className="input-reset"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
                        {loading ? 'Bearbetar...' : (view === 'login' ? 'Logga in' : 'Registrera')}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
                    {view === 'login' ? (
                        <p>Saknar du konto? <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 500 }} onClick={() => setView('signup')}>Skapa konto</span></p>
                    ) : (
                        <p>Har du redan konto? <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 500 }} onClick={() => setView('login')}>Logga in</span></p>
                    )}
                </div>

            </div>

            <style jsx>{`
        .auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .auth-modal {
          background: white;
          width: 90%;
          max-width: 400px;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
          animation: scaleUp 0.3s ease;
        }

        .auth-close {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #5c5e62;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 32px;
          text-align: center;
        }
        
        .label {
            display: block; 
            margin-bottom: 8px; 
            font-size: 12px; 
            font-weight: 600; 
            color: #5c5e62; 
            text-transform: uppercase; 
            letter-spacing: 0.5px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    )
}
