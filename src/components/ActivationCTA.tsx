"use client"

export default function ActivationCTA() {
  return (
    <div className="activation-cta">
      <div className="activation-content">
        <span>För aktivering - kontakta </span>
        <a href="https://www.weflippedgroup.com" target="_blank" rel="noopener noreferrer" className="activation-link">
          WeFlipped Group
        </a>
      </div>

      <style jsx>{`
        .activation-cta {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          padding: 12px 24px;
          border-radius: 50px;
          z-index: 9999;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          animation: slideIn 0.5s ease-out;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .activation-content {
          color: white;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .activation-link {
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          transition: all 0.2s ease;
        }

        .activation-link:hover {
          border-bottom-color: white;
          opacity: 0.9;
        }

        @keyframes slideIn {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 600px) {
          .activation-cta {
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            right: auto;
            width: auto;
            white-space: nowrap;
          }
          
          @keyframes slideIn {
            from {
              transform: translate(-50%, 100px);
              opacity: 0;
            }
            to {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  )
}
