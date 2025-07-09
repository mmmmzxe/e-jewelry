import React from 'react'
import { gifts } from '../Data/data'
import { Link } from 'react-router-dom'

export default function Gifts() {
  return (
    <div className='container pb-5 pt-44'>
        <div className="flex justify-center flex-col items-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800">Gifts</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
    {Object.values(gifts).map((gift) => (
      <Link key={gifts.title} to={`/products/${gift.title}`}>
        <div className="category-card p-4 border rounded text-center">
          <img src={gift.image} alt={gift.title} className="w-full mb-4 rounded" />
          <h3 className="text-[#333333] text-xl">{gift.title}</h3>
         
        </div>
      </Link>
    ))}
  </div>
    </div>
    
  )
}
