import React from 'react';
import BillingInformation from './BillingInformation';

export default function DeliveryMethodbyshipment({
  handleInputChangeIngo,
  handleInputChangeBilling,
  billingInfo,
  handleConfirmOrder,
  shippingDetails
}) {
  return (
    <div>
      <form onSubmit={handleConfirmOrder}>
        <div className="rounded-lg mb-6 space-y-4">
          <h1 className="my-5 border-b-2 pb-5 text-black text-2xl md:text-3xl">Shipping Details</h1>
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChangeBilling}
            placeholder="Enter address"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="flex gap-6">
            <input
              type="text"
              name="city"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="City"
              onChange={handleInputChangeBilling}
              value={shippingDetails.city}
              required
            />
            <input
              type="text"
              name="state"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="State"
              onChange={handleInputChangeBilling}
              value={shippingDetails.state}
              required
            />
            <input
              type="text"
              name="zipCode"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="ZIP Code"
              onChange={handleInputChangeBilling}
              value={shippingDetails.zipCode}
              required
            />
          </div>
        </div>

        <BillingInformation billingInfo={billingInfo} handleConfirmOrder={handleConfirmOrder} handleInputChangeIngo={handleInputChangeIngo}/>

      </form>
    </div>
  );
}
