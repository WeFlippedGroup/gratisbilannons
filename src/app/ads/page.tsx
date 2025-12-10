"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AdCard from '@/components/AdCard'
import FilterSidebar from '@/components/FilterSidebar'
import { MOCK_ADS } from '@/data/mockAds'

function AdsContent() {
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState({
        keyword: searchParams.get('q') || "",
        brand: searchParams.get('brand') || "",
        model: searchParams.get('model') || "",
        priceMax: searchParams.get('priceMax') || "",
        yearMin: searchParams.get('yearMin') || "",
        yearMax: searchParams.get('yearMax') || "",
        fuel: searchParams.get('fuel') || "",
        gearbox: searchParams.get('gearbox') || "",
        bodyType: searchParams.get('bodyType') || ""
    })

    // Update filters if URL params change
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            keyword: searchParams.get('q') || "",
            brand: searchParams.get('brand') || "",
            model: searchParams.get('model') || "",
            priceMax: searchParams.get('priceMax') || prev.priceMax, // Persist manual filters if not in URL
            yearMin: searchParams.get('yearMin') || prev.yearMin,
            yearMax: searchParams.get('yearMax') || prev.yearMax,
            fuel: searchParams.get('fuel') || prev.fuel,
            gearbox: searchParams.get('gearbox') || prev.gearbox,
            bodyType: searchParams.get('bodyType') || prev.bodyType,
        }))
    }, [searchParams])

    // Filter Logic
    const filteredAds = MOCK_ADS.filter(ad => {
        // Keyword Search (Case Insensitive)
        if (filters.keyword) {
            const q = filters.keyword.toLowerCase()
            const matchesKeyword =
                ad.title.toLowerCase().includes(q) ||
                ad.brand.toLowerCase().includes(q) ||
                ad.location.toLowerCase().includes(q)
            if (!matchesKeyword) return false
        }

        if (filters.brand && !ad.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false
        if (filters.model && !ad.title.toLowerCase().includes(filters.model.toLowerCase())) return false
        if (filters.priceMax && ad.price > Number(filters.priceMax)) return false
        if (filters.yearMin && ad.year < Number(filters.yearMin)) return false
        if (filters.yearMax && ad.year > Number(filters.yearMax)) return false
        if (filters.fuel && ad.fuel !== filters.fuel) return false
        if (filters.gearbox && ad.gearbox !== filters.gearbox) return false
        if (filters.bodyType && ad.bodyType !== filters.bodyType) return false
        return true
    })

    return (
        <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '120px 24px 80px' }}>

            <div style={{ marginBottom: '32px' }}>
                <Link href="/" style={{ color: 'var(--accent-blue)', fontSize: '14px', fontWeight: 500 }}>← Tillbaka till sök</Link>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '16px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 500 }}>Bilar i lager</h1>
                    <span style={{ color: '#5c5e62', fontSize: '16px' }}>{filteredAds.length} träffar</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
                <FilterSidebar filters={filters} setFilters={setFilters} />

                <div style={{ flex: 1 }}>
                    {filters.keyword && (
                        <div style={{ marginBottom: '24px', padding: '16px', background: '#f4f4f4', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '14px', color: '#171a20' }}>
                                Visar resultat för: <strong>&quot;{filters.keyword}&quot;</strong>
                            </span>
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, keyword: "" }))}
                                style={{ border: 'none', background: 'none', color: '#5c5e62', cursor: 'pointer', fontSize: '18px' }}
                                title="Rensa sökning"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {filteredAds.length > 0 ? (
                        <div className="ad-grid">
                            {filteredAds.map(ad => (
                                <AdCard
                                    key={ad.id}
                                    id={ad.id}
                                    title={ad.title}
                                    price={`${ad.price.toLocaleString()} kr`}
                                    specs={`${ad.year} • ${ad.miles.toLocaleString().replace(',', ' ')} mil • ${ad.gearbox} • ${ad.fuel}`}
                                    location={ad.location}
                                    imageColor={ad.imageColor}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '64px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Inga bilar hittades</h3>
                            <p style={{ color: '#5c5e62' }}>Prova att justera dina filter.</p>
                            <button
                                onClick={() => setFilters({ keyword: "", brand: "", model: "", priceMax: "", yearMin: "", yearMax: "", fuel: "", gearbox: "", bodyType: "" })}
                                style={{ marginTop: '16px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Rensa alla filter
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .ad-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 24px;
                }
                @media (min-width: 768px) {
                    .ad-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1100px) {
                    .ad-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
        </main>
    )
}

export default function AdsPage() {
    return (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Laddar annonser...</div>}>
            <AdsContent />
        </Suspense>
    )
}
