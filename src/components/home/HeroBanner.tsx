import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import bannerImg from '../../assets/banner.jpg';
import patternImg from '../../assets/textured-paper.png';

export default function HeroBanner() {
    return (
        <section className="relative h-[80vh] md:h-[85vh] flex items-center overflow-hidden bg-primary">
            {/* Background Pattern / Subtle Image Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url(${patternImg})`, // Subtle paper/texture pattern
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                }}
            ></div>

            {/* Royal Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>

            {/* Background Image Placeholder (Can be updated from Admin) */}
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0">
                <img
                    src={bannerImg}
                    alt="Divine Puja Collection"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="max-w-2xl lg:max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-full text-secondary mb-6 animate-fade-in">
                        <Sparkles size={16} />
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Divine Collection 2024</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
                        Elevate Your <span className="text-secondary italic">Spiritual</span> Experience
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
                        Discover a curated collection of premium Puja essentials, hand-crafted idols, and festive decor to bring peace and prosperity to your home.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/shop"
                            className="w-full sm:w-auto bg-secondary text-primary px-8 py-4 rounded font-bold flex items-center justify-center hover:bg-secondary-light transition-all duration-300 shadow-gold group"
                        >
                            Shop Now
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>

                        <Link
                            to="/festival"
                            className="w-full sm:w-auto border border-white/30 text-white hover:bg-white hover:text-primary px-8 py-4 rounded font-bold transition-all duration-300 flex items-center justify-center"
                        >
                            Festival Specials
                        </Link>
                    </div>

                    {/* Trust Indicators (Optional) */}
                    <div className="mt-12 flex items-center space-x-8 text-white/40">
                        <div className="text-center">
                            <span className="block text-2xl font-serif font-bold text-secondary">500+</span>
                            <span className="text-[10px] uppercase tracking-widest">Products</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="text-center">
                            <span className="block text-2xl font-serif font-bold text-secondary">10k+</span>
                            <span className="text-[10px] uppercase tracking-widest">Customers</span>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="text-center">
                            <span className="block text-2xl font-serif font-bold text-secondary">4.9/5</span>
                            <span className="text-[10px] uppercase tracking-widest">Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Decorative Edge */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg className="relative block w-full h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F5E6CC"></path>
                </svg>
            </div>
        </section>
    );
}