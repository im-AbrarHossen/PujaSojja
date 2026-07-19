/**
 * Product-related TypeScript interfaces for PujaSojja
 */

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    price: number;
    salePrice?: number; // Discounted price
    images: string[]; // Array of Cloudinary URLs
    category: string;
    subCategory?: string;
    stock: number;
    sku?: string;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    isNewArrival: boolean;
    isBestSeller: boolean;
    tags: string[];
    variants?: ProductVariant[];
    specifications?: ProductSpecification[];
    seo?: SEOData;
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp
}

export interface ProductVariant {
    id: string;
    name: string; // e.g., Size, Material, Weight
    options: string[]; // e.g., ['Small', 'Medium', 'Large']
}

export interface ProductSpecification {
    key: string; // e.g., Material
    value: string; // e.g., Brass
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string; // Cloudinary URL
    description?: string;
    itemCount?: number;
}

export interface SubCategory {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userImage?: string;
    rating: number;
    comment: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: any;
}

export interface SEOData {
    title?: string;
    description?: string;
    keywords?: string;
}