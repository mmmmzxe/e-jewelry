import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem('userId');  
  const [cartItems, setCartItems] = useState([]);
  const fetchCart = async () => {
      if (!userId) return;
      try {
        const res = await fetch('http://localhost:5000/api/cart?userId=' + userId);
        if (res.ok) {
          const cart = await res.json();
          setCartItems(cart.items || []);
        }
      } catch (err) {
        // handle error
      }
    };
  // Fetch cart from backend on mount or when userId changes
  useEffect(() => {
  
    fetchCart();
  }, [userId]);

  const addToCart = async (product) => {
    if (!userId) return;
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id || product.id, count: 1 }),
      });
      if (res.ok) {
        const cart = await res.json();
        setCartItems(cart.items || []);
        toast.success('Add Product', { /* ... */ });
        fetchCart();
      }
    } catch (err) { /* handle error */ }
  };

  const removeFromCart = async (productId) => {
    if (!userId) return;
    try {
      const res = await fetch('http://localhost:5000/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      if (res.ok) {
        const cart = await res.json();
        setCartItems(cart.items || []);
        toast.success('Removed from Cart', { /* ... */ });
        fetchCart();
      }
    } catch (err) { /* handle error */ }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

