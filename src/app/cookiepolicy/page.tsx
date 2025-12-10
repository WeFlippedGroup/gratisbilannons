"use client"

export default function Cookiepolicy() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Cookiepolicy</h1>
            <div className="prose">
                <p>GratisBilAnnons.se använder cookies för att förbättra din upplevelse.</p>

                <h2>Vad är en cookie?</h2>
                <p>En cookie är en liten textfil som lagras på din enhet när du besöker en webbplats. Den hjälper webbplatsen att komma ihåg dina inställningar och val.</p>

                <h2>Hur vi använder cookies</h2>
                <p>Vi använder nödvändiga cookies för att inloggning och annonsering ska fungera. Vi kan även använda analyscookies för att förstå hur besökare använder sidan, dock i anonymiserad form.</p>

                <h2>Hantering av cookies</h2>
                <p>Du kan när som helst ändra dina inställningar för cookies i din webbläsare eller via vår cookie-banner.</p>
            </div>

            <style jsx>{`
        .prose h2 { margin-top: 32px; margin-bottom: 16px; font-size: 20px; }
        .prose p { margin-bottom: 16px; line-height: 1.6; color: #393c41; }
      `}</style>
        </main>
    )
}
