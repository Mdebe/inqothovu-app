import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

/* =========================
   Product Type
========================= */

export type Product = {
  id: string; // ✅ Unique product ID (VERY IMPORTANT)
  name: string;
  price: number;
  img: any;
  quantity: number;
  category: string;
};

/* =========================
   Context Type
========================= */

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  totalPrice: number;
  totalItems: number;
};

/* =========================
   Create Context
========================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =========================
   Hook
========================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

/* =========================
   Provider
========================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  /* =========================
     Add To Cart
  ========================= */

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity:
            updated[existingIndex].quantity + product.quantity,
        };
        return updated;
      }

      return [...prev, { ...product }];
    });
  };

  /* =========================
     Remove From Cart
  ========================= */

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  /* =========================
     Increase Quantity
  ========================= */

  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* =========================
     Decrease Quantity
  ========================= */

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        )
    );
  };

  /* =========================
     Totals
  ========================= */

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart: () => setCart([]),
        increaseQty,
        decreaseQty,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};