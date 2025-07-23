import { UserIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JewelryLoader from '../../Layout/JewelryLoader';

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);
      setLoading(true);
      fetch('https://jewelry.up.railway.app/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch profile');
          return res.json();
        })
        .then(data => {
          setUsername(data.username || '');
          setLoading(false);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUsername('');
          setLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setDropdownVisible(false);
    setUsername('');
    window.location.reload(); 
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
            <div className="absolute right-0 mt-2 w-[180px] p-2 bg-white shadow-lg rounded-md overflow-hidden">
              {loading ? (
                <JewelryLoader/>
              ) : (
                <>
                  <div className="px-4 py-2 text-gray-700 font-bold">{username}</div>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
