import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../Data/data';

function CategoriesList() {
  return (
    <div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 p-6">
      {Object.values(categories).map((category) => (
        <Link key={category.title} to={`/products/${category.title}`}>
          <div className="category-card p-4 border rounded text-center">
            <img src={category.image} alt={category.title} className="w-full mb-4 rounded" />
            <h3 className="text-[#333333] text-xl">{category.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoriesList;
