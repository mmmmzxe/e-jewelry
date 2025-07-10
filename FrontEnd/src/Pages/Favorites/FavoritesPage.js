import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, addToCart } from '../../store/slices/cartSlice';
import { fetchFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';

const FavoritesPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="pt-48 container pb-5">
      <h1 className="text-2xl font-semibold mb-6">
        { `${username}'s Favorites` }
      </h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">Your favorites list is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <motion.div
              key={product.id}
              className="product-slied max-h-[500px] relative p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute justify-center items-center top-2 right-2 flex space-x-2">
                <Link to={`/products/${product.category.title}/${product.id}`}>
                  <FaEye className="text-pink-900 hover:text-pink-600" />
                </Link>
                <button
                  onClick={() => dispatch(removeFromFavorites(product.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
              <div className="product-image">
                <img src={product.image} alt={product.name} className="" />
              </div>
              <div className="product-title">
                <h4 className="product-name text-black font-bold">
                  {product.name}
                </h4>
                <span className="px-5">{product.price} $</span>
                <button className="btn3" onClick={() => dispatch(addToCart(product))}>
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
