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
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedLan, setSelectedLan] = useState<string>("")
    const [selectedKommun, setSelectedKommun] = useState<string>("")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (keyword) params.set('q', keyword)
        if (selectedBrand) params.set('brand', selectedBrand)
        if (selectedModel) params.set('model', selectedModel)
        if (selectedLan) params.set('lan', selectedLan)
        if (selectedKommun) params.set('kommun', selectedKommun)
        router.push(`/ads?${params.toString()}`)
    }

    const brands = useMemo(() => carsData.Bilmärken.map(b => b.Namn).sort(), [])

    const models = useMemo(() => {
        const brandData = carsData.Bilmärken.find(b => b.Namn === selectedBrand)
        return brandData ? brandData.Modeller.sort() : []
    }, [selectedBrand])

    const lans = useMemo(() => Object.keys(locationsData.Sverige).sort(), [])

    const kommuner = useMemo(() => {
        if (!selectedLan) return []
        // @ts-ignore
        return locationsData.Sverige[selectedLan as keyof Locations]?.sort() || []
    }, [selectedLan])

    return (
        <div className="glass-panel" style={{ padding: '32px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="search-grid">

                {/* Keyword Search */}
                <div className="input-wrapper">
                    <label className="label">Sökord</label>
                    <input
                        type="text"
                        placeholder="T.ex. Färg, utrustning..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="input-reset"
                    />
                </div>

                {/* Brand Selector */}
                <div className="select-wrapper">
                    <label className="label">Märke</label>
                    <select
                        value={selectedBrand}
                        onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(""); }}
                        className="input-reset"
                    >
                        <option value="">Alla märken</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                {/* Model Selector - Added for Symmetry */}
                <div className="select-wrapper">
                    <label className="label">Modell</label>
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand}
                        className="input-reset"
                        style={{ opacity: !selectedBrand ? 0.5 : 1 }}
                    >
                        <option value="">Alla modeller</option>
                        {models.map(model => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </div>

                {/* Län Selector */}
                <div className="select-wrapper">
                    <label className="label">Län</label>
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
                    <label className="label">Kommun</label>
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
                        style={{ width: '100%', height: '42px', backgroundColor: '#171a20', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
                        onClick={handleSearch}
                    >
                        Sök bilar
                    </button>
                </div>
            </div>

            <style jsx>{`
        .search-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Enforce 3 columns for perfect balance */
            gap: 20px;
        }
        @media (max-width: 800px) {
            .search-grid {
                grid-template-columns: 1fr; /* Stack on mobile */
            }
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
           outline: none;
        }
        select.input-reset {
          /* Custom SVG Arrow */
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3csvg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          appearance: none;
        }
      `}</style>
        </div>
    )
}
