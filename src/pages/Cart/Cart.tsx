import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'react-hot-toast';

export default function Cart() {
    const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
    const navigate = useNavigate();

    const subtotal = getTotalPrice();
    const shipping = subtotal > 0 ? 100 : 0; // Flat 100 BDT shipping, free could be added
    const total = subtotal + shipping;

    const handleRemove = (id: string, name: string) => {
        removeItem(id);
        toast.success(`${name} removed from cart`);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4">
                <Helmet>
                    <title>Shopping Cart | PujaSojja</title>
                </Helmet>
                <div className="bg-card p-10 rounded-3xl shadow-soft text-center max-w-lg w-full border border-primary/5">
                    <div className="bg-primary/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={48} className="text-primary/40" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your Cart is Empty</h2>
                    <p className="text-dark-text/70 mb-8">
                        Looks like you haven't added any divine items to your cart yet.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center justify-center w-full bg-secondary text-primary py-4 rounded-xl font-bold hover:bg-secondary-light transition-all shadow-gold group"
                    >
                        Continue Shopping
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Helmet>
                <title>Shopping Cart ({items.length}) | PujaSojja</title>
                <meta name="description" content="Review your selected religious items and proceed to secure checkout." />
            </Helmet>

            {/* Page Header */}
            <div className="bg-primary pt-10 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">Shopping Bag</h1>
                    <p className="text-white/70">Review your sacred selections</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items List */}
                    <div className="lg:w-2/3 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-card p-4 md:p-6 rounded-2xl shadow-soft border border-primary/5 flex flex-col sm:flex-row items-center gap-6"
                            >
                                {/* Image */}
                                <Link to={`/product/${item.id}`} className="w-full sm:w-28 h-28 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 block">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </Link>

                                {/* Info */}
                                <div className="flex-grow text-center sm:text-left">
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="text-lg font-serif font-bold text-primary hover:text-secondary transition-colors mb-1">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-primary/50 uppercase tracking-widest font-bold mb-3">{item.category}</p>
                                    <div className="text-primary font-bold text-lg">
                                        ৳{item.salePrice || item.price}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col items-center sm:items-end gap-4 shrink-0 w-full sm:w-auto">
                                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-2 hover:bg-gray-200 transition-colors text-primary"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-bold text-primary text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-2 hover:bg-gray-200 transition-colors text-primary"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(item.id, item.name)}
                                        className="text-sm text-red-500 font-medium hover:text-red-700 flex items-center transition-colors"
                                    >
                                        <Trash2 size={16} className="mr-1" /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4">
                            <Link to="/shop" className="inline-flex items-center text-primary font-bold hover:text-primary-light transition-colors">
                                <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8 border border-primary/5 sticky top-28">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b border-gray-100 pb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-dark-text/80">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span className="font-bold text-primary">৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-dark-text/80">
                                    <span>Shipping Fee</span>
                                    <span className="font-bold text-primary">৳{shipping}</span>
                                </div>
                                {/* Future Coupon integration space */}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">Total</span>
                                    <span className="text-2xl font-bold text-primary">৳{total}</span>
                                </div>
                                <p className="text-xs text-primary/50 text-right mt-1">VAT included where applicable</p>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-light transition-all shadow-lg"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight size={20} />
                            </button>

                            <div className="mt-6 flex items-center justify-center space-x-4 opacity-50">
                                {/* Decorative trust indicators */}
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}