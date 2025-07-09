import React, { useState } from 'react';

const Rating = ({ maxRating = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
    if (onRatingChange) onRatingChange(index + 1); 
  };

  return (
    <div className="rating">
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer', fontSize: '24px' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
