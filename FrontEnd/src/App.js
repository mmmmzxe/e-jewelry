import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import ProductDetails from './Pages/Products/SinglePage';
import Header from './Layout/Header/Header';
import Home from './Layout/Home';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Footer from './Pages/Home/Footer';
import Information from './Pages/Home/Information';
import Gifts from './Pages/Home/Gifts';
import Products from './Pages/Products/Products';
import SearchResults from './components/Search/SearchResults ';
import Checkout from './Pages/Cart/Checkout';
import OrderDone from './Pages/Cart/OrderDone';
import ReviewOrder from './Pages/Cart/ReviewOrder';
import JewelryLoader from './Layout/JewelryLoader';
import AllProducts from './Pages/Products/AllProducts';
import FavoritesPage from './Pages/Favorites/FavoritesPage';
import LogIn from './Pages/Login/Login';
import SingUp from './Pages/SignUp/SingUp';
import Dashboard from './DashBoard/Layout/Dashboard';
import DashboardHome from './DashBoard/Pages/DashboardHome';
import DashboardUsers from './DashBoard/Pages/DashboardUsers';
import DashboardOrders from './DashBoard/Pages/DashboardOrders';
import DashboardProducts from './DashBoard/Pages/DashboardProducts';
import DashboardCategories from './DashBoard/Pages/DashboardCategories';
import Profile from './Pages/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// مكون فرعي ليحتوي الراوتر والهيدر والفوتر
function AppRoutes() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/jewelry" element={<Information />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/orderdone" element={<OrderDone />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<DashboardCategories />} />
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

const App = () => {

  return (
    <>
    
    
       
          <ToastContainer className="overflow-hidden" />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </>
    
  
  );
};

export default App;
