import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { type Product } from '../../types/product';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
    product: Product;
}

/**
 * Premium Product Card Component
 * Displays product image, badges, rating, price, and quick actions.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Calculate discount percentage if salePrice exists
    const discount = product.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;
    const { addItem: addToCart } = useCartStore();
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevents redirecting to product details page
        e.stopPropagation();
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
            toast.success(`${product.name} removed from wishlist.`);
        } else {
            addToWishlist(product);
        }
    };
    return (
        <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-primary/5 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
                            {discount}% OFF
                        </span>
                    )}
                    {product.isNewArrival && (
                        <span className="bg-primary text-secondary text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg border border-secondary/30">
                            New
                        </span>
                    )}
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={handleToggleWishlist}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        className="bg-white p-3 rounded-full text-primary hover:bg-secondary hover:text-primary shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-[0ms]"
                    >
                        <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        title="View Details"
                        className="bg-white p-3 rounded-full text-primary hover:bg-secondary hover:text-primary shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]"
                    >
                        <Eye size={20} />
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        title="Add to Cart"
                        className="bg-white p-3 rounded-full text-primary hover:bg-secondary hover:text-primary shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-[100ms]"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-[10px] text-primary/50 uppercase tracking-[2px] font-bold mb-1.5">
                    {product.category}
                </p>

                <Link to={`/product/${product.id}`} className="block mb-2">
                    <h3 className="text-lg font-serif font-bold text-primary hover:text-secondary transition-colors line-clamp-1 leading-tight">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                    <div className="flex items-center text-secondary">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={`${i < Math.floor(product.rating) ? 'fill-secondary' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium ml-1">({product.numReviews})</span>
                </div>

                {/* Price & Cart Button */}
                <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        {product.salePrice ? (
                            <>
                                <span className="text-xl font-bold text-primary">৳{product.salePrice}</span>
                                <span className="text-sm text-gray-400 line-through">৳{product.price}</span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-primary">৳{product.price}</span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex-shrink-0 bg-primary text-secondary px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light transition-all shadow-soft flex items-center gap-2 group/btn"
                    >
                        <span className="hidden sm:inline">Add</span>
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;