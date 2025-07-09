import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCart from './ShoppingCart';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup((prev) => !prev);
  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <div className="relative md:m-5 m-3 flex items-center md:p-3 p-2 cursor-pointer" onClick={togglePopup}>
      <HiOutlineShoppingBag className="text-gray-800 md:text-[25px] text-[17px]" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-800 text-white md:text-xs text-sm font-bold rounded-full  w-5 h-5 flex items-center justify-center">
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
