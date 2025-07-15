import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, addToCart } from '../../store/slices/cartSlice';
import { fetchFavorites, removeFromFavorites, addToFavorites } from '../../store/slices/favoritesSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEye, FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { fadeIn } from '../../Context/variants';

const FavoritesPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="pt-48 container pb-5">
      <h1 className="text-2xl font-semibold mb-6">
        { `Favorites` }
      </h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">Your favorites list is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
        <motion.div
        key={product._id || product.id}
        className="product relative bg-white rounded-lg shadow-md overflow-hidden"
        variants={fadeIn('down', 'tween', 0.1, 1)}
        initial="hidden"
        whileInView="show"
      >
        <div className="absolute justify-center items-center top-2 right-2 flex space-x-2">
          <span className="text-pink-900 px-5">{product.price} $</span>
          <Link to={`/products/${product.category.title}/${product._id || product.id}`}>
            <FaEye className="text-pink-900 hover:text-pink-600" />
          </Link>
       
          <button
            onClick={() => {
              const isFavorited = favorites.some(fav => String(fav._id || fav.id) === String(product._id || product.id));
              if (isFavorited) {
                dispatch(removeFromFavorites(product._id || product.id));
              } else {
                dispatch(addToFavorites(product));
              }
            }}
            className="text-pink-900 hover:text-pink-600"
          >
            {favorites.some(fav => String(fav._id || fav.id) === String(product._id || product.id)) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="product-image">
          <img src={product.image} alt={product.name} className="" />
        </div>
        <div className="p-4">
          <h4 className="text-pink-900 font-bold text-lg">{product.name}</h4>
          <p className="text-stone-500 mb-2">{product.description}</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={(!product.rating || product.rating === 0) ? 'text-gray-300' : (i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300')}>
              ★
            </span>
          ))}
          <div className='flex justify-center items-center'>
            <button
              className="btn mt-4 w-1/2"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to cart
            </button>
          </div>
        </div>
      </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
