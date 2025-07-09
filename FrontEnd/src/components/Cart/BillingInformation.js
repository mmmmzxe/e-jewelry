import React from 'react'

export default function BillingInformation({handleConfirmOrder , billingInfo , handleInputChangeIngo}) {
  return (
    <div className="rounded-lg">
<h1 className="my-5 border-b-2 pb-5 text-black text-[30px]">Billing Information</h1>
<form onSubmit={handleConfirmOrder} className="space-y-4">
<input
  type="text"
  placeholder="Name on Card"
  name="cardName"
  value={billingInfo.cardName}
  onChange={handleInputChangeIngo}
  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
/>
<input
  type="text"
  placeholder="Debit / Credit Card Number"
  name="cardNumber"
  value={billingInfo.cardNumber}
  onChange={handleInputChangeIngo}
  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
/>
<div className="flex gap-6">
  <div className="w-1/2">
    <input
      type="text"
      placeholder="Expiration Date (MM/YY)"
      name="expirationDate"
      value={billingInfo.expirationDate}
      onChange={handleInputChangeIngo}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
    />
  </div>
  <div className="flex gap-6">
    <input
      type="text"
      placeholder="CVV"
      name="cvv"
      value={billingInfo.cvv}
      onChange={handleInputChangeIngo}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
    />
    <input
      type="text"
      placeholder="ZIP Code"
      name="zipCode"
      value={billingInfo.zipCode}
      onChange={handleInputChangeIngo}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</div>
<input
  type="text"
  placeholder="Billing Address"
  name="address"
  value={billingInfo.address}
  onChange={handleInputChangeIngo}
  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
/>

</form>
</div>
  )
}
