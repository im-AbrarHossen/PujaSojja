import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    Loader2,
    Tags,
    X,
    Upload,
    CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: any;
}

export default function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Category Form State
    const [newCatName, setNewCatName] = useState('');
    const [newCatImage, setNewCatImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Category[];
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle Image Change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewCatImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Add Category
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName || !newCatImage) {
            toast.error("Please provide both name and image.");
            return;
        }

        try {
            setSubmitting(true);

            // 1. Upload Image to Cloudinary
            const imageUrl = await uploadImageToCloudinary(newCatImage);

            // 2. Save to Firestore
            const categoryData = {
                name: newCatName,
                slug: newCatName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                image: imageUrl,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'categories'), categoryData);

            toast.success("Category added successfully!");
            setIsModalOpen(false);
            setNewCatName('');
            setNewCatImage(null);
            setImagePreview(null);
            fetchCategories(); // Refresh list
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category.");
        } finally {
            setSubmitting(false);
        }
    };

    // Delete Category
    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteDoc(doc(db, 'categories', id));
                toast.success("Category deleted");
                setCategories(categories.filter(c => c.id !== id));
            } catch (error) {
                toast.error("Failed to delete category");
            }
        }
    };

    return (
        <div className="space-y-6">
            <Helmet>
                <title>Manage Categories | Admin</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage shop categories and their visual identity.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-secondary px-6 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-primary-light transition-all shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add Category
                </button>
            </div>

            {/* Categories Grid */}
            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                    <p className="text-gray-500 font-medium">Loading Categories...</p>
                </div>
            ) : categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <button
                                    onClick={() => handleDelete(cat.id, cat.name)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">/{cat.slug}</p>
                                </div>
                                <div className="p-2 bg-primary/5 text-primary rounded-lg">
                                    <Tags size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-gray-100">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Tags size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No Categories Yet</h3>
                    <p className="text-gray-500 mt-1">Start by adding categories to organize your divine items.</p>
                </div>
            )}

            {/* Add Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 bg-primary text-secondary flex items-center justify-between">
                            <h2 className="text-lg font-bold">Add New Category</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddCategory} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category Name *</label>
                                <input
                                    type="text"
                                    value={newCatName}
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    placeholder="e.g. Divine Idols"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category Image *</label>
                                <label className="relative aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Upload size={32} className="text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Image</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center shadow-gold hover:bg-primary-light transition-all disabled:opacity-70"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} className="mr-2" />
                                        Create Category
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}