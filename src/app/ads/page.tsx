import Link from 'next/link'
import AdCard from '@/components/AdCard'

export default function AdsPage() {
    return (
        <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link href="/" style={{ color: 'var(--accent-blue)', fontSize: '15px' }}>← Tillbaka</Link>
                <h1 className="title-medium">Hittade annonser</h1>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                <AdCard
                    title="Volvo V60 D4"
                    price="245 000 kr"
                    specs="2020 • 4 500 mil • Automat • Diesel"
                    location="Stockholm, Solna"
                />
                <AdCard
                    title="Tesla Model 3"
                    price="399 000 kr"
                    specs="2021 • 3 200 mil • Automat • El"
                    location="Göteborg, Askim"
                    imageColor="#d1d1d6"
                />
                <AdCard
                    title="Volkswagen Golf GTI"
                    price="189 000 kr"
                    specs="2018 • 6 800 mil • Manuell • Bensin"
                    location="Malmö, Centrum"
                    imageColor="#6e6e73"
                />
                <AdCard
                    title="Kia Niro EV"
                    price="310 000 kr"
                    specs="2022 • 1 500 mil • Automat • El"
                    location="Uppsala, Luthagen"
                />
                <AdCard
                    title="Audi A6 Avant"
                    price="365 000 kr"
                    specs="2019 • 9 000 mil • Automat • Diesel"
                    location="Västerås, Hälla"
                />
            </div>
        </main>
    )
}
