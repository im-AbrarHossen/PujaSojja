import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Filter,
    SlidersHorizontal,
    Search,
    ChevronDown,
    X,
    LayoutGrid,
    List
} from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';
import { type Product } from '../../types/product';

// Mock Data (In a real app, this will come from Firestore)
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Handcrafted Ganesha Idol',
        slug: 'ganesha-idol',
        description: 'Beautifully handcrafted Ganesha idol.',
        price: 1500,
        salePrice: 1250,
        images: ['https://images.unsplash.com/photo-1567591974574-e8627d704fbf?auto=format&fit=crop&q=80&w=500'],
        category: 'Idols',
        stock: 10,
        rating: 4.8,
        numReviews: 24,
        isFeatured: true,
        isNewArrival: true,
        isBestSeller: true,
        tags: ['ganesha', 'idol', 'puja'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        name: 'Brass Peacock Diya',
        slug: 'peacock-diya',
        description: 'Traditional brass diya with peacock design.',
        price: 999,
        salePrice: 850,
        images: ['https://images.unsplash.com/photo-1605335032514-699a77764a78?auto=format&fit=crop&q=80&w=500'],
        category: 'Diyas',
        stock: 50,
        rating: 4.5,
        numReviews: 18,
        isFeatured: false,
        isNewArrival: true,
        isBestSeller: false,
        tags: ['diya', 'brass', 'peacock'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '3',
        name: 'Sandalwood Incense Sticks',
        slug: 'incense-sticks',
        description: 'Premium quality sandalwood incense.',
        price: 350,
        images: ['https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?auto=format&fit=crop&q=80&w=500'],
        category: 'Incense',
        stock: 100,
        rating: 4.9,
        numReviews: 42,
        isFeatured: true,
        isNewArrival: false,
        isBestSeller: true,
        tags: ['incense', 'sandalwood'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '4',
        name: 'Copper Puja Thali',
        slug: 'puja-thali',
        description: 'Pure copper puja thali set.',
        price: 2500,
        salePrice: 2200,
        images: ['https://images.unsplash.com/photo-1630574044521-17180373747b?auto=format&fit=crop&q=80&w=500'],
        category: 'Thali Sets',
        stock: 15,
        rating: 4.7,
        numReviews: 12,
        isFeatured: false,
        isNewArrival: false,
        isBestSeller: false,
        tags: ['thali', 'copper', 'puja'],
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

const categories = ['All', 'Idols', 'Diyas', 'Incense', 'Thali Sets', 'Decor', 'Vastu'];

export default function Shop() {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(5000);
    const [sortBy, setSortBy] = useState('newest');

    // Filtering Logic
    useEffect(() => {
        let filtered = MOCK_PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            const matchesPrice = (p.salePrice || p.price) <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sorting Logic
        if (sortBy === 'price-low') filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        if (sortBy === 'price-high') filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

        setProducts(filtered);
    }, [searchQuery, selectedCategory, priceRange, sortBy]);

    return (
        <div className="min-h-screen bg-background pb-20">
            <Helmet>
                <title>Shop All Products | PujaSojja</title>
                <meta name="description" content="Explore our complete collection of premium puja items, idols, and religious decor." />
            </Helmet>

            {/* Shop Header */}
            <div className="bg-primary pt-10 pb-20 md:pt-16 md:pb-28">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">Divine Collection</h1>
                    <p className="text-white/70 max-w-xl mx-auto">Browse through our sacred collection curated for your spiritual journey.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10">
                <div className="bg-card rounded-2xl shadow-soft p-4 md:p-6 mb-8 border border-primary/5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                        {/* Search Bar */}
                        <div className="relative flex-grow max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
                            <input
                                type="text"
                                placeholder="Search for products (e.g. Ganesha, Diya...)"
                                className="w-full pl-12 pr-4 py-3 bg-background border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Mobile Filter Button & Sort */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-primary text-secondary px-4 py-3 rounded-xl font-bold text-sm shadow-gold"
                            >
                                <Filter size={18} /> Filters
                            </button>

                            <div className="relative flex-grow lg:flex-grow-0">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full lg:w-48 appearance-none bg-background border border-gray-100 px-4 py-3 rounded-xl focus:outline-none text-sm font-medium pr-10 cursor-pointer"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Best Rating</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-8">
                        {/* Categories Filter */}
                        <div>
                            <h3 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                                <LayoutGrid size={18} className="text-secondary" /> Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                            ? 'bg-primary text-secondary font-bold'
                                            : 'hover:bg-primary/5 text-dark-text/70'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <h3 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                                <SlidersHorizontal size={18} className="text-secondary" /> Price Range
                            </h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="100"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-primary cursor-pointer"
                            />
                            <div className="flex justify-between text-xs font-bold text-primary/60 mt-2">
                                <span>৳0</span>
                                <span>Max: ৳{priceRange}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-card rounded-2xl p-20 text-center border border-dashed border-primary/20">
                                <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={40} className="text-primary/20" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-2">No Products Found</h3>
                                <p className="text-dark-text/50">Try adjusting your filters or search keywords.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSearchQuery('');
                                        setPriceRange(5000);
                                    }}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
                <div className={`absolute inset-y-0 right-0 w-full max-w-xs bg-background transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-serif font-bold text-primary">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-primary/5 rounded-full">
                                <X size={24} className="text-primary" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-8 pr-2">
                            {/* Mobile Categories */}
                            <div>
                                <h3 className="text-sm uppercase tracking-widest font-bold text-primary/50 mb-4">Categories</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${selectedCategory === cat
                                                ? 'bg-primary border-primary text-secondary'
                                                : 'border-gray-200 text-dark-text/70'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Price */}
                            <div>
                                <h3 className="text-sm uppercase tracking-widest font-bold text-primary/50 mb-4">Price Range</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="text-center font-bold text-primary mt-2">Up to ৳{priceRange}</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full bg-primary text-secondary py-4 rounded-xl font-bold shadow-gold mt-6"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}