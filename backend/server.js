require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Category APIs ---
// Create Category
app.post('/api/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get All Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Single Category
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update Category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete Category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search/Filter Categories by title
app.get('/api/categories/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const categories = await Category.find({
      title: { $regex: query, $options: 'i' } // case-insensitive partial match
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Product APIs ---
// Create Product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update Product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Products by Category Title
app.get('/api/categories/:title/products', async (req, res) => {
  try {
    // Find the category (case-insensitive)
    const category = await Category.findOne({ title: { $regex: new RegExp('^' + req.params.title + '$', 'i') } });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    // Find products with this category title
    const products = await Product.find({ 'category.title': category.title });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Search/Filter Products by name and category
app.get('/api/products/search', async (req, res) => {
  const { query, category } = req.query;
  const filter = {};
  if (query) {
    filter.name = { $regex: query, $options: 'i' }; // case-insensitive partial match
  }
  if (category) {
    filter['category.title'] = { $regex: `^${category}$`, $options: 'i' }; // case-insensitive exact match
  }
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Cart APIs ---
// Add to cart
app.post('/api/cart', async (req, res) => {
  const { userId, productId, count = 1 } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, count }] });
    } else {
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.count += count;
      } else {
        cart.items.push({ productId, count });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from cart
app.delete('/api/cart', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart for user
app.get('/api/cart', async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) return res.json({ items: [] });
    // Map to flatten product details
    const items = cart.items.map(item => ({
      ...item._doc,
      ...item.productId._doc,
      count: item.count,
      id: item.productId._id, // for frontend compatibility
    }));
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Favorites APIs ---
// Add to favorites
app.post('/api/favorites', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      favorite = new Favorite({ userId, products: [productId] });
    } else if (!favorite.products.includes(productId)) {
      favorite.products.push(productId);
    }
    await favorite.save();
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from favorites
app.delete('/api/favorites', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const favorite = await Favorite.findOne({ userId });
    if (!favorite) return res.status(404).json({ message: 'Favorites not found' });
    favorite.products = favorite.products.filter(p => p.toString() !== productId);
    await favorite.save();
    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get favorites for user
app.get('/api/favorites', async (req, res) => {
  const { userId } = req.query;
  try {
    const favorite = await Favorite.findOne({ userId }).populate('products');
    if (!favorite) return res.json({ products: [] });
    res.json({ products: favorite.products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Order APIs ---
// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get All Orders (admin or for testing)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Orders by User
app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Single Order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 