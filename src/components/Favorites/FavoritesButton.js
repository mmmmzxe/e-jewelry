// FavoritesButton.js
import React, { useContext, useState } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import { IoMdHeartEmpty } from "react-icons/io";
import FavoritesPopup from './Favorites';

const FavoritesButton = () => {
  const { favorites } = useContext(FavoritesContext);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <div className="relative m-5 flex items-center px-3 py-3 cursor-pointer" onClick={togglePopup}>
      <IoMdHeartEmpty size={24} className="text-gray-800" />
      {favorites.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
      {showPopup && <FavoritesPopup visibility={showPopup} onClose={togglePopup} />}
    </div>
  );
};

export default FavoritesButton;
