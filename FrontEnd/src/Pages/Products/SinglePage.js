import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SliedProducts from '../Home/SliedProducts';
import CategoryHighlight from '../Home/Hightlights';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Dropdown from '../Home/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { fetchSingleProduct } from '../../store/slices/singleProductSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchFeedback, submitFeedback } from '../../store/slices/feedbackSlice';
import Rating from './RatingStars';
import { updateProductRating } from '../../store/slices/productsSlice';
import JewelryLoader from '../../Layout/JewelryLoader';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const { product, loading, error } = useSelector(state => state.singleProduct);
  const { categories } = useSelector(state => state.categories);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const userId = localStorage.getItem('userId');
  const { feedbacks, loading: feedbackLoading, submitting } = useSelector(state => state.feedback);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!product || !product.category || categories.length === 0) return;
    let categoryIndex = categories.findIndex(cat => cat.title === product.category.title);
    if (categoryIndex === -1) categoryIndex = 0;
    const categoryInterval = setInterval(() => {
      categoryIndex = (categoryIndex + 1) % categories.length;
      setCurrentCategory(categories[categoryIndex]?.title || '');
    }, 12000);
    return () => clearInterval(categoryInterval);
  }, [product, categories]);

  useEffect(() => {
    // Fetch feedback for this product
    if (product && product._id) {
      dispatch(fetchFeedback(product._id));
    }
  }, [product]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert('Please login to submit feedback.');
    dispatch(submitFeedback({
      userId,
      productId: product._id,
      rating: newFeedback.rating,
      comment: newFeedback.comment
    })).then(res => {
      if (!res.error) {
        setNewFeedback({ rating: 5, comment: '' });
        dispatch(updateProductRating({ productId: product._id }));
      }
    });
  };

  if (loading) return  <JewelryLoader/>
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const images = [product.image, ...(product.images || [])];

  return (
    <motion.div
      className=" flex flex-col m-3 container mx-auto pt-52 justify-center items-center "
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
              <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={(!product.rating || product.rating === 0) ? 'text-gray-300' : (i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300')}>
            ★
          </span>
        ))}
                <span className="text-gray-500 text-sm">({feedbacks.length})</span>
              </div>
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
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed my-2 lg:my-4">
            {product.description}
          </p>
          <button
            className="btn w-full sm:w-auto"
            onClick={() => dispatch(addToCart(product))}
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
        {/* Feedback Section */}
       
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          {feedbackLoading ? (
            <JewelryLoader/>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedback yet.</p>
          ) : (
            <ul className="mb-6">
              {feedbacks.map(fb => (
                <li key={fb._id} className="mb-2 p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{fb.userId?.name || 'User'}:</span>
                    <span className="text-yellow-500">{'★'.repeat(fb.rating)}</span>
                  </div>
                  <div>{fb.comment}</div>
                  <div className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-2 max-w-md">
            <label className="font-semibold">Your Rating:</label>
            <Rating maxRating={5} onRatingChange={r => setNewFeedback(fb => ({ ...fb, rating: r }))} />
            <label className="font-semibold">Your Comment:</label>
            <textarea
              value={newFeedback.comment}
              onChange={e => setNewFeedback(fb => ({ ...fb, comment: e.target.value }))}
              className="border rounded px-2 py-1"
              rows={3}
              required
            />
            <button
              type="submit"
              className="btn mt-2"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
