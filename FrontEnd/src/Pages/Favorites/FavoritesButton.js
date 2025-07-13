// FavoritesButton.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites } from '../../store/slices/favoritesSlice';
import { IoMdHeartEmpty } from "react-icons/io";
import FavoritesPopup from './Favorites';

const FavoritesButton = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <div className="relative  flex items-center md:p-3 p-2 cursor-pointer" onClick={togglePopup}>
      <IoMdHeartEmpty  className="text-gray-800 md:text-[18px] text-[17px] " />
      {favorites.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-800 text-white md:text-xs text-sm font-bold rounded-full  w-5 h-5 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
      {showPopup && <FavoritesPopup visibility={showPopup} onClose={togglePopup} />}
    </div>
  );
};

export default FavoritesButton;
