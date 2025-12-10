import CreateAdForm from '@/components/CreateAdForm'

export default function CreateAdPage() {
    return (
        <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="title-large" style={{ marginBottom: '16px' }}>Ny annons</h1>
                <p className="title-medium" style={{ color: 'var(--gray-500)', fontSize: '24px' }}>Nå ut till hela Sverige.</p>
            </div>

            <CreateAdForm />
        </main>
    )
}
