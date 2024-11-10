import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCart from './ShoppingCart';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);
  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <div className="relative m-5 flex items-center px-3 py-3 cursor-pointer" onClick={togglePopup}>
      <HiOutlineShoppingBag size={24} className="text-gray-800" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
      {showPopup && (
        <ShoppingCart visibility={showPopup} onClose={togglePopup} />
      )}
    </div>
  );
};

export default Cart;
