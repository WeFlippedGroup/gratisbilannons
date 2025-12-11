"use client"

import { useMemo } from 'react'
import carsData from '@/data/cars.json'
import specsData from '@/data/specs.json'

interface FilterProps {
    filters: any;
    setFilters: (filters: any) => void;
}

export default function FilterBar({ filters, setFilters }: FilterProps) {
    const brands = useMemo(() => carsData.Bilmärken.map(b => b.Namn).sort(), [])

    // Derived models based on selected brand
    const models = useMemo(() => {
        const brandData = carsData.Bilmärken.find(b => b.Namn === filters.brand)
        return brandData ? brandData.Modeller.sort() : []
    }, [filters.brand])

    const handleChange = (key: string, value: string) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="filter-bar">
            {/* Search Input */}
            <div className="filter-item search-item">
                <input
                    type="text"
                    placeholder="Sök..."
                    className="input-reset"
                    value={filters.keyword}
                    onChange={e => handleChange('keyword', e.target.value)}
                />
            </div>

            {/* Seller Type */}
            <div className="filter-item">
                <select className="input-reset" value={filters.sellerType || ""} onChange={e => handleChange('sellerType', e.target.value)}>
                    <option value="">Alla säljare</option>
                    <option value="private">Privat</option>
                    <option value="dealer">Företag</option>
                </select>
            </div>

            {/* Brand */}
            <div className="filter-item">
                <select className="input-reset" value={filters.brand} onChange={e => handleChange('brand', e.target.value)}>
                    <option value="">Alla märken</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {/* Model */}
            <div className="filter-item">
                <select className="input-reset" value={filters.model} onChange={e => handleChange('model', e.target.value)} disabled={!filters.brand}>
                    <option value="">Alla modeller</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            {/* Body Type */}
            <div className="filter-item">
                <select className="input-reset" value={filters.bodyType} onChange={e => handleChange('bodyType', e.target.value)}>
                    <option value="">Kaross</option>
                    {specsData.Biltyper.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Price Max */}
            <div className="filter-item">
                <select className="input-reset" value={filters.priceMax} onChange={e => handleChange('priceMax', e.target.value)}>
                    <option value="">Maxpris</option>
                    <option value="50000">50 000 kr</option>
                    <option value="100000">100 000 kr</option>
                    <option value="200000">200 000 kr</option>
                    <option value="300000">300 000 kr</option>
                    <option value="500000">500 000 kr</option>
                    <option value="1000000">1 000 000 kr</option>
                </select>
            </div>

            {/* Max Miles */}
            <div className="filter-item">
                <select className="input-reset" value={filters.milesMax} onChange={e => handleChange('milesMax', e.target.value)}>
                    <option value="">Max miltal</option>
                    <option value="1000">1 000 mil</option>
                    <option value="3000">3 000 mil</option>
                    <option value="5000">5 000 mil</option>
                    <option value="10000">10 000 mil</option>
                    <option value="15000">15 000 mil</option>
                </select>
            </div>

            {/* Year Min */}
            <div className="filter-item small">
                <input type="number" className="input-reset" placeholder="Från år" value={filters.yearMin} onChange={e => handleChange('yearMin', e.target.value)} />
            </div>

            {/* Year Max */}
            <div className="filter-item small">
                <input type="number" className="input-reset" placeholder="Till år" value={filters.yearMax} onChange={e => handleChange('yearMax', e.target.value)} />
            </div>

            {/* Fuel */}
            <div className="filter-item">
                <select className="input-reset" value={filters.fuel} onChange={e => handleChange('fuel', e.target.value)}>
                    <option value="">Bränsle</option>
                    {specsData.Bränsletyper.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>

            {/* Gearbox */}
            <div className="filter-item">
                <select className="input-reset" value={filters.gearbox} onChange={e => handleChange('gearbox', e.target.value)}>
                    <option value="">Växellåda</option>
                    {specsData.Växellådor.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>

            {/* Clear Button (if any filter is active) */}
            <button
                onClick={() => setFilters({ keyword: "", brand: "", model: "", priceMax: "", yearMin: "", yearMax: "", fuel: "", gearbox: "", bodyType: "", milesMax: "", sellerType: "" })}
                className="clear-btn"
                title="Rensa filter"
            >
                Rensa
            </button>

            <style jsx>{`
                .filter-bar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    padding: 16px;
                    background: white;
                    border: 1px solid #e8e8e8;
                    border-radius: 8px;
                    margin-bottom: 32px;
                    align-items: center;
                    position: sticky;
                    top: 80px; /* Below header */
                    z-index: 40;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .filter-item {
                    flex: 1 1 140px;
                    min-width: 120px;
                }
                
                .search-item {
                    flex: 2 1 200px; /* Search bar slightly wider */
                }

                .small {
                    flex: 1 1 100px;
                    min-width: 80px;
                }

                .input-reset {
                    background-color: #f9f9f9;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    height: 40px;
                    padding: 0 12px;
                    width: 100%;
                    font-size: 14px;
                    color: #171a20;
                    transition: all 0.2s;
                }
                .input-reset:focus {
                     background-color: white;
                     border-color: #3e6ae1;
                     outline: none;
                }

                .clear-btn {
                    background: none;
                    border: none;
                    color: #5c5e62;
                    text-decoration: underline;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 0 12px;
                    white-space: nowrap;
                }
                .clear-btn:hover {
                    color: #171a20;
                }

                @media (max-width: 768px) {
                    .filter-bar {
                        position: static; /* Unstick on mobile to save space */
                        padding: 12px;
                        gap: 8px;
                    }
                    .filter-item {
                        flex: 1 1 45%; /* 2 cols on mobile */
                    }
                    .search-item {
                        flex: 1 1 100%;
                    }
                }
            `}</style>
        </div>
    )
}
