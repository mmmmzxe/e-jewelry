const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get All Users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 