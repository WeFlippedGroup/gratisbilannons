"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import locationsData from '@/data/locations.json'
import carsData from '@/data/cars.json'

// Define types for the data structure
// The JSON structure is { "Sverige": { "Län": ["Kommun1", "Kommun2"] } }
type Locations = typeof locationsData.Sverige

export default function SearchFilter() {
    const router = useRouter()
    const [keyword, setKeyword] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedLan, setSelectedLan] = useState<string>("")
    const [selectedKommun, setSelectedKommun] = useState<string>("")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (keyword) params.set('q', keyword)
        if (selectedBrand) params.set('brand', selectedBrand)
        if (selectedLan) params.set('lan', selectedLan)
        if (selectedKommun) params.set('kommun', selectedKommun)
        router.push(`/ads?${params.toString()}`)
    }

    const brands = useMemo(() => carsData.Bilmärken.map(b => b.Namn).sort(), [])
    const lans = useMemo(() => Object.keys(locationsData.Sverige).sort(), [])

    const kommuner = useMemo(() => {
        if (!selectedLan) return []
        // @ts-ignore
        return locationsData.Sverige[selectedLan as keyof Locations]?.sort() || []
    }, [selectedLan])

    return (
        <div className="glass-panel" style={{ padding: '32px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>

                {/* Keyword Search */}
                <div className="input-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#5c5e62', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sökord</label>
                    <input
                        type="text"
                        placeholder="T.ex. Modell, färg..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="input-reset"
                    />
                </div>

                {/* Brand Selector */}
                <div className="select-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#5c5e62', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Märke</label>
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="input-reset"
                    >
                        <option value="">Alla märken</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                {/* Län Selector */}
                <div className="select-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#5c5e62', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Län</label>
                    <select
                        value={selectedLan}
                        onChange={(e) => { setSelectedLan(e.target.value); setSelectedKommun(""); }}
                        className="input-reset"
                    >
                        <option value="">Hela Sverige</option>
                        {lans.map(lan => (
                            <option key={lan} value={lan}>{lan}</option>
                        ))}
                    </select>
                </div>

                {/* Kommun Selector */}
                <div className="select-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#5c5e62', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kommun</label>
                    <select
                        value={selectedKommun}
                        onChange={(e) => setSelectedKommun(e.target.value)}
                        disabled={!selectedLan}
                        className="input-reset"
                        style={{ opacity: !selectedLan ? 0.5 : 1 }}
                    >
                        <option value="">Välj kommun</option>
                        {kommuner.map(kommun => (
                            <option key={kommun} value={kommun}>{kommun}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', height: '42px', backgroundColor: '#171a20', color: 'white' }}
                        onClick={handleSearch}
                    >
                        Sök bilar
                    </button>
                </div>
            </div>

            <style jsx>{`
        .input-reset {
          background-color: #f4f4f4;
          border: 1px solid transparent;
          border-radius: 4px;
          height: 42px;
          padding: 0 16px;
          width: 100%;
          font-size: 14px;
          color: #171a20;
          transition: all 0.2s;
        }
        .input-reset:focus {
           background-color: #fff;
           box-shadow: 0 0 0 1px #d0d1d2;
        }
        select.input-reset {
          /* Custom SVG Arrow */
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          appearance: none;
        }
      `}</style>
        </div>
    )
}
