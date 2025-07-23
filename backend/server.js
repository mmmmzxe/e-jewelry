require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// فعّل CORS أولاً
app.use(cors());

// ثم راوت الكاتيجوري
const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

// ثم باقي الـ middleware
app.use(express.json());

// Disable caching for all API responses
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const Favorite = require('./models/Favorite');
const Order = require('./models/Order');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
// const categoryRoutes = require('./routes/categories'); // تم نقله للأعلى
const orderRoutes = require('./routes/orders');
const statsRoutes = require('./routes/stats');
const cartRoutes = require('./routes/cart');
const favoritesRoutes = require('./routes/favorites');
const feedbackRoutes = require('./routes/feedback');

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes); // تم نقله للأعلى
app.use('/api/orders', orderRoutes);
app.use('/api', statsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start server
const PORT = process.env.PORT || "https://jewelry.up.railway.app";
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 