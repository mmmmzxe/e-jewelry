import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        toast.success(`Added ${product.name} in the cart`, {
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

        return prevItems.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        toast.success(`Added ${product.name} to the cart`, {
          autoClose: 4000,
          position: "top-center",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast-success",
          bodyClassName: "custom-body",
          progressClassName: "custom-progress",
        });

        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
  
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  
      return updatedItems;
    });
  
    toast.info('Item removed from cart', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, count: quantity } : item
      )
    );
  };

  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
