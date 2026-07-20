import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
    Upload,
    X,
    Save,
    ArrowLeft,
    Loader2,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import { toast } from 'react-hot-toast';

const CATEGORIES = ['Idols', 'Diyas', 'Incense', 'Thali Sets', 'Decor', 'Vastu', 'Festive Special'];

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
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
        isNewArrival: false,
        isBestSeller: false,
    });

    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);

    // Fetch Existing Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        name: data.name || '',
                        category: data.category || 'Idols',
                        price: data.price?.toString() || '',
                        salePrice: data.salePrice?.toString() || '',
                        stock: data.stock?.toString() || '',
                        sku: data.sku || '',
                        shortDescription: data.shortDescription || '',
                        isFeatured: data.isFeatured || false,
                        isNewArrival: data.isNewArrival || false,
                        isBestSeller: data.isBestSeller || false,
                    });
                    setDescription(data.description || '');
                    setImages(data.images || []);
                } else {
                    toast.error("Product not found!");
                    navigate('/admin/products');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product data.");
            } finally {
                setFetching(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        try {
            const uploadedUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const url = await uploadImageToCloudinary(files[i]);
                uploadedUrls.push(url);
            }
            setImages(prev => [...prev, ...uploadedUrls]);
            toast.success("Images uploaded!");
        } catch (error) {
            toast.error("Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        try {
            setLoading(true);
            const productRef = doc(db, 'products', id);

            await updateDoc(productRef, {
                ...formData,
                price: Number(formData.price),
                salePrice: formData.salePrice ? Number(formData.salePrice) : null,
                stock: Number(formData.stock),
                description,
                images,
                updatedAt: serverTimestamp(),
            });

            toast.success("Product updated successfully!");
            navigate('/admin/products');
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-gray-500 font-medium">Fetching product data...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <Helmet>
                <title>Edit Product | Admin Dashboard</title>
            </Helmet>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                        <p className="text-sm text-gray-500">Update details for "{formData.name}"</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <ImageIcon className="text-primary" size={20} /> Content & Media
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                                    <ReactQuill theme="snow" value={description} onChange={setDescription} className="min-h-[200px]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                                        <img src={img} alt="product" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-primary cursor-pointer">
                                    {uploading ? <Loader2 className="animate-spin text-primary" /> : <Upload size={24} className="text-gray-400" />}
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Inventory & Status</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (৳)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl">
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading || uploading} className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center shadow-gold hover:bg-primary-light transition-all disabled:opacity-70">
                        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save size={20} className="mr-2" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}