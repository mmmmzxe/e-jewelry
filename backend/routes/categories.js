const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { auth, adminOnly } = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

async function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'e-jewelry-categories',
        public_id: filename,
        resource_type: 'image',
        format: 'jpg',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// إضافة كاتيجوري مع صورة
router.post('/', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file && req.file.buffer) {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 400 })
        .jpeg({ quality: 70 })
        .toBuffer();
      imageUrl = await uploadBufferToCloudinary(buffer, Date.now() + '-category');
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }
    const { title } = req.body;
    const category = new Category({ title, image: imageUrl });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Single Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// تعديل كاتيجوري مع صورة
router.put('/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.image;
    if (req.file && req.file.buffer) {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 400 })
        .jpeg({ quality: 70 })
        .toBuffer();
      imageUrl = await uploadBufferToCloudinary(buffer, Date.now() + '-category');
    }
    const { title } = req.body;
    const existing = await Category.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Category not found' });
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        title: title || existing.title,
        image: imageUrl || existing.image,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete Category
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Search/Filter Categories by title
router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const categories = await Category.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products for a category by title
router.get('/:title/products', async (req, res) => {
  try {
    const category = await Category.findOne({ title: { $regex: new RegExp('^' + req.params.title + '$', 'i') } });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const products = await Product.find({ 'category.title': category.title });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router; 