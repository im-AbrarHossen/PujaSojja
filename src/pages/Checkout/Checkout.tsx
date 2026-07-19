import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../store/useCartStore';
import { toast } from 'react-hot-toast';
import {
    MapPin,
    CreditCard,
    Wallet,
    ShieldCheck,
    Loader2,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

export default function Checkout() {
    const { user } = useAuth();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');

    // Shipping Details State
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.displayName || '',
        phone: '',
        address: '',
        city: 'Dhaka',
        postalCode: ''
    });

    const subtotal = getTotalPrice();
    const shippingFee = subtotal > 0 ? 100 : 0;
    const total = subtotal + shippingFee;

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0 && !loading) {
            navigate('/cart');
        }
    }, [items, navigate, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
            toast.error('Please fill in all required shipping details.');
            return;
        }

        try {
            setLoading(true);

            // Create order object for Firestore
            const orderData = {
                userId: user?.uid || 'guest',
                customerName: shippingInfo.fullName,
                customerEmail: user?.email || 'guest@noemail.com',
                shippingAddress: shippingInfo,
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.salePrice || item.price,
                    quantity: item.quantity,
                    image: item.images[0]
                })),
                subtotal,
                shippingFee,
                totalAmount: total,
                paymentMethod,
                paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid', // Simplified for Online Gateway
                orderStatus: 'Processing',
                createdAt: serverTimestamp(),
            };

            // Save to Firestore
            const docRef = await addDoc(collection(db, 'orders'), orderData);

            // Online Payment Gateway Simulation (Like SSLCommerz / Stripe)
            if (paymentMethod === 'ONLINE') {
                toast.loading('Redirecting to secure payment gateway...', { duration: 2000 });
                // Here you would normally redirect to your payment gateway URL
                // For now, we simulate a successful payment after 2 seconds
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            toast.success('Order placed successfully!');
            clearCart();
            // Redirect to a success page or orders page
            navigate('/', { replace: true });

            // Note: We can create an OrderSuccess page later to replace the home redirect

        } catch (error) {
            console.error('Checkout Error:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return null; // Prevent flash before redirect

    return (
        <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
            <Helmet>
                <title>Secure Checkout | PujaSojja</title>
            </Helmet>

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/cart" className="inline-flex items-center text-primary font-bold hover:text-primary-light transition-colors mb-4">
                        <ArrowLeft size={16} className="mr-2" /> Back to Cart
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">Checkout</h1>
                </div>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Form Details */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Shipping Information */}
                        <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8 border border-primary/5">
                            <h2 className="text-xl font-serif font-bold text-primary mb-6 flex items-center">
                                <MapPin className="mr-3 text-secondary" /> Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        placeholder="+880 1XXX XXXXXX"
                                        className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary/70 mb-2">City *</label>
                                    <select
                                        name="city"
                                        value={shippingInfo.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors appearance-none"
                                        required
                                    >
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Chittagong">Chittagong</option>
                                        <option value="Sylhet">Sylhet</option>
                                        <option value="Khulna">Khulna</option>
                                        <option value="Rajshahi">Rajshahi</option>
                                        <option value="Barisal">Barisal</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Mymensingh">Mymensingh</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Detailed Address *</label>
                                    <textarea
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        placeholder="House number, Street, Area..."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-primary/70 mb-2">Postal/Zip Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={shippingInfo.postalCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-card rounded-2xl shadow-soft p-6 md:p-8 border border-primary/5">
                            <h2 className="text-xl font-serif font-bold text-primary mb-6 flex items-center">
                                <CreditCard className="mr-3 text-secondary" /> Payment Method
                            </h2>

                            <div className="space-y-4">
                                {/* Cash on Delivery */}
                                <label className={`block relative border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-secondary bg-secondary/5' : 'border-gray-100 hover:border-secondary/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={() => setPaymentMethod('COD')}
                                        className="absolute opacity-0"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-secondary' : 'border-gray-300'}`}>
                                                {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>}
                                            </div>
                                            <Wallet className={paymentMethod === 'COD' ? 'text-primary' : 'text-gray-400'} size={24} />
                                            <div>
                                                <span className="block font-bold text-primary">Cash on Delivery</span>
                                                <span className="text-xs text-dark-text/60">Pay when you receive your order</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                {/* Online Payment */}
                                <label className={`block relative border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'ONLINE' ? 'border-secondary bg-secondary/5' : 'border-gray-100 hover:border-secondary/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="ONLINE"
                                        checked={paymentMethod === 'ONLINE'}
                                        onChange={() => setPaymentMethod('ONLINE')}
                                        className="absolute opacity-0"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'ONLINE' ? 'border-secondary' : 'border-gray-300'}`}>
                                                {paymentMethod === 'ONLINE' && <div className="w-2.5 h-2.5 bg-secondary rounded-full"></div>}
                                            </div>
                                            <CreditCard className={paymentMethod === 'ONLINE' ? 'text-primary' : 'text-gray-400'} size={24} />
                                            <div>
                                                <span className="block font-bold text-primary">Online Payment</span>
                                                <span className="text-xs text-dark-text/60">bKash, Nagad, Visa, MasterCard</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-primary rounded-2xl shadow-soft p-6 md:p-8 text-white sticky top-28">
                            <h2 className="text-xl font-serif font-bold text-secondary mb-6 border-b border-white/10 pb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-lg bg-white/10 shrink-0 overflow-hidden">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-bold text-white/90 line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-secondary mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-sm">
                                            ৳{(item.salePrice || item.price) * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-white/70">
                                    <span>Subtotal</span>
                                    <span>৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>Shipping Fee</span>
                                    <span>৳{shippingFee}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg text-white">Total Amount</span>
                                    <span className="text-3xl font-bold text-secondary">৳{total}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary text-primary py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-secondary-light transition-all shadow-gold disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} />
                                        <span>Place Order</span>
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex items-center justify-center text-xs text-white/50 space-x-1">
                                <CheckCircle2 size={12} />
                                <span>100% Secure & Encrypted Checkout</span>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}