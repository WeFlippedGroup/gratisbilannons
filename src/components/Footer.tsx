"use client"

import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid #e8e8e8',
            padding: '48px 24px',
            marginTop: 'auto',
            backgroundColor: '#fbfbfb',
            fontSize: '12px',
            color: '#5c5e62'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>

                {/* Navigation Links */}
                <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link href="/om-oss" className="footer-link">Om oss</Link>
                    <Link href="/villkor" className="footer-link">Användarvillkor</Link>
                    <Link href="/integritetspolicy" className="footer-link">Integritetspolicy</Link>
                    <Link href="/cookiepolicy" className="footer-link">Cookiepolicy</Link>
                </nav>

                {/* Contact & Copyright */}
                <div style={{ textAlign: 'center', lineHeight: '1.6' }}>
                    <p>Kontakt: <a href="mailto:kontakt@gratisbilannons.se" style={{ textDecoration: 'underline' }}>kontakt@gratisbilannons.se</a></p>
                    <p style={{ marginTop: '12px' }}>&copy; 2025 WeFlipped Group AB | Org.nr: 559535-6857</p>
                    <p style={{ marginTop: '8px' }}>
                        Powered by <a href="https://weflippedgroup.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3e6ae1', fontWeight: 500 }}>WeFlipped Group</a>
                    </p>
                </div>

            </div>

            <style jsx>{`
        .footer-link {
          color: #5c5e62;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #171a20;
          text-decoration: underline;
        }
      `}</style>
        </footer>
    )
}
