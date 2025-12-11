import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import AdDetails from '@/components/AdDetails'
import { supabase } from '@/lib/supabase'

type Props = {
    params: Promise<{ id: string }>
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params

    // Check if ID is numeric (mock/old) or UUID? 
    // Actually our Schema defines ads.id as bigint, so it's a number.

    // Fetch from Supabase
    const { data: ad } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .single()

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
            images: [ad.image_color || ''], // Use db field name
        },
    }
}

export default async function AdDetailsPage({ params }: Props) {
    const { id } = await params

    const { data: ad } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .single()

    if (!ad) {
        return notFound()
    }

    const images = ad.images || [ad.image_color || '#f4f4f4']

    // Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        name: ad.title,
        image: images,
        description: ad.description,
        brand: {
            '@type': 'Brand',
            name: ad.brand,
        },
        model: ad.model,
        vehicleModelDate: ad.year,
        mileageFromOdometer: {
            '@type': 'QuantitativeValue',
            value: ad.miles,
            unitCode: 'KMT',
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

    // Map DB fields to Component Props if necessary, or pass 'ad' (typing might need check)
    // AdDetails expects 'Ad' type. Let's ensure database matches or we cast.
    // Our Ad type in AdDetails.tsx: id: number, title: string...
    // DB returns keys like 'body_type' (snake_case) vs 'bodyType' (camelCase).
    // We need to normalize.

    const normalizedAd = {
        ...ad,
        bodyType: ad.body_type, // Map snake_case to camelCase
        color: ad.color,
        regNumber: ad.reg_number,
        imageColor: ad.image_color,
        seller: {
            name: ad.profiles?.full_name || ad.profiles?.nickname || 'Säljare',
            phone: ad.profiles?.phone,
            showPhone: ad.profiles?.show_phone,
            id: ad.profiles?.id
        }
    }

    return (
        <>
            <JsonLd data={jsonLd} />
            <AdDetails ad={normalizedAd} />
        </>
    )
}
