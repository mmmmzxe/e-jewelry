import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { fadeIn } from '../../Context/variants';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineTrash } from "react-icons/hi";

function ShoppingCart({ visibility, onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalCart = cartItems.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    navigate('/review-order', {
      state: { cartItems, totalCart },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <motion.div
        variants={fadeIn('up', 'tween', 0.1, 0.5)}
        initial="hidden"
        animate={visibility ? "show" : "hidden"}
        className={`h-full bg-white shadow-lg transition-transform duration-300 ${
          visibility ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-[400px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">In My Bag</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((product) => (
              <div key={product.id || product._id || product.productId} className="flex items-center justify-between p-2 border-b space-x-4">
                <div className="w-1/4">
                  <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-gray-400 text-xs">{product.category?.title}</p>
                  <p className="text-gray-500 text-sm">${product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQuantity(product.id, product.count)}
                      className="btn2"
                    >
                      -
                    </button>
                    <span className="px-4 text-gray-700">{product.count}</span>
                    <button
                      onClick={() => increaseQuantity(product.id, product.count)}
                      className="btn2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-gray-500 hover:text-red-500">
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
            <span>Total:</span>
            <span>${totalCart.toFixed(2)}</span>
          </div>
          {cartItems.length > 0 && (
    <button
      onClick={handleCheckout}
      className="w-full btn"
    >
      Checkout ({cartItems.length})
    </button>
  )}
        </div>
      </motion.div>
    </div>
  );
}

export default ShoppingCart;
