import React from 'react'
import BillingInformation from './BillingInformation'

export default function DeliveryMethodinperson({handleLocationChange , handleLocationSubmit ,tempLocation ,setShowLocationInput ,customLocation, handleInputChangeIngo ,billingInfo, handleConfirmOrder , showLocationInput}) {
  return (
    <div className="rounded-lg border-b-2 mb-6">
    <div className="flex justify-between items-center">
      <h1 className="my-5 pb-5 text-black text-2xl md:text-3xl">Pickup Location</h1>
      <button
        type="button"
        onClick={() => setShowLocationInput(true)}
        className=""
      >
        Change Location
      </button>
    </div>

    {!showLocationInput ? (
      <div>
        <p>{customLocation.name}</p>
        <p>{customLocation.address}</p>
        <p>{customLocation.city} - {customLocation.zipCode}</p>
        <p>{customLocation.hours}</p>
      </div>
    ) : (
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={tempLocation.name}
          onChange={handleLocationChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Pickup Location Name"
        />
        <input
          type="text"
          name="address"
          value={tempLocation.address}
          onChange={handleLocationChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={tempLocation.city}
          onChange={handleLocationChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="City"
        />
        <input
          type="text"
          name="zipCode"
          value={tempLocation.zipCode}
          onChange={handleLocationChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="ZIP Code"
        />
        <input
          type="text"
          name="hours"
          value={tempLocation.hours}
          onChange={handleLocationChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Hours"
        />
        <button
          type="button"
          onClick={handleLocationSubmit}
          className="w-full btn"
        >
          Confirm Location
        </button>
      </div>
    )}
  <BillingInformation billingInfo={billingInfo} handleConfirmOrder={handleConfirmOrder} handleInputChangeIngo={handleInputChangeIngo}/>

  </div>
  )
}
