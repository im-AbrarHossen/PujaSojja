import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    query,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import {
    Users,
    Search,
    Mail,
    Calendar,
    ShieldCheck,
    User as UserIcon,
    Loader2,
    Filter,
    MoreVertical
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

interface Customer {
    id: string;
    displayName: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: any;
    photoURL?: string;
}

export default function CustomersList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('All');

    // Fetch Customers from Firestore
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Customer[];
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to load customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter Logic
    const filteredCustomers = customers.filter(user => {
        const matchesSearch = user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole.toLowerCase();
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Manage Customers | Admin Dashboard</title>
            </Helmet>

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                <p className="text-sm text-gray-500 mt-1">View and manage all registered users and their roles.</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-gray-400" />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="flex-1 md:w-40 bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:outline-none text-sm font-medium"
                    >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admins</option>
                        <option value="User">Users</option>
                    </select>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-gray-500 font-medium">Loading User Directory...</p>
                    </div>
                ) : filteredCustomers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Customer</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Contact</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Role</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Joined Date</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {customer.photoURL ? (
                                                    <img src={customer.photoURL} alt="" className="w-10 h-10 rounded-full border border-gray-100" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                                        <UserIcon size={18} />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-gray-900">{customer.displayName || 'Unnamed User'}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">ID: {customer.id.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Mail size={14} className="mr-2 text-gray-400" />
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.role === 'admin' ? (
                                                <span className="flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-secondary uppercase tracking-wider">
                                                    <ShieldCheck size={12} className="mr-1" /> Admin
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar size={14} className="mr-2 text-gray-400" />
                                                {customer.createdAt?.toDate().toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center bg-white rounded-2xl">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Customers Found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search query or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}