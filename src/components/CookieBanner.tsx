"use client"

import { useState, useEffect } from 'react'

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#171a20' }}>
                    Vi använder cookies för att ge dig bästa möjliga upplevelse och analysera trafik.
                    Enligt EU-lag måste vi be om ditt tillstånd. Är det okej?
                    <a href="/cookiepolicy" style={{ textDecoration: 'underline', marginLeft: '5px' }}>Läs mer</a>.
                </p>
                <div className="cookie-actions">
                    <button onClick={handleAccept} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                        Neka
                    </button>
                    <button onClick={handleAccept} className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                        Godkänn
                    </button>
                </div>
            </div>

            <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
          z-index: 9999;
          animation: slideUp 0.5s ease-out;
        }
        .cookie-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .cookie-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .cookie-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .cookie-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
        @keyframes slideUp {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
        </div>
    )
}
