"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import locationsData from '@/data/locations.json'

// Define types for the data structure
// The JSON structure is { "Sverige": { "Län": ["Kommun1", "Kommun2"] } }
type Locations = typeof locationsData.Sverige

export default function SearchFilter() {
    const router = useRouter()
    const [selectedLan, setSelectedLan] = useState<string>("")
    const [selectedKommun, setSelectedKommun] = useState<string>("")
    const [manualPlace, setManualPlace] = useState<string>("")

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (selectedLan) params.set('lan', selectedLan)
        if (selectedKommun) params.set('kommun', selectedKommun)
        if (manualPlace) params.set('place', manualPlace)
        router.push(`/ads?${params.toString()}`)
    }

    const lans = useMemo(() => Object.keys(locationsData.Sverige).sort(), [])

    const kommuner = useMemo(() => {
        if (!selectedLan) return []
        // @ts-ignore - We know the structure matches
        return locationsData.Sverige[selectedLan as keyof Locations]?.sort() || []
    }, [selectedLan])

    const handleLanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLan(e.target.value)
        setSelectedKommun("") // Reset kommun when län changes
    }

    return (
        <div className="glass-panel" style={{ padding: '24px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>

                {/* Län Selector */}
                <div className="select-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Län</label>
                    <select
                        value={selectedLan}
                        onChange={handleLanChange}
                        className="input-field"
                        style={{ width: '100%' }}
                    >
                        <option value="">Hela Sverige</option>
                        {lans.map(lan => (
                            <option key={lan} value={lan}>{lan}</option>
                        ))}
                    </select>
                </div>

                {/* Kommun Selector */}
                <div className="select-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Kommun</label>
                    <select
                        value={selectedKommun}
                        onChange={(e) => setSelectedKommun(e.target.value)}
                        disabled={!selectedLan}
                        className="input-field"
                        style={{ width: '100%', opacity: !selectedLan ? 0.5 : 1 }}
                    >
                        <option value="">Välj kommun</option>
                        {kommuner.map(kommun => (
                            <option key={kommun} value={kommun}>{kommun}</option>
                        ))}
                    </select>
                </div>

                {/* Manual Place Input */}
                <div className="input-wrapper">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--gray-500)', fontWeight: 500 }}>Plats (Valfritt)</label>
                    <input
                        type="text"
                        placeholder="T.ex. Centrum"
                        value={manualPlace}
                        onChange={(e) => setManualPlace(e.target.value)}
                        className="input-field"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button className="button" style={{ width: '100%', height: '42px' }}
                        onClick={handleSearch}>
                        Sök bilar
                    </button>
                </div>
            </div>

            <style jsx>{`
        .input-field {
          -webkit-appearance: none;
          appearance: none;
          background-color: var(--gray-100);
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          padding: 0 16px;
          height: 42px;
          font-size: 15px;
          color: var(--foreground);
          transition: all 0.2s ease;
        }
        
        .input-field:focus {
          outline: none;
          background-color: var(--background);
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
        }

        select.input-field {
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 12px top 50%;
          background-size: 8px auto;
          cursor: pointer;
        }
        
        @media (prefers-color-scheme: dark) {
           select.input-field {
             background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
           }
        }
      `}</style>
        </div>
    )
}
