type AdProps = {
    title: string
    price: string
    specs: string
    location: string
    imageColor?: string
}

export default function AdCard({ title, price, specs, location, imageColor = '#f4f4f4' }: AdProps) {
    return (
        <div style={{
            background: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'all 0.2s',
            cursor: 'pointer'
        }}>
            <div style={{
                height: '220px',
                backgroundColor: imageColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5c5e62',
                fontSize: '14px',
                fontWeight: 500
            }}>
                BILD PÅ BIL
            </div>
            <div style={{ padding: '24px 20px' }}>
                <div style={{ marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#171a20', marginBottom: '4px' }}>{title}</h3>
                    <span style={{ fontSize: '15px', color: '#5c5e62' }}>{price}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#5c5e62', marginBottom: '8px' }}>{specs}</p>
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>{location}</p>
            </div>
        </div>
    )
}
