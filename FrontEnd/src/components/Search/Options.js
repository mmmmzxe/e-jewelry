import React, { useEffect, useState } from 'react';
// import { options } from '../Data/data'; // Remove static import

function CategorySelect({ category, onCategoryChange, bgColor = 'md:bg-white bg-transparent ', textColor = 'md:text-bg text-white' }) {
  const [categories, setCategories] = useState([{ id: 0, title: 'All Categories' }]);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        // data is an array of category objects
        setCategories([{ id: 0, title: 'All Categories' }, ...data]);
      })
      .catch(() => {
        setCategories([{ id: 0, title: 'All Categories' }]);
      });
  }, []);

  return (
    <div className="text-center">
      <select
        value={category}
        onChange={onCategoryChange}
        className={`${bgColor} ${textColor}   rounded`}
      >
        {categories.map((cat) => (
          <option
            key={cat.id || cat._id}
            value={cat.title === 'All Categories' ? '' : cat.title}
            className={`md:text-white ${bgColor} text-black`}
          >
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;
