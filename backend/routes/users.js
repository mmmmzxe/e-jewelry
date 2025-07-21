const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

// Get All Users (admin only)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 