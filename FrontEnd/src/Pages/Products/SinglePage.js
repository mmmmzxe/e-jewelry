import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import { CartContext } from '../../Context/CartContext';
import SliedProducts from '../Home/SliedProducts';
import CategoryHighlight from '../Home/Hightlights';
import { FavoritesContext } from '../../Context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Dropdown from '../Home/Dropdown';

const ProductDetails = () => {
  const { id } = useParams();
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        setCurrentCategory(data.category?.title || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Fetch categories from backend
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.map(cat => cat.title)))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!product || !product.category || categories.length === 0) return;
    let categoryIndex = categories.indexOf(product.category.title);
    const categoryInterval = setInterval(() => {
      categoryIndex = (categoryIndex + 1) % categories.length;
      setCurrentCategory(categories[categoryIndex]);
    }, 12000);
    return () => clearInterval(categoryInterval);
  }, [product, categories]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const images = [product.image, ...(product.images || [])];

  return (
    <motion.div
      className="container flex flex-col m-3 pt-36 justify-center items-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full p-5 flex flex-col items-center lg:flex-row lg:justify-around gap-10 lg:gap-28">
        <div className="flex flex-col items-center w-full sm:w-2/3 lg:w-1/3 relative">
          <img
            src={images[selectedImageIndex]}
            alt={product.name}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain rounded-lg shadow-lg border border-gray-200"
          />
          <div className="flex gap-2 sm:gap-4 mt-4 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-lg border cursor-pointer ${
                  selectedImageIndex === index ? 'border-pink-600' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-left flex flex-col gap-3 sm:gap-5 items-start w-full sm:w-2/3 lg:w-1/2">
        <Link to={`/products/${product.category.title}`}>          <p className="text-[12px] cursor-pointer">BACK TO SELECTION</p>
        </Link>
          <div className="flex justify-between w-full items-start">
            <div>
              <h1 className="text-pink-900 font-bold text-3xl sm:text-3xl lg:text-4xl mb-2 lg:mb-4">
                {product.name}
              </h1>
              <div className="flex items-center my-2 lg:my-4 space-x-3 sm:space-x-4">
                <span className="text-pink-900 text-lg sm:text-xl font-bold">
                  ${product.price}
                </span>
                <span className="line-through text-gray-400 text-sm sm:text-lg">
                  ${product.oldprice}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const isFavorited = favorites.some(fav => fav._id === product._id || fav.id === product.id);
                if (isFavorited) {
                  removeFromFavorites(product._id || product.id);
                } else {
                  addToFavorites(product);
                }
              }}
              className="text-pink-900 hover:text-pink-600"
            >
              {favorites.some(fav => fav._id === product._id || fav.id === product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed my-2 lg:my-4">
            {product.description}
          </p>
          <RatingStars rating={product.rating} />
          <button
            className="btn w-full sm:w-auto"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <Dropdown />
        </div>
      </div>

      <div className="container w-full mt-5">
        <hr />
        <SliedProducts />
        <hr />
        <CategoryHighlight categoryName={product.category.title} />
        <CategoryHighlight categoryName={currentCategory} />
      </div>
    </motion.div>
  );
};

export default ProductDetails;
