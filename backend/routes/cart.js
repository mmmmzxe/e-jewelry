const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add or update item in cart
router.post('/', async (req, res) => {
  const { userId, productId, count } = req.body;
  if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, count }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].count = count;
      } else {
        cart.items.push({ productId, count });
      }
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart by userId (with product details)
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.json({ userId: req.params.userId, items: [] });
    // Merge product details into each item
    const items = cart.items.map(item => ({
      ...item._doc,
      ...item.productId?._doc,
      productId: item.productId?._id || item.productId
    }));
    res.json({ userId: cart.userId, items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 