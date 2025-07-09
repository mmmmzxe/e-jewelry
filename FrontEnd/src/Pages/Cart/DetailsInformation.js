import React from 'react'

export default function DetailsInformation({handleInputChange , formData , handleConfirmOrder}) {
    
  return (
    <form onSubmit={handleConfirmOrder} className="space-y-4 flex flex-col">
    <h1 className="my-5 border-b-2 pb-5 text-black text-2xl md:text-3xl">Enter your details</h1>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Name"
      required
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Email"
      required
    />
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Phone Number"
      required
    />
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Address"
      required
    />
    <div className="flex gap-6">
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="City"
        required
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="State"
        required
      />
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="ZIP Code"
        required
      />
    </div>
  </form>
  )
}
