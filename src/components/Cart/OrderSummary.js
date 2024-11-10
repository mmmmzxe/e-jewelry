import React from 'react'

export default function OrderSummary({ cartItems, totalCart, handleConfirmOrder }) {
  return (
    <div className="border overflow-y-scroll shadow-lg p-5 w-full md:w-[30%] flex flex-col justify-between items-start mb-8">
        <h1 className="text-black border-b-2 w-full text-center p-2">Total Order</h1>
        <div className="max-h-[100vh] overflow-y-scroll w-full">
          {cartItems.map((product) => (
            <li key={product.id} className="flex w-full items-center justify-between p-1 border-b border-gray-300">
              <div className="flex justify-between w-full items-center text-sm md:text-[15px] py-2">
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
        <button onClick={handleConfirmOrder} className="w-full btn mt-4">
          Confirm Order
        </button>
      </div>
  )
}
