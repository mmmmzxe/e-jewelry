import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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
