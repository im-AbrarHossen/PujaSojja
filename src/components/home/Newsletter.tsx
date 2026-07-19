import React, { useState } from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Thank you for subscribing! Check your inbox for the discount code.');
            setEmail('');
            setLoading(false);
        }, 1500);
    };

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="relative bg-primary rounded-[2rem] overflow-hidden shadow-2xl border border-secondary/20">

                    {/* Background Decorative Patterns */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative z-10 px-6 py-16 md:p-20 flex flex-col lg:flex-row items-center justify-between">

                        {/* Text Content */}
                        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
                            <div className="inline-flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full text-secondary mb-6">
                                <Sparkles size={14} />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[2px]">Exclusive Offer</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                                Join Our Spiritual <span className="text-secondary">Community</span>
                            </h2>
                            <p className="text-white/70 text-lg mb-0 max-w-lg">
                                Subscribe to our newsletter and get <span className="text-secondary font-bold">10% OFF</span> on your first order. Stay updated with festival collections and divine offers.
                            </p>
                        </div>

                        {/* Subscription Form */}
                        <div className="lg:w-5/12 w-full">
                            <form onSubmit={handleSubscribe} className="relative">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-secondary/50" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-secondary transition-all"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto bg-secondary text-primary px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-secondary-light transition-all duration-300 shadow-gold whitespace-nowrap disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <span className="animate-pulse">Subscribing...</span>
                                        ) : (
                                            <>
                                                Subscribe <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="mt-4 text-center lg:text-left text-xs text-white/40">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}