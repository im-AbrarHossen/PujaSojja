import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ShoppingBag, Search, Compass } from 'lucide-react';

/**
 * Premium 404 Not Found Page for PujaSojja.
 * Designed with the Dark Royal Theme to provide a helpful and aesthetic 
 * experience even when a page is missing.
 */
export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Helmet>
                <title>404 - Page Not Found | PujaSojja</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="max-w-2xl w-full text-center">
                {/* Decorative Icon Section */}
                <div className="relative mb-8 flex justify-center">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl w-48 h-48 mx-auto"></div>
                    <div className="relative bg-card p-8 rounded-full shadow-soft border border-primary/10">
                        <Compass size={80} className="text-secondary animate-pulse" />
                    </div>
                    <div className="absolute -bottom-4 bg-primary text-secondary px-6 py-2 rounded-full font-serif font-bold text-xl shadow-gold">
                        404
                    </div>
                </div>

                {/* Message Section */}
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                    The Path You Seek is <span className="text-secondary italic">Not Here</span>
                </h1>

                <p className="text-lg text-dark-text/70 mb-10 leading-relaxed max-w-lg mx-auto">
                    It seems you have wandered into an unknown path. Don't worry, even the
                    most devoted seekers sometimes lose their way. Let us guide you back to your spiritual journey.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto bg-primary text-secondary px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-primary-light transition-all shadow-lg group"
                    >
                        <Home size={20} className="mr-2 group-hover:-translate-y-1 transition-transform" />
                        Back to Home
                    </Link>

                    <Link
                        to="/shop"
                        className="w-full sm:w-auto bg-white text-primary border-2 border-primary/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-soft group"
                    >
                        <ShoppingBag size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                        Visit Shop
                    </Link>
                </div>

                {/* Quick Help / Search Hint */}
                <div className="mt-16 flex flex-col items-center">
                    <div className="flex items-center text-primary/40 space-x-2 text-sm font-medium mb-4">
                        <Search size={16} />
                        <span>Try searching for items like "Ganesha" or "Diyas"</span>
                    </div>
                    <div className="w-16 h-1 bg-secondary/30 rounded-full"></div>
                </div>

                <p className="mt-12 text-xs text-primary/30 uppercase tracking-[3px]">
                    © PujaSojja Spiritual Experience
                </p>
            </div>
        </div>
    );
}