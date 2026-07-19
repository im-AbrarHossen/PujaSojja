import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'product';
    schema?: any; // Optional JSON-LD structured data
}

/**
 * Dynamic SEO Component for PujaSojja
 * Handles Meta Tags, Open Graph, Twitter Cards, and Structured Data.
 */
const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    schema
}) => {
    const siteName = 'PujaSojja';
    const defaultDescription = 'Premium destination for handcrafted Puja idols, religious essentials, and festive decor.';
    const defaultKeywords = 'Puja items online, Hindu religious store, Ganesha idols, Brass diyas, Puja thali, Bangladesh spiritual store';
    const defaultImage = 'https://pujasojja.com/og-image.jpg'; // Future: Replace with actual hosted OG image
    const siteUrl = 'https://pujasojja.com';

    const seoTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Religious Items Store`;
    const seoDescription = description || defaultDescription;
    const seoKeywords = keywords || defaultKeywords;
    const seoImage = image || defaultImage;
    const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={seoKeywords} />
            <link rel="canonical" href={seoUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* App Specific Tags */}
            <meta name="theme-color" content="#3B0A0A" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

            {/* Structured Data (JSON-LD) for Rich Snippets */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;