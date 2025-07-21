const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const { auth } = require('../middleware/auth');

// Add product to favorites
router.post('/', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  if (!userId || !productId) return res.status(400).json({ message: 'userId and productId required' });

  try {
    let fav = await Favorite.findOne({ userId });
    if (!fav) {
      fav = new Favorite({ userId, products: [productId] });
    } else {
      if (!fav.products.includes(productId)) {
        fav.products.push(productId);
      }
    }
    await fav.save();
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get favorites for logged-in user (with product details)
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const fav = await Favorite.findOne({ userId }).populate('products');
    if (!fav) return res.json({ userId, products: [] });
    res.json({ userId: fav.userId, products: fav.products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove product from favorites
router.delete('/:productId', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const fav = await Favorite.findOne({ userId });
    if (!fav) return res.status(404).json({ message: 'Favorites not found' });
    fav.products = fav.products.filter(pid => pid.toString() !== req.params.productId);
    await fav.save();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 