import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Mock Data for Categories (Future: Fetch from Firestore)
const categories = [
    {
        id: '1',
        name: 'Divine Idols',
        image: 'https://images.unsplash.com/photo-1590059536250-14981303f901?auto=format&fit=crop&q=80&w=500',
        count: '120+ Items',
        path: '/category/idols'
    },
    {
        id: '2',
        name: 'Decorative Diyas',
        image: 'https://images.unsplash.com/photo-1605335032514-699a77764a78?auto=format&fit=crop&q=80&w=500',
        count: '80+ Items',
        path: '/category/diyas'
    },
    {
        id: '3',
        name: 'Puja Thali Sets',
        image: 'https://images.unsplash.com/photo-1630574044521-17180373747b?auto=format&fit=crop&q=80&w=500',
        count: '45+ Items',
        path: '/category/thali'
    },
    {
        id: '4',
        name: 'Incense & Fragrance',
        image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?auto=format&fit=crop&q=80&w=500',
        count: '60+ Items',
        path: '/category/incense'
    }
];

export default function FeaturedCategories() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                            Explore Sacred Collections
                        </h2>
                        <div className="w-20 h-1 bg-secondary mb-4"></div>
                        <p className="text-dark-text/70">
                            Browse through our curated selection of religious essentials, each crafted to bring spiritual harmony to your rituals.
                        </p>
                    </div>
                    <Link
                        to="/categories"
                        className="mt-6 md:mt-0 text-primary font-bold flex items-center hover:text-primary-light transition-colors group"
                    >
                        View All Categories
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.path}
                            className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-gold transition-all duration-500"
                        >
                            {/* Category Image */}
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {category.count}
                                </p>
                                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
                                    {category.name}
                                </h3>
                                <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                    <span>Explore Now</span>
                                    <ArrowRight size={16} className="ml-2" />
                                </div>
                            </div>

                            {/* Subtle Gold Border on Hover */}
                            <div className="absolute inset-0 border-2 border-secondary/0 group-hover:border-secondary/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}