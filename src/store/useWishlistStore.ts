import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '../types/product';
import { toast } from 'react-hot-toast';

// Define the store's state and actions for Wishlist
interface WishlistState {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            // Add a product to the wishlist
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (!existingItem) {
                    set({ items: [...currentItems, product] });
                    toast.success('Added to wishlist!');
                } else {
                    toast.error('Already in your wishlist.');
                }
            },

            // Remove an item from the wishlist
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },

            // Check if a product is already in the wishlist
            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            // Clear the entire wishlist
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'pujasojja-wishlist-storage', // Key for localStorage
        }
    )
);