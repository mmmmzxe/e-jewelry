import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { motion } from 'framer-motion';
import { fadeIn } from '../../Context/variants';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function FavoritesPopup({ visibility, onClose }) {
  const { favorites } = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (visibility) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibility, onClose]);

  const handleShowAll = () => {
    navigate('/favorites');
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        ref={popupRef}
        variants={fadeIn('up', 'tween', 0.1, 0.5)}
        initial="hidden"
        animate={visibility ? "show" : "hidden"}
        className={`h-full bg-white shadow-lg transition-transform duration-300 ${
          visibility ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-[400px]`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Favorites</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {favorites.length === 0 ? (
            <p className="text-gray-500">Your favorites list is empty</p>
          ) : (
            favorites.map((product) => (
              <div key={product.id || product._id || product.name} className="flex items-center justify-between p-2 border-b space-x-4">
                <div className="w-1/4">
                  <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-gray-500 text-sm">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromFavorites(product._id || product.id))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
        {favorites.length > 0 && (
      
          <button
            onClick={handleShowAll}
            className="w-full bg-pink-700 text-white py-2 rounded-md font-semibold hover:bg-pink-800"
          >
            Show All Favorites
          </button>)}
        </div>
      </motion.div>
    </div>
  );
}

export default FavoritesPopup;
