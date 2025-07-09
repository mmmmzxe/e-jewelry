import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import SliedProducts from '../Home/SliedProducts';

function ReviewOrder() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalCart = cartItems.reduce((total, product) => total + product.price * product.count, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, totalCart } });
  };
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const handleQuantityChange = (productId, change) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      const newQuantity = product.count + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  return (
    <div className="h-full flex flex-col-reverse lg:flex-row container gap-5 m-3 pt-40 items-start">
      <div className="rounded-lg p-6 w-full lg:w-[70%] mb-8">
  <h2 className="text-2xl border-b-2 p-2 text-gray-800 mb-8">Review Your Order</h2>
  <ul className="space-y-4 max-h-[85vh] overflow-y-scroll">
    {cartItems.map((product) => (
      <li key={product.id} className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center space-x-4 w-full">
          <div className="w-[15%]">
            <img src={product.image} alt={product.name} className="object-contain w-full" />
          </div>
          <div className="w-[70%] p-2 flex flex-col justify-between">
            <div className="flex justify-between w-full items-center">
              <h1 className="text-black text-lg">{product.name}</h1>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => handleQuantityChange(product.id, -1)} className="px-2">-</button>
                <p className="text-gray-500">{product.count}</p>
                <button onClick={() => handleQuantityChange(product.id, 1)} className="px-2">+</button>
              </div>
              <button onClick={() => removeFromCart(product.id)} className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
  <SliedProducts />
</div>


      <div className="border shadow-lg p-7 w-full lg:w-[30%] mb-8 flex flex-col items-start">
        <h1 className="text-lg font-semibold border-b-2 w-full text-center p-2">Total Order</h1>
        <div className="max-h-[60vh] overflow-y-auto w-full">
          {cartItems.map((product) => (
            <li key={product.id} className="flex w-full items-center justify-between p-4 border-b border-gray-300">
              <div className="flex justify-between w-full items-center text-sm">
                <p>{product.count}x {product.name}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
          <div className="flex justify-between items-center w-full p-3">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-lg font-semibold text-gray-800">${totalCart.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          onClick={handleCheckout}
          className="btn w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ReviewOrder;
