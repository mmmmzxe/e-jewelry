import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { categories } from '../Data/data'; // Remove static import

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 p-6">
      {categories.map((category) => (
        <Link key={category._id || category.title} to={`/products/${encodeURIComponent(category.title)}`}>
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
