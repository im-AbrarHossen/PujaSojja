import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ShoppingCart,
    Heart,
    Star,
    Truck,
    RotateCcw,
    ShieldCheck,
    Share2,
    Plus,
    Minus,
    CheckCircle2,
    ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductCard from '../../components/product/ProductCard';

// Mock Data for a single product (In future, fetch from Firestore using ID)
const MOCK_PRODUCT = {
    id: '1',
    name: 'Handcrafted Premium Ganesha Idol',
    slug: 'premium-ganesha-idol',
    description: 'This exquisite Ganesha idol is handcrafted by master artisans using premium materials. Perfect for your home altar or as a divine gift for loved ones. The intricate detailing reflects the spiritual elegance and traditional craftsmanship that has been passed down through generations.',
    shortDescription: 'Pure handcrafted brass idol with gold finish. Ideal for home and office puja.',
    price: 1500,
    salePrice: 1250,
    images: [
        'https://images.unsplash.com/photo-1567591974574-e8627d704fbf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1590059536250-14981303f901?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1630574044521-17180373747b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Idols',
    stock: 12,
    rating: 4.9,
    numReviews: 48,
    specifications: [
        { key: 'Material', value: 'Pure Brass' },
        { key: 'Weight', value: '1.2 KG' },
        { key: 'Dimensions', value: '8 x 5 x 4 Inches' },
        { key: 'Color', value: 'Antique Gold' }
    ],
    reviews: [
        { id: 'r1', userName: 'Amit Roy', rating: 5, comment: 'Simply beautiful! The details are amazing.', date: '2 days ago' },
        { id: 'r2', userName: 'Sumi Das', rating: 4, comment: 'Very high quality, looks royal.', date: '1 week ago' }
    ]
};

// Mock Related Products
const RELATED_PRODUCTS = [
    {
        id: '2',
        name: 'Brass Peacock Diya',
        price: 999,
        salePrice: 850,
        images: ['https://images.unsplash.com/photo-1605335032514-699a77764a78?auto=format&fit=crop&q=80&w=500'],
        category: 'Diyas',
        rating: 4.5,
        numReviews: 12,
        isFeatured: false, isNewArrival: true, isBestSeller: false,
    },
    {
        id: '3',
        name: 'Sandalwood Incense',
        price: 350,
        images: ['https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?auto=format&fit=crop&q=80&w=500'],
        category: 'Incense',
        rating: 5,
        numReviews: 42,
        isFeatured: true, isNewArrival: false, isBestSeller: true,
    }
];

export default function ProductDetails() {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const handleAddToCart = () => {
        toast.success(`${MOCK_PRODUCT.name} added to cart!`);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Helmet>
                <title>{MOCK_PRODUCT.name} | PujaSojja</title>
                <meta name="description" content={MOCK_PRODUCT.shortDescription} />
            </Helmet>

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center space-x-2 text-sm text-dark-text/50">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/shop" className="hover:text-primary">Shop</Link>
                    <ChevronRight size={14} />
                    <span className="text-primary font-medium truncate">{MOCK_PRODUCT.name}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card rounded-3xl p-6 md:p-10 shadow-soft border border-primary/5">

                    {/* Left: Product Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
                            <img
                                src={MOCK_PRODUCT.images[activeImage]}
                                alt={MOCK_PRODUCT.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <button
                                onClick={handleShare}
                                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-secondary transition-colors"
                            >
                                <Share2 size={20} className="text-primary" />
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {MOCK_PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-secondary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="bg-secondary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-secondary/30">
                                    {MOCK_PRODUCT.category}
                                </span>
                                {MOCK_PRODUCT.stock > 0 ? (
                                    <span className="flex items-center text-green-600 text-xs font-bold">
                                        <CheckCircle2 size={14} className="mr-1" /> In Stock
                                    </span>
                                ) : (
                                    <span className="text-red-600 text-xs font-bold">Out of Stock</span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 leading-tight">
                                {MOCK_PRODUCT.name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex items-center text-secondary">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className={`${i < Math.floor(MOCK_PRODUCT.rating) ? 'fill-secondary' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-dark-text/50 font-medium">({MOCK_PRODUCT.numReviews} Customer Reviews)</span>
                            </div>

                            <div className="flex items-baseline space-x-3 mb-8">
                                <span className="text-4xl font-bold text-primary">৳{MOCK_PRODUCT.salePrice || MOCK_PRODUCT.price}</span>
                                {MOCK_PRODUCT.salePrice && (
                                    <span className="text-xl text-gray-400 line-through">৳{MOCK_PRODUCT.price}</span>
                                )}
                            </div>

                            <p className="text-dark-text/70 leading-relaxed mb-8">
                                {MOCK_PRODUCT.shortDescription}
                            </p>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-6 mt-auto">
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="p-3 hover:bg-gray-200 transition-colors text-primary"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-primary">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="p-3 hover:bg-gray-200 transition-colors text-primary"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button className="p-3 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all text-gray-400 hover:text-red-500">
                                    <Heart size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-light transition-all shadow-lg"
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="w-full bg-secondary text-primary py-4 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-gold">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Features Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-10 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                                <Truck className="text-secondary" size={24} />
                                <span className="text-xs font-medium text-dark-text/70">Fast Nationwide Shipping</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RotateCcw className="text-secondary" size={24} />
                                <span className="text-xs font-medium text-dark-text/70">7 Day Easy Returns</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <ShieldCheck className="text-secondary" size={24} />
                                <span className="text-xs font-medium text-dark-text/70">100% Genuine Product</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Tabs (Description, Specs, Reviews) */}
                <div className="mt-16 bg-card rounded-3xl shadow-soft border border-primary/5 overflow-hidden">
                    <div className="flex border-b border-gray-100 overflow-x-auto">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-5 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-primary border-b-2 border-secondary bg-primary/5' : 'text-gray-400 hover:text-primary'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-10">
                        {activeTab === 'description' && (
                            <div className="prose prose-primary max-w-none">
                                <p className="text-dark-text/70 leading-relaxed text-lg">
                                    {MOCK_PRODUCT.description}
                                </p>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="max-w-2xl">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {MOCK_PRODUCT.specifications.map((spec, i) => (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-background' : ''}>
                                                <td className="py-4 px-6 font-bold text-primary w-1/3">{spec.key}</td>
                                                <td className="py-4 px-6 text-dark-text/70">{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                {MOCK_PRODUCT.reviews.map((rev) => (
                                    <div key={rev.id} className="border-b border-gray-100 pb-6 last:border-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-bold text-primary">{rev.userName}</h4>
                                            <span className="text-xs text-gray-400">{rev.date}</span>
                                        </div>
                                        <div className="flex text-secondary mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className={`${i < rev.rating ? 'fill-secondary' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <p className="text-dark-text/70 italic text-sm">"{rev.comment}"</p>
                                    </div>
                                ))}
                                <button className="bg-primary text-secondary px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-all">
                                    Write a Review
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-serif font-bold text-primary">Related Divine Items</h2>
                        <Link to="/shop" className="text-primary font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Using any to cast mock data as Product type for display */}
                        {RELATED_PRODUCTS.map((prod) => (
                            <ProductCard key={prod.id} product={prod as any} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}