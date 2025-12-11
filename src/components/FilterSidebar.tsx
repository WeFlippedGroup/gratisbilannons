"use client"

import { useState, useMemo } from 'react'
import carsData from '@/data/cars.json'
import specsData from '@/data/specs.json'

interface FilterProps {
    filters: any;
    setFilters: (filters: any) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterProps) {
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
        <aside style={{ width: '280px', flexShrink: 0, paddingRight: '32px', borderRight: '1px solid #e8e8e8', flexDirection: 'column', gap: '24px' }} className="desktop-filters">
            <h3 style={{ fontSize: '18px', fontWeight: 500 }}>Filtrera</h3>

            {/* Seller Type */}
            <div>
                <label className="label">Säljare</label>
                <select className="input-reset" value={filters.sellerType || ""} onChange={e => handleChange('sellerType', e.target.value)}>
                    <option value="">Alla</option>
                    <option value="private">Privat</option>
                    <option value="dealer">Företag</option>
                </select>
            </div>

            {/* Brand */}
            <div>
                <label className="label">Märke</label>
                <select className="input-reset" value={filters.brand} onChange={e => handleChange('brand', e.target.value)}>
                    <option value="">Alla märken</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {/* Model */}
            <div>
                <label className="label">Modell</label>
                <select className="input-reset" value={filters.model} onChange={e => handleChange('model', e.target.value)} disabled={!filters.brand}>
                    <option value="">Alla modeller</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>

            {/* Price Max */}
            <div>
                <label className="label">Kaross</label>
                <select className="input-reset" value={filters.bodyType} onChange={e => handleChange('bodyType', e.target.value)}>
                    <option value="">Alla</option>
                    {specsData.Biltyper.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Price Max */}
            <div>
                <label className="label">Maxpris</label>
                <select className="input-reset" value={filters.priceMax} onChange={e => handleChange('priceMax', e.target.value)}>
                    <option value="">Inget tak</option>
                    <option value="50000">50 000 kr</option>
                    <option value="100000">100 000 kr</option>
                    <option value="200000">200 000 kr</option>
                    <option value="300000">300 000 kr</option>
                    <option value="500000">500 000 kr</option>
                    <option value="1000000">1 000 000 kr</option>
                </select>
            </div>

            {/* Max Miles */}
            <div>
                <label className="label">Max Miltal</label>
                <select className="input-reset" value={filters.milesMax} onChange={e => handleChange('milesMax', e.target.value)}>
                    <option value="">Alla miltal</option>
                    <option value="1000">1 000 mil</option>
                    <option value="3000">3 000 mil</option>
                    <option value="5000">5 000 mil</option>
                    <option value="10000">10 000 mil</option>
                    <option value="15000">15 000 mil</option>
                    <option value="20000">20 000 mil</option>
                </select>
            </div>

            {/* Year Range */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                    <label className="label">År från</label>
                    <input type="number" className="input-reset" placeholder="2010" value={filters.yearMin} onChange={e => handleChange('yearMin', e.target.value)} />
                </div>
                <div>
                    <label className="label">År till</label>
                    <input type="number" className="input-reset" placeholder="2025" value={filters.yearMax} onChange={e => handleChange('yearMax', e.target.value)} />
                </div>
            </div>

            {/* Fuel */}
            <div>
                <label className="label">Bränsle</label>
                <select className="input-reset" value={filters.fuel} onChange={e => handleChange('fuel', e.target.value)}>
                    <option value="">Alla</option>
                    {specsData.Bränsletyper.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>

            {/* Gearbox */}
            <div>
                <label className="label">Växellåda</label>
                <select className="input-reset" value={filters.gearbox} onChange={e => handleChange('gearbox', e.target.value)}>
                    <option value="">Alla</option>
                    {specsData.Växellådor.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>

            <style jsx>{`
                .desktop-filters {
                    display: flex;
                }
                @media (max-width: 900px) {
                    .desktop-filters {
                        display: none;
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
                    height: 40px;
                    padding: 0 12px;
                    width: 100%;
                    font-size: 14px;
                    color: #171a20;
                }
            `}</style>
        </aside>
    )
}
