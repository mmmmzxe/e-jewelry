import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const userId = localStorage.getItem('userId'); 

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = userId
      ? localStorage.getItem(`favorites_${userId}`)
      : null; 
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites)); 
    }
  }, [favorites, userId]);

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((item) => item.id === product.id)) {
        toast.success(`Added ${product.name} to the Favorites`, {
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

        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((item) => item.id !== productId);

      toast.success(`Removed from Favorites`, {
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

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
