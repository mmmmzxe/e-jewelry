import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Imag from '../../assets/img/product/a1.png';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  const handleLogin = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.username === formData.username &&
      storedData.password === formData.password
    ) {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('userId', formData.username);  
     
      navigate('/'); 
      window.location.reload(); 
    } else {
      alert('Invalid username or password');
    }
   
  };

  
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <svg
        className="absolute bottom-0 w h-full z-[-1]"
        viewBox="0 150 2000 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 800 0 Q 600 200, 800 400 T 800 600 L 0 600 L 0 600 Z"
          fill="#831843"
        />
      </svg>
      <div className="absolute md:flex hidden left-4 bottom-[-30px]">
        <img src={Imag} alt="" />
      </div>
      <div className="flex flex-col items-center md:w-[30%] max-w-full justify-center h-screen">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-transparent outline-none border p-2 text-gray-700"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-transparent outline-none border p-2 text-gray-700"
          />
          <div className="flex gap-2">
            <p>Don't you have an account?</p>
            <Link to="/singup" className="text-blue-500">Sign Up</Link>
          </div>
          <button type="submit" className="w-full btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}