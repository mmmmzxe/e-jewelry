import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { fetchWeeklyBestsellers } from '../../store/slices/productsSlice';
import { motion } from 'framer-motion';
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JewelryLoader from '../../Layout/JewelryLoader';

function SliedProducts() {
  const { category } = useParams(); 
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const { weeklyBestsellers, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchWeeklyBestsellers());
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return  <JewelryLoader/>;

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <p>lastest collection</p>
        <h2 className="h2 ">weekly best seller</h2>
      </div>
      <main className="p-10 container mx-auto">
        <Slider {...sliderSettings}>
          {(Array.isArray(weeklyBestsellers) ? weeklyBestsellers : []).map((product) => {
            const isFavorited = favorites && favorites.some(fav => fav._id === product._id || fav.id === product.id);
            return (
              <motion.div
                key={product.id}
                className="product-slied max-h-[500px] relative p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute justify-center items-center top-2 right-2 flex space-x-2">
                  <Link to={`/products/${category}/${product.id}`}>
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
                <div className="product-title">
                  <h4 className="product-name text-black font-bold">
                    {product.name}
                  </h4>
                  <span className=" px-5">{product.price} $</span>
                  <button
                    className="btn3"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </Slider>
      </main>
    </div>
  );
}

export default SliedProducts;
