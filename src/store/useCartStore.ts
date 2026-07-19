import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '../types/product';

// Define the shape of an item in the cart
interface CartItem extends Product {
    quantity: number;
}

// Define the store's state and actions
interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // Add a product to the cart
            addItem: (product, quantity = 1) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    // If item exists, update its quantity
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    // If item is new, add it to the cart
                    set({ items: [...currentItems, { ...product, quantity }] });
                }
            },

            // Remove an item from the cart
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.id !== productId),
                });
            },

            // Update the quantity of a specific item
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },

            // Clear the entire cart
            clearCart: () => set({ items: [] }),

            // Calculate total price (considering salePrice if available)
            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = item.salePrice || item.price;
                    return total + price * item.quantity;
                }, 0);
            },

            // Calculate total number of items in cart
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'pujasojja-cart-storage', // Key for localStorage
        }
    )
);