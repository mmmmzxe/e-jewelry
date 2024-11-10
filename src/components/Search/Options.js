import React from 'react';
import { options } from '../Data/data';

function CategorySelect({ category, onCategoryChange, bgColor = 'md:bg-white bg-transparent ', textColor = 'md:text-bg text-white' }) {
  return (
    <div hidden className="text-center">
      <select
        value={category}
        onChange={onCategoryChange}
        className={`${bgColor} ${textColor}   rounded`}
      >
        {options.map((cat, index) => (
          <option
            key={index}
            value={cat === "All Categories" ? "" : cat}
            className={`md:text-white ${bgColor} text-black`}
          >
            {cat}
          </option>
        ))}
     
      </select>
    </div>
  );
}

export default CategorySelect;
