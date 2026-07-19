import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'react-hot-toast';

export default function Wishlist() {
    const { items, removeItem } = useWishlistStore();
    const { addItem } = useCartStore();

    const handleMoveToCart = (item: any) => {
        addItem(item, 1);
        removeItem(item.id);
        toast.success(`${item.name} moved to cart!`);
    };

    const handleRemove = (id: string, name: string) => {
        removeItem(id);
        toast.success(`${name} removed from wishlist.`);
    };

    // Empty State
    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 pt-24">
                <Helmet>
                    <title>My Wishlist | PujaSojja</title>
                </Helmet>
                <div className="bg-card p-10 rounded-3xl shadow-soft text-center max-w-lg w-full border border-primary/5">
                    <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={48} className="text-red-300" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">Wishlist is Empty</h2>
                    <p className="text-dark-text/70 mb-8">
                        You haven't saved any items to your wishlist yet. Explore our collection and save your favorites!
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center w-full bg-secondary text-primary py-4 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-gold group"
                    >
                        Explore Products
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    // Populated State
    return (
        <div className="min-h-screen bg-background pb-20 pt-20 md:pt-24">
            <Helmet>
                <title>My Wishlist ({items.length}) | PujaSojja</title>
                <meta name="description" content="View your saved religious and puja items." />
            </Helmet>

            {/* Page Header */}
            <div className="bg-primary py-12 mb-10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2 flex items-center justify-center gap-3">
                        <Heart className="fill-secondary text-secondary" size={32} />
                        My Wishlist
                    </h1>
                    <p className="text-white/70">Your personalized collection of divine items</p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 border border-primary/5 flex flex-col h-full group"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <Link to={`/product/${item.id}`}>
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </Link>

                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(item.id, item.name)}
                                    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white shadow-md transition-colors"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex flex-col flex-grow">
                                <p className="text-[10px] text-primary/50 uppercase tracking-[2px] font-bold mb-1.5">
                                    {item.category}
                                </p>
                                <Link to={`/product/${item.id}`} className="block mb-3">
                                    <h3 className="text-lg font-serif font-bold text-primary hover:text-secondary transition-colors line-clamp-2 leading-tight">
                                        {item.name}
                                    </h3>
                                </Link>

                                {/* Price & Action */}
                                <div className="mt-auto space-y-4">
                                    <div className="flex flex-col">
                                        {item.salePrice ? (
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-xl font-bold text-primary">৳{item.salePrice}</span>
                                                <span className="text-sm text-gray-400 line-through">৳{item.price}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xl font-bold text-primary">৳{item.price}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="w-full bg-primary text-secondary py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-all shadow-soft flex items-center justify-center gap-2 group/btn"
                                    >
                                        <ShoppingCart size={18} />
                                        <span>Move to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}