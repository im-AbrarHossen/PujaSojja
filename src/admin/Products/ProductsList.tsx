import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    MoreVertical,
    Filter,
    Package,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { type Product } from '../../types/product';
import { toast } from 'react-hot-toast';

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Products from Firestore
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Delete Product
    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteDoc(doc(db, 'products', id));
                toast.success("Product deleted successfully");
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    // Filter products based on search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your store inventory, pricing and stock.</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-primary-light transition-all shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add New Product
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors w-full md:w-auto">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                        <p className="text-gray-500 font-medium">Loading Products...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">Product</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">Category</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">Price</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">Stock</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500">Status</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {product.id.slice(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-900">৳{product.salePrice || product.price}</div>
                                            {product.salePrice && <div className="text-[10px] text-gray-400 line-through">৳{product.price}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                                                {product.stock} pcs
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.stock > 0 ? (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">In Stock</span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 uppercase">Out of Stock</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                                                    title="View on Site"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Products Found</h3>
                        <p className="text-gray-500 mt-1">Start adding products to see them in your list.</p>
                        <Link to="/admin/products/new" className="mt-6 inline-block text-primary font-bold hover:underline">
                            Add your first product
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}