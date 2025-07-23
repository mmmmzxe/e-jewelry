import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Imag from "../../assets/img/product/a1.png";

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://jewelry.up.railway.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
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

      <div className="absolute mg:flex hidden left-4 bottom-[-30px]">
        <img src={Imag} alt="" />
      </div>

      <div className="md:w-[30%] max-w-full p-5 flex flex-col gap-5">
        <h1 className="text-black text-[35px] text-center">Sign Up</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-transparent outline-none border p-2 text-gray-700"
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
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
            <p>Do you have an account?</p>
            <Link to="/login" className="text-blue-500">Log In</Link>
          </div>
          
          <button
            type="submit"
            className="w-full btn"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
