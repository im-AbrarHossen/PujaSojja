import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Ticket,
    Settings,
    LogOut,
    Menu,
    X,
    Store
} from 'lucide-react';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Admin logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Categories', icon: Tags, path: '/admin/categories' },
        { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
        { name: 'Customers', icon: Users, path: '/admin/customers' },
        { name: 'Coupons', icon: Ticket, path: '/admin/coupons' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Helmet>
                <title>Admin Dashboard | PujaSojja</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transition-transform duration-300 transform lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-6 bg-primary-dark">
                    <span className="text-xl font-serif font-bold text-secondary tracking-wider">
                        Admin Panel
                    </span>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-secondary text-primary font-bold shadow-md'
                                    : 'text-gray-300 hover:bg-primary-light hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} className="mr-3 shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 bg-primary-dark">
                    <Link
                        to="/"
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-secondary hover:bg-primary rounded-lg transition-colors mb-2"
                    >
                        <Store size={18} className="mr-3" />
                        Back to Store
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-primary focus:outline-none"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex-1 lg:hidden text-center">
                        <span className="text-lg font-serif font-bold text-primary">PujaSojja Admin</span>
                    </div>

                    <div className="ml-auto flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-700">{user?.displayName || 'Admin User'}</p>
                            <p className="text-xs text-gray-500 text-primary uppercase font-bold tracking-wider">Administrator</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                            {user?.displayName?.charAt(0) || 'A'}
                        </div>
                    </div>
                </header>

                {/* Scrollable Main Area */}
                <div className="flex-1 overflow-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}