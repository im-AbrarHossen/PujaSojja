import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    orderBy,
    query
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import {
    ShoppingBag,
    Search,
    Eye,
    CheckCircle2,
    Truck,
    XCircle,
    Clock,
    Loader2,
    Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    orderStatus: string;
    paymentMethod: string;
    createdAt: any;
    items: any[];
}

export default function OrdersList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Orders from Firestore
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order[];
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update Order Status
    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { orderStatus: newStatus });

            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, orderStatus: newStatus } : order
            ));

            toast.success(`Order status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // Status Badge Color Logic
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // Filtering Logic
    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'All' || order.orderStatus === filterStatus;
        const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-sm text-gray-500 mt-1">Track and manage customer orders and deliveries.</p>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Customer Name or Order ID..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="flex-1 md:w-40 bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl focus:outline-none text-sm font-medium"
                    >
                        <option value="All">All Status</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-gray-500 font-medium">Loading Orders...</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Order ID</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Customer</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Total</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Status</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500">Update Status</th>
                                    <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-900 uppercase">#{order.id.slice(-6)}</span>
                                            <p className="text-[10px] text-gray-400">
                                                {order.createdAt?.toDate().toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-900">{order.customerName}</div>
                                            <div className="text-xs text-gray-500">{order.customerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-primary">৳{order.totalAmount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-primary transition-colors"
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Orders Found</h3>
                        <p className="text-gray-500 mt-1">When customers buy products, they will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}