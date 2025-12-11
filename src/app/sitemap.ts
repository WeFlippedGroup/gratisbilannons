import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://gratisbilannons.se'

    // Fetch all ads
    const { data: ads } = await supabase
        .from('ads')
        .select('id, updated_at')

    const adUrls = (ads || []).map((ad) => ({
        url: `${baseUrl}/ads/${ad.id}`,
        lastModified: ad.updated_at || new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/ads`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1,
        },
        {
            url: `${baseUrl}/om-oss`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/create-ad`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...adUrls,
    ]
}
