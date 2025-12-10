"use client"

export default function Villkor() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Användarvillkor</h1>
            <div className="prose">
                <p>Senast uppdaterad: 2025-01-01</p>

                <h2>1. Allmänt</h2>
                <p>Välkommen till GratisBilAnnons.se, en tjänst tillhandahållen av WeFlipped Group AB (559535-6857). Genom att använda vår webbplats och våra tjänster godkänner du dessa villkor i sin helhet.</p>

                <h2>2. Tjänsten</h2>
                <p>GratisBilAnnons.se erbjuder en plattform för privatpersoner och företag att kostnadsfritt annonsera fordon till försäljning. Vi agerar endast som en teknisk mellanhand och är inte part i några transaktioner mellan köpare och säljare.</p>

                <h2>3. Annonsregler</h2>
                <p>Du ansvarar ensamt för innehållet i dina annonser. Annonser får inte innehålla olagligt material, stötande innehåll eller inkorrekt information. Vi förbehåller oss rätten att ta bort annonser som bryter mot våra riktlinjer utan föregående varning.</p>

                <h2>4. Ansvar</h2>
                <p>WeFlipped Group AB ansvarar inte för skador eller förluster som uppstår till följd av användning av tjänsten, inklusive men inte begränsat till tekniska fel, bedrägerier eller felaktig information i annonser.</p>

                <h2>5. Ändringar</h2>
                <p>Vi förbehåller oss rätten att när som helst ändra dessa villkor. Fortsatt användning av tjänsten efter ändringar innebär att du godkänner de nya villkoren.</p>
            </div>

            <style jsx>{`
        .prose h2 { margin-top: 32px; margin-bottom: 16px; font-size: 20px; }
        .prose p { margin-bottom: 16px; line-height: 1.6; color: #393c41; }
      `}</style>
        </main>
    )
}
