const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Category = require('../models/Category');

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const usersCount = await User.countDocuments();
    const categoriesCount = await Category.countDocuments();
    res.json({ productsCount, ordersCount, usersCount, categoriesCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sales per month
router.get('/sales/monthly', async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          totalSales: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 