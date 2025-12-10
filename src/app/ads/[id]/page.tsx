"use client"

import { MOCK_ADS } from '@/data/mockAds'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function AdDetailsPage({ params }: { params: { id: string } }) {
    const ad = MOCK_ADS.find(a => a.id === parseInt(params.id))

    if (!ad) {
        return notFound()
    }

    return (
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <Link href="/ads" style={{ color: 'var(--accent-blue)', fontSize: '14px', fontWeight: 500, display: 'inline-block', marginBottom: '24px' }}>
                ← Tillbaka till listan
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '48px', alignItems: 'start' }} className="ad-container">
                {/* Left Column: Images & Description */}
                <div>
                    <div style={{
                        height: '400px',
                        backgroundColor: ad.imageColor || '#f4f4f4',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        marginBottom: '32px'
                    }}>
                        <span style={{ fontSize: '18px', fontWeight: 500 }}>STOR BILD HÄR</span>
                    </div>

                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '16px', borderBottom: '1px solid #e8e8e8', paddingBottom: '16px' }}>Beskrivning</h2>
                        <p style={{ lineHeight: '1.6', color: '#393c41', fontSize: '16px', whiteSpace: 'pre-line' }}>
                            {ad.description || "Ingen beskrivning angiven."}
                        </p>
                    </div>
                </div>

                {/* Right Column: Key Info & Contact */}
                <aside style={{ position: 'sticky', top: '120px' }}>
                    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px', lineHeight: '1.2' }}>{ad.title}</h1>
                        <div style={{ fontSize: '24px', fontWeight: 500, color: '#171a20', marginBottom: '24px' }}>
                            {ad.price.toLocaleString()} kr
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                            <div className="spec-item">
                                <span className="label">Modellår</span>
                                <span className="value">{ad.year}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Miltal</span>
                                <span className="value">{ad.miles.toLocaleString().replace(',', ' ')} mil</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Växellåda</span>
                                <span className="value">{ad.gearbox}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Bränsle</span>
                                <span className="value">{ad.fuel}</span>
                            </div>
                            {ad.bodyType && (
                                <div className="spec-item">
                                    <span className="label">Kaross</span>
                                    <span className="value">{ad.bodyType}</span>
                                </div>
                            )}
                            <div className="spec-item">
                                <span className="label">Plats</span>
                                <span className="value">{ad.location}</span>
                            </div>
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#3e6ae1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}>
                            Kontakta säljaren
                        </button>
                        <p style={{ marginTop: '16px', fontSize: '12px', color: '#5c5e62', textAlign: 'center' }}>
                            Säljaren kontaktas via meddelande.
                        </p>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .label {
                    display: block;
                    font-size: 13px;
                    color: #5c5e62;
                    margin-bottom: 2px;
                }
                .value {
                    display: block;
                    font-size: 15px;
                    font-weight: 500;
                    color: #171a20;
                }
                @media (max-width: 900px) {
                    .ad-container {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    )
}
