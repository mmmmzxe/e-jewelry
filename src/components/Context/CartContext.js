import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const userId = localStorage.getItem('userId');  

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = userId ? localStorage.getItem(`cartItems_${userId}`) : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      toast.success(` Add Product`, {
        autoClose: 4000,
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        style: { color: "black" },
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      });
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
      
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      toast.success(`Removed from Cart`, {
        autoClose: 4000,
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        style: { color: "black" },
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      });
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedItems));
      return updatedItems;
    });
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

