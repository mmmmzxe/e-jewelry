const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');

// Add or update item in cart
router.post('/', auth, async (req, res) => {
  const { productId, count } = req.body;
  const userId = req.user.id;
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

// Get cart for logged-in user (with product details)
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) return res.json({ userId, items: [] });
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
router.delete('/:productId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove entire cart for logged-in user
router.delete('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 