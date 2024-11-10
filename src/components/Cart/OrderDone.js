import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrderDone() {
  const location = useLocation();
  const { cartItems, totalCart, formData, deliveryMethod, customLocation, billingInfo, shippingDetails } = location.state || {};

  if (!cartItems) {
    return <p className="text-center text-gray-500">No order details available.</p>;
  }

  return (
    <div className="container mx-auto p-5 pt-36 items-center">
     <div className='flex flex-col justify-center items-center'>
     <h1 className="text-3xl font-bold mb-5">Order Confirmation</h1>
     <p className="text-lg mb-5">Thank you for your order!</p>
     </div>

      <div className="flex flex-col p-5 gap-5 border">
        {/* Order Summary */}
        <div className="flex justify-between items-center">
          <div>
            {cartItems.map((product) => (
              <div key={product.id} className="flex justify-between p-1 ">
                <p>{product.count}x {product.name}</p>
              </div>
            ))}
          </div>
          <div>
            <span className="text-lg font-semibold">Total: ${totalCart.toFixed(2)}</span>
          </div>
        </div>

     <hr></hr>
      <div className='flex md:flex-row flex-col justify-center  md:gap-10 gap-4 items-center'>
      <div className="p-5  flex flex-col gap-1  mt-5">
          
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          
         
          {deliveryMethod === 'by-shipment' && (
            <>
              <p><strong>Delivery Method:</strong> Shipping</p>
            
              <p><strong>Shipping Address:</strong> {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state}, {shippingDetails.zipCode}</p>
            </>
          )}
          {deliveryMethod === 'in-person' && (
            <>
           
              <p><strong>Pickup AT:</strong>{customLocation.address}, {customLocation.city}, {customLocation.zipCode} </p>
             
            </>
          )}
      
        </div>

       <div className='p-5 flex md:w-1/6 w-full  flex-col gap-1   mt-5'>
       {deliveryMethod === 'in-person' && (
            <>
              <p><strong>Paid With: </strong> {billingInfo.cardName}</p>
              <p><strong>Exp. Date: </strong> {billingInfo.expirationDate}</p>
              <p><strong>CVV: </strong>{billingInfo.cvv}</p>
              <p><strong>Billing Address: </strong> {billingInfo.address}</p>
            </>
          )}
       </div>
      
      </div>
      <Link to="/">
      <button className='btn w-1/2 m-auto'>
        Go Home 
      </button></Link>
      </div>
    </div>
  );
}

export default OrderDone;
