import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    User,
    Package,
    MapPin,
    LogOut,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2,
    Settings,
    ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { auth, db } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Profile() {
    const { user, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch user orders
    useEffect(() => {
        const fetchUserOrders = async () => {
            if (!user) return;
            try {
                setOrdersLoading(true);
                const q = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching user orders:", error);
            } finally {
                setOrdersLoading(false);
            }
        };

        if (user) {
            fetchUserOrders();
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Please Login to View Profile</h2>
                <Link to="/login" className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold shadow-gold">Login Now</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
            <Helmet>
                <title>My Profile | PujaSojja</title>
            </Helmet>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4">
                        <div className="bg-card rounded-3xl shadow-soft p-6 border border-primary/5 sticky top-28">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-md mb-4 overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} />
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-primary truncate w-full">{user.displayName || 'Devotee'}</h2>
                                <p className="text-xs text-dark-text/50">{user.email}</p>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', name: 'Dashboard', icon: ShieldCheck },
                                    { id: 'orders', name: 'My Orders', icon: ShoppingBag },
                                    { id: 'settings', name: 'Settings', icon: Settings },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                                                ? 'bg-primary text-secondary shadow-md'
                                                : 'text-dark-text/60 hover:bg-primary/5'
                                            }`}
                                    >
                                        <item.icon size={18} className="mr-3" />
                                        {item.name}
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-4"
                                >
                                    <LogOut size={18} className="mr-3" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:w-3/4">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-primary rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-secondary">Namaste, {user.displayName?.split(' ')[0]}!</h1>
                                        <p className="text-white/70 text-sm md:text-base">Welcome to your sacred dashboard. Here you can track your divine purchases and manage your account.</p>
                                    </div>
                                    <ShoppingBag className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 rotate-12" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/5">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><ShoppingBag size={24} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Orders</p>
                                                <p className="text-2xl font-bold text-primary">{orders.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/5">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-green-50 text-green-500 rounded-xl"><CheckCircle2 size={24} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Completed</p>
                                                <p className="text-2xl font-bold text-primary">
                                                    {orders.filter(o => o.orderStatus === 'Delivered').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-card p-6 rounded-2xl shadow-soft border border-primary/5">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-yellow-50 text-yellow-500 rounded-xl"><Clock size={24} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Pending</p>
                                                <p className="text-2xl font-bold text-primary">
                                                    {orders.filter(o => o.orderStatus === 'Processing').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Orders Sneak Peek */}
                                <div className="bg-card rounded-3xl shadow-soft border border-primary/5 overflow-hidden">
                                    <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="font-serif font-bold text-lg text-primary">Recent Orders</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-sm font-bold text-primary hover:underline">View All</button>
                                    </div>
                                    <div className="p-0">
                                        {ordersLoading ? (
                                            <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                                        ) : orders.length > 0 ? (
                                            <div className="divide-y divide-gray-50">
                                                {orders.slice(0, 3).map((order) => (
                                                    <div key={order.id} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><Package size={20} /></div>
                                                            <div>
                                                                <p className="text-sm font-bold text-primary uppercase">Order #{order.id.slice(-6)}</p>
                                                                <p className="text-xs text-gray-400">{order.createdAt?.toDate().toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.orderStatus}
                                                        </span>
                                                        <div className="font-bold text-primary text-sm">৳{order.totalAmount}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-10 text-center">
                                                <p className="text-gray-400 text-sm">No orders placed yet.</p>
                                                <Link to="/shop" className="text-primary font-bold text-xs hover:underline mt-2 inline-block">Start Shopping</Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-card rounded-3xl shadow-soft border border-primary/5 overflow-hidden">
                                <div className="px-8 py-6 bg-primary text-secondary">
                                    <h3 className="font-serif font-bold text-xl">My Order History</h3>
                                </div>
                                <div className="p-0">
                                    {ordersLoading ? (
                                        <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>
                                    ) : orders.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 border-b border-gray-100">
                                                    <tr>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Order</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Total</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase text-right">Detail</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {orders.map((order) => (
                                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-primary uppercase text-sm">#{order.id.slice(-8)}</td>
                                                            <td className="px-8 py-4 text-sm text-gray-500">{order.createdAt?.toDate().toLocaleDateString()}</td>
                                                            <td className="px-8 py-4 font-bold text-primary text-sm">৳{order.totalAmount}</td>
                                                            <td className="px-8 py-4">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                            'bg-yellow-100 text-yellow-700'
                                                                    }`}>
                                                                    {order.orderStatus}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-4 text-right">
                                                                <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                                                    <ChevronRight size={20} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="p-20 text-center">
                                            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                                            <p className="text-gray-500">You haven't ordered anything yet.</p>
                                            <Link to="/shop" className="mt-4 inline-block bg-primary text-secondary px-6 py-2 rounded-xl font-bold">Shop Divine Items</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-card rounded-3xl shadow-soft border border-primary/5 p-8">
                                <h3 className="font-serif font-bold text-xl text-primary mb-6">Account Settings</h3>
                                <div className="max-w-md space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={user.displayName || ''}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary"
                                            disabled
                                        />
                                        <p className="text-[10px] text-gray-400 mt-2 italic">* Contact support to change your verified name.</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email || ''}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}