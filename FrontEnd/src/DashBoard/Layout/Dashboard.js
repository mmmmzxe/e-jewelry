import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Logo from '../../assets/img/header/logo3.png';
import { Home, Users, ShoppingCart, Package, List, Menu } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  // Sidebar links config
  const links = [
    { to: '/dashboard', label: 'Home', icon: <Home size={20} /> },
    { to: '/dashboard/users', label: 'Users', icon: <Users size={20} /> },
    { to: '/dashboard/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { to: '/dashboard/products', label: 'Products', icon: <Package size={20} /> },
    { to: '/dashboard/categories', label: 'Categories', icon: <List size={20} /> },
    { to: '/dashboard/feedback', label: 'Feedback', icon: <List size={20} /> },
  ];

  // Responsive: close sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8fa] flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-pink-900 text-white p-6 min-h-full flex flex-col transition-all duration-200 ${sidebarOpen ? 'w-[220px]' : 'w-[80px]'} relative`}>
          {/* Toggle button */}
          <button
            className="absolute -right-4 top-4 bg-pink-900 border-2 border-white rounded-full p-1 z-10 "
            onClick={() => setSidebarOpen((v) => !v)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Menu size={20} />
          </button>
          {sidebarOpen &&   <h1 className="text-white text-[17px]  text-center capitalize">
                a p o l l o n i a n
              </h1>}
              {!sidebarOpen &&   <img src={Logo}>
              </img>}
          <nav className="flex flex-col gap-4 mt-8">
            {links.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 no-underline px-2 py-2 rounded transition-colors text-white duration-150 ${isActive ? 'bg-pink-700 font-bold' : ''} ${!sidebarOpen ? 'justify-center items-center' : ''}`}
                  title={link.label}
                >
                  {React.cloneElement(link.icon, { className: "text-white" })}
                  {sidebarOpen && <span className='text-white'>{link.label}</span>}
                </Link>
                
              );
            })}
          </nav>
        </aside>
        {/* Main Content */}
        <section className='p-8 w-full overflow-y-auto max-h-[90vh]'>
          <Outlet />
        </section>
      </div>
    </div>
  );
} 