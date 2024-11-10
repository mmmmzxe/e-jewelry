import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { motion } from 'framer-motion';
import { products } from '../Data/data';
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";

import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FavoritesContext } from '../Context/FavoritesContext';

function SliedProducts() {
  const { addToCart } = useContext(CartContext);
  const { category } = useParams(); 

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

 

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

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <p>lastest collection</p>
        <h2 className="h2 ">weekly best seller</h2>
      </div>
      <main className="p-10 container mx-auto">
        <Slider {...sliderSettings}>
          {products.map((product) => (
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
                <img src={product.image} alt={product.name} className="" />
              </div>
              <div className="product-title">
                <h4 className="product-name text-black font-bold">
                  {product.name}
                </h4>
                <span className=" px-5">{product.price} $</span>
                <button
                 className="btn3"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
             
            </motion.div>
          ))}
        </Slider>
      </main>
    </div>
  );
}

export default SliedProducts;
