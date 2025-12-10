import Link from 'next/link'
import SearchFilter from '@/components/SearchFilter'

export default function Home() {
  return (
    <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 className="title-large" style={{ marginBottom: '16px' }}>Enklare bilaffärer.</h1>
        <p className="title-medium" style={{ color: 'var(--gray-500)' }}>Helt gratis.</p>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <SearchFilter />
      </div>

      <div className="glass-panel" style={{ padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p className="text-body" style={{ marginBottom: '24px' }}>
          Sveriges nya mötesplats för bilentusiaster och handlare.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="button">Hitta din nästa bil</button>
          <Link href="/create-ad" className="button button-secondary">Sälj din bil</Link>
        </div>
      </div>
    </main>
  )
}
