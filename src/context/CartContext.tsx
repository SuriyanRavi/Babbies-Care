'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalPaise: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'babbies_care_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore storage parse errors
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage quota / privacy mode safe
      }
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, variant?: ProductVariant, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant?.id
      );

      const pricePaise = variant?.pricePaise ?? product.pricePaise;
      const stock = variant?.stockQuantity ?? product.stockQuantity;

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, stock);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
        };
        return next;
      }

      const newItem: CartItem = {
        productId: product.id,
        variantId: variant?.id,
        sku: variant?.sku ?? product.sku,
        name: product.name,
        variantName: variant?.name,
        pricePaise,
        imageUrl: product.primaryImage,
        quantity: Math.min(quantity, stock),
        stockQuantity: stock,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.stockQuantity),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalPaise = items.reduce((total, item) => total + item.pricePaise * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotalPaise,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

