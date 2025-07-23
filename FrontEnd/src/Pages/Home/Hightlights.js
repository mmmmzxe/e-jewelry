import React, { useState, useEffect } from 'react';
import { fadeIn } from '../../Context/variants';
import { motion } from 'framer-motion';
import Rating from '../Products/RatingStars';
// import { products } from '../Data/data';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import JewelryLoader from '../../Layout/JewelryLoader';

function CategoryHighlight({ categoryName }) {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jewelry.up.railway.app/api/categories/${categoryName}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [products.length]);

  if (loading) return <JewelryLoader/>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found for {categoryName}.</div>;

  const visibleProducts = products.slice(
    currentProductIndex,
    currentProductIndex + 3
  );

  const productsToShow = visibleProducts.length === 3
    ? visibleProducts
    : [...visibleProducts, ...products.slice(0, 3 - visibleProducts.length)];

  return (
    <div>
      <main>
        <div className="flex md:w-1/2 w-full flex-col justify-center items-center">
          <p>{categoryName} Collection</p>
          <h2 className="h2">{productsToShow[0]?.category.title}</h2>
        </div>
        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1.5)}
          initial="hidden"
          whileInView="show"
          className="justify-center items-center p-10 container mx-auto grid grid-cols gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]"
        >
          {productsToShow.map((product) => (
            <motion.div
              key={product._id || product.id}
              className="relative"
              variants={fadeIn('down', 'tween', 0.1, 1)}
              initial="hidden"
              whileInView="show"
            >
              <Link to={`/products/${categoryName}/${product._id || product.id}`}>
                <div className="product product-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </Link>
              <div className="product-title">
                <h4 className="product-name text-pink-900 font-bold">{product.name}</h4>
                <p className="text-stone-500">{product.description}</p>
             <div className='flex'>
             {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={(!product.rating || product.rating === 0) ? 'text-gray-300' : (i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300')}>
            ★
          </span>
        ))}
      </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <Link to={`/products/${categoryName}`}>
          <div className="flex justify-center mt-8 hover:text-pink-900 transition">
            <button className="flex justify-center items-center">
              See More <FaArrowRight className='ml-2' />
            </button>
          </div>
        </Link>
      </main>
    </div>
  );
}

export default CategoryHighlight;
