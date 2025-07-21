const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Product = require('../models/Product');

// POST /api/feedback - submit feedback
router.post('/', async (req, res) => {
  const { userId, productId, rating, comment } = req.body;
  if (!userId || !productId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const feedback = new Feedback({ userId, productId, rating, comment });
    await feedback.save();
    // Recalculate average rating for the product
    const feedbacks = await Feedback.find({ productId });
    const avgRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;
    await Product.findByIdAndUpdate(productId, { rating: avgRating });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/feedback/:productId - get feedback for a product
router.get('/:productId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ productId: req.params.productId }).populate('userId', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/feedback - get all feedback for all products
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name')
      .populate('productId', 'name image images');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 