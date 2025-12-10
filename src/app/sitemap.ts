import { MetadataRoute } from 'next'
import { MOCK_ADS } from '@/data/mockAds'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gratisbilannons.se'

    const ads = MOCK_ADS.map((ad) => ({
        url: `${baseUrl}/ads/${ad.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }))

    const routes = [
        '',
        '/ads',
        '/create-ad',
        '/om-oss',
        '/villkor',
        '/integritetspolicy',
        '/cookiepolicy'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.5,
    }))

    return [...routes, ...ads]
}
