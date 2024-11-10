import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CategorySelect from './Options';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState(''); // State to hold the selected category
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}&category=${selectedCategory}`);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}&category=${category}`);
        }
    };

    return (
        <form 
            onSubmit={handleSearchSubmit} 
            className="relative h-[40px] text-sm md:border-b-2 md:text-bg text-white justify-center md:border-gray-300 gap-2 bg-transparent flex md:flex-row flex-col items-center"
        >
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent text-center border-gray-300 md:border-none border-b-2 focus:outline-none"
            />

         
            <CategorySelect category={category} onCategoryChange={handleCategoryChange} />

            <button type="submit" className="md:text-bg text-white px-4">
                <IoIosSearch size={22} />
            </button>
        </form>
    );
}
