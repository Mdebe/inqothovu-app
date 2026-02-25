import React, { createContext, useState, ReactNode, useContext } from "react";

// Product type
export type Product = {
  name: string;
  price: number;
  img: any;
};

// Context value type
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};