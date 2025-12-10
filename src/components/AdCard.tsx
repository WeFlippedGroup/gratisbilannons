import Link from 'next/link'

type AdProps = {
    id: number
    title: string
    price: string
    specs: string
    location: string
    imageColor?: string
}

export default function AdCard({ id, title, price, specs, location, imageColor = '#f4f4f4' }: AdProps) {
    return (
        <Link href={`/ads/${id}`} style={{ textDecoration: 'none' }}>
            <div style={{
                background: '#fff',
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                cursor: 'pointer'
            }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <div style={{
                    height: '200px', // Fixed height for consistency
                    backgroundColor: imageColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    position: 'relative'
                }}>
                    {/* Simple Car Icon Placeholder */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="17" r="2" />
                    </svg>
                </div>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#171a20', margin: 0, lineHeight: '1.2' }}>{title}</h3>
                        <span style={{ fontSize: '16px', fontWeight: 500, color: '#171a20', whiteSpace: 'nowrap' }}>{price}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: '#5c5e62', marginBottom: '12px', lineHeight: '1.4' }}>{specs}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '12px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {location}
                    </div>
                </div>
            </div>
        </Link>
    )
}
