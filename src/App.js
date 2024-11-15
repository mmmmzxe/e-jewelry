import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import ProductDetails from './components/Products/SinglePage';
import Header from './components/Header/Header';
import Home from './components/Layout/Home';
import { ToastContainer } from 'react-toastify';
import './index.css';
import Footer from './components/Home/Footer';
import Information from './components/Home/Information';
import Gifts from './components/Home/Gifts';
import Products from './components/Products/Products';
import SearchResults from './components/Search/SearchResults ';
import Checkout from './components/Cart/Checkout';
import OrderDone from './components/Cart/OrderDone';
import ReviewOrder from './components/Cart/ReviewOrder';
import JewelryLoader from './components/Layout/JewelryLoader';
import AllProducts from './components/Products/AllProducts';
import FavoritesPage from './components/Favorites/FavoritesPage';
import LogIn from './components/Login/Login';
import SingUp from './components/SignUp/SingUp';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <JewelryLoader />
      ) : (
        <>
          <ToastContainer className="overflow-hidden" />
          <BrowserRouter>
            <ScrollToTop /> 
            <Header />
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
            </Routes>
          </BrowserRouter>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
