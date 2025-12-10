import { MOCK_ADS } from '@/data/mockAds'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import AdDetails from '@/components/AdDetails'

type Props = {
    params: Promise<{ id: string }>
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const ad = MOCK_ADS.find(a => a.id === parseInt(id))

    if (!ad) {
        return {
            title: 'Annons ej hittad',
        }
    }

    return {
        title: `${ad.brand} ${ad.title} (${ad.year}) - ${ad.price.toLocaleString()} kr`,
        description: `Köp ${ad.title} i ${ad.location}. ${ad.year} årsmodell, ${ad.miles} mil. ${ad.fuel}, ${ad.gearbox}. Pris: ${ad.price} kr.`,
        openGraph: {
            title: `${ad.title} | GratisBilAnnons.se`,
            description: `Köp denna ${ad.brand} för ${ad.price} kr i ${ad.location}.`,
            images: [ad.imageColor || ''], // In real app, this would be a URL
        },
    }
}

export default async function AdDetailsPage({ params }: Props) {
    const { id } = await params
    const ad = MOCK_ADS.find(a => a.id === parseInt(id))

    if (!ad) {
        return notFound()
    }

    const images = ad.images || [ad.imageColor || '#f4f4f4']

    // Structured Data for AI Search (schema.org/Vehicle)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        name: ad.title,
        image: images, // Should be real URLs
        description: ad.description,
        brand: {
            '@type': 'Brand',
            name: ad.brand,
        },
        model: ad.title.replace(ad.brand, '').trim(), // Rough extraction
        vehicleModelDate: ad.year,
        mileageFromOdometer: {
            '@type': 'QuantitativeValue',
            value: ad.miles,
            unitCode: 'KMT', // Kilometers
        },
        fuelType: ad.fuel,
        vehicleTransmission: ad.gearbox,
        offers: {
            '@type': 'Offer',
            price: ad.price,
            priceCurrency: 'SEK',
            availability: 'https://schema.org/InStock',
        },
    }

    return (
        <>
            <JsonLd data={jsonLd} />
            <AdDetails ad={ad} />
        </>
    )
}
