"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  isVeg?: boolean;
  desc?: string;
  crust?: string;
  size?: string;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  isLoggedIn: boolean;
  toggleLogin: () => void;
  addToCart: (item: any, crust: string, size: string) => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  getItemQuantity: (itemId: number) => number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const getItemQuantity = (itemId: number) => {
    const cartItem = cart.find(c => c.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (item: any, crust: string, size: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, crust, size, quantity: 1 }];
    });
  };

  const incrementQuantity = (itemId: number) => {
    setCart(prev => prev.map(c => c.id === itemId ? { ...c, quantity: c.quantity + 1 } : c));
  };
  
  const decrementQuantity = (itemId: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === itemId);
      if (existing && existing.quantity === 1) {
        return prev.filter(c => c.id !== itemId);
      }
      return prev.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      isLoggedIn,
      toggleLogin,
      addToCart,
      incrementQuantity,
      decrementQuantity,
      getItemQuantity,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
