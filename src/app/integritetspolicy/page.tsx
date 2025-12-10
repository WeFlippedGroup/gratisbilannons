"use client"

export default function Integritetspolicy() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Integritetspolicy</h1>
            <div className="prose">
                <p>Din personliga integritet är viktig för oss på GratisBilAnnons.se och WeFlipped Group AB.</p>

                <h2>1. Insamling av data</h2>
                <p>Vi samlar in information som du tillhandahåller när du skapar ett konto eller lägger upp en annons, såsom namn, e-postadress, telefonnummer och information om ditt fordon.</p>

                <h2>2. Användning av data</h2>
                <p>Informationen används för att:
                    <ul>
                        <li>Tillhandahålla och administrera tjänsten.</li>
                        <li>Kommunicera med dig angående dina annonser.</li>
                        <li>Förbättra tjänstens funktionalitet och säkerhet.</li>
                    </ul>
                </p>

                <h2>3. Delning av data</h2>
                <p>Dina annonsuppgifter (inklusive kontaktuppgifter i annonsen) är publika. Vi säljer inte din personliga information till tredje part. Vi kan dela data med myndigheter om lagkrav föreligger.</p>

                <h2>4. Dina rättigheter</h2>
                <p>Du har rätt att begära utdrag, rättelse eller radering av dina personuppgifter. Kontakta oss på kontakt@gratisbilannons.se för ärenden gällande GDPR.</p>
            </div>

            <style jsx>{`
        .prose h2 { margin-top: 32px; margin-bottom: 16px; font-size: 20px; }
        .prose p { margin-bottom: 16px; line-height: 1.6; color: #393c41; }
        .prose ul { padding-left: 20px; list-style-type: disc; margin-bottom: 16px; }
      `}</style>
        </main>
    )
}
