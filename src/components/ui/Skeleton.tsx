import React from 'react';

interface SkeletonProps {
    className?: string;
}

/**
 * Basic Skeleton component with a shimmering pulse effect.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div
            className={`animate-pulse bg-primary/10 rounded-lg ${className}`}
        />
    );
};

/**
 * Premium Product Card Skeleton
 * Mimics the look of our ProductCard.tsx during loading.
 */
export const ProductCardSkeleton = () => {
    return (
        <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-primary/5 flex flex-col h-full">
            {/* Image area skeleton */}
            <Skeleton className="aspect-[4/5] rounded-none" />

            <div className="p-5 space-y-4">
                {/* Category skeleton */}
                <Skeleton className="h-3 w-20" />

                {/* Title skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-2/3" />
                </div>

                {/* Rating skeleton */}
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-3 w-3 rounded-full" />
                    ))}
                </div>

                {/* Price & Button skeleton */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-20 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

/**
 * Category Item Skeleton
 * Mimics the FeaturedCategories.tsx items.
 */
export const CategorySkeleton = () => {
    return (
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-32" />
            </div>
        </div>
    );
};