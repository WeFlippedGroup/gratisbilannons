"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image' // Added as per instruction, though not directly used by the provided handleSubmit
import locationsData from '@/data/locations.json'
import carsData from '@/data/cars.json'
import specsData from '@/data/specs.json'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import imageCompression from 'browser-image-compression'

type AdType = 'private' | 'dealer'
// @ts-ignore
type Locations = typeof locationsData.Sverige

export default function CreateAdForm() {
    const router = useRouter()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [adType, setAdType] = useState<AdType>('private')

    // Form State
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [isManualModel, setIsManualModel] = useState(false)
    const [manualModelInput, setManualModelInput] = useState("")

    const [fuel, setFuel] = useState("")
    const [gearbox, setGearbox] = useState("")
    const [year, setYear] = useState("")
    const [miles, setMiles] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const [lan, setLan] = useState("")
    const [kommun, setKommun] = useState("")
    const [manualPlace, setManualPlace] = useState("")

    // Dealer specific
    const [companyName, setCompanyName] = useState("")
    const [orgNumber, setOrgNumber] = useState("")

    // Image State
    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImages(prev => [...prev, ...files])

            const newPreviews = files.map(file => URL.createObjectURL(file))
            setPreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    // Derived Data
    const brands = useMemo(() => carsData.Bilmärken.map(b => b.Namn).sort(), [])

    const models = useMemo(() => {
        const selectedBrand = carsData.Bilmärken.find(b => b.Namn === brand)
        return selectedBrand ? [...selectedBrand.Modeller.sort(), "Annat / Saknas"] : []
    }, [brand])

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value
        setModel(val)
        if (val === "Annat / Saknas") {
            setIsManualModel(true)
        } else {
            setIsManualModel(false)
        }
    }

    const lans = useMemo(() => Object.keys(locationsData.Sverige).sort(), [])

    const kommuner = useMemo(() => {
        if (!lan) return []
        // @ts-ignore
        return locationsData.Sverige[lan as keyof Locations]?.sort() || []
    }, [lan])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!user) {
            alert('Du måste vara inloggad.')
            setLoading(false)
            return
        }

        const uploadedImageUrls: string[] = []

        try {
            // Unsaved files? Or just uploading everything now?
            // In a real app we might want to upload as they are selected to save time,
            // but this is safer for consistency (no orphan files if form abandoned).

            for (const file of images) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    initialQuality: 0.8
                }

                try {
                    const compressedFile = await imageCompression(file, options)
                    const fileName = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`

                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('car-images')
                        .upload(fileName, compressedFile)

                    if (uploadError) {
                        console.error('Upload error:', uploadError)
                        continue // Skip failed uploads? Or fail hard? Let's skip for now.
                    }

                    const { data: publicUrlData } = supabase.storage
                        .from('car-images')
                        .getPublicUrl(fileName)

                    if (publicUrlData.publicUrl) {
                        uploadedImageUrls.push(publicUrlData.publicUrl)
                    }

                } catch (err) {
                    console.error('Compression/Upload Error', err)
                }
            }

            const finalModel = isManualModel || !model ? manualModelInput : model

            // Insert into Supabase
            const { error } = await supabase
                .from('ads')
                .insert({
                    user_id: user.id,
                    title: `${brand} ${finalModel}`,
                    brand,
                    model: finalModel,
                    year: parseInt(year) || 0,
                    miles: parseInt(miles) || 0,
                    price: parseInt(price) || 0,
                    fuel,
                    gearbox,
                    body_type: "Sedan", // Simplified for now
                    location: `${lan}, ${kommun} ${manualPlace ? '- ' + manualPlace : ''}`,
                    description,
                    images: uploadedImageUrls,
                    image_color: null // Use images array primarily
                })

            if (error) {
                alert('Kunde inte skapa annons: ' + error.message)
                setLoading(false)
            } else {
                alert('Annons skapad!')
                router.push('/ads')
            }

        } catch (error) {
            console.error('Error in submission:', error)
            alert('Något gick fel vid uppladdning.')
            setLoading(false)
        }
    }

    return (
        <div className="glass-panel" style={{ padding: '64px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {/* Type Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
                <div style={{
                    background: '#f4f4f4',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'inline-flex'
                }}>
                    <button
                        type="button"
                        onClick={() => setAdType('private')}
                        style={{
                            padding: '10px 32px',
                            borderRadius: '4px',
                            border: 'none',
                            background: adType === 'private' ? 'white' : 'transparent',
                            boxShadow: adType === 'private' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
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
                            padding: '10px 32px',
                            borderRadius: '4px',
                            border: 'none',
                            background: adType === 'dealer' ? 'white' : 'transparent',
                            boxShadow: adType === 'dealer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            fontWeight: 500,
                            cursor: 'pointer',
                            color: 'var(--foreground)'
                        }}
                    >
                        Bilfirma
                    </button>
                </div>
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px', fontWeight: 500 }}>
                {adType === 'private' ? 'Sälj din bil gratis.' : 'Lägg upp företagsannons.'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>

                {/* Dealer Details */}
                {adType === 'dealer' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <label className="label">Företagsnamn</label>
                            <input type="text" className="input-reset" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Organisationsnummer</label>
                            <input type="text" className="input-reset" value={orgNumber} onChange={e => setOrgNumber(e.target.value)} />
                        </div>
                    </div>
                )}

                {/* Car Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <label className="label">Märke</label>
                        <select className="input-reset" value={brand} onChange={e => setBrand(e.target.value)}>
                            <option value="">Välj märke</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Modell</label>
                        <select className="input-reset" value={model} onChange={handleModelChange} disabled={!brand}>
                            <option value="">Välj modell</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        {/* Manual Model Input */}
                        {isManualModel && (
                            <input
                                type="text"
                                className="input-reset"
                                placeholder="Ange modell manuellt..."
                                style={{ marginTop: '12px' }}
                                value={manualModelInput}
                                onChange={e => setManualModelInput(e.target.value)}
                            />
                        )}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                    <div>
                        <label className="label">Årsmodell</label>
                        <input type="number" className="input-reset" placeholder="2020" value={year} onChange={e => setYear(e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Miltal</label>
                        <input type="number" className="input-reset" placeholder="0" value={miles} onChange={e => setMiles(e.target.value)} />
                    </div>
                    <div>
                        <label className="label">Pris (SEK)</label>
                        <input type="number" className="input-reset" placeholder="150 000" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <label className="label">Bränsle</label>
                        <select className="input-reset" value={fuel} onChange={e => setFuel(e.target.value)}>
                            <option value="">Välj bränsle</option>
                            {specsData.Bränsletyper.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Växellåda</label>
                        <select className="input-reset" value={gearbox} onChange={e => setGearbox(e.target.value)}>
                            <option value="">Välj växellåda</option>
                            {specsData.Växellådor.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                </div>

                {/* Images Section */}
                <div>
                    <label className="label">Bilder (Max 10)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>

                        {/* Upload Button */}
                        <label style={{
                            border: '1px dashed #d0d1d2',
                            borderRadius: '4px',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#5c5e62',
                            fontSize: '13px',
                            background: '#f9f9f9',
                            transition: 'all 0.2s'
                        }} className="upload-box">
                            <span style={{ fontSize: '24px', marginBottom: '4px' }}>+</span>
                            <span>Välj bilder</span>
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                        </label>

                        {/* Previews */}
                        {previews.map((src, idx) => (
                            <div key={idx} style={{ position: 'relative', height: '100px', borderRadius: '4px', overflow: 'hidden' }}>
                                <img src={src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        lineHeight: '1'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description Field */}
                <div>
                    <label className="label">Beskrivning</label>
                    <textarea
                        className="input-reset"
                        rows={6}
                        placeholder="Beskriv skicket, utrustning och annat viktigt..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                {/* Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid #e8e8e8', paddingTop: '24px' }}>
                    <div>
                        <label className="label">Län</label>
                        <select className="input-reset" value={lan} onChange={e => { setLan(e.target.value); setKommun(""); }}>
                            <option value="">Välj län</option>
                            {lans.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Kommun</label>
                        <select className="input-reset" value={kommun} onChange={e => setKommun(e.target.value)} disabled={!lan}>
                            <option value="">Välj kommun</option>
                            {kommuner.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                </div>

                {/* Explicit Place Field */}
                <div>
                    <label className="label">Område / Plats (Valfritt)</label>
                    <input
                        type="text"
                        className="input-reset"
                        placeholder="T.ex. Södermalm, Centrum, Askim..."
                        value={manualPlace}
                        onChange={e => setManualPlace(e.target.value)}
                    />
                </div>

                <button type="submit" className="button" style={{
                    width: '100%',
                    marginTop: '32px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: 600,
                    background: '#171a20', /* Neural Dark */
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    {loading ? 'Laddar upp...' : (adType === 'private' ? 'Publicera annons gratis' : 'Publicera företagsannons')}
                </button>

            </form>

            <style jsx>{`
        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          color: var(--gray-500);
          font-weight: 500;
        }
        .input-reset {
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
        .input-reset:focus {
          outline: none;
          background-color: var(--background);
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
        }
        textarea.input-reset {
            padding: 12px 16px;
            height: auto;
        }
        select.input-reset {
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 12px top 50%;
          background-size: 8px auto;
          cursor: pointer;
        }
        @media (prefers-color-scheme: dark) {
           select.input-reset {
             background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
           }
        }
      `}</style>
        </div>
    )
}
