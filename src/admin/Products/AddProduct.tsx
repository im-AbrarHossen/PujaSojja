import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; // Quill editor styles
import {
    Upload,
    X,
    Plus,
    ArrowLeft,
    Loader2,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { toast } from 'react-hot-toast';

// Static Categories (Future: Fetch from Firestore categories collection)
const CATEGORIES = ['Idols', 'Diyas', 'Incense', 'Thali Sets', 'Decor', 'Vastu', 'Festive Special'];

export default function AddProduct() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: 'Idols',
        price: '',
        salePrice: '',
        stock: '',
        sku: '',
        shortDescription: '',
        isFeatured: false,
        isNewArrival: true,
        isBestSeller: false,
    });

    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);

    // Input Change Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    // Image Upload Handler (Cloudinary)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const url = await uploadImageToCloudinary(files[i]);
                uploadedUrls.push(url);
            }
            setImages(prev => [...prev, ...uploadedUrls]);
            toast.success(`${uploadedUrls.length} images uploaded successfully!`);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload some images.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        if (!description || description === '<p><br></p>') {
            toast.error("Please add a product description.");
            return;
        }

        try {
            setLoading(true);

            // Create Product Object
            const productData = {
                ...formData,
                price: Number(formData.price),
                salePrice: formData.salePrice ? Number(formData.salePrice) : null,
                stock: Number(formData.stock),
                description,
                images,
                slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                rating: 5, // Default rating for new product
                numReviews: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            // Save to Firestore
            await addDoc(collection(db, 'products'), productData);

            toast.success("Product added successfully!");
            navigate('/admin/products');
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <Helmet>
                <title>Add New Product | Admin Dashboard</title>
            </Helmet>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                        <p className="text-sm text-gray-500">List a new divine item in your shop inventory.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: General Info */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Basic Info Card */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Plus className="text-primary" size={20} /> Basic Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Handcrafted Brass Ganesha"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Short Description *</label>
                                <textarea
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    placeholder="Brief summary for product listing..."
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description *</label>
                                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                    <ReactQuill
                                        theme="snow"
                                        value={description}
                                        onChange={setDescription}
                                        className="bg-white min-h-[250px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="text-primary" size={20} /> Product Media
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                                {uploading ? (
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                ) : (
                                    <>
                                        <Upload size={24} className="text-gray-400 mb-2" />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Upload Image</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-400">Recommended: Square image (800x800px). You can upload multiple images.</p>
                    </div>
                </div>

                {/* Right Column: Pricing & Inventory */}
                <div className="space-y-6">

                    {/* Inventory & Pricing Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Inventory & Price</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (৳) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sale Price (৳)</label>
                                    <input
                                        type="number"
                                        name="salePrice"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stock Qty *</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">SKU (Code)</label>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition-colors appearance-none"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Visibility & Tags */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">Product Status</h2>

                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                <span className="text-sm font-medium text-gray-700">Featured Product</span>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-primary"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                <span className="text-sm font-medium text-gray-700">New Arrival</span>
                                <input
                                    type="checkbox"
                                    name="isNewArrival"
                                    checked={formData.isNewArrival}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-primary"
                                />
                            </label>

                            <label className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                <span className="text-sm font-medium text-gray-700">Bestseller</span>
                                <input
                                    type="checkbox"
                                    name="isBestSeller"
                                    checked={formData.isBestSeller}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-primary"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="sticky bottom-6 pt-6">
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center shadow-gold hover:bg-primary-light transition-all disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Saving Product...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={20} className="mr-2" />
                                    Publish Product
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[2px]">
                            PujaSojja Inventory Control
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}