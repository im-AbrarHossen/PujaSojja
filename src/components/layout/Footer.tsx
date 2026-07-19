import React from 'react';
import { Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    CreditCard
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { name: 'All Products', path: '/shop' },
            { name: 'New Arrivals', path: '/new-arrivals' },
            { name: 'Best Sellers', path: '/best-sellers' },
            { name: 'Festival Specials', path: '/festival' },
            { name: 'Offers & Discounts', path: '/offers' },
        ],
        support: [
            { name: 'Track Order', path: '/track-order' },
            { name: 'Shipping Policy', path: '/shipping-policy' },
            { name: 'Refund Policy', path: '/refund-policy' },
            { name: 'FAQs', path: '/faq' },
            { name: 'Contact Us', path: '/contact' },
        ],
        legal: [
            { name: 'Privacy Policy', path: '/privacy-policy' },
            { name: 'Terms & Conditions', path: '/terms' },
            { name: 'Disclaimer', path: '/disclaimer' },
        ]
    };

    return (
        <footer className="bg-primary-dark text-white pt-16">
            {/* Brand Promise Section */}
            <div className="container mx-auto px-4 pb-12 border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full">
                            <ShieldCheck className="text-secondary h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">100% Authentic</h4>
                            <p className="text-xs text-white/50">Genuine Religious Items</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full">
                            <Truck className="text-secondary h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Fast Delivery</h4>
                            <p className="text-xs text-white/50">Across the Country</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full">
                            <RotateCcw className="text-secondary h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Easy Returns</h4>
                            <p className="text-xs text-white/50">7-Day Return Policy</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full">
                            <CreditCard className="text-secondary h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Secure Payment</h4>
                            <p className="text-xs text-white/50">100% Safe Checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-serif font-bold text-secondary tracking-wider">
                            PujaSojja
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Your one-stop destination for premium Puja essentials and spiritual items. We bring elegance and tradition to your home for every festival.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
                                <FaFacebook size={18} />
                            </a>
                            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all duration-300">
                                <FaYoutube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-secondary mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-white/60 hover:text-secondary text-sm flex items-center group transition-colors">
                                        <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-secondary mb-6">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-white/60 hover:text-secondary text-sm flex items-center group transition-colors">
                                        <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-secondary mb-6">Contact Us</h4>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3 text-sm text-white/60">
                                <MapPin size={18} className="text-secondary shrink-0" />
                                <span>123 Temple Road, Spiritual Plaza, Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-white/60">
                                <Phone size={18} className="text-secondary shrink-0" />
                                <span>+880 1234 567 890</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-white/60">
                                <Mail size={18} className="text-secondary shrink-0" />
                                <span>support@pujasojja.com</span>
                            </div>
                        </div>

                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Join Our Newsletter</h4>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-secondary/50 transition-colors"
                            />
                            <button className="absolute right-2 top-2 bg-secondary text-primary p-1.5 rounded hover:bg-secondary-light transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black/30 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white/40 text-xs mb-4 md:mb-0">
                        © {currentYear} PujaSojja. All rights reserved. Developed with devotion.
                    </p>
                    <div className="flex space-x-6">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.name} to={link.path} className="text-white/40 hover:text-secondary text-[10px] uppercase tracking-widest">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}