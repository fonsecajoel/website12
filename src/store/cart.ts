import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  wishlist: string[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const same = (i: CartItem, id: string, size: string, color: string): boolean =>
  i.product.id === id && i.size === size && i.color === color;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      wishlist: [],
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product, size, color, quantity = 1) => {
        const { items } = get();
        const existing = items.find((i) => same(i, product.id, size, color));
        set({
          items: existing
            ? items.map((i) => (same(i, product.id, size, color) ? { ...i, quantity: i.quantity + quantity } : i))
            : [...items, { product, quantity, size, color }],
          isOpen: true,
        });
      },
      removeItem: (id, size, color) => set({ items: get().items.filter((i) => !same(i, id, size, color)) }),
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) return get().removeItem(id, size, color);
        set({ items: get().items.map((i) => (same(i, id, size, color) ? { ...i, quantity } : i)) });
      },
      clearCart: () => set({ items: [] }),
      toggleWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: "aela-cart", partialize: (s) => ({ items: s.items, wishlist: s.wishlist }) },
  ),
);
