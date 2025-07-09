import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
      <FavoritesProvider>

    <App />
 </FavoritesProvider>
  </CartProvider>
);
