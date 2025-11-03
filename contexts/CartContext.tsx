import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'> & { id: number }) => void;
  removeFromCart: (productId: number, size?: string, flavor?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, flavor?: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product & { quantity: number, size?: string, flavor?: string }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.flavor === product.flavor
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === product.id && item.size === product.size && item.flavor === product.flavor) 
          ? { ...item, quantity: item.quantity + product.quantity } 
          : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (productId: number, size?: string, flavor?: string) => {
    setCartItems(prevItems => prevItems.filter(item => 
        item.id !== productId || item.size !== size || item.flavor !== flavor
    ));
  };

  const updateQuantity = (productId: number, quantity: number, size?: string, flavor?: string) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId || item.size !== size || item.flavor !== flavor);
      }
      return prevItems.map(item =>
        (item.id === productId && item.size === size && item.flavor === flavor)
        ? { ...item, quantity } 
        : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};