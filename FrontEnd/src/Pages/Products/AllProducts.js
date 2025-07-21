import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import bgImage from '../../assets/img/about/13.jpg';
import Section2 from '../Home/section2';
import CategorySelect from '../../components/Search/Options';
import { fadeIn } from '../../Context/variants';
import Rating from './RatingStars';

function AllProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);
  const { favorites } = useSelector(state => state.favorites);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setVisibleProducts(6);
  };

  const filteredProducts = category
    ? products.filter(product => product.category.title === category)
    : products;

  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 6);
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  return (
    <>
      <Section2 bgImage={bgImage}/>
      <div className="container mx-auto pt-52">
     <div className='flex md:flex-row flex-col  justify-around items-center'>
     <div className="flex justify-center flex-col items-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800">{`All Products ${category }`}</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

<CategorySelect   bgColor="bg-gray-100 md:bg-white" 
  textColor="text-gray-900"  category={category} onCategoryChange={handleCategoryChange} categories={categories} />
     </div>
        <main>
          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1.5)}
            initial="hidden"
            whileInView="show"
            className="justify-center items-center p-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <motion.div
                key={product._id}
                className="product relative bg-white rounded-lg shadow-md overflow-hidden"
                variants={fadeIn('down', 'tween', 0.1, 1)}
                initial="hidden"
                whileInView="show"
              >
                <div className="absolute justify-center items-center top-2 right-2 flex space-x-2">
                  <span className="text-pink-900 px-5">{product.price} $</span>
                  <Link to={`/products/${product.category.title}/${product._id}`}>
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
                  <div className="flex justify-center items-center">
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
          </motion.div>
          {visibleProducts < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button className="btn3" onClick={loadMoreProducts}>
                See More Products
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default AllProducts;
