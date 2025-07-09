import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const userId = localStorage.getItem('userId'); 
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
      if (!userId) return;
      try {
        const res = await fetch('http://localhost:5000/api/favorites?userId=' + userId);
        if (res.ok) {
          const fav = await res.json();
          setFavorites(fav.products || []);
        }
      } catch (err) {
        // handle error
      }
    };
  // Fetch favorites from backend on mount or when userId changes
  useEffect(() => {
  
    fetchFavorites();
  }, [userId]);

  const addToFavorites = async (product) => {
    if (!userId) return;
    try {
      const res = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id || product.id }),
      });
      if (res.ok) {
        const fav = await res.json();
        setFavorites(fav.products || []);
        toast.success(`Added ${product.name} to the Favorites`, { /* ... */ });
        fetchFavorites();
      }
    } catch (err) { /* handle error */ }
  };

  const removeFromFavorites = async (productId) => {
    if (!userId) return;
    try {
      const res = await fetch('http://localhost:5000/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      if (res.ok) {
        const fav = await res.json();
        setFavorites(fav.products || []);
        toast.success('Removed from Favorites', { /* ... */ });
        fetchFavorites();
      }
    } catch (err) { /* handle error */ }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
