import { UserIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
 

    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setDropdownVisible(false);
    window.location.reload(); 
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
   const username = localStorage.getItem('username');  
  return (
    <div className="relative">
      {!isLoggedIn ? (
        <Link to="/login">
          <UserIcon />
        </Link>
      ) : (
        <div onClick={toggleDropdown} className="cursor-pointer">
          <UserIcon />
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 p-2 bg-white shadow-lg rounded-md overflow-hidden">
{username}
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile </Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
