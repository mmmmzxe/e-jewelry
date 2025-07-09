const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// Add product to favorites
router.post('/', async (req, res) => {
  const { userId, productId } = req.body;
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

// Get favorites by userId (with product details)
router.get('/:userId', async (req, res) => {
  try {
    const fav = await Favorite.findOne({ userId: req.params.userId }).populate('products');
    if (!fav) return res.json({ userId: req.params.userId, products: [] });
    res.json({ userId: fav.userId, products: fav.products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove product from favorites
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const fav = await Favorite.findOne({ userId: req.params.userId });
    if (!fav) return res.status(404).json({ message: 'Favorites not found' });
    fav.products = fav.products.filter(pid => pid.toString() !== req.params.productId);
    await fav.save();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 