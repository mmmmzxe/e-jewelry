import React, { useContext } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { products } from '../Data/data'; 
import { FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';
import { FavoritesContext } from '../Context/FavoritesContext'; 
import { fadeIn } from '../Context/variants';
import { motion } from 'framer-motion';
import Rating from '../Products/RatingStars';

const SearchResults = () => {
  const { search } = useLocation();
  const { category } = useParams(); 
  const urlCategory = new URLSearchParams(search).get('category') || ''; 

  const query = new URLSearchParams(search).get('query') || '';
  const { addToCart } = useContext(CartContext);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
 
  const filteredProducts = products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());

    return matchesQuery && (urlCategory || category ? product.category.title.toLowerCase() === (urlCategory || category).toLowerCase() : true);
  });

  return (
    <div className="container mx-auto pt-52">
      <h2 className="text-3xl font-bold text-gray-800">Search Results</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <motion.div
              key={product.id}
              className="product relative bg-white rounded-lg shadow-md overflow-hidden"
              variants={fadeIn('down', 'tween', 0.1, 1)}
              initial="hidden"
              whileInView="show"
            >
              <div className="absolute justify-center items-center top-2 right-2 flex space-x-2">
                <span className="text-pink-900 px-5">{product.price} $</span>
                <Link to={`/products/${category}/${product.id}`}>
                  <FaEye className="text-pink-900 hover:text-pink-600" />
                </Link>
              
                <button
                  onClick={() => {
                    const isFavorited = favorites.some(fav => fav.id === product.id);
                    if (isFavorited) {
                      removeFromFavorites(product.id);
                    } else {
                      addToFavorites(product);
                    }
                  }}
                  className="text-pink-900 hover:text-pink-600"
                >
                  {favorites.some(fav => fav.id === product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <div className="product-image">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4">
                <h4 className="text-pink-900 font-bold text-lg">{product.name}</h4>
                <p className="text-stone-500 mb-2">{product.description}</p>
                <Rating maxRating={5} />
                <div className='flex justify-center items-center'>
                  <button
                    className="btn mt-4 w-1/2"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No Found Product</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
