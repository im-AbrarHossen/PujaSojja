import React from 'react';
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data (To be replaced with real Firestore data later)
const stats = [
    {
        title: 'Total Revenue',
        value: '৳১২,৫০,০০০',
        trend: '+12.5%',
        isPositive: true,
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        title: 'Total Orders',
        value: '856',
        trend: '+5.2%',
        isPositive: true,
        icon: ShoppingBag,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
    },
    {
        title: 'Active Customers',
        value: '2,345',
        trend: '-1.4%',
        isPositive: false,
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
    },
    {
        title: 'Total Products',
        value: '124',
        trend: 'Updated',
        isPositive: true,
        icon: Package,
        color: 'text-orange-600',
        bg: 'bg-orange-100'
    },
];

const recentOrders = [
    { id: '#ORD-001', customer: 'Amit Roy', date: '2026-07-19', total: '৳2,500', status: 'Pending' },
    { id: '#ORD-002', customer: 'Sumi Das', date: '2026-07-18', total: '৳1,250', status: 'Processing' },
    { id: '#ORD-003', customer: 'Rajesh Kumar', date: '2026-07-18', total: '৳3,400', status: 'Delivered' },
    { id: '#ORD-004', customer: 'Priya Sharma', date: '2026-07-17', total: '৳850', status: 'Cancelled' },
    { id: '#ORD-005', customer: 'Ananya Guha', date: '2026-07-16', total: '৳4,200', status: 'Delivered' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back! Here is what's happening with your store today.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        Download Report
                    </button>
                    <Link to="/admin/products/new" className="bg-primary text-secondary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-light transition-colors shadow-sm">
                        Add New Product
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center text-sm font-bold ${stat.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <Link to="/admin/orders" className="text-sm font-bold text-primary hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Customer</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Total</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="px-6 py-5 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Inventory Alerts</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {/* Example Alerts */}
                            <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Low Stock Warning</h4>
                                    <p className="text-xs text-gray-600 mt-1">"Premium Sandalwood Incense" has only 3 items left.</p>
                                    <button className="text-xs font-bold text-red-600 mt-2 hover:underline">Restock Now</button>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Out of Stock</h4>
                                    <p className="text-xs text-gray-600 mt-1">"Copper Puja Thali" is currently out of stock.</p>
                                    <button className="text-xs font-bold text-yellow-700 mt-2 hover:underline">View Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}