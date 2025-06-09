<<<<<<< HEAD
'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

=======
'use client'; // Shto këtë rresht në fillim të skedarit

import { createContext, useContext, ReactNode, useState } from 'react';

// Definimi i tipi i artikujve në karrocë
>>>>>>> 6270e43a (added new file)
type CartItem = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
};

<<<<<<< HEAD
type ShippingAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type OrderData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: 'cash_on_delivery';
};

=======
// Definimi i tipit të kontekstit të karrocës
>>>>>>> 6270e43a (added new file)
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
<<<<<<< HEAD
  placeOrder: (order: OrderData) => Promise<boolean>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

=======
  placeOrder: () => void;
};

// Krijimi i kontekstit të karrocës
const CartContext = createContext<CartContextType | undefined>(undefined);

// Komponenti që ofron kontekstin e karrocës për fëmijët
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Shto artikuj në karrocë
>>>>>>> 6270e43a (added new file)
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

<<<<<<< HEAD
=======
  // Heq artikuj nga karroca
>>>>>>> 6270e43a (added new file)
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

<<<<<<< HEAD
=======
  // Përdor për të përditësuar sasinë e një artikulli në karrocë
>>>>>>> 6270e43a (added new file)
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

<<<<<<< HEAD
=======
  // Pastro karrocën
>>>>>>> 6270e43a (added new file)
  const clearCart = () => {
    setCartItems([]);
  };

<<<<<<< HEAD
  const placeOrder = async (orderData: OrderData): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
=======
  // Vendos porosinë
  const placeOrder = async () => {
    try {
      const orderData = {
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '1234567890',
        shippingAddress: {
          street: 'Some street',
          city: 'Some city',
          postalCode: '12345',
          country: 'Kosovë'
        },
        items: cartItems.map((item) => ({
          book: item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.title
        })),
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        paymentMethod: 'cash_on_delivery',
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
>>>>>>> 6270e43a (added new file)
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Failed to place order');
<<<<<<< HEAD
      clearCart();
      return true;
    } catch (err) {
      console.error('Error placing order:', err);
      return false;
=======
      clearCart(); // Pasi porosia është vendosur, pastrojmë karrocën
    } catch (err) {
      console.error('Error placing order:', err);
>>>>>>> 6270e43a (added new file)
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

<<<<<<< HEAD
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
=======
// Hook për përdorimin e kontekstit të karrocës
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
>>>>>>> 6270e43a (added new file)
  return context;
};
