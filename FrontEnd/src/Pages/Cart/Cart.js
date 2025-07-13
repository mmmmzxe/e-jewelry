import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../store/slices/cartSlice';
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShoppingCart from './ShoppingCart';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const togglePopup = () => setShowPopup((prev) => !prev);
  const totalItems = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <div className="relative  flex items-center md:p-3 p-2 cursor-pointer" onClick={togglePopup}>
      <HiOutlineShoppingBag className="text-gray-800 md:text-[18px] text-[17px]" />
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
