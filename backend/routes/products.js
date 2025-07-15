const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

// Cloudinary & Multer setup
const multer = require('multer');
const sharp = require('sharp');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// استخدم تخزين multer في الذاكرة
const upload = multer({ storage: multer.memoryStorage() });

async function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'e-jewelry-products',
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

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

const { auth, adminOnly } = require('../middleware/auth');

// Create Product (with file upload)
router.post(
  '/',
  auth,
  adminOnly,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      // ضغط الصورة الرئيسية
      let imageUrl = '';
      if (req.files.image && req.files.image[0]) {
        const buffer = await sharp(req.files.image[0].buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 70 })
          .toBuffer();
        imageUrl = await uploadBufferToCloudinary(buffer, Date.now() + '-main');
      }

      // ضغط الصور الإضافية
      let imagesArr = [];
      if (req.files.images) {
        imagesArr = await Promise.all(
          req.files.images.map(async (file, idx) => {
            const buffer = await sharp(file.buffer)
              .resize({ width: 800 })
              .jpeg({ quality: 70 })
              .toBuffer();
            return uploadBufferToCloudinary(buffer, Date.now() + '-extra-' + idx);
          })
        );
      }

      // باقي بيانات المنتج
      const body = req.body;
      if (body.price) body.price = Number(body.price);
      let category = body.category;
      if (category && typeof category === 'string') {
        try {
          category = JSON.parse(category);
        } catch {
          category = { title: category };
        }
      }

      const productObj = {
        ...body,
        category,
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(imagesArr.length ? { images: imagesArr } : {}),
      };

      const product = new Product(productObj);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      console.error('Error in POST /api/products:', err);
      res.status(400).json({ message: err.message || String(err) });
    }
  }
);

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Weekly Best Sellers
router.get('/weekly-bestsellers', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Aggregate orders from the last 7 days
    const orders = await Order.find({ createdAt: { $gte: sevenDaysAgo } });

    // Count product sales
    const productSales = {};
    orders.forEach(order => {
      order.cartItems.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.count || 1;
      });
    });

    // Convert to array and sort by sales count
    const sortedProductIds = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .map(([productId]) => productId);

    // Fetch product details
    const products = await Product.find({ _id: { $in: sortedProductIds } });
    // Attach sales count to each product
    const productsWithSales = products.map(product => ({
      ...product.toObject(),
      sales: productSales[product._id.toString()] || 0
    }));
    // Sort again to match order (since MongoDB may not preserve order)
    productsWithSales.sort((a, b) => (b.sales - a.sales));

    res.json(productsWithSales);
  } catch (err) {
    console.error('Error in GET /api/products/weekly-bestsellers:', err);
    res.status(500).json({ message: err.message });
  }
});
// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update Product (with file upload)
router.put('/:id', auth, adminOnly, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    console.log('--- New request ---');
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    const body = req.body;
    console.log('PUT /api/products/:id body:', body, 'files:', req.files);
    if (body.price) body.price = Number(body.price);
    let category = body.category;
    if (category && typeof category === 'string') {
      try {
        category = JSON.parse(category);
      } catch {
        category = { title: category };
      }
    }
    let imageUrl = body.image;
    if (req.files && req.files.image && req.files.image[0]) {
      imageUrl = req.files.image[0].path;
    }
    let imagesArr = [];
    if (body.images) {
      if (typeof body.images === 'string') {
        imagesArr = body.images.split(',').map(s => s.trim()).filter(Boolean);
      } else if (Array.isArray(body.images)) {
        imagesArr = body.images;
      }
    }
    if (req.files && req.files.images) {
      imagesArr = imagesArr.concat(req.files.images.map(f => f.path));
    }
    imagesArr = imagesArr.filter(img => typeof img === 'string' && !!img);
    const updateObj = {
      ...body,
      category,
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(imagesArr.length ? { images: imagesArr } : {})
    };
    console.log('Final update object:', updateObj);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Error in PUT /api/products/:id:', err);
    res.status(400).json({ message: err.message || String(err) });
  }
});
// Delete Product
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Products by Category Title
router.get('/category/:title', async (req, res) => {
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
// Search/Filter Products by name and category
router.get('/search', async (req, res) => {
  const { query, category } = req.query;
  const filter = {};
  if (query) {
    filter.name = { $regex: query, $options: 'i' };
  }
  if (category) {
    filter['category.title'] = { $regex: `^${category}$`, $options: 'i' };
  }
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 