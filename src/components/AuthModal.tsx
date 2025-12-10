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
