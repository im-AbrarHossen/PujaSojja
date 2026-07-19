import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    ShoppingCart,
    Heart,
    User,
    Menu,
    X,
    LogOut,
    ShoppingBag,
    Settings
} from 'lucide-react';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { getTotalItems } = useCartStore();
    const { items: wishlistItems } = useWishlistStore();

    // Scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/categories' },
        { name: 'Festival Collection', path: '/festival' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary shadow-lg py-2' : 'bg-primary/95 py-4'
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-secondary p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl md:text-3xl font-serif font-bold text-secondary tracking-wider">
                            PujaSojja
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-white/90 hover:text-secondary font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-2 md:space-x-5">
                        <button className="text-secondary p-2 hover:bg-white/10 rounded-full transition-all">
                            <Search size={22} />
                        </button>

                        <Link to="/wishlist" className="hidden md:block text-secondary p-2 hover:bg-white/10 rounded-full transition-all relative">
                            <Heart size={22} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-1 right-1 bg-secondary text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="text-secondary p-2 hover:bg-white/10 rounded-full transition-all relative">
                            <ShoppingCart size={22} />
                            {getTotalItems() > 0 && (
                                <span className="absolute top-1 right-1 bg-secondary text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {getTotalItems()}
                                </span>
                            )}
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            {user ? (
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 text-secondary p-1 border border-secondary/30 rounded-full hover:bg-white/10 transition-all"
                                >
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-secondary/50" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                    )}
                                </button>
                            ) : (
                                <Link to="/login" className="bg-secondary text-primary px-4 py-1.5 rounded font-bold text-sm hover:bg-secondary-light transition-all shadow-gold">
                                    LOGIN
                                </Link>
                            )}

                            {/* User Dropdown Menu */}
                            {isProfileOpen && user && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold text-primary truncate">{user.displayName || 'User'}</p>
                                    </div>
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-background transition-colors">
                                        <User size={16} className="mr-2 text-primary" /> Profile
                                    </Link>
                                    <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-background transition-colors">
                                        <ShoppingBag size={16} className="mr-2 text-primary" /> My Orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
                <div
                    className={`fixed inset-y-0 left-0 w-[280px] bg-primary transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-2xl font-serif font-bold text-secondary">PujaSojja</span>
                            <button onClick={() => setIsMenuOpen(false)} className="text-secondary"><X size={28} /></button>
                        </div>
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white/90 hover:text-secondary text-lg font-medium flex items-center justify-between group"
                                >
                                    {link.name}
                                    <span className="w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-8"></span>
                                </Link>
                            ))}
                            <hr className="border-white/10" />
                            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white/90 hover:text-secondary text-lg">
                                <Heart size={20} className="mr-3 text-secondary" /> Wishlist
                            </Link>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-primary-dark">
                        <p className="text-xs text-white/40 text-center">© 2024 PujaSojja. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}