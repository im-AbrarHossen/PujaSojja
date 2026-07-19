import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';

// Mock Data for Products (Future: Fetch from Firestore)
const products = [
    {
        id: '1',
        name: 'Handcrafted Ganesha Idol',
        price: 1250,
        oldPrice: 1500,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1567591974574-e8627d704fbf?auto=format&fit=crop&q=80&w=500',
        category: 'Idols'
    },
    {
        id: '2',
        name: 'Brass Peacock Diya Set',
        price: 850,
        oldPrice: 999,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1605335032514-699a77764a78?auto=format&fit=crop&q=80&w=500',
        category: 'Diyas'
    },
    {
        id: '3',
        name: 'Premium Sandalwood Incense',
        price: 350,
        oldPrice: null,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?auto=format&fit=crop&q=80&w=500',
        category: 'Incense'
    },
    {
        id: '4',
        name: 'Royal Copper Puja Thali',
        price: 2200,
        oldPrice: 2500,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1630574044521-17180373747b?auto=format&fit=crop&q=80&w=500',
        category: 'Thali Sets'
    }
];

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-background/50">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                        Divine Bestsellers
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
                    <p className="text-dark-text/70 max-w-2xl mx-auto">
                        Bring home the blessings with our most loved and premium collections, trusted by thousands of devotees.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-primary/5"
                        >
                            {/* Product Image Area */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Icons */}
                                <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                    <button className="bg-white p-2.5 rounded-full text-primary hover:bg-secondary hover:text-primary shadow-lg transition-colors">
                                        <Heart size={18} />
                                    </button>
                                </div>

                                {/* Discount Badge */}
                                {product.oldPrice && (
                                    <div className="absolute top-4 left-4 bg-primary text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                                        Sale
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <p className="text-[10px] text-primary/50 uppercase tracking-[2px] font-bold mb-1">
                                    {product.category}
                                </p>
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="text-lg font-serif font-bold text-primary mb-2 hover:text-secondary transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Rating */}
                                <div className="flex items-center space-x-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${i < product.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-400 ml-1">(24)</span>
                                </div>

                                {/* Price & Action */}
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <span className="text-xl font-bold text-primary">৳{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-gray-400 line-through ml-2">৳{product.oldPrice}</span>
                                        )}
                                    </div>
                                    <button className="bg-primary text-secondary p-2.5 rounded-lg hover:bg-primary-light transition-colors shadow-soft group-hover:animate-pulse">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <Link
                        to="/shop"
                        className="inline-flex items-center space-x-2 border-2 border-primary text-primary px-10 py-3 rounded font-bold hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        <span>Explore All Products</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}