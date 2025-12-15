"use client"

import { useAuth } from '@/context/AuthContext'

export default function AuthModal() {
    const { isModalOpen, closeModal } = useAuth()

    if (!isModalOpen) return null

    return (
        <div className="auth-overlay" onClick={closeModal}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="auth-close" onClick={closeModal}>×</button>

                <div className="auth-content">
                    <h2 className="auth-title">Funktionen inaktiverad</h2>
                    <p className="auth-message">
                        Inloggning och registrering är för tillfället inaktiverad.
                    </p>
                    <p className="auth-contact">
                        För aktivering - kontakta <a href="https://www.weflippedgroup.com" target="_blank" rel="noopener noreferrer">WeFlipped Group</a>
                    </p>
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
          text-align: center;
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
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #171a20;
        }

        .auth-message {
            color: #5c5e62;
            margin-bottom: 24px;
            line-height: 1.5;
        }

        .auth-contact {
            font-size: 14px;
            color: #5c5e62;
            font-weight: 500;
        }

        .auth-contact a {
            color: var(--accent-blue, #0070f3);
            text-decoration: underline;
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
