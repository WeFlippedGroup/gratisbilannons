import Link from 'next/link'
import SearchFilter from '@/components/SearchFilter'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: 'url(/hero-car.png)', backgroundPosition: 'center 80%' }}>

        <div style={{ textAlign: 'center', zIndex: 10 }}>
          <h1 className="hero-title">GratisBilAnnons.se</h1>
          <p className="hero-subtitle">Den bästa plattformen. Helt gratis.</p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

          {/* Quick Actions */}
          <div className="button-group">
            <Link href="/ads" className="btn-primary">
              Se lagerbilar
            </Link>
            <Link href="/create-ad" className="btn-secondary">
              Sälj din bil
            </Link>
          </div>

          <p style={{ fontSize: '12px', color: '#5c5e62', marginTop: '16px' }}>
            Helt gratis för privatpersoner och företag.
          </p>
        </div>
      </section>

      {/* Search Section - Cleaner, below hero or overlay */}
      <section style={{ maxWidth: '900px', margin: '-60px auto 100px', position: 'relative', zIndex: 20 }}>
        <div className="glass-panel" style={{ padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: 500, textAlign: 'center' }}>Hitta din drömbil</h2>
          <SearchFilter />
        </div>
      </section>
    </main>
  )
}
