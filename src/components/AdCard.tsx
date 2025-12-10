type AdProps = {
    title: string
    price: string
    specs: string
    location: string
    imageColor?: string
}

export default function AdCard({ title, price, specs, location, imageColor = '#e8e8ed' }: AdProps) {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden', padding: 0, transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{
                height: '200px',
                backgroundColor: imageColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gray-500)',
                fontSize: '14px'
            }}>
                Bild
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 600 }}>{title}</h3>
                    <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--accent-blue)' }}>{price}</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '4px' }}>{specs}</p>
                <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>{location}</p>
            </div>
        </div>
    )
}
