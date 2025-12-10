"use client"

export default function OmOss() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Om GratisBilAnnons.se</h1>
            <div className="prose">
                <p><strong>Vår vision</strong> är enkel: Det ska vara helt gratis och krångelfritt att sälja och köpa bilar i Sverige.</p>

                <p>Vi tröttnade på dyra avgifter, röriga webbplatser och föråldrad teknik. Därför skapade vi GratisBilAnnons.se – en modern plattform inspirerad av ledande teknikföretag, byggd med fokus på användarvänlighet och design.</p>

                <p>Plattformen ägs och drivs av <strong>WeFlipped Group AB</strong>, ett svenskt teknikbolag som brinner för att bygga smarta digitala lösningar.</p>

                <p>Har du frågor eller förslag? Tveka inte att kontakta oss på <a href="mailto:kontakt@gratisbilannons.se" style={{ textDecoration: 'underline' }}>kontakt@gratisbilannons.se</a>.</p>
            </div>

            <style jsx>{`
        .prose p { margin-bottom: 20px; line-height: 1.6; color: #393c41; font-size: 16px; }
      `}</style>
        </main>
    )
}
