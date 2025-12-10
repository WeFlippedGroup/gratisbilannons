"use client"

import { useState, useMemo } from 'react'
import locationsData from '@/data/locations.json'
import carsData from '@/data/cars.json'
import specsData from '@/data/specs.json'

type AdType = 'private' | 'dealer'
// @ts-ignore
type Locations = typeof locationsData.Sverige

export default function CreateAdForm() {
    const [adType, setAdType] = useState<AdType>('private')

    // Form State
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [fuel, setFuel] = useState("")
    const [gearbox, setGearbox] = useState("")
    const [year, setYear] = useState("")
    const [miles, setMiles] = useState("")
    const [price, setPrice] = useState("")

    const [lan, setLan] = useState("")
    const [kommun, setKommun] = useState("")

    // Dealer specific
    const [companyName, setCompanyName] = useState("")
    const [orgNumber, setOrgNumber] = useState("")

    // Derived Data
    const brands = useMemo(() => carsData.Bilmärken.map(b => b.Namn).sort(), [])

    const models = useMemo(() => {
        const selectedBrand = carsData.Bilmärken.find(b => b.Namn === brand)
        return selectedBrand ? selectedBrand.Modeller.sort() : []
    }, [brand])

    const lans = useMemo(() => Object.keys(locationsData.Sverige).sort(), [])

    const kommuner = useMemo(() => {
        if (!lan) return []
        // @ts-ignore
        return locationsData.Sverige[lan as keyof Locations]?.sort() || []
    }, [lan])

    return (
        <div className="glass-panel" style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>

            {/* Type Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{
                    background: 'var(--gray-100)',
                    padding: '4px',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-flex'
                }}>
                    <button
                        type="button"
                        onClick={() => setAdType('private')}
                        style={{
                            padding: '8px 24px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: adType === 'private' ? 'white' : 'transparent',
                            boxShadow: adType === 'private' ? 'var(--shadow-sm)' : 'none',
                            fontWeight: 500,
                            cursor: 'pointer',
                            color: 'var(--foreground)'
                        }}
                    >
                        Privat
                    </button>
                    <button
                        type="button"
                        onClick={() => setAdType('dealer')}
                        style={{
                            padding: '8px 24px',
                            borderRadius: 'var(--radius-full)',
                            border: 'none',
                            background: adType === 'dealer' ? 'white' : 'transparent',
                            boxShadow: adType === 'dealer' ? 'var(--shadow-sm)' : 'none',
                            fontWeight: 500,
                            cursor: 'pointer',
                            color: 'var(--foreground)'
                        }}
                    >
                        Bilfirma
                    </button>
                </div>
            </div>

            <h2 className="title-medium" style={{ textAlign: 'center', marginBottom: '32px' }}>
                {adType === 'private' ? 'Sälj din bil gratis.' : 'Lägg upp företagsannons.'}
            </h2>

            <form style={{ display: 'grid', gap: '24px' }}>

                {/* Dealer Details */}
                {adType === 'dealer' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--gray-200)' }}>
                        <div>
                            <label className="label">Företagsnamn</label>
                            <input type="text" className="input-field" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Organisationsnummer</label>
                            <input type="text" className="input-field" value={orgNumber} onChange={e => setOrgNumber(e.target.value)} />
                        </div>
                    </div>
                )}

                {/* Car Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label className="label">Märke</label>
                        <select className="input-field" value={brand} onChange={e => setBrand(e.target.value)}>
                            <option value="">Välj märke</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Modell</label>
                        <select className="input-field" value={model} onChange={e => setModel(e.target.value)} disabled={!brand}>
                            <option value="">Välj modell</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                        <label className="label">Årsmodell</label>
                        <input type="number" className="input-field" placeholder="2020" value={year} onChange={e => setYear(e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Miltal</label>
                        <input type="number" className="input-field" placeholder="0" value={miles} onChange={e => setMiles(e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Pris (SEK)</label>
                        <input type="number" className="input-field" placeholder="150 000" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label className="label">Bränsle</label>
                        <select className="input-field" value={fuel} onChange={e => setFuel(e.target.value)}>
                            <option value="">Välj bränsle</option>
                            {specsData.Bränsletyper.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Växellåda</label>
                        <select className="input-field" value={gearbox} onChange={e => setGearbox(e.target.value)}>
                            <option value="">Välj växellåda</option>
                            {specsData.Växellådor.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                </div>

                {/* Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--gray-200)', paddingTop: '16px' }}>
                    <div>
                        <label className="label">Län</label>
                        <select className="input-field" value={lan} onChange={e => { setLan(e.target.value); setKommun(""); }}>
                            <option value="">Välj län</option>
                            {lans.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Kommun</label>
                        <select className="input-field" value={kommun} onChange={e => setKommun(e.target.value)} disabled={!lan}>
                            <option value="">Välj kommun</option>
                            {kommuner.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit" className="button" style={{ width: '100%', marginTop: '16px' }}>
                    {adType === 'private' ? 'Publicera annons gratis' : 'Publicera företagsannons'}
                </button>

            </form>

            <style jsx>{`
        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          color: var(--gray-500);
          font-weight: 500;
        }
        .input-field {
          width: 100%;
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
