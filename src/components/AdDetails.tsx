"use client"

import { useState } from 'react'
import Link from 'next/link'

type Ad = {
    id: number
    title: string
    price: number
    year: number
    miles: number
    gearbox: string
    fuel: string
    location: string
    brand: string
    model?: string
    regNumber?: string
    color?: string
    description?: string
    imageColor?: string
    images?: string[]
    bodyType?: string
    seller?: {
        name: string
        phone?: string
        showPhone?: boolean
        id?: string
    }
}

export default function AdDetails({ ad }: { ad: Ad }) {
    const [activeImage, setActiveImage] = useState(0)
    const [showPhone, setShowPhone] = useState(false)
    const images = ad.images || [ad.imageColor || '#f4f4f4']

    return (
        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <Link href="/ads" style={{ color: 'var(--accent-blue)', fontSize: '14px', fontWeight: 500, display: 'inline-block', marginBottom: '24px' }}>
                ← Tillbaka till listan
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '48px', alignItems: 'start' }} className="ad-container">
                {/* Left Column: Gallery & Description */}
                <div>
                    {/* Main Image */}
                    {/* Main Image */}
                    <div style={{
                        height: '400px',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        marginBottom: '16px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        {/* Check if current image is a URL or a color code */}
                        {images[activeImage] && (images[activeImage].startsWith('http') || images[activeImage].startsWith('/')) ? (
                            <img
                                src={images[activeImage]}
                                alt={`${ad.brand} ${ad.model}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            /* Fallback to Color or Icon if no URL */
                            <div style={{ width: '100%', height: '100%', backgroundColor: images[activeImage] || '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                    <circle cx="7" cy="17" r="2" />
                                    <circle cx="17" cy="17" r="2" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    style={{
                                        width: '80px',
                                        height: '60px',
                                        backgroundColor: '#f4f4f4',
                                        border: activeImage === idx ? '2px solid #3e6ae1' : '1px solid transparent',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        padding: 0,
                                        flexShrink: 0,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {(img.startsWith('http') || img.startsWith('/')) ? (
                                        <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', backgroundColor: img }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

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
                        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
                            {ad.brand} {ad.model} <span style={{ opacity: 0.5, fontSize: '0.8em' }}>{ad.year}</span>
                            {ad.regNumber && <span style={{ marginLeft: '12px', fontSize: '0.6em', background: '#f4f4f4', padding: '4px 8px', borderRadius: '4px', verticalAlign: 'middle', letterSpacing: '1px' }}>{ad.regNumber}</span>}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5c5e62', marginBottom: '24px' }}>
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
                            {ad.color && (
                                <div className="spec-item">
                                    <span className="label">Färg</span>
                                    <span className="value">{ad.color}</span>
                                </div>
                            )}
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
                            backgroundColor: showPhone ? '#21c55e' : '#171a20', // Green if showing number, Black otherwise
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                            onClick={() => {
                                if (ad.seller?.showPhone && ad.seller?.phone) {
                                    setShowPhone(!showPhone)
                                } else {
                                    alert('Meddelandefunktion kommer snart! 💬')
                                }
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            {showPhone ? (
                                <>
                                    <span>📞 {ad.seller?.phone}</span>
                                </>
                            ) : (
                                <>
                                    {ad.seller?.showPhone && ad.seller.phone ? 'Visa telefonnummer' : 'Kontakta säljaren'}
                                </>
                            )}
                        </button>

                        {!showPhone && (
                            <p style={{ marginTop: '16px', fontSize: '12px', color: '#5c5e62', textAlign: 'center' }}>
                                {ad.seller?.showPhone ? 'Klicka för att se nummer' : 'Säljaren kontaktas via meddelande (WIP).'}
                            </p>
                        )}
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
