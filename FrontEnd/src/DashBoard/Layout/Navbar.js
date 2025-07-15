import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  // جلب بيانات المستخدم من localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Remove any other auth tokens if needed
    navigate('/login');
  };

  return (
    <nav className="w-full bg-pink-900 text-white px-8 py-4 flex items-center justify-between relative">
      <div className=" text-[20px]"> Dashboard</div>
      <div className="flex gap-6 items-center">
        {/* User Info & Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <span className="font-semibold text-white">{user?.username || 'Guest'}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 border-t border-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Go to Site
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 