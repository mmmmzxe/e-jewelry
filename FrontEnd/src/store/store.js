import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import singleProductReducer from './slices/singleProductSlice';
import categoriesReducer from './slices/categoriesSlice';
import profileReducer from './slices/profileSlice';
import ordersReducer from './slices/ordersSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import feedbackReducer from './slices/feedbackSlice';
import usersReducer from './slices/usersSlice';
import statsReducer from './slices/statsSlice';
import salesReducer from './slices/salesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer,
    categories: categoriesReducer,
    profile: profileReducer,
    orders: ordersReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    feedback: feedbackReducer,
    users: usersReducer,
    stats: statsReducer,
    sales: salesReducer,
  },
});

export default store;
