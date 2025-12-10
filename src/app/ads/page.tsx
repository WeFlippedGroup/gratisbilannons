"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AdCard from '@/components/AdCard'
import FilterSidebar from '@/components/FilterSidebar'

// Mock Data moved here for filtering demo
const MOCK_ADS = [
    { id: 1, title: "Volvo V60 D4", price: 245000, year: 2020, miles: 4500, fuel: "Diesel", gearbox: "Automat", location: "Stockholm, Solna", brand: "Volvo" },
    { id: 2, title: "Tesla Model 3", price: 399000, year: 2021, miles: 3200, fuel: "El", gearbox: "Automat", location: "Göteborg, Askim", brand: "Tesla", imageColor: "#d1d1d6" },
    { id: 3, title: "Volkswagen Golf GTI", price: 189000, year: 2018, miles: 6800, fuel: "Bensin", gearbox: "Manuell", location: "Malmö, Centrum", brand: "Volkswagen", imageColor: "#6e6e73" },
    { id: 4, title: "Kia Niro EV", price: 310000, year: 2022, miles: 1500, fuel: "El", gearbox: "Automat", location: "Uppsala, Luthagen", brand: "Kia" },
    { id: 5, title: "Audi A6 Avant", price: 365000, year: 2019, miles: 9000, fuel: "Diesel", gearbox: "Automat", location: "Västerås, Hälla", brand: "Audi" },
    { id: 6, title: "Tesla Model Y", price: 550000, year: 2023, miles: 1200, fuel: "El", gearbox: "Automat", location: "Stockholm, City", brand: "Tesla" },
    { id: 7, title: "BMW 320d", price: 295000, year: 2019, miles: 5500, fuel: "Diesel", gearbox: "Automat", location: "Lund, Centrum", brand: "BMW" },
    { id: 8, title: "Volvo XC60", price: 410000, year: 2021, miles: 4100, fuel: "Hybrid", gearbox: "Automat", location: "Göteborg, Mölndal", brand: "Volvo" },
]

function AdsContent() {
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState({
        brand: searchParams.get('brand') || "",
        model: searchParams.get('model') || "",
        priceMax: "",
        yearMin: "",
        yearMax: "",
        fuel: "",
        gearbox: ""
    })

    // Update filters if URL params change (e.g. navigation from home)
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            brand: searchParams.get('brand') || prev.brand,
            model: searchParams.get('model') || prev.model
        }))
    }, [searchParams])

    // Filter Logic
    const filteredAds = MOCK_ADS.filter(ad => {
        if (filters.brand && !ad.brand.includes(filters.brand)) return false
        if (filters.model && !ad.title.includes(filters.model)) return false
        if (filters.priceMax && ad.price > Number(filters.priceMax)) return false
        if (filters.yearMin && ad.year < Number(filters.yearMin)) return false
        if (filters.yearMax && ad.year > Number(filters.yearMax)) return false
        if (filters.fuel && ad.fuel !== filters.fuel) return false
        if (filters.gearbox && ad.gearbox !== filters.gearbox) return false
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
                    {filteredAds.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {filteredAds.map(ad => (
                                <AdCard
                                    key={ad.id}
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
                                onClick={() => setFilters({ brand: "", model: "", priceMax: "", yearMin: "", yearMax: "", fuel: "", gearbox: "" })}
                                style={{ marginTop: '16px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Rensa alla filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
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
