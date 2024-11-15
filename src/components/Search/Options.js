import React from 'react';
import { options } from '../Data/data';

function CategorySelect({ category, onCategoryChange, bgColor = 'md:bg-white bg-transparent ', textColor = 'md:text-bg text-white' }) {
  return (
    <div  className="text-center">
      <select
        value={category}
        onChange={onCategoryChange}
        className={`${bgColor} ${textColor}   rounded`}
      >
        {options.map((cat) => (
          <option
            key={cat.id}
            value={cat.name === "All Categories" ? "" : cat.name}
            className={`md:text-white ${bgColor} text-black`}
          >
            {cat.name}
          </option>
        ))}
     
      </select>
    </div>
  );
}

export default CategorySelect;
